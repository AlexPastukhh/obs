# Final semantic transcript — FILTERING AND SEARCHING

Authoritative source: `source/FILTERING AND SEARCHING.svg`

# R01 — filtering and searching

Filtering narrows a collection by known fields and values:

```http
GET /api/authors?mainCategory=Fiction
GET /api/orders?status=Open&city=Berlin
```

Searching is broader and usually checks one search term across several fields:

```http
GET /api/authors?searchQuery=martin
```

Typical distinction:

```text
filter
    exact or structured conditions
    status, category, date range, tenant, owner

search
    free-text term
    matched across name, description, notes, etc.
```

Both belong in the query string because they alter which members of a collection are returned; they do not identify a different route.

# R02 — resource parameters and EF Core

When an endpoint has several optional query parameters, group them in a resource-parameter object:

```csharp
public sealed class AuthorsResourceParameters
{
    public string? MainCategory { get; init; }
    public string? SearchQuery { get; init; }
    public string? OrderBy { get; init; }
    public int PageNumber { get; init; } = 1;
    public int PageSize { get; init; } = 20;
}
```

Controller:

```csharp
[HttpGet]
public async Task<IActionResult> GetAuthors(
    [FromQuery] AuthorsResourceParameters parameters,
    CancellationToken cancellationToken)
{
    var authors = await repository.GetAuthorsAsync(
        parameters,
        cancellationToken);

    return Ok(authors);
}
```

`[FromQuery]` is important because this object describes URI query instructions, not a request body. Binding a GET parameter from the body can produce unexpected behavior and may lead to `415 Unsupported Media Type`.

Compose an `IQueryable` before executing it:

```csharp
IQueryable<Author> query = context.Authors
    .AsNoTracking();

if (!string.IsNullOrWhiteSpace(parameters.MainCategory))
{
    var category = parameters.MainCategory.Trim();

    query = query.Where(author =>
        author.MainCategory == category);
}

if (!string.IsNullOrWhiteSpace(parameters.SearchQuery))
{
    var search = parameters.SearchQuery.Trim();

    query = query.Where(author =>
        author.FirstName.Contains(search) ||
        author.LastName.Contains(search) ||
        author.MainCategory.Contains(search));
}

query = query
    .OrderBy(author => author.LastName)
    .ThenBy(author => author.Id);

var result = await query
    .Skip((parameters.PageNumber - 1) * parameters.PageSize)
    .Take(parameters.PageSize)
    .ToListAsync(cancellationToken);
```

The key is deferred execution: filtering, searching, sorting and paging are translated into one database query before `ToListAsync`.

Avoid:

```text
load all rows
then filter/search in memory
```

unless the collection is intentionally tiny.

# R03 — validation and safe query design

A query-parameter object is not the resource DTO. It contains instructions for retrieving a representation:

```text
resource DTO
    data returned to or accepted from clients

resource parameters
    filter, search, sort, paging and field-selection instructions
```

Validate dynamic fields and sorting against a whitelist. Never concatenate raw user-provided field names into SQL.

Example:

```csharp
private static readonly HashSet<string> AllowedOrderFields =
    new(StringComparer.OrdinalIgnoreCase)
    {
        "name",
        "mainCategory",
        "createdAt"
    };
```

If an unsupported field is requested, return a clear client error rather than silently applying unsafe or unpredictable behavior.

Search semantics should be documented:

```text
case sensitivity
culture/collation
contains versus prefix matching
wildcard escaping
tokenization/full-text behavior
maximum search length
```

For large or advanced search payloads, use a dedicated search request endpoint:

```http
POST /api/authors/search
```

but keep ordinary filters in `GET` query parameters.

# Checklist

```text
[ ] use query parameters for collection filters
[ ] distinguish structured filtering from free-text search
[ ] bind parameter objects with FromQuery
[ ] compose IQueryable before materialization
[ ] apply stable ordering before paging
[ ] whitelist dynamic sorting and field selection
[ ] document case/collation and matching semantics
[ ] cap page size and search-term length
```


# Coverage

```text
unique embedded screenshots: 12
image uses: 12
native SVG labels: 6
duplicate extra placements: 0

processed image uses: 12
processed text labels: 6
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
