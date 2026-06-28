# Regional transcript — R03: Conversion, performance guidance and usage patterns

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

The mutable buffer becomes an immutable `string` only when `ToString` is called.

## Conversion

- `ToString()` materializes the full current contents.
- `ToString(startIndex, length)` materializes a selected range.
- Further builder mutations do not change strings that were already produced.

## When it helps

- Use StringBuilder for loops with many incremental appends, unknown fragment counts or large generated output.
- It is useful for serializers, code generation, reports and protocol/text construction.
- Reuse can reduce allocations when ownership is clear.

## When it does not help

- For a fixed small number of operands, `+` or interpolation is usually simpler.
- The compiler can combine constant and straightforward concatenation expressions efficiently.
- Creating a builder only to append two values and immediately call `ToString` adds complexity without clear benefit.

## Sizing

- Estimate capacity when practical, but avoid excessive over-allocation.
- Inspect allocations with a profiler rather than assuming every concatenation is a bottleneck.

## Caveats

- Do not expose a shared mutable builder across unrelated callers.
- Formatting still depends on culture unless an explicit provider is supplied.

## Covered source units

### Text elements

```text
(none; screenshot-only region)
```

### Screenshot uses

```text
IU-004, IU-005
```

The preserved SVG and screenshots remain authoritative for exact code and punctuation.
