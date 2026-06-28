# Regional transcript — R02: LINQ grouping and joining

Conspect: `-all`  
Generated: 2026-06-28 03:00:00 UTC

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

Grouping partitions elements by a key, while joins correlate elements from two sequences according to matching keys.

## GroupBy

- `GroupBy` returns groups where each group has a `Key` and an enumerable of matching elements.
- Element-selector and result-selector overloads can project values while grouping or shape the final group result.
- A group is not a dictionary entry: several elements can share one key and the group remains enumerable.
- Use `ToLookup` when an immediately materialized one-to-many lookup is the desired result.

## Join

- `Join` performs an inner join: only matching outer/inner key pairs produce output.
- The result selector combines one outer element with each matching inner element.
- Key comparison uses the default or supplied equality comparer.

## GroupJoin and left joins

- `GroupJoin` associates every outer element with an enumerable of matching inner elements.
- A left-outer-join pattern uses `GroupJoin`, then `SelectMany` with `DefaultIfEmpty`.
- Keep the original outer element available in the final projection so unmatched rows can still be represented.

## Practical choice

- Use grouping when the result is categorized by key.
- Use joining when the result combines two independently sourced sequences.
- Use a dictionary or lookup when repeated direct key access is more important than a query pipeline.

## Caveats

- Duplicate keys can produce multiple result rows.
- Joining large in-memory sequences creates lookup state and should not be repeated unnecessarily.

## Covered source units

### Text elements

```text
(none; this region is screenshot-only)
```

### Screenshot uses

```text
IU-009, IU-010
```

Exact code and original wording remain available in the SVG and closed ledgers.
