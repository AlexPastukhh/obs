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


## Source closure

- Verified image uses: 19
- Verified non-empty SVG text nodes: 7
- Missing: 0
- Unreviewed: 0
