# Regional transcript — R03: Predicate fundamentals and optimizer properties

Conspect: `CASE INSENS,collate`  
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

A predicate is SARGable when the optimizer can use it as a search argument over an index key rather than evaluating a transformed expression for every row.

## SARGable shapes

- `Column = @value`, ranges, and anchored prefixes can often produce index seeks.
- The column should remain directly comparable to a compatible parameter or constant.
- A selective predicate can greatly reduce rows read.

## Non-SARGable shapes

- Functions applied to the column.
- Implicit conversions of the indexed column.
- Leading wildcard searches.
- Arithmetic transformations of the column.

## Optimizer details

- SARGability does not guarantee a seek; cardinality, selectivity and cost still matter.
- An index seek can still read many rows.
- Inspect actual execution plans and logical reads.

## Representative pattern

```sql
-- Seek-friendly form:
WHERE CreatedAt >= @Start
  AND CreatedAt < @End;

-- Usually non-SARGable:
WHERE CONVERT(date, CreatedAt) = @Date;
```

## Caveats

- Statistics quality and parameter sensitivity also affect plan choice.
- Measure the complete query, not only one predicate.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-010, IU-011
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
