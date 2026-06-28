# Regional transcript — R03: Mutation, return value, deleteCount and slice comparison

Conspect: `splice`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 4 / 4
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`splice` has two outputs: the original array is changed and the method returns a new array containing the removed elements.

## Mutation

- The receiver is changed immediately.
- Its length and indices may change.
- Framework state should usually be updated with a copied array rather than mutating stored state directly.

## Return value

- The return value is always an array of removed elements.
- Insertion-only calls return an empty array.
- Ignore the return value when only the mutation matters.

## deleteCount details

- Zero or negative values remove nothing.
- Omitting the argument removes through the end.
- Passing `undefined` is converted numerically and behaves like zero rather than like omission.
- A count beyond the remaining elements is clamped.

## slice versus splice

- `slice(start, end)` returns a shallow copy and does not mutate the source.
- `splice(start, deleteCount, ...items)` mutates and returns removed elements.
- `slice` uses an exclusive end index; `splice` uses a removal count.
- Use `toSpliced` where supported when splice-like editing should return a new array.

## Caveats

- Shallow copies still share nested object references.
- Mutation can invalidate assumptions made by concurrent iteration or memoization.

## Covered source units

### Text elements

```text
T-006, T-007, T-008, T-009
```

### Screenshot uses

```text
IU-010, IU-011, IU-012, IU-013
```

Exact code and original wording remain available in the SVG and closed ledgers.
