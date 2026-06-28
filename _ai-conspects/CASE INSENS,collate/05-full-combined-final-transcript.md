# Full combined final transcript — CASE INSENS,collate

Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
meaningful text elements: 1 / 1
unique embedded screenshots: 11 / 11
screenshot uses: 11 / 11
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Case-insensitive comparison methods and collations

SQL Server string comparison behavior is primarily controlled by collation. A case-insensitive collation compares case variants as equal without applying `LOWER` or `UPPER` to every row.

### Collation properties

- `CI` means case-insensitive; `CS` means case-sensitive.
- `AI` and `AS` control accent sensitivity.
- Binary collations compare encoded values using binary rules.
- Database, column and expression collations can differ.

### Comparison choices

- Prefer a column defined with the comparison semantics required by the application.
- Use an explicit `COLLATE` for an exceptional query or cross-collation comparison.
- `LOWER(column) = LOWER(@value)` works semantically but is usually non-SARGable without a matching computed index.

### Equality and LIKE

- Both equality and LIKE follow the selected collation's case/accent rules.
- Parameter data type and collation should be compatible with the column.

### Representative pattern

```sql
SELECT *
FROM Users
WHERE UserName = @UserName
  COLLATE Latin1_General_100_CI_AS;
```

### Caveats

- Applying an explicit collation to the indexed column can affect index usage.
- Choose a collation compatible with the stored data and language rules.

## R02 — CHARINDEX wildcard escaping and practical notes

`CHARINDEX` searches for a literal substring. Unlike `LIKE`, percent and underscore do not act as wildcards inside the search expression.

### CHARINDEX

- Returns a one-based position when found.
- Returns zero when the substring is absent.
- An optional start position controls where searching begins.
- Case sensitivity follows collation.

### LIKE wildcards

- `%` matches any sequence and `_` matches one character.
- Use an `ESCAPE` character or bracket syntax when user text should be literal.
- Escape the escape character itself before escaping `%` and `_`.

### Practical choice

- Use CHARINDEX for simple contains semantics.
- Use LIKE for prefix, suffix or wildcard patterns.
- Neither leading-wildcard LIKE nor arbitrary CHARINDEX searches are normally index-seek friendly.

### Representative pattern

```sql
-- Literal substring:
WHERE CHARINDEX(@search, DisplayName) > 0;

-- Literal LIKE text with ! as escape:
WHERE DisplayName LIKE '%' + @escaped + '%' ESCAPE '!';
```

### Caveats

- Empty search strings have special behavior; define the product rule explicitly.
- Full-text search can be more appropriate for linguistic word search.

## R03 — Predicate fundamentals and optimizer properties

A predicate is SARGable when the optimizer can use it as a search argument over an index key rather than evaluating a transformed expression for every row.

### SARGable shapes

- `Column = @value`, ranges, and anchored prefixes can often produce index seeks.
- The column should remain directly comparable to a compatible parameter or constant.
- A selective predicate can greatly reduce rows read.

### Non-SARGable shapes

- Functions applied to the column.
- Implicit conversions of the indexed column.
- Leading wildcard searches.
- Arithmetic transformations of the column.

### Optimizer details

- SARGability does not guarantee a seek; cardinality, selectivity and cost still matter.
- An index seek can still read many rows.
- Inspect actual execution plans and logical reads.

### Representative pattern

```sql
-- Seek-friendly form:
WHERE CreatedAt >= @Start
  AND CreatedAt < @End;

-- Usually non-SARGable:
WHERE CONVERT(date, CreatedAt) = @Date;
```

### Caveats

- Statistics quality and parameter sensitivity also affect plan choice.
- Measure the complete query, not only one predicate.

## R04 — SARGability and applying COLLATE without losing indexes

The most reliable way to keep case-insensitive queries index-friendly is to store and index the column under the intended collation. Per-query conversions should be reserved for exceptions.

### Preferred schema

- Define the column with a CI collation when most searches are case-insensitive.
- Create an index on that column.
- Use direct equality or prefix predicates.
- This keeps the indexed expression identical to the search expression.

### Exceptional collation

- Applying `COLLATE` to the column creates an expression that may not match the existing index order.
- Applying the intended collation to a parameter can sometimes avoid transforming the column, but collation precedence and conversion rules must be verified.
- For recurring alternate semantics, create a persisted computed column with the alternate collation and index it.

### Normalized key

- A separate normalized search key is useful when business normalization goes beyond collation.
- Generate it consistently and enforce uniqueness where required.

### Representative pattern

```sql
ALTER TABLE Users
ADD UserName_CI AS
    (UserName COLLATE Latin1_General_100_CI_AS) PERSISTED;

CREATE INDEX IX_Users_UserName_CI
ON Users(UserName_CI);

SELECT *
FROM Users
WHERE UserName_CI = @UserName;
```

### Caveats

- Computed-column index eligibility depends on determinism and database settings.
- Unicode, accent and locale rules require domain-specific tests.

## Regional source map

### R01

- transcript: `01-transcript-R01-case-insensitive-comparison-methods-and-collations.md`
- text elements: `1`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-charindex-wildcard-escaping-and-practical-notes.md`
- text elements: `0`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-predicate-fundamentals-and-optimizer-properties.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-sargability-and-applying-collate-without-losing-indexes.md`
- text elements: `0`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
runtime/library/database-version details and original examples.
