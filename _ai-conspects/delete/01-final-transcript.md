# Final semantic transcript — SQL DELETE with related-row conditions

Authoritative source: `source/delete.svg`

## Delete with `EXISTS`

```sql
DELETE p
FROM Person AS p
WHERE EXISTS
(
    SELECT 1
    FROM Person AS p2
    WHERE p2.id = p.id
      AND p2.email = p.email
);
```

The exact predicate must identify the intended rows; an always-true self-match can delete every row.

More typical related-table form:

```sql
DELETE p
FROM Person AS p
WHERE EXISTS
(
    SELECT 1
    FROM Suppression AS s
    WHERE s.person_id = p.id
);
```

`EXISTS` checks whether at least one qualifying related row exists. The selected expression (`SELECT 1`) is not materialized.

## Delete with join

SQL Server supports:

```sql
DELETE p
FROM Person AS p
JOIN Suppression AS s
  ON s.person_id = p.id;
```

Multiple joined matches still target a base row once.

## Safety workflow

Preview first:

```sql
SELECT p.*
FROM Person AS p
WHERE EXISTS (...);
```

Then execute in a transaction:

```sql
BEGIN TRANSACTION;

DELETE ...;

SELECT @@ROWCOUNT;

-- COMMIT;
ROLLBACK;
```

Use a backup, appropriate isolation and a selective predicate for production data.

## Checklist

```text
[ ] preview rows with SELECT
[ ] verify correlation aliases
[ ] avoid accidental self-matching conditions
[ ] inspect the execution plan for large tables
[ ] ensure supporting indexes exist
[ ] use a transaction for risky maintenance work
```


# Coverage

```text
unique embedded screenshots: 1
image uses: 1
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 1
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
