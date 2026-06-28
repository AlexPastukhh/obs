# Final semantic transcript — last array/iterable element in JavaScript

Authoritative source: `source/last element.svg`

This source is byte-identical to `last element sharp.svg`.

## Arrays

```ts
const last =
  values.at(-1);
```

`.at(-1)` clearly expresses access from the end and returns `undefined` for an empty array.

Older syntax:

```ts
const last =
  values[
    values.length - 1
  ];
```

Both are O(1) for arrays.

## Immutable and mutable alternatives

```ts
const last =
  values.slice(-1)[0];
```

`slice` copies, so it is O(n) in the relevant copying work and unnecessary for simple access.

```ts
const last =
  values.pop();
```

`pop` is fast but mutates the original array.

## Iterables, Set and Map

A generic iterable has no universal direct “last” operation:

```ts
let last:
  T | undefined;

for (const item of iterable) {
  last = item;
}
```

Spreading a `Set` or `Map` is convenient but allocates:

```ts
const last =
  [...set].at(-1);
```

## Decision guide

```text
read an array
    at(-1)

support older JavaScript
    arr[arr.length - 1]

consume/remove last item
    pop()

read generic iterable
    one pass through for...of
```


# Coverage

```text
unique embedded screenshots: 2
image uses: 2
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 2
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
