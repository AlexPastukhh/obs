# Regional transcript — R03: Window frame specifications

Conspect: `window funcs`  
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

A window frame selects rows relative to the current row inside the partition. Aggregate and positional functions can change meaning dramatically with the frame.

## ROWS frame

- `ROWS` counts physical ordered rows.
- `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` produces a running aggregate.
- `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` creates a three-row moving frame.

## RANGE frame

- `RANGE` groups peer rows that have the same ordering value.
- Its behavior can differ from `ROWS` when ties exist.
- Provider support for numeric/date offsets varies.

## Full partition

- `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` exposes the entire partition.
- This explicit frame is important for `LAST_VALUE`.

## Representative pattern

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

## Caveats

- The default frame depends on the presence of ORDER BY and the function.
- State the frame explicitly when correctness depends on peer-row behavior.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-001
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
