# Regional transcript — R01: splice removal, insertion, replacement and negative start

Conspect: `splice`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`Array.prototype.splice` mutates an array by removing zero or more elements at a start index and optionally inserting new elements at that same position.

## Signature

- `array.splice(start, deleteCount, ...items)` changes the original array.
- `start` is normalized against the current length.
- `deleteCount` controls how many existing elements are removed.
- Every remaining argument is inserted at the removal position.

## Removal

- `splice(index, count)` removes `count` elements.
- Omitting `deleteCount` removes from `start` to the end.
- A `deleteCount` larger than the remaining length removes only the available elements.
- A negative `deleteCount` is normalized to zero, so no elements are removed.

## Insertion

- `splice(index, 0, itemA, itemB)` inserts without removal.
- Inserting beyond the end effectively appends at the end.
- Inserted items are individual arguments; an array argument is inserted as one nested array unless spread.

## Replacement

- Removing and inserting in the same call replaces a range.
- The numbers of removed and inserted elements do not need to match.
- Indices after the changed range shift according to the net length difference.

## Negative start

- A negative start is interpreted relative to the array length.
- `-1` starts at the last element.
- Values more negative than the length clamp to the beginning.

## Caveats

- Because the source mutates, shared references observe the change.
- Use explicit examples in tests for omitted arguments because `undefined` and omission can differ.

## Covered source units

### Text elements

```text
T-002, T-003, T-004, T-005, T-012
```

### Screenshot uses

```text
IU-001, IU-005, IU-006, IU-007, IU-008
```

Exact code and original wording remain available in the SVG and closed ledgers.
