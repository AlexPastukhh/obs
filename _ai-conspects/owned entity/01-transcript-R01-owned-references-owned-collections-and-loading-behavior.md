# Regional transcript — R01: Owned references, owned collections and loading behavior

Conspect: `owned entity`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Owned types model dependent value-like objects that belong to an owner. `OwnsOne` is commonly table-split with the owner, while `OwnsMany` normally uses a separate dependent table.

## Owned reference

- An `OwnsOne` value is conceptually part of the owner and has no independent DbSet/lifecycle.
- With table splitting, owned scalar columns are read in the same owner query.
- No `Include` is required merely to retrieve inline owned columns.
- Projection may still be preferable when only part of the owner is needed.

## Owned collection

- `OwnsMany` elements are rows in a dependent table with a foreign key to the owner.
- Fetch them with `Include`, explicit loading or projection.
- EF may use a joined query or split query depending on query configuration.
- Large owned collections should be projected or loaded intentionally to avoid unnecessary graph materialization.

## Query and tracking

- Owned types are normally queried through their owner rather than as independent aggregate roots.
- `AsNoTracking` plus projection reduces overhead for read-only operations.
- Shadow properties can be accessed with `EF.Property` when no CLR member exists.

## Representative pattern

```csharp
var orders = await context.Orders
    .Include(o => o.LineItems)
    .AsSplitQuery()
    .ToListAsync();
```

## Caveats

- An owned collection is value-like in the domain but still needs relational keys and rows.
- Do not use lazy loading to hide when a large owned collection is fetched.

## Source labels

- `LOADING<- OWNED ENTITY --> COLLECTIONS`

## Covered text elements

```text
T-010
```

## Covered screenshot uses

```text
IU-016, IU-017, IU-018, IU-019, IU-020, IU-021, IU-022
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
