# Final semantic transcript — PAGING

Authoritative source: `source/PAGING.svg`  
Coverage: **24 unique screenshots / 24 placements + 43 native SVG labels**

---

# R01 — paging basics and resource parameters

## Why paging is required

Collection resources can grow very large. Returning the complete collection causes avoidable costs:

```text
large database reads
large response bodies
high memory use
long serialization time
slow clients and networks
```

Paging limits the amount of data returned per request.

Typical request:

```http
GET /api/authors?pageNumber=2&pageSize=10
```

`pageNumber` selects the requested page and `pageSize` controls the number of items per page.

## Resource-parameter object

A request model keeps paging, filtering, searching and sorting parameters together:

```csharp
public sealed class AuthorsResourceParameters
{
    private const int MaxPageSize = 20;
    private int _pageSize = 10;

    public string? MainCategory { get; set; }
    public string? SearchQuery { get; set; }
    public string? OrderBy { get; set; }

    public int PageNumber { get; set; } = 1;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize =
            value > MaxPageSize
                ? MaxPageSize
                : value;
    }
}
```

A production implementation should also reject or normalize values below one:

```text
pageNumber >= 1
1 <= pageSize <= MaxPageSize
```

A maximum page size prevents one client from bypassing paging by requesting an extremely large page.

## Page through the underlying data store

Apply paging before materialization:

```csharp
var collection = context.Authors
    .OrderBy(author => author.Id)
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize);
```

Then execute the query asynchronously.

Do not load the full table into memory and page afterward.

## Stable ordering

`Skip` and `Take` need deterministic ordering. The order should be unique or include a unique tie-breaker:

```csharp
query
    .OrderBy(author => author.Name)
    .ThenBy(author => author.Id);
```

Without stable ordering, records with equal sort values may move between pages.

---

# R02 — reusable `PagedList<T>`

## Purpose

A reusable page type combines:

```text
current page items
current page number
page size
total item count
total page count
HasPrevious
HasNext
```

Example shape:

```csharp
public sealed class PagedList<T> : List<T>
{
    public int CurrentPage { get; }
    public int TotalPages { get; }
    public int PageSize { get; }
    public int TotalCount { get; }

    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public PagedList(
        List<T> items,
        int count,
        int pageNumber,
        int pageSize)
    {
        TotalCount = count;
        PageSize = pageSize;
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(
            count / (double)pageSize);

        AddRange(items);
    }
}
```

`Math.Ceiling` rounds a partial final page upward:

```text
totalCount = 21
pageSize = 10
totalPages = 3
```

## Factory method

The source query is counted and then paged:

```csharp
public static async Task<PagedList<T>> CreateAsync<T>(
    IQueryable<T> source,
    int pageNumber,
    int pageSize)
{
    var count = await source.CountAsync();

    var items = await source
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    return new PagedList<T>(
        items,
        count,
        pageNumber,
        pageSize);
}
```

Repository method:

```csharp
public async Task<PagedList<Author>>
    GetAuthorsAsync(
        AuthorsResourceParameters parameters)
{
    var collection = context.Authors
        .AsNoTracking()
        .OrderBy(author => author.Id);

    return await PagedList<Author>.CreateAsync(
        collection,
        parameters.PageNumber,
        parameters.PageSize);
}
```

The same `PagedList<T>` can be reused for other collection resources.

## Count query and page query

The implementation normally performs two SQL queries:

```text
COUNT(*) for TotalCount
paged SELECT for current items
```

Between those statements the data can change. For ordinary API browsing this is usually acceptable. Strong point-in-time consistency requires a suitable transaction/isolation strategy and has additional cost.

## Out-of-range pages

A page number beyond `TotalPages` may produce an empty collection. The API should define whether that means:

```text
200 with an empty results array
404 for a nonexistent page
normalization to the last page
```

Whichever policy is chosen should be consistent and documented.

---

# R03 — pagination metadata and navigation links

## Metadata fields

Useful metadata includes:

```text
TotalCount
PageSize
CurrentPage
TotalPages
PreviousPageLink
NextPageLink
```

Example:

