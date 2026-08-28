# Knowledge Registry

Source workspace: `_ai-conspects/ef migrations, dotnet-counters/`

Authoritative processed source: `regions/full-svg-reconciliation-v002.md`

Original SVG: `source/source-complete-v002.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 `MigrateAsync`, development convenience and production concurrency/startup/destructive-change risks | `ef-core.migrations-development-and-deployment-workflows` | `ef-core` | `../_knowledge/ef-core/migrations-development-and-deployment-workflows.md` | MAPPED |
| R02 add/update/list/remove CLI responsibilities and rollback-before-removal rule | `ef-core.migrations-development-and-deployment-workflows` | `ef-core` | `../_knowledge/ef-core/migrations-development-and-deployment-workflows.md` | MAPPED |
| R03 SQL script ranges, distinction from migration creation, history-driven idempotency | `ef-core.migrations-development-and-deployment-workflows` | `ef-core` | `../_knowledge/ef-core/migrations-development-and-deployment-workflows.md` | MAPPED |
| R04 bundle build/publish/run flow, migration history and no-SDK server boundary | `ef-core.migrations-development-and-deployment-workflows` | `ef-core` | `../_knowledge/ef-core/migrations-development-and-deployment-workflows.md` | MAPPED |
| R05 tool installation/attachment, PID selection and EF provider monitoring | `ef-core.query-performance-shape-diagnostics-and-batching` | `ef-core` | `../_knowledge/ef-core/query-performance-shape-diagnostics-and-batching.md` | MERGED |
| R06 active-context/query/cache-hit/SaveChanges/failure counters and their diagnostic interpretations | `ef-core.query-performance-shape-diagnostics-and-batching` | `ef-core` | `../_knowledge/ef-core/query-performance-shape-diagnostics-and-batching.md` | MERGED |
| Coverage counts, ledgers and reconciliation mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- Migration construction/deployment and runtime performance diagnostics are independent recall units.
- R05–R06 extend the existing query-performance unit because counters diagnose the same query-shape, N+1 and batching model rather than defining a separate EF feature.

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
