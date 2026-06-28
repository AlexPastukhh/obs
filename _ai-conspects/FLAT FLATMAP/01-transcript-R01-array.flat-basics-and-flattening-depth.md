# Regional transcript — R01: Array.flat basics and flattening depth

Conspect: `FLAT FLATMAP`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`Array.prototype.flat()` creates a new array by flattening nested arrays. Its default depth is one, and the original array is not modified.

## Depth behavior

- `flat()` is the same as `flat(1)`.
- `flat(2)` descends through two nested array levels.
- `flat(Infinity)` recursively flattens every nested array level.
- A depth of zero returns a shallow copy without flattening nested arrays.

## What gets flattened

- Only array elements are flattened; ordinary iterable or array-like objects are not recursively expanded merely because they are iterable.
- Non-array values remain in their original order.
- Sparse holes are removed at levels that are flattened.
- The result is a shallow copy, so nested object references remain shared.

## Choosing depth

- Use a known numeric depth when the data contract has a predictable shape.
- Use `Infinity` carefully because it can hide unexpectedly deep or malformed structures.
- Avoid flattening when nesting carries domain meaning.

## Representative pattern

```js
const source = [1, [2, [3, 4]], 5];

source.flat();          // [1, 2, [3, 4], 5]
source.flat(2);         // [1, 2, 3, 4, 5]
source.flat(Infinity);  // [1, 2, 3, 4, 5]
```

## Caveats

- `flat()` does not deep-clone objects.
- Very deep recursive structures can still consume substantial time and memory.

## Source labels

- `can just flat()`
- `flat`

## Covered text elements

```text
T-001, T-002
```

## Covered screenshot uses

```text
IU-002, IU-003
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
