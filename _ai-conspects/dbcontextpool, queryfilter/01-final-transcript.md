# Final screenshot-backed transcript — dbcontextpool, queryfilter

Generated: 2026-06-27 UTC

# R01 — DbContext pooling, factory choices, disposal and suitability

## Boundary

This region covers normal versus pooled `DbContext`, `AddDbContextPool`, `AddPooledDbContextFactory`, disposal ownership, allocation/setup cost, pool limits, and when pooling is or is not a good fit.

## Verified transcript

Without context pooling, DI creates a context for the scope and disposal discards that instance. With pooling, EF Core resets a context and returns the same object instance to an internal pool for later scopes. Pooling reduces repeated allocation and EF-internal setup work; the screenshots cite the familiar benchmark comparison showing substantially lower allocation and roughly doubled throughput in a narrow sample. This is object reuse, not a guarantee of the same gain in every application.

The pool size limits how many idle context instances are retained. It is not a hard concurrency limit. If no pooled instance is available, EF Core can create another context; extra instances beyond retention capacity are disposed rather than kept.

Two registration styles are contrasted:

- `AddDbContextPool<TContext>`: inject `TContext` directly. DI owns the scoped instance, disposes it at scope end, and EF returns it to the context pool.
- `AddPooledDbContextFactory<TContext>`: inject `IDbContextFactory<TContext>` and call `CreateDbContext`/`CreateDbContextAsync`. The caller owns each created context and must dispose it, normally with `using` or `await using`.

A scoped wrapper may create a context from the pooled factory and register that created context as a scoped service. In that case DI owns the scoped wrapper-created instance and disposes it at scope end.

Context pooling is a good fit for many short-lived, similarly configured units of work. It is risky when the context instance carries mutable request/tenant/user state, when configuration changes per request, or when code assumes every resolve produces a pristine object. `OnConfiguring` runs only when the pooled instance is first created, so it must not capture request-specific state.

`DbContext` pooling and database connection pooling are separate. EF context pooling reuses EF objects; ADO.NET/provider pooling reuses physical connections. An application may use either or both.


# R02 — Multitenancy wrapper, query filters and model lifecycle

## Boundary

This region covers the multitenant pooled-factory wrapper, global query filters, `OnModelCreating`, and the distinction between model metadata and per-request context property values.

## Verified transcript

A safe pooled multitenancy pattern uses `AddPooledDbContextFactory<TContext>` plus a scoped wrapper. The wrapper receives the pooled factory and a scoped tenant service, creates a context, assigns `context.TenantId` for the current request, and returns it. A scoped registration can expose that context to the rest of the request.

The context defines a global query filter such as:

```csharp
modelBuilder.Entity<Order>()
    .HasQueryFilter(o => o.TenantId == TenantId);
```

`OnModelCreating` builds and caches model metadata. It does not run for every request or every query. The filter expression is part of the cached model, while the context instance property is read when queries execute. This is why setting `TenantId` on each reused context instance can work.

Do not read the current request, tenant, or user directly inside `OnModelCreating`, and do not use `OnConfiguring` to capture per-request state on pooled contexts. Define stable metadata there—tables, keys, indexes, relationships, column types, and query-filter expressions—then set mutable request-specific values on the context after it is obtained.

The screenshots also clarify the setup cost that pooling avoids: constructing the context object graph, initializing EF services and helper objects, wiring options/internal service provider state, and creating per-context tracking/query/save machinery. Pooling does not avoid database round trips; it avoids repeatedly rebuilding EF-side machinery.


# R03 — Raw DbConnection state, ADO.NET pooling and manual cleanup

## Boundary

This region covers raw `DbConnection` manipulation, EF reset boundaries, ADO.NET connection-pool lifetime, session-state leakage, and required manual cleanup.

## Verified transcript

When a pooled `DbContext` is returned, EF Core resets its own internal context state. It generally cannot guarantee cleanup of arbitrary state changed directly in the underlying provider connection or database session. If application code manually opens a connection, changes session state, starts provider-specific operations, or otherwise bypasses EF abstractions, that code owns the cleanup.

There are two distinct failure classes:

1. **Resource/lifetime leak:** a connection is opened and not closed/disposed, so the physical connection remains checked out longer than needed. Under load this can exhaust the provider pool and cause timeouts.
2. **Session-state leak:** a connection/session setting is changed and not restored. The same pooled physical connection may later serve another request with stale state.

Resetting session state does not remove the need to close/dispose. Closing/disposal returns the logical connection to the provider pool. Conversely, closing is not always proof that every provider-specific session setting was reset. The screenshots use SQL Server session context and transaction isolation level as concrete examples.

A safe rule is to let EF manage connection open/close in normal cases. When raw connection work is unavoidable, restore every manual change before the context is returned and close/dispose what application code opened. With pooling, “close” normally returns the physical connection for reuse; it does not necessarily destroy and recreate it.


# Coverage conclusion

```text
Processed image uses: 36 / 36
Processed non-empty SVG text nodes: 38 / 38
Missing image uses: 0
Unreviewed image uses: 0
Missing text nodes: 0
Unreviewed text nodes: 0
```
