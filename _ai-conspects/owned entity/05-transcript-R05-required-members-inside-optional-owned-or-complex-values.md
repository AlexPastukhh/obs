# Regional transcript — R05: Required members inside optional owned or complex values

Conspect: `owned entity`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`IsRequired` on an inner property means required when the containing owned/complex object exists; it does not always imply a globally NOT NULL column when the entire containing value is optional.

## Same-table storage

- The owner row may exist while the optional address is null.
- Therefore address columns often remain nullable in the database.
- The model-level rule is conditional: street is required if address exists.
- A database check constraint can enforce all-or-none or conditional column combinations.

## Separate-table storage

- No dependent row means the optional value is absent.
- A present row means the value exists.
- Columns inside that row can then be genuinely NOT NULL.
- This maps conditional existence more naturally.

## Practical validation

- Use domain constructors/invariants in addition to EF metadata.
- Inspect migrations rather than assuming `IsRequired` always creates NOT NULL.
- Test null materialization and invalid database states.

## Representative pattern

```csharp
owned.ToTable("CustomerAddresses");
owned.Property(a => a.Street).IsRequired();
owned.Property(a => a.City).IsRequired();

customer.Navigation(c => c.Address).IsRequired(false);
```

## Caveats

- Owned and complex types are related concepts but have different tracking and mapping semantics depending on EF Core version.
- Database constraints are the final authority for states written outside EF.

## Source labels

- `about is required`
- `inside owned or complex`

## Covered text elements

```text
T-017, T-018
```

## Covered screenshot uses

```text
IU-037, IU-038, IU-039, IU-040
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
