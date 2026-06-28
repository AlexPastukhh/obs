# Regional transcript — R03: Pre-aggregation and multiple-measure pivot workflow

Conspect: `pivot unpivot`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 61 / 61
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Complex reports are easier to pivot after producing a clean relational source with one row per grouping key, pivot key and measure.

## Pre-aggregation

- Use a CTE or derived table to calculate the intended grain.
- Group by the row dimensions and pivot key.
- Compute the measure once before rotation.
- Verify totals in the pre-aggregated source before adding pivot syntax.

## Multiple measures

- One `PIVOT` expression directly aggregates one value expression.
- For several measures, pivot each measure separately and join results, use conditional aggregation, or reshape the source into measure-name/value rows before pivoting.
- Conditional aggregation with `SUM(CASE WHEN ...)` is often easier to customize.

## Aliases and output

- Use clear aliases for generated report columns.
- Order the final select explicitly.
- Keep business labels separate from physical source column names when possible.

## Performance

- Filter early and index grouping/filtering columns when the workload justifies it.
- Inspect execution plans; PIVOT is not automatically faster than conditional aggregation.
- Avoid repeatedly pivoting and unpivoting the same large dataset.

## Maintainability

- Static pivot columns are appropriate for stable report schemas.
- Dynamic pivots are suitable when categories truly vary, but consumers must handle changing schemas.
- Document null and duplicate-row semantics.

## Caveats

- A visually correct report can still contain incorrect totals if source grain is wrong.
- Dynamic SQL must quote identifiers and separate them from parameterized values.

## Covered source units

### Text elements

```text
T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015
T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029, T-030
T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-042, T-043, T-044, T-045
T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057, T-058, T-059, T-065
T-066
```

### Screenshot uses

```text
IU-002
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
