# Final semantic transcript — ROUTING, ROUTE DESIGN, RESOURCES

Authoritative source: `source/ROUTING,ROUTE DESIGN, RESOURCES,ROUTING ALL GOOD PRACT IN GENERAL EXPLAINED.svg`  
Coverage: **19 unique screenshots / 19 placements + 4 native SVG labels**

---

# R01 — quick rules and controller shapes

## Resource-oriented routes use nouns

Prefer resource collections and resource identities:

```http
GET  /api/clients
GET  /api/clients/{clientId}
POST /api/clients

GET  /api/requests
GET  /api/requests/{requestId}
POST /api/requests
```

Avoid RPC-style action names when the endpoint is ordinary CRUD:

```http
GET  /api/getClient?id=10
POST /api/createRequest
POST /api/doApproveRequest
```

Noun-based routes produce a smaller, more predictable vocabulary and map naturally to HTTP methods.

## Canonical identity route

A single resource should have one stable identity URL:

```http
GET /api/clients/{clientId}
```

Alternate lookup methods are useful, but they should normally resolve to the same canonical identity:

```http
GET /api/clients/by-email/{email}
```

Possible responses:

```text
200 with the resource and canonical self link
302/307 redirect to /api/clients/{clientId}
```

The canonical identity improves:

```text
link generation
cache keys
bookmarking
API documentation
client-side identity maps
```

## Client controller example

```csharp
[ApiController]
[Route("api/clients")]
public sealed class ClientsController : ControllerBase
{
    [HttpGet]
    public IActionResult List(
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
        => Ok();

    [HttpGet("{clientId:guid}", Name = "GetClient")]
    public IActionResult Get(Guid clientId)
        => Ok();

    [HttpPost]
    public IActionResult Create(
        [FromBody] CreateClientDto dto)
        => CreatedAtRoute(
            "GetClient",
            new { clientId = Guid.NewGuid() },
            value: null);

    [HttpPatch("{clientId:guid}")]
    public IActionResult Update(
        Guid clientId,
        [FromBody] UpdateClientDto dto)
        => NoContent();

    [HttpDelete("{clientId:guid}")]
    public IActionResult Delete(Guid clientId)
        => NoContent();
}
```

Use the route constraint when the identifier type is known:

```text
{clientId:guid}
{id:int}
```

This prevents ambiguous route matches and documents the path contract.

## Nested routes for subordinate resources

A nested route is appropriate when the child is meaningfully scoped by the parent:

```http
GET  /api/clients/{clientId}/requests
POST /api/clients/{clientId}/requests
GET  /api/clients/{clientId}/requests/{requestId}
```

Example:

```csharp
[ApiController]
[Route("api/clients/{clientId:guid}/requests")]
public sealed class ClientRequestsController : ControllerBase
{
    [HttpGet("{requestId:guid}", Name = "GetClientRequest")]
    public IActionResult Get(
        Guid clientId,
        Guid requestId)
        => Ok();

    [HttpPost]
    public IActionResult Create(
        Guid clientId,
        [FromBody] CreateRequestDto dto)
        => CreatedAtRoute(
            "GetClientRequest",
            new
            {
                clientId,
                requestId = Guid.NewGuid()
            },
            value: null);
}
```

The query must enforce the parent-child relation:

```csharp
var request = db.Requests.SingleOrDefault(
    request =>
        request.ClientId == clientId &&
        request.Id == requestId);
```

Do not merely accept `clientId` in the route and then fetch only by `requestId`.

## Specialized operations

A non-CRUD business command may use a dedicated endpoint:

```http
POST /api/requests/{requestId}/approve
POST /api/requests/{requestId}/cancel
```

Example:

```csharp
[HttpPost("{requestId:guid}/approve")]
public IActionResult Approve(Guid requestId)
    => NoContent();

[HttpPost("{requestId:guid}/cancel")]
public IActionResult Cancel(Guid requestId)
    => NoContent();
```

A command endpoint is justified when the operation has business meaning, validation, side effects, authorization or auditing beyond a simple field assignment.

## Search and bulk

Filtering and simple search belong in query parameters:

```http
GET /api/requests?status=Open&city=Berlin&page=2
```

When the search expression or payload is too large or complex for a URL:

```http
POST /api/requests/search
```

For batch creation or commands:

```http
POST /api/requests/bulk
```

Do not encode hundreds of IDs or sensitive complex filters into the query string.

---

# R02 — deeper route-design reasoning

## One identity, many lookup helpers

These may identify the same client:

