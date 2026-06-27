# Regional transcript — R04: Querying primitive lists stored as JSON

Conspect: `ef has conversion, value converte,comparer`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Tracking a JSON-backed collection and querying inside it are separate problems. Querying requires SQL translation that understands JSON.

## Scalar extraction

- `JSON_VALUE` returns one scalar from a JSON object or array index.
- It is suitable for a known path such as `$.name` or `$[0]`.
- A mapped DbFunction can be used in LINQ when the provider function is scalar.
- For a converted property, `EF.Property<string>(entity, "Tags")` can expose the provider column in advanced query code.

## Array membership

- Searching whether a JSON array contains an arbitrary element is a rowset problem.
- `OPENJSON` expands the array and `EXISTS` checks whether any row matches.
- Mapping `OPENJSON` directly as a scalar DbFunction is awkward because it returns a table.
- Raw SQL or provider-native JSON translations are often simpler.

## Safe raw SQL

- `FromSqlInterpolated` parameterizes interpolated values.
- Do not concatenate user input into a raw SQL string.
- Keep entity projection/column names explicit and test provider SQL.

## Representative pattern

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

## Caveats

- Raw SQL is provider-specific and should be covered by integration tests.
- When membership queries dominate, normalized rows or native collection support may be a better schema.

## Source labels

- `QUERING WITH LIST OF PRIMITIVES`

## Covered text elements

```text
T-014
```

## Covered screenshot uses

```text
IU-039, IU-040, IU-041, IU-042, IU-043, IU-044, IU-045, IU-046, IU-047
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
