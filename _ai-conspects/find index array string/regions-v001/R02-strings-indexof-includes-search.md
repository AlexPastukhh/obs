# Strings — indexOf, includes, and search

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
