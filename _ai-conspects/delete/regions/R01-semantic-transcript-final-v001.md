# Corrected final transcript — SQL DELETE duplicate rows

Generated: 2026-06-30

Authoritative source:

```text
source/delete.svg
```

## S-001 — Delete later duplicate rows while keeping the smallest ID

### Exact normalized SQL

```sql
DELETE p
FROM Person p
WHERE EXISTS
(
    SELECT 1
    FROM Person
    WHERE id < p.id
      AND email = p.email
);
```

### Alias binding

The outer row is aliased as:

```sql
Person p
```

Inside the subquery:

- the unqualified `id` and `email` refer to the inner `Person`;
- `p.id` and `p.email` refer to the current outer row.

A clearer equivalent form is:

```sql
DELETE p
FROM Person AS p
WHERE EXISTS
(
    SELECT 1
    FROM Person AS earlier
    WHERE earlier.id < p.id
      AND earlier.email = p.email
);
```

### What the query does

For each outer Person row `p`, the subquery asks:

> Is there another Person with the same email and a smaller ID?

If yes, the outer row is a later duplicate and is deleted.

Result:

```text
each email group keeps the row with the smallest ID
all later rows with the same email are deleted
```

Example input:

| id | email |
|---:|---|
| 1 | a@example.com |
| 4 | a@example.com |
| 7 | a@example.com |
| 3 | b@example.com |

Deleted:

```text
id 4
id 7
```

Retained:

```text
id 1 for a@example.com
id 3 for b@example.com
```

## Why `SELECT 1` is used

`EXISTS` checks only whether at least one qualifying row exists. The selected value is not returned or materialized for the delete operation.

These are equivalent for the existence test:

```sql
SELECT 1
SELECT *
SELECT earlier.id
```

`SELECT 1` communicates intent clearly.

## Critical correction to the old transcript

The previous transcript changed the source condition:

```sql
id < p.id
```

into:

```sql
p2.id = p.id
```

That is not a harmless alias normalization.

Equality allows every row to match itself:

```text
same id
same email
```

which can make `EXISTS` true for every row and cause the entire table to be targeted.

The authoritative predicate is:

```sql
earlier.id < p.id
```

The strict less-than comparison is what preserves the smallest ID.

## Safe preview

Before deleting, preview the exact target rows:

```sql
SELECT p.*
FROM Person AS p
WHERE EXISTS
(
    SELECT 1
    FROM Person AS earlier
    WHERE earlier.id < p.id
      AND earlier.email = p.email
);
```

Check:

- the selected rows are genuinely duplicates;
- the intended survivor is the smallest ID;
- email comparison semantics match database collation and normalization rules;
- `NULL` email behavior is acceptable;
- supporting indexes exist for large tables.

## Transaction workflow

```sql
BEGIN TRANSACTION;

DELETE p
FROM Person AS p
WHERE EXISTS
(
    SELECT 1
    FROM Person AS earlier
    WHERE earlier.id < p.id
      AND earlier.email = p.email
);

SELECT @@ROWCOUNT AS DeletedRows;

-- COMMIT;
ROLLBACK;
```

Use `ROLLBACK` during verification. Commit only after the target set and row count are correct.

## Important edge cases

### Null emails

SQL equality does not treat:

```sql
NULL = NULL
```

as true.

Rows whose email is `NULL` will not be grouped by the shown predicate. A separate explicit null policy is required when nulls should count as duplicates.

### Case sensitivity and normalization

Whether two email strings compare equal can depend on:

- database collation;
- case sensitivity;
- trailing spaces;
- normalization performed before storage.

For identity data, normalize email values deliberately and enforce the desired uniqueness rule.

### Concurrency

Another transaction can insert or change rows while cleanup is running. Production cleanup may require:

- an appropriate isolation level;
- a maintenance window;
- a unique index added after cleanup;
- application writes paused or coordinated.

### Future prevention

After removing duplicates, enforce the invariant when valid:

```sql
CREATE UNIQUE INDEX UX_Person_Email
ON Person(email);
```

The exact index must follow the application's null and normalization policy.

## Recall questions

1. What does the inner `id < p.id` condition establish?
2. Which row survives in each duplicate email group?
3. Why is replacing `<` with `=` catastrophic?
4. What do the unqualified inner columns refer to?
5. Why does `SELECT 1` work inside EXISTS?
6. How do null emails behave?
7. Why should the SELECT preview use the exact same predicate?
8. Which database feature prevents future duplicates?
9. How can collation affect the result?
10. What concurrency concerns exist during cleanup?

## Coverage

```text
unique screenshots: 1 / 1
image uses: 1 / 1
SVG labels: 0 / 0
exact SQL preserved: yes
material semantic error removed: yes
uncovered sources: 0
```
