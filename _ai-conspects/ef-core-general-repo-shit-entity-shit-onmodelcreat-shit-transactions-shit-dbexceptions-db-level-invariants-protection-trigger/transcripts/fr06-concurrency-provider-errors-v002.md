# FR06 — Optimistic concurrency, provider exceptions, SQL Server codes, and savepoints

Generated: 2026-06-27 UTC

## Coverage boundary

```text
complete source SVG: source/source-complete-v002.svg
source SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
image uses assigned: 43
original uses rechecked: 4
recovered uses reviewed: 39
coverage level: source-level verified semantic transcript
```

## Verified semantic transcript

### Optimistic concurrency

A check-then-write workflow does not detect another writer unless the update includes a concurrency token or the database rejects the final state. Configure rowversion or another concurrency token when stale writes must be detected. EF compares original token values with current database values and throws `DbUpdateConcurrencyException` when the expected row was not updated.

A retry loop must choose an explicit policy: abort, accept database values, reapply client values, or merge fields. Read current database values, update the entry's original values to the new database snapshot, then retry. Automated retries are appropriate only when the merge rule is deterministic and safe. Human conflict resolution should surface the conflict instead of silently merging.

### Savepoints

Inside an existing transaction EF can use savepoints where supported. A later recoverable failure can roll back to a savepoint while retaining earlier work. This is useful only when the remaining transaction state is still valid. Snapshot conflicts and other transaction-wide failures require rolling back and starting a new transaction rather than retrying from a same-transaction savepoint.

### Exception layers

`DbUpdateConcurrencyException` is the specific EF concurrency conflict. Other save failures normally arrive as `DbUpdateException` with a provider exception underneath. Query/read failures often surface the provider exception directly. Commit failures are provider/connection operations and are not guaranteed to be `DbUpdateException`. Execution-strategy exhaustion can produce `RetryLimitExceededException`.

A practical catch order is: concurrency conflict; general update failure; retry exhaustion; provider/connection failure. Always inspect the provider details before classifying a failure.

### SQL Server numbers

- `2601`: duplicate value in a unique index.
- `2627`: primary-key or unique-constraint violation.
- `547`: foreign-key or check-constraint violation.
- `515`: null inserted into a non-nullable column.
- `1205`: deadlock victim; usually retry the whole operation.
- `1222`: lock timeout; policy-specific and often a blocking diagnosis signal.
- `3960`: snapshot update conflict; start a new transaction with fresh state.
- `-2`: command timeout; outcome and root cause may be ambiguous, so do not blindly replay non-idempotent work.

Integrity failures are usually mapped to validation/domain results, not retried. Use constraint/index names to distinguish rules that share the same number. Keep provider constants and classification logic centralized.

## Complete use mapping

