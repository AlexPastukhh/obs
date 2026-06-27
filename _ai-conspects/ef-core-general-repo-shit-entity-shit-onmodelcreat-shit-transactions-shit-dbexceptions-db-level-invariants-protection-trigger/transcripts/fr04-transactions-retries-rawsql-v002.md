# FR04 — Transactions, execution strategies, raw SQL, isolation, and whole-operation retry

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 62
original uses rechecked: 7
recovered uses reviewed: 55
coverage level: source-level verified semantic transcript
```

## Verified semantic transcript

### Atomicity versus isolation

A single `SaveChanges` is normally transactional. Multiple `SaveChanges` calls, bulk operations, `ExecuteUpdate`, or raw SQL are not automatically one atomic unit merely because they use the same context. Wrap the complete logical operation in one explicit transaction when all effects must commit or roll back together. Isolation controls what concurrent database transactions can observe; atomicity comes from the transaction boundary.

`ReadCommitted` is the normal SQL Server default. Snapshot isolation can reduce reader/writer blocking, but it creates a transaction-level view and may produce write conflicts. ReadUncommitted allows dirty database reads; it has nothing to do with unsaved ChangeTracker values.

### Execution strategies and retry boundaries

An EF execution strategy retries the delegate passed to it. The delegate must therefore contain the complete idempotent/replayable operation. If an explicit transaction is required, create it inside the execution-strategy delegate. Reusing a polluted `DbContext` can apply increments twice, append the same child twice, or leave Added entities from a failed attempt. A new context per attempt is the safest general pattern.

`ExecuteInTransactionAsync` combines an operation, transaction ownership, and optional commit verification. `SaveChanges(false)` can defer `AcceptAllChanges` until commit success is known. Commit ambiguity must be handled through natural keys, operation identifiers, verification callbacks, or other idempotency mechanisms.

A deadlock victim (`1205`) is a strong whole-operation retry candidate. Lock timeout (`1222`) is situational: investigate blocking and lock duration before adding it to retries. Snapshot update conflict (`3960`) requires a new transaction and fresh reads; retrying inside the same snapshot usually repeats the stale view.

### Raw SQL and FromSql

`FromSql` starts from a `DbSet`/entity type, so returned columns must map to that entity shape even when SQL reads a different physical table. Raw SQL, stored procedures, and set-based update/delete APIs participate in the surrounding transaction only when the application gives them one. Treat SQL parameters and interpolation safely, and keep the transaction/retry boundary around the whole logical unit.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-022` | `original-incomplete-svg-set` | `OLD-3710ca8272` | `verified-semantic-transcript-final-v002` | Atomicity of multiple SaveChanges calls: use one explicit transaction; isolation is a separate concern. |
| `S-028` | `original-incomplete-svg-set` | `OLD-4e35b1cbc9` | `verified-semantic-transcript-final-v002` | Choosing transaction isolation: ReadCommitted as the normal default, Snapshot for specific versioned-read needs. |
| `S-030` | `original-incomplete-svg-set` | `OLD-b7164244ce` | `verified-semantic-transcript-final-v002` | ReadUncommitted concerns database reads of other transactions, not unsaved in-memory tracker changes. |
| `S-032` | `original-incomplete-svg-set` | `OLD-a9bd2293fc` | `verified-semantic-transcript-final-v002` | A database query cannot see unsaved ChangeTracker mutations merely because the isolation level is ReadUncommitted. |
| `S-062` | `original-incomplete-svg-set` | `OLD-5310695bc8` | `verified-semantic-transcript-final-v002` | Transaction commit failures are usually provider/connection exceptions, not necessarily DbUpdateException. |
| `S-063` | `original-incomplete-svg-set` | `OLD-bb49429aea` | `verified-semantic-transcript-final-v002` | RetryLimitExceededException after an execution strategy exhausts its configured attempts. |
| `S-065` | `original-incomplete-svg-set` | `OLD-bf9f234ad6` | `verified-semantic-transcript-final-v002` | Execution-strategy retry exhaustion and the distinction between transient retries and non-retriable failures. |
| `NU-161` | `recovered-complete-svg-set` | `NIMG-064` | `verified-semantic-transcript-final-v002` | FromSql is attached to a DbSet/entity type; SQL results must map to that entity shape. |
| `NU-162` | `recovered-complete-svg-set` | `NIMG-074` | `verified-semantic-transcript-final-v002` | A different physical table can be queried when its returned columns still map to the DbSet entity type. |
| `NU-024` | `recovered-complete-svg-set` | `NIMG-014` | `verified-semantic-transcript-final-v002` | ExecuteInTransactionAsync overview: strategy-owned retries plus transaction and commit verification. |
| `NU-008` | `recovered-complete-svg-set` | `NIMG-051` | `verified-semantic-transcript-final-v002` | Correct pattern: create execution strategy and begin a new explicit transaction inside the retry delegate. |
| `NU-025` | `recovered-complete-svg-set` | `NIMG-060` | `verified-semantic-transcript-final-v002` | Setup code for a retriable create operation with an execution strategy. |
| `NU-034` | `recovered-complete-svg-set` | `NIMG-092` | `verified-semantic-transcript-final-v002` | Retry hazard example: incrementing tracked state twice when the same DbContext is replayed. |
| `NU-163` | `recovered-complete-svg-set` | `NIMG-016` | `verified-semantic-transcript-final-v002` | Archived-customer-table example that works because the projected columns match Customer. |
| `NU-019` | `recovered-complete-svg-set` | `NIMG-082` | `verified-semantic-transcript-final-v002` | Explains why the transaction must be created inside ExecuteAsync when the entire unit must be retried. |
| `NU-014` | `recovered-complete-svg-set` | `NIMG-109` | `verified-semantic-transcript-final-v002` | When a plain explicit BeginTransaction pattern is appropriate and what lifecycle the application owns. |
| `NU-015` | `recovered-complete-svg-set` | `NIMG-034` | `verified-semantic-transcript-final-v002` | Repository/service transaction example: begin transaction and perform the first write. |
| `NU-026` | `recovered-complete-svg-set` | `NIMG-154` | `verified-semantic-transcript-final-v002` | ExecuteInTransactionAsync operation and verifySucceeded delegates, including SaveChanges(false). |
| `NU-020` | `recovered-complete-svg-set` | `NIMG-121` | `verified-semantic-transcript-final-v002` | Factory/new-context-per-attempt setup that avoids stale ChangeTracker state. |
| `NU-035` | `recovered-complete-svg-set` | `NIMG-023` | `verified-semantic-transcript-final-v002` | Retry hazard example: appending the same child twice when a delegate is replayed. |
| `NU-164` | `recovered-complete-svg-set` | `NIMG-076` | `verified-semantic-transcript-final-v002` | Counterexample: querying Orders through DbSet<Customer> fails when the result shape does not map to Customer. |
| `NU-009` | `recovered-complete-svg-set` | `NIMG-183` | `verified-semantic-transcript-final-v002` | Concrete ExecuteAsync example that reloads current state, mutates it and saves inside the retry delegate. |
| `NU-010` | `recovered-complete-svg-set` | `NIMG-049` | `verified-semantic-transcript-final-v002` | Defines the operation delegate as the whole retriable unit, not merely one SaveChanges call. |
| `NU-027` | `recovered-complete-svg-set` | `NIMG-080` | `verified-semantic-transcript-final-v002` | Explains operation and verifySucceeded roles and why AcceptAllChanges is deferred. |
| `NU-016` | `recovered-complete-svg-set` | `NIMG-090` | `verified-semantic-transcript-final-v002` | Continuation of the explicit transaction example with SaveChanges and domain work. |
| `NU-028` | `recovered-complete-svg-set` | `NIMG-157` | `verified-semantic-transcript-final-v002` | ExecuteAsync without an explicit transaction for one logical retry block whose operation can be safely replayed. |
| `NU-021` | `recovered-complete-svg-set` | `NIMG-170` | `verified-semantic-transcript-final-v002` | New-context retry code: begin transaction and create the first entity. |
| `NU-036` | `recovered-complete-svg-set` | `NIMG-162` | `verified-semantic-transcript-final-v002` | Retry hazard example: adding an entity again on the same context after a failed attempt. |
| `NU-017` | `recovered-complete-svg-set` | `NIMG-192` | `verified-semantic-transcript-final-v002` | Completes the explicit transaction pattern with audit write, commit and catch/rollback. |
| `NU-033` | `recovered-complete-svg-set` | `NIMG-019` | `verified-semantic-transcript-final-v002` | States that the helper owns begin/commit/rollback of the transaction lifecycle. |
| `NU-022` | `recovered-complete-svg-set` | `NIMG-062` | `verified-semantic-transcript-final-v002` | New-context retry code: save, add audit data, save again, and commit. |
| `NU-011` | `recovered-complete-svg-set` | `NIMG-191` | `verified-semantic-transcript-final-v002` | Explains that a transient failure replays the complete delegate even without an explicit BeginTransaction. |
| `NU-029` | `recovered-complete-svg-set` | `NIMG-189` | `verified-semantic-transcript-final-v002` | Why manual rollback can still be useful: explicitness and immediate cleanup before further catch logic. |
| `NU-018` | `recovered-complete-svg-set` | `NIMG-155` | `verified-semantic-transcript-final-v002` | Notes that SaveChanges sends SQL inside the current transaction; atomicity comes from the surrounding transaction. |
| `NU-023` | `recovered-complete-svg-set` | `NIMG-070` | `verified-semantic-transcript-final-v002` | Explains SaveChanges(false): retain state for commit verification rather than accepting changes too early. |
| `NU-012` | `recovered-complete-svg-set` | `NIMG-167` | `verified-semantic-transcript-final-v002` | Caveat: reusing already-tracked state can accumulate mutations across retry attempts. |
| `NU-030` | `recovered-complete-svg-set` | `NIMG-144` | `verified-semantic-transcript-final-v002` | Clarifies commit versus rollback semantics on successful and failed disposal paths. |
| `NU-168` | `recovered-complete-svg-set` | `NIMG-096` | `verified-semantic-transcript-final-v002` | Failed-attempt scenario with AcceptAllChanges and repeated Added state. |
| `NU-013` | `recovered-complete-svg-set` | `NIMG-008` | `verified-semantic-transcript-final-v002` | Shows how mutating an already-tracked entity can apply the same increment on every retry. |
| `NU-031` | `recovered-complete-svg-set` | `NIMG-004` | `verified-semantic-transcript-final-v002` | Explicit rollback example inside try/catch before rethrow. |
| `NU-169` | `recovered-complete-svg-set` | `NIMG-075` | `verified-semantic-transcript-final-v002` | SaveChanges(true) only accepts state after a successful save; it does not clean failed-attempt pollution. |
| `NU-032` | `recovered-complete-svg-set` | `NIMG-130` | `verified-semantic-transcript-final-v002` | Custom post-rollback behavior: rollback, log, compensate, or return a domain result. |
| `NU-170` | `recovered-complete-svg-set` | `NIMG-174` | `verified-semantic-transcript-final-v002` | Explains why a failed attempt can leave previously added entities in a reused context. |
| `NU-037` | `recovered-complete-svg-set` | `NIMG-094` | `verified-semantic-transcript-final-v002` | Execution strategy itself is not an IDisposable resource; dispose contexts, connections and transactions instead. |
| `NU-038` | `recovered-complete-svg-set` | `NIMG-164` | `verified-semantic-transcript-final-v002` | Resource-ownership mental model: strategy is policy/helper; context, transaction and connection hold resources. |
| `NU-109` | `recovered-complete-svg-set` | `NIMG-136` | `verified-semantic-transcript-final-v002` | SQL Server 1205 deadlock victim is a strong candidate for whole-operation retry. |
| `NU-128` | `recovered-complete-svg-set` | `NIMG-087` | `verified-semantic-transcript-final-v002` | 1205 deadlock example and EF execution-strategy retry shape. |
| `NU-133` | `recovered-complete-svg-set` | `NIMG-038` | `verified-semantic-transcript-final-v002` | Deadlock scenario where two transactions lock resources in opposite order. |
| `NU-134` | `recovered-complete-svg-set` | `NIMG-133` | `verified-semantic-transcript-final-v002` | Minimal SQL deadlock setup with two transactions. |
| `NU-130` | `recovered-complete-svg-set` | `NIMG-011` | `verified-semantic-transcript-final-v002` | 1222 handling variant that surfaces lock timeout without adding it to EF retries. |
| `NU-110` | `recovered-complete-svg-set` | `NIMG-017` | `verified-semantic-transcript-final-v002` | SQL Server 1222 lock timeout is situational; diagnose blocking before enabling retries. |
| `NU-129` | `recovered-complete-svg-set` | `NIMG-025` | `verified-semantic-transcript-final-v002` | Manual explicit transaction wrapped in an execution strategy so the complete transaction is replayed. |
| `NU-135` | `recovered-complete-svg-set` | `NIMG-159` | `verified-semantic-transcript-final-v002` | Deadlock completion: SQL Server chooses a victim rather than waiting forever. |
| `NU-131` | `recovered-complete-svg-set` | `NIMG-153` | `verified-semantic-transcript-final-v002` | Optional provider configuration that adds 1222 to EnableRetryOnFailure. |
| `NU-114` | `recovered-complete-svg-set` | `NIMG-039` | `verified-semantic-transcript-final-v002` | 3960 snapshot write conflict requires retrying the whole transaction from fresh state. |
| `NU-115` | `recovered-complete-svg-set` | `NIMG-068` | `verified-semantic-transcript-final-v002` | Meaning of SQL Server 3960 under snapshot isolation. |
| `NU-116` | `recovered-complete-svg-set` | `NIMG-169` | `verified-semantic-transcript-final-v002` | Snapshot transaction A reads an old committed row version. |
| `NU-117` | `recovered-complete-svg-set` | `NIMG-031` | `verified-semantic-transcript-final-v002` | Concurrent transaction B changes and commits the row. |
| `NU-118` | `recovered-complete-svg-set` | `NIMG-045` | `verified-semantic-transcript-final-v002` | Transaction A attempts to update from its stale snapshot and receives 3960. |
| `NU-119` | `recovered-complete-svg-set` | `NIMG-156` | `verified-semantic-transcript-final-v002` | Snapshot reduces reader/writer blocking but still detects write-write conflicts. |
| `NU-120` | `recovered-complete-svg-set` | `NIMG-001` | `verified-semantic-transcript-final-v002` | Retrying inside the same snapshot transaction usually sees the same stale version and does not help. |
| `NU-121` | `recovered-complete-svg-set` | `NIMG-037` | `verified-semantic-transcript-final-v002` | 3960 belongs to whole-transaction retry, not same-transaction retry. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 62
unresolved uses: 0
unmapped uses: 0
```
