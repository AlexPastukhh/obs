# Regional transcript — R02: Range and index alternatives

Conspect: `SUBSTRING`  
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

Modern C# range syntax can express prefixes, suffixes and slices more directly.

## Range syntax

- `text[start..end]` uses an exclusive end index.
- `text[start..]` returns a suffix.
- `text[..end]` returns a prefix.
- The `^` index counts from the end, so `^1` identifies the last element position.

## Comparison with Substring

- Substring uses start plus count.
- Ranges use start plus exclusive end.
- Choose the form that communicates the intended boundary most clearly.

## Span slicing

- `AsSpan` and span ranges can inspect slices without immediately allocating a new string.
- Convert to string only when an owned immutable string is required.

## Caveats

- Range operations on strings still allocate a string result unless working with spans.
- End-from-end calculations must account for the exclusive range boundary.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-002, IU-003
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
