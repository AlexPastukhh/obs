# Final semantic transcript — SQL Server `OPENJSON`

Authoritative source: `source/openjson.svg`  
Coverage: **27 unique screenshots / 27 placements + 14 native SVG labels**

---

# R01 — default schema and explicit `WITH`

`OPENJSON` converts JSON text into a relational rowset.

## Default schema

Without a `WITH` clause:

```sql
SELECT *
FROM OPENJSON(@json);
```

SQL Server returns:

```text
key
value
type
```

For a JSON array:

```json
[
  { "name": "Alice" },
  { "name": "Bob" }
]
```

the default rows identify array indexes and expose each object as JSON text in `value`.

For a JSON object:

```json
{
  "name": "Alice",
  "level": 2
}
```

the default rows represent object properties.

The `type` code identifies the JSON value category.

## Explicit schema with `WITH`

Use `WITH` to project typed columns:

```sql
SELECT *
FROM OPENJSON(@json)
WITH
(
    id    int           '$.id',
    name  nvarchar(100) '$.name',
    level int           '$.level'
);
```

Benefits:

```text
typed SQL columns
named result columns
explicit JSON paths
conversion during parsing
simpler downstream predicates and joins
```

For an array of objects, each array element becomes one relational row.

## Filtering safely

```sql
SELECT j.id, j.name, j.level
FROM OPENJSON(@json)
WITH
(
    id    int           '$.id',
    name  nvarchar(100) '$.name',
    level int           '$.level'
) AS j
WHERE j.name = @name
  AND j.level >= @minimumLevel;
```

When dynamic SQL is unavoidable, pass values through `sp_executesql` parameters. Do not concatenate untrusted input into SQL text.

---

# R02 — arrays, object input and missing properties

## Array of simple objects

```sql
DECLARE @json nvarchar(max) = N'
[
  { "id": 1, "name": "Alice", "age": 30 },
  { "id": 2, "name": "Bob",   "age": 25 }
]';

SELECT *
FROM OPENJSON(@json)
WITH
(
    id   int           '$.id',
    name nvarchar(50)  '$.name',
    age  int           '$.age'
);
```

This creates a virtual table over the JSON array.

## Object input

`OPENJSON` can also open an object:

```sql
DECLARE @json nvarchar(max) = N'
{
  "name": "eScore",
  "level": 2
}';

SELECT [key], [value], [type]
FROM OPENJSON(@json);
```

Default schema returns one row per property.

To project the object as one typed row:

```sql
SELECT *
FROM OPENJSON(@json)
WITH
(
    name  nvarchar(100) '$.name',
    level int           '$.level'
);
```

## Missing properties

When a path is absent in lax mode, a projected column normally becomes `NULL`:

```json
[
  { "id": 1, "name": "Alice", "age": 30 },
  { "id": 2, "name": "Bob" }
]
```

```sql
SELECT *
FROM OPENJSON(@json)
WITH
(
    id   int           '$.id',
    name nvarchar(50)  '$.name',
    age  int           '$.age'
);
```

The second row receives `NULL` for `age`.

Use strict JSON path mode when a missing path should be an error rather than a null-like result.

## Selecting an array property from an outer object

```json
{
  "rows": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}
```

Open the nested array path:

```sql
SELECT *
FROM OPENJSON(@json, '$.rows')
WITH
(
    id   int           '$.id',
    name nvarchar(50)  '$.name'
);
```

The second argument selects the JSON fragment that should become the row source.

---

# R03 — nested objects and arrays

## Nested object fields

```json
[
  {
    "id": 1,
    "name": "Alice",
    "address": {
      "city": "Vilnius",
      "zip": "01100"
    }
  }
]
```

Project scalar nested paths directly:

```sql
SELECT *
FROM OPENJSON(@json)
WITH
(
    id   int            '$.id',
    name nvarchar(50)   '$.name',
    city nvarchar(100)  '$.address.city',
    zip  nvarchar(20)   '$.address.zip'
);
```

## Preserve nested JSON with `AS JSON`

```sql
SELECT *
FROM OPENJSON(@json)
WITH
(
    id      int            '$.id',
    name    nvarchar(50)   '$.name',
    address nvarchar(max)  '$.address' AS JSON
);
```

`AS JSON` keeps an object or array fragment as JSON text for another processing step.

Without `AS JSON`, a projected complex value is not treated as a normal scalar column.

## Nested array per row

```json
[
  {
    "id": 1,
    "name": "Alice",
    "tags": ["a", "b"]
  }
]
```

First preserve the array:

```sql
SELECT *
FROM OPENJSON(@json)
WITH
(
    id   int            '$.id',
    name nvarchar(50)   '$.name',
    tags nvarchar(max)  '$.tags' AS JSON
);
```

Then explode it:

```sql
SELECT p.id, p.name, t.[value] AS tag
FROM OPENJSON(@json)
WITH
(
    id   int            '$.id',
    name nvarchar(50)   '$.name',
    tags nvarchar(max)  '$.tags' AS JSON
) AS p
CROSS APPLY OPENJSON(p.tags) AS t;
```

This produces one relational row per tag.

Use `OUTER APPLY` instead when parent rows without array elements must remain in the result.

---

# R04 — outer objects containing arrays

Given:

```json
{
  "rows": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
}
```

This:

```sql
OPENJSON(@json)
```

opens the outer object and returns a row for its `rows` property in default schema.

This:

```sql
OPENJSON(@json, '$.rows')
```

opens the actual array and returns one row per element.

Mental model:

```text
OPENJSON(json)
    open the supplied JSON value

OPENJSON(json, path)
    navigate to a nested value, then open it

WITH(...)
    define the relational columns produced from each opened item
```

For nested arrays inside each parent item:

```text
first OPENJSON
    creates parent rows

AS JSON
    preserves the child array

CROSS APPLY OPENJSON
    creates child rows
```

## Practical checklist

```text
[ ] use default key/value/type schema for inspection and generic traversal
[ ] use WITH for stable typed relational columns
[ ] select an outer array with OPENJSON(@json, '$.rows')
[ ] use nested JSON paths for scalar object properties
[ ] use AS JSON for nested arrays or objects that need another parse
[ ] use CROSS APPLY for required child rows
[ ] use OUTER APPLY when parents without children must remain
[ ] expect missing lax paths to become NULL
[ ] parameterize predicates and dynamic SQL values
[ ] verify database compatibility level supports OPENJSON
```

---

# Coverage

```text
unique embedded screenshots: 27
image uses: 27
native SVG labels: 14
duplicate extra placements: 0

processed image uses: 27
processed text labels: 14
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
