# Regional transcript — R03: Removing only the first matching value

Conspect: `remove from arr, copy`  
Generated: 2026-06-28 05:00:00 UTC

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

To remove one occurrence rather than every equal value, the algorithm must remember whether removal has already happened.

## LINQ stateful predicate

- Capture a local `removed` flag.
- When the first equal value is encountered, set the flag and exclude that item.
- All later equal values pass through.
- Materialize with `ToArray`.

## Clearer alternatives

- Find the first index with `Array.IndexOf`, then run the two-copy index-removal algorithm.
- Convert to `List<T>`, call `Remove`, and convert back only when list conversion is acceptable.
- A dedicated helper documents first-occurrence semantics better than an opaque stateful predicate.

## Caveats

- Stateful LINQ predicates are harder to reason about and should not be reused concurrently.
- Comparer choice matters for custom types.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-007
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
