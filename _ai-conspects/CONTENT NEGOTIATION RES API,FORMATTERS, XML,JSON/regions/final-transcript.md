# Final semantic transcript — CONTENT NEGOTIATION RES API,FORMATTERS, XML,JSON

Authoritative source: `source/CONTENT NEGOTIATION RES API,FORMATTERS, XML,JSON.svg`  
Coverage: **88 unique screenshots / 92 placements + 73 native SVG labels**

---

# R01 — content negotiation and formatter configuration

## Content negotiation

Content negotiation is the process of selecting the best representation for a response when the application can produce several representations.

The client expresses its response preference through the `Accept` request header:

```http
Accept: application/json
```

or:

```http
Accept: application/xml
```

The server returns the selected representation and identifies it through the response `Content-Type` header:

```http
Content-Type: application/json
```

## Output and input formatters

```text
output formatter
    serializes an action result/object into the response body
    driven mainly by Accept, formatter support and result metadata
    writes response Content-Type

input formatter
    deserializes the request body into an action parameter/DTO
    driven mainly by request Content-Type
```

Example:

```text
Accept: application/xml
    asks the server to return XML

Content-Type: application/json
    tells the server that the incoming request body is JSON
```

These headers control different directions.

## Return `406 Not Acceptable`

```csharp
builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;
});
```

With this option enabled, ASP.NET Core returns `406 Not Acceptable` when no output formatter can produce one of the media types requested by the client.

Without strict behavior, MVC may fall back to its default formatter when the requested media type is unavailable.

## JSON formatter choices

The normal ASP.NET Core JSON formatter is based on `System.Text.Json`.

Newtonsoft.Json support can be added when an application requires Json.NET-specific behavior:

```csharp
builder.Services
    .AddControllers(options =>
    {
        options.ReturnHttpNotAcceptable = true;
    })
    .AddNewtonsoftJson(settings =>
    {
        settings.SerializerSettings.ContractResolver =
            new CamelCasePropertyNamesContractResolver();
    });
```

Adding Newtonsoft.Json changes formatter registration. Do not assume formatter order remains the same after chaining additional formatter extensions.

## XML formatters

Examples:

```csharp
builder.Services
    .AddControllers(options =>
    {
        options.ReturnHttpNotAcceptable = true;
    })
    .AddXmlDataContractSerializerFormatters();
```

or:

```csharp
builder.Services
    .AddControllers(options =>
    {
        options.ReturnHttpNotAcceptable = true;
    })
    .AddXmlSerializerFormatters();
```

The two XML formatter families have different serializer behavior and model constraints. Choose the one whose serializer supports the required models.

## Formatter order and default response

When no usable `Accept` value is supplied, MVC may choose the first suitable output formatter.

Therefore registration order matters. Adding XML or Newtonsoft.Json formatters can accidentally make XML the default if the resulting formatter list places an XML formatter first.

A formatter can be explicitly inserted at index `0`, but that intentionally changes the default:

```csharp
options.OutputFormatters.Insert(0, formatter);
```

Treat formatter order as API behavior and verify it with integration tests.

---

# R02 — `Accept`, q-values and HTTP failure semantics

## `Accept` can contain a list

A real `Accept` header is often a comma-separated list:

```http
Accept: application/json;q=1.0,
        application/xml;q=0.5,
        */*;q=0.1
```

The `q` value represents relative preference:

```text
1.0    most preferred
0.5    acceptable but less preferred
0      not acceptable
```

MVC's content-negotiation pipeline already considers media ranges, wildcards and quality values. Ordinary controllers should usually let the framework select the formatter.

## Parsing a single media type versus an `Accept` list

For a single `Content-Type` value:

```csharp
MediaTypeHeaderValue.TryParse(
    value,
    out var parsed);
```

For an entire `Accept` list:

```csharp
MediaTypeHeaderValue.TryParseList(
    values,
    out var parsedValues);
```

Using single-value `TryParse` on a full comma-separated `Accept` header is the wrong abstraction.

## Syntax failure versus unsupported representation

Two cases should be distinguished:

```text
invalid header syntax
    malformed media type/list
    application may return 400 Bad Request

valid but unsupported Accept value
    no configured output formatter supports it
    return 406 Not Acceptable when strict negotiation is enabled
```

