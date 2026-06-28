# Full combined final transcript — window funcs

Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
meaningful text elements: 0 / 0
unique embedded screenshots: 4 / 4
screenshot uses: 4 / 4
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Ranking and numbering window functions

Window ranking functions assign numbers inside an ordered partition without collapsing rows as GROUP BY would.

### ROW_NUMBER

- Assigns a unique sequential number to every row.
- Ties are broken by the full ORDER BY list.
- Add a deterministic tie-breaker when stable results matter.
- Useful for pagination, deduplication and top-one-per-group patterns.

### RANK and DENSE_RANK

- `RANK` gives ties the same rank and leaves gaps afterwards.
- `DENSE_RANK` gives ties the same rank without gaps.
- Use them when equal ordering values should share a position.

### NTILE

- Divides ordered rows into approximately equal numbered buckets.
- Earlier buckets may contain one more row when division is uneven.

### Representative pattern

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

### Caveats

- Window ORDER BY defines analytical order, not the final result-set order.
- Missing deterministic tie-breakers can produce different row numbers between executions.

## R02 — Navigation and positional window functions

Navigation functions read values from other rows in the same ordered partition while preserving the current row.

### LAG and LEAD

- `LAG` reads an earlier row; `LEAD` reads a later row.
- Offset and default values are optional.
- Useful for differences, change detection and interval boundaries.

### FIRST_VALUE and LAST_VALUE

- `FIRST_VALUE` returns the first value in the active window frame.
- `LAST_VALUE` returns the last value in the active frame—not automatically the final row of the partition.
- Use an explicit full-partition frame when the partition's true last value is required.

### Offsets

- The ordering expression defines which row is previous or next.
- Partitioning restarts navigation for each group.

### Representative pattern

```sql
SELECT
    AccountId,
    TransactionDate,
    Amount,
    LAG(Amount) OVER (
        PARTITION BY AccountId
        ORDER BY TransactionDate
    ) AS PreviousAmount,
    LEAD(TransactionDate) OVER (
        PARTITION BY AccountId
        ORDER BY TransactionDate
    ) AS NextDate
FROM Transactions;
```

### Caveats

- Duplicate ordering values need a tie-breaker for deterministic navigation.
- Null results can mean either no row at the offset or a source value that is null.

## R03 — Window frame specifications

A window frame selects rows relative to the current row inside the partition. Aggregate and positional functions can change meaning dramatically with the frame.

### ROWS frame

- `ROWS` counts physical ordered rows.
- `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` produces a running aggregate.
- `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` creates a three-row moving frame.

### RANGE frame

- `RANGE` groups peer rows that have the same ordering value.
- Its behavior can differ from `ROWS` when ties exist.
- Provider support for numeric/date offsets varies.

### Full partition

- `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` exposes the entire partition.
- This explicit frame is important for `LAST_VALUE`.

### Representative pattern

```sql
SELECT
    SaleDate,
    Amount,
    SUM(Amount) OVER (
        ORDER BY SaleDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS RunningTotal
FROM Sales;
```

### Caveats

- The default frame depends on the presence of ORDER BY and the function.
- State the frame explicitly when correctness depends on peer-row behavior.

## Regional source map

### R01

- transcript: `01-transcript-R01-ranking-and-numbering-window-functions.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-navigation-and-positional-window-functions.md`
- text elements: `0`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-window-frame-specifications.md`
- text elements: `0`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
runtime/library/database-version details and original examples.
