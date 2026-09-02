# Knowledge Registry - dbset fromsql fromsqlraw fromsqlinterpolated and LINQ executeupdateasync and executedelete async,database.executesql executeraw,fromsqlquery

Source workspace: `_ai-conspects/dbset fromsql fromsqlraw fromsqlinterpolated and LINQ executeupdateasync and executedelete async,database.executesql executeraw,fromsqlquery/`

Authoritative processed source: `regions/full-semantic-transcript-v001.md`

Original SVG: `source/source-complete-v002.svg`, SHA-256 `6cd7d851e1faf6da4ebadbdd509713f7a552b5b52769d44c084ccc10da70ab8d`, Git blob `38a2d5583e5fda228cfcb9e511297aaf0c86a989` (51 unique images, 52 image uses, 1 duplicate placement, 19 SVG text nodes)

---

## Coverage map

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Four execution models: query APIs (FromSql family, `SqlQuery<T>` / `SqlQueryRaw<T>`), immediate SQL commands (ExecuteSql family), immediate set-based DML (ExecuteUpdate/Delete), change-tracker workflow | `ef-core.fromsql-and-sqlquery-apis` | ef-core | `../_knowledge/ef-core/fromsql-and-sqlquery-apis.md` | MAPPED |
| FromSql as query API, not mutation API; executes on materialization, not on SaveChanges | `ef-core.fromsql-and-sqlquery-apis` | ef-core | `../_knowledge/ef-core/fromsql-and-sqlquery-apis.md` | MAPPED |
| FromSql entity results tracking by default; tracked entity can be updated via SaveChanges; AsNoTracking/detached/non-entity exceptions | `ef-core.fromsql-and-sqlquery-apis` | ef-core | `../_knowledge/ef-core/fromsql-and-sqlquery-apis.md` | MAPPED |
| `Database.SqlQuery<T>` for scalar, DTO, report, non-entity results; scalar and multi-column examples; non-entity projection does not trigger SaveChanges | `ef-core.fromsql-and-sqlquery-apis` | ef-core | `../_knowledge/ef-core/fromsql-and-sqlquery-apis.md` | MAPPED |
| Interpolated SQL parameterizes values via FormattableString; SQL injection protection; plan reuse; applies to command APIs too | `ef-core.fromsql-parameterization-and-dynamic-sql` | ef-core | `../_knowledge/ef-core/fromsql-parameterization-and-dynamic-sql.md` | MAPPED |
| Raw APIs not inherently unsafe; safe raw parameterization via positional {0} and named @p0; unsafe inline string concatenation example | `ef-core.fromsql-parameterization-and-dynamic-sql` | ef-core | `../_knowledge/ef-core/fromsql-parameterization-and-dynamic-sql.md` | MAPPED |
| Parameters cannot represent SQL grammar: table names, column names, ASC/DESC, operators, WHERE fragments; column name interpolation broken example | `ef-core.fromsql-parameterization-and-dynamic-sql` | ef-core | `../_knowledge/ef-core/fromsql-parameterization-and-dynamic-sql.md` | MAPPED |
| Safe dynamic SQL: whitelist column mapping, direction tokens, table validation, optional fragments + StringBuilder + parameterized values pattern | `ef-core.fromsql-parameterization-and-dynamic-sql` | ef-core | `../_knowledge/ef-core/fromsql-parameterization-and-dynamic-sql.md` | MAPPED |
| FormattableString parameterizes values not SQL fragments; clause interpolation becomes parameter value not grammar | `ef-core.fromsql-parameterization-and-dynamic-sql` | ef-core | `../_knowledge/ef-core/fromsql-parameterization-and-dynamic-sql.md` | MAPPED |
| Immediate command APIs (ExecuteSql*): immediate execution, affected-row count, not part of change tracker, not SaveChanges; multiple immediate commands not atomic; explicit transaction required | `ef-core.stored-procedure-query-command-and-composition` | ef-core | `../_knowledge/ef-core/stored-procedure-query-command-and-composition.md` | MERGED |
| ExecuteUpdateAsync/ExecuteDeleteAsync mechanics: immediate execution, one SQL statement, no entity load, bypass change tracker, no SaveChanges | `ef-core.executeupdate-executedelete-and-set-based-dml` | ef-core | `../_knowledge/ef-core/executeupdate-executedelete-and-set-based-dml.md` | MAPPED |
| SetProperty describes SQL column/value; cannot call domain methods; invalid Deactivate() example | `ef-core.executeupdate-executedelete-and-set-based-dml` | ef-core | `../_knowledge/ef-core/executeupdate-executedelete-and-set-based-dml.md` | MAPPED |
| Change-tracker staleness after ExecuteUpdate; in-memory object not refreshed; ExecuteDelete does not auto-detach; reload/clear recommendations | `ef-core.executeupdate-executedelete-and-set-based-dml` | ef-core | `../_knowledge/ef-core/executeupdate-executedelete-and-set-based-dml.md` | MAPPED |
| Domain rules bypass: set-based DML skips entity methods, validation, domain invariants, events, policy, side effects; good/poor fit examples | `ef-core.executeupdate-executedelete-and-set-based-dml` | ef-core | `../_knowledge/ef-core/executeupdate-executedelete-and-set-based-dml.md` | MAPPED |
| `00-source-check-and-boundary-review.md`, `01-final-coverage-transcript.md`, `02-final-closure-audit.md`, `03-source-repair-full-svg-v002.md`, `04-full-svg-semantic-transcript-v002.md`, `05-independent-full-svg-audit-v002.md`, `TRANSCRIPT_REBUILD_AUDIT.md` — processing/audit artifacts | - | - | - | NON_LEARNING |
| `QUESTIONS.md` — repetition/question bank | - | - | - | NON_LEARNING |
| `APPLY_ARCHIVE.md`, `MANIFEST.md` — archive/manifest metadata | - | - | - | NON_LEARNING |
| `assets/`, `audit-assets/`, `data/` directories — source images and audit assets | - | - | - | NON_LEARNING |

---

## Summary

| Status | Count |
|---|---:|
| MAPPED | 13 |
| MERGED | 1 |
| NON_LEARNING | 4 |
| UNRESOLVED | 0 |
