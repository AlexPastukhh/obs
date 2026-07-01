# SQL Server computed columns — source-preserving transcript v002

Generated: 2026-07-01

## Coverage

```text
unique screenshots: 18
image uses: 18
native SVG labels: 10
source-preserving blocks: 18
uncovered sources: 0
```

## Relationship to the existing summary

`regions/R01R02R03-final-coverage.md` remains the concise integrated explanation.  
This file preserves every screenshot's SQL, values, and step sequence.

## S-001 — Computed column without an index

**Known limits:** none

### Near-literal normalized transcript

### 1. Computed column without an index

```sql
CREATE TABLE Users (
    Id INT IDENTITY PRIMARY KEY,
    Email NVARCHAR(320) NOT NULL,
    NormalizedEmail AS LOWER(Email)
);
```

`NormalizedEmail` is a computed column.

### Study meaning

SQL Server stores the expression as table metadata. Without `PERSISTED`, the computed result is not necessarily stored as a normal base-row value.

### Recall questions

1. Which base column does `NormalizedEmail` depend on?
2. What expression defines the computed column?
3. Is `NormalizedEmail` declared as a normal writable column?


---

## S-002 — Calculation when the value is requested

**Known limits:** none

### Near-literal normalized transcript

If you run:

```sql
SELECT Id, Email, NormalizedEmail
FROM Users;
```

SQL Server can calculate:

```sql
LOWER(Email)
```

when the value is needed.

### Study meaning

A non-persisted computed column can be evaluated during query execution rather than read from a separately stored base-row field.

### Recall questions

1. Which query requests the computed value?
2. When can SQL Server evaluate `LOWER(Email)`?
3. What is the difference between storing an expression and storing its result?


---

## S-003 — Concrete non-persisted value example

**Known limits:** none

### Near-literal normalized transcript

For this row:

```text
Email = 'BOB@EXAMPLE.COM'
```

SQL Server returns:

```text
NormalizedEmail = 'bob@example.com'
```

The value is not necessarily stored as a normal column.

### Study meaning

The computed result is deterministic for the current base value even when it is evaluated on demand.

### Recall questions

1. What normalized result is produced?
2. Does the example prove the value is physically stored?
3. Which input change would alter the result?


---

## S-004 — Non-persisted insert and read flow

**Known limits:** none

### Near-literal normalized transcript

Flow:

```text
INSERT row
Email stored physically

SELECT NormalizedEmail
SQL Server computes LOWER(Email)
returns result
```

### Study meaning

The base value is stored during insert; the computed expression can be evaluated later when selected.

### Recall questions

1. What is stored physically on insert?
2. At what operation is the computed expression evaluated in this flow?
3. Who returns the result to the query?


---

## S-005 — PERSISTED computed column definition

**Known limits:** none

### Near-literal normalized transcript

### 2. Computed column with `PERSISTED`

```sql
CREATE TABLE Users (
    Id INT IDENTITY PRIMARY KEY,
    Email NVARCHAR(320) NOT NULL,
    NormalizedEmail AS LOWER(Email) PERSISTED
);
```

Now SQL Server stores the computed result.

### Study meaning

`PERSISTED` asks SQL Server to materialize the computed value in the base row and maintain it when dependencies change.

### Recall questions

1. Which keyword changes storage behavior?
2. Where is the computed result stored?
3. Does application code calculate and assign the persisted value?


---

## S-006 — PERSISTED insert and read flow

**Known limits:** none

### Near-literal normalized transcript

Flow:

```text
INSERT Email = 'BOB@EXAMPLE.COM'
SQL Server computes LOWER(Email)
stores Email = 'BOB@EXAMPLE.COM'
stores NormalizedEmail = 'bob@example.com'
```

Then on read:

```text
SELECT NormalizedEmail
SQL Server reads stored value
```

### Study meaning

The expression is evaluated during data modification and the stored result is read later.

### Recall questions

1. What two values are stored during insert?
2. What normalized value is produced?
3. What happens during the later SELECT?


