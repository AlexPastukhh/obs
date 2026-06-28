# Regional transcript — R02: Append, insert, replace and formatting methods

Conspect: `STRINGBUILDER`  
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

StringBuilder exposes focused mutation methods for composing and editing a character sequence.

## Appending

- `Append` has overloads for strings, characters, numbers, objects, spans and repeated characters.
- `AppendJoin` joins a sequence with a separator directly into the builder.
- `AppendFormat` applies composite formatting; interpolation handlers may provide a clearer modern alternative.

## Insertion and removal

- `Insert(index, value)` shifts existing characters and inserts new content.
- `Remove(startIndex, length)` deletes a contiguous range.
- Operations near the beginning move more existing characters than operations near the end.

## Replacement

- `Replace(oldValue, newValue)` replaces matching text.
- Range-limited overloads restrict replacement to part of the current builder.
- Character replacement avoids constructing intermediate strings.

## Fluent assembly

- Chain related operations when it improves readability.
- For conditional fragments, ordinary statements are often clearer than deeply nested fluent expressions.

## Caveats

- Indices and lengths must remain inside the current builder contents.
- Repeated insertion at the front can still be expensive.

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