`415 Unsupported Media Type` is primarily an input-side failure: the request body has a `Content-Type` for which no input formatter is available.

```text
406 -> response representation cannot satisfy Accept
415 -> request body Content-Type cannot be consumed
```

## Action selection versus result formatting

`Accept` normally does not select the controller action.

Typical pipeline:

```text
routing/action selection
action executes and returns an object/result
result execution performs content negotiation
output formatter is selected
response body and Content-Type are written
```

An unsupported `Accept` may therefore be detected after the action has already run.

## Manual negotiation

Manual parsing is justified when the action deliberately owns a custom representation contract rather than relying solely on MVC formatters.

Example shape:

```csharp
[HttpGet("{authorId}", Name = "GetAuthor")]
public async Task<IActionResult> GetAuthor(
    Guid authorId,
    string? fields,
    [FromHeader(Name = "Accept")] string? accept)
{
    if (!MediaTypeHeaderValue.TryParseList(
            new StringSegment[] { accept },
            out var parsed))
    {
        return BadRequest("Invalid Accept header.");
    }

    var author = await repository.GetAuthorAsync(authorId);

    if (author is null)
        return NotFound();

    // Validate requested data-shaping fields.
    // Choose a representation.
    // Return an object that the registered formatter can serialize.
}
```

When several alternatives and q-values are supported manually, the implementation must evaluate the whole list and preference order. Avoid accepting only one hard-coded media type while ignoring valid alternatives.

## Data-shaping validation

A custom representation flow may validate a `fields` parameter before shaping the DTO:

```csharp
if (!propertyChecker.TypeHasProperties<AuthorDto>(fields))
{
    return BadRequest(
        problemDetailsFactory.CreateProblemDetails(
            HttpContext,
            statusCode: 400,
            detail:
                $"Not all requested fields exist: {fields}"));
}
```

Content negotiation and field selection are separate concerns. Validate both independently.

---

# R03 — vendor-specific and semantic response media types

## Format alone is not the complete contract

```text
application/json
```

tells the client that the payload syntax is JSON. It does not explain:

- whether the object is an author, course or error;
- whether links are included;
- which semantic version/shape is returned;
- whether the representation is “friendly” or “full”.

When one resource has meaningfully different representations, vendor-specific media types can make that contract explicit.

## Vendor-specific media type structure

Example:

```text
application/vnd.marvin.author.hateoas+json
```

Components:

```text
application    top-level type
vnd            vendor tree
marvin         vendor identifier
author         representation name
hateoas        semantic subtype/detail
+json          structured syntax suffix
```

Use one registered structured suffix such as `+json`. A string like `+hateoas+json` incorrectly treats both terms as suffixes; `hateoas` belongs in the subtype name.

## HATEOAS representation

The same author resource may have:

```text
application/vnd.marvin.author+json
    author without links

application/vnd.marvin.author.hateoas+json
    author with hypermedia links
```

Both are JSON, but they have different semantics and different client contracts.

Example representation selection:

```csharp
var includeLinks = parsedMediaType
    .SubTypeWithoutSuffix
    .EndsWith(
        "hateoas",
        StringComparison.InvariantCultureIgnoreCase);

var primaryMediaType = includeLinks
    ? parsedMediaType.SubTypeWithoutSuffix[
        ..^".hateoas".Length]
    : parsedMediaType.SubTypeWithoutSuffix;

IEnumerable<LinkDto> links = Array.Empty<LinkDto>();

if (includeLinks)
{
    links = CreateLinksForAuthor(authorId, fields);
}
```

The action can then choose a friendly/full DTO and optionally add links.

## Register vendor media types with the formatter

Returning an object is not enough. The selected output formatter must claim support for the vendor media type.

For `System.Text.Json`:

```csharp
builder.Services.AddControllers(options =>
{
    options.ReturnHttpNotAcceptable = true;

    var jsonFormatter = options.OutputFormatters
        .OfType<SystemTextJsonOutputFormatter>()
        .FirstOrDefault();

    jsonFormatter?.SupportedMediaTypes.Add(
        MediaTypeHeaderValue.Parse(
            "application/vnd.marvin.author+json"));
});
```

For Newtonsoft.Json, configure the corresponding Newtonsoft output formatter.

