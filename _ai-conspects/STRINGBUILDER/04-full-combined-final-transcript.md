# Full combined final transcript — STRINGBUILDER

Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements: 1 / 1
unique screenshots: 5 / 5
screenshot uses: 5 / 5
repeated placements retained: 0
regions: 3 / 3
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — StringBuilder construction, capacity and basic append flow

`System.Text.StringBuilder` maintains a mutable character buffer so repeated string construction does not allocate a new complete string after every change.

### Construction

- Create an empty builder or initialize it from an existing string.
- Provide an initial capacity when the approximate final size is known.
- Capacity is allocated storage; `Length` is the number of characters currently stored.
- `MaxCapacity` is an upper policy limit, though some operations can have implementation-specific growth behavior.

### Basic building

- `Append` adds values without replacing the existing buffer.
- `AppendLine` appends content followed by the environment newline.
- Most mutating methods return the same builder, enabling fluent chains.
- Call `Clear` to reuse the builder while retaining some allocated capacity.

### Index access

- The indexer reads or replaces a character already inside the current length.
- Setting a character does not resize the builder.

### Caveats

- StringBuilder is mutable and not generally safe for concurrent writes.
- For a few simple concatenations, ordinary interpolation is clearer and often optimized well.

## R02 — Append, insert, replace and formatting methods

StringBuilder exposes focused mutation methods for composing and editing a character sequence.

### Appending

- `Append` has overloads for strings, characters, numbers, objects, spans and repeated characters.
- `AppendJoin` joins a sequence with a separator directly into the builder.
- `AppendFormat` applies composite formatting; interpolation handlers may provide a clearer modern alternative.

### Insertion and removal

- `Insert(index, value)` shifts existing characters and inserts new content.
- `Remove(startIndex, length)` deletes a contiguous range.
- Operations near the beginning move more existing characters than operations near the end.

### Replacement

- `Replace(oldValue, newValue)` replaces matching text.
- Range-limited overloads restrict replacement to part of the current builder.
- Character replacement avoids constructing intermediate strings.

### Fluent assembly

- Chain related operations when it improves readability.
- For conditional fragments, ordinary statements are often clearer than deeply nested fluent expressions.

### Caveats

- Indices and lengths must remain inside the current builder contents.
- Repeated insertion at the front can still be expensive.

## R03 — Conversion, performance guidance and usage patterns

The mutable buffer becomes an immutable `string` only when `ToString` is called.

### Conversion

- `ToString()` materializes the full current contents.
- `ToString(startIndex, length)` materializes a selected range.
- Further builder mutations do not change strings that were already produced.

### When it helps

- Use StringBuilder for loops with many incremental appends, unknown fragment counts or large generated output.
- It is useful for serializers, code generation, reports and protocol/text construction.
- Reuse can reduce allocations when ownership is clear.

### When it does not help

- For a fixed small number of operands, `+` or interpolation is usually simpler.
- The compiler can combine constant and straightforward concatenation expressions efficiently.
- Creating a builder only to append two values and immediately call `ToString` adds complexity without clear benefit.

### Sizing

- Estimate capacity when practical, but avoid excessive over-allocation.
- Inspect allocations with a profiler rather than assuming every concatenation is a bottleneck.

### Caveats

- Do not expose a shared mutable builder across unrelated callers.
- Formatting still depends on culture unless an explicit provider is supplied.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 1 | 1 | 1 | 0 | 0 |
| R02 | 0 | 2 | 2 | 0 | 0 |
| R03 | 0 | 2 | 2 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The complete SVG and extracted
screenshots remain authoritative for exact source code, punctuation and version details.
