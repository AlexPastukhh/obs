# Full combined final transcript — owned entity

Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
meaningful text elements: 23 / 23
unique embedded screenshots: 40 / 40
screenshot uses: 40 / 40
repeated placements retained: 0
regions: 5 / 5
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Owned references, owned collections and loading behavior

Owned types model dependent value-like objects that belong to an owner. `OwnsOne` is commonly table-split with the owner, while `OwnsMany` normally uses a separate dependent table.

### Owned reference

- An `OwnsOne` value is conceptually part of the owner and has no independent DbSet/lifecycle.
- With table splitting, owned scalar columns are read in the same owner query.
- No `Include` is required merely to retrieve inline owned columns.
- Projection may still be preferable when only part of the owner is needed.

### Owned collection

- `OwnsMany` elements are rows in a dependent table with a foreign key to the owner.
- Fetch them with `Include`, explicit loading or projection.
- EF may use a joined query or split query depending on query configuration.
- Large owned collections should be projected or loaded intentionally to avoid unnecessary graph materialization.

### Query and tracking

- Owned types are normally queried through their owner rather than as independent aggregate roots.
- `AsNoTracking` plus projection reduces overhead for read-only operations.
- Shadow properties can be accessed with `EF.Property` when no CLR member exists.

### Representative pattern

```csharp
var orders = await context.Orders
    .Include(o => o.LineItems)
    .AsSplitQuery()
    .ToListAsync();
```

### Caveats

- An owned collection is value-like in the domain but still needs relational keys and rows.
- Do not use lazy loading to hide when a large owned collection is fetched.

## R02 — Optional owned references and explicit requiredness

C# nullable annotations and EF mapping requiredness are different systems. Configure optional owned navigations explicitly when all-null columns should materialize as a null value object.

### Core semantics

- An owned type is a dependent object attached to one owner.
- It is saved and deleted with the owner and has no independent lifecycle.
- Inline owned columns are typically prefixed or explicitly named.
- Owned references can also be mapped to a separate table while remaining dependent.

### Nullability behavior

- In older EF Core behavior, an inline owned navigation could be treated as required and an instance materialized even when every column was null.
- In newer configurations, mark the owned navigation optional with `Navigation(...).IsRequired(false)` when null is meaningful.
- The nullable `FullName?` annotation alone does not completely define EF database/materialization behavior.
- Configure owned scalar properties and the navigation deliberately.

### Backing field pattern

- Map the owned navigation to a private backing field when the domain model requires encapsulation.
- Expose a read-only or nullable public value object.
- Use constructor/materialization support appropriate to the EF Core version.

### Representative pattern

```csharp
modelBuilder.Entity<User>(builder =>
{
    builder.OwnsOne(u => u.FullName, owned =>
    {
        owned.Property(p => p.FirstName)
            .HasColumnName("FirstName")
            .HasMaxLength(100)
            .IsRequired(false);

        owned.Property(p => p.LastName)
            .HasColumnName("LastName")
            .HasMaxLength(100)
            .IsRequired(false);
    });

    builder.Navigation(u => u.FullName).IsRequired(false);
});
```

### Caveats

- Required inner properties do not necessarily mean database columns can always be NOT NULL when the entire owned object is optional.
- Version-specific owned/complex-type behavior should be validated with a migration and materialization test.

## R03 — Owned collections, shadow keys and relational mapping

An owned collection represents value objects inside an aggregate, but a relational database still requires a dependent table, foreign key and key for every row.

### Domain model

- Keep a private list on the aggregate root and expose a read-only collection.
- Add/remove children through aggregate methods that enforce invariants.
- The element can be immutable/value-like and define value equality.

### Ownership configuration

- `OwnsMany` establishes ownership automatically; `WithOwner` is needed mainly when customizing the relationship or foreign key.
- Map collection rows to a dedicated table.
- Configure the owner foreign key explicitly when schema clarity matters.
- A composite key such as `(OrderId, LineItemId)` or a shadow surrogate key can identify rows.

### Shadow key details

- String-based `Property<T>("Id")` creates/configures a shadow property when no CLR member exists.
- `ValueGeneratedOnAdd` asks the provider to generate values for that shadow identity.
- Provider-specific generation and composite-key behavior must be reflected in the migration.

