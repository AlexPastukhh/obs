# Regional transcript — R03: Owned collections, shadow keys and relational mapping

Conspect: `owned entity`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 8 / 8
unique screenshots represented: 8
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

An owned collection represents value objects inside an aggregate, but a relational database still requires a dependent table, foreign key and key for every row.

## Domain model

- Keep a private list on the aggregate root and expose a read-only collection.
- Add/remove children through aggregate methods that enforce invariants.
- The element can be immutable/value-like and define value equality.

## Ownership configuration

- `OwnsMany` establishes ownership automatically; `WithOwner` is needed mainly when customizing the relationship or foreign key.
- Map collection rows to a dedicated table.
- Configure the owner foreign key explicitly when schema clarity matters.
- A composite key such as `(OrderId, LineItemId)` or a shadow surrogate key can identify rows.

## Shadow key details

- String-based `Property<T>("Id")` creates/configures a shadow property when no CLR member exists.
- `ValueGeneratedOnAdd` asks the provider to generate values for that shadow identity.
- Provider-specific generation and composite-key behavior must be reflected in the migration.

## Mental model

- The child has no independent aggregate lifecycle.
- Deleting the owner deletes the owned rows.
- A separate table is an implementation detail required by relational storage, not proof of an independent entity.

## Representative pattern

```csharp
modelBuilder.Entity<Order>(builder =>
{
    builder.OwnsMany(o => o.LineItems, owned =>
    {
        owned.ToTable("OrderLineItems");
        owned.WithOwner().HasForeignKey("OrderId");

        owned.Property<int>("Id").ValueGeneratedOnAdd();
        owned.HasKey("OrderId", "Id");

        owned.Property(p => p.ProductCode).HasMaxLength(64);
        owned.Property(p => p.UnitPrice).HasPrecision(18, 2);
    });
});
```

## Caveats

- A mutable owned element can still require careful change tracking and equality decisions.
- Schema identity and domain identity are separate concepts.

## Source labels

- `OWNED COLLECTIONS(COLLECTIONS OF VALUE OBJECTS)`
- `we have this as`
- `owned entity so`
- `ef can map owners`
- `id to this shadow`
- `orderid`

## Covered text elements

```text
T-004, T-005, T-006, T-007, T-008, T-009
```

## Covered screenshot uses

```text
IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-014, IU-015
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
