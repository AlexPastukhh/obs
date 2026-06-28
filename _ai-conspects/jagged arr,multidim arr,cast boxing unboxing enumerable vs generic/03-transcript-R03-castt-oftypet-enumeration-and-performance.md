# Regional transcript — R03: Cast<T>, OfType<T>, enumeration and performance

Conspect: `jagged arr,multidim arr,cast boxing unboxing enumerable vs generic`  
Generated: 2026-06-28 12:30:00 UTC

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

LINQ `Cast<T>()` adapts a non-generic sequence to a generic one by casting every element during enumeration. It does not eagerly convert the entire source.

## Deferred behavior

- `Cast<T>()` returns an iterator.
- Actual enumeration and casts occur when the result is consumed.
- The first incompatible element throws `InvalidCastException`.
- Repeated enumeration repeats the casts and source traversal.

## OfType<T>

- `OfType<T>()` filters elements that are compatible with T.
- Incompatible and null values are skipped instead of throwing.
- Use it only when filtering is the intended contract.

## Multidimensional arrays

- A rectangular array can be treated as non-generic `IEnumerable`.
- `Cast<int>()` creates a generic LINQ view over its elements.
- For value types, the non-generic object path can introduce boxing/unboxing overhead.
- Nested indexed loops are usually clearer and faster for matrix operations.

## Representative pattern

```csharp
int[,] matrix = { { 1, 2 }, { 3, 4 } };

IEnumerable<int> values = matrix.Cast<int>();
int sum = values.Sum();
```

## Caveats

- `Cast<T>()` is a runtime assertion, not a data conversion function.
- Avoid LINQ adapters in hot numeric loops without measurement.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-009, IU-010
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
