# VIV01 - Views concept, readonly behavior, EF Core mapping flow, ToSqlQuery vs ToView

Conspect: `views-indexed-views`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-13 07:38:29 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- A normal SQL view stores a query definition, not necessarily the data.
- EF Core can map a model to a database view with ToView, often as HasNoKey.
- ToView means SQL lives in the database view object.
- ToSqlQuery means SQL lives in EF Core mapping.
- View mappings are normally read-only/read-model oriented.

Reading quality:
```text
Overall: high.
Most screenshots are clean slide/code screenshots.
Some SQL snippets are partially cropped at the bottom; core meaning is readable.
Confidence: high.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-001, S-002, S-003, S-004, S-005, S-018, S-019, S-020, S-021, S-024, S-025, S-026, S-027
```

Boundary decision:
```text
VIV01 covers normal view concept, EF Core view mapping flow, keyless/read-only behavior, ToView and ToSqlQuery distinction.
No boundary correction was required for this region in NEXT01.
```

Pending after this region:
```text
VIV03 and VIV04 remain for NEXT02/NEXT03.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| VIV01A-S001 | S-001 | IU-001 | `afbe3b1521` | VIV01A | `verified-from-source-image` | yes | SQL view concept: saved query |
| VIV01A-S002 | S-002 | IU-002 | `7984b7fabb` | VIV01A | `verified-from-source-image` | no | Querying a normal view and storage behavior |
| VIV01A-S003 | S-003 | IU-003 | `21337ffaa2` | VIV01A | `verified-from-source-image` | no | Views are useful for hiding complex SQL |
| VIV01A-S004 | S-004 | IU-004 | `f29abf7252` | VIV01A | `verified-from-source-image` | no | Create view then query view |
| VIV01A-S005 | S-005 | IU-005 | `345db22642` | VIV01A | `verified-from-source-image` | no | Views in SQL Server summary |
| VIV01B-S001 | S-018 | IU-018 | `c7bec476cf` | VIV01B | `verified-from-source-image` | no | EF Core view flow step 1: create SQL view |
| VIV01B-S002 | S-019 | IU-019 | `9d09484977` | VIV01B | `verified-from-source-image` | no | EF Core view flow step 2: create C# model |
| VIV01B-S003 | S-020 | IU-020 | `930eb5eaf5` | VIV01B | `verified-from-source-image` | no | EF Core view flow step 3: configure EF |
| VIV01B-S004 | S-021 | IU-021 | `2ae3756652` | VIV01B | `verified-from-source-image` | no | EF Core view flow step 4: query it |
| VIV01C-S001 | S-024 | IU-024 | `5bfc37a3fa` | VIV01C | `verified-from-source-image` | no | ToView vs ToSqlQuery |
| VIV01C-S002 | S-025 | IU-025 | `cd83bca109` | VIV01C | `verified-from-source-image` | yes | ToSqlQuery mapping |
| VIV01C-S003 | S-026 | IU-026 | `de3758264a` | VIV01C | `verified-from-source-image` | no | ToView: SQL lives in the database |
| VIV01C-S004 | S-027 | IU-027 | `e12425be98` | VIV01C | `verified-from-source-image` | no | ToSqlQuery: SQL lives in EF mapping |

---

## 2. Verified source transcript

## 2.1 VIV01A

### VIV01A-S001 / S-001 - `afbe3b1521`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `yes`
- confidence: `high`
- theme: SQL view concept: saved query

#### Visible text

```text
A SQL view is a saved SQL query in the database.

Visible example creates a view named dbo.MovieSummaries that selects movie fields and joins to related data such as Genre.

Meaning:
- the view is a database object;
- it stores a query definition;
- users can query the view as if it were a table-shaped read model.
```

#### Visible code

```sql
CREATE VIEW dbo.MovieSummaries AS
SELECT
    m.Id,
    m.Title,
    g.Name AS GenreName,
    m.ReleaseDate
FROM dbo.Movies m
JOIN dbo.Genres g ON g.Id = m.GenreId;
```

#### Notes

Bottom of the SQL is cropped, but the CREATE VIEW shape and intent are clear.

---

### VIV01A-S002 / S-002 - `7984b7fabb`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Querying a normal view and storage behavior

#### Visible text

```text
A view can be queried like a table.

Visible example:
- SELECT * FROM dbo.MovieSummaries;

But physically, a normal view usually does not store data. It stores the query definition.

Meaning:
- querying the view runs/expands the underlying SELECT;
- the normal view is not a materialized copy of the data.
```

#### Visible code

```sql
SELECT * FROM dbo.MovieSummaries;
```

---

### VIV01A-S003 / S-003 - `21337ffaa2`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Views are useful for hiding complex SQL

#### Visible text

```text
Views are useful because a view can hide complicated SQL behind a simple name.

The screenshot shows a longer query with joins and filters and presents the view as a simpler reusable interface.

Meaning:
- caller queries the named view;
- complexity remains in the view definition;
- this helps reuse and readability.
```

---

### VIV01A-S004 / S-004 - `f29abf7252`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Create view then query view

#### Visible text

```text
Flow:
1. Create a view with CREATE VIEW dbo.MovieReport AS ...
2. Query it later with SELECT * FROM dbo.MovieReport.

Meaning:
- the SQL definition is created once in the database;
- later consumers query the view name.
```

#### Visible code

```sql
CREATE VIEW dbo.MovieReport AS
...
SELECT * FROM dbo.MovieReport;
```

---

### VIV01A-S005 / S-005 - `345db22642`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Views in SQL Server summary

#### Visible text

```text
Views in SQL Server:
- SQL Server normally stores a view as a saved/named query definition.
- It is reusable.
- It is queryable like a table.
- It is not necessarily stored physically.

