# Final semantic transcript — SQL `ANY`, `IN` and `EXISTS`

Authoritative source: `source/any in exists.svg`

## `IN`

```sql
SELECT *
FROM Orders
WHERE customer_id IN
(
    SELECT id
    FROM Customer
    WHERE active = 1
);
```

`IN` compares a value with the values returned by a subquery or literal list.

## `EXISTS`

```sql
SELECT c.*
FROM Customer AS c
WHERE EXISTS
(
    SELECT 1
    FROM Orders AS o
    WHERE o.customer_id = c.id
);
```

`EXISTS` tests whether the correlated subquery returns at least one row.

Use it naturally for relationship/existence checks.

## `ANY` / `SOME`

```sql
SELECT *
FROM Product
WHERE price >
  ANY
  (
    SELECT price
    FROM CompetitorProduct
  );
```

Meaning:

```text
comparison is true for at least one subquery value
```

Examples:

```text
x = ANY(subquery)
    broadly similar to x IN(subquery)

x > ANY(subquery)
    greater than at least one returned value

x > ALL(subquery)
    greater than every returned value
```

## Null semantics

`NOT IN` can produce surprising unknown results when the subquery contains `NULL`.

Prefer a correlated `NOT EXISTS` for anti-joins:

```sql
SELECT c.*
FROM Customer AS c
WHERE NOT EXISTS
(
    SELECT 1
    FROM Orders AS o
    WHERE o.customer_id = c.id
);
```

## Performance

Modern optimizers often transform logically equivalent forms into semi-joins. Choose the construct that expresses intent clearly, then inspect the plan and indexes for large workloads.


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
