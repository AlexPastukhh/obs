# Regional transcript — R02: Converters, mutable primitive collections and tracking pitfalls

Conspect: `ef has conversion, value converte,comparer`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 16 / 16
unique screenshots represented: 16
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Converters are straightforward for immutable scalars but mutable reference values such as lists need an explicit change-tracking strategy.

## Simple conversion examples

- Enums can be stored as strings for readability and schema resilience.
- A custom `ValueConverter` can parse and format a value object.
- A single-column value object such as money can map through one provider value.
- Encryption/decryption converters are possible but require careful key management and query expectations.

## Mutable-list problem

- EF's default comparison for a reference type can be reference equality.
- Mutating `Tags.Add(...)` leaves the same list reference, so EF may not detect the change.
- Replacing the whole list may be detected while in-place mutation is missed.
- A converter does not define equality, hash generation or snapshot copying.

## Alternatives

- Use a `ValueComparer` for a list stored in one column.
- Use immutable replacement semantics.
- Map elements as owned/entity rows when item-level queries, constraints or updates matter.
- Use provider-native primitive collections where supported.

## Global conventions

- A model-wide enum-to-string convention is concise but affects every enum and migration.
- Global conversion changes should be reviewed carefully against existing data.

## Representative pattern

```csharp
var converter = new ValueConverter<OrderStatus, string>(
    value => value.ToString(),
    value => Enum.Parse<OrderStatus>(value));

builder.Property(e => e.Status).HasConversion(converter);
```

## Caveats

- Converters should be deterministic and reversible.
- Encrypted values generally cannot be meaningfully filtered without a deliberate searchable-encryption design.

## Source labels

- `SO YOU NEED VALUE COMPARER TO TRACK CHANGES FOR EVERYTHING THAT IS`
- `REFERENCE TYPE AND NOT ENTITY ITSELF`
- `SEP REPEAT`
- `SOME EXAMPLES OF POTENTIAL PROBLEMS WITH TRACKING CHANGES WHEN MODIFYING COLLECTION`
- `ETC`
- `JUST REPEAT`

## Covered text elements

```text
T-002, T-003, T-005, T-006, T-007, T-008
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-013, IU-014, IU-015, IU-016, IU-017, IU-018
IU-019, IU-020, IU-021
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
