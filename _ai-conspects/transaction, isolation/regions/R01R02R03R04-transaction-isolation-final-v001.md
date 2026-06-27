# Final semantic transcript — transaction, isolation v001

Authoritative source: `source/transaction, isolation.svg`  
Coverage: **71 unique screenshots / 71 placements + 71 native SVG labels**

---

# R01 — Atomicity, `SaveChanges` and transaction ownership

A transaction combines two separate ideas:

```text
atomicity
    all included writes commit together or all roll back

isolation
    controls what concurrent transactions can observe or change
```

Any isolation level can provide transaction atomicity. Choosing `Serializable` is not required merely to make several writes commit or roll back together.

## `SaveChanges` default transaction

A single relational `SaveChanges` call is normally wrapped in a transaction by EF Core when the provider supports transactions.

```csharp
context.Add(order);
context.Add(auditRecord);
await context.SaveChangesAsync();
```

Those writes normally succeed or fail together.

Several separate `SaveChanges` calls are not automatically one atomic unit:

```csharp
await context.SaveChangesAsync();
await service.PerformSecondMutationAsync();
await context.SaveChangesAsync();
```

To make the whole workflow atomic, wrap it in one explicit transaction.

```csharp
await using var transaction =
    await context.Database.BeginTransactionAsync();

try
{
    await stepOne();
    await context.SaveChangesAsync();

    await stepTwo();
    await context.SaveChangesAsync();

    await transaction.CommitAsync();
}
catch
{
    await transaction.RollbackAsync();
    throw;
}
```

## Immediate database operations

Operations such as:

```text
Database.ExecuteSql*
DbSet.ExecuteUpdate*
DbSet.ExecuteDelete*
```

execute immediately and are not queued for the next `SaveChanges`. Use an explicit transaction when they must be atomic with tracked-entity changes.

## Reading versus writing

A transaction can include reads and writes. LINQ queries normally execute when enumerated/materialized, not when composed:

```csharp
var query = context.Users.Where(user => user.IsActive);

await using var transaction =
    await context.Database.BeginTransactionAsync();

var users = await query.ToListAsync(); // read happens here
```

Whether a read belongs to the transaction depends on when it executes and which connection/transaction is used.

## Reading your own uncommitted changes

Tracked entity changes are visible in memory before `SaveChanges`, but a database query does not automatically see unsaved in-memory changes.

After SQL writes execute inside a transaction, that transaction can normally read its own uncommitted database changes.

## Optimistic concurrency instead of a long transaction

Scenario:

```text
read entity
show/edit it
another request modifies the same row
first request later saves stale data
```

A concurrency token or `rowversion` is usually better than keeping a database transaction open across user think time.

```csharp
modelBuilder.Entity<Document>()
    .Property(document => document.RowVersion)
    .IsRowVersion();
```

EF includes the original concurrency value in the update predicate and throws `DbUpdateConcurrencyException` when no row matches.

Concurrency tokens protect against stale writes. They do not create a consistent multi-query snapshot.

## Transaction ownership in nested services

When several methods may call `SaveChanges`, establish one clear owner of the transaction. Inner methods should normally participate in the ambient `DbContext` transaction rather than independently committing unrelated units.

---

# R02 — Isolation-level semantics

The exact implementation is provider-specific, but the useful SQL Server-oriented mental model is:

```text
Read Uncommitted
Read Committed
Read Committed Snapshot (database option)
Repeatable Read
Snapshot
Serializable
```

## Read Committed

SQL Server's usual default isolation level is `Read Committed`.

It prevents dirty reads: a query does not read another transaction's uncommitted changes.

Under lock-based Read Committed, shared read locks are generally released as statements complete. Therefore:

```text
the same row may be different in a later query
new rows may appear
a predicate may return a different set later
```

This is often the correct default when stronger cross-query consistency is not required.

Read Committed does not modify EF's in-memory change-tracked objects. Isolation governs database reads, not local object state.

## Read Uncommitted

Allows dirty reads of changes that may later roll back.

```text
possible dirty reads
non-repeatable values
phantom rows
internally inconsistent observations
```

It is rarely appropriate for correctness-sensitive application logic.

## Repeatable Read

Protects rows that have already been read from being changed by other transactions until the transaction completes.

It does not necessarily protect the entire predicate range. New matching rows may still be inserted, producing phantoms.

## Snapshot

Snapshot isolation gives the transaction a consistent versioned view of committed data, commonly based on the transaction's starting snapshot.

Benefits:

```text
stable multi-query view
readers do not block ordinary writers in the same way as lock-based levels
useful for several reads that must describe one consistent state
```

A write based on stale snapshot data can fail with a snapshot update conflict. On SQL Server, error `3960` is a common snapshot-conflict code.

The correct response is usually to retry the whole logical transaction from a fresh snapshot, not to continue using stale state.

Snapshot must be enabled and supported by the database/provider.

## Serializable

Serializable provides the strongest standard isolation semantics. The result should be equivalent to transactions running one at a time.

It protects both:

```text
rows already read
predicate/range membership relevant to the query
```

A serializable transaction that checks “no active enrollment exists” can prevent another transaction from inserting a matching row before the first transaction completes, depending on the query/index/provider implementation.

Costs:

