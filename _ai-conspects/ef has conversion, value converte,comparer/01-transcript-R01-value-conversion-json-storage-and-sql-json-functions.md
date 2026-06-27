# Regional transcript — R01: Value conversion, JSON storage and SQL JSON functions

Conspect: `ef has conversion, value converte,comparer`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 10 / 10
unique screenshots represented: 10
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A value converter can serialize a CLR value such as `List<string>` into one JSON string column. This simplifies storage but changes queryability, integrity and indexing trade-offs.

## Conversion model

- `HasConversion` converts between the model value and provider value.
- A list can serialize to JSON on write and deserialize on read.
- The database usually sees a string/JSON column rather than relational child rows.
- This is suitable for small denormalized values that are commonly read as a whole.

## Trade-offs

- The database cannot enforce item-level foreign keys inside a serialized list.
- General LINQ operations over the CLR collection do not automatically translate through an arbitrary converter.
- JSON querying depends on provider-specific SQL functions and translation support.
- Frequently queried values may need computed/extracted columns and indexes.

## Scalar JSON querying

- SQL Server `JSON_VALUE` extracts one scalar property or array index.
- A mapped DbFunction can translate a CLR helper into `JSON_VALUE(column, path)`.
- This works well for scalar filters, projections and ordering.
- Computed columns can expose a selected JSON scalar and make indexing straightforward.

## Array containment

- SQL Server `OPENJSON` turns a JSON array/object into a rowset.
- For array membership, `EXISTS` over `OPENJSON` is usually clearer than forcing a scalar `JSON_VALUE` function.
- `FromSqlInterpolated` safely parameterizes dynamic values when raw SQL is necessary.

## Representative pattern

```csharp
builder.Property(e => e.Tags)
    .HasConversion(
        value => JsonSerializer.Serialize(value, jsonOptions),
        json => JsonSerializer.Deserialize<List<string>>(json, jsonOptions)
                ?? new List<string>());
```

## Caveats

- A converter alone solves persistence, not change detection or query translation.
- Provider-native JSON column/features may offer better translation than a plain string column.

## Source labels

- `TRANSLATING INTO JSON AND STORE IN DB + JSON FUNCTIONS`
- `!!!`
- `!!! ADD FUNC TO`

## Covered text elements

```text
T-001, T-009, T-010
```

## Covered screenshot uses

```text
IU-008, IU-009, IU-010, IU-011, IU-012, IU-022, IU-023, IU-024, IU-025, IU-026
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
