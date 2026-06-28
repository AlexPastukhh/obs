# Regional transcript — R04: Performance tradeoffs and alternative collections

Conspect: `remove from arr, copy`  
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

The correct removal strategy depends on collection ownership, removal frequency and performance requirements.

## Complexity

- Any order-preserving array removal copies up to O(n) elements.
- LINQ also allocates iterator state and the destination array.
- Manual `Array.Copy` avoids predicate overhead and is suitable for performance-critical code.

## Alternatives

- `List<T>` supports `Remove`, `RemoveAt` and `RemoveAll` while keeping a resizable backing array.
- A linked structure avoids large shifts but sacrifices locality and indexed access.
- If order is irrelevant, swapping with the last element and shrinking a resizable collection can remove in O(1).

## API guidance

- Return the new array explicitly when using immutable semantics.
- Name helpers by behavior: remove-all, remove-first or remove-at.
- Benchmark realistic sizes before replacing readable LINQ with manual copying.

## Caveats

- Arrays cannot truly shrink in place.
- Repeated conversions between arrays and lists can dominate the intended optimization.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-005, IU-006
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
