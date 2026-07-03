# FULL CONTENT NEG + VALIDATION FLOW — corrected study transcript v002

Generated: 2026-07-03

## Why this replaces the old authoritative transcript

The previous result correctly identified the eight broad topics, but it compressed:

```text
554 native text elements
143 unique screenshots
144 screenshot placements
```

into a short semantic overview. It also deferred exact code to a raw SVG path that is absent from the current repository branch.

This v002 result separates three layers:

1. **Exact source:** the uploaded SVG and extracted PNG files.
2. **Exact native text:** `11-exact-canvas-text-transcript-v002.md`.
3. **Corrected study model:** this file.

No screenshot OCR is invented.

# 1. End-to-end request and response decision flow

Keep these questions separate:

```text
1. Is the request syntactically valid?
2. Can the request have a body?
3. If a body exists, is Content-Type valid and supported?
4. Which endpoint and action are candidates?
5. Can an input formatter deserialize the body?
6. What representation does the client accept?
7. Can an output formatter produce that representation?
8. How is every failure serialized?
```

A useful status map:

| Situation | Typical status |
|---|---:|
| malformed header or malformed request syntax | 400 |
| no matching route/resource | 404 |
| route exists, HTTP method not allowed | 405 |
| valid `Accept`, but no producible representation | 406 |
| valid request `Content-Type`, but no supported input representation | 415 |
| unhandled server error | 500 |

Important distinction:

```text
invalid syntax != valid but unsupported
```

For example:

```text
malformed Accept list -> 400 when explicitly validated
valid Accept with no formatter match -> 406
```

# 2. MVC content negotiation and formatters

ASP.NET Core MVC uses:

- **input formatters** for request-body deserialization;
- **output formatters** for response serialization.

These lists are independent.

Basic output-negotiation setup:

```csharp
builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
    options.RespectBrowserAcceptHeader = true;
});
```

`ReturnHttpNotAcceptable = true` means that an explicit, valid `Accept` request that cannot be satisfied produces `406` instead of silently falling back to the first formatter.

`RespectBrowserAcceptHeader` is a separate browser-specific choice.

System.Text.Json configuration belongs to:

```csharp
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });
```

Newtonsoft.Json configuration belongs to:

```csharp
builder.Services
    .AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver =
            new DefaultContractResolver();
    });
```

Do not combine old Newtonsoft extension methods with System.Text.Json formatter assumptions without checking which formatter is actually registered.

XML support is explicit:

```csharp
builder.Services
    .AddControllers()
    .AddXmlSerializerFormatters();
```

## Vendor JSON media types

A vendor media type can be added to a JSON formatter when the same serializer is able to produce that representation.

Conceptual pattern:

```csharp
builder.Services.Configure<MvcOptions>(options =>
{
    var json = options.OutputFormatters
        .OfType<SystemTextJsonOutputFormatter>()
        .First();

    json.SupportedMediaTypes.Add(
        "application/vnd.marvin.hateoas+json");
});
```

For Newtonsoft.Json, select the Newtonsoft output formatter instead.

Metadata does not create formatter support:

```text
[Produces] / [Consumes] metadata
does not magically register JSON, XML, or a custom serializer
```

# 3. Produces, Consumes, and their boundaries

`[Produces]` concerns response formats.

Example:

```csharp
[Produces("application/json")]
```

`[Consumes]` concerns request `Content-Type` and also participates in MVC action selection.

Example:

```csharp
[HttpPost]
[Consumes("application/json")]
public IActionResult CreateJson(CreateAuthorDto dto)
{
    return Ok();
}
```

A second action can share route and method but accept XML:

```csharp
[HttpPost]
[Consumes("application/xml")]
public IActionResult CreateXml(CreateAuthorDto dto)
{
    return Ok();
}
```

Two gates remain:

```text
1. action eligibility through Consumes
2. actual deserialization through a compatible input formatter
```

A declared media type without a compatible input formatter is not a complete implementation.

# 4. ProblemDetails and empty error responses

`AddProblemDetails()` registers the standard problem-details service.

```csharp
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

app.MapControllers();
```

`UseStatusCodePages` is useful when the pipeline creates an error status with no response body.

Typical candidates:

