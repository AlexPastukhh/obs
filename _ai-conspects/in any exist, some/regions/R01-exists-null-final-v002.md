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
