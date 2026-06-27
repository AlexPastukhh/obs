# Final semantic transcript — assplitquery v001

Authoritative source: `source/assplitquery.svg`  
Coverage: **61 screenshots + 44 native SVG labels**

## 1. Single query and split query

A query with several `Include` collection branches normally becomes one joined SQL statement. EF reconstructs the object graph, but root and child data can be repeated in the flat rowset.

```csharp
var student = await context.Students
    .Include(x => x.Enrollments)
        .ThenInclude(x => x.Course)
    .Include(x => x.SportsEnrollments)
        .ThenInclude(x => x.Sport)
    .AsSplitQuery()
    .SingleAsync(x => x.Id == id);
```

Conceptually, split mode produces:

```text
query 1 -> root Student
query 2 -> Enrollments branch
query 3 -> SportsEnrollments branch
```

Reference navigations inside a collection branch may be joined into that branch query rather than creating another top-level round trip.

## 2. Cartesian explosion

Sibling collections multiply.

For one root with 10 enrollments and 6 sports enrollments:

```text
single-query rows ≈ 10 × 6 = 60
```

For 200 customers with 5 orders and 3 addresses:

```text
single query: 200 × 5 × 3 = 3,000 rows

split:
customers   200
orders    1,000
addresses   600
total     1,800 rows
```

The real cost also includes repeated wide root columns, database CPU, network transfer and EF materialization/fix-up.

## 3. Deep chains versus sibling branches

A pure chain:

```text
Customer -> Orders -> Items
```

does not cross-multiply two sibling branches. For 200 customers, 5 orders and 4 items:

```text
single joined result ≈ 200 × 5 × 4 = 4,000 rows
split total ≈ 200 + 1,000 + 4,000 = 5,200 rows
```

Split mode is therefore not automatically better for every deep chain.

When a deep branch has a sibling:

```text
Customer
  ├─ Orders -> Items
  └─ Addresses
```

the sibling multiplies the whole deep branch:

```text
200 × (5 × 4) × 3 = 12,000 rows
```

Two deep sibling branches can grow even faster.

## 4. Round trips and per-query overhead

Each split collection query adds:

```text
network round trip
command creation/execution
server query startup
resultset reading
client materialization and relationship fix-up
```

The overhead may be minor for a local database and significant for a remote/high-latency database.

## 5. Buffering

Most providers cannot keep several resultsets active on one connection. EF may buffer earlier split-query resultsets while later queries run and the graph is assembled.

SQL Server MARS can reduce this specific split-query buffering requirement. It does not eliminate buffering caused by retry support.

With retries enabled, memory can stack:

```text
split-query buffering
execution-strategy retry buffering
application ToListAsync buffering
```

## 6. Explicit loading

```csharp
var student = await context.Students.FindAsync(id);

await context.Entry(student)
    .Collection(x => x.Enrollments)
    .LoadAsync();

await context.Entry(student)
    .Collection(x => x.SportsEnrollments)
    .LoadAsync();
```

Both approaches issue several statements.

```text
AsSplitQuery
    EF controls a composed Include graph

Find + Load
    application decides which navigation to load and when
```

Explicit loading is useful for an already tracked root or conditional loading.

## 7. Consistency between statements

The database may change between split queries:

```text
query 1 loads root
another transaction modifies/deletes related rows
query 2 loads collection
```

The final graph may not represent one point-in-time snapshot. The same issue exists with manual `Find` plus `Load`.

Options:

- use one single query;
- wrap split loading in an appropriate snapshot/serializable transaction;
- project only the required data;
- accept the small consistency window for ordinary UI reads.

Stronger isolation can increase blocking/conflict cost.

## 8. Pagination

On affected EF Core versions, `Skip`/`Take` with split queries must use a fully unique ordering:

```csharp
query
    .OrderBy(x => x.CreatedAt)
    .ThenBy(x => x.Id)
    .Skip(offset)
    .Take(limit);
```

Check the documentation for the target EF Core version.

## 9. AutoInclude and projection

Use `IgnoreAutoIncludes()` when model-configured eager loading is unwanted.

Projection is often the first optimization when the full graph is unnecessary:

```csharp
var result = await context.Students
    .Where(x => x.Id == id)
    .Select(x => new StudentSummary
    {
        Id = x.Id,
        Name = x.Name,
        EnrollmentCount = x.Enrollments.Count
    })
    .SingleAsync();
```

## 10. Selection guide

```text
single query
    fewer round trips
    possible cartesian/row explosion

split query
    separate smaller rowsets
    more round trips and buffering

explicit loading
    maximum control
    several manually coordinated statements

projection
    best when only a subset/aggregate is needed
```

Prefer split queries for wide graphs with multiple collection branches. Prefer single query for small graphs or when one-statement consistency and low round-trip count matter.

## Coverage

```text
unique screenshots: 61
image uses: 61
native labels: 44
duplicate placements: 0
remaining image/text items: 0
```
