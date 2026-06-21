# R01 — EF Core retries, execution strategies, transactions, and savepoints final coverage transcript v001

Conspect: `ef core retry, savepoints`  
Source: `ef core retry, savepoints.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

EF Core execution strategies can replay transient failures. The retry boundary must encompass the entire logical unit, use replay-safe state, and coordinate explicit transactions/savepoints deliberately.

Reading quality: verified. The whole sheet is a single coherent region; all 6 image uses and 54 SVG text labels were reviewed against preserved source evidence.

## 1. Configure provider retries

SQL Server retries are commonly enabled through provider options such as `EnableRetryOnFailure`. Provider defaults decide transient error numbers, retry count, and delay unless custom values are supplied.

Once enabled, ordinary EF Core operations can be retried automatically. A single query or `SaveChanges` call is treated as a replayable unit. The difficult cases are multi-operation workflows and user-started transactions.

## 2. `CreateExecutionStrategy` defines the retry boundary

When several operations must be replayed together, obtain the configured strategy and execute the whole logical sequence inside it:

```csharp
var strategy = db.Database.CreateExecutionStrategy();

await strategy.ExecuteAsync(async () =>
{
    await using var tx = await db.Database.BeginTransactionAsync();

    var user = await db.Users.SingleAsync(x => x.Id == id);
    user.Name = "A";
    await db.SaveChangesAsync();

    await tx.CommitAsync();
});
```

A transient failure re-runs the delegate. Beginning a transaction outside the delegate defeats this model because the strategy cannot reconstruct it.

`ExecuteAsync` is also useful without an explicit transaction when a read, application calculation, and a single save should be retried as one logical block. Use an explicit transaction when multiple writes or reads/writes require atomic rollback.

## 3. Replay-safe state

A retry runs the delegate again. Do not accumulate mutations on an already-tracked entity from a previous failed attempt, for example repeatedly applying `entity.Count += 1` to the same in-memory instance.

Create a fresh `DbContext`/state inside the retry delegate or reload/reset tracked state before replay. External side effects—messages, files, emails, HTTP calls—must be idempotent or coordinated through an outbox because the delegate may execute more than once.

## 4. Commit ambiguity and verification

If connectivity fails while committing, the client may not know whether the transaction committed. Blind replay can duplicate an insert. `ExecuteInTransactionAsync` supports a verification callback so the application can determine whether the operation succeeded before retrying.

Other mitigations include client-generated stable keys, idempotency keys, and business-level uniqueness constraints.

## 5. Savepoints and `SaveChanges`

Inside an existing transaction, EF Core can create a savepoint around `SaveChanges`. If the save fails, the transaction may be rolled back to the savepoint so the caller can correct state and continue or choose a different action.

`SaveChanges(acceptAllChangesOnSuccess: false)` postpones `AcceptAllChanges`. This is useful when acceptance should happen only after a surrounding transaction has committed successfully.

Savepoints belong to a transaction; they are not a replacement for a transaction around unrelated operations.

## 6. Multiple contexts and shared transactions

Multiple `DbContext` instances can participate in one relational transaction only when they share the same connection and the second context enlists with `UseTransaction`. Execution strategy must wrap creation/use of the shared transaction so the complete unit can be recreated on retry.

## 7. Buffering and opt-out considerations

Retrying providers may buffer query results so they can safely replay and materialize them, increasing application memory usage for large result sets. Measure this for large queries/streams.

If a specific operation must not retry, use a separately configured context/strategy or an explicit non-retrying path; do not assume one LINQ operator disables the provider execution strategy for just that query.

## 6. Coverage

```text
R01 processed image uses: 6
R01 processed text labels: 54
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
