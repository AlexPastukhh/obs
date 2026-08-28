# Knowledge Registry

Source workspace: `_ai-conspects/linq to sql/`

Authoritative processed source: `regions/full-svg-reconciliation-v002.md`

Original SVG: `source/source-complete-v002.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 expression-tree translation/parameterization/execution/materialization, common operator SQL shapes and `ToQueryString`/logging verification | `ef-core.linq-relational-translation-shapes` | `ef-core` | `../_knowledge/ef-core/linq-relational-translation-shapes.md` | MAPPED |
| R02 equality join, correlated `Where`, `DefaultIfEmpty`, independent sequences and post-left-join filter collapse | `ef-core.linq-relational-translation-shapes` | `ef-core` | `../_knowledge/ef-core/linq-relational-translation-shapes.md` | MAPPED |
| R03 per-outer-row `CROSS APPLY`/`OUTER APPLY`, top-N/correlated/table-valued uses, performance and provider boundary | `ef-core.linq-relational-translation-shapes` | `ef-core` | `../_knowledge/ef-core/linq-relational-translation-shapes.md` | MAPPED |
| R04 SQL-shaped aggregate GroupBy, nested GroupJoin limit, custom CLR/unmapped/business logic and materialization boundary | `ef-core.linq-relational-translation-shapes` | `ef-core` | `../_knowledge/ef-core/linq-relational-translation-shapes.md` | MAPPED |
| R05 navigation translation, Include/loading, split-query consistency, required-navigation filter loss, tracking and provider-dependent mappings | `ef-core.linq-relational-translation-shapes` | `ef-core` | `../_knowledge/ef-core/linq-relational-translation-shapes.md` | MAPPED |
| R06 comparer/index/provider overload limits, collation/normalization, ordered skip/take rewrite and exact-version verification | `ef-core.linq-relational-translation-shapes` | `ef-core` | `../_knowledge/ef-core/linq-relational-translation-shapes.md` | MAPPED |
| Coverage counts, duplicate placements and reconciliation mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- JOIN, APPLY, grouping, navigation and provider-limit regions stay together because they answer one question: which relational shape does a LINQ expression become?
- Existing focused query-filter, split-query and lazy-loading units remain linked rather than duplicated in full.

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
