# Final semantic transcript — last array/iterable element in JavaScript

Authoritative source: `source/last element sharp.svg`

The uploaded SVG is byte-identical to `last element.svg`; its content describes JavaScript rather than C#.

## Arrays

Preferred modern syntax:

```ts
const last =
  values.at(-1);
```

For an empty array, `.at(-1)` returns `undefined`.

Traditional index access:

```ts
const last =
  values[
    values.length - 1
  ];
```

This is also O(1) and returns `undefined` for an empty array.

## Copying and mutation

```ts
const last =
  values.slice(-1)[0];
```

`slice` creates a new array, so it is less suitable for large arrays or hot paths.

```ts
const last =
  values.pop();
```

`pop()` is O(1), but removes the element. Use it only when mutation is intended.

## Generic iterables

Iterables without random access require traversal:

```ts
let last:
  T | undefined;

for (const value of iterable) {
  last = value;
}
```

For `Set` or `Map`, spreading and calling `.at(-1)` creates an intermediate array:

```ts
const last =
  [...set].at(-1);
```

This is O(n) in time and memory.

## Recommendation

```text
array
    at(-1)

performance-critical array
    arr[arr.length - 1]

generic iterable
    one-pass for...of

mutable stack semantics
    pop()

avoid
    copying the collection only to read one element
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
