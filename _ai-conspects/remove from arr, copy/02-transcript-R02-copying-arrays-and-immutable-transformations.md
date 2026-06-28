# Regional transcript — R02: Copying arrays and immutable transformations

Conspect: `remove from arr, copy`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Removing an element from an array can be implemented by allocating a result one element shorter and copying the two surviving ranges.

## Two-copy algorithm

- Allocate `new T[source.Length - 1]`.
- Copy the prefix before the removed index.
- Copy the suffix after the removed index into the shifted destination position.
- The resulting array preserves order.

## Array.Copy parameters

- `sourceArray` and `sourceIndex` identify where reading begins.
- `destinationArray` and `destinationIndex` identify where writing begins.
- `length` is the number of elements copied.
- The short overload `Array.Copy(source, destination, length)` uses zero for both starting indices.

## Immutability

- Returning a new array leaves every existing reference to the original unchanged.
- This works well for snapshot-style state and predictable APIs.

## Caveats

- Array copying is shallow for reference-type elements.
- Every removal allocates and copies O(n) elements.

## Covered source units

### Text elements

```text
T-003
```

### Screenshot uses

```text
IU-001, IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
