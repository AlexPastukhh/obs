# Array.entries()

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
