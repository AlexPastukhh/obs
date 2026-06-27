# Regional transcript — R04: EF Core index configuration

Conspect: `indexes, onmodel indexes`  
Generated: 2026-06-27 06:00:00 UTC

## Coverage

```text
region: R04
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

EF Core stores index intent in the model and migrations translate that metadata to provider-specific database objects.

## Basic and composite indexes

- `HasIndex(e => e.Email)` configures a single-column index.
- `HasIndex(e => new { e.TenantId, e.CreatedAt })` configures a composite key in the declared property order.
- Calling `HasIndex` with the same property set continues configuration of the same model index rather than creating arbitrary duplicates.

## Unique and descending

- `IsUnique()` creates a uniqueness constraint through an index when supported by the provider.
- `IsDescending()` or per-column descending flags describe sort direction for migrations and query matching.
- Uniqueness and null behavior remain provider specific, especially when several null values are allowed.

## Included and covering columns

- SQL Server's provider extension `IncludeProperties` adds leaf payload columns without making them key columns.
- Included columns cannot satisfy key-range navigation or ordering in the same way as key columns.
- Cover only proven projections because included columns increase write volume and leaf width.

## Attributes and fluent configuration

- `IndexAttribute` is convenient for simple static definitions.
- Fluent configuration is clearer for provider-specific filters, included columns, clustered choices and conditional model building.
- Generated migrations should be reviewed to confirm the intended SQL object.

## Caveats

- Provider extension methods are not portable across databases.
- Model metadata does not tune fill factor, online operations or operational maintenance automatically.

## Nearby source labels

- COMPOSITE
- BASIC NONCLUSTERED
- UNIQUE INDEX
- COVERING/INCLUDED COLS
- CLUSTERED PK
- NONCLUSTERED PK
- DESCENDING ORDER

## Covered screenshot uses

```text
IU-087, IU-088, IU-089, IU-090, IU-091, IU-093
```

## Audit note

Every listed placement is closed in the final image-use ledger.
Repeated placements remain separate coverage units.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
