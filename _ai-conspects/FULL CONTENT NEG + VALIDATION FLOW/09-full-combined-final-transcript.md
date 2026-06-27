# Full combined final transcript — FULL CONTENT NEG + VALIDATION FLOW

Generated: 2026-06-27 10:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 554 / 554
unique embedded screenshots: 143 / 143
screenshot uses on canvas: 144 / 144
repeated screenshot placements retained: 1
regions: 8 / 8
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 End-to-end decision flow

A complete API flow separates these questions:

```text
1. Is request syntax valid?
2. Is the request body media type supported?
3. Which action is eligible?
4. Which response representation is acceptable?
5. How is every failure represented?
```

The important status distinction is:

| Condition | Status |
|---|---:|
| malformed Accept or other request syntax | 400 |
| no endpoint/resource | 404 |
| route exists but method is not allowed | 405 |
| valid Accept cannot be produced | 406 |
| request body media type unsupported | 415 |
| unhandled server exception | 500 |

Prefer framework features first:

```text
formatters
ReturnHttpNotAcceptable
[Produces]
[Consumes]
AddProblemDetails
UseStatusCodePages
UseExceptionHandler / IExceptionHandler
```

Add custom code only for requirements such as deterministic vendor-media-type
selection, explicit malformed-Accept ProblemDetails or additional
route/query/header action-selection rules.

## 03 Full integrated transcript

### R01 — MVC content negotiation, formatters, media types and 406

ASP.NET Core MVC uses **input formatters** to deserialize request bodies and
**output formatters** to serialize action results. These are separate lists with
separate supported media types.

### Output negotiation

- MVC compares the request `Accept` values with the output formatters that can
  serialize the action result.
- Missing `Accept` normally means the client accepts any representation and the
  server chooses its default.
- A syntactically valid but unsupported `Accept` value is a **406 Not
  Acceptable** case.
- `MvcOptions.ReturnHttpNotAcceptable = true` prevents silent fallback when the
  client explicitly excludes every representation the API can produce.
- `RespectBrowserAcceptHeader` controls whether MVC honors broad browser
  `Accept` headers.

### Formatter configuration

- JSON normally comes from the System.Text.Json output formatter and is
  configured with `AddJsonOptions`.
- XML or custom formatters must be registered explicitly.
- Vendor JSON media types can be added to a JSON formatter when the same
  serializer can produce that representation.
- The configured media type must be a real representation, not a wildcard
  placeholder.

### Attributes

- `[Produces]` documents or constrains response media types.
- `[Consumes]` declares accepted request body media types and participates in
  action selection.
- Attributes should match actual formatter support; metadata alone cannot make
  an unavailable formatter work.

### Failure boundaries

- malformed `Accept` syntax → 400 when explicitly validated;
- valid but unsupported `Accept` → 406;
- malformed request `Content-Type` → syntax-validation failure;
- valid but unsupported request `Content-Type` → 415.

### R02 — StatusCodePages and ProblemDetails for 404, 405, 406 and 415

`UseStatusCodePages` can add a response body when routing, action selection or
formatters produce an error status without a body. For APIs, the body should be
a consistent `ProblemDetails` object.

### Services and writers

- `AddProblemDetails()` registers problem-details infrastructure.
- `ProblemDetailsFactory` creates a consistent object with `status`, `title`,
  `type`, `detail`, `instance` and extensions.
- `IProblemDetailsService.TryWriteAsync` lets registered writers choose the
  representation.
- A JSON fallback can write `application/problem+json` when no writer accepts.

### Safe middleware behavior

- Scope API pages with `UseWhen` when browser routes should keep HTML errors.
- Check `Response.HasStarted` before clearing or writing.
- Do not overwrite an error body already produced by MVC, authentication or
  application code.
- Generic status pages can add safe guidance but often cannot know the exact
  internal reason for the status.

### Status guidance

- **404**: endpoint/resource not found; include the request path as `instance`.
- **405**: route exists but the HTTP method is not allowed; preserve the `Allow`
  header when present.
- **406**: no response representation satisfies `Accept`.
- **415**: request body media type is unsupported; tell the client to inspect
  `Content-Type`.

Endpoint-specific code should create a more precise problem response when it
has more context than the generic status-code page.

### R03 — Exception handling middleware and ProblemDetails for 500

