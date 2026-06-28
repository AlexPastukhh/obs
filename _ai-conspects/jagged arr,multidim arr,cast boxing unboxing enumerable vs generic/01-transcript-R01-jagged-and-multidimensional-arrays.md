# Regional transcript — R01: Jagged and multidimensional arrays

Conspect: `jagged arr,multidim arr,cast boxing unboxing enumerable vs generic`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A rectangular multidimensional array is one CLR array with fixed dimensions. A jagged array is an array whose elements are independent arrays.

## Rectangular arrays

- `int[,]` stores a rectangular matrix.
- `Length` returns the total number of elements across all dimensions.
- `GetLength(dimension)` returns the size of one dimension.
- `Rank` returns the number of dimensions.
- Access uses one bracket pair: `matrix[row, column]`.

## Jagged arrays

- `int[][]` is an array of `int[]` rows.
- Outer `Length` returns the number of inner arrays.
- Each row has its own `Length` and may differ.
- Access uses chained indexing: `jagged[row][column]`.

## Memory and usage

- A rectangular array is one rectangular storage object and often has better locality.
- A jagged array performs separate allocations for rows and supports uneven lengths.
- Jagged arrays integrate naturally with generic array/enumeration APIs.
- Rectangular arrays are useful for dense matrices and fixed-size numeric grids.

## Representative pattern

```csharp
int[,] matrix = new int[3, 5];

int total = matrix.Length;        // 15
int rows = matrix.GetLength(0);   // 3
int cols = matrix.GetLength(1);   // 5
int dimensions = matrix.Rank;     // 2

int[][] jagged =
{
    new[] { 1, 2 },
    new[] { 3, 4, 5 }
};
```

## Caveats

- A jagged row can be null unless the program initializes every inner array.
- Bounds and cache behavior should be measured for performance-critical numeric code.

## Source labels

- `how to know length of multi dim arrays (Length wont work)`
- `add jagged and multidim array sheet`

## Covered text elements

```text
T-001, T-002
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
