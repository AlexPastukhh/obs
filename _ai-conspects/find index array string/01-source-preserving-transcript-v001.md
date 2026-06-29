# Find index in arrays and strings — source-preserving transcript v001

Generated: 2026-06-30

## Coverage

```text
source SVG image uses: 2
unique screenshots: 2
native SVG labels: 0
near-literal source blocks: 2
uncovered source uses: 0
```

## S-001 — Arrays: indexOf and findIndex

**Known limits:** none

### Near-literal normalized transcript

### ✅ Arrays

#### 1. `indexOf` — most common

Finds the index of the first occurrence, or `-1` if not found.

```ts
const arr = ['a', 'b', 'c', 'b'];

const index = arr.indexOf('b'); // 1
```

- Uses strict equality (`===`).
- Works for primitives.

#### 2. `findIndex` — for objects or conditions

Use when you need a predicate.

```ts
const users = [{ id: 1 }, { id: 2 }];

const index = users.findIndex(u => u.id === 2); // 1
```

- Returns `-1` if not found.
- Best for arrays of objects.

### Study meaning

Use `indexOf` when the target value itself is known and strict equality is enough. Use `findIndex` when the match must be expressed as a condition, especially for objects.

### Recall questions

1. What does array indexOf return when no element is found?
2. Why does indexOf work naturally for primitive values?
3. What is the role of the predicate passed to findIndex?
4. What does the user-object example return and why?
5. How would you find the first user whose name starts with A?


---

## S-002 — Strings: indexOf, includes, and search

**Known limits:** none

### Near-literal normalized transcript

### ✅ Strings

#### 1. `indexOf` — classic

Returns the index of the first occurrence, or `-1`.

```ts
const str = 'hello world';

const index = str.indexOf('o'); // 4
```

#### 2. `includes` — boolean only

Use if you only care whether the substring exists.

```ts
str.includes('o'); // true
```

#### 3. `search` — regex-based

Use when searching with a regular expression.

```ts
const str = 'hello world';

const index = str.search(/o/); // 4
```

- Returns `-1` if not found.
- The source says: “Does NOT accept plain strings (must be regex).”

**Technical correction:** JavaScript actually allows a non-RegExp argument and converts it to a `RegExp`. The practical study rule is that `search` is intended for regular-expression matching, while `indexOf` is clearer for literal substring lookup.

### Study meaning

`indexOf` gives a numeric position for a literal substring. `includes` answers only yes/no. `search` is useful when the match is defined by a regular expression.

### Recall questions

1. What does string indexOf return for the first o in hello world?
2. When is includes preferable to indexOf?
3. What kind of pattern is search designed for?
4. What does search return when nothing matches?
5. Why is the source's plain-string claim technically too strict?

