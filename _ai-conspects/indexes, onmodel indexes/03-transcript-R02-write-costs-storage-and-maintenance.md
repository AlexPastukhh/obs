# Regional transcript — R02: Write costs, storage and index maintenance

Conspect: `indexes, onmodel indexes`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R02
image uses processed: 15 / 15
unique screenshots represented: 15
repeated placements retained: 1
remaining image uses: 0
```

## Semantic transcript

Every additional index accelerates selected reads by adding persistent structures that must be maintained during writes.

## Insert

- An insert updates the base table and every applicable nonclustered index.
- Random keys can cause page splits, fragmentation and scattered writes.
- Sequential clustered keys reduce random insertion pressure but can create a last-page hotspot under extreme concurrency.

## Delete

- A delete removes the base row and corresponding entries from every index.
- Ghost records and background cleanup are provider implementation details; logical deletion still adds work to the transaction.

## Update

- Changing an indexed key requires removing and reinserting the index entry.
- Changing an included column also updates the nonclustered leaf row.
- Changing a non-indexed column can still affect indexes when the column is included or when row movement changes a heap RID.

## Storage and maintenance

- Indexes consume disk, buffer-cache space, backup volume and maintenance time.
- Statistics, rebuild/reorganize operations and fragmentation management should be driven by measurements rather than a fixed ritual.
- Unused and overlapping indexes should be reviewed because write cost accumulates even when a read benefit is rare.

## Caveats

- A large index count can make write-heavy systems slower even when individual indexes appear reasonable.
- Removing an index requires workload evidence because infrequent critical queries may still depend on it.

## Nearby source labels

- slow writes
- indexes need storage
- order by, can create
- desc index, but its not
- indexes help join
- needed
- can create desc index
- decision guide
- updating indexed column
- updating non indexed column
- included columns, need to update index
- indexes help where
- insert
- delete
- updated during writes
- when indexes are getting

## Covered screenshot uses

```text
IU-054, IU-055, IU-056, IU-057, IU-058, IU-059, IU-060, IU-077, IU-079, IU-080, IU-081, IU-082, IU-083
IU-084, IU-085
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
