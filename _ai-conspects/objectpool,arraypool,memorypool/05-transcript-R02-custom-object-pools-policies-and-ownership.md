# Regional transcript — R02: Custom object pools, policies and manual ownership

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

A custom object pool is appropriate for expensive reusable objects that can be reset to a known state and are not used concurrently after return.

## Good candidates

- Objects should be expensive enough to create that reuse matters.
- They should have bounded retained memory and a reliable reset procedure.
- Examples include `StringBuilder`, reusable buffers wrapped in an object and parser/encoder state.

## Poor candidates

- Tiny cheap objects usually cost less to allocate than to pool.
- Objects with complex ownership, unmanaged handles or hidden references are risky unless reset and disposal are explicit.
- Objects that grow without bound can make a pool retain excessive memory.

## Policy design

- `Create` constructs a valid clean instance.
- `Return` clears request-specific state and returns `true` only when the object is safe to retain.
- A policy can reject oversized objects so one unusual request does not permanently enlarge the pool.

## Ownership

- `Get` transfers exclusive temporary use to the caller.
- The caller must return the object exactly once and stop using it after return.
- Return belongs in `finally` so exceptions do not leak reusable objects.

## Caveats

- A pool is not a concurrency primitive; an object checked out by one caller must not be shared unless the object itself is safe.
- Pooling can increase retained memory even while reducing allocations.

## Nearby source labels

- OBJECTPOOL
- basics,
- provider.create
- customobjectpool
- what do you gain
- what objects good for pooling
- createstringbuilderpool

## Covered screenshot uses

```text
IU-017, IU-018, IU-019, IU-027, IU-028, IU-029, IU-030, IU-031
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
