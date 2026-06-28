# Regional transcript — R02: Navigation and positional window functions

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

Navigation functions read values from other rows in the same ordered partition while preserving the current row.

## LAG and LEAD

- `LAG` reads an earlier row; `LEAD` reads a later row.
- Offset and default values are optional.
- Useful for differences, change detection and interval boundaries.

## FIRST_VALUE and LAST_VALUE

- `FIRST_VALUE` returns the first value in the active window frame.
- `LAST_VALUE` returns the last value in the active frame—not automatically the final row of the partition.
- Use an explicit full-partition frame when the partition's true last value is required.

## Offsets

- The ordering expression defines which row is previous or next.
- Partitioning restarts navigation for each group.

## Representative pattern

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

## Caveats

- Duplicate ordering values need a tie-breaker for deterministic navigation.
- Null results can mean either no row at the offset or a source value that is null.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-002
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
