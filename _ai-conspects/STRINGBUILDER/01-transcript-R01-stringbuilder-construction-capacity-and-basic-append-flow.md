# Regional transcript — R01: StringBuilder construction, capacity and basic append flow

Conspect: `STRINGBUILDER`  
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

`System.Text.StringBuilder` maintains a mutable character buffer so repeated string construction does not allocate a new complete string after every change.

## Construction

- Create an empty builder or initialize it from an existing string.
- Provide an initial capacity when the approximate final size is known.
- Capacity is allocated storage; `Length` is the number of characters currently stored.
- `MaxCapacity` is an upper policy limit, though some operations can have implementation-specific growth behavior.

## Basic building

- `Append` adds values without replacing the existing buffer.
- `AppendLine` appends content followed by the environment newline.
- Most mutating methods return the same builder, enabling fluent chains.
- Call `Clear` to reuse the builder while retaining some allocated capacity.

## Index access

- The indexer reads or replaces a character already inside the current length.
- Setting a character does not resize the builder.

## Caveats

- StringBuilder is mutable and not generally safe for concurrent writes.
- For a few simple concatenations, ordinary interpolation is clearer and often optimized well.

## Covered source units

### Text elements

```text
T-001
```

### Screenshot uses

```text
IU-001
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
