# Regional transcript — R04: Iterative reduce and flatMap alternative

Conspect: `FLAT FLATMAP`  
Generated: 2026-06-28 14:30:00 UTC

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

Before `flatMap`, equivalent behavior was commonly written with `reduce`, `concat`, or an explicit loop. These alternatives remain useful when compatibility or custom flattening rules matter.

## Reduce form

- Start with an empty accumulator array.
- Run the mapping logic for each item.
- Append the returned segment to the accumulator.
- Return the accumulator for the next iteration.

## Explicit loop

- A loop can push individual values or spread returned arrays.
- It is often easier to debug and can avoid repeated `concat` allocations.
- Use it when performance measurements justify the extra code.

## Selection rule

- Prefer `flatMap` when its one-level semantics exactly match the transformation.
- Prefer `reduce` for a more general accumulator.
- Prefer a loop for complex branching or hot paths.

## Representative pattern

```js
const result = source.reduce((output, item) => {
  const segment = transform(item);
  output.push(...segment);
  return output;
}, []);
```

## Caveats

- Repeated `concat` can allocate a new array on every iteration.
- Do not choose a functional form solely for brevity when it obscures the algorithm.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-001
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
