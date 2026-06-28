# Regional transcript — R05: Mask construction and fixed-width bit window

Conspect: `problem2`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 12 / 12
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 2
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The mask `(1 << k) - 1` contains exactly k low-order one bits. ANDing with it keeps the rolling code inside the required window width.

## Why subtraction works

- `1 << k` is a one followed by k zero bits.
- Subtracting one turns those k lower zeros into ones.
- For k=3, `1000 - 1 = 0111`.
- For k=5, `100000 - 1 = 011111`.

## Window update example

- Suppose the current code is `1101` and k=3.
- AND with `0111` keeps `101`.
- The high bit outside the latest three positions is discarded.
- The next left-shift and append continues the sliding window.

## Character conversion

- Binary characters have consecutive codes.
- Subtracting `'0'` converts `'0'` to 0 and `'1'` to 1.
- Validate the alphabet if input is not guaranteed to be binary.

## Representative pattern

```text
k = 3
1 << k      = 1000
(1 << k)-1  = 0111
rolling AND = keep latest 3 bits
```

## Caveats

- `1 << 0` equals 1, so k=0 needs an explicit interpretation from the problem statement.
- Signed overflow and language-specific shift rules must be considered.

## Source labels

- `mask explaination`
- `how we can limit window`
- `need mask need -1 so we can add`
- `new bit and get needed length`
- `classic convertion to int from char`
- `so when we need to keep 3 bits window`
- `we put 1 3 times and then we do -1`
- `so 111 will be 011`
- `and its true for every count of pushes`
- `with 4 1111 -1 = 0111`
- `with 5 11111 -1 = 01111`
- `1 << 0 by the way is 01`

## Covered text elements

```text
T-059, T-060, T-061, T-062, T-063, T-064, T-065, T-066, T-067, T-068, T-069, T-070
```

## Covered screenshot uses

```text
IU-027, IU-043, IU-044
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
