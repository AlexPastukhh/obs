# Full combined final transcript — ef has conversion, value converte,comparer

Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
meaningful text elements: 14 / 14
unique embedded screenshots: 60 / 60
screenshot uses: 60 / 60
repeated placements retained: 0
regions: 5 / 5
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Value conversion, JSON storage and SQL JSON functions

A value converter can serialize a CLR value such as `List<string>` into one JSON string column. This simplifies storage but changes queryability, integrity and indexing trade-offs.

### Conversion model

- `HasConversion` converts between the model value and provider value.
- A list can serialize to JSON on write and deserialize on read.
- The database usually sees a string/JSON column rather than relational child rows.
- This is suitable for small denormalized values that are commonly read as a whole.

### Trade-offs

- The database cannot enforce item-level foreign keys inside a serialized list.
- General LINQ operations over the CLR collection do not automatically translate through an arbitrary converter.
- JSON querying depends on provider-specific SQL functions and translation support.
- Frequently queried values may need computed/extracted columns and indexes.

### Scalar JSON querying

- SQL Server `JSON_VALUE` extracts one scalar property or array index.
- A mapped DbFunction can translate a CLR helper into `JSON_VALUE(column, path)`.
- This works well for scalar filters, projections and ordering.
- Computed columns can expose a selected JSON scalar and make indexing straightforward.

### Array containment

- SQL Server `OPENJSON` turns a JSON array/object into a rowset.
- For array membership, `EXISTS` over `OPENJSON` is usually clearer than forcing a scalar `JSON_VALUE` function.
- `FromSqlInterpolated` safely parameterizes dynamic values when raw SQL is necessary.

### Representative pattern

```csharp
builder.Property(e => e.Tags)
    .HasConversion(
        value => JsonSerializer.Serialize(value, jsonOptions),
        json => JsonSerializer.Deserialize<List<string>>(json, jsonOptions)
                ?? new List<string>());
```

### Caveats

- A converter alone solves persistence, not change detection or query translation.
- Provider-native JSON column/features may offer better translation than a plain string column.

## R02 — Converters, mutable primitive collections and tracking pitfalls

Converters are straightforward for immutable scalars but mutable reference values such as lists need an explicit change-tracking strategy.

### Simple conversion examples

- Enums can be stored as strings for readability and schema resilience.
- A custom `ValueConverter` can parse and format a value object.
- A single-column value object such as money can map through one provider value.
- Encryption/decryption converters are possible but require careful key management and query expectations.

### Mutable-list problem

- EF's default comparison for a reference type can be reference equality.
- Mutating `Tags.Add(...)` leaves the same list reference, so EF may not detect the change.
- Replacing the whole list may be detected while in-place mutation is missed.
- A converter does not define equality, hash generation or snapshot copying.

### Alternatives

- Use a `ValueComparer` for a list stored in one column.
- Use immutable replacement semantics.
- Map elements as owned/entity rows when item-level queries, constraints or updates matter.
- Use provider-native primitive collections where supported.

### Global conventions

- A model-wide enum-to-string convention is concise but affects every enum and migration.
- Global conversion changes should be reviewed carefully against existing data.

### Representative pattern

```csharp
var converter = new ValueConverter<OrderStatus, string>(
    value => value.ToString(),
    value => Enum.Parse<OrderStatus>(value));

builder.Property(e => e.Status).HasConversion(converter);
```

### Caveats

- Converters should be deterministic and reversible.
- Encrypted values generally cannot be meaningfully filtered without a deliberate searchable-encryption design.

## R03 — ValueComparer equality, hashing and snapshots

`ValueComparer<T>` supplies the three operations EF needs for mutable converted values: equality, hash generation and snapshot creation.

### Three functions

- Equality answers whether the current and original values differ.
- Hash generation supports EF internal tracking structures.
- Snapshot creation produces an independent copy of the original value.
- For `List<string>`, `ToList()` creates a new collection while immutable strings can be shared.

### Sequence semantics

- `SequenceEqual` is correct when order and duplicate positions are meaningful.
- Hash values should be combined in the same order when equality is order-sensitive.
- Null handling must be consistent across equality, hash and snapshot functions.

### Set or multiset semantics

- For tags where order is irrelevant and duplicates are irrelevant, compare normalized sets.
- For multiset semantics, sort or count occurrences so duplicate multiplicity remains meaningful.
- The hash must reflect the same semantic model as equality.
- Normalization can use an ordinal or case-insensitive comparer according to domain rules.

### Effect on tracking

- In-place `Add` or `Remove` becomes detectable.
- Replacing the list also remains detectable.
- EF can compare the current value with a deep snapshot rather than the same reference.

### Representative pattern

