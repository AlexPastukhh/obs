# Regional transcript — R02: IEnumerable versus IEnumerable<T>

Conspect: `jagged arr,multidim arr,cast boxing unboxing enumerable vs generic`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`IEnumerable` is the non-generic enumeration contract and yields `object`. `IEnumerable<T>` yields a known element type and provides compile-time safety.

## Non-generic enumeration

- `IEnumerator.Current` has type `object`.
- Consumers must cast values to the expected type.
- Value types can be boxed when exposed as object.
- It exists mainly for compatibility with older APIs.

## Generic enumeration

- `IEnumerator<T>.Current` has type `T`.
- No caller-side cast is required.
- Generic algorithms and LINQ preserve element types.
- Value-type iteration can avoid the object boxing path.

## Array differences

- Single-dimensional zero-based arrays support generic collection interfaces for their element type.
- Jagged arrays are arrays of arrays and can be enumerated generically at each level.
- Rectangular multidimensional arrays expose enumeration through `System.Array`/non-generic patterns rather than `IEnumerable<T>`.

## Representative pattern

```csharp
IEnumerable nongeneric = collection;
foreach (object value in nongeneric) { }

IEnumerable<int> generic = numbers;
foreach (int value in generic) { }
```

## Caveats

- The concrete enumerator implementation can optimize some foreach scenarios.
- Prefer generic contracts in new APIs.

## Source labels

- `ienumerable vs`
- `ienumerable<T>`
- `cast`

## Covered text elements

```text
T-003, T-004, T-005
```

## Covered screenshot uses

```text
IU-008
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
