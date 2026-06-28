# Regional transcript — R02: DATEPART component extraction

Conspect: `date`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`DATEPART` extracts a selected component from a date/time value and supports more parts than the convenience functions `YEAR`, `MONTH`, and `DAY`.

## Supported parts

- Common parts include year, quarter, month, day, dayofyear, hour, minute and second.
- `iso_week` uses ISO week-numbering rules.
- `weekday` can depend on the session's `SET DATEFIRST` setting.
- `tzoffset` is relevant to datetimeoffset values.

## Use cases

- Project components for reporting.
- Group by month or quarter when the reporting definition is clear.
- Calculate partition labels or diagnostics.

## Filtering

- Wrapping the indexed column in `DATEPART` has the same SARGability concern as `YEAR`.
- Prefer range predicates or persisted indexed computed columns for frequent component searches.

## Representative pattern

```sql
SELECT
    DATEPART(year, CreatedAt)  AS [Year],
    DATEPART(month, CreatedAt) AS [Month],
    DATEPART(iso_week, CreatedAt) AS IsoWeek
FROM Events;
```

## Caveats

- Week and weekday results depend on the selected calendar convention.
- Document session settings when weekday numbers are part of business logic.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-003
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
