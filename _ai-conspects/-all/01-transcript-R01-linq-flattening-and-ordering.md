# Regional transcript — R01: LINQ flattening and ordering

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

This region is a compact reference for turning nested sequences into flat sequences and for arranging results by one or more keys.

## Select and SelectMany

- `Select` maps every source element to one result value and preserves one output item per input item.
- `SelectMany` maps every source element to an inner sequence and flattens all inner sequences into one stream.
- Use the result-selector overload of `SelectMany` when the flattened child must retain data from its parent.
- For nested collections, `Select` produces a sequence of sequences, while `SelectMany` produces the child elements themselves.

## Ordering

- `OrderBy` and `OrderByDescending` create the primary sort.
- `ThenBy` and `ThenByDescending` add secondary and later sort keys.
- `Reverse` reverses the current enumeration order; it is not a replacement for a semantic descending sort key.
- Ordering is deferred until enumeration and normally buffers the source.
- Use an explicit comparer when domain ordering differs from the default comparer.

## Stability and cost

- LINQ-to-Objects ordering is stable: equal keys preserve their prior relative order.
- Several ordering levels are composed before enumeration rather than sorted independently.
- Large sequences require memory for buffering; avoid repeated enumeration of the same expensive ordered query.

## Caveats

- Provider-backed `IQueryable` translation can differ from LINQ-to-Objects.
- Do not rely on database row order unless an explicit ordering is part of the query.

## Covered source units

### Text elements

```text
(none; this region is screenshot-only)
```

### Screenshot uses

```text
IU-011, IU-012
```

Exact code and original wording remain available in the SVG and closed ledgers.
