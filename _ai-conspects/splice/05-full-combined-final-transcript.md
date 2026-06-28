# Full combined final transcript — splice

Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements: 12 / 12
unique screenshots: 19 / 19
screenshot uses: 19 / 19
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — splice removal, insertion, replacement and negative start

`Array.prototype.splice` mutates an array by removing zero or more elements at a start index and optionally inserting new elements at that same position.

### Signature

- `array.splice(start, deleteCount, ...items)` changes the original array.
- `start` is normalized against the current length.
- `deleteCount` controls how many existing elements are removed.
- Every remaining argument is inserted at the removal position.

### Removal

- `splice(index, count)` removes `count` elements.
- Omitting `deleteCount` removes from `start` to the end.
- A `deleteCount` larger than the remaining length removes only the available elements.
- A negative `deleteCount` is normalized to zero, so no elements are removed.

### Insertion

- `splice(index, 0, itemA, itemB)` inserts without removal.
- Inserting beyond the end effectively appends at the end.
- Inserted items are individual arguments; an array argument is inserted as one nested array unless spread.

### Replacement

- Removing and inserting in the same call replaces a range.
- The numbers of removed and inserted elements do not need to match.
- Indices after the changed range shift according to the net length difference.

### Negative start

- A negative start is interpreted relative to the array length.
- `-1` starts at the last element.
- Values more negative than the length clamp to the beginning.

### Caveats

- Because the source mutates, shared references observe the change.
- Use explicit examples in tests for omitted arguments because `undefined` and omission can differ.

## R02 — Inserting and replacing with array contents

To insert the elements of another array rather than the array object itself, spread the replacement array into the splice call.

### Spread insertion

- `array.splice(start, 0, ...replacement)` inserts every replacement element.
- Without spread, the replacement array becomes one nested element.
- `array.splice(start, deleteCount, ...replacement)` replaces a range with the array contents.

### Replace the entire array contents

- `array.splice(0, array.length, ...replacement)` preserves the original array object while changing its contents.
- This is useful when observers hold a reference that must remain stable.
- For simple ownership, assigning a new array is usually clearer.

### Insert at an index

- Use a zero delete count to preserve existing elements.
- The insertion point is before the element currently at the normalized start index.
- The original array length increases by the replacement count.

### Clear and refill alternative

- Setting `array.length = 0` clears the array.
- `array.push(...replacement)` then appends the new contents.
- This also preserves array identity but performs two explicit mutations.

### Caveats

- Spreading extremely large arrays can hit argument-count limits.
- Choose immutable replacement when consumers depend on reference changes.

## R03 — Mutation, return value, deleteCount and slice comparison

`splice` has two outputs: the original array is changed and the method returns a new array containing the removed elements.

### Mutation

- The receiver is changed immediately.
- Its length and indices may change.
- Framework state should usually be updated with a copied array rather than mutating stored state directly.

### Return value

- The return value is always an array of removed elements.
- Insertion-only calls return an empty array.
- Ignore the return value when only the mutation matters.

### deleteCount details

- Zero or negative values remove nothing.
- Omitting the argument removes through the end.
- Passing `undefined` is converted numerically and behaves like zero rather than like omission.
- A count beyond the remaining elements is clamped.

### slice versus splice

- `slice(start, end)` returns a shallow copy and does not mutate the source.
- `splice(start, deleteCount, ...items)` mutates and returns removed elements.
- `slice` uses an exclusive end index; `splice` uses a removal count.
- Use `toSpliced` where supported when splice-like editing should return a new array.

### Caveats

- Shallow copies still share nested object references.
- Mutation can invalidate assumptions made by concurrent iteration or memoization.

## R04 — Iteration index shifts, backward removal and performance

Removing elements while iterating changes later indices. Direction and data size determine whether a loop is correct and efficient.

### Forward-loop bug

- After removing index `i`, the next element shifts into index `i`.
- A normal `i++` then skips that shifted element.
- This is especially visible when adjacent elements both match the removal predicate.

### Correct approaches

- Iterate backward so removals only affect indices already processed.
- In a forward loop, decrement the index after removal.
- Use `filter` to build a new array when immutable semantics are preferred.
- For in-place compaction, use separate read and write indices and truncate once.

### Performance near the start

- Removing near the beginning shifts many later elements and is linear in array length.
- Repeated front removals can become quadratic.
- For queue behavior, prefer a deque/ring buffer or maintain a logical start index.
- For bulk deletion, filter or compact once instead of many separate splices.

### Choosing mutation

- Use splice when array identity must be preserved or an isolated local mutation is simplest.
- Use immutable operations for React/Redux state and memoized data flows.
- Document in-place behavior in shared utility functions.

### Caveats

- Benchmark the whole algorithm, not one splice call.
- Sparse arrays and holes have additional behavior that should be tested when relevant.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 5 | 5 | 5 | 0 | 0 |
| R02 | 1 | 4 | 4 | 0 | 0 |
| R03 | 4 | 4 | 4 | 0 | 0 |
| R04 | 2 | 6 | 6 | 0 | 0 |

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and extracted
screenshots remain authoritative for exact code, punctuation and source-version details.