Unhandled exceptions need a high pipeline boundary that can create a stable 500
response when the response has not already started.

### Environment behavior

- Development may use `UseDeveloperExceptionPage`.
- Production should use `UseExceptionHandler` or an `IExceptionHandler`.
- `IExceptionHandlerFeature` exposes the unhandled exception to the handler.
- The exception must be logged before the sanitized response is returned.

### ProblemDetails creation

- Resolve `ProblemDetailsFactory` from request services.
- Use status 500, a stable public title/type and the request path as `instance`.
- Add `TraceIdentifier` as a correlation extension.
- Include exception details only in a controlled development environment.
- Call `Response.Clear()` only when `Response.HasStarted` is false.

### Mapping

Known exceptions can map to 400, 404, 409 or another documented status before
the catch-all 500 rule. Exception middleware is the last-resort boundary; normal
validation and domain outcomes should not be implemented by throwing
unexpected exceptions.

### R04 — Accept-header validation filter and controller BadRequest ProblemDetails

An action filter can distinguish **malformed Accept syntax** from a valid header
that merely has no supported representation.

### Validation flow

1. Missing or blank `Accept` is accepted as wildcard/default behavior.
2. Parse the entire comma-separated list with
   `MediaTypeHeaderValue.TryParseList`.
3. Parsing failure returns a 400 `ProblemDetails`.
4. Parsing success continues to MVC or the custom selector.
5. Later failure to find a supported representation returns 406.

### Filter response

- Use `ProblemDetailsFactory` for application-wide defaults.
- Set title such as `Invalid Accept header`.
- Use the request path as `instance`.
- Return `BadRequestObjectResult`.
- Include `application/problem+json` in the result content types.

A controller-local check is reasonable for one endpoint. A class/action filter
avoids duplication across controllers. Middleware is more global but lacks some
MVC action context.

Syntax validity and representation support are deliberately separate:
`TryParseList` proves only that the header is well formed.

### R05 — Accept selection with q values, specificity, wildcards, preference and HATEOAS

A custom selector is useful when one action can produce several vendor
representations and the API needs deterministic tie-breaking.

### Supported representations

Maintain an explicit server preference list, for example:

```text
application/vnd.marvin.author.full.hateoas+json
application/vnd.marvin.author.full+json
application/vnd.marvin.author.friendly.hateoas+json
application/vnd.marvin.author.friendly+json
application/json
```

The final response must use a concrete media type. Wildcards are client matching
rules, not response `Content-Type` values.

### Candidate model

For each parsed `Accept` item retain:

- media type;
- q quality, defaulting to 1.0;
- specificity;
- original header index.

Exclude q=0 because the client explicitly marks that representation
unacceptable.

### Matching and winner order

- exact media type matches the same type/subtype;
- `type/*` matches supported subtypes of the same type;
- `*/*` matches any supported representation.

Sort candidates by:

```text
q descending
specificity descending: exact > type/* > */*
server preference rank
original Accept-header order
```

### Result shape

A structured result can carry selected media type, primary representation and
an `IncludeLinks` flag. A subtype ending in `.hateoas+json` enables links; the
primary representation can remove the `.hateoas` marker and `+json` suffix.

Return distinct outcomes for:

- malformed list → 400;
- valid list with no overlap → 406;
- successful selection → representation metadata.

A single boolean loses the reason for failure and makes correct 400/406 handling
harder.

### R06 — Request-body detection, Content-Length, chunked transfer, Consumes and 415

Request body detection cannot rely only on `Content-Length`.

### Body framing

- `Content-Length > 0` is one body signal.
- HTTP/1.1 chunked transfer can carry a body without `Content-Length`.
- HTTP/2 and HTTP/3 have body framing that also does not require that header.
- Prefer ASP.NET Core request-body detection features and endpoint metadata over
  guessing from one header.
- `Request.Body.CanRead` does not prove that a body is present.

### Content-Type

`Content-Type` describes the request representation when a body exists.

- bodyless requests can omit it;
- malformed syntax is a request-validation problem;
- a valid but unsupported type is normally 415;
- a supported type lets an input formatter deserialize.

Reading the body in middleware consumes it unless buffering and stream position
are managed.

### Consumes

`[Consumes]` is the built-in action-selection rule for request media type.

