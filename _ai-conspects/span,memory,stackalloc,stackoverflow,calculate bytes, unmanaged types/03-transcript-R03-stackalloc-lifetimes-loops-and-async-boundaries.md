# Regional transcript — R03: stackalloc lifetimes, loops, GC pressure and async boundaries

Conspect: `span,memory,stackalloc,stackoverflow,calculate bytes, unmanaged types`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R03
image uses processed: 29 / 29
unique screenshots represented: 29
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Stack-backed memory is confined to the active method frame. The restrictions prevent references from escaping after the bytes disappear.

## Lifetime and escape rules

- A span over stackalloc memory cannot be returned to the caller.
- It cannot be assigned to a field, captured or stored in a heap object.
- Passing it to a helper is safe only for the duration of the call; the helper must not retain or return it beyond the valid lifetime.

## Separate helper methods

- Moving `stackalloc` to a helper creates storage in the helper's frame.
- The helper can fully consume the buffer and return an ordinary result.
- It cannot return a span that references its stack frame.

## Await boundaries

- An async method may use a span in a region that completes before an `await`, subject to compiler lifetime analysis.
- A span or stack-backed reference cannot remain live across an `await` because the async state machine is stored on the heap.
- Use array-backed `Memory<T>`, `IMemoryOwner<T>` or a rented array when data must survive suspension.

## Reducing GC pressure safely

- Reuse a bounded stack buffer for repeated synchronous operations.
- For larger or asynchronous work, `ArrayPool<T>` reduces allocation while preserving heap-safe lifetime.
- Always return pooled arrays in `finally` and clear sensitive or reference-containing buffers when required.

## Ref parameters and returns

- Passing a property as `ref` is normally impossible because an ordinary property access returns a value, not a stable storage location.
- A `ref`-returning property or method can expose a storage location when the API deliberately supports it.
- Returning a `ref` or span requires proving the referenced storage outlives the caller's use.

## Caveats

- Pooling trades allocation for lifetime discipline and possible data leakage if buffers are mishandled.
- Compiler escape analysis is a correctness boundary, not an inconvenience to work around.

## Nearby source labels

- tackalloc in separate method
- about stack overflow and memory
- if arg needs ref - your prop that you pass
- need to return ref
- reducing gc pressure
- how can avoid heap allocations in loops but carefully
- unmanaged types
- how to calculate size of some shit
- memory with stackallocated shit
- can memory be used with stackalloc/point to something that is stack allocated?
- where T :unmanaged
- pooling for crossing await
- stackalloc for code without crossing await
- locals,state machine

## Covered screenshot uses

```text
IU-012, IU-013, IU-014, IU-015, IU-016, IU-017, IU-018, IU-033, IU-034, IU-035, IU-036, IU-037, IU-038
IU-039, IU-040, IU-042, IU-043, IU-058, IU-059, IU-060, IU-061, IU-062, IU-091, IU-092, IU-093, IU-094
IU-095, IU-100, IU-101
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
