# Regional transcript — R04: ArrayPool renting, returning, clearing and request buffers

Conspect: `objectpool,arraypool,memorypool`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 14 / 14
unique screenshots represented: 14
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`ArrayPool<T>` rents arrays whose length is at least the requested size. It reduces repeated large-array allocation but transfers cleanup responsibility to the caller.

## Rent and return

- `Rent(length)` may return a larger array.
- Use only the requested logical slice unless the extra capacity is intentional.
- Return the exact array instance to the same pool once all users are finished.

## Clearing

- `Return(array, clearArray: true)` clears the full rented array before it is retained.
- Clearing matters for secrets and for arrays containing references.
- Manual clearing of only the used region can be appropriate when the data contract and pool policy allow it.

## Request buffers

- A temporary request buffer that is frequent and not tiny is a good candidate.
- When no parallel work escapes the method, the method can rent, use and return the array itself.
- When work continues asynchronously elsewhere, ownership must move with the consumer; returning early causes data corruption.

## API pattern

- Expose a span or memory slice for the valid length rather than the entire oversized array.
- Keep the rented array variable private so callers cannot accidentally return or retain it.

## Caveats

- Rented arrays are not guaranteed to be zeroed.
- Pool use can retain large arrays and should be bounded by realistic maximum sizes.

## Nearby source labels

- ARRAYPOOL
- TEMP ARRAY IS BEING CREATED
- FOR EACH REQUEST, LIKE BUFFER
- AVOID MESSY ARGS
- !!!
- what objects good for pooling
- what do you gain
- BUFFER IS VERY FREQUESNT AND NOT TINY
- BY ITSLEF
- THE CALLING METHOD CAN RETURN IT TO POOL
- RETURNING TO POOL
- OWNERSHIP AND RESPONSIBILITY OF
- LIKE ARRAYPOOL BUT WITH POSSIBILITY TO TRANSFER

## Covered screenshot uses

```text
IU-001, IU-010, IU-011, IU-012, IU-013, IU-014, IU-015, IU-016, IU-036, IU-037, IU-038, IU-039, IU-040
IU-041
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
