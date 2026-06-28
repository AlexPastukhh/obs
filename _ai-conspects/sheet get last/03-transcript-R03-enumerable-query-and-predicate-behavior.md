# Regional transcript — R03: Enumerable, query and predicate behavior

Conspect: `sheet get last`  
Generated: 2026-06-28 05:00:00 UTC

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

The cost and translation of `Last` depend on the source type.

## LINQ-to-Objects

- For an `IList<T>`, optimized implementations can read by index.
- For a general enumerable, the operator walks through the sequence and retains the latest candidate.
- A predicate version tests elements and retains the latest match.

## IQueryable

- Database providers translate supported `Last` operations according to query semantics.
- A meaningful last row requires a deterministic ordering.
- Without `OrderBy`, relational data has no guaranteed logical last row.
- Some providers may reject or rewrite unsupported shapes.

## Alternatives

- Use `OrderByDescending(...).FirstOrDefault()` when the ordering key defines 'latest' and provider translation is clearer.
- Use `MaxBy` when the desired item is the one with the maximum key and the framework/provider supports it.

## Caveats

- Enumerable order and chronological order are not automatically the same.
- Repeatedly calling `Last` on a streaming source repeats enumeration.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-002, IU-003
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
