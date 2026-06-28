# Regional transcript — R02: Index-from-end and collection access

Conspect: `sheet get last`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Collections with count and indexed access can retrieve the final element directly without general-purpose enumeration.

## Arrays and lists

- Use `array[^1]` or `list[^1]` in modern C# when the collection is non-empty.
- The index-from-end value `^1` means one position back from the end.
- `^0` identifies the boundary after the last element and is not a valid element index.

## Traditional indexing

- `array[array.Length - 1]` and `list[list.Count - 1]` express the same lookup.
- Check for an empty collection before subtracting one.

## When to prefer direct access

- Direct indexing is clear and O(1) for arrays and lists.
- Use LINQ when the source is exposed only as an enumerable or when a predicate is part of the operation.

## Caveats

- Not every `IEnumerable<T>` supports indexing.
- Concurrent modification can invalidate a previously observed count.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-004, IU-005
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
