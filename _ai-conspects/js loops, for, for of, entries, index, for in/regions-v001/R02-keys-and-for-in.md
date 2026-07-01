# Array.keys() and for...in

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
