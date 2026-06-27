# Regional transcript — R01: Span and Memory fundamentals, ownership and pipelines

Conspect: `span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R01
image uses processed: 28 / 28
unique screenshots represented: 27
repeated placements retained: 1
remaining image uses: 0
```

## Semantic transcript

`Span<T>` and `Memory<T>` are views over contiguous memory. They avoid copying but have different lifetime and storage rules.

## Span and ReadOnlySpan

- `Span<T>` is a mutable stack-only view; `ReadOnlySpan<T>` exposes a read-only view.
- Slicing creates another view over the same memory rather than copying elements.
- Mutation through a writable span changes the underlying storage.
- A span can refer to an array, string characters through `ReadOnlySpan<char>`, unmanaged memory or stack-allocated memory.

## Ref-struct restrictions

- `Span<T>` is a `ref struct` and cannot be boxed, captured by a lambda, stored in a normal class field or cross an `await`/`yield` suspension point.
- A `ref struct` type may contain span fields because the containing value is also restricted to the stack.
- A normal class can expose a span-returning property or method that creates a fresh short-lived view over owned storage.

## Memory and ReadOnlyMemory

- `Memory<T>` is a normal small value type that can be stored in fields, captured and carried across asynchronous operations.
- Its `.Span` property creates a temporary span for synchronous access.
- `Memory<T>` normally points to array-backed, string-backed or custom memory-manager storage with a lifetime independent of the current stack frame.

## Ownership and pipelines

- A view does not own memory. The producer/consumer contract must state who keeps the backing storage alive and who may mutate it.
- Pipelines often pass `ReadOnlyMemory<T>` or pooled buffers across asynchronous boundaries and use spans only while parsing synchronously.
- A consumer must not retain a view after the owner returns or reuses the buffer.

## Caveats

- Zero-copy code can become incorrect when ownership and reuse are implicit.
- A copied `Span<T>` or `Memory<T>` value still points to the same underlying memory.

## Nearby source labels

- and maybe mutation if its mutable
- provide view of something without copying
- span and memory
- stackalloc
- stackallock
- stackmemory stack overflow
- memory.span
- stackalloc additions
- have inside
- memory vs span
- producer - consumer pipeline usecase
- for memory
- !!!!
- what span and memory can
- can i use ref with them?
- so of memory and span are structs, they are being copyed
- what is ordinary value type, not ref struct
- that return new span
- but can have property
- cant have span in field

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-019, IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-045
IU-046, IU-047, IU-048, IU-054, IU-055, IU-056, IU-064, IU-065, IU-066, IU-074, IU-075, IU-076, IU-109
IU-110, IU-111
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
