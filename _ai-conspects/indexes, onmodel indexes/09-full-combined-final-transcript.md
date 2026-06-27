# Full combined final transcript — indexes, onmodel indexes

Generated: 2026-06-27 06:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 80 / 80
unique embedded screenshots: 133 / 133
screenshot uses on canvas: 134 / 134
repeated screenshot placements retained: 1
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 What an index is

An index is a persistent access structure, normally a B-tree, whose key order
lets the database locate ranges without reading every row. Root and intermediate
pages direct navigation; leaf pages contain keys plus row locators or table
rows.

The optimizer chooses seeks, scans and lookups from estimated total cost. A seek
that returns most of a table and performs many random lookups can be slower than
a sequential scan. A scan of a narrow nonclustered index can be cheaper than a
scan of a wide clustered table.

## 03 Clustered, nonclustered and heap storage

A clustered index stores complete table rows at the leaf level and defines the
table's physical key order. A table has at most one clustered index.

A nonclustered index stores its own keys and a base-row locator. On a clustered
table, the locator is the clustered key. On a heap, the locator is a RID. The
clustered key therefore affects the size of every nonclustered index and should
usually be narrow, stable and non-changing.

A heap has no clustered key order. RID lookups are direct while a row stays in
place, but a growing variable-length row can be moved and leave a forwarding
pointer, adding an extra I/O hop.

Primary-key and clustered semantics are independent. SQL Server commonly makes
a primary key clustered by default, but a primary key may be nonclustered and a
different index may define the clustered order.

## 04 Seeks, scans and lookups

An index seek navigates to a key or range. An index scan reads the whole index
or a large section. A table scan reads a heap or clustered structure.

Common reasons a useful-looking predicate does not seek efficiently include:

- no index with the predicate's leading key;
- a non-sargable expression around the indexed column;
- an implicit data-type conversion;
- a leading-wildcard search;
- a predicate that returns a large fraction of the table;
- stale or inaccurate cardinality estimates.

A key/RID lookup fetches missing columns from the base table after a
nonclustered access. A small number of lookups is normal. Large numbers of
random lookups often indicate that a covering index, a different clustered key
or a scan would be cheaper.

## 05 Composite index order

Composite indexes support their leftmost key prefixes. For a recurring query
with equality predicates followed by a range or ordering predicate, equality
columns commonly precede the range/order column:

```text
(TenantId, Status, CreatedAt)
```

This supports seeks by `TenantId`, by `TenantId + Status`, and then a range on
`CreatedAt`. A query filtering only by `CreatedAt` cannot normally seek this
index efficiently.

Column order must reflect real workload predicates, joins and sorting rather
than a universal selectivity rule. Separate single-column indexes may be
combined by the optimizer, but intersection adds work and often does not
replace a purpose-built composite index.

## 06 WHERE, JOIN, ORDER BY and GROUP BY

Indexes help `WHERE` by narrowing candidate rows and help joins by making join
keys searchable. Both join inputs may need suitable indexes depending on join
strategy and row counts.

An index can satisfy `ORDER BY` without a separate sort when its key sequence
matches the requested order. A uniformly reversed order can often be produced
by scanning backward. Mixed ascending/descending orders may need explicit key
directions.

Rows arriving ordered by grouping keys can also help `GROUP BY`, but aggregation
cost and selectivity remain part of the plan.

## 07 Covering and included columns

A covering index supplies every column required by the query. Key columns
support navigation and ordering. Included columns are leaf payload: they can
remove base-table lookups but do not act as key columns for range navigation or
sort order.

Covering is a query-specific optimization, not a goal to copy most table
columns into every index. Wider leaves consume storage, buffer cache and write
bandwidth.

## 08 Unique, filtered and descending indexes

A unique index enforces uniqueness in the database. Null semantics are
provider-specific.

A filtered index stores only rows satisfying a predicate, such as active rows
or non-null values. It is smaller and often more selective, but a query must
imply the filter for safe use.

