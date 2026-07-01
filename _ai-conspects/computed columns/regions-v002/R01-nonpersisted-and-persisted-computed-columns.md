# Non-persisted and PERSISTED computed columns

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