There are also indexed views, which can physically store results, but those are more advanced and have restrictions.

For EF Core, a view is a convenient read/query surface.
```

---

## 2.2 VIV01B

### VIV01B-S001 / S-018 - `c7bec476cf`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF Core view flow step 1: create SQL view

#### Visible text

```text
Example full EF Core view flow, step 1:
create the SQL view.

Visible example creates dbo.MovieSummaries with fields:
- Id
- Title
- GenreName
- ReleaseDate

It joins Movies to Genres.

Meaning:
- the database owns the view definition;
- EF Core can later map a model to this database object.
```

#### Visible code

```sql
CREATE VIEW dbo.MovieSummaries AS
SELECT
    m.Id,
    m.Title,
    g.Name AS GenreName,
    m.ReleaseDate
FROM dbo.Movies m
JOIN dbo.Genres g ON g.Id = m.GenreId;
```

---

### VIV01B-S002 / S-019 - `9d09484977`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF Core view flow step 2: create C# model

#### Visible text

```text
Step 2: create a C# model matching the view output.

Visible model:
- MovieSummary
- Id
- Title
- GenreName
- ReleaseDate

Meaning:
- the model is a read model/DTO-like projection shape;
- its properties should match the view columns.
```

#### Visible code

```sql
public class MovieSummary
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string GenreName { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }
}
```

---

### VIV01B-S003 / S-020 - `930eb5eaf5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF Core view flow step 3: configure EF

#### Visible text

```text
Step 3: configure EF Core mapping.

Visible example:
- builder.Entity<MovieSummary>(builder => { ... })
- HasNoKey()
- ToView("MovieSummaries")

Meaning:
- EF maps MovieSummary to the SQL view;
- HasNoKey is common for view read models;
- ToView tells EF that the database object is a view/read-only query source.
```

#### Visible code

```sql
modelBuilder.Entity<MovieSummary>(builder =>
{
    builder.HasNoKey();
    builder.ToView("MovieSummaries");
});
```

---

### VIV01B-S004 / S-021 - `2ae3756652`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: EF Core view flow step 4: query it

#### Visible text

```text
Step 4: query the mapped view.

Visible example:
- context.Set<MovieSummary>()
- Where(...)
- ToListAsync()

Meaning:
- after mapping, the view can be queried through EF Core like a queryable read model.
```

#### Visible code

```sql
var summaries = await context.Set<MovieSummary>()
    .Where(x => x.ReleaseDate >= new DateTime(2000, 1, 1))
    .ToListAsync();
```

---

## 2.3 VIV01C

### VIV01C-S001 / S-024 - `5bfc37a3fa`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ToView vs ToSqlQuery

#### Visible text

```text
ToView(...) means:
- use an existing SQL object in the database as a view.

Visible mapping:
- builder.ToView("MovieSummaries");

Meaning:
- this type maps to the database view dbo.MovieSummaries;
- EF queries that view.
```

#### Visible code

```sql
builder.ToView("MovieSummaries");
```

---

### VIV01C-S002 / S-025 - `cd83bca109`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `yes`
- confidence: `high`
- theme: ToSqlQuery mapping

#### Visible text

```text
ToSqlQuery(...) means:
- use a raw SQL query as the source for a keyless entity/query type.

Visible example:
- HasNoKey()
- ToSqlQuery("SELECT ... FROM Movies ... JOIN Genres ...")

Meaning:
- this type is backed by this SQL query;
- the query lives in EF mapping instead of a database view object.
```

#### Visible code

```sql
modelBuilder
    .Entity<MovieSummary>()
    .HasNoKey()
    .ToSqlQuery(@"
        SELECT m.Id, m.Title, g.Name AS GenreName
        FROM Movies m
        JOIN Genres g ON g.Id = m.GenreId
    ");
```

#### Notes

SQL text is partially cropped but enough is visible to identify ToSqlQuery mapping.

---

### VIV01C-S003 / S-026 - `de3758264a`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ToView: SQL lives in the database

#### Visible text

```text
With ToView:
- SQL lives in the database.

Visible flow:
- CREATE VIEW dbo.MovieSummaries AS ...
- EF maps to it with builder.ToView("MovieSummaries").

Meaning:
- the database owns the query definition;
- EF only maps to the existing view.
```

#### Visible code

```sql
CREATE VIEW dbo.MovieSummaries AS ...

builder.ToView("MovieSummaries");
```

---

### VIV01C-S004 / S-027 - `e12425be98`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ToSqlQuery: SQL lives in EF mapping

#### Visible text

```text
With ToSqlQuery:
- SQL lives in the EF Core mapping.

Visible example:
- builder.ToSqlQuery("SELECT ...")

Good when the app owns the query definition and you do not want to create a database view object.

Meaning:
- no view has to exist in the database;
- EF uses the configured query as the source.
```

#### Visible code

```sql
builder.ToSqlQuery("SELECT ...");
```

---

## 3. Cleaned source notes

- A normal view is a stored query definition.
- Normal views are not materialized unless special/indexed view features are used.
- EF Core maps views mainly as read models, often keyless.
- ToView points to a database view/object; ToSqlQuery embeds SQL in EF mapping.
- Prefer mapping real tables/entities for writes.

---

## 4. Question hooks

- What does a normal SQL view physically store?
- How does EF Core map a view with ToView?
- When should a view model use HasNoKey?
- What is the difference between ToView and ToSqlQuery?
- Why are EF view mappings usually read-only?