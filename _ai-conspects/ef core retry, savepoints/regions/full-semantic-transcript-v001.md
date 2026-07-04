# EF Core retries, transactions, savepoints, isolation, and pooling

## Purpose

This is the complete semantic transcript for the conspect. It is not a character-by-character OCR dump.
The goal is to preserve every important idea, distinction, condition, risk, and code pattern from the source
while removing duplicated phrasing, screenshot UI, OCR noise, and accidental typos.

## Source coverage

```text
Source SVG SHA-256: c73ba05e069382d682f21b3ea949bf2cc13dbbadf253776a945df611590ebdad
Repository source Git blob: 9b3d6771d614e3cd43757833206cda7da50fdab7
Image uses covered: 76 / 76
SVG text nodes reviewed: 56 / 56
```

Coverage map:

```text
S-001..S-009   execution strategies, automatic retries, explicit transactions
S-010..S-013   SaveChanges savepoints
S-014..S-020   SaveChanges(false), AcceptAllChanges, tracked-state preservation
S-021..S-034   ExecuteInTransactionAsync and ambiguous commit verification
S-035..S-046   internal retry buffering and memory behavior
S-047..S-052   pooled contexts, multiple context types, tenant state
S-053..S-059   selective retry design, multiple contexts, retry-safe application state
S-060..S-062   execution-strategy diagnostics
S-063..S-070   savepoint retry versus execution-strategy retry; isolation levels
S-071..S-073   failure taxonomy
S-074..S-076   RCSI and EF Core transaction isolation
```

## 1. Execution strategies: the main mental model

An EF Core execution strategy is a policy that recognizes provider-specific transient database failures and
retries an operation. Examples include a temporary network interruption, a short SQL Server or Azure SQL
availability problem, or another error that the provider classifies as transient.

For SQL Server, retry behavior is normally enabled when configuring the context:

```csharp
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        connectionString,
        sql => sql.EnableRetryOnFailure()));
```

The retrying SQL Server strategy has provider defaults and a built-in set of transient SQL error numbers.
The conspect records the common defaults as six retries and a maximum delay of thirty seconds. They can be
customized:

```csharp
options.UseSqlServer(
    connectionString,
    sql => sql.EnableRetryOnFailure(
        maxRetryCount: 10,
        maxRetryDelay: TimeSpan.FromSeconds(30),
        errorNumbersToAdd: null));
```

A custom execution strategy can be registered when provider defaults are not enough.

`Database.CreateExecutionStrategy()` returns the strategy configured for the current `DbContext`. It is
important to distinguish two modes:

1. When retries are enabled and there is no user-managed transaction, each query and each
   `SaveChanges` call is its own retriable unit.
2. When several operations must be retried as one logical unit, especially when code starts an explicit
   transaction, the whole unit must run inside the strategy delegate.

Without an explicit wrapper, the following calls may retry independently:

```csharp
var users = await db.Users.CountAsync();
var orders = await db.Orders.CountAsync();
await db.SaveChangesAsync();
```

That does not make the three calls one atomic or one retriable application operation.

## 2. Explicit transactions must belong to the retry delegate

When code calls `BeginTransaction` or `BeginTransactionAsync`, retrying one inner command is not enough.
A retry may need to recreate and replay the complete transaction. Therefore the transaction must be created
inside the delegate passed to the execution strategy:

```csharp
var strategy = db.Database.CreateExecutionStrategy();

await strategy.ExecuteAsync(async () =>
{
    await using var tx = await db.Database.BeginTransactionAsync();

    var user = await db.Users.SingleAsync(x => x.Id == userId);
    user.Name = "A";

    await db.SaveChangesAsync();
    await tx.CommitAsync();
});
```

The strategy owns the complete attempt. On a transient failure it can invoke the delegate again, which creates
a new transaction and replays the work.

A useful rule is to create fresh context and entity state inside the retry delegate when possible. Reusing
already-mutated tracked objects can accumulate changes across attempts. For example, if a delegate executes
`entity.Count += 1` on the same in-memory instance and is invoked twice, the application may increment twice
before the successful database attempt. Rebuilding state in each attempt avoids this class of retry bug.

An explicit transaction is not required just because `ExecuteAsync` is used. The strategy can also group a
read, application calculation, and save into one retriable delegate without making the sequence atomic:

```csharp
await strategy.ExecuteAsync(async () =>
{
    var user = await db.Users.SingleAsync(x => x.Id == userId);
    user.LastSeenUtc = DateTime.UtcNow;
    user.VisitCount++;
    await db.SaveChangesAsync();
});
```

This means "replay the whole sequence after a transient failure", not "wrap the sequence in a database
transaction".

## 3. Savepoints around SaveChanges

If a transaction is already open, EF Core normally creates a savepoint before `SaveChanges`, provided the
provider supports savepoints and automatic savepoints are enabled.

If the save fails, EF rolls the transaction back to that savepoint. Work committed earlier inside the still-open
outer transaction remains part of the transaction. The application then decides whether to:

