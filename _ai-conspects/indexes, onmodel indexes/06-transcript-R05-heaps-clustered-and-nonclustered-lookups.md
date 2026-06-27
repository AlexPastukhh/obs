# Regional transcript — R05: Heaps, clustered and nonclustered primary-key trade-offs

Conspect: `indexes, onmodel indexes`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R05
image uses processed: 16 / 16
unique screenshots represented: 16
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

A SQL Server table can be a heap or clustered table. The choice changes the locator stored by nonclustered indexes and the cost of base-row access.

## Clustered primary key

- SQL Server commonly creates a primary key as clustered unless configured otherwise, but primary-key semantics and clustering are separate decisions.
- A clustered key should be narrow, stable and preferably non-changing because it is carried in nonclustered indexes.
- A nonclustered seek on a clustered table uses the clustered key for the base-row lookup.

## Nonclustered primary key

- A primary key can be nonclustered while another index supplies the clustered order.
- This is useful when the primary key is not the best physical ordering for dominant range queries.
- Uniqueness and entity identity remain intact regardless of clustering.

## Heap lookup

- A nonclustered index on a heap stores a RID pointing to file, page and slot.
- RID lookup is direct while the row remains in place.
- When a variable-length row grows and no longer fits, SQL Server may move it and leave a forwarding pointer.

## Lookup trade-offs

- A small number of key/RID lookups can be efficient.
- Thousands of random lookups may dominate the plan and make a scan cheaper.
- A covering index or different clustered key can remove repeated lookup cost.

## Caveats

- A clustered key that changes is especially expensive because nonclustered row locators must be updated.
- Heap behavior discussed here is SQL Server specific.

## Nearby source labels

- NONCLUSTERED PK
- FILTERED INDEX
- CLUSTERED PK
- ATTRIBUTE
- HEAP
- HEAP DRAWBACKS
- SIMPLE GUIDLINE,
- more over time
- VS HEAP LOOKUP
- FORWARDED RECORDS
- staging, load fast,then
- add indexes
- SENSE
- index
- example table and
- why filtered index
- good usecases
- !!!
- tradeoffs
- ef core with included cols
- ef core unique filtered

## Covered screenshot uses

```text
IU-092, IU-094, IU-096, IU-097, IU-100, IU-101, IU-102, IU-103, IU-108, IU-109, IU-123, IU-126, IU-128
IU-129, IU-130, IU-132
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
