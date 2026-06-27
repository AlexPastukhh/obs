# Final semantic transcript — Creation requests, POST, Location and CreatedAt

Authoritative source: `source/CREATION REQUEST,POST REQUEST,LOCACTION HEADER,CREATED AT.svg`  
Coverage: **19 unique screenshots / 19 placements + 17 native SVG labels**

---

# R01 — single-resource creation and `201 Created`

## Expected HTTP response

A synchronous create endpoint normally returns:

```text
201 Created
Location: URI of the newly created resource
optional response body containing the created representation
```

The `Location` header should identify a URI where the client can retrieve the new resource.

Example:

```csharp
[HttpPost]
public async Task<ActionResult<WidgetDto>> Create(
    CreateWidgetDto dto)
{
    var widget = new Widget
    {
        Name = dto.Name,
        CreatedAt = DateTime.UtcNow
    };

    db.Widgets.Add(widget);
    await db.SaveChangesAsync();

    var result = MapToDto(widget);

    return CreatedAtAction(
        nameof(GetById),
        new { id = widget.Id },
        result);
}
```

`SaveChangesAsync` must complete before constructing the route values when the database generates the identifier.

## `CreatedAtAction`

```csharp
return CreatedAtAction(
    nameof(GetById),
    new { id = widget.Id },
    resultDto);
```

This produces:

```text
status: 201 Created
Location: URL generated for GetById
body: resultDto
```

The referenced GET action must have a compatible route:

```csharp
[HttpGet("{id}", Name = "GetWidget")]
public async Task<ActionResult<WidgetDto>> GetById(int id)
{
    var widget = await db.Widgets.FindAsync(id);

    if (widget is null)
        return NotFound();

    return Ok(MapToDto(widget));
}
```

## `CreatedAtRoute`

When the GET route is named:

```csharp
[HttpGet("{id}", Name = "GetWidget")]
```

the create action can use:

```csharp
return CreatedAtRoute(
    "GetWidget",
    new { id = widget.Id },
    resultDto);
```

Use `nameof` where possible so renaming the action does not silently break URI generation.

## Other helpers

When the URI is already known:

```csharp
return Created(uri, resultDto);
```

`CreatedAtAction` and `CreatedAtRoute` are usually preferable when the URI should be generated from application routing.

---

# R02 — creating collections and choosing a `Location`

## There is no universal collection rule

When one request creates several resources, one `Location` header cannot naturally point at several independent item URIs.

Common choices are:

```text
return a collection/subset URI
return a bulk-operation resource URI
return the created items in the body with per-item self links
```

## Collection endpoint with route identifiers

A real GET endpoint may accept a set of identifiers:

```csharp
[HttpGet("by-ids/{ids}", Name = "GetOrdersByIdsPath")]
public ActionResult<IReadOnlyList<OrderDto>>
    GetByIds(string ids)
{
    var parsedIds = ids
        .Split(',', StringSplitOptions.RemoveEmptyEntries)
        .Select(Guid.Parse)
        .ToArray();

    // load and return matching resources
}
```

The create endpoint can return:

```csharp
return CreatedAtRoute(
    "GetOrdersByIdsPath",
    new { ids = string.Join(",", createdIds) },
    response);
```

Resulting conceptually in:

```text
Location: /api/orders/by-ids/1,2,3
```

This must point to an actual GET endpoint, not an invented URI that the API cannot resolve.

## Query-string collection endpoint

An alternative is:

```csharp
[HttpGet("by-ids", Name = "GetOrdersByIdsQuery")]
public ActionResult<IReadOnlyList<OrderDto>>
    GetByIds([FromQuery] Guid[] ids)
{
    // load and return matching resources
}
```

Then:

```csharp
var location = linkGenerator.GetUriByRouteValues(
    httpContext,
    "GetOrdersByIdsQuery",
    new { ids = createdIds });

return Created(location!, response);
```

The exact query representation depends on model binding and link generation. Test the generated URI rather than assuming array route-value serialization.

## Response body with per-item links

A practical synchronous bulk response can contain the collection URI and one self link per created item:

```csharp
public sealed class CreatedItemDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = "";
    public string Self { get; init; } = "";
}

public sealed class BulkCreateResponse
{
    public string CollectionLink { get; init; } = "";
    public List<CreatedItemDto> Items { get; init; } = [];
}
```

Then:

```csharp
return Created(collectionLink, response);
```

This provides:

```text
one canonical Location header
body containing all created items
per-item self links for direct retrieval
```

## Best ordering of approaches

A sensible preference order is:

```text
1. real batch/collection resource with its URI in Location
2. real collection-query URI containing created IDs
3. collection URI plus per-item links in the response body
4. comma-separated IDs in a route segment only when clearly justified
```

The chosen URI must be stable, resolvable and documented.

---

# R03 — bulk creation and operation resources

## Synchronous bulk creation

When the server completes all creates before responding, a common response is:

```text
201 Created
Location: collection/subset or batch-result URI
body: created items and per-item links
```

A synchronous implementation can return partial failures only if the contract defines them clearly. Otherwise transactional all-or-nothing behavior is simpler.

## Asynchronous bulk creation

When the work may take time, create an operation resource:

```http
POST /authors/bulk
```

Response:

```http
202 Accepted
Location: /bulk-operations/{operationId}
```

The operation resource is the thing created immediately. Its URI belongs in `Location`.

Example operation model:

```text
operationId
status
submittedAt
startedAt
completedAt
totalCount
succeededCount
failedCount
items
errors
```

Possible statuses:

```text
Queued
Running
Succeeded
Failed
PartiallySucceeded
```

## Polling flow

```text
1. client submits the bulk request
2. server stores an operation record
3. server returns 202 + operation Location
4. client polls the operation resource
5. operation response exposes progress and final resource IDs/links
```

Example:

```http
GET /bulk-operations/{operationId}
```

Final body may include:

```json
{
  "status": "Succeeded",
  "totalCount": 3,
  "succeededCount": 3,
  "failedCount": 0,
  "items": [
    {
      "inputIndex": 0,
      "resourceId": "…",
      "location": "/authors/…"
    }
  ]
}
```

## `201` versus `202`

Use:

```text
201 Created
    creation completed during the request
    newly created resource or batch result is available now

202 Accepted
    request accepted but processing continues asynchronously
    Location identifies an operation/status resource
```

Do not return `201` for unfinished background work merely because the request was accepted.

## Bulk endpoint design

Bulk endpoints are often necessary even though they require explicit design decisions:

```text
transactional versus partial success
idempotency
duplicate handling
validation strategy
operation cancellation
retry behavior
result retention
per-item correlation identifiers
```

A clean API gives the bulk request or operation a first-class resource instead of inventing a URI that does not represent anything retrievable.

---

# Practical checklist

```text
[ ] return 201 only after synchronous creation is complete
[ ] include Location for the created resource or result resource
[ ] make every Location URI resolvable by a real GET endpoint
[ ] use CreatedAtAction/CreatedAtRoute when routing can generate the URI
[ ] save before building route values for database-generated IDs
[ ] for multiple resources, prefer a real collection/batch URI
[ ] include per-item self links when one header cannot express all resources
[ ] use 202 Accepted for asynchronous bulk processing
[ ] point 202 Location to an operation/status resource
[ ] define partial-success and error semantics explicitly
```

---

# Coverage

```text
unique embedded screenshots: 19
image uses: 19
native SVG labels: 17
duplicate extra placements: 0

processed image uses: 19
processed text labels: 17
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
