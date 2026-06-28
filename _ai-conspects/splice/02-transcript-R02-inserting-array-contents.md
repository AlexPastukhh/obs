# Regional transcript — R02: Inserting and replacing with array contents

Conspect: `splice`  
Generated: 2026-06-28 03:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

To insert the elements of another array rather than the array object itself, spread the replacement array into the splice call.

## Spread insertion

- `array.splice(start, 0, ...replacement)` inserts every replacement element.
- Without spread, the replacement array becomes one nested element.
- `array.splice(start, deleteCount, ...replacement)` replaces a range with the array contents.

## Replace the entire array contents

- `array.splice(0, array.length, ...replacement)` preserves the original array object while changing its contents.
- This is useful when observers hold a reference that must remain stable.
- For simple ownership, assigning a new array is usually clearer.

## Insert at an index

- Use a zero delete count to preserve existing elements.
- The insertion point is before the element currently at the normalized start index.
- The original array length increases by the replacement count.

## Clear and refill alternative

- Setting `array.length = 0` clears the array.
- `array.push(...replacement)` then appends the new contents.
- This also preserves array identity but performs two explicit mutations.

## Caveats

- Spreading extremely large arrays can hit argument-count limits.
- Choose immutable replacement when consumers depend on reference changes.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-002, IU-003, IU-004, IU-009
```

Exact code and original wording remain available in the SVG and closed ledgers.
