# Knowledge Registry

Source workspace: `_ai-conspects/sql-syntax-sql-server/`

Authoritative processed sources: `regions/R01-database-creation-master-model-go-files.md`, `regions/R02-login-user-roles-permissions.md`, `regions/R03-stored-proc-output-params-control-flow-rowversion.md`, `regions/R04-core-table-dml-output-variables-if-trycatch.md`, and `regions/R05-upsert-merge-transactions-indexes-alter-constraints-views.md`; completion certified by `CURRENT_SOURCE_OF_TRUTH.md` and `04-stage4-final-coverage-audit.md`.

Original SVG: `source/sql-syntax-sql-server.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| CREATE DATABASE, data/log files and defaults, master/model/system databases, GO/GO n, batch variable scope, and separate query-window connections (R01 sections 1-11) | `sql-server.database-creation-files-system-databases-and-batches` | `sql-server` | `../_knowledge/sql-server/database-creation-files-system-databases-and-batches.md` | MAPPED |
| Login versus user, authentication versus authorization, login options, fixed/custom roles, GRANT, role membership, and least-privilege security shape (R02 sections 1-10) | `sql-server.logins-users-roles-and-permissions` | `sql-server` | `../_knowledge/sql-server/logins-users-roles-and-permissions.md` | MAPPED |
| BEGIN/END, IF/ELSE/EXISTS, DECLARE, SET versus SELECT assignment, @@ROWCOUNT, TRY/CATCH, and THROW (R03 sections 1-4; R04 sections 12-14) | `sql-server.procedural-control-flow-variables-and-errors` | `sql-server` | `../_knowledge/sql-server/procedural-control-flow-variables-and-errors.md` | MAPPED |
| Stored-procedure definition, parameters, OUTPUT parameters, and result-set/output/return-code distinctions (R03 sections 5-8) | `sql-server.stored-procedure-contracts-and-result-channels` | `sql-server` | `../_knowledge/sql-server/stored-procedure-contracts-and-result-channels.md` | MERGED |
| rowversion meaning, optimistic concurrency predicate, update race, and returning the new token (R03 sections 9-10; R04 section 4) | `sql-server.rowversion-concurrency-and-returning-values` | `sql-server` | `../_knowledge/sql-server/rowversion-concurrency-and-returning-values.md` | MAPPED |
| Data types, CREATE TABLE, uniqueidentifier/NEWID/NEWSEQUENTIALID, foreign keys, and cascade rules (R04 sections 1-3 and 5) | `sql-server.table-schema-types-identifiers-and-foreign-keys` | `sql-server` | `../_knowledge/sql-server/table-schema-types-identifiers-and-foreign-keys.md` | MAPPED |
| INSERT/UPDATE/DELETE, OUTPUT inserted/deleted, OUTPUT INTO, scalar/table variables, and DML safety checklist (R04 sections 6-11 and 15) | `sql-server.dml-output-rowcount-and-table-variables` | `sql-server` | `../_knowledge/sql-server/dml-output-rowcount-and-table-variables.md` | MAPPED |
| Upsert race, MERGE mechanics and OUTPUT, concurrency protection, and simpler UPDATE/INSERT alternative (R05 sections 1-5) | `sql-server.upsert-merge-and-concurrency` | `sql-server` | `../_knowledge/sql-server/upsert-merge-and-concurrency.md` | MAPPED |
| Transaction atomicity, BEGIN/COMMIT/ROLLBACK, and @@TRANCOUNT (R05 sections 6-7) | `sql-server.transactions-trancount-and-boundaries` | `sql-server` | `../_knowledge/sql-server/transactions-trancount-and-boundaries.md` | MAPPED |
| Indexes, clustered/nonclustered distinction, ALTER TABLE, constraints, add/drop mechanics, and DDL safety (R05 sections 8-12 and 15) | `sql-server.schema-evolution-indexes-and-constraints` | `sql-server` | `../_knowledge/sql-server/schema-evolution-indexes-and-constraints.md` | MAPPED |
| Normal view definition and table-shaped querying boundary (R05 section 13) | `sql-server.views-read-contracts-and-query-abstractions` | `sql-server` | `../_knowledge/sql-server/views-read-contracts-and-query-abstractions.md` | MERGED |
| Indexed-view materialization, requirements, read benefit, and write cost (R05 section 14) | `sql-server.indexed-view-materialization-and-write-cost` | `sql-server` | `../_knowledge/sql-server/indexed-view-materialization-and-write-cost.md` | MERGED |
| Boundary plans, image inventories, evidence tables, open follow-up hooks, archive manifests, and final coverage audit | — | — | — | NON_LEARNING |

## Boundary decisions

- Region headings are split when they contain distinct durable models; exact learning-section bodies and representative SQL remain in destination units.
- Stored procedures, normal views, and indexed views extend existing models and are therefore MERGED.
- Evidence tables and open processing hooks are not learning material; no verified section 1-15 claim is excluded.

| Status | Count |
|---|---:|
| MAPPED | 9 |
| MERGED | 3 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