- correct the cause and call `SaveChanges` again;
- continue with another action;
- or roll back the whole transaction.

Example flow:

```csharp
await using var tx = await db.Database.BeginTransactionAsync();

db.Orders.Add(order);
await db.SaveChangesAsync();      // first save succeeds

db.OrderLines.Add(invalidLine);
await db.SaveChangesAsync();      // failure; EF rolls back this save to its savepoint
```

A failed `SaveChanges` does not necessarily roll back the entire outer transaction.

On SQL Server, Multiple Active Result Sets (MARS) is an important limitation: EF does not create these
savepoints when MARS is enabled. After a save failure, the transaction may then be in a state that cannot be
safely recovered in the same way.

A savepoint rollback and an execution-strategy retry are different mechanisms:

- savepoint rollback moves the current transaction back to an earlier checkpoint;
- execution-strategy retry reruns an operation or an entire delegate, usually with a new transaction attempt.

## 4. SaveChanges(false) and AcceptAllChanges

The default `SaveChanges` behavior writes changes and then calls `AcceptAllChanges`. Accepting changes
updates tracked states such as `Added` and `Modified` to `Unchanged` and updates original-value snapshots.

`SaveChanges(false)` writes to the database but deliberately does not accept tracked changes yet:

```csharp
await db.SaveChangesAsync(acceptAllChangesOnSuccess: false);
```

This matters when the database write may have succeeded but transaction success has not yet been safely
confirmed. If tracked state were accepted too early, the context could lose the information needed to retry or
recover using the same tracked objects.

The pattern is:

1. keep the entity changes in their pending tracked state;
2. execute and commit the transactional operation;
3. verify ambiguous success when necessary;
4. only after success is known, call `ChangeTracker.AcceptAllChanges()`.

`SaveChanges(false)` is not mandatory for every execution-strategy use. If every attempt creates a new
context and reconstructs all state inside the delegate, preserving state from the failed attempt may not be
useful. The deciding question is whether recovery depends on the current context retaining its pending
changes.

## 5. ExecuteInTransactionAsync and the three commit outcomes

`ExecuteInTransactionAsync` combines an execution strategy with a transaction and adds a verification step
for the special case where commit throws but the final database outcome is unknown.

Conceptual shape:

```csharp
var strategy = db.Database.CreateExecutionStrategy();

await strategy.ExecuteInTransactionAsync(
    state: db,
    operation: (context, ct) =>
        context.SaveChangesAsync(acceptAllChangesOnSuccess: false, ct),
    verifySucceeded: (context, ct) =>
        context.Blogs.AsNoTracking()
            .AnyAsync(x => x.BlogId == blogId, ct));

db.ChangeTracker.AcceptAllChanges();
```

The operation has three possible outcomes.

### A. Commit succeeds normally

The helper completes successfully. `verifySucceeded` is not needed on the clean success path. If
`SaveChanges(false)` was used, tracked state can now be accepted.

### B. Commit fails clearly

The system knows the transaction did not commit. The attempt is failed and the strategy can retry the
operation according to its policy. Verification is not the central issue because the outcome is known.

### C. Commit fails ambiguously

The connection can be lost while commit is in progress. The client receives an exception but cannot know
whether the database committed before the connection disappeared.

This is the purpose of `verifySucceeded`:

- if the durable result exists, treat the operation as successful and do not replay it;
- if the durable result does not exist, retry the operation.

Verification should inspect a stable result that uniquely identifies the operation, such as a client-generated
key, idempotency record, or other durable marker. Non-idempotent writes are dangerous in this situation:
blindly replaying them can create duplicates or apply an action twice.

## 6. Retry buffering and memory behavior

Enabling a retrying execution strategy can cause EF Core to buffer query results internally. EF needs a
replayable result boundary if a database command fails during enumeration.

This changes the meaning of apparently streaming code.

Without retry buffering:

```csharp
await foreach (var post in db.Posts.AsAsyncEnumerable())
{
    Process(post);
}
```

can process rows with roughly constant application memory.

With a retrying strategy, EF may first buffer the complete result set and only then expose rows to the
consumer. The code still looks like streaming, but memory use can grow with result size.

Terminal buffering operators add another layer. `ToListAsync` and `ToArrayAsync` already create a complete
in-memory result. With retries enabled the effective flow can be:

```text
database rows -> EF internal retry buffer -> application List or array
```

The result may therefore be represented in memory twice.

This buffering is client-side application memory in the EF process. It is not an extra SQL Server-side result
cache created by EF.

Scalar queries are different. `AnyAsync`, for example, normally translates to an `EXISTS`-style query that
returns one boolean-like value. Even if retry behavior applies, there is no large result set to buffer. The
memory warning matters primarily for queries that return many rows.

## 7. DbContext pooling and request-specific state

Pooling reuses `DbContext` instances. A pool should represent one stable EF configuration.

Safe request-specific state can be assigned after a context is obtained from the pool, for example a
`TenantId` property used by query filters. The new request must always overwrite or reset this state because
the instance may contain a value left by the previous request.

