# JavaScript loops, entries, keys, and array indices — source-preserving transcript v001

Generated: 2026-07-01

## Coverage

```text
unique embedded screenshots: 2
image uses: 2
native SVG labels: 2
source-preserving blocks: 2
uncovered sources: 0
```

## S-001 — Array.entries(): index and value together

**Known limits:** none

### Near-literal normalized transcript

### 2. Using `entries()` method

```ts
const arr = ['a', 'b', 'c'];

// Using Array.entries()
for (const [index, value] of arr.entries()) {
    console.log(`Index ${index}: ${value}`);
}

// Output: Index 0: a, Index 1: b, Index 2: c
```

Canvas notes:

```text
works like c# foreach
can have index
```

### Study meaning

`Array.prototype.entries()` returns an iterator of `[index, value]` pairs. Destructuring inside `for...of` gives a numeric index and the corresponding value without manually maintaining a counter.

### Recall questions

1. What pair does `arr.entries()` yield for every element?
2. What types do `index` and `value` have in this example?
3. Why is destructuring useful in the loop header?
4. What exact output is produced?


---

## S-002 — Array.keys() and the for...in caveat

**Known limits:** none

### Near-literal normalized transcript

### 3. Using `keys()` method

```ts
const arr = ['a', 'b', 'c'];

for (const index of arr.keys()) {
    console.log(`Index ${index}: ${arr[index]}`);
}
```

### `for...in` — yes, you get the index, but be careful

```ts
const arr = ['a', 'b', 'c'];

// for...in gives you INDEX (as string!)
for (const index in arr) {
    console.log(`Index ${index}: ${arr[index]}`);
    // index is type 'string'!
}
```

### Study meaning

`arr.keys()` is the array-specific iterator for numeric indices. `for...in` enumerates enumerable property keys as strings; it can also include added enumerable properties and is therefore normally avoided for ordinary array-value iteration.

### Recall questions

1. What does `arr.keys()` yield?
2. Why is `arr[index]` used in the `keys()` example?
3. What type is the key produced by `for...in`?
4. Why is `for...in` potentially unsafe for arrays?
5. When would `entries()` be clearer than `keys()`?

