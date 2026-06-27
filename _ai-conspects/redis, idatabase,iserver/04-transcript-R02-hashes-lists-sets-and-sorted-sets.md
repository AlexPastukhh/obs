# Regional transcript — R02: Hashes, lists, sets and sorted sets

Conspect: `redis, idatabase,iserver`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Redis data structures expose different atomic operations and should be selected by access pattern rather than by object shape alone.

## Hashes

- Hashes store field/value pairs under one Redis key.
- Use `HashSet`, `HashGet`, `HashGetAll`, `HashExists`, increments and field deletion for partial updates.
- Hash fields do not have independent TTLs; expiration is applied to the containing key.
- Hashes are useful for compact records when fields are updated independently.

## Lists

- Lists are ordered sequences supporting push/pop from either end and indexed/range reads.
- They can model queues, stacks and recent-item windows.
- Blocking queue semantics are server commands; application cancellation and timeout behavior must still be handled.

## Sets

- Sets store unique unordered members.
- Membership tests, add/remove and union/intersection/difference are server-side operations.
- They are a natural fit for tags, permissions, deduplication and membership indexes.

## Sorted sets

- Sorted sets store unique members with numeric scores.
- Range-by-rank and range-by-score support leaderboards, scheduling and time-ordered indexes.
- Updating an existing member changes its score rather than creating a duplicate member.

## Choosing a structure

- Choose the operation you need atomically: field update, ordered ends, membership algebra or score ordering.
- Avoid downloading an entire structure just to perform work Redis can do server-side.

## Caveats

- Large collections can make full-range reads expensive.
- Serialization format and member/key cardinality should be part of the design.

## Nearby source labels

- Hashes
- sets
- sortedsets
- lists
- keys

## Covered screenshot uses

```text
IU-005, IU-006, IU-007, IU-008, IU-011, IU-012, IU-013, IU-014, IU-015, IU-016, IU-018, IU-019, IU-022
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
