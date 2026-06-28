# Final semantic transcript — JavaScript `Map` and `WeakMap`

Authoritative source: `source/map and weakmap js.svg`  
Coverage: **11 unique screenshots / 11 placements + 0 native SVG labels**

---

# R01 — `Map` API

`Map` stores key-value pairs and preserves insertion order.

```ts
const map = new Map<string, number>();

map.set("a", 1);
map.set("b", 2);

map.get("a");     // 1
map.has("b");     // true
map.delete("a");  // true
map.size;         // 1
map.clear();
```

Creation from pairs:

```ts
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
```

Important return values:

```text
set
    returns the same Map and supports chaining

get
    returns the stored value or undefined

has
    distinguishes a missing key from a stored undefined value

delete
    returns whether an entry existed

clear
    returns undefined
```

Typical lookup, insertion and deletion are designed for efficient key-based access.

---

# R02 — iteration, equality and conversion

Iteration:

```ts
for (const [key, value] of map) {
  // insertion order
}

map.keys();
map.values();
map.entries();
map.forEach((value, key) => {});
```

Map key equality follows JavaScript’s same-value-zero behavior. Primitive keys compare by value; object keys compare by reference:

```ts
const a = {};
const b = {};

map.set(a, "value");

map.get(a); // "value"
map.get(b); // undefined
```

Conversions:

```ts
const entries = [...map];
const keys = [...map.keys()];
const values = [...map.values()];

const fromObject =
  new Map(Object.entries(object));

const toObject =
  Object.fromEntries(map);
```

`Object.fromEntries` can only represent property keys supported by ordinary objects; non-string-like Map keys do not round-trip faithfully.

`JSON.stringify(new Map())` does not serialize entries automatically. Convert to an array or object explicitly.

---

# R03 — `WeakMap`

`WeakMap` accepts object keys and holds those keys weakly:

```ts
const metadata =
  new WeakMap<object, {
    dirty: boolean;
  }>();

const element = {};
metadata.set(element, {
  dirty: true,
});
```

When no strong reference to the key remains, the entry can disappear during garbage collection.

WeakMap intentionally does not expose:

```text
size
iteration
keys/values/entries
clear
```

Those operations would reveal or depend on garbage-collection timing.

Good uses:

```text
metadata associated with object lifetime
private per-object state
memoization keyed by objects
caches that must not keep keys alive
```

Weakness applies to keys, not to arbitrary values.

---

# R04 — patterns and capacity misconceptions

Common patterns:

```ts
// default value
const count =
  map.get(key) ?? 0;

// increment
map.set(
  key,
  (map.get(key) ?? 0) + 1,
);

// group by
const bucket =
  map.get(groupKey) ?? [];

bucket.push(item);
map.set(groupKey, bucket);
```

JavaScript `Map` does not expose a public initial-capacity constructor comparable to some dictionary/hash-map APIs in other languages.

This does not reserve capacity:

```ts
new Map(
  Array.from(
    { length: 1_000_000 },
    (_, index) => [
      index,
      undefined,
    ],
  ),
);
```

It creates one million real entries and consumes corresponding memory. Let the engine grow the Map normally unless a runtime-specific API explicitly documents another mechanism.

---

# Coverage

```text
unique embedded screenshots: 11
image uses: 11
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 11
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
