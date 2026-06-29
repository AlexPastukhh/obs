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
