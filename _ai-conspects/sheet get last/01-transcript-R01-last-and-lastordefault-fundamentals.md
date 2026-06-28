# Regional transcript — R01: Last and LastOrDefault fundamentals

Conspect: `sheet get last`  
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

LINQ `Last` returns the final element of a sequence, while `LastOrDefault` returns a default value when no element exists.

## Last

- `Last()` throws when the sequence is empty.
- `Last(predicate)` returns the final matching element and throws when no match exists.
- Use it when absence indicates an invariant violation.

## LastOrDefault

- `LastOrDefault()` returns the type's default for an empty sequence.
- `LastOrDefault(predicate)` returns the default when no element matches.
- Newer overloads can accept an explicit fallback value in supported target frameworks.

## Ambiguity

- For value types, the default value can also be a legitimate final element.
- Use nullable projections, explicit existence checks or a different result type when absence must be distinguishable.

## Caveats

- Do not use exception-driven control flow when an empty sequence is normal.
- The source can be enumerated completely.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-006, IU-007
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
