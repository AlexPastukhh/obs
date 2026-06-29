# Query filters EF Core — repetition guide v002

## Core comparisons

| Topic | Key distinction |
|---|---|
| `HasQueryFilter` | implicit model-level predicate |
| `IgnoreQueryFilters` | disables global filters for one query |
| required navigation | often produces an INNER JOIN |
| optional navigation | can preserve root rows through LEFT JOIN |
| soft-delete filter | read behavior only |
| SaveChanges override/interceptor | converts delete into update |
| pooled DbContext | reused instance; request state must be reset |
| named filters | separate filter concerns in supported EF Core versions |

## High-value questions

1. Why can adding `Include(p => p.Blog)` reduce the number of Posts?
2. Why is a global soft-delete filter insufficient by itself?
3. What happens when older EF Core code calls `HasQueryFilter` twice?
4. How can a tenant value safely participate in a cached model expression?
5. Why is `OnConfiguring` unsuitable for per-request tenant initialization on a pooled context?
6. Compare optional navigation with a matching dependent-side filter.
7. Explain the final SQL-row materialization rule.
8. Design tests that detect cross-tenant leakage and required-navigation row loss.

## Coding prompts

1. Configure combined soft-delete and tenant filtering for pre-EF Core 10.
2. Write an admin query that deliberately includes deleted rows.
3. Convert `Deleted` entries into soft deletes in a SaveChanges interceptor.
4. Build a scoped tenant-aware wrapper around a pooled DbContext factory.
5. Reproduce the six-versus-three required-navigation example and fix it in two different ways.
