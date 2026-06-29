# Arrays — indexOf and findIndex

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
