# Regional transcript — R03: Boolean array versus HashSet occurrence tracking

Conspect: `problem2`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 14 / 14
unique screenshots represented: 14
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A HashSet stores observed codes flexibly. A boolean array is faster and more compact when every code can be mapped to an integer in `[0, 2^k)`.

## HashSet approach

- Insert each substring or encoded integer.
- Duplicates are ignored automatically.
- The implementation is simple and works without preallocating every possible code.
- String substrings add allocation and hashing cost.

## Boolean array approach

- Encode a binary code as its numeric value.
- Use that value as an array index.
- The array length is exactly `2^k`.
- A false-to-true transition marks the first occurrence and increments the count.

## Choosing

- Use a boolean array when k is small and bounded.
- Use a HashSet when the universe is sparse or too large to allocate.
- An integer HashSet is generally better than a string HashSet for this binary problem.

## Representative pattern

```csharp
var seen = new bool[1 << k];

if (!seen[code])
{
    seen[code] = true;
    seenCount++;
}
```

## Caveats

- The boolean array has exponential size in k.
- Check input constraints before shifting and allocating.

## Source labels

- `array of bools vs hashset`
- `to check occurencies`

## Covered text elements

```text
T-057, T-058
```

## Covered screenshot uses

```text
IU-023, IU-030, IU-031, IU-032, IU-033, IU-034, IU-035, IU-036, IU-037, IU-038, IU-039, IU-040, IU-041
IU-042
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