```csharp
var comparer = new ValueComparer<List<string>>(
    (left, right) => left != null && right != null
        ? left.SequenceEqual(right)
        : left == right,
    value => value == null
        ? 0
        : value.Aggregate(0, (hash, item) =>
            HashCode.Combine(hash, item.GetHashCode())),
    value => value == null ? null! : value.ToList());

builder.Property(e => e.Tags)
    .HasConversion(converter)
    .Metadata.SetValueComparer(comparer);
```

### Caveats

- Equality and hash functions must agree; equal values must produce equal hashes.
- Large mutable collections can make snapshotting and comparison expensive.

## R04 — Querying primitive lists stored as JSON

Tracking a JSON-backed collection and querying inside it are separate problems. Querying requires SQL translation that understands JSON.

### Scalar extraction

- `JSON_VALUE` returns one scalar from a JSON object or array index.
- It is suitable for a known path such as `$.name` or `$[0]`.
- A mapped DbFunction can be used in LINQ when the provider function is scalar.
- For a converted property, `EF.Property<string>(entity, "Tags")` can expose the provider column in advanced query code.

### Array membership

- Searching whether a JSON array contains an arbitrary element is a rowset problem.
- `OPENJSON` expands the array and `EXISTS` checks whether any row matches.
- Mapping `OPENJSON` directly as a scalar DbFunction is awkward because it returns a table.
- Raw SQL or provider-native JSON translations are often simpler.

### Safe raw SQL

- `FromSqlInterpolated` parameterizes interpolated values.
- Do not concatenate user input into a raw SQL string.
- Keep entity projection/column names explicit and test provider SQL.

### Representative pattern

```csharp
var tag = "efcore";

var posts = await context.Posts
    .FromSqlInterpolated($@"
        SELECT p.*
        FROM Posts AS p
        WHERE EXISTS (
            SELECT 1
            FROM OPENJSON(p.Tags) AS j
            WHERE j.[value] = {tag}
        )")
    .ToListAsync();
```

### Caveats

- Raw SQL is provider-specific and should be covered by integration tests.
- When membership queries dominate, normalized rows or native collection support may be a better schema.

## R05 — OPENJSON rowsets, EXISTS and typed extraction

The final road explains how SQL Server expands JSON into rows and why `EXISTS` is the natural operator for containment queries.

### Line-by-line containment query

- The outer query returns rows from the entity table.
- `OPENJSON(p.Tags)` emits one row per JSON array element with key, value and type.
- The predicate compares `j.value` to a parameter.
- `EXISTS` stops after the first match and avoids duplicate outer rows.

### WITH clause

- A simple primitive array can use the default `value` column without `WITH`.
- `WITH` is useful for JSON objects, multiple properties and explicit SQL types.
- Typed extraction avoids lexical string comparison for numbers and dates.
- It can also make complex queries clearer and easier to optimize.

### JSON objects and numeric comparisons

- For an array of objects, define columns such as name and level in the `WITH` clause.
- For one JSON object, `OPENJSON` plus `WITH` can extract multiple fields in one pass.
- Map numeric values to numeric SQL types before comparing; do not compare numeric JSON as strings.

### Rule of thumb

- Primitive array contains one string: `OPENJSON` plus `EXISTS` without `WITH` is enough.
- Objects, multiple properties or typed comparisons: use `WITH`.
- Repeated high-volume predicates may justify computed columns, indexes or relational normalization.

### Representative pattern

```sql
SELECT p.*
FROM Posts AS p
WHERE EXISTS
(
    SELECT 1
    FROM OPENJSON(p.Tags) AS j
    WHERE j.[value] = @tag
);
```

### Caveats

- JSON rowset functions can be expensive without selective predicates or extracted indexes.
- Use query plans and measurements before committing to a denormalized JSON design.

## Regional source map

### R01

- transcript: `01-transcript-R01-value-conversion-json-storage-and-sql-json-functions.md`
- text elements: `3`
- screenshot uses: `10`
- unique screenshots: `10`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-converters-mutable-primitive-collections-and-tracking-pitfalls.md`
- text elements: `6`
- screenshot uses: `16`
- unique screenshots: `16`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-valuecomparer-equality-hashing-and-snapshots.md`
- text elements: `4`
- screenshot uses: `12`
- unique screenshots: `12`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-querying-primitive-lists-stored-as-json.md`
- text elements: `1`
- screenshot uses: `9`
- unique screenshots: `9`
- remaining: `0`

### R05

- transcript: `05-transcript-R05-openjson-rowsets-exists-and-typed-extraction.md`
- text elements: `0`
- screenshot uses: `13`
- unique screenshots: `13`
- remaining: `0`

## Exactness note

This file is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
provider-specific SQL and EF Core version details.
