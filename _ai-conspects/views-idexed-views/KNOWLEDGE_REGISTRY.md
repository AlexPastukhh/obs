# Knowledge Registry

Source workspace: `_ai-conspects/views-idexed-views/`

Authoritative processed sources: `regions/VIV01-views-concept-ef-core-mapping-toview-tosqlquery.md`, `regions/VIV02-good-bad-use-cases-for-views.md`, `regions/VIV03-indexed-views-materialization-write-cost.md`, and `regions/VIV04-schemabinding-indexed-view-requirements.md`

Materialized source: `assets/raw/full.svg`

Evidence and coverage: `data/final-coverage-audit-stage5-v001.json`; 53 of 53 image uses and 43 of 43 text labels are closed.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| VIV01A normal view as named query definition, table-shaped querying and non-materialized expansion | `sql-server.views-read-contracts-and-query-abstractions` | `sql-server` | `../_knowledge/sql-server/views-read-contracts-and-query-abstractions.md` | MAPPED |
| VIV01B database view, matching CLR read model, `HasNoKey`/`ToView` configuration and composable EF query flow | `ef-core.database-view-and-defining-query-mapping` | `ef-core` | `../_knowledge/ef-core/database-view-and-defining-query-mapping.md` | MAPPED |
| VIV01C database-owned `ToView` SQL versus EF-owned `ToSqlQuery` definition | `ef-core.database-view-and-defining-query-mapping` | `ef-core` | `../_knowledge/ef-core/database-view-and-defining-query-mapping.md` | MAPPED |
| VIV02A reporting/aggregation, complex-join reuse, limited-column exposure, legacy contracts and stable multi-consumer read APIs | `sql-server.views-read-contracts-and-query-abstractions` | `sql-server` | `../_knowledge/sql-server/views-read-contracts-and-query-abstractions.md` | MAPPED |
| VIV02A/VIV02B optimizer expansion and the causal reason a normal view hides but does not automatically improve a slow query | `sql-server.views-read-contracts-and-query-abstractions` | `sql-server` | `../_knowledge/sql-server/views-read-contracts-and-query-abstractions.md` | MAPPED |
| VIV02B business-logic dumping-ground and trivial one-off-view boundaries | `sql-server.views-read-contracts-and-query-abstractions` | `sql-server` | `../_knowledge/sql-server/views-read-contracts-and-query-abstractions.md` | MAPPED |
| VIV02B-VIV02C read-model/write-table boundary and simple-view updatability caveat | `ef-core.database-view-and-defining-query-mapping` | `ef-core` | `../_knowledge/ef-core/database-view-and-defining-query-mapping.md` | MAPPED |
| VIV02C keyless identity/tracking behavior versus an honestly stable unique key | `ef-core.database-view-and-defining-query-mapping` | `ef-core` | `../_knowledge/ef-core/database-view-and-defining-query-mapping.md` | MAPPED |
| VIV01-VIV02 generic keyless reusable-view/fixed-query model and `ToSqlQuery` query surface | `ef-core.keyless-models-vs-direct-sql-results` | `ef-core` | `../_knowledge/ef-core/keyless-models-vs-direct-sql-results.md` | MERGED |
| VIV03A-VIV03B unique clustered index as the materialization step and physical view-result foundation | `sql-server.indexed-view-materialization-and-write-cost` | `sql-server` | `../_knowledge/sql-server/indexed-view-materialization-and-write-cost.md` | MAPPED |
| VIV03C source-table insert, automatic synchronized aggregate-row update and source-table write ownership | `sql-server.indexed-view-materialization-and-write-cost` | `sql-server` | `../_knowledge/sql-server/indexed-view-materialization-and-write-cost.md` | MAPPED |
| VIV03D nonclustered indexes only after the unique clustered foundation | `sql-server.indexed-view-materialization-and-write-cost` | `sql-server` | `../_knowledge/sql-server/indexed-view-materialization-and-write-cost.md` | MAPPED |
| VIV03D filter/join/group/aggregate/computed maintenance chain and read-speed-versus-write-cost tradeoff | `sql-server.indexed-view-materialization-and-write-cost` | `sql-server` | `../_knowledge/sql-server/indexed-view-materialization-and-write-cost.md` | MAPPED |
| VIV04A-VIV04B schema dependency protection, blocked incompatible changes and physical-maintenance rationale | `sql-server.indexed-view-schemabinding-and-eligibility` | `sql-server` | `../_knowledge/sql-server/indexed-view-schemabinding-and-eligibility.md` | MAPPED |
| VIV04C explicit schema-qualified object names and no-`SELECT *` dependency rule | `sql-server.indexed-view-schemabinding-and-eligibility` | `sql-server` | `../_knowledge/sql-server/indexed-view-schemabinding-and-eligibility.md` | MAPPED |
| VIV04D `COUNT`/`COUNT_BIG` result types, int-overflow rationale and maintained grouped-view count requirement | `sql-server.indexed-view-schemabinding-and-eligibility` | `sql-server` | `../_knowledge/sql-server/indexed-view-schemabinding-and-eligibility.md` | MAPPED |
| VIV04 integrated schema-bound, qualified, deterministic aggregate definition followed by unique clustered index | `sql-server.indexed-view-schemabinding-and-eligibility` | `sql-server` | `../_knowledge/sql-server/indexed-view-schemabinding-and-eligibility.md` | MAPPED |
| Image/text inventories, staged audit history and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Normal SQL view contracts and EF Core mapping are separated because database-interface design and ORM model identity answer different questions.
- Indexed-view physical maintenance and indexed-view eligibility are separate units: one explains read/write economics, the other the schema rules that make maintenance safe.
- Existing keyless-model knowledge honestly covers the generic `HasNoKey`/`ToSqlQuery` boundary and is merged rather than repeated as a third EF unit.

| Status | Count |
|---|---:|
| MAPPED | 16 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