This does not change JSON serialization. It tells MVC that the JSON formatter may write JSON while labeling the response with that semantic vendor media type.

Without registration, result execution may log or throw an error equivalent to:

```text
No output formatter was found for content types
'application/vnd....+json'
```

## `[Produces]` is metadata, not formatter capability

```csharp
[Produces(
    "application/json",
    "application/vnd.marvin.author+json",
    "application/vnd.marvin.author.hateoas+json")]
```

This:

- documents possible response content types;
- helps OpenAPI/Swagger describe the endpoint;
- can constrain result metadata.

It does not magically teach a formatter to write those media types. `SupportedMediaTypes` must still be configured.

## Default representation

Always keep a default representation that is returned when no semantic vendor media type is requested, commonly:

```text
application/json
```

This preserves a predictable fallback and avoids requiring every client to know the custom contract.

## Client knowledge

A media type is only useful when its semantics are documented. Use OpenAPI examples, response schemas and explicit documentation to explain:

- friendly versus full shape;
- links versus no links;
- supported media types;
- default media type;
- deprecation/versioning behavior.

---

# R04 — vendor-specific media types on input

## `Content-Type` selects request-body handling

For POST, PUT or PATCH, the client identifies the request-body representation through `Content-Type`:

```http
Content-Type: application/json
```

A semantic input media type may be:

```http
Content-Type:
  application/vnd.marvin.authorforcreation+json
```

The payload remains JSON because of `+json`, while the subtype communicates the semantic request contract.

## Different request contracts

Instead of one DTO with many nullable fields, an API can define separate input contracts.

Without a date of death:

```text
Content-Type:
  application/vnd.marvin.authorforcreation+json

DTO:
  AuthorForCreationDto
```

With a required date of death:

```text
Content-Type:
  application/vnd.marvin.authorforcreation.withdateofdeath+json

DTO:
  AuthorForCreationWithDateOfDeathDto
```

This can make validation clearer:

```text
first representation
    the property does not exist

second representation
    the property exists and can be required
```

It avoids one permissive DTO that accepts every possible variant and then relies on complex conditional validation.

## Input formatter registration

As with response media types, the selected JSON input formatter must advertise support for the custom `Content-Type`.

Conceptually:

```csharp
var jsonInputFormatter = options.InputFormatters
    .OfType<SystemTextJsonInputFormatter>()
    .FirstOrDefault();

jsonInputFormatter?.SupportedMediaTypes.Add(
    MediaTypeHeaderValue.Parse(
        "application/vnd.marvin.authorforcreation+json"));
```

Exact setup depends on the ASP.NET Core version and formatter package.

## `[Consumes]`

`[Consumes]` can document and constrain accepted request media types:

```csharp
[Consumes(
    "application/vnd.marvin.authorforcreation+json")]
```

Like `[Produces]`, it belongs to the endpoint contract, but the underlying input formatter must still support the media type.

## Choosing different DTO types

A single action parameter has one compile-time type. If media type truly selects materially different DTO classes, common approaches include:

- separate actions/endpoints constrained by `Consumes`;
- a custom input formatter;
- a discriminated request model;
- a request envelope with explicit type/version;
- manual deserialization for a tightly controlled contract.

Do not force semantic media types into the design when ordinary optional fields, validation groups or endpoint versioning are simpler.

---

# Practical checklist

```text
[ ] Accept controls response representation
[ ] Content-Type describes the request body
[ ] output formatters serialize responses
[ ] input formatters deserialize request bodies
[ ] enable ReturnHttpNotAcceptable for strict 406 behavior
[ ] distinguish malformed Accept (400) from unsupported Accept (406)
[ ] distinguish response 406 from request-body 415
[ ] use TryParseList for a full Accept list
[ ] let MVC handle q-values unless custom negotiation is intentional
[ ] register vendor media types in SupportedMediaTypes
[ ] do not rely on Produces/Consumes alone
[ ] use one structured suffix such as +json
[ ] document every semantic representation
[ ] keep a default application/json representation
[ ] verify formatter order after adding XML or Newtonsoft.Json
```

---

# Coverage

```text
unique embedded screenshots: 88
image uses: 92
native SVG labels: 73
duplicate extra placements: 4

processed image uses: 92
processed text labels: 73
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