---

## S-007 — Automatic PERSISTED recomputation on update

**Known limits:** none

### Near-literal normalized transcript

If email changes:

```sql
UPDATE Users
SET Email = 'Robert@Example.com'
WHERE Id = 1;
```

Flow:

```text
SQL Server updates Email
SQL Server recomputes NormalizedEmail
SQL Server stores new NormalizedEmail
```

So `PERSISTED` means:

> Store the computed value physically and keep it updated automatically.

### Study meaning

Dependency tracking lets SQL Server maintain the computed value whenever a referenced base column changes.

### Recall questions

1. Which base value is updated?
2. Who recomputes the persisted column?
3. What is the concise meaning of `PERSISTED`?


---

## S-008 — Unique index on a non-persisted computed column

**Known limits:** none

### Near-literal normalized transcript

### 3. Computed column with an index

```sql
CREATE TABLE Users (
    Id INT IDENTITY PRIMARY KEY,
    Email NVARCHAR(320) NOT NULL,
    NormalizedEmail AS LOWER(Email)
);

CREATE UNIQUE INDEX UX_Users_NormalizedEmail
ON Users (NormalizedEmail);
```

Even if `NormalizedEmail` is not marked `PERSISTED`, the index stores the computed key values.

The base table may not physically store `NormalizedEmail` as a normal column, but the index contains values such as:

```text
bob@example.com   -> row Id 1
alice@example.com -> row Id 2
```

### Study meaning

Base-row persistence and index-key storage are separate. The index must materialize key values so it can search and enforce uniqueness.

### Recall questions

1. What is the index name?
2. Which column is the unique index key?
3. Can the index store keys when the base computed column is not PERSISTED?
4. What two example index entries are shown?


---

## S-009 — Index maintenance during INSERT

**Known limits:** none

### Near-literal normalized transcript

Flow on insert:

```sql
INSERT INTO Users (Email)
VALUES ('BOB@EXAMPLE.COM');
```

SQL Server does this:

1. Receive new `Email` value.
2. Compute `NormalizedEmail = LOWER('BOB@EXAMPLE.COM')`.
3. Check the unique index for `'bob@example.com'`.
4. If no duplicate exists, insert the row.
5. Add `'bob@example.com'` to the index.

### Study meaning

The unique computed index participates in write processing before the insert is accepted.

### Recall questions

1. What normalized key is computed?
2. When is uniqueness checked?
3. What happens if the key already exists?
4. What is added to the index after a successful insert?


---

## S-010 — UPDATE statement that changes an indexed dependency

**Known limits:** none

### Near-literal normalized transcript

Flow on update:

```sql
UPDATE Users
SET Email = 'ALICE@EXAMPLE.COM'
WHERE Id = 1;
```

### Study meaning

Changing `Email` can change the computed index key because `NormalizedEmail` depends on `Email`.

### Recall questions

1. Which row is changed?
2. What new email value is assigned?
3. Why must the computed index be maintained?


---

## S-011 — Detailed computed-index UPDATE maintenance

**Known limits:** none

### Near-literal normalized transcript

SQL Server does this:

1. Find row `Id 1`.
2. Old `Email = 'BOB@EXAMPLE.COM'`.
3. Old index key = `'bob@example.com'`.
4. New `Email = 'ALICE@EXAMPLE.COM'`.
5. New computed key = `'alice@example.com'`.
6. Check the unique index for `'alice@example.com'`.
7. If no duplicate exists:
   - update `Email` in the table;
   - remove old index entry `'bob@example.com'`;
   - add new index entry `'alice@example.com'`.

### Study meaning

The database atomically coordinates base-row modification, uniqueness validation, and replacement of the computed index entry.

### Recall questions

1. What old and new keys are shown?
2. Why is the new key checked before finalizing the update?
3. Which index entry is removed?
4. Which index entry is inserted?


---

## S-012 — Dependency tracking updates the index automatically

**Known limits:** none

