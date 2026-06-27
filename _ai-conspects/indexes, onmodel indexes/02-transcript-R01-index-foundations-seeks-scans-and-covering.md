# Regional transcript — R01: Index foundations: seeks, scans, clustered, nonclustered and covering

Conspect: `indexes, onmodel indexes`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R01
image uses processed: 45 / 45
unique screenshots represented: 45
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

This region establishes what an index stores and why a seek, scan or lookup can be appropriate depending on selectivity, width and row count.

## Physical idea

- A B-tree index is more than a sorted list: it has root, intermediate and leaf pages, ordering metadata and row locators.
- A narrow index can be much cheaper to scan than a wide clustered table because fewer pages must be read.
- The optimizer chooses a plan from estimated cost; a scan is not automatically a bad plan and a seek is not automatically efficient.

## Seek and scan

- An index seek navigates to a key or range and reads the matching leaf entries.
- An index scan reads all or a large portion of the index when the predicate is not selective, no useful leading key exists or most rows are needed.
- A table scan reads the heap or clustered structure when no narrower useful access path is cheaper.
- A non-sargable expression, implicit conversion, leading-wildcard search or mismatched composite key order can prevent an efficient seek.

## Clustered and nonclustered

- A clustered index defines the row order at the leaf level; the leaf pages are the table rows.
- A nonclustered index has its own key order and stores a locator to the base row.
- On a clustered table, the locator is the clustered key; on a heap it is a RID.
- A nonclustered seek followed by many key/RID lookups can become more expensive than a scan.

## Covering

- A covering index contains every column required for the predicate, join, ordering and returned projection.
- Key columns support navigation and ordering; included columns only supply payload at the leaf.
- Covering removes base-table lookups but increases storage and write cost.

## Caveats

- Plan quality depends on cardinality estimates and current statistics.
- The smallest useful index is often preferable to a wide index that attempts to cover every query.

## Nearby source labels

- usually more than just sorted
- index seek
- index scan
- table scan
- nonclustered
- clustered
- index example
- with clustered - seek directly
- !!!
- can create desc index
- decision guide
- lookup
- nonclustered indx
- slow writes
- covering index
- Narowwer index
- reasons for index scans
- wide table example
- narrow index example
- indexes need storage

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013
IU-014, IU-015, IU-016, IU-017, IU-018, IU-019, IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-034
IU-035, IU-036, IU-037, IU-061, IU-062, IU-063, IU-064, IU-065, IU-066, IU-067, IU-068, IU-069, IU-070
IU-071, IU-072, IU-073, IU-074, IU-075, IU-086
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
