# Final semantic transcript — JavaScript and TypeScript `Set`

Authoritative source: `source/set js.svg`  
Coverage: **12 unique screenshots / 12 placements + 28 native SVG labels**

---

# R01 — creation and basic operations

A `Set` stores unique values in insertion order.

```ts
const empty = new Set<number>();

const fromArray =
  new Set([1, 2, 2, 3]);
// {1, 2, 3}
```

Core API:

```ts
set.add(value);      // returns the same Set
set.has(value);      // boolean
set.delete(value);   // boolean
set.clear();         // undefined
set.size;            // number
```

`add` supports chaining:

```ts
set
  .add(1)
  .add(2);
```

Set equality for values follows same-value-zero semantics. Objects are unique by reference, not by structural content.

---

# R02 — iteration and conversion

A Set is iterable:

```ts
for (const value of set) {
  // insertion order
}
```

Other forms:

```ts
set.forEach((value) => {});
set.values();
set.keys();    // same values
set.entries(); // [value, value]
```

Conversions:

```ts
const array = [...set];

const unique =
  [...new Set(array)];

const joined =
  [...set].join(", ");
```

A Set has no numeric indexing:

```ts
set[0];
// not the first element
```

Convert to an array when indexed access or array-specific methods are required.

---

# R03 — portable set operations

TypeScript helpers:

```ts
function union<T>(
  a: Set<T>,
  b: Set<T>,
): Set<T> {
  return new Set([
    ...a,
    ...b,
  ]);
}
```

```ts
function intersection<T>(
  a: Set<T>,
  b: Set<T>,
): Set<T> {
  return new Set(
    [...a].filter(
      (value) => b.has(value),
    ),
  );
}
```

```ts
function difference<T>(
  a: Set<T>,
  b: Set<T>,
): Set<T> {
  return new Set(
    [...a].filter(
      (value) => !b.has(value),
    ),
  );
}
```

```ts
function symmetricDifference<T>(
  a: Set<T>,
  b: Set<T>,
): Set<T> {
  return new Set([
    ...[...a].filter(
      (value) => !b.has(value),
    ),
    ...[...b].filter(
      (value) => !a.has(value),
    ),
  ]);
}
```

Relations:

```ts
function isSubsetOf<T>(
  a: Set<T>,
  b: Set<T>,
): boolean {
  return [...a].every(
    (value) => b.has(value),
  );
}
```

Set value equality requires comparing size and membership; `a === b` only checks whether both variables reference the same Set object.

---

# R04 — performance and use cases

Typical Set strengths:

```text
membership checks
deduplication
incremental insertion/deletion
set-algebra-style logic
```

Typical complexity is optimized for efficient membership operations, while arrays require a scan for `includes`.

Use an array when you primarily need:

```text
stable numeric indexes
duplicates
sorting
array transformations
compact ordered sequences
```

Use a Set when uniqueness and membership are the main invariants.

When operating on sets of very different sizes, iterate the smaller set for intersection and subset checks to reduce work.

---

# Coverage

```text
unique embedded screenshots: 12
image uses: 12
native SVG labels: 28
duplicate extra placements: 0

processed image uses: 12
processed text labels: 28
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
