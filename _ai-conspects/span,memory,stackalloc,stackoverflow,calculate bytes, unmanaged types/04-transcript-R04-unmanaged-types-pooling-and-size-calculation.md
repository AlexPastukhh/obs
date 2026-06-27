# Regional transcript — R04: Unmanaged types, Memory, pooling and size calculation

Conspect: `span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R04
image uses processed: 10 / 10
unique screenshots represented: 10
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

The `unmanaged` constraint and size APIs distinguish CLR layout, marshaled layout and raw byte views.

## Unmanaged types

- An unmanaged type is a value type whose fields recursively contain no managed references.
- Examples include primitive numeric types, enums, pointers and structs composed only of unmanaged fields.
- `where T : unmanaged` allows pointer-oriented or byte-oriented generic operations without managed references.

## Memory and stackalloc

- `Memory<T>` cannot safely represent stackalloc storage because it can be stored on the heap and outlive the stack frame.
- `Memory<T>` itself is a small value type, but its backing storage must have a compatible lifetime.
- Use `Span<T>` for stackalloc and `Memory<T>` for data that must cross asynchronous or heap-stored boundaries.

## Pooling

- `ArrayPool<T>` rents arrays for variable-size temporary work.
- `MemoryPool<T>` returns owners that expose `Memory<T>` and have explicit disposal.
- Pooling is appropriate for buffers crossing awaits, producer/consumer queues and larger repeated operations.

## Calculating size

- `sizeof(T)` is available for known unmanaged types and in generic unsafe code constrained with `unmanaged`.
- `Unsafe.SizeOf<T>()` reports the managed in-memory size used by the CLR for a value of `T`.
- `Marshal.SizeOf<T>()` reports marshaling size and can differ because interop layout rules are different.
- `MemoryMarshal.AsBytes` can reinterpret a span of unmanaged-like value data as bytes when the type contains no managed references.

## Caveats

- Raw byte serialization is sensitive to endianness, padding and runtime layout; it is not automatically a portable file/network format.
- Pool ownership must be explicit so a buffer is not returned while a consumer still uses it.

## Nearby source labels

- how to calculate size of some shit
- reducing gc pressure
- can memory be used with stackalloc/point to something that is stack allocated?
- memory with stackallocated shit
- where T :unmanaged
- padding for alignment
- how to waste less memory just by ordering
- memory itself is stack allocated?
- 16 btes for struct guideline
- properties properly
- pooling for crossing await
- stackalloc for code without crossing await
- locals,state machine
- why we cant cross await with stackalloc, because of stackalloc or span?

## Covered screenshot uses

```text
IU-041, IU-063, IU-068, IU-069, IU-070, IU-096, IU-097, IU-098, IU-099, IU-108
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
