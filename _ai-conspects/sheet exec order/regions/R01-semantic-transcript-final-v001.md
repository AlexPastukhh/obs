# Final semantic transcript — SQL logical query processing order

Authoritative source: `source/sheet exec order.svg`

A SQL query is written in one order but logically evaluated in another.

## Core logical order

```text
1. FROM / JOIN / ON
2. WHERE
3. GROUP BY
4. HAVING
5. window-function evaluation area
6. SELECT
7. DISTINCT
8. ORDER BY
9. OFFSET / FETCH / LIMIT / TOP
```

The exact placement of vendor-specific features should be checked against the database engine, but this model explains most alias and filtering behavior.

## Consequences

A `SELECT` alias is generally unavailable in `WHERE` because `WHERE` is evaluated earlier:

```sql
SELECT price * quantity AS total
FROM OrderLine
WHERE total > 100; -- usually invalid
```

Use a repeated expression, subquery or CTE:

```sql
WITH lines AS
(
    SELECT *,
           price * quantity AS total
    FROM OrderLine
)
SELECT *
FROM lines
WHERE total > 100;
```

`HAVING` filters groups after `GROUP BY`:

```sql
SELECT customer_id,
       COUNT(*) AS count_value
FROM Orders
GROUP BY customer_id
HAVING COUNT(*) >= 5;
```

Window functions see rows after filtering/grouping and are normally filtered in an outer query:

```sql
WITH ranked AS
(
    SELECT *,
           ROW_NUMBER() OVER
           (
             PARTITION BY customer_id
             ORDER BY created_at DESC
           ) AS rn
    FROM Orders
)
SELECT *
FROM ranked
WHERE rn = 1;
```

## Physical execution

The optimizer may physically reorder joins, predicates and operators while preserving the logical result. Logical order explains semantics; the execution plan explains actual work.


# Coverage

```text
unique embedded screenshots: 1
image uses: 1
native SVG labels: 5
duplicate extra placements: 0

processed image uses: 1
processed text labels: 5
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