```csharp
var paginationMetadata = new
{
    authorsFromRepo.TotalCount,
    authorsFromRepo.PageSize,
    authorsFromRepo.CurrentPage,
    authorsFromRepo.TotalPages,
    PreviousPageLink = previousPageLink,
    NextPageLink = nextPageLink
};
```

At minimum, clients normally need previous/next links or enough information to construct navigation.

## Previous and next links

```csharp
var previousPageLink =
    authorsFromRepo.HasPrevious
        ? CreateAuthorsResourceUri(
            parameters,
            ResourceUriType.PreviousPage)
        : null;

var nextPageLink =
    authorsFromRepo.HasNext
        ? CreateAuthorsResourceUri(
            parameters,
            ResourceUriType.NextPage)
        : null;
```

URI type:

```csharp
public enum ResourceUriType
{
    PreviousPage,
    NextPage
}
```

The link generator changes only `pageNumber` and preserves the rest of the query contract:

```text
pageSize
fields
orderBy
mainCategory
searchQuery
```

Example:

```csharp
private string? CreateAuthorsResourceUri(
    AuthorsResourceParameters parameters,
    ResourceUriType type)
{
    return type switch
    {
        ResourceUriType.PreviousPage =>
            Url.Link("GetAuthors", new
            {
                fields = parameters.Fields,
                orderBy = parameters.OrderBy,
                pageNumber = parameters.PageNumber - 1,
                pageSize = parameters.PageSize,
                mainCategory = parameters.MainCategory,
                searchQuery = parameters.SearchQuery
            }),

        ResourceUriType.NextPage =>
            Url.Link("GetAuthors", new
            {
                fields = parameters.Fields,
                orderBy = parameters.OrderBy,
                pageNumber = parameters.PageNumber + 1,
                pageSize = parameters.PageSize,
                mainCategory = parameters.MainCategory,
                searchQuery = parameters.SearchQuery
            }),

        _ =>
            Url.Link("GetAuthors", new
            {
                fields = parameters.Fields,
                orderBy = parameters.OrderBy,
                pageNumber = parameters.PageNumber,
                pageSize = parameters.PageSize,
                mainCategory = parameters.MainCategory,
                searchQuery = parameters.SearchQuery
            })
    };
}
```

Previous and next pages must preserve sorting. Otherwise navigation can silently switch to another ordering and repeat or skip records.

## `X-Pagination` header

When the body remains a normal JSON collection, metadata can be returned in a custom response header:

```csharp
Response.Headers.Append(
    "X-Pagination",
    JsonSerializer.Serialize(paginationMetadata));

return Ok(mapper.Map<IEnumerable<AuthorDto>>(
    authorsFromRepo));
```

This keeps the resource representation as the collection while metadata travels separately.

Browser clients need the header exposed through CORS when requests are cross-origin:

```csharp
policy.WithExposedHeaders("X-Pagination");
```

## Metadata in the body

Another design is an envelope:

```json
{
  "results": [
    { "id": "..." }
  ],
  "metadata": {
    "currentPage": 2,
    "totalPages": 5,
    "previousPage": "...",
    "nextPage": "..."
  }
}
```

This is a different response representation from a bare collection. It should be documented as such and may justify its own media type/versioned contract.

## Link relations

Instead of custom fields only, pagination links can be represented through standard link relations:

```text
self
first
previous
next
last
```

The central rule remains the same: each generated URI must preserve all active filters, search terms, field selection, page size and ordering.

---

# Practical checklist

```text
[ ] enforce pageNumber >= 1
[ ] enforce a maximum page size
[ ] page in the database, not in memory
[ ] order deterministically before Skip/Take
[ ] include a unique tie-breaker in custom sorting
[ ] return total count/page count only when clients need them
[ ] preserve filter/search/sort fields in navigation links
[ ] do not produce previous or next links when unavailable
[ ] expose X-Pagination through CORS for browser clients
[ ] document whether metadata is in headers or a response envelope
[ ] define behavior for out-of-range pages
```

---

# Coverage

```text
unique embedded screenshots: 24
image uses: 24
native SVG labels: 43
duplicate extra placements: 0

processed image uses: 24
processed text labels: 43
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