Core EF configuration should not be changed per request on a pooled instance. `OnConfiguring` is not a
per-request hook for a pooled context; it runs when the pooled instance is initially created. Provider choice,
connection options, retry strategy, and similar `DbContextOptions` belong to the stable pool configuration.

Good designs include:

- separate `DbContext` subclasses with separate pools;
- separate wrapper factories around differently configured pooled factories;
- one pool per stable configuration;
- no pooling when configuration truly must be rebuilt dynamically.

For tenant-specific data on one stable database configuration, a scoped wrapper factory can obtain a pooled
context and set `TenantId` before returning it.

Changing the connection string per tenant is a configuration problem, not merely a mutable field. It usually
requires separate stable factories/pools or a non-pooled dynamic context design.

## 8. Multiple contexts and transaction sharing

Two relational contexts can participate in one transaction when they share the same underlying
`DbConnection` and `DbTransaction`, and the second context is enlisted with `UseTransaction`.

In that arrangement one commit or rollback covers the database work of both contexts. This is a
same-database relational transaction pattern. It does not automatically provide a distributed transaction
across unrelated databases.

Using one context configured with retries and another without retries can be useful, for example to separate
large true-streaming reads from normal resilient operations. Retry behavior is normally a context/provider
configuration, not a per-query switch on the same context.

## 9. Execution-strategy diagnostics

A concrete SQL Server retrying strategy exposes useful diagnostic information such as:

- maximum retry count;
- maximum retry delay;
- exceptions encountered during retry attempts;
- additional SQL error numbers configured as transient.

This information can be logged after failure or when diagnosing a slow operation. Logging should preserve the
original exception and the list of retry-triggering exceptions.

## 10. Isolation level changes the meaning of retry

`EnableRetryOnFailure` decides whether to retry based on transient exceptions, not directly on transaction
isolation level. Isolation level still matters because it determines what a retry inside the same transaction can
observe.

### Read Committed

Under SQL Server `READ COMMITTED`, values can change between statements. A transaction that rolls back to
a savepoint and performs a new query may observe a more recent committed state. This makes same-transaction
re-read and retry plausible for some application-level conflict resolution.

### Read Committed Snapshot (RCSI)

`READ_COMMITTED_SNAPSHOT` is a SQL Server database option. With the option enabled, a transaction using
`IsolationLevel.ReadCommitted` reads a version-consistent snapshot as of the start of each statement.

After rolling back to a savepoint, the next statement can normally see data committed before that next
statement. Reads use row versions rather than holding ordinary shared read locks for the full transaction.

RCSI is not a separate `IsolationLevel` enum value passed from EF Core:

```csharp
await db.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);
```

Whether that transaction uses lock-based Read Committed or RCSI depends on the SQL Server database setting.
The `READ_COMMITTED_SNAPSHOT` option is SQL Server and Azure SQL specific. Other providers may use MVCC,
but that is not the same named database option.

### Snapshot

Under SQL Server `SNAPSHOT`, the transaction sees data as of the start of the transaction. Rolling back to a
savepoint does not create a newer transaction snapshot. If recovery requires current data, restart the entire
transaction.

### Repeatable Read

SQL Server holds shared locks on rows that were read until transaction completion. Same-transaction
savepoint retry is usually less useful because the transaction intentionally preserves a stable locked view.
Keep these transactions short and normally restart the complete transaction after failure.

### Serializable

Serializable adds range protection and preserves the read set even more strongly. It favors correctness at the
cost of concurrency. Retrying the whole transaction is normally clearer than remaining in the same transaction
and expecting a fresher view.

## 11. Match the failure to the correct retry mechanism

### Transient infrastructure failure

Examples: dropped connection, temporary service unavailability, recognized transient timeout.

Use an execution strategy. The retry unit is one EF operation or the complete strategy delegate.

### Optimistic concurrency conflict

Example: `DbUpdateConcurrencyException` caused by a row-version or concurrency-token mismatch.

This is not normally a transient execution-strategy error. Resolve it at the application level:

- reload current database values;
- merge or choose values;
- update the concurrency token;
- retry the logical operation on the new state.

The appropriate transaction restart behavior depends on isolation level.

### Unknown commit outcome

A connection failure during commit can leave the final outcome unknown. This is neither a savepoint problem
nor a normal concurrency conflict. Use idempotent operation design, durable verification, or
`ExecuteInTransactionAsync` with `verifySucceeded`.

## Review summary

- Automatic retries operate per EF command unless a larger strategy delegate is defined.
- User-managed transactions must be created inside the execution-strategy delegate.
- Savepoints recover a failed save inside the current transaction; they do not replace execution-strategy
  replay.
- `SaveChanges(false)` preserves tracked state until commit success is known.
- Ambiguous commit requires durable verification or idempotency.
- Retry strategies can turn streaming-looking result consumption into internal buffering.
- Pools require stable EF configuration and explicit reset of mutable request state.
- Isolation level affects what a retry can see, even though it does not directly classify transient errors.