### Mental model

- The child has no independent aggregate lifecycle.
- Deleting the owner deletes the owned rows.
- A separate table is an implementation detail required by relational storage, not proof of an independent entity.

### Representative pattern

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

### Caveats

- A mutable owned element can still require careful change tracking and equality decisions.
- Schema identity and domain identity are separate concepts.

## R04 — Nested owned types and detecting optional outer values

Nested owned graphs are difficult with same-table optional outer objects because EF needs a reliable way to decide whether the outer object exists.

### Desired invariant

- The outer owned object may be null.
- When the outer object exists, an inner owned object must exist.
- Deleting the owner deletes the entire nested graph.

### Why table splitting is ambiguous

- All columns for outer and inner objects may live on the owner row.
- If every outer scalar is nullable, EF has no unambiguous existence marker.
- Inner non-null columns can conflict with the requirement that the whole outer object may be absent.
- Column-name prefixes alone do not solve existence detection.

### Preferred same-table solution

- Add a required scalar property to the outer owned type, such as a recipient name or explicit existence discriminator.
- Map inner properties as required when the outer object exists.
- Optionally add a database check constraint to enforce valid combinations.
- Use clear column names for nested paths.

### Separate-table alternative

- Map the optional outer owned type to its own table.
- Row absence naturally means the outer object is null.
- When the row exists, inner columns can be NOT NULL.
- This is often simpler for EF, migrations and human database readers.

### Representative pattern

```csharp
builder.OwnsOne(o => o.ShippingInfo, shipping =>
{
    shipping.Property(p => p.RecipientName).IsRequired();

    shipping.OwnsOne(p => p.Address, address =>
    {
        address.Property(p => p.Street).IsRequired();
        address.Property(p => p.City).IsRequired();
    });
});

builder.Navigation(o => o.ShippingInfo).IsRequired(false);
```

### Caveats

- Exact support and warnings differ across EF Core versions.
- Generate and inspect the migration to confirm nullability matches the domain rule.

## R05 — Required members inside optional owned or complex values

`IsRequired` on an inner property means required when the containing owned/complex object exists; it does not always imply a globally NOT NULL column when the entire containing value is optional.

### Same-table storage

- The owner row may exist while the optional address is null.
- Therefore address columns often remain nullable in the database.
- The model-level rule is conditional: street is required if address exists.
- A database check constraint can enforce all-or-none or conditional column combinations.

### Separate-table storage

- No dependent row means the optional value is absent.
- A present row means the value exists.
- Columns inside that row can then be genuinely NOT NULL.
- This maps conditional existence more naturally.

### Practical validation

- Use domain constructors/invariants in addition to EF metadata.
- Inspect migrations rather than assuming `IsRequired` always creates NOT NULL.
- Test null materialization and invalid database states.

### Representative pattern

```csharp
owned.ToTable("CustomerAddresses");
owned.Property(a => a.Street).IsRequired();
owned.Property(a => a.City).IsRequired();

customer.Navigation(c => c.Address).IsRequired(false);
```

### Caveats

- Owned and complex types are related concepts but have different tracking and mapping semantics depending on EF Core version.
- Database constraints are the final authority for states written outside EF.

## Regional source map

### R01

- transcript: `01-transcript-R01-owned-references-owned-collections-and-loading-behavior.md`
- text elements: `1`
- screenshot uses: `7`
- unique screenshots: `7`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-optional-owned-references-and-explicit-requiredness.md`
- text elements: `6`
- screenshot uses: `7`
- unique screenshots: `7`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-owned-collections-shadow-keys-and-relational-mapping.md`
- text elements: `6`
- screenshot uses: `8`
- unique screenshots: `8`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-nested-owned-types-and-detecting-optional-outer-values.md`
- text elements: `8`
- screenshot uses: `14`
- unique screenshots: `14`
- remaining: `0`

### R05

- transcript: `05-transcript-R05-required-members-inside-optional-owned-or-complex-values.md`
- text elements: `2`
- screenshot uses: `4`
- unique screenshots: `4`
- remaining: `0`

## Exactness note

This file is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
provider-specific SQL and EF Core version details.
