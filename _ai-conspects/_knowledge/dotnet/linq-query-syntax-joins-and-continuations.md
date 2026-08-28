# LINQ query syntax, joins, and continuations

Knowledge ID: `dotnet.linq-query-syntax-joins-and-continuations`

Topic: `dotnet`

LINQ query expressions are compiler syntax over LINQ operators. `from` introduces a range variable, `where` filters it, and `select` defines the result shape:

```csharp
var query =
    from item in source
    where Predicate(item)
    select Projection(item);

var equivalent = source
    .Where(item => Predicate(item))
    .Select(item => Projection(item));
```

Query syntax is often easier to read for several joins or range variables. Method syntax is often clearer for short pipelines and operators without a query-expression keyword.

## Inner join and group join

`join ... on ... equals ...` produces inner-join pairs. Adding `into` captures all inner matches for the current outer element as a sequence:

```csharp
var grouped =
    from customer in customers
    join order in orders
        on customer.Id equals order.CustomerId
        into customerOrders
    select new { Customer = customer, Orders = customerOrders };
```

`customerOrders` is the group of matched orders, not one `order`. `into` can also continue after `select` or `group`, making that result the new range variable for later clauses.

## Left join pattern

Query syntax builds a left join from a group join, `DefaultIfEmpty`, and a second `from`:

```csharp
var leftJoin =
    from customer in customers
    join order in orders
        on customer.Id equals order.CustomerId
        into customerOrders
    from order in customerOrders.DefaultIfEmpty()
    select new
    {
        Customer = customer,
        Order = order
    };
```

The sequence is important:

```text
group matching inner elements
-> turn an empty group into one default element
-> flatten with the second from
-> project an outer item plus a possibly-null/default inner item
```

Projection must account for the missing inner side. Multiple `from` clauses flatten/navigate a sequence in a `SelectMany`-like shape. They introduce another range variable; they do not create the grouped continuation that `join ... into`, `group ... into`, or `select ... into` creates.

## What should be recallable

- How `from`/`where`/`select` correspond to method syntax.
- Inner join versus `join ... into` grouped matches.
- The four-stage left-join pattern and nullable inner result.
- Multiple `from` flattening versus an `into` continuation.

## Sources

- Workspace: `_ai-conspects/linq-query-syntax/`
- Authoritative processed source: `regions/R01R02R03-linq-query-syntax-final.md`, R01-R03
- Original SVG: `source/linq-query-syntax.svg`
