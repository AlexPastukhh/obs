# Full combined final transcript — objectpool,arraypool,memorypool

Generated: 2026-06-27 08:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 30 / 30
unique embedded screenshots: 54 / 54
screenshot uses on canvas: 54 / 54
repeated screenshot placements retained: 0
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 ObjectPool<T>

`ObjectPool<T>` reuses expensive resettable objects. `Get` transfers temporary
exclusive use to the caller; `Return` gives the object back after reset.

The pool is not a semaphore or fixed-capacity resource. If all retained objects
are checked out, it can create another object. The retention limit controls how
many returned objects are cached.

A good pool candidate:

- is expensive enough to construct that reuse matters;
- can be reset reliably;
- has bounded retained memory;
- is not used after return.

Use `try/finally` so exceptions do not leak checked-out objects.

## 03 ObjectPoolProvider and policies

`DefaultObjectPoolProvider` creates pools. It is normally shared as a singleton.
Most applications should create and register the concrete `ObjectPool<T>` once
rather than creating a transient pool for every consumer.

`IPooledObjectPolicy<T>` defines:

```text
Create() → new clean object
Return(obj) → reset and decide whether to retain
```

Policies can reject oversized or invalid objects. For example, a
`StringBuilder` pool can clear normal builders but discard builders whose
capacity grew beyond a configured limit.

## 04 ArrayPool<T>

`ArrayPool<T>.Shared.Rent(length)` returns an array whose actual length is at
least the requested length. The caller must track the logical used length.

Return the same array exactly once after all consumers finish. Rented arrays are
not guaranteed to be cleared, so sensitive data and reference arrays require an
explicit clearing policy.

A typical safe local lifetime is:

```csharp
byte[] rented = ArrayPool<byte>.Shared.Rent(requiredLength);

try
{
    Span<byte> buffer = rented.AsSpan(0, requiredLength);
    // use buffer
}
finally
{
    ArrayPool<byte>.Shared.Return(rented, clearArray: true);
}
```

Do not return the array while asynchronous or parallel work still uses it.

## 05 MemoryPool<T> and IMemoryOwner<T>

`MemoryPool<T>.Rent` returns `IMemoryOwner<T>`. The owner exposes `Memory<T>` and
returns the backing storage when disposed.

This model makes ownership transferable:

```text
producer owns IMemoryOwner<T>
→ producer transfers owner to consumer
→ consumer disposes after final use
```

Use memory owners when buffers cross awaits, queues or component boundaries.
Use `ArrayPool<T>` when the renting method keeps clear local responsibility.

A `Memory<T>` slice is only a view. It does not own the backing memory and must
not be used after the owner is disposed.

## 06 Selection guide

Use `ObjectPool<T>` for reusable stateful objects with a reset policy.

Use `ArrayPool<T>` for raw arrays whose lifetime remains clearly controlled by
the renting code.

Use `MemoryPool<T>` / `IMemoryOwner<T>` when ownership must cross asynchronous
or producer/consumer boundaries.

Use stack allocation for small synchronous scratch buffers that cannot escape.

Pooling reduces allocations but can increase retained memory and correctness
risk. Measure the hot path and keep ownership explicit.

## Regional source map

### R01 — ObjectPoolProvider registration, default policies and DI lifetime

Coverage: `13` screenshot uses, `13` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `04-transcript-R01-objectpoolprovider-registration-policies-and-di.md`.

### R02 — Custom object pools, policies and manual ownership

Coverage: `8` screenshot uses, `8` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `05-transcript-R02-custom-object-pools-policies-and-ownership.md`.

### R03 — ObjectPool basics, StringBuilder pooling and reset behavior

Coverage: `11` screenshot uses, `11` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `06-transcript-R03-objectpool-basics-stringbuilder-and-reset.md`.

### R04 — ArrayPool renting, returning, clearing and request buffers

Coverage: `14` screenshot uses, `14` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `07-transcript-R04-arraypool-rent-return-clear-and-request-buffers.md`.

### R05 — MemoryPool ownership, IMemoryOwner and disposal

Coverage: `8` screenshot uses, `8` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `08-transcript-R05-memorypool-ownership-imemoryowner-and-disposal.md`.

## Exactness note

This document is the authoritative integrated semantic transcript. The complete
SVG and recovered screenshots remain authoritative for exact punctuation,
version-specific API signatures and code spelling.