### Near-literal normalized transcript

You do not manually tell SQL Server to update the index.

SQL Server knows that the index depends on:

```sql
LOWER(Email)
```

So when `Email` changes, SQL Server maintains the index automatically.

### Study meaning

The computed-column expression records dependencies that the storage engine uses during data modification.

### Recall questions

1. Does application code issue a separate index update?
2. Which expression creates the dependency?
3. What event causes index maintenance?


---

## S-013 — Why predictable functions are suitable

**Known limits:** none

### Near-literal normalized transcript

### 4. Why predictable functions are okay

This is okay:

```sql
NormalizedEmail AS LOWER(Email)
```

Because for the same `Email`, the result is always the same:

```text
Email = 'BOB@EXAMPLE.COM'
LOWER(Email) = 'bob@example.com'
```

### Study meaning

A deterministic expression produces a stable key from the same dependency values.

### Recall questions

1. Why is `LOWER(Email)` predictable?
2. What result is shown for the example input?
3. What property makes the expression suitable for index maintenance?


---

## S-014 — A deterministic key remains stable over time

**Known limits:** none

### Near-literal normalized transcript

For the same email value:

```text
Today:
'bob@example.com'

Tomorrow:
'bob@example.com'

Next month:
'bob@example.com'
```

The computed value changes only when `Email` changes.

That means SQL Server can safely maintain the index.

### Study meaning

Passing time alone does not invalidate a deterministic key based only on the row's email value.

### Recall questions

1. What result is shown at all three times?
2. What must change before the computed value changes?
3. Why does this make index maintenance possible?


---

## S-015 — Stable dependency-to-index maintenance flow

**Known limits:** none

### Near-literal normalized transcript

Flow:

```text
Email does not change
=> NormalizedEmail does not change
=> index does not need to change

Email changes
=> NormalizedEmail may change
=> SQL Server updates index during the UPDATE
```

This is exactly what indexes need.

### Study meaning

The engine needs a reliable data-modification event that tells it when a key may need recalculation.

### Recall questions

1. When can the index remain untouched?
2. When may the key need recalculation?
3. Which DML event provides the maintenance trigger?


---

## S-016 — A nondeterministic time-based computed expression

**Known limits:** none

### Near-literal normalized transcript

### 5. Why unpredictable functions are not okay

Compare:

```sql
IsRecent AS
CASE
    WHEN CreatedAt >= DATEADD(day, -7, GETDATE())
        THEN 1
    ELSE 0
END
```

### Study meaning

`GETDATE()` changes independently of row data. Therefore the computed result can change even when no dependency column is modified.

### Recall questions

1. Which nondeterministic function is used?
2. What window does `DATEADD(day, -7, GETDATE())` represent?
3. What values can `IsRecent` return?
4. Why can the result change without DML?


---

## S-017 — January 3 versus January 20 example

**Known limits:** none

### Near-literal normalized transcript

Suppose the row is:

```text
Id = 1
CreatedAt = 2026-01-01
```

On January 3:

```text
GETDATE() = 2026-01-03
IsRecent = 1
```

On January 20:

```text
GETDATE() = 2026-01-20
IsRecent = 0
```

But the row did not change.

### Study meaning

The output changes because the current date changes, not because SQL Server receives a row modification that would trigger index maintenance.

### Recall questions

1. What is the row's CreatedAt value?
2. What is `IsRecent` on January 3?
3. What is it on January 20?
4. Which row column changed between those dates?


---

## S-018 — The impossible index-maintenance problem

**Known limits:** none

### Near-literal normalized transcript

```text
No INSERT.
No UPDATE.
No DELETE.

Only time passed.
```

That creates the impossible index-maintenance problem.

### Study meaning

An index cannot stay correct if its key changes spontaneously without a data-change operation that tells the engine to recompute it.

### Recall questions

1. Which three DML operations did not occur?
2. What changed instead?
3. Why would a stored index key become stale?
4. What rule follows for indexed computed expressions?
