# Regional transcript — R04: Nested owned types and detecting optional outer values

Conspect: `owned entity`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 8 / 8
image uses processed: 14 / 14
unique screenshots represented: 14
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Nested owned graphs are difficult with same-table optional outer objects because EF needs a reliable way to decide whether the outer object exists.

## Desired invariant

- The outer owned object may be null.
- When the outer object exists, an inner owned object must exist.
- Deleting the owner deletes the entire nested graph.

## Why table splitting is ambiguous

- All columns for outer and inner objects may live on the owner row.
- If every outer scalar is nullable, EF has no unambiguous existence marker.
- Inner non-null columns can conflict with the requirement that the whole outer object may be absent.
- Column-name prefixes alone do not solve existence detection.

## Preferred same-table solution

- Add a required scalar property to the outer owned type, such as a recipient name or explicit existence discriminator.
- Map inner properties as required when the outer object exists.
- Optionally add a database check constraint to enforce valid combinations.
- Use clear column names for nested paths.

## Separate-table alternative

- Map the optional outer owned type to its own table.
- Row absence naturally means the outer object is null.
- When the row exists, inner columns can be NOT NULL.
- This is often simpler for EF, migrations and human database readers.

## Representative pattern

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

## Caveats

- Exact support and warnings differ across EF Core versions.
- Generate and inspect the migration to confirm nullability matches the domain rule.

## Source labels

- `nested owned types`
- `outer optional`
- `but inner required`
- `ef needs some indication`
- `to know if outer exists`
- `add required prop to outer`
- `map outer to a table`
- `can add check constraint`

## Covered text elements

```text
T-014, T-015, T-016, T-019, T-020, T-021, T-022, T-023
```

## Covered screenshot uses

```text
IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032, IU-033, IU-034, IU-035
IU-036
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
