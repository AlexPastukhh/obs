# Final source-reconstructed transcript - JS array iteration with index

Generated: 2026-07-07

Source: `source/js iterate, index.svg`, `source/images/019356881d33.png`, `source/images/2da3a261bbc3.png`, and Stage0 source inventory.

## Coverage

```text
Readable source screenshots: 2 / 2
Visible methods in local source: entries(), keys(), for...in
Note: the local screenshot sequence starts at "2. Using entries() method"; no local source image for item 1 was present in this folder.
```

## Goal

The sheet explains how to iterate an array while also getting the index.

Sample array used in all examples:

```typescript
const arr = ['a', 'b', 'c'];
```

## 1. `entries()` - index and value together

Use `Array.prototype.entries()` when you want both the numeric index and the value in a `for...of` loop.

```typescript
const arr = ['a', 'b', 'c'];

// Using Array.entries()
for (const [index, value] of arr.entries()) {
  console.log(`Index ${index}: ${value}`);
}

// Output: Index 0: a, Index 1: b, Index 2: c
```

This is the cleanest option when both index and value are needed.

## 2. `keys()` - iterate indexes, then index into the array

Use `Array.prototype.keys()` when you only want indexes from the iterator and will access values manually.

```typescript
const arr = ['a', 'b', 'c'];

for (const index of arr.keys()) {
  console.log(`Index ${index}: ${arr[index]}`);
}
```

`arr.keys()` produces numeric indexes: `0`, `1`, `2`, ...

## 3. `for...in` - possible, but be careful

The source explicitly says:

```text
for...in - YES, you get the index (but be careful!)
```

Example from the source:

```typescript
const arr = ['a', 'b', 'c'];

// for...in gives you INDEX (as string!)
for (const index in arr) {
  console.log(`Index ${index}: ${arr[index]}`);
  // index is type 'string'!
}
```

Important caveat: `for...in` iterates enumerable property keys, so for arrays the index is a string key, not a numeric index. Prefer `entries()` or `keys()` for normal array iteration.

## Practical choice

```text
Need index + value: use arr.entries()
Need only indexes: use arr.keys()
Avoid for...in for normal arrays unless you specifically want enumerable property keys and understand the string-index behavior.
```
