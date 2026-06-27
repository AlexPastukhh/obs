# Regional transcript — R05: Struct layout, padding, alignment and compact value-type guidelines

Conspect: `span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R05
image uses processed: 16 / 16
unique screenshots represented: 16
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Value-type size is determined by field sizes plus alignment and padding. Reordering fields can reduce waste, but API clarity and interoperability constraints come first.

## Copy semantics

- Ordinary structs are copied by value unless passed with `ref`, `in` or `out`.
- `Span<T>` and `Memory<T>` are also structs; copying the descriptor is cheap, but both descriptors still refer to the same backing data.
- Large mutable structs are expensive and error-prone because implicit copies can be surprising.

## Padding and alignment

- The runtime aligns fields according to type and platform rules and may insert padding between fields and at the end of the struct.
- Grouping fields from larger alignment requirements to smaller ones can reduce holes.
- Explicit or sequential layout should be used only when binary/interop layout is a real contract.

## The small-struct guideline

- A frequently cited guideline is to keep general-purpose immutable value types around 16 bytes or less, but it is not a hard runtime limit.
- Larger structs can be appropriate when copying is controlled, locality matters and profiling supports the design.
- Use `readonly struct` and `in` parameters when they improve semantics and avoid defensive copies.

## Properties and storage

- Auto-properties in a struct generate backing fields and contribute to size.
- A property that computes and returns a new span does not store the span as a field.
- A ref-returning property exposes a location and must preserve lifetime and mutation invariants.

## Measuring

- Use `Unsafe.SizeOf<T>()` for managed size checks and inspect actual layout when optimization matters.
- Do not assume source declaration order always equals the most compact runtime arrangement unless layout is fixed.
- Benchmark end-to-end behavior because a smaller struct can still be slower if it complicates access.

## Caveats

- Changing field order can break serialized or interop contracts.
- Memory savings should not obscure domain meaning or immutability.

## Nearby source labels

- 16 btes for struct guideline
- properties properly
- how to waste less memory just by ordering
- padding for alignment
- why we cant cross await with stackalloc, because of stackalloc or span?
- memory itself is stack allocated?
- can memory be used with stackalloc/point to something that is stack allocated?

## Covered screenshot uses

```text
IU-071, IU-072, IU-073, IU-084, IU-085, IU-086, IU-087, IU-088, IU-089, IU-090, IU-102, IU-103, IU-104
IU-105, IU-106, IU-107
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
