# Final semantic transcript — SQL `EXISTS`, `IN`, `ANY` and `SOME`

Authoritative source:
`source/in any exist, some(1).svg`

Coverage:

```text
unique embedded screenshots: 2
image uses: 2
native SVG labels: 11
remaining unclosed: 0
```

---

# R01 — `EXISTS`, correlation and NULL behavior

## Core meaning

`EXISTS` answers one question:

```text
Did the subquery return at least one row?
```

It does not care which columns the subquery returns or what their values are.
That is why the idiomatic projection is often `SELECT 1`.

```sql
SELECT t.Id, t.Name
FROM Tab1 AS t
WHERE EXISTS
(
    SELECT 1
    FROM Tab2 AS t1
    WHERE t.Name = t1.Name
);
```

This is a correlated subquery: the inner query refers to the current outer row.
For each row from `Tab1`, the database checks whether a matching row exists in
`Tab2`.

Conceptually this is a semi-join:

```text
return the outer row once when at least one match exists
```

Even if the inner query finds many rows, the outer row is not duplicated merely
because `EXISTS` found several matches.

## NULL caveats

`EXISTS` itself is not confused by a projected `NULL`:

```sql
WHERE EXISTS (SELECT NULL FROM Tab2)
```

If the subquery produces a row, `EXISTS` is true. The value `NULL` in that row
does not matter.

However, predicates inside the subquery still use SQL three-valued logic:

```sql
WHERE t.Name = t1.Name
```

When either side is `NULL`, equality normally evaluates to `UNKNOWN`, not true,
so that pair does not count as a match.

Use an explicit null-safe comparison when matching nulls is intended:

```sql
WHERE
    t.Name = t1.Name
    OR (t.Name IS NULL AND t1.Name IS NULL)
```

## `NOT EXISTS`

`NOT EXISTS` is the usual null-safe form for “no related row exists”:

```sql
SELECT t.Id, t.Name
FROM Tab1 AS t
WHERE NOT EXISTS
(
    SELECT 1
    FROM Tab2 AS t1
    WHERE t.Name = t1.Name
);
```

This is normally safer than `NOT IN` when the inner source can contain `NULL`.


---

# R02 — `IN`

## Literal membership

`IN` tests whether an expression equals at least one member of a list:

```sql
SELECT *
FROM dbo.Users
WHERE Country IN ('US', 'CA', 'MX');
```

It is clearer than repeating equality with `OR`:

```sql
WHERE Country = 'US'
   OR Country = 'CA'
   OR Country = 'MX'
```

## Subquery form

`IN` may also consume a one-column subquery:

```sql
SELECT *
FROM Orders
WHERE CustomerId IN
(
    SELECT Id
    FROM Customers
    WHERE IsActive = 1
);
```

For equality membership:

```text
x IN (subquery)
```

is closely related to:

```text
x = ANY (subquery)
```

The optimizer may implement equivalent forms similarly, but the clearest syntax
depends on the intent: `IN` emphasizes membership, while `EXISTS` emphasizes the
presence of a related row.

## NULL behavior

SQL does not reduce every predicate to only true or false. It also has
`UNKNOWN`.

Examples:

```sql
NULL IN (1, 2, 3)      -- UNKNOWN
5 IN (1, 2, NULL)      -- UNKNOWN
2 IN (1, 2, NULL)      -- TRUE
```

A `WHERE` clause keeps only true rows, so `UNKNOWN` behaves like a rejected row.

The dangerous form is often:

```sql
WHERE Id NOT IN (SELECT NullableId FROM OtherTable)
```

If the subquery returns even one `NULL`, comparisons can become unknown and the
query may return fewer rows than expected, sometimes none. Filter nulls
explicitly or use a correlated `NOT EXISTS`.


---

# R03 — `ANY` and `SOME`

`ANY` compares the left expression with every value returned by a one-column
subquery and succeeds when at least one comparison is true.

```sql
SELECT column1, column2
FROM table_name
WHERE column_name > ANY
(
    SELECT threshold
    FROM limits
);
```

Supported comparison operators commonly include:

```text
= ANY
> ANY
< ANY
>= ANY
<= ANY
<> ANY
```

`SOME` is a synonym for `ANY`:

```sql
x > SOME (subquery)
```

means the same as:

```sql
x > ANY (subquery)
```

## Relationship with `IN`

For equality:

```sql
x = ANY (subquery)
```

is equivalent in meaning to:

```sql
x IN (subquery)
```

`ANY` becomes especially useful with non-equality operators:

```sql
price < ANY
(
    SELECT competitor_price
    FROM CompetitorPrices
);
```

This is true when `price` is lower than at least one returned competitor price.

## Empty sets and NULLs

For an empty subquery:

```text
comparison ANY (empty set) -> false
```

There is no value that makes the comparison true.

When the subquery contains nulls:

```text
one true comparison
    -> true

no true comparison, but at least one unknown comparison
    -> unknown

all comparisons false and none unknown
    -> false
```

Therefore nullable subquery values should be handled deliberately when exact
boolean behavior matters.


---

# Comparison guide

| Intent | Preferred form |
|---|---|
| A related row must exist | `EXISTS` |
| No related row may exist | `NOT EXISTS` |
| Value belongs to a literal/small set | `IN` |
| Equality against subquery values | `IN` or `= ANY` |
| Non-equality succeeds for at least one subquery value | `<operator> ANY` |
| Alias for `ANY` | `SOME` |

The most important NULL rule is:

```text
EXISTS checks whether rows exist.
IN/ANY compare values and therefore participate in three-valued logic.
```