| Use | Source set | Image | Coverage | Semantic role |
|---|---|---|---|---|
| `S-004` | `original-incomplete-svg-set` | `OLD-0dc3625229` | `verified-semantic-transcript-final-v002` | Optimistic concurrency in a read-modify-write workflow; a token is required to detect another writer. |
| `S-013` | `original-incomplete-svg-set` | `OLD-119679e20c` | `verified-semantic-transcript-final-v002` | Why a check-then-add workflow needs rowversion/concurrency, a database constraint, or suitable isolation. |
| `S-061` | `original-incomplete-svg-set` | `OLD-ea9b1ba7b6` | `verified-semantic-transcript-final-v002` | EF save exception taxonomy: DbUpdateException, DbUpdateConcurrencyException, and provider-specific inner exceptions. |
| `S-064` | `original-incomplete-svg-set` | `OLD-601cdc59fb` | `verified-semantic-transcript-final-v002` | Recommended catch ordering for concurrency, general update failure, retry exhaustion, and provider-level failures. |
| `NU-106` | `recovered-complete-svg-set` | `NIMG-097` | `verified-semantic-transcript-final-v002` | SQL Server error-code table with meaning, typical cause and retry/mapping guidance. |
| `NU-107` | `recovered-complete-svg-set` | `NIMG-003` | `verified-semantic-transcript-final-v002` | Summary of common integrity, deadlock, lock-timeout, snapshot-conflict and command-timeout cases. |
| `NU-122` | `recovered-complete-svg-set` | `NIMG-123` | `verified-semantic-transcript-final-v002` | Compact application strategy: map data errors to results; replay whole transaction for transient concurrency errors. |
| `NU-104` | `recovered-complete-svg-set` | `NIMG-067` | `verified-semantic-transcript-final-v002` | Non-retriable-by-default classes: constraints, bad SQL, invalid objects, permissions and business-rule failures. |
| `NU-123` | `recovered-complete-svg-set` | `NIMG-163` | `verified-semantic-transcript-final-v002` | Environment-dependent handling for lock timeout 1222 and command timeout -2. |
| `NU-001` | `recovered-complete-svg-set` | `NIMG-115` | `verified-semantic-transcript-final-v002` | Valid optimistic-concurrency retry pattern: retry after DbUpdateConcurrencyException rather than fail immediately. |
| `NU-105` | `recovered-complete-svg-set` | `NIMG-173` | `verified-semantic-transcript-final-v002` | Common SQL Server numbers: 2601, 2627, 547, 515 and related application handling. |
| `NU-124` | `recovered-complete-svg-set` | `NIMG-042` | `verified-semantic-transcript-final-v002` | Shared constants/helper for recognizing SQL Server numbers in application code. |
| `NU-002` | `recovered-complete-svg-set` | `NIMG-028` | `verified-semantic-transcript-final-v002` | Code begins an outer transaction and retries SaveChanges, relying on EF savepoints where supported. |
| `NU-132` | `recovered-complete-svg-set` | `NIMG-142` | `verified-semantic-transcript-final-v002` | Command timeout -2: do not blindly retry without understanding query cost, blocking and idempotency. |
| `NU-003` | `recovered-complete-svg-set` | `NIMG-054` | `verified-semantic-transcript-final-v002` | Conflict handler reads database values, chooses merge/retry behavior, and updates original values. |
| `NU-108` | `recovered-complete-svg-set` | `NIMG-069` | `verified-semantic-transcript-final-v002` | Cheat sheet: investigate first, map integrity failures, retry safe transient failures, and replay idempotent units. |
| `NU-160` | `recovered-complete-svg-set` | `NIMG-134` | `verified-semantic-transcript-final-v002` | Distinguishes SqlException.Number == -2 from TimeoutException and cautions against blanket timeout retries. |
| `NU-004` | `recovered-complete-svg-set` | `NIMG-007` | `verified-semantic-transcript-final-v002` | Explains savepoint rollback, refreshed originals and eventual outer-transaction commit. |
| `NU-069` | `recovered-complete-svg-set` | `NIMG-140` | `verified-semantic-transcript-final-v002` | SQL Server error 547 plus the constraint name can identify which check constraint failed. |
| `NU-005` | `recovered-complete-svg-set` | `NIMG-182` | `verified-semantic-transcript-final-v002` | When automatic retry is appropriate: automated operation, defined merge/retry policy, and short transaction. |
| `NU-070` | `recovered-complete-svg-set` | `NIMG-057` | `verified-semantic-transcript-final-v002` | Naming unique indexes and check constraints to support stable application error mapping. |
| `NU-006` | `recovered-complete-svg-set` | `NIMG-099` | `verified-semantic-transcript-final-v002` | Human-conflict workflows should stop and surface the conflict rather than auto-merge silently. |
| `NU-007` | `recovered-complete-svg-set` | `NIMG-041` | `verified-semantic-transcript-final-v002` | Higher isolation can keep a stale snapshot across a same-transaction retry; retry the whole operation from fresh state. |
| `NU-071` | `recovered-complete-svg-set` | `NIMG-013` | `verified-semantic-transcript-final-v002` | Catch DbUpdateException, inspect SqlException, and classify 2601/2627/547 by code and constraint name. |
| `NU-072` | `recovered-complete-svg-set` | `NIMG-143` | `verified-semantic-transcript-final-v002` | Concrete mapping from named check/unique violations to domain validation results. |
| `NU-073` | `recovered-complete-svg-set` | `NIMG-128` | `verified-semantic-transcript-final-v002` | Constraint-name mapping is reliable because SQL Server includes the violated object name in the error text. |
| `NU-127` | `recovered-complete-svg-set` | `NIMG-085` | `verified-semantic-transcript-final-v002` | Application pattern for SQL Server 515 required-value failure. |
| `NU-113` | `recovered-complete-svg-set` | `NIMG-048` | `verified-semantic-transcript-final-v002` | 515 required-value violation is an input/schema mapping failure, not a retry candidate. |
| `NU-158` | `recovered-complete-svg-set` | `NIMG-015` | `verified-semantic-transcript-final-v002` | Connection problems surface as provider exceptions, DbUpdateException wrappers, or RetryLimitExceededException after retries. |
| `NU-136` | `recovered-complete-svg-set` | `NIMG-078` | `verified-semantic-transcript-final-v002` | Quick mapping from EF model configuration to common SQL Server error numbers. |
| `NU-159` | `recovered-complete-svg-set` | `NIMG-107` | `verified-semantic-transcript-final-v002` | Read/query operations usually surface provider exceptions directly rather than DbUpdateException. |
| `NU-096` | `recovered-complete-svg-set` | `NIMG-113` | `verified-semantic-transcript-final-v002` | Transaction boundary that performs an application check while database constraints remain the final guard. |
| `NU-100` | `recovered-complete-svg-set` | `NIMG-033` | `verified-semantic-transcript-final-v002` | Savepoint-based handling when later work in one transaction may fail. |
| `NU-111` | `recovered-complete-svg-set` | `NIMG-186` | `verified-semantic-transcript-final-v002` | 2601 and 2627 are invariant failures, not transient errors; map them to business results. |
| `NU-101` | `recovered-complete-svg-set` | `NIMG-104` | `verified-semantic-transcript-final-v002` | Rollback to a savepoint for recoverable unique violations, then decide whether to continue or commit earlier work. |
| `NU-097` | `recovered-complete-svg-set` | `NIMG-009` | `verified-semantic-transcript-final-v002` | Create order and commit inside the explicit transaction. |
| `NU-125` | `recovered-complete-svg-set` | `NIMG-145` | `verified-semantic-transcript-final-v002` | Application pattern that catches 2601/2627 and maps a unique constraint by name. |
| `NU-098` | `recovered-complete-svg-set` | `NIMG-110` | `verified-semantic-transcript-final-v002` | Rollback and return a concurrency result when DbUpdateConcurrencyException occurs. |
| `NU-099` | `recovered-complete-svg-set` | `NIMG-176` | `verified-semantic-transcript-final-v002` | Rollback and map provider errors 2627/2601/547/515 to domain results. |
| `NU-112` | `recovered-complete-svg-set` | `NIMG-002` | `verified-semantic-transcript-final-v002` | 547 foreign-key/check violation is normally mapped, not retried. |
| `NU-102` | `recovered-complete-svg-set` | `NIMG-013` | `covered-as-duplicate-placement via `NU-071`` | Constraint-name based error mapping helper reused by transaction handling. |
| `NU-103` | `recovered-complete-svg-set` | `NIMG-143` | `covered-as-duplicate-placement via `NU-072`` | Continuation of the named-constraint mapping example. |
| `NU-126` | `recovered-complete-svg-set` | `NIMG-065` | `verified-semantic-transcript-final-v002` | Combined 547 handling that distinguishes check constraints and foreign keys by constraint name. |

## Candidate and boundary checks

- Every listed use is present in `data/full-use-coverage-v002.csv` and has exactly one primary final region.
- Duplicate placements are linked to a reviewed primary use by identical Excalidraw `fileId`.
- Exact code punctuation remains recoverable from the preserved PNG and complete SVG.
- No label-only assumption closes an image: the image itself was reviewed or explicitly excluded.

## Region status

```text
assigned uses: 43
unresolved uses: 0
unmapped uses: 0
```
