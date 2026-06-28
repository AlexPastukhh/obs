# Full combined final transcript — date

Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
meaningful text elements: 0 / 0
unique embedded screenshots: 7 / 7
screenshot uses: 7 / 7
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — YEAR extraction and grouping use

In SQL Server, `YEAR(date_expression)` extracts the calendar year as an integer. It is concise for projection and grouping but should usually not wrap an indexed date column inside a filtering predicate.

### Projection and grouping

- `YEAR(OrderDate)` is equivalent to `DATEPART(year, OrderDate)`.
- It is useful in a SELECT list or GROUP BY for reports.
- Null input returns null.
- The extracted number has no formatting or time-zone conversion semantics.

### Filtering concern

- `WHERE YEAR(OrderDate) = 2026` applies a function to every candidate row.
- That shape is commonly non-SARGable and can prevent an index seek on `OrderDate`.
- Use a half-open date range instead.

### Boundary pattern

- Lower bound is inclusive.
- Upper bound is the start of the next year and exclusive.
- The half-open range works with date, datetime and datetime2 values containing times.

### Representative pattern

```sql
SELECT YEAR(OrderDate) AS OrderYear, COUNT(*) AS OrderCount
FROM Orders
GROUP BY YEAR(OrderDate);

SELECT *
FROM Orders
WHERE OrderDate >= '20260101'
  AND OrderDate <  '20270101';
```

### Caveats

- Interpretation of datetimeoffset values may require an explicit time-zone rule before extracting a year.
- Use unambiguous date literals or typed parameters.

## R02 — DATEPART component extraction

`DATEPART` extracts a selected component from a date/time value and supports more parts than the convenience functions `YEAR`, `MONTH`, and `DAY`.

### Supported parts

- Common parts include year, quarter, month, day, dayofyear, hour, minute and second.
- `iso_week` uses ISO week-numbering rules.
- `weekday` can depend on the session's `SET DATEFIRST` setting.
- `tzoffset` is relevant to datetimeoffset values.

### Use cases

- Project components for reporting.
- Group by month or quarter when the reporting definition is clear.
- Calculate partition labels or diagnostics.

### Filtering

- Wrapping the indexed column in `DATEPART` has the same SARGability concern as `YEAR`.
- Prefer range predicates or persisted indexed computed columns for frequent component searches.

### Representative pattern

```sql
SELECT
    DATEPART(year, CreatedAt)  AS [Year],
    DATEPART(month, CreatedAt) AS [Month],
    DATEPART(iso_week, CreatedAt) AS IsoWeek
FROM Events;
```

### Caveats

- Week and weekday results depend on the selected calendar convention.
- Document session settings when weekday numbers are part of business logic.

## R03 — FORMAT display formatting and SARGability

`FORMAT` returns a formatted string using .NET formatting rules. It is convenient for presentation-oriented output but is substantially heavier than native date functions and should not drive filtering.

### Formatting

- A format such as `yyyy-MM` produces a textual year-month label.
- An optional culture controls localized names and separators.
- The return type is nvarchar.
- It is suitable for a final report projection when formatting cannot be deferred to the client.

### Performance

- `FORMAT` relies on CLR formatting and is often slower than `CONVERT` or date-part arithmetic.
- Do not use it in high-volume grouping or join predicates without measurement.
- Formatting in the application layer is usually more scalable.

### Predicate warning

- `WHERE FORMAT(OrderDate, 'yyyy-MM') = '2026-06'` is non-SARGable.
- Use a range on the underlying date column.

### Representative pattern

```sql
SELECT FORMAT(OrderDate, 'yyyy-MM', 'en-US') AS MonthLabel
FROM Orders;

-- Filtering:
WHERE OrderDate >= '20260601'
  AND OrderDate <  '20260701';
```

### Caveats

- Formatted strings are presentation values, not dates.
- Lexical ordering is correct only for deliberately sortable formats.

## R04 — Comparison summary and practical date-range query

Use extraction functions to describe output; use range predicates to retrieve rows efficiently. The date range should match the exact business time zone and precision.

### Function selection

- `YEAR` is concise for only the year.
- `DATEPART` supports many numeric components.
- `FORMAT` produces localized or custom strings.
- None of these is normally the best way to filter an indexed date column.

### Half-open intervals

- Use `>= start` and `< nextBoundary`.
- Avoid end-of-day constants such as 23:59:59.997, which depend on data type precision.
- Calculate boundaries once in application code or SQL variables.

### Index-friendly design

- Keep the column side free of conversion and formatting functions.
- Use typed parameters matching the column type.
- For recurring fiscal or local-calendar grouping, consider a calendar table or indexed computed columns.

### Representative pattern

```sql
DECLARE @Start datetime2 = '2026-06-01T00:00:00';
DECLARE @End   datetime2 = '2026-07-01T00:00:00';

SELECT *
FROM Orders
WHERE OrderDate >= @Start
  AND OrderDate < @End;
```

### Caveats

- Convert UTC timestamps to the required business time zone before calculating local boundaries.
- Inspect the execution plan to confirm the expected seek.

## Regional source map

### R01

- transcript: `01-transcript-R01-year-extraction-and-grouping-use.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-datepart-component-extraction.md`
- text elements: `0`
- screenshot uses: `1`
- unique screenshots: `1`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-format-display-formatting-and-sargability.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-comparison-summary-and-practical-date-range-query.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
runtime/library/database-version details and original examples.
