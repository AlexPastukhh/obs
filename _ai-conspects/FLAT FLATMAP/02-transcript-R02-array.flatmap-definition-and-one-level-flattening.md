# Regional transcript — R02: Array.flatMap definition and one-level flattening

Conspect: `FLAT FLATMAP`  
Generated: 2026-06-28 14:30:00 UTC

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

`flatMap` maps every source element and then flattens exactly one level. Conceptually it is `array.map(callback).flat(1)`, with an implementation that can avoid the intermediate mapped array.

## Callback contract

- The callback receives the value, index and source array.
- Returning one value gives a one-to-one mapping.
- Returning an array gives a one-to-many mapping after the one-level flatten.
- Returning an empty array removes the source element from the output.

## One-level limit

- Nested arrays inside the callback result are not recursively flattened.
- To flatten deeper, call `flat` afterwards or use a different recursive algorithm.
- `flatMap` preserves the callback output order.

## Common uses

- Split each input into zero, one or several output values.
- Filter and transform in one pass.
- Generate adjacent pairs or token expansions.

## Representative pattern

```js
const values = [1, 2, 3, 4];

values.flatMap(value =>
  value % 2 === 0 ? [value, value * 10] : []
);
// [2, 20, 4, 40]
```

## Caveats

- `flatMap` is not a general recursive flattening API.
- Returning large arrays per element can expand output size quickly.

## Source labels

- `flatmap`

## Covered text elements

```text
T-003
```

## Covered screenshot uses

```text
IU-004, IU-005
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
