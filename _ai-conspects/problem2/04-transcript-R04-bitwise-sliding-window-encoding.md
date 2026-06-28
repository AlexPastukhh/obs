# Regional transcript — R04: Bitwise sliding-window encoding

Conspect: `problem2`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 11 / 11
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A rolling integer represents the current k-bit window. Each new character shifts the previous value left, adds the new bit and discards bits older than the window.

## Append a bit

- Left shift moves every existing bit one position.
- Convert the current character with `s[i] - '0'`.
- Bitwise OR appends that 0 or 1 in the lowest position.
- The operation avoids constructing substring objects.

## Maintain fixed width

- AND with a k-bit mask removes any bit older than the window.
- After processing at least k characters, the integer is the exact current window code.
- The same tracker then records whether that code was seen.

## Complexity

- The input is scanned once: O(n).
- The tracker uses O(2^k) memory for the boolean-array version.
- Each window update is constant time.

## Representative pattern

```csharp
int code = 0;
int mask = (1 << k) - 1;

for (int i = 0; i < s.Length; i++)
{
    code = ((code << 1) & mask) | (s[i] - '0');

    if (i >= k - 1)
    {
        // code represents s[i-k+1..i]
    }
}
```

## Caveats

- Bitwise operators use fixed-width integer semantics.
- Use a larger numeric type or another strategy when k approaches the bit width.

## Source labels

- `WITH BITS`
- `SHIFT BY ONE TO <<`
- `001 << 1`
- `010`
- `ADD BIT`
- `010 | S[I] WHERE S[I]==1`
- `011`
- `1101 & 0111 (111)`
- `101`
- `SO WE HAVE SLIDING WINDOW`
- `WE DO THIS BECAUSE WE HAVE ARRAY OF CHARS HERE (STRING)`

## Covered text elements

```text
T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056
```

## Covered screenshot uses

```text
IU-018, IU-019, IU-020, IU-021, IU-022, IU-024, IU-029
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
