# Regional transcript — R03: Edge cases, validation and allocation behavior

Conspect: `SUBSTRING`  
Generated: 2026-06-28 05:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 1 / 1
unique screenshots represented: 1
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Substring boundaries should be validated when they come from searches, parsing or external input.

## Validation

- `startIndex` must be between zero and the string length.
- `length` must be non-negative.
- `startIndex + length` must not exceed the string length.
- Check search results such as `IndexOf` for `-1` before slicing.

## Allocation

- Modern .NET creates a new string containing the selected characters.
- Repeated slicing in a parser can produce many allocations.
- Use spans for transient parsing and substring only for values that must survive independently.

## Unicode

- A slice can divide a surrogate pair or combining sequence.
- Use rune or text-element APIs when slicing by user-perceived characters matters.

## Caveats

- Empty input is valid and should be handled explicitly.
- Culture-aware text boundaries are different from raw string indices.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-001
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
