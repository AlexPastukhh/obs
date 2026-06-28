# Final semantic transcript — SQL Server pagination with `OFFSET`, `FETCH` and `TOP`

Authoritative source: `source/pagination offset take.svg`  
Coverage: **10 unique screenshots / 10 placements + 2 native SVG labels**

---

# R01 — `OFFSET` and `FETCH`

SQL Server pagination uses `ORDER BY` with `OFFSET` and optional `FETCH`:

```sql
SELECT
    product_id,
    product_name,
    price
FROM dbo.Products
ORDER BY
    price DESC,
    product_id ASC
OFFSET @offset ROWS
FETCH NEXT @pageSize ROWS ONLY;
```

Meaning:

```text
OFFSET n ROWS
    skip the first n ordered rows

FETCH NEXT m ROWS ONLY
    return at most the next m rows
```

For the first page, use:

```sql
OFFSET 0 ROWS
FETCH NEXT @pageSize ROWS ONLY
```

`FETCH FIRST` and `FETCH NEXT` are grammar alternatives after `OFFSET`; `NEXT` often reads more naturally for pagination.

A deterministic order needs a unique tie-breaker. Ordering only by a non-unique column can move rows between pages.

---

# R02 — `TOP`, `PERCENT` and `WITH TIES`

For a simple first-N query:

```sql
SELECT TOP (10)
    *
FROM dbo.Products
ORDER BY price DESC;
```

Percentage:

```sql
SELECT TOP (10) PERCENT
    *
FROM dbo.Customers
ORDER BY customer_id;
```

Include rows tied with the last selected ordering value:

```sql
SELECT TOP (5) WITH TIES
    product_name,
    price
FROM dbo.Products
ORDER BY price DESC;
```

`WITH TIES` can return more than N rows and requires meaningful `ORDER BY`.

Use `TOP` for a first-N result. Use `OFFSET/FETCH` when a skipped-row offset is part of the query.

---

# R03 — dialect differences and examples

SQL Server does not use MySQL/PostgreSQL `LIMIT` syntax.

Equivalent ideas:

```text
LIMIT 10
    TOP (10)
    or OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY

LIMIT 10 OFFSET 5
    OFFSET 5 ROWS FETCH NEXT 10 ROWS ONLY
```

Second distinct salary:

```sql
SELECT DISTINCT salary
FROM dbo.Employee
ORDER BY salary DESC
OFFSET 1 ROW
FETCH NEXT 1 ROW ONLY;
```

The `DISTINCT` removes duplicate salary values before the ordered offset is applied.

Parameterize both offset and page size and validate that they are non-negative and bounded.

---

# R04 — deep pages and keyset pagination

Large offsets can become expensive because the database still has to locate and skip many ordered rows.

Keyset pagination uses the last seen ordering key:

```sql
SELECT TOP (@pageSize)
    product_id,
    price,
    product_name
FROM dbo.Products
WHERE
    price < @lastPrice
    OR (
        price = @lastPrice
        AND product_id > @lastId
    )
ORDER BY
    price DESC,
    product_id ASC;
```

Keyset pagination is often better for deep scrolling and changing datasets, but it does not support arbitrary page-number jumps as directly.

Index columns used by the filter and `ORDER BY`. Pagination correctness depends on a stable, deterministic sort order.

---

# Coverage

```text
unique embedded screenshots: 10
image uses: 10
native SVG labels: 2
duplicate extra placements: 0

processed image uses: 10
processed text labels: 2
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
