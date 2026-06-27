# ef core retry, savepoints — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

Screenshots are the primary source. Candidate regions and nearest labels were used only as navigation hints; every image was visually reviewed before final assignment.

## R01 — Execution-strategy configuration, defaults, and diagnostics

EnableRetryOnFailure configures the provider execution strategy, including retry count, delay, transient SQL error classification, and diagnostics. CreateExecutionStrategy returns the configured policy so a whole application delegate can be replayed as one unit. Without an explicit wrapper, separate database calls may each retry independently rather than as one atomic operation.

**Reviewed image uses:** S-003, S-005, S-006, S-007, S-010, S-011, S-017, S-022, S-036, S-047, S-049

**Assigned SVG text nodes:** T-001, T-002, T-003, T-004, T-005, T-006, T-012, T-015, T-016, T-018, T-019, T-020, T-021, T-022, T-028, T-030, T-032, T-034, T-038, T-040, T-043

## R02 — Retry units, automatic retries, and explicit transactions

The retriable unit is the delegate passed to the strategy. When application logic contains a read, business decision, write, or an explicit transaction, all relevant work must be inside the delegate so a transient failure rebuilds the attempt from fresh state. User-started transactions must be executed through the strategy instead of being opened outside it.

**Reviewed image uses:** S-013, S-014, S-021, S-028, S-034, S-038, S-039, S-041, S-042, S-050

**Assigned SVG text nodes:** T-023, T-026, T-027, T-031, T-033, T-035

## R03 — ExecuteInTransaction, SaveChanges(false), verification, and ambiguous commit

ExecuteInTransaction handles normal success, clear failure, and commit-time ambiguity. SaveChanges(false) writes without accepting tracked changes so the state can be retried or verified; AcceptAllChanges is called only after success is known. verifySucceeded is for an unknown commit outcome, not every ordinary failure, and should check a durable idempotency marker or database result.

**Reviewed image uses:** S-001, S-002, S-008, S-009, S-015, S-016, S-019, S-020, S-024, S-025, S-026, S-027, S-029, S-030, S-031, S-033, S-035, S-044, S-045, S-053, S-057

**Assigned SVG text nodes:** T-010, T-013, T-024, T-025, T-041, T-042, T-047, T-049, T-050, T-051, T-052, T-053

## R04 — Savepoints inside manual transactions

Inside an existing transaction, SaveChanges can create a savepoint and roll back only the failed save while leaving the transaction open. This is local recovery inside one transaction and is different from execution-strategy replay of an entire operation. Savepoint behavior depends on provider support and SQL Server MARS can disable EF-created savepoints.

**Reviewed image uses:** S-004, S-012, S-018, S-023, S-048

**Assigned SVG text nodes:** T-007, T-008, T-009, T-011, T-014, T-017

## R05 — Retry buffering and query-memory behavior

Retry-enabled queries can require EF to buffer results internally so the query can be replayed deterministically. ToList or ToArray already buffer the final result, so retry support can add another internal copy. Streaming without retries remains incremental; AnyAsync or EXISTS-style scalar queries have negligible result buffering.

**Reviewed image uses:** S-032, S-037, S-040, S-046, S-052, S-059, S-060, S-064, S-066, S-069, S-074, S-075

**Assigned SVG text nodes:** T-029, T-045, T-048, T-054, T-055, T-056

## R06 — Isolation levels, optimistic concurrency, and same-transaction retry

Isolation level does not directly toggle transient retries, but it determines whether retrying after a savepoint can observe fresh committed data. Read Committed with RCSI can support a fresh statement view; Snapshot, Repeatable Read, and Serializable preserve stronger transaction state and often favor restarting the whole transaction. DbUpdateConcurrencyException is an application conflict, not a transient transport retry.

**Reviewed image uses:** S-051, S-054, S-058, S-061, S-063, S-065, S-067, S-070, S-071, S-073

**Assigned SVG text nodes:** T-046

## R07 — Multiple DbContexts, pooling, and tenant-specific state

Multiple contexts can share a relational connection and transaction with UseTransaction when they target the same database. Pooling reuses context instances with one stable EF configuration; request-specific mutable state such as TenantId must be reset, while provider options or connection strings should use separate factories or context types rather than mutating a pooled instance.

**Reviewed image uses:** S-043, S-055, S-056, S-062, S-068, S-072, S-076

**Assigned SVG text nodes:** T-036, T-037, T-039, T-044


## Closure

```text
embedded assets: 76
total image uses: 76
processed image uses: 76
restored image uses: 70
duplicate placements: 0
SVG text nodes: 56
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
