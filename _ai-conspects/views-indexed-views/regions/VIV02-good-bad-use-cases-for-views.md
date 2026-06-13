# VIV02 - Good and bad use cases for views

Conspect: `views-indexed-views`  
File type: **source-preserving region transcript**  
Stage: **2 / NEXT01 verified transcript v001**  
Generated: 2026-06-13 07:38:29 UTC

---

## 0.1 Area overview / key ideas / reading quality

Key ideas:
- Good view uses include read models, reporting, complex joins, security-limited exposure, legacy contracts and stable read APIs.
- A normal view does not automatically optimize SQL; it mostly hides/reuses query definitions.
- Bad uses include hiding bad performance, dumping business logic into views, overusing views for simple queries and expecting normal entity behavior.
- Use HasNoKey for most read-model views unless a stable unique key really exists.

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
S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-022, S-023
```

Boundary decision:
```text
VIV02 covers good and bad use cases for normal views and view-mapped EF read models.
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
| VIV02A-S001 | S-006 | IU-006 | `0b4d618223` | VIV02A | `verified-from-source-image` | no | Good use case: reporting/read models |
| VIV02A-S002 | S-007 | IU-007 | `4bb0f17d01` | VIV02A | `verified-from-source-image` | no | Good use case: hide complex joins |
| VIV02A-S003 | S-008 | IU-008 | `da30d5c58f` | VIV02A | `verified-from-source-image` | no | Good use case: security / limited exposure |
| VIV02A-S004 | S-009 | IU-009 | `ee0f624ae0` | VIV02A | `verified-from-source-image` | no | Good use case: legacy database |
| VIV02A-S005 | S-010 | IU-010 | `ee05943b73` | VIV02A | `verified-from-source-image` | no | Good use case: stable read API for database |
| VIV02B-S001 | S-011 | IU-011 | `969f797df8` | VIV02B | `verified-from-source-image` | no | Bad use case: hiding bad performance |
| VIV02B-S002 | S-012 | IU-012 | `23556a5bd6` | VIV02B | `verified-from-source-image` | no | Bad use case: business logic dumping ground |
| VIV02B-S003 | S-013 | IU-013 | `4652d83b27` | VIV02B | `verified-from-source-image` | no | Bad use case: overusing views for simple queries |
| VIV02B-S004 | S-014 | IU-014 | `11ad4ef440` | VIV02B | `verified-from-source-image` | no | Bad use case: expecting normal entity behavior |
| VIV02C-S001 | S-015 | IU-015 | `fd59600e46` | VIV02C | `verified-from-source-image` | no | Can views be updated? |
| VIV02C-S002 | S-016 | IU-016 | `488ada1965` | VIV02C | `verified-from-source-image` | no | View model with key or no key |
| VIV02C-S003 | S-017 | IU-017 | `f15669f4b4` | VIV02C | `verified-from-source-image` | no | View model can have key if result has unique stable key |
| VIV02A-S006 | S-022 | IU-022 | `9faf423ed5` | VIV02A | `verified-from-source-image` | no | Views hide complex joins, not necessarily improve performance |
| VIV02A-S007 | S-023 | IU-023 | `435df14af8` | VIV02A | `verified-from-source-image` | no | Optimizer expands normal views; performance is not automatic |

---

## 2. Verified source transcript

## 2.1 VIV02A

### VIV02A-S001 / S-006 - `0b4d618223`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Good use case: reporting/read models

#### Visible text

```text
Good use case for views: reporting/read models.

Example view shape:
- ReviewTitle
- GenreName
- review count
- average rating

Meaning:
- a view can provide a read-optimized model;
- it can aggregate or join data for UI/reporting use without exposing every table relationship to the application layer.
```

#### Visible code

```sql
ReviewReport
- ReviewTitle
- GenreName
- review count
- average rating
```

---

### VIV02A-S002 / S-007 - `4bb0f17d01`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Good use case: hide complex joins

#### Visible text

```text
Good use case: hide complex joins.

Instead of repeating joins across many queries, use a view.

Visible flow:
- CREATE VIEW dbo.MovieDetailsView AS SELECT ...
- EF maps the view with builder.ToView("MovieDetailsView").

Meaning:
- the database view encapsulates the ugly join;
- EF consumes a simple read model.
```

#### Visible code

```sql
CREATE VIEW dbo.MovieDetailsView AS
SELECT ...

builder.ToView("MovieDetailsView");
```

---

### VIV02A-S003 / S-008 - `da30d5c58f`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Good use case: security / limited exposure

#### Visible text

```text
Good use case: security / limited exposure.

A view can expose only selected columns.

Example:
- table has sensitive fields;
- view exposes only a safe subset.

Meaning:
- callers can be granted access to the view without granting broad access to all underlying table columns.
```

---

### VIV02A-S004 / S-009 - `ee0f624ae0`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Good use case: legacy database

#### Visible text

```text
Good use case: legacy database.

If an existing database already has views, EF Core can map them richly.

Meaning:
- views are often part of legacy database contracts;
- EF can consume them as read models instead of forcing the application to rebuild all SQL.
```

---

### VIV02A-S005 / S-010 - `ee05943b73`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Good use case: stable read API for database

