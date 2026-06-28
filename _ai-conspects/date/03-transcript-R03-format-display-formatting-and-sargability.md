# Regional transcript — R03: FORMAT display formatting and SARGability

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

`FORMAT` returns a formatted string using .NET formatting rules. It is convenient for presentation-oriented output but is substantially heavier than native date functions and should not drive filtering.

## Formatting

- A format such as `yyyy-MM` produces a textual year-month label.
- An optional culture controls localized names and separators.
- The return type is nvarchar.
- It is suitable for a final report projection when formatting cannot be deferred to the client.

## Performance

- `FORMAT` relies on CLR formatting and is often slower than `CONVERT` or date-part arithmetic.
- Do not use it in high-volume grouping or join predicates without measurement.
- Formatting in the application layer is usually more scalable.

## Predicate warning

- `WHERE FORMAT(OrderDate, 'yyyy-MM') = '2026-06'` is non-SARGable.
- Use a range on the underlying date column.

## Representative pattern

```sql
SELECT FORMAT(OrderDate, 'yyyy-MM', 'en-US') AS MonthLabel
FROM Orders;

-- Filtering:
WHERE OrderDate >= '20260601'
  AND OrderDate <  '20260701';
```

## Caveats

- Formatted strings are presentation values, not dates.
- Lexical ordering is correct only for deliberately sortable formats.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-004, IU-005
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