```http
GET /api/clients/10
GET /api/clients/by-email/alex@example.com
GET /api/clients/by-external-id/abc
```

Only one should be the canonical identity. Lookup helpers are alternate discovery routes, not new identities for the same resource.

A response can expose:

```json
{
  "id": "10",
  "name": "Alex",
  "_links": {
    "self": "/api/clients/10"
  }
}
```

## Why multiple official URLs are costly

When the same resource is considered canonical at several URLs:

```text
cache entries split
bookmarks diverge
self links become inconsistent
generated clients cannot choose a stable identity
authorization and observability rules become harder to reason about
```

Choose one canonical route and make alternate lookups return or redirect to it.

## Nesting only when scope matters

Bad nesting:

```http
GET /api/clients/10/requests/999
```

when request `999` may belong to a different client and the implementation ignores `clientId`.

This is dangerous because:

```text
the URL implies containment that is not enforced
security checks may be bypassed
the route carries decorative information
clients can receive a resource from another parent
```

Good options:

```text
globally unique request identity
    GET /api/requests/{requestId}

parent-scoped request identity
    GET /api/clients/{clientId}/requests/{requestId}
    with both identifiers enforced
```

Nested routes are especially useful when the parent defines a security, tenant or business boundary.

## Query strings for filtering, sorting and paging

Prefer:

```http
GET /api/requests
    ?status=Open
    &city=Berlin
    &page=2
    &sort=-createdAt
```

Avoid route templates for every filter combination:

```http
GET /api/requests/status/Open/page/2
GET /api/requests/byStatus/Open/byCity/Berlin
```

Query parameters are better because filters are optional and combinable without route-template explosion.

Common query concerns:

```text
filter
search
sort
page
pageSize
field selection
```

## Command endpoints versus fake updates

A business operation should not be hidden as a fake property update merely to look REST-like:

```http
PUT /api/requests/{id}
{
  "status": "Approved"
}
```

When approval has domain rules, actor identity, side effects, notification or audit requirements, use:

```http
POST /api/requests/{id}/approve
```

For a purely idempotent state transition, a specifically documented `PUT` or `PATCH` may also be reasonable. The important part is that the endpoint contract reflects the domain semantics.

## POST for complex computation and bulk operations

GET is unsuitable when the request requires:

```text
large lists of identifiers
large structured filters
sensitive data that should not appear in URLs/logs
payloads beyond practical URL limits
complex validation
batch creation
```

Use:

```http
POST /api/requests/search
POST /api/requests/bulk
```

These remain resource-oriented when the endpoint represents a search request, batch request or command resource.

---

# R03 — clarifications and boundary rules

## Lookup helper versus canonical URL

A lookup helper answers:

```text
How can I find this resource by an alternate key?
```

The canonical route answers:

```text
What is this resource's stable API identity?
```

Recommended pattern:

```http
GET /api/clients/by-email/{email}
```

Then either:

```text
return the resource with self = /api/clients/{clientId}
```

or:

```text
redirect to /api/clients/{clientId}
```

## Global child identity

When a request ID is globally unique and the parent is not needed for authorization or correctness:

```http
GET /api/requests/{requestId}
```

is simpler than:

```http
GET /api/clients/{clientId}/requests/{requestId}
```

The nested form is misleading when the parent ID is ignored.

## Parent-scoped identity and security

Keep the nested form when the parent must be checked:

```csharp
var request = db.Requests.SingleOrDefault(
    request =>
        request.ClientId == clientId &&
        request.Id == requestId);
```

This is appropriate when the parent determines:

```text
tenant
owner
security boundary
aggregate boundary
collection membership
```

In short:

```text
nest when the business or security boundary is the parent
do not nest merely because two entities are related
```

## Route-design checklist

```text
[ ] use plural nouns for collections
[ ] keep one canonical identity route per resource
[ ] treat alternate keys as lookup helpers
[ ] use route constraints for typed identifiers
[ ] nest only when the parent scope is meaningful and enforced
[ ] use query parameters for optional filters, sorting and paging
[ ] use dedicated command endpoints for domain operations
[ ] use POST search/bulk endpoints for large structured payloads
[ ] use CreatedAtRoute/Location for newly created resources
[ ] preserve stable self links and canonical URLs
[ ] avoid verb-heavy RPC routes for ordinary CRUD
[ ] avoid decorative parent IDs that the query ignores
```

---

# Coverage

```text
unique embedded screenshots: 19
image uses: 19
native SVG labels: 4
duplicate extra placements: 0

processed image uses: 19
processed text labels: 4
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
