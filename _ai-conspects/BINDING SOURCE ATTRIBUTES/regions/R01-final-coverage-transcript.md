# BINDING SOURCE ATTRIBUTES — final coverage transcript v001

Source SVG: `BINDING SOURCE ATTRIBUTES(1).svg`  
Conspect folder: `BINDING SOURCE ATTRIBUTES`  
Stage: combined ten-conspect final coverage

## R01 — explicit ASP.NET Core model-binding sources

Binding source attributes state where an action parameter or property must come from:

```text
[FromBody]     request body through an input formatter, commonly JSON
[FromForm]     form-urlencoded or multipart/form-data; used for IFormFile
[FromHeader]   an HTTP request header
[FromQuery]    query-string values
[FromRoute]    route values from the matched URL template
[FromServices] dependency injection rather than request data
```

Example:

```csharp
[HttpGet("{authorId}", Name = "GetAuthor")]
public Task<ActionResult<AuthorDto>> GetAuthor(
    [FromRoute] Guid authorId) { ... }

[HttpPost]
public Task<ActionResult<AuthorDto>> CreateAuthor(
    [FromBody] AuthorForCreationDto author) { ... }
```

A parameter can also specify an external name:

```csharp
public IActionResult Get([FromHeader(Name = "X-Correlation-Id")] string id)
```

### `[ApiController]` inference

With `[ApiController]`, common inference rules reduce the need for explicit attributes:

```text
- complex DTO/class parameter → usually [FromBody];
- IFormFile/IFormFileCollection → [FromForm];
- parameter name matching a route token → [FromRoute];
- other simple values → [FromQuery].
```

Use an explicit attribute when the source is ambiguous or when the API contract should be obvious to readers and OpenAPI tooling.

Only one body-bound parameter should normally consume the request body because the body is a forward-only stream read by the input formatter. Combine several body values into one DTO.

`[FromForm]` is required for multipart file/form submissions, not JSON. `[FromServices]` should contain services, not user input. Binding selects and converts input; validation happens after binding and authorization is a separate concern.

## Coverage

```text
R01 processed image uses: 3
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
