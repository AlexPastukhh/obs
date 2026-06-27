# dbset fromsql fromsqlraw fromsqlinterpolated and LINQ executeupdateasync and executedelete async,database.executesql executeraw,fromsqlquery — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

The complete corrected SVG and recovered screenshots are the primary source. Candidate regions, vector paths, and nearest labels were used only as navigation hints. Every screenshot was visually reviewed before final region assignment. Existing label-only materials remain preserved but are superseded as the current source interpretation.

# R01 — API families, immediate execution, and transaction boundaries

EF Core separates query APIs from immediate command APIs. `FromSql`/`FromSqlInterpolated`/`FromSqlRaw` and `Database.SqlQuery<T>` create queryables that execute when enumerated. `ExecuteSql`/`ExecuteSqlRaw`/interpolated command variants execute immediately and return affected-row counts. `ExecuteUpdateAsync` and `ExecuteDeleteAsync` are also immediate set-based commands. These immediate operations are not deferred until `SaveChanges`, and raw command APIs do not automatically wrap several unrelated operations into one application transaction; use an explicit transaction when atomicity across operations is required.

**Reviewed image uses:** S-001, S-004, S-005, S-006, S-048

**Assigned SVG text nodes:** none


# R02 — FromSql entity queries, tracking, and parameterized values

`FromSql` query APIs are rooted at a `DbSet<TEntity>` and are intended for entity-shaped SQL results. Interpolated values become database parameters rather than SQL text, which protects against injection and lets the provider handle quoting and types. The returned query can normally compose with LINQ when the SQL is composable, and entity results participate in normal materialization and tracking unless `AsNoTracking` is used. Changing a tracked entity returned by `FromSql` and then calling `SaveChanges` persists that tracked change; a no-tracking or non-entity result is not updated this way.

**Reviewed image uses:** S-002, S-003, S-008, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-019, S-020, S-021, S-037, S-039

**Assigned SVG text nodes:** T-004, T-005, T-009


# R03 — Dynamic SQL structure and safe raw construction

SQL parameters represent values, not identifiers or syntax. Dynamic column names, table names, sort directions, optional clauses, and other structural fragments therefore require raw SQL construction. Any structural choice must come from a strict whitelist or trusted query-builder logic; directly concatenating user input into SQL is an injection vulnerability. Raw APIs can still parameterize ordinary values through placeholders and separate arguments. `FormattableString` helps only when the interpolated pieces are values—placing an entire WHERE fragment or identifier into interpolation would parameterize it as a value and produce invalid semantics.

**Reviewed image uses:** S-007, S-009, S-018, S-022, S-025, S-028, S-029, S-031, S-033, S-034, S-035, S-038

**Assigned SVG text nodes:** T-006, T-007, T-008, T-010


# R04 — Database.SqlQuery for scalar, DTO, and non-entity results

`Database.SqlQuery<T>` is the database-level query API for scalars, DTOs, records, and other unmapped/non-entity result shapes. It returns an `IQueryable<T>` and can materialize many rows or multiple columns when the selected shape matches `T`. These results are query projections, not tracked entities, and are not persisted by `SaveChanges`. For a modeled entity or keyless entity that should use EF's entity materialization rules, the normal path remains `DbSet<TEntity>.FromSql(...)`.

**Reviewed image uses:** S-023, S-024, S-026, S-027, S-030, S-032, S-036

**Assigned SVG text nodes:** T-001, T-002, T-003, T-011, T-012, T-013


# R05 — ExecuteUpdateAsync and ExecuteDeleteAsync set-based DML

`ExecuteUpdateAsync` and `ExecuteDeleteAsync` translate a LINQ filter into immediate set-based UPDATE or DELETE SQL. They do not load entities, do not use the change tracker, and are not deferred until `SaveChanges`. Already tracked instances can therefore become stale, and mixing later tracked saves with bulk changes requires an explicit refresh or careful unit-of-work design. `SetProperty` describes translatable column assignments; arbitrary domain methods, validation side effects, events, or per-entity invariants are not executed. Use these APIs for simple bulk state changes and tracked entities plus domain methods plus `SaveChanges` when business behavior must run for each aggregate.

**Reviewed image uses:** S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-049, S-050, S-051, S-052

**Assigned SVG text nodes:** T-014, T-015, T-016, T-017, T-018, T-019


## Closure

```text
embedded assets: 51
total image uses: 52
processed image uses: 52
restored image uses: 52
duplicate placements: 1
SVG text nodes: 19
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
