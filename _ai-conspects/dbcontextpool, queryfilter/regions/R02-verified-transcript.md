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


## Source closure

- Verified image uses: 8
- Verified non-empty SVG text nodes: 16
- Missing: 0
- Unreviewed: 0