- It can split actions that share route and method but accept JSON versus XML.
- If no candidate accepts the request `Content-Type`, MVC can produce 415.
- A compatible input formatter must still be registered.
- Global middleware should not reject endpoints that intentionally have no body
  or use a different media type.

### R07 — IActionConstraint design and developer-input validation

`IActionConstraint` participates in MVC action selection after route candidates
are found. Returning false removes an action candidate; it is not a general
request-validation response mechanism.

### Developer configuration

Attribute constructor arguments, configured header names and media type strings
come from application code.

- reject blank keys with `ArgumentNullException`;
- validate media types during construction;
- throw a clear `ArgumentException` for invalid constants;
- pre-parse immutable allowed media types once.

Invalid developer configuration should fail during startup/action discovery
rather than silently making every request fail.

### Client input

Header, query and route values are untrusted request data.

- use `TryParse` rather than throwing;
- malformed values normally return false from the constraint;
- add a separate filter/middleware when malformed input must produce an
  explicit 400 contract.

### Factory design

`IActionConstraintFactory` exposes:

- `Order`: lower values run earlier;
- `IsReusable`: safe only for immutable/thread-safe state;
- `CreateInstance`: creates the runtime constraint from validated settings.

Do not perform I/O or request-body parsing inside action selection. Multiple
overloaded constructors are possible, but separate purpose-specific attributes
often produce a clearer public API.

### R08 — RequestMatchesAttribute for method, header, query and route matching

The complete `RequestMatchesAttribute` example validates configuration in the
attribute and creates an immutable runtime action constraint.

### Supported rules

- optional HTTP method;
- optional route key and expected value;
- optional query-key presence;
- optional exact query value;
- optional header matched against allowed media types.

`AllowMultiple = true` permits several attributes. `Order` controls execution
order and `IsReusable` allows MVC to cache immutable instances.

### Constructor behavior

- reject blank header/query/route keys;
- validate every configured media type with `TryParse`;
- store parsed values in an immutable array;
- treat invalid constants as developer errors.

### Runtime `Accept`

The constraint:

1. compares the optional HTTP method;
2. reads and compares the optional route value;
3. verifies query-key presence and optional expected value;
4. reads the configured header;
5. uses `TryParse` so malformed client input does not throw;
6. compares the parsed request media type with the allowed list;
7. accepts when every configured rule passes.

If no header rule exists and the other rules pass, it accepts.

### Selection versus response

Returning false removes the action candidate and can eventually surface as
404/415-like selection failure. It does not directly create `ProblemDetails`.
Use explicit validation when malformed client input must return 400.

For request `Content-Type`, `[Consumes]` is usually preferable. For response
`Accept`, formatters or an explicit negotiation helper are usually more
idiomatic. Custom constraints are best for additional route/query/header
selection rules not already covered by the framework.

## 04 Regional source map

### R01 coverage

- text elements: `7`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `01-transcript-R01-mvc-content-negotiation-formatters-media-types-and-406.md`

### R02 coverage

- text elements: `78`
- screenshot uses: `9`
- unique screenshots: `9`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `02-transcript-R02-statuscodepages-problemdetails-404-405-406-415.md`

### R03 coverage

- text elements: `45`
- screenshot uses: `8`
- unique screenshots: `8`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `03-transcript-R03-exception-handler-and-problemdetails-500.md`

### R04 coverage

- text elements: `99`
- screenshot uses: `16`
- unique screenshots: `16`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `04-transcript-R04-accept-header-validation-filter-and-400.md`

### R05 coverage

- text elements: `152`
- screenshot uses: `40`
- unique screenshots: `40`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `05-transcript-R05-q-values-specificity-wildcards-preference-and-hateoas.md`

### R06 coverage

- text elements: `4`
- screenshot uses: `18`
- unique screenshots: `18`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `06-transcript-R06-request-body-detection-consumes-and-415.md`

### R07 coverage

- text elements: `6`
- screenshot uses: `27`
- unique screenshots: `26`
- repeated placements: `1`
- remaining: `0`
- detailed transcript: `07-transcript-R07-iactionconstraint-design-and-developer-input-validation.md`

### R08 coverage

- text elements: `163`
- screenshot uses: `21`
- unique screenshots: `21`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `08-transcript-R08-requestmatchesattribute-method-header-query-route.md`

## 05 Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots under `source/` remain authoritative for exact code
punctuation, version-specific APIs and original spelling.
