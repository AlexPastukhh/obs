# Regional transcript — R06: Filtered indexes, included columns and provider-specific mapping

Conspect: `indexes, onmodel indexes`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R06
image uses processed: 18 / 18
unique screenshots represented: 18
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Filtered and covering indexes make a small subset or projection efficient, but only when the query predicate and provider metadata align.

## Filtered indexes

- A filtered index stores only rows satisfying a predicate, such as active rows or non-null values.
- It can be much smaller and more selective than a full-table index.
- Queries must imply the filter for the optimizer to use it safely.
- Parameterization and null semantics can affect whether the filter is recognized.

## Unique filtered indexes

- A common SQL Server pattern enforces uniqueness only for non-null or active rows.
- The filter is part of the database contract and must be represented in migrations.
- Application validation is still useful for user-friendly errors, but the database remains the race-safe authority.

## EF Core provider mapping

- SQL Server's `HasFilter` configures the index predicate.
- `IncludeProperties` configures included leaf columns.
- `IsClustered` controls clustered versus nonclustered placement when the provider supports it.
- Provider-specific annotations should be isolated so a future provider change is visible.

## Attributes

- Attributes can express common property lists, uniqueness and sort directions.
- They are less suitable for filtered SQL, included columns and complex provider-specific choices.

## Caveats

- Filtered-index SQL syntax and null behavior differ across providers.
- A covering index should not become a duplicate copy of most of the table.

## Nearby source labels

- ATTRIBUTE
- FILTERED INDEX
- index
- HEAP
- make sense when heap has
- FORWARDED RECORDS
- more over time
- many indexes to update
- ,so it doesnt update rid
- add indexes
- staging, load fast,then
- small temp table
- append only table
- minimum querying
- example table and
- why filtered index
- good usecases
- !!!
- ef core unique filtered
- ef core with included cols
- tradeoffs

## Covered screenshot uses

```text
IU-095, IU-098, IU-099, IU-104, IU-105, IU-106, IU-110, IU-111, IU-112, IU-116, IU-117, IU-118, IU-124
IU-125, IU-127, IU-131, IU-133, IU-134
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
