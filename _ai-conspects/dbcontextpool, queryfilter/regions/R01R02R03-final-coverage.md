# dbcontextpool, queryfilter — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — pooled factories, disposal and pool-limit behavior

`AddDbContextPool` supplies pooled scoped contexts through dependency injection. `AddPooledDbContextFactory` supplies a factory; contexts created by that factory must be disposed by the caller, commonly with `await using`. A context resolved as a normal scoped DI service is disposed by the container at scope end.

The configured pool size is a retention limit, not a semaphore that caps request concurrency. When no pooled instance is available, EF Core can create another context; when the retention pool is full on return, the extra context is disposed rather than retained. Pooling therefore reduces repeated setup and allocation but does not replace database connection-pool sizing or request throttling.

**Covered source labels:** `T-014, T-015, T-016, T-017, T-018, T-035`

## R02 — request state, multitenancy and model/query-filter boundaries

Pooling can substantially reduce context allocation and setup cost, but benchmark numbers such as “about twice as fast” or “50 KB versus 4 KB” are scenario-specific, not guarantees.

A pooled context instance is reused across requests. `OnConfiguring` is not a per-request hook for changing tenant or user state. For multitenancy, a common pattern is to register the pooled factory, add a scoped wrapper that reads the current tenant from another scoped service, create a context from the pooled factory, set a context property such as `TenantId`, and expose that context as a scoped service. The property can then be referenced by a global query filter.

`OnModelCreating` builds model metadata and should not capture request-specific services or values. The model is cached. Query filters should reference context instance properties whose values are assigned for each lease, and every request-specific property must be overwritten before use so state does not leak from the previous renter.

**Covered source labels:** `T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-019, T-020, T-021, T-034`

## R03 — what EF resets and what external ADO.NET state must be reset manually

EF Core resets its own internal context state when a pooled context is returned. It cannot reliably reset every external resource that application code manipulates directly.

If code manually opens the underlying ADO.NET connection, starts provider transactions, changes session settings, or attaches other connection-scoped state, it must restore that state and close/dispose the connection before the context returns to the pool. Context pooling and provider connection pooling are separate layers. Leaving a connection open can pin it to a context, leak session state to a later renter, and eventually exhaust the database connection pool.

The rule is simple: use EF-managed connection lifetime where possible. When raw connection access is necessary, pair every state change with deterministic cleanup in `finally`/`using` paths, including failure and cancellation paths.

**Covered source labels:** `T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033, T-036, T-037, T-038`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
