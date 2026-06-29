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