```text
more blocking or serialization conflicts
deadlock risk
lower concurrency
longer lock retention
```

Use it when a business invariant depends on the absence or stable range of rows and cannot be represented more efficiently by a unique constraint, concurrency token or atomic SQL operation.

## Why isolation matters for multiple queries

Suppose one operation reads:

```text
order header
order lines
inventory state
```

With ordinary Read Committed, each statement may observe a different committed moment. Snapshot or Serializable can provide a coherent transaction-level view.

For one query or a write protected by a concurrency token, the default level may be sufficient.

---

# R03 — Execution strategies, retries and savepoints

## Execution strategy with an explicit transaction

A retrying execution strategy must create and execute the complete transaction inside the strategy delegate.

```csharp
var strategy = context.Database.CreateExecutionStrategy();

await strategy.ExecuteAsync(async () =>
{
    await using var transaction =
        await context.Database.BeginTransactionAsync();

    await operationOne();
    await context.SaveChangesAsync();

    await operationTwo();
    await context.SaveChangesAsync();

    await transaction.CommitAsync();
});
```

Creating a manual transaction outside a retrying strategy can make retries unsafe because the strategy cannot recreate the complete unit of work.

Each retry should rebuild the transaction and reread the required state.

## Ambiguous commit outcome

A connection can fail while committing. The client may not know whether the server committed.

Blind retry can duplicate work:

```text
first attempt actually commits
client loses connection before receiving confirmation
execution strategy retries
second attempt inserts again
```

Mitigations include:

```text
client-generated stable keys
idempotency keys
unique constraints
operation/outbox records
verification of transaction success
designing writes to be replay-safe
```

## Savepoints

EF Core may create a savepoint when `SaveChanges` runs inside an existing transaction. If the save fails, it can roll back to that savepoint while preserving earlier work in the outer transaction.

Manual form:

```csharp
await transaction.CreateSavepointAsync("before_step");

try
{
    await context.SaveChangesAsync();
}
catch
{
    await transaction.RollbackToSavepointAsync("before_step");
    throw;
}
```

A savepoint is not a replacement for a new transaction snapshot. Under Snapshot isolation, rolling back to a savepoint does not produce a fresh view of concurrent commits. Snapshot conflicts generally require retrying the entire transaction.

Provider limitations matter. For example, some SQL Server configurations/features can restrict savepoint use.

## Retry boundaries

Retry the smallest complete logical unit that is:

```text
transactionally correct
idempotent or safely replayable
able to recreate its DbContext/transaction state
```

Do not continue after errors that leave the transaction in an unknown or invalid state.

---

# R04 — Locks, RCSI and invariants across transactions

## Locks are acquired on access, not merely on begin

Starting a transaction normally does not lock every table or row. Locks are acquired as statements touch data.

```text
BeginTransaction
    establishes transaction context and isolation

SELECT / UPDATE / INSERT / DELETE
    acquire the locks or row-version dependencies required by those operations
```

Exact lock timing and duration depend on the isolation level, query plan, indexes and provider.

## Read Committed locking

Under lock-based Read Committed:

```text
read locks are acquired as rows/pages are read
read locks are usually released after the statement
write locks are held until transaction completion
```

A later statement may therefore see newer committed data.

## RCSI

Read Committed Snapshot Isolation changes Read Committed reads to use row versions rather than ordinary shared read locks.

Important distinction:

```text
RCSI
    statement-level snapshot
    each statement may see a newer committed point

Snapshot isolation
    transaction-level snapshot
    statements in the transaction share a consistent view
```

RCSI reduces reader/writer blocking but does not automatically make several queries one consistent transaction-level snapshot.

## Serializable range protection

Serializable can protect a predicate range, not only rows currently present.

Example invariant:

```text
there must be no other active reservation for this resource/time range
```

A suitable serializable query and index can prevent another transaction from inserting a row into that protected range until the first transaction completes.

Both competing operations must participate in a database mechanism that enforces the invariant. If one code path ignores the protocol or writes through an unconstrained route, application-level assumptions can fail.

Prefer database constraints where possible:

```text
unique index
foreign key
check constraint
atomic conditional update
stored procedure with a protected predicate
```

Isolation supplements these mechanisms when the invariant spans several reads or rows.

## Deadlocks and retries

Stronger locking can produce deadlocks. The database chooses a victim and rolls one transaction back.

Applications should:

```text
keep transactions short
access resources in a consistent order
use suitable indexes
avoid user interaction inside transactions
retry transient deadlock victims as a whole unit
```

---

# Practical selection guide

```text
Single SaveChanges with ordinary CRUD
    provider default transaction/isolation is usually enough

Stale user edit
    concurrency token / rowversion

Several reads need one coherent view
    Snapshot, or Serializable when predicate protection is required

Business invariant about absence/range of rows
    database constraint or atomic SQL first; Serializable when necessary

Several SaveChanges / ExecuteUpdate / raw SQL must commit together
    one explicit transaction

Retrying provider strategy plus manual transaction
    create the transaction inside ExecuteAsync

Ambiguous commit can duplicate an operation
    idempotency and stable keys
```

---

# Coverage

```text
unique embedded screenshots: 71
image uses: 71
native SVG labels: 71
duplicate placements: 0

processed image uses: 71
processed text labels: 71
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
