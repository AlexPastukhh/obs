# Regional transcript — R03: WHERE, JOIN, ORDER BY, GROUP BY and composite-column ordering

Conspect: `indexes, onmodel indexes`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R03
image uses processed: 26 / 26
unique screenshots represented: 26
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Index usefulness follows the query shape. Composite key order determines which prefixes can be sought and which ordering can be reused.

## WHERE predicates

- Equality predicates commonly belong before range predicates in a composite key.
- A key `(TenantId, Status, CreatedAt)` can efficiently seek by `TenantId`, by `TenantId + Status`, and then a range on `CreatedAt`.
- A query that only filters on a non-leading column may not be able to seek the composite index efficiently.

## JOIN

- Indexes on join keys reduce repeated scans and support nested-loop, merge or other join strategies.
- Both sides may benefit from indexes, depending on which input is outer/inner and the estimated row counts.
- Foreign-key columns are common index candidates but are not universally indexed automatically by every database design.

## ORDER BY and GROUP BY

- An index can avoid an explicit sort when its key order matches the requested ordering.
- A uniformly reversed order can often be obtained by scanning an index backward; mixed directions may require explicit ascending/descending metadata.
- GROUP BY can benefit when rows arrive ordered by the grouping keys, although aggregation cost and selectivity still matter.

## Two indexes versus one composite index

- Separate single-column indexes do not always replace a well-designed composite index.
- The optimizer may combine indexes, but intersection has extra work and may still require lookups.
- Use workload-specific composite indexes for recurring multi-column predicates and ordering.

## Caveats

- Column order is based on real predicates and sort requirements, not on selectivity folklore alone.
- Parameter-sensitive plans can make one index excellent for some values and poor for others.

## Nearby source labels

- composite indexes
- indexes
- column order in composite
- equality before range(ordering)
- common pattern
- EF CORE
- indexes help where
- 2 indexes can help
- indexes help join
- !!!
- needed
- group by,
- row are already nearby
- desc index, but its not
- order by, can create

## Covered screenshot uses

```text
IU-026, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032, IU-033, IU-038, IU-039, IU-040, IU-041, IU-042
IU-043, IU-044, IU-045, IU-046, IU-047, IU-048, IU-049, IU-050, IU-051, IU-052, IU-053, IU-076, IU-078
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
