# Regional transcript — R01: Substring overloads and index/count semantics

Conspect: `SUBSTRING`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

C# `String.Substring` returns a new string beginning at a zero-based index, optionally limited to a character count.

## Overloads

- `Substring(startIndex)` returns from the start index through the end.
- `Substring(startIndex, length)` returns exactly `length` characters.
- The second argument is a count, not an end index.

## Examples

- Starting at zero can reproduce the entire string when the count equals `Length`.
- A zero length returns an empty string.
- Starting at `Length` is valid only for a zero-length result or the one-argument empty suffix.

## Caveats

- Indices refer to UTF-16 code units, not user-perceived grapheme clusters.
- Invalid ranges throw rather than clamp automatically.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-004
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
