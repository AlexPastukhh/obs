# Regional transcript — R04: LINQ element selection and set operations

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

Element selectors retrieve one item under specific cardinality rules; set operators compare sequences using equality semantics.

## Element selection

- `First` requires at least one matching element and throws otherwise.
- `FirstOrDefault` returns the type's default value when no element matches.
- `Single` asserts exactly one matching element; it throws for zero or multiple matches.
- `SingleOrDefault` permits zero matches but still rejects multiple matches.
- `ElementAt` and `ElementAtOrDefault` select by index.
- `Last` and `LastOrDefault` select the final element and may require full enumeration.

## Choosing First versus Single

- Use `First` when several matches are valid and only one representative is needed.
- Use `Single` when multiple matches indicate broken invariants or invalid data.
- Do not use `Single` merely because the current dataset happens to contain one row.

## Set operations

- `Distinct` removes duplicates.
- `Union` returns values present in either sequence.
- `Intersect` returns values present in both.
- `Except` returns values present in the first but not the second.
- `SequenceEqual` compares element-by-element order and equality, unlike mathematical set equality.

## Equality

- Set operations use the default or supplied equality comparer.
- For entity-like objects, define equality or project a stable key.
- Key-based variants such as `DistinctBy` can express uniqueness without replacing object equality.

## Caveats

- Default-returning selectors can make 'missing' indistinguishable from a valid default value.
- Set operations do not promise semantic sorting.

## Covered source units

### Text elements

```text
(none; this region is screenshot-only)
```

### Screenshot uses

```text
IU-005, IU-006
```

Exact code and original wording remain available in the SVG and closed ledgers.
