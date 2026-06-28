# Regional transcript — R01: SQL PIVOT syntax and examples

Conspect: `pivot unpivot`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`PIVOT` rotates distinct row values into a fixed set of output columns while aggregating a measure for each row/column intersection.

## Input shape

- The source query should expose a grouping column, a pivot-key column and a value to aggregate.
- Preselect only required columns so unintended columns do not create extra grouping dimensions.
- Aggregate duplicate source rows before or during the pivot.

## Syntax

- Wrap the prepared source in a derived table or CTE.
- Apply `PIVOT (aggregate(value) FOR pivot_key IN ([col1], [col2], ...))`.
- The `IN` list defines the output columns and is static in ordinary SQL.
- Select the grouping columns and pivoted columns from the pivot result.

## Aggregates

- `SUM`, `COUNT`, `MAX`, `MIN` and other supported aggregates define how multiple rows collapse.
- Missing intersections commonly return null.
- Use `COALESCE` when the reporting contract requires zero or another fallback.

## Dynamic pivot

- Dynamic columns require generating a quoted `IN` list and executing dynamic SQL.
- Use safe identifier quoting and parameterize data values.

## Caveats

- PIVOT does not automatically discover strongly typed output columns in static SQL.
- Unexpected source duplicates can silently change aggregate totals.

## Covered source units

### Text elements

```text
T-061, T-062, T-063, T-064
```

### Screenshot uses

```text
IU-004, IU-005, IU-006, IU-007
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
