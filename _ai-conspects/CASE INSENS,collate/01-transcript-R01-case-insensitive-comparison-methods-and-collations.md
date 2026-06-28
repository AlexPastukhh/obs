# Regional transcript — R01: Case-insensitive comparison methods and collations

Conspect: `CASE INSENS,collate`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

SQL Server string comparison behavior is primarily controlled by collation. A case-insensitive collation compares case variants as equal without applying `LOWER` or `UPPER` to every row.

## Collation properties

- `CI` means case-insensitive; `CS` means case-sensitive.
- `AI` and `AS` control accent sensitivity.
- Binary collations compare encoded values using binary rules.
- Database, column and expression collations can differ.

## Comparison choices

- Prefer a column defined with the comparison semantics required by the application.
- Use an explicit `COLLATE` for an exceptional query or cross-collation comparison.
- `LOWER(column) = LOWER(@value)` works semantically but is usually non-SARGable without a matching computed index.

## Equality and LIKE

- Both equality and LIKE follow the selected collation's case/accent rules.
- Parameter data type and collation should be compatible with the column.

## Representative pattern

```sql
SELECT *
FROM Users
WHERE UserName = @UserName
  COLLATE Latin1_General_100_CI_AS;
```

## Caveats

- Applying an explicit collation to the indexed column can affect index usage.
- Choose a collation compatible with the stored data and language rules.

## Source labels

- `!!!`

## Covered text elements

```text
T-001
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
