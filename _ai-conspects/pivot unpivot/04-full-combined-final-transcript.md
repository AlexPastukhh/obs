# Full combined final transcript — pivot unpivot

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 66 / 66
unique screenshots: 7 / 7
screenshot uses: 7 / 7
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — SQL PIVOT syntax and examples

`PIVOT` rotates distinct row values into a fixed set of output columns while aggregating a measure for each row/column intersection.

### Input shape

- The source query should expose a grouping column, a pivot-key column and a value to aggregate.
- Preselect only required columns so unintended columns do not create extra grouping dimensions.
- Aggregate duplicate source rows before or during the pivot.

### Syntax

- Wrap the prepared source in a derived table or CTE.
- Apply `PIVOT (aggregate(value) FOR pivot_key IN ([col1], [col2], ...))`.
- The `IN` list defines the output columns and is static in ordinary SQL.
- Select the grouping columns and pivoted columns from the pivot result.

### Aggregates

- `SUM`, `COUNT`, `MAX`, `MIN` and other supported aggregates define how multiple rows collapse.
- Missing intersections commonly return null.
- Use `COALESCE` when the reporting contract requires zero or another fallback.

### Dynamic pivot

- Dynamic columns require generating a quoted `IN` list and executing dynamic SQL.
- Use safe identifier quoting and parameterize data values.

### Caveats

- PIVOT does not automatically discover strongly typed output columns in static SQL.
- Unexpected source duplicates can silently change aggregate totals.

## R02 — SQL UNPIVOT syntax and examples

`UNPIVOT` converts several columns into rows, usually producing a name column and a value column.

### Input

- Start with a wide row containing repeated measurement columns.
- Choose columns with compatible data types or cast them to a common type first.

### Syntax

- Apply `UNPIVOT (value_column FOR name_column IN ([col1], [col2], ...))`.
- Each listed source column becomes a row whose name is exposed through the name column.
- Retain identifier columns outside the unpivot operator.

### Null behavior

- SQL Server `UNPIVOT` omits null input values.
- Use `CROSS APPLY (VALUES ...)` when explicit control, mixed types or null preservation is required.

### Caveats

- Unpivoted column names become data and may need normalization.
- Collation conflicts can require explicit collation in metadata/name comparisons.

## R03 — Pre-aggregation and multiple-measure pivot workflow

Complex reports are easier to pivot after producing a clean relational source with one row per grouping key, pivot key and measure.

### Pre-aggregation

- Use a CTE or derived table to calculate the intended grain.
- Group by the row dimensions and pivot key.
- Compute the measure once before rotation.
- Verify totals in the pre-aggregated source before adding pivot syntax.

### Multiple measures

- One `PIVOT` expression directly aggregates one value expression.
- For several measures, pivot each measure separately and join results, use conditional aggregation, or reshape the source into measure-name/value rows before pivoting.
- Conditional aggregation with `SUM(CASE WHEN ...)` is often easier to customize.

### Aliases and output

- Use clear aliases for generated report columns.
- Order the final select explicitly.
- Keep business labels separate from physical source column names when possible.

### Performance

- Filter early and index grouping/filtering columns when the workload justifies it.
- Inspect execution plans; PIVOT is not automatically faster than conditional aggregation.
- Avoid repeatedly pivoting and unpivoting the same large dataset.

### Maintainability

- Static pivot columns are appropriate for stable report schemas.
- Dynamic pivots are suitable when categories truly vary, but consumers must handle changing schemas.
- Document null and duplicate-row semantics.

### Caveats

- A visually correct report can still contain incorrect totals if source grain is wrong.
- Dynamic SQL must quote identifiers and separate them from parameterized values.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 4 | 4 | 4 | 0 | 0 |
| R02 | 1 | 2 | 2 | 0 | 0 |
| R03 | 61 | 1 | 1 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
