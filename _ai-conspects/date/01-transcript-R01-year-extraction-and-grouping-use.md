# Regional transcript — R01: YEAR extraction and grouping use

Conspect: `date`  
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

In SQL Server, `YEAR(date_expression)` extracts the calendar year as an integer. It is concise for projection and grouping but should usually not wrap an indexed date column inside a filtering predicate.

## Projection and grouping

- `YEAR(OrderDate)` is equivalent to `DATEPART(year, OrderDate)`.
- It is useful in a SELECT list or GROUP BY for reports.
- Null input returns null.
- The extracted number has no formatting or time-zone conversion semantics.

## Filtering concern

- `WHERE YEAR(OrderDate) = 2026` applies a function to every candidate row.
- That shape is commonly non-SARGable and can prevent an index seek on `OrderDate`.
- Use a half-open date range instead.

## Boundary pattern

- Lower bound is inclusive.
- Upper bound is the start of the next year and exclusive.
- The half-open range works with date, datetime and datetime2 values containing times.

## Representative pattern

```sql
SELECT YEAR(OrderDate) AS OrderYear, COUNT(*) AS OrderCount
FROM Orders
GROUP BY YEAR(OrderDate);

SELECT *
FROM Orders
WHERE OrderDate >= '20260101'
  AND OrderDate <  '20270101';
```

## Caveats

- Interpretation of datetimeoffset values may require an explicit time-zone rule before extracting a year.
- Use unambiguous date literals or typed parameters.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-001, IU-002
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
