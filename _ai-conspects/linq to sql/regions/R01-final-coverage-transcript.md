# linq to sql — final coverage transcript v001

Source SVG: `linq to sql.svg`  
Conspect folder: `linq to sql`  
Stage: combined ten-conspect final coverage

## R01 — EF Core LINQ translation, joins, APPLY and query-shape reasoning

EF Core receives a LINQ expression tree and attempts to translate the server-side portion into SQL. The most useful habit is to inspect the generated SQL instead of assuming that similar-looking LINQ expressions produce the same query shape.

Useful checks:

```csharp
var query = context.Blogs.Where(x => x.IsActive);
var sql = query.ToQueryString();
```

Command logging and the database execution plan complete the picture: `ToQueryString()` shows the SQL shape, while logs and plans show parameters, round trips, indexes and actual cost.

### Server translation and unsupported expressions

A query must be expressed in constructs supported by the provider. Arbitrary .NET methods, custom comparers, unsupported overloads and some collection operations cannot be translated. Keep server filtering and projection inside the translatable query. Deliberately crossing to `AsEnumerable()` or materializing with `ToListAsync()` means that later operations run in memory and may pull far more data than expected.

Provider support matters. A query translated by SQL Server may fail or take another shape on SQLite or another provider, especially around `APPLY`.

### `Include`, relationship optionality and global query filters

`Include` expresses eager loading, not a promise of one specific SQL join. EF chooses SQL based on relationship metadata and query shape.

A required reference relationship can result in an inner join. An optional reference commonly permits a left join. With a required navigation, a global query filter on the related entity can remove the related row and therefore also remove the outer entity through the inner join. This is the common “lost parent rows” trap.

Mitigations depend on the model:

```text
- make the relationship optional when absence is valid;
- use matching filters on both sides when the domain requires it;
- use IgnoreQueryFilters() only when bypassing filters is intentional;
- inspect generated SQL whenever a required navigation has a filter.
```

Collection navigations do not have exactly the same row-loss behavior because the outer entity can still exist with an empty collection.

### Inner join

Query syntax:

```csharp
var q =
    from product in context.Products
    join order in context.Orders
        on product.Id equals order.ProductId
    select new { product.Name, order.Id };
```

This translates to an `INNER JOIN ... ON ...` shape. Rows without a match are removed.

### Left join

Classic LINQ uses a group join followed by `DefaultIfEmpty()`:

```csharp
var q =
    from product in context.Products
    join order in context.Orders
        on product.Id equals order.ProductId into orders
    from order in orders.DefaultIfEmpty()
    select new
    {
        Product = product.Name,
        OrderId = order == null ? null : order.Id
    };
```

A correlated collection selector with a `Where(...)` followed by `DefaultIfEmpty()` is another left-join pattern. Without `DefaultIfEmpty()`, the corresponding correlated `Where` pattern is normally an inner join.

Be careful with predicates placed after the left join. A predicate that rejects null right-side rows can turn the effective result back into inner-join behavior. Null-preserving conditions must be written deliberately.

### Cross join, `CROSS APPLY` and `OUTER APPLY`

Multiple `from` clauses with no correlation produce a Cartesian product (`CROSS JOIN`).

When the inner expression references the outer row outside a simple join predicate, SQL Server may use `CROSS APPLY`. Adding `DefaultIfEmpty()` may produce `OUTER APPLY`.

`APPLY` is useful for correlated work such as:

```text
- top N children per parent;
- a correlated projection;
- a table-valued function or subquery evaluated per outer row;
- selecting a narrow correlated result without first constructing a wide join result.
```

It is not automatically faster. The important point is that it represents a different relational shape and may not be supported by every provider.

### Practical checklist

```text
1. Keep filters/projections server-translatable.
2. Inspect ToQueryString() for non-trivial queries.
3. Treat Include as loading intent, not as “equals JOIN”.
4. Recheck required navigations combined with query filters.
5. Use group join + DefaultIfEmpty for a left join.
6. Do not place a null-rejecting predicate after a left join by accident.
7. Distinguish CROSS JOIN, JOIN and APPLY by whether/how the inner side references the outer row.
8. Materialize or use AsEnumerable only when client-side processing is intentional.
```

## Coverage

```text
R01 processed image uses: 2
R01 processed text labels: 60
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
