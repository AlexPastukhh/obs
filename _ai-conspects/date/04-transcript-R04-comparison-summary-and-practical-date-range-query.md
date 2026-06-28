# Regional transcript — R04: Comparison summary and practical date-range query

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

Use extraction functions to describe output; use range predicates to retrieve rows efficiently. The date range should match the exact business time zone and precision.

## Function selection

- `YEAR` is concise for only the year.
- `DATEPART` supports many numeric components.
- `FORMAT` produces localized or custom strings.
- None of these is normally the best way to filter an indexed date column.

## Half-open intervals

- Use `>= start` and `< nextBoundary`.
- Avoid end-of-day constants such as 23:59:59.997, which depend on data type precision.
- Calculate boundaries once in application code or SQL variables.

## Index-friendly design

- Keep the column side free of conversion and formatting functions.
- Use typed parameters matching the column type.
- For recurring fiscal or local-calendar grouping, consider a calendar table or indexed computed columns.

## Representative pattern

```sql
DECLARE @Start datetime2 = '2026-06-01T00:00:00';
DECLARE @End   datetime2 = '2026-07-01T00:00:00';

SELECT *
FROM Orders
WHERE OrderDate >= @Start
  AND OrderDate < @End;
```

## Caveats

- Convert UTC timestamps to the required business time zone before calculating local boundaries.
- Inspect the execution plan to confirm the expected seek.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-006, IU-007
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