#### Visible text

```text
Good use case: stable read API for database.

If many apps query the same data shape, a view gives a stable contract.

Meaning:
- the view can hide changes to underlying tables;
- consumers keep querying the same view shape.
```

---

### VIV02A-S006 / S-022 - `9faf423ed5`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Views hide complex joins, not necessarily improve performance

#### Visible text

```text
Note:
views can hide complex joins and make queries easier to reuse.

But this is not necessarily performance optimization by itself.

Question in the canvas:
“we just hide ugly sql, right? we don't optimise anything?”

Meaning:
- a normal view mostly improves organization/maintainability;
- performance is not magically improved just because SQL is placed in a view.
```

---

### VIV02A-S007 / S-023 - `435df14af8`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Optimizer expands normal views; performance is not automatic

#### Visible text

```text
Normal SQL Server views usually hide and reuse complex SQL.

A normal view does not automatically optimize the query:
- the optimizer usually expands the view definition into the outer query.
- main benefit is maintainability, not performance.

Performance can improve only indirectly or in special cases such as indexed views.

Meaning:
- do not assume a normal view is a performance feature.
```

---

## 2.2 VIV02B

### VIV02B-S001 / S-011 - `969f797df8`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Bad use case: hiding bad performance

#### Visible text

```text
Bad use case: hiding bad performance.

Putting a slow ugly query inside a view does not make it faster. It just hides the SQL.

Meaning:
- view is not a magic performance fix;
- if the query is bad, the view can hide the problem instead of solving it.
```

#### Visible code

```sql
-- "This query is slow and ugly, so put it in a view."
```

---

### VIV02B-S002 / S-012 - `23556a5bd6`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Bad use case: business logic dumping ground

#### Visible text

```text
Bad use case: business logic dumping ground.

Views should not become a place for too much business logic.

Examples of bad logic for a view:
- huge conditional rules,
- complex domain decisions,
- logic that should be in the application/domain layer.

Meaning:
- view is a read/query abstraction, not a domain logic container.
```

---

### VIV02B-S003 / S-013 - `4652d83b27`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Bad use case: overusing views for simple queries

#### Visible text

```text
Bad use case: overusing views for simple queries.

Visible example:
- CREATE VIEW ActiveUsers AS SELECT * FROM Users WHERE IsActive = 1;

The note says maybe not terrible, but often unnecessary if the query is simple and used only once.

Meaning:
- do not create views for every small query;
- use them when the view has a stable reuse/contract/read-model value.
```

#### Visible code

```sql
CREATE VIEW ActiveUsers AS
SELECT * FROM Users WHERE IsActive = 1;
```

---

### VIV02B-S004 / S-014 - `11ad4ef440`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Bad use case: expecting normal entity behavior

#### Visible text

```text
Bad use case: expecting normal entity behavior.

View mapped types are often keyless/read-only.

Do not treat them like normal aggregate roots.

Visible example:
- context.MovieSummaries.Add(...)

Usually wrong.

Meaning:
- use view mappings for reading;
- do not expect normal insert/update/delete entity behavior.
```

#### Visible code

```sql
context.MovieSummaries.Add(...);
```

---

## 2.3 VIV02C

### VIV02C-S001 / S-015 - `fd59600e46`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: Can views be updated?

#### Visible text

```text
Can views be updated?

In SQL Server, some simple views can be updatable, but in EF Core practice you usually treat views as read-only.

The slide recommends:
- view mapping in EF Core is usually for reading, not writing.
- if you need writes, map the real table/entity.

Meaning:
- keep EF view types as read models.
```

---

### VIV02C-S002 / S-016 - `488ada1965`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: View model with key or no key

#### Visible text

```text
View model with key or no key?

Most view mappings use HasNoKey because views often do not have a real primary key.

Meaning:
- keyless entity types are common for read-only projections/views;
- without a key, EF does not track them like normal entities.
```

#### Visible code

```sql
builder.HasNoKey();
```

---

### VIV02C-S003 / S-017 - `f15669f4b4`

Metadata:
- status: `verified-from-source-image`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: View model can have key if result has unique stable key

#### Visible text

```text
If the view returns a unique stable key, you can configure a key.

Visible example:
- builder.HasKey(x => x.Id)
- builder.ToView("MovieSummaries")

This can allow tracking behavior, but for read models HasNoKey() is common and simple.

Meaning:
- choose HasKey only when the view result actually has a stable unique identifier.
```

#### Visible code

```sql
builder.HasKey(x => x.Id);
builder.ToView("MovieSummaries");
```

---

## 3. Cleaned source notes

- Views are good for stable read APIs, reports, legacy contracts, security-limited exposure and hiding complex joins.
- Views are bad as a way to hide slow SQL or dump domain business logic into the database.
- Do not create a view for every trivial query.
- Do not expect view-mapped types to behave like normal entities unless a stable key and write path are intentionally designed.

---

## 4. Question hooks

- When is a view a good read-model abstraction?
- Why does a normal view not automatically optimize performance?
- Why is hiding bad performance inside a view dangerous?
- Why should business logic not be dumped into views?
- When can a view-mapped model have a key?