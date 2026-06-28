# Regional transcript — R01: Removing array values and indices in C#

Conspect: `remove from arr, copy`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

C# arrays have fixed length, so removal means creating a new array or using a resizable collection.

## Remove all matching values

- Use LINQ `Where` followed by `ToArray` to keep elements that do not match the removed value.
- This is concise and naturally removes every match.
- The result is a new array; the original remains unchanged.

## Remove by index

- Filter by indexed position when one known index must be excluded.
- Validate the index before constructing the result.
- For frequent indexed removals, `List<T>.RemoveAt` is a more suitable abstraction.

## Collection choice

- Use `List<T>` when insertion and removal are normal operations.
- Use arrays when fixed-size contiguous storage and interoperability matter.

## Caveats

- LINQ creates a new result and adds iterator/materialization overhead.
- Value equality semantics determine which elements match.

## Covered source units

### Text elements

```text
T-001, T-002
```

### Screenshot uses

```text
IU-002, IU-003
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
