# Regional transcript — R05: MemoryPool ownership, IMemoryOwner and disposal

Conspect: `objectpool,arraypool,memorypool`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 8 / 8
unique screenshots represented: 8
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`MemoryPool<T>` combines pooled storage with an ownership object, making transfer and disposal explicit across asynchronous boundaries.

## Ownership object

- `Rent` returns `IMemoryOwner<T>`.
- The owner's `Memory` property exposes the usable buffer.
- Disposing the owner returns the backing memory to the pool.

## Transfer

- Unlike a bare rented array, the owner can be passed to another component that becomes responsible for disposal.
- Ownership transfer should be explicit in method names, documentation and error paths.
- After disposal, no span, memory slice or pointer into the buffer may be used.

## When to use

- Use memory owners when a buffer crosses awaits, queues or producer/consumer boundaries.
- Use `ArrayPool<T>` when the renting method retains clear responsibility and can return the array locally.
- Use stack allocation only for small synchronous scratch data that cannot escape.

## Disposal pattern

- Use `using` when ownership remains local.
- When transferring, do not also dispose in the producer.
- If transfer fails, the original owner must dispose the object.

## Caveats

- A `Memory<T>` value does not own its backing storage.
- Disposal is the lifetime boundary, not garbage collection.

## Nearby source labels

- RETURNING TO POOL
- OWNERSHIP AND RESPONSIBILITY OF
- LIKE ARRAYPOOL BUT WITH POSSIBILITY TO TRANSFER
- AVOID MESSY ARGS
- !!!

## Covered screenshot uses

```text
IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
