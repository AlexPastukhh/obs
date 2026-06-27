# Regional transcript — R01: N+1, IQueryable versus IEnumerable and eager loading

Conspect: `lazy loading`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 15 / 15
unique screenshots represented: 15
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The first road separates query translation from in-memory execution. As long as the pipeline remains `IQueryable`, EF Core can compose one SQL query. After materialization or conversion to `IEnumerable`, later work runs in memory and navigation access may trigger N+1 queries.

## Query pipeline

- `IQueryable<T>` stores an expression tree that EF Core can translate.
- Operators such as `Where`, `Select`, `OrderBy` and aggregate projections should stay before `ToListAsync` when they must execute in SQL.
- `ToList`, `ToListAsync`, `AsEnumerable` or a non-translatable custom method ends or interrupts server translation.
- Modern EF Core normally throws when unsupported expressions appear outside the final client projection instead of silently evaluating an expensive query on the client.

## N+1 pattern

- The first query loads N parents.
- Accessing an unloaded collection once per parent issues N additional queries.
- For 100 orders, one parent query plus 100 item queries means 101 database round trips.
- Projection can calculate counts or totals in the original SQL without loading each collection.

## Preferred query shapes

- Use `Include` when the application truly needs the related entity graph.
- Use projection for DTOs, counts and totals; it usually selects less data.
- Use `AsSplitQuery` when one large join would cause cartesian explosion, while accepting multiple intentional round trips.
- Indexes still matter: one well-shaped query can remain slow if filters or joins are not indexed.

## Client-evaluation traps

- Calling an arbitrary C# method inside `Where` cannot be translated unless the method is mapped or its logic is expressed with supported operations.
- Regex and culture-specific APIs may lack SQL translations; use provider-supported functions such as `EF.Functions.Like` where appropriate.
- Creating a custom object and then filtering on it should usually be rewritten as an anonymous/scalar projection until after materialization.

## Representative pattern

```csharp
var result = await context.Orders
    .Where(o => o.Status == OrderStatus.Open)
    .Select(o => new OrderSummaryDto
    {
        Id = o.Id,
        ItemCount = o.Items.Count,
        Total = o.Items.Sum(i => i.Price * i.Quantity)
    })
    .ToListAsync();
```

## Caveats

- A projection that touches a navigation is not automatically lazy loading; EF can translate it into SQL.
- N+1 occurs when navigation access happens after materialization and the navigation is loaded separately for each entity.

## Source labels

- `basically its still iqueryable and thats why ef can build`
- `normal query for one roundtrip or for 2`
- `when its ienumerable and you iterate, then you iterate in memory`
- `and n + 1 happens`
- `n + 1 problem`

## Covered text elements

```text
T-001, T-002, T-003, T-004, T-008
```

## Covered screenshot uses

```text
IU-014, IU-015, IU-022, IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032
IU-033, IU-034
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
