# Regional transcript — R01: Ranking and numbering window functions

Conspect: `window funcs`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Window ranking functions assign numbers inside an ordered partition without collapsing rows as GROUP BY would.

## ROW_NUMBER

- Assigns a unique sequential number to every row.
- Ties are broken by the full ORDER BY list.
- Add a deterministic tie-breaker when stable results matter.
- Useful for pagination, deduplication and top-one-per-group patterns.

## RANK and DENSE_RANK

- `RANK` gives ties the same rank and leaves gaps afterwards.
- `DENSE_RANK` gives ties the same rank without gaps.
- Use them when equal ordering values should share a position.

## NTILE

- Divides ordered rows into approximately equal numbered buckets.
- Earlier buckets may contain one more row when division is uneven.

## Representative pattern

```sql
SELECT
    EmployeeId,
    DepartmentId,
    Salary,
    ROW_NUMBER() OVER (
        PARTITION BY DepartmentId
        ORDER BY Salary DESC, EmployeeId
    ) AS RowNumber,
    DENSE_RANK() OVER (
        PARTITION BY DepartmentId
        ORDER BY Salary DESC
    ) AS SalaryRank
FROM Employees;
```

## Caveats

- Window ORDER BY defines analytical order, not the final result-set order.
- Missing deterministic tie-breakers can produce different row numbers between executions.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-003, IU-004
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
