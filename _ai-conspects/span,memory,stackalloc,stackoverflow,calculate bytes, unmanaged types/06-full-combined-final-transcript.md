# Full combined final transcript — span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types

Generated: 2026-06-27 06:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 41 / 41
unique embedded screenshots: 110 / 110
screenshot uses on canvas: 111 / 111
repeated screenshot placements retained: 1
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 Span and ReadOnlySpan

`Span<T>` is a mutable view over contiguous memory. `ReadOnlySpan<T>` is the
read-only equivalent. Slicing creates another view without copying.

A span can refer to array elements, stackalloc memory, unmanaged memory and
other supported contiguous storage. A writable span mutates the backing
storage.

`Span<T>` is a `ref struct`. It cannot be boxed, stored in a normal class field,
captured, or kept across `await`/`yield`. A custom `ref struct` can contain span
fields because it inherits the same stack-only restrictions.

A class can expose a span-returning property or method that creates a temporary
view over storage owned by the class.

## 03 Memory and ReadOnlyMemory

`Memory<T>` and `ReadOnlyMemory<T>` are normal small value types. They can be
stored in fields, captured and carried across asynchronous boundaries.

`memory.Span` creates a short-lived span for synchronous processing. The
backing storage must have a lifetime independent of the current stack frame,
usually an array, string or custom memory manager.

`Memory<T>` cannot safely point to stackalloc memory: the memory descriptor can
escape to the heap and outlive the stack frame.

Copying a span or memory descriptor does not copy the elements. Both descriptors
still refer to the same backing storage.

## 04 Ownership and producer/consumer pipelines

Views do not own memory. An API must define:

- who owns the buffer;
- how long it stays valid;
- whether mutation is allowed;
- whether the consumer may retain it;
- when pooled storage is returned.

Async pipelines commonly pass `ReadOnlyMemory<T>` or an owned pooled buffer and
use spans only inside synchronous parsing steps.

A consumer must not retain a view after the producer reuses or returns the
buffer.

## 05 stackalloc

`stackalloc` reserves raw element storage in the current stack frame:

```csharp
Span<byte> buffer = stackalloc byte[256];
```

The bytes disappear when the method returns and are not managed by the GC.

Good candidates are small, bounded scratch buffers in hot synchronous parsing,
formatting or encoding paths. Large or user-controlled lengths should use an
array or pool.

A threshold pattern can choose stack for small inputs and rent for larger ones:

```csharp
byte[]? rented = null;
Span<byte> buffer = length <= 256
    ? stackalloc byte[length]
    : (rented = ArrayPool<byte>.Shared.Rent(length));

try
{
    buffer = buffer[..length];
    // use buffer
}
finally
{
    if (rented is not null)
        ArrayPool<byte>.Shared.Return(rented, clearArray: true);
}
```

The threshold is application-specific. It must account for total frame size,
nesting, recursion and platform thread-stack size.

## 06 Stack pressure and overflow

Large or repeated stack allocation can exhaust the thread stack. Stack overflow
is generally not recoverable inside the process.

Avoid `stackalloc` in a loop when each iteration may add stack pressure in the
same method frame. Allocate once outside the loop and reuse the span where
possible.

Moving stackalloc into a helper does not make the memory escapable. The helper
may consume the span completely and return an ordinary result, but it cannot
return a view over its own stack frame.

## 07 Async boundaries and pooling

A span or stack-backed reference cannot remain live across an `await` because
the async state machine is heap-stored.

Use:

- an array-backed `Memory<T>`;
- `ArrayPool<T>`;
- `MemoryPool<T>` / `IMemoryOwner<T>`;
- another explicit heap-safe owner.

Pooled buffers must be returned only after all consumers finish. Return them in
`finally`; clear sensitive data and reference-containing arrays when required.

## 08 ref parameters, properties and returns

An ordinary property is a method-like access and does not provide a stable
location for a `ref` argument. A deliberately `ref`-returning property or
method can expose a location.

A span-returning property can create a new view without storing a span field:

```csharp
public Span<byte> Data => _buffer.AsSpan(0, _length);
```

Any ref return or span return must reference storage that outlives the caller's
use. Stack local storage cannot be returned.

## 09 Unmanaged types

An unmanaged type is a value type whose fields recursively contain no managed
references. Numeric primitives, enums, pointers and structs made only of
unmanaged fields qualify.

The generic constraint:

```csharp
where T : unmanaged
```

permits pointer-oriented and raw-byte operations while excluding managed
references.

## 10 Calculating size

Different APIs answer different questions:

- `sizeof(T)`: unmanaged/native in-memory size in an allowed unsafe context;
- `Unsafe.SizeOf<T>()`: CLR managed size of a value of `T`;
- `Marshal.SizeOf<T>()`: marshaling/interoperability size, which may differ;
- `MemoryMarshal.AsBytes`: a byte view over compatible value elements.

Raw bytes include platform endianness and possible padding. They are not
automatically a stable serialization format.

## 11 Struct copying, padding and alignment

Ordinary structs are copied by value unless passed using `ref`, `in` or `out`.
Large mutable structs can be costly and surprising.

The runtime may insert padding between fields and at the end to satisfy
alignment. Grouping fields with larger alignment requirements before smaller
ones can reduce holes, but layout changes can break interop or binary contracts.

A common guideline suggests small immutable value types around 16 bytes or less.
It is not a hard runtime rule. Larger structs can be appropriate when copying is
controlled and measurements support the design.

Auto-properties generate backing fields and contribute to size.
`readonly struct` and `in` parameters can improve intent and sometimes avoid
copies, but should be validated with profiling.

## 12 Practical selection guide

Use `Span<T>` for short synchronous views and parsing.

Use `Memory<T>` when the view must be stored or cross an asynchronous boundary.

Use `stackalloc` for small bounded synchronous scratch buffers.

Use `ArrayPool<T>` or `MemoryPool<T>` for larger, repeated or asynchronous
buffers.

Use unmanaged constraints and raw byte APIs only when layout, lifetime,
endianness and ownership are explicit.

## Regional source map

### R01 — Span and Memory fundamentals, ownership and pipelines

Coverage: `28` screenshot uses, `27` unique screenshots, `1` repeated placements, `0` remaining. Detailed file: `01-transcript-R01-span-memory-ownership-and-pipelines.md`.

### R02 — stackalloc basics, thresholds and stack pressure

Coverage: `28` screenshot uses, `28` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `02-transcript-R02-stackalloc-basics-thresholds-and-stack-pressure.md`.

### R03 — stackalloc lifetimes, loops, GC pressure and async boundaries

Coverage: `29` screenshot uses, `29` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `03-transcript-R03-stackalloc-lifetimes-loops-and-async-boundaries.md`.

### R04 — Unmanaged types, Memory, pooling and size calculation

Coverage: `10` screenshot uses, `10` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `04-transcript-R04-unmanaged-types-pooling-and-size-calculation.md`.

### R05 — Struct layout, padding, alignment and compact value-type guidelines

Coverage: `16` screenshot uses, `16` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `05-transcript-R05-struct-layout-padding-alignment-and-guidelines.md`.

## Exactness note

This document is the authoritative integrated semantic transcript. The complete
SVG and extracted screenshot files remain authoritative for exact punctuation,
provider-specific syntax and version-sensitive API spellings.
