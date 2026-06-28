# Final semantic transcript — JavaScript/TypeScript array `join`

Authoritative source: `source/string join.svg`

## Basic join

```ts
const numbers =
  [1, 2, 3, 4, 5];

numbers.join();
// "1,2,3,4,5"

numbers.join(" ");
// "1 2 3 4 5"

numbers.join("-");
// "1-2-3-4-5"

numbers.join("");
// "12345"
```

`join` converts each element to text and inserts the separator between elements.

## `toString`

```ts
numbers.toString();
// "1,2,3,4,5"
```

For arrays, `toString()` behaves similarly to `join(",")`, but `join` communicates separator intent and supports custom separators.

## Custom formatting

```ts
const text =
  numbers
    .map(
      value =>
        `(${value})`
    )
    .join(" ");
```

Prefer `map + join` when each element needs formatting.

## JSON is different

```ts
JSON.stringify(numbers);
// "[1,2,3,4,5]"
```

Use JSON when the output must preserve array structure for a protocol or storage format. Use `join` for human-readable delimited text.

## Sparse/null values

`undefined`, `null` and missing array slots become empty fields:

```ts
[
  1,
  undefined,
  null,
  4,
].join(",");
// "1,,,4"
```

Normalize explicitly when this is not desired.


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
