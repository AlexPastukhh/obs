# Full combined final transcript — SUBSTRING

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 1 / 1
unique screenshots: 4 / 4
screenshot uses: 4 / 4
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Substring overloads and index/count semantics

C# `String.Substring` returns a new string beginning at a zero-based index, optionally limited to a character count.

### Overloads

- `Substring(startIndex)` returns from the start index through the end.
- `Substring(startIndex, length)` returns exactly `length` characters.
- The second argument is a count, not an end index.

### Examples

- Starting at zero can reproduce the entire string when the count equals `Length`.
- A zero length returns an empty string.
- Starting at `Length` is valid only for a zero-length result or the one-argument empty suffix.

### Caveats

- Indices refer to UTF-16 code units, not user-perceived grapheme clusters.
- Invalid ranges throw rather than clamp automatically.

## R02 — Range and index alternatives

Modern C# range syntax can express prefixes, suffixes and slices more directly.

### Range syntax

- `text[start..end]` uses an exclusive end index.
- `text[start..]` returns a suffix.
- `text[..end]` returns a prefix.
- The `^` index counts from the end, so `^1` identifies the last element position.

### Comparison with Substring

- Substring uses start plus count.
- Ranges use start plus exclusive end.
- Choose the form that communicates the intended boundary most clearly.

### Span slicing

- `AsSpan` and span ranges can inspect slices without immediately allocating a new string.
- Convert to string only when an owned immutable string is required.

### Caveats

- Range operations on strings still allocate a string result unless working with spans.
- End-from-end calculations must account for the exclusive range boundary.

## R03 — Edge cases, validation and allocation behavior

Substring boundaries should be validated when they come from searches, parsing or external input.

### Validation

- `startIndex` must be between zero and the string length.
- `length` must be non-negative.
- `startIndex + length` must not exceed the string length.
- Check search results such as `IndexOf` for `-1` before slicing.

### Allocation

- Modern .NET creates a new string containing the selected characters.
- Repeated slicing in a parser can produce many allocations.
- Use spans for transient parsing and substring only for values that must survive independently.

### Unicode

- A slice can divide a surrogate pair or combining sequence.
- Use rune or text-element APIs when slicing by user-perceived characters matters.

### Caveats

- Empty input is valid and should be handled explicitly.
- Culture-aware text boundaries are different from raw string indices.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 1 | 1 | 1 | 0 | 0 |
| R02 | 0 | 2 | 2 | 0 | 0 |
| R03 | 0 | 1 | 1 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