Descending metadata is useful for matching mixed-direction sorts. For a
uniformly reversed ordering, an engine may scan an index backward without a
second physical index.

## 09 Write and storage costs

Each insert, delete and relevant update maintains the base table plus every
applicable index. Updating an index key removes and reinserts an entry.
Updating an included column changes the index leaf. Random inserts can split
pages; many indexes increase transaction log, backup, cache and maintenance
costs.

Index design therefore balances read benefit against:

- insert/update/delete latency;
- disk and memory;
- statistics and maintenance;
- page splits and fragmentation;
- operational complexity.

Unused and overlapping indexes should be reviewed with workload evidence.

## 10 EF Core configuration

Typical model configuration:

```csharp
modelBuilder.Entity<Order>()
    .HasIndex(x => new { x.TenantId, x.CreatedAt });

modelBuilder.Entity<User>()
    .HasIndex(x => x.NormalizedEmail)
    .IsUnique();

modelBuilder.Entity<Order>()
    .HasIndex(x => new { x.TenantId, x.Status })
    .IncludeProperties(x => new { x.Total, x.CreatedAt });

modelBuilder.Entity<User>()
    .HasIndex(x => x.Email)
    .HasFilter("[Email] IS NOT NULL");
```

`IncludeProperties`, `HasFilter` and clustered configuration are
provider-specific SQL Server concerns. Attributes are convenient for simple
definitions; fluent configuration is clearer for filters, included properties
and provider choices. Generated migrations must be reviewed.

## 11 When heaps make sense

Heaps can be deliberate for:

- staging tables loaded before indexes are built;
- small temporary/intermediate tables;
- append-oriented data with minimal updates and querying;
- short-lived ETL structures.

They are not an automatic fast-write default. Forwarded records, RID lookups
and downstream query patterns can make a clustered design better.

## 12 Decision guide

1. List dominant filters, joins, sorting and projections.
2. Select narrow leading keys that match those patterns.
3. Add included columns only to remove proven expensive lookups.
4. Keep clustered keys narrow and stable.
5. Measure write cost and actual execution plans.
6. Remove or consolidate overlapping indexes only after checking critical
   workloads.
7. Revisit the design as data size and query distribution change.

## Regional source map

### R01 — Index foundations: seeks, scans, clustered, nonclustered and covering

Coverage: `45` screenshot uses, `45` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `02-transcript-R01-index-foundations-seeks-scans-and-covering.md`.

### R02 — Write costs, storage and index maintenance

Coverage: `15` screenshot uses, `15` unique screenshots, `1` repeated placements, `0` remaining. Detailed file: `03-transcript-R02-write-costs-storage-and-maintenance.md`.

### R03 — WHERE, JOIN, ORDER BY, GROUP BY and composite-column ordering

Coverage: `26` screenshot uses, `26` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `04-transcript-R03-query-patterns-and-composite-column-order.md`.

### R04 — EF Core index configuration

Coverage: `6` screenshot uses, `6` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `05-transcript-R04-ef-core-index-configuration.md`.

### R05 — Heaps, clustered and nonclustered primary-key trade-offs

Coverage: `16` screenshot uses, `16` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `06-transcript-R05-heaps-clustered-and-nonclustered-lookups.md`.

### R06 — Filtered indexes, included columns and provider-specific mapping

Coverage: `18` screenshot uses, `18` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `07-transcript-R06-filtered-included-and-provider-specific-indexes.md`.

### R07 — Heap use cases, forwarded records and operational guidelines

Coverage: `8` screenshot uses, `8` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `08-transcript-R07-heap-use-cases-and-operational-guidelines.md`.

## Exactness note

This document is the authoritative integrated semantic transcript. The complete
SVG and extracted screenshot files remain authoritative for exact punctuation,
provider-specific syntax and version-sensitive API spellings.
