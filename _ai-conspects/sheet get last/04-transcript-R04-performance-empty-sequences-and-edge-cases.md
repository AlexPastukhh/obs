# Regional transcript — R04: Performance, empty sequences and edge cases

Conspect: `sheet get last`  
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

Choosing a last-element strategy requires explicit empty-input and ordering semantics.

## Empty handling

- Check `Any` only when the extra enumeration is acceptable; a one-pass default-returning operator can be better for streams.
- For arrays/lists, check `Count` or `Length` once and index directly.
- Return an option/result shape when default values are ambiguous.

## Performance

- Direct indexed access is O(1).
- General enumerable access is O(n).
- A database query should order and limit on the server rather than materializing all rows.

## Infinite and single-use sequences

- `Last` never completes on an infinite sequence.
- A consumable stream may not be safely enumerable twice.
- Materialize only when a snapshot is truly required.

## Caveats

- Do not call `Count()` then `Last()` on a general enumerable unless two passes are intended.
- Provider-specific SQL should be verified with generated-query inspection.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-001
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
