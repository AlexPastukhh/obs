# Computed columns — final coverage transcript

Source: `computed columns.svg`  
Coverage: **18 image uses + 10 canvas labels**

## 0.1 Area understanding / reading quality

This conspect explains how SQL Server computed columns behave when they are virtual, `PERSISTED`, or indexed. The central distinction is between computing a value when it is read, storing it in the base row, and storing computed keys inside an index. The screenshots and labels were readable enough to reconstruct the complete conceptual road. Exact SQL punctuation remains preserved in the source PNGs.

## R01 — basic computed columns and `PERSISTED`

A computed column such as:

```sql
NormalizedEmail AS LOWER(Email)
```

stores the expression in table metadata. Without `PERSISTED`, SQL Server can calculate the value when a query needs it. The base table does not necessarily keep the computed result as a separate stored column value.

Adding `PERSISTED` changes that behavior: SQL Server physically stores the computed result with the row and automatically recalculates it when dependent base columns change. A later `SELECT` can read the stored value instead of evaluating the expression again.

Practical distinction:

```text
non-persisted computed column -> expression evaluated when needed
PERSISTED computed column     -> value stored in the row and maintained by SQL Server
```

The source also shows `INSERT`, `SELECT`, and `UPDATE` flows. Application code updates the base column; SQL Server is responsible for recomputing the persisted value.

## R02 — indexing a computed column

A computed column can be used as an index key when its expression satisfies SQL Server's indexing requirements, especially determinism and precision. The source example builds a unique index over normalized email values.

Even when the base computed column is not stored as `PERSISTED`, an index over it stores the computed index keys. On `INSERT` or `UPDATE`, SQL Server:

1. reads the changed base values;
2. evaluates the computed expression;
3. checks uniqueness or other index constraints;
4. inserts, removes, or updates the index key;
5. keeps the index synchronized with the row.

This is why changing `Email` automatically changes the indexed `NormalizedEmail` key. SQL Server tracks the expression's dependency on `Email`; application code does not manually update the computed column or its index entry.

The predictable example uses `LOWER(Email)`: for the same input, it produces the same output, so SQL Server can maintain a stable index key.

## R03 — nondeterministic functions and index safety

A nondeterministic expression such as `GETDATE()` can change as time passes even if no `INSERT`, `UPDATE`, or `DELETE` occurs. A row could therefore appear to have a different computed value tomorrow while the database received no DML event that would tell it to update the index.

That creates the impossible maintenance problem highlighted by the conspect:

```text
no row change -> computed value changes -> index would become stale
```

Therefore indexable computed expressions must be deterministic: the same input values must always produce the same result. The index needs a stable marker that SQL Server can recalculate exactly when dependencies change.

## Final checklist

```text
- Use a normal computed column when recalculation-on-read is acceptable.
- Use PERSISTED when the result should be stored with the row.
- An index stores computed keys and must be maintained on dependent-column changes.
- Prefer deterministic and precise expressions for indexed computed columns.
- Avoid time-, random-, or environment-dependent functions in index keys.
- Let SQL Server maintain computed values and indexes; update only base columns.
```
