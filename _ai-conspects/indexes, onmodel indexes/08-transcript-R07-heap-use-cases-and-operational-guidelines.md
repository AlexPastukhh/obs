# Regional transcript — R07: Heap use cases, forwarded records and operational guidelines

Conspect: `indexes, onmodel indexes`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R07
image uses processed: 8 / 8
unique screenshots represented: 8
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Heaps can be intentional for transient or append-oriented workloads, but forwarded records and index maintenance make them a poor default for many OLTP tables.

## Reasonable heap cases

- Staging tables that load quickly and are indexed after bulk ingestion.
- Small temporary/intermediate tables with minimal querying.
- Append-only data that is rarely updated and accessed through narrow nonclustered paths.
- Short-lived ETL structures where a clustered order provides no measurable benefit.

## Forwarded records

- Updating a variable-length heap row can move it to another page while the original RID retains a forwarding pointer.
- Future RID lookups require an extra hop, and repeated growth can increase scattered I/O.
- A rebuild or clustered-index creation can remove forwarded records.

## Simple decision guide

- Start with the access patterns: point lookups, ranges, joins, ordering, writes and retention.
- Keep clustered keys narrow and stable.
- Add indexes for demonstrated query shapes, then verify actual execution plans and write impact.
- Treat heaps as a deliberate workload choice, not as an index-free optimization.

## Caveats

- The best physical design can change as data volume and query distribution change.
- Operational telemetry is required to distinguish a theoretical concern from a real bottleneck.

## Nearby source labels

- ,so it doesnt update rid
- many indexes to update
- make sense when heap has
- small temp table
- append only table
- minimum querying
- you just dont want indx
- in an intermediate step
- but the default is forwarding
- records

## Covered screenshot uses

```text
IU-107, IU-113, IU-114, IU-115, IU-119, IU-120, IU-121, IU-122
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
