# dbset fromsql fromsqlraw fromsqlinterpolated and LINQ executeupdateasync and executedelete async,database.executesql executeraw,fromsqlquery — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — raw vs interpolated SQL, injection boundaries and set-property expressions

The main danger in raw SQL is concatenating or interpolating untrusted values into the SQL text. Value data should be represented as database parameters. EF Core APIs that accept an interpolated form can extract interpolation holes as parameters; raw-string APIs are safe only when the SQL text is trusted and every value is supplied separately as a parameter.

Some SQL fragments cannot be parameterized, such as a table name, column name, sort direction, or keyword. Dynamic fragments must come from a strict allow-list and, where appropriate, provider quoting—not directly from user input.

`ExecuteUpdate` and `ExecuteDelete` execute set-based SQL directly. They bypass entity materialization and the change tracker. `SetProperty` expressions must be translatable to SQL; arbitrary .NET methods cannot be invoked unless the provider has a translation. After a set-based mutation, already tracked entities can be stale and should be refreshed, cleared, or avoided for that operation.

**Covered source labels:** `T-006, T-007, T-008, T-009, T-010, T-016, T-017, T-018, T-019`

## R02 — ExecuteUpdate and ExecuteDelete execution model

`ExecuteUpdate` and `ExecuteDelete` are immediate database operations over an `IQueryable`. They do not wait for `SaveChanges`, do not use normal tracked-entity change detection, and return an affected-row count. They are well suited to bulk predicates and simple server-side assignments.

Multiple set-based operations and a later `SaveChanges` are not automatically one atomic unit. Use an explicit transaction when several commands must succeed together. Use the affected-row count for optimistic checks when the predicate includes a version or expected-state condition.

**Covered source labels:** `T-014, T-015`

## R03 — entity SQL queries, scalar projections and IQueryable element types

SQL rooted at a `DbSet` is for entity-shaped results. Such results participate in normal entity mapping and are tracked by default unless `AsNoTracking` is applied. The SQL must return the columns required to materialize the mapped entity shape.

`Database.SqlQuery<T>` is for scalar or unmapped result types and projections that do not need entity tracking. `T` is the element type produced by the query—the item type inside the resulting `IQueryable<T>`—not a collection type.

Use entity SQL APIs when the result is a mapped entity graph and use `SqlQuery<T>` when the result is a scalar or dedicated projection. In both cases, preserve parameterization and remember that composability depends on whether the supplied SQL can be embedded as a subquery by the provider.

**Covered source labels:** `T-001, T-002, T-003, T-004, T-005, T-011, T-012, T-013`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