```text
404
405
406
415
```

Do not overwrite an existing body.

Always consider:

```csharp
if (http.Response.HasStarted)
{
    return;
}
```

A generic page can add safe guidance:

```text
404 -> endpoint not found
405 -> method not allowed
406 -> inspect Accept
415 -> inspect Content-Type
```

But generic status-code middleware often cannot know the precise internal reason. Endpoint/filter code should create a more specific `ProblemDetails` object when it has the required context.

# 5. Exception handling for 500 responses

Development and production have different goals.

Development may use:

```csharp
app.UseDeveloperExceptionPage();
```

Production should return a stable sanitized error contract.

Conceptual exception boundary:

```csharp
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        if (context.Response.HasStarted)
            return;

        var feature =
            context.Features.Get<IExceptionHandlerFeature>();

        var factory =
            context.RequestServices
                .GetRequiredService<ProblemDetailsFactory>();

        var problem = factory.CreateProblemDetails(
            context,
            statusCode:
                StatusCodes.Status500InternalServerError,
            title: "An unexpected error occurred.",
            type: "https://httpstatuses.com/500",
            instance: context.Request.Path);

        problem.Extensions["traceId"] =
            context.TraceIdentifier;

        context.Response.Clear();
        context.Response.StatusCode =
            StatusCodes.Status500InternalServerError;
        context.Response.ContentType =
            "application/problem+json";

        await context.Response.WriteAsJsonAsync(problem);
    });
});
```

Production rules:

- log the real exception;
- do not expose stack traces or secrets;
- add a trace/correlation identifier;
- do not clear a response after it has started;
- map known domain failures before falling back to 500.

# 6. Accept syntax validation

MVC output negotiation distinguishes supported and unsupported representations, but an API may want a specific `400 ProblemDetails` body for malformed `Accept` syntax.

An action filter is a reasonable MVC-scoped boundary:

```csharp
[AttributeUsage(
    AttributeTargets.Class |
    AttributeTargets.Method)]
public sealed class ValidateAcceptHeaderAttribute
    : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        if (!context.HttpContext.Request.Headers
                .TryGetValue(
                    HeaderNames.Accept,
                    out var raw) ||
            StringValues.IsNullOrEmpty(raw))
        {
            await next();
            return;
        }

        if (!MediaTypeHeaderValue.TryParseList(
                raw,
                out _))
        {
            var factory =
                context.HttpContext.RequestServices
                    .GetRequiredService<
                        ProblemDetailsFactory>();

            var problem =
                factory.CreateProblemDetails(
                    context.HttpContext,
                    statusCode:
                        StatusCodes.Status400BadRequest,
                    title: "Invalid Accept header.",
                    detail:
                        "Accept must be a valid media-type list.",
                    instance:
                        context.HttpContext.Request.Path);

            context.Result =
                new BadRequestObjectResult(problem)
                {
                    ContentTypes =
                    {
                        "application/problem+json"
                    }
                };

            return;
        }

        await next();
    }
}
```

Missing `Accept` normally behaves like accepting any server representation.

Parsing success only proves syntax. It does not prove that the server can produce one of the requested representations.

# 7. Deterministic Accept selection

A custom selector is justified when one endpoint supports several semantic variants, for example:

```text
application/vnd.marvin.author.full.hateoas+json
application/vnd.marvin.author.full+json
application/vnd.marvin.author.friendly.hateoas+json
application/vnd.marvin.author.friendly+json
application/json
```

For each `Accept` item retain:

- parsed media type;
- `q`, defaulting to `1`;
- specificity;
- original header order.

Exclude:

```text
q=0
```

because it means “not acceptable.”

Winner ordering:

```text
q descending
specificity descending
server preference rank
original Accept-header order
```

Specificity:

```text
exact > type/* > */*
```

## Critical correction to the source helper

Do not put client wildcards in the list of concrete representations the server can return.

Incorrect design:

```text
SupportedByPreference includes application/* and */*
```

Correct design:

```text
SupportedByPreference contains only concrete response media types.
Client wildcards are matching rules against that list.
```

Otherwise the selector can accidentally choose a wildcard as the response `Content-Type`.

## Do not collapse 400 and 406 into one boolean

A boolean such as:

```csharp
TrySelect(..., out result)
```

cannot clearly distinguish:

```text
malformed Accept syntax -> 400
valid Accept with no supported overlap -> 406
```

Prefer a structured outcome:

```csharp
public enum NegotiationStatus
{
    Selected,
    InvalidSyntax,
    NotAcceptable
}
```

Then the controller can return the correct status.

## HATEOAS flag

A selected subtype ending in:

```text
.hateoas+json
```

can enable link generation.

Keep separate values for:

- exact response media type;
- primary representation shape;
- whether links are included.

# 8. Request-body detection and Content-Type

Do not use only:

```csharp
Request.ContentLength > 0
```

as proof that a request has a body.

Bodies can arrive through:

- HTTP/1.1 chunked transfer;
- HTTP/2 framing;
- HTTP/3 framing.

Prefer ASP.NET Core body-detection features and endpoint metadata.

`Request.Body.CanRead` means the stream can be read; it does not prove bytes are present.

Important distinctions:

```text
request cannot/does not have a body
request has a body but Content-Type syntax is malformed
request has a valid but unsupported Content-Type
request has a supported Content-Type but body deserialization fails
```

These are different failure stages.

Reading the request body in custom middleware consumes it unless buffering and stream-position management are handled correctly.

# 9. IActionConstraint: selection, not general validation

`IActionConstraint` answers:

```text
Is this action still a candidate?
```

It does not naturally answer:

```text
What detailed 400 response should be written?
```

Returning `false` removes the action candidate. It can lead to route/action-selection failures without an explicit validation body.

Developer-provided attribute configuration should fail fast:

- blank header/query/route keys -> argument exception;
- invalid constant media types -> clear startup/action-discovery exception;
- immutable parsed settings can be cached safely.

Client-provided values must not crash action selection:

- use `TryParse`;
- malformed request input returns `false`;
- use a separate filter or middleware when the API contract requires explicit 400 details.

Avoid:

- I/O;
- database calls;
- request-body parsing;
- mutable shared request state

inside action constraints.

# 10. RequestMatchesAttribute design

The source explores one generalized attribute that can match:

- HTTP method;
- route key/value;
- query-key presence;
- exact query value;
- header media type.

The runtime order is:

```text
method
route
query
header
```

Each configured rule must pass.

For a header-media-type rule:

1. require the configured header;
2. parse with `MediaTypeHeaderValue.TryParse`;
3. compare the concrete media type case-insensitively;
4. reject malformed client values without throwing.

`IsReusable = true` is appropriate only when the factory and runtime constraint contain immutable/thread-safe state.

Design warning:

```text
one attribute with many overloaded constructors
can become ambiguous and difficult to maintain
```

Purpose-specific attributes are often clearer:

```text
RequireQueryAttribute
RequireRouteValueAttribute
RequireRequestMediaTypeAttribute
```

Use built-in `[Consumes]` for ordinary request `Content-Type` selection instead of rebuilding it.

# 11. Corrected recommended pipeline

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
});

builder.Services.AddProblemDetails();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler();
}

app.UseStatusCodePages();

app.MapControllers();

app.Run();
```

Then add custom components only for requirements the framework does not already express:

- malformed `Accept` must return a specific 400 contract;
- deterministic selection among multiple vendor representations;
- special route/query/header action-selection rules;
- custom ProblemDetails metadata.

# 12. Final checklist

```text
[ ] raw SVG is committed
[ ] every screenshot is preserved by hash
[ ] repeated placement is recorded separately
[ ] all native SVG text is available verbatim
[ ] ReturnHttpNotAcceptable is enabled when strict 406 behavior is intended
[ ] input and output formatters are configured independently
[ ] Produces/Consumes metadata agrees with real formatter support
[ ] malformed Accept and unsupported Accept are not conflated
[ ] wildcard Accept values are never returned as response Content-Type
[ ] q=0 candidates are excluded
[ ] missing Accept has a documented default policy
[ ] StatusCodePages does not overwrite an existing body
[ ] exception details are not leaked in production
[ ] Content-Length is not the only body signal
[ ] action constraints do not perform request-body parsing or I/O
[ ] developer constants fail fast
[ ] client data uses non-throwing parsing
```
