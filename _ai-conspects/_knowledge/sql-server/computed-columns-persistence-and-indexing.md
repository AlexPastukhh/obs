# Computed columns, persistence, and indexing

Knowledge ID: `sql-server.computed-columns-persistence-and-indexing`

Topic: `sql-server`

A non-persisted computed column stores its expression in metadata and calculates the value when needed. `PERSISTED` stores the result in the base row and SQL Server recomputes it when dependent columns change:

```sql
NormalizedEmail AS LOWER(Email) PERSISTED
```

An index on a computed column stores computed index keys even if the base computed value is not persisted. On insert/update, SQL Server evaluates the expression, enforces uniqueness or other constraints, and updates the index entry; application code changes only base columns.

Indexed computed expressions must satisfy engine requirements such as determinism and precision. `LOWER(Email)` can produce a stable key for the same input. A time-dependent expression such as `GETDATE()` could change without DML, leaving no event that tells SQL Server to refresh its key:

```text
no row change → computed value changes → index would become stale
```

Use non-persisted computation when read-time evaluation is acceptable, `PERSISTED` when the row should store the value, and deterministic precise expressions for indexes.

## Sources
- Workspace: `_ai-conspects/computed columns/`
- Processed source: `02-source-preserving-transcript-v002.md`, complete transcript
