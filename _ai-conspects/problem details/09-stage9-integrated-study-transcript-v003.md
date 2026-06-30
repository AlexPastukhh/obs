# Problem Details — integrated study transcript v003

Generated: 2026-06-30

## Role of this document

This is the active **conceptual repetition layer**.

Evidence layers remain separate:

```text
06-stage6-source-preserving-transcript-pass1-v002.md
    exact screenshot text for 27 unique sources / 35 placements

07-all-svg-text-labels-appendix-v002.md
    all 118 native SVG labels

09-stage9-integrated-study-transcript-v003.md
    connected study model across the complete four-region topic boundary
```

This document is detailed enough for conceptual repetition and question generation. It does not falsely claim that the remaining 50 unique screenshots have already been transcribed literally.

---

# 1. What Problem Details solves

A status code tells a client the broad HTTP outcome, but usually not enough application-specific information to repair a request, display a useful message, or correlate an incident.

Problem Details supplies a consistent error document with fields such as:

```text
type
title
status
detail
instance
extensions
```

A typical JSON response is sent with:

```http
Content-Type: application/problem+json
```

## Field responsibilities

### `type`

A stable identifier for the problem category. It can be a documentation URI explaining:

- what the error means;
- whether retry is sensible;
- which request field or operation is involved;
- what the client should do.

`type` should identify the **kind of problem**, not one individual occurrence.

### `title`

A short, stable human-readable summary such as:

```text
Validation failed
Authentication required
Access denied
Resource not found
Conflict
Unsupported media type
```

### `status`

The HTTP status associated with the response. It should agree with the actual response status code.

### `detail`

Occurrence-specific explanation safe for the caller.

Production detail must not expose:

- stack traces;
- connection strings;
- SQL;
- secrets or tokens;
- internal file paths;
- raw exception messages containing sensitive data.

### `instance`

Identifies the specific occurrence. Common choices include:

- the current request path;
- an occurrence URI;
- a support/correlation identifier.

### `extensions`

Machine-readable application metadata, for example:

```json
{
  "traceId": "...",
  "code": "order.version_conflict",
  "errors": { }
}
```

Use extensions for stable error codes and diagnostics that do not fit the standard fields.

---

# 2. When Problem Details is valuable

It is especially useful when:

- an API has several clients;
- third parties consume the API;
- validation errors must be parsed;
- authentication and authorization failures need a stable JSON shape;
- content negotiation errors must distinguish `406` from `415`;
- clients need a stable error code;
- support needs a `traceId`;
- an API wants consistent behavior across controllers, middleware, exception handlers, and authentication events.

## Lower-value situations

A minimal body or empty response can still be reasonable for:

- a short-lived internal prototype;
- a tightly controlled single client;
- a status where headers already communicate the actionable result;
- `HEAD`, where a response body is not useful;
- a response that has already started and cannot safely be replaced.

For example, a bodyless `405` can still expose the important `Allow` header. The decision is about contract quality, not a rule that every unsuccessful response must carry JSON.

---

# 3. The three main ASP.NET Core abstractions

## `ProblemDetailsFactory`

`ProblemDetailsFactory` is primarily an MVC-oriented **model-construction** abstraction.

It creates:

- `ProblemDetails`;
- `ValidationProblemDetails`;

while applying MVC conventions and available HTTP context.

Typical controller helpers and MVC result executors already use MVC's own problem-details path.

Use the factory when code wants a correctly constructed model and MVC conventions matter.

## `IProblemDetailsService`

`IProblemDetailsService` owns the **write orchestration** path.

Given a `ProblemDetailsContext`, it can:

1. work with the final problem model;
2. apply configured customization;
3. inspect registered writers in order;
4. select a writer that can handle the context;
5. write the representation.

Important methods:

```csharp
ValueTask WriteAsync(ProblemDetailsContext context);

ValueTask<bool> TryWriteAsync(
    ProblemDetailsContext context);
```

`TryWriteAsync` returning `false` means that no writer handled the response. It is not a successful empty write.

## `IProblemDetailsWriter`

A writer owns a concrete representation or specialized writing policy.

A writer normally decides:

```csharp
bool CanWrite(ProblemDetailsContext context);
```

and then writes:

```csharp
ValueTask WriteAsync(ProblemDetailsContext context);
```

Writers are ordered. A broad writer placed before a specialized writer can capture responses intended for the specialized implementation.

## Comparison

| Abstraction | Primary responsibility |
|---|---|
| `ProblemDetailsFactory` | construct the model |
| `IProblemDetailsService` | customize, select a writer, orchestrate output |
| `IProblemDetailsWriter` | decide capability and serialize/write one representation |

---

# 4. `ProblemDetailsContext`

The writing pipeline uses `ProblemDetailsContext`.

Important information can include:

```text
HttpContext
ProblemDetails
Exception
AdditionalMetadata
```

`Exception` is available only when the surrounding pipeline supplies it, such as an exception-handling path.

`AdditionalMetadata` can carry endpoint metadata. A custom writer can use it to detect a marker attribute or inspect endpoint information.

This explains why a middleware-generated problem response may have richer context than a controller result created without an exception object.

---

# 5. Global registration and customization

A normal registration begins with:

```csharp
builder.Services.AddProblemDetails();
```

Global customization can attach shared invariants:

```csharp
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
    {
        context.ProblemDetails.Extensions["traceId"] =
            context.HttpContext.TraceIdentifier;

        context.ProblemDetails.Instance =
            context.HttpContext.Request.Path;
    };
});
```

Good global customizations include:

- trace or correlation identifiers;
- request path;
- stable shared extensions;
- safe environment-dependent normalization;
- documentation links;
- application-wide error-envelope conventions.

Global customization should not replace the code that decides:

- the correct status;
- the domain-specific problem category;
- whether the error is validation, authentication, authorization, conflict, or server failure.

A selected writer sees the final customized model.

---

# 6. MVC and `[ApiController]`

With `[ApiController]`, invalid model state can automatically produce a validation problem response before the action executes.

This automatic path is different from manually calling `IProblemDetailsService` in middleware.

Related MVC concepts include:

- automatic model-state validation;
- `ValidationProblemDetails`;
- `ApiBehaviorOptions`;
- `InvalidModelStateResponseFactory`;
- client-error mappings;
- controller helpers such as `Problem(...)` and `ValidationProblem(...)`.

## `InvalidModelStateResponseFactory`

This factory lets an application replace the default invalid-model-state result while preserving automatic action short-circuiting.

Typical responsibilities:

- choose a stable title/type;
- preserve field errors;
- attach a trace ID or application error code;
- return a result with the appropriate 400 response.

It should not discard useful model-state errors or expose unsafe internal details.

## Client-error mappings

Client-error mappings affect framework/MVC error generation and standard titles/types for statuses.

They are conceptually distinct from `IProblemDetailsService`, which supplies customization and writer infrastructure.

---

# 7. Explicit middleware write flow

Middleware must respect response lifecycle.

A safe shape is:

```csharp
private static async Task WriteProblemAsync(
    HttpContext http,
    IProblemDetailsService service,
    ProblemDetailsFactory factory,
    int status,
    string title,
    string detail)
{
    if (http.Response.HasStarted)
    {
        return;
    }

    http.Response.Clear();
    http.Response.StatusCode = status;

    var problem = factory.CreateProblemDetails(
        httpContext: http,
        statusCode: status,
        title: title,
        detail: detail,
        instance: http.Request.Path);

    var written = await service.TryWriteAsync(
        new ProblemDetailsContext
        {
            HttpContext = http,
            ProblemDetails = problem,
            AdditionalMetadata =
                http.GetEndpoint()?.Metadata
        });

    if (!written)
    {
        http.Response.ContentType = "text/plain";

        await http.Response.WriteAsync(
            $"{status} {title}: {detail}");
    }
}
```

## Why each step exists

### `Response.HasStarted`

`IProblemDetailsService` does not make an already-started response replaceable.

Once headers or body bytes are committed:

- clearing is too late;
- changing the status may fail;
- writing a second structured body can corrupt the response.

At that point, log and follow the application's abort/propagation policy.

### `Response.Clear`

Before the response starts, clearing prevents stale state such as:

- an old content type;
- headers set by an earlier component;
- partially configured output.

### Set status before writing

The response status and the `ProblemDetails.Status` value should tell the same story.

### Check `TryWriteAsync`

A false result means fallback is still required.

---

# 8. `WriteAsync` versus `TryWriteAsync`

## `WriteAsync`

Use when the application expects the configured pipeline to produce a suitable representation and treats failure to do so as exceptional.

## `TryWriteAsync`

Use when writer availability or content negotiation can legitimately produce no match.

```text
true  = a writer handled the response
false = no writer handled it
```

A fallback may be:

- plain text;
- an empty status response;
- a deliberately direct JSON write;
- another application-defined representation.

Direct `WriteAsJsonAsync` is a fallback, not equivalent to the normal writer pipeline. It can bypass:

- writer selection;
- media-type negotiation;
- specialized writer behavior;
- customization that was not already applied.

---

# 9. Writer chain and content negotiation

`IProblemDetailsService` delegates output to writers.

The built-in path is JSON-oriented and normally produces problem JSON.

A custom writer can support:

- a different media type;
- endpoint-specific behavior;
- a specialized status/problem type;
- a vendor representation;
- XML, when an actual compatible writer is implemented.

Merely adding an MVC XML formatter does not automatically guarantee that the Problem Details service has an XML problem writer.

## `CanWrite`

A narrow writer can inspect:

- `Accept`;
- endpoint metadata;
- status;
- problem `type`;
- custom marker attributes;
- other context data.

Example:

```csharp
public bool CanWrite(ProblemDetailsContext context)
{
    return context.AdditionalMetadata?
        .OfType<UseCustomProblemWriterAttribute>()
        .Any() == true;
}
```

## Registration order

A writer that accepts everything can prevent later writers from running.

Selection should therefore be:

- narrow when specialized;
- predictable;
- tested against realistic `Accept` headers.

## Negotiation failure

If the client asks for a representation for which no writer is registered, `TryWriteAsync` can return `false`.

The caller then decides whether to:

- fall back;
- return `406 Not Acceptable`;
- return a minimal response;
- use another supported representation according to API policy.

---

# 10. Custom writer example

```csharp
public sealed class CustomMetadataProblemDetailsWriter
    : IProblemDetailsWriter
{
    public bool CanWrite(ProblemDetailsContext context)
    {
        return context.AdditionalMetadata?
            .OfType<UseCustomProblemWriterAttribute>()
            .Any() == true;
    }

    public ValueTask WriteAsync(
        ProblemDetailsContext context)
    {
        var http = context.HttpContext;
        var problem = context.ProblemDetails;

        var endpointName =
            context.AdditionalMetadata?
                .OfType<EndpointNameMetadata>()
                .FirstOrDefault()?
                .EndpointName;

        if (!string.IsNullOrWhiteSpace(endpointName))
        {
            problem.Extensions["endpoint"] =
                endpointName;
        }

        http.Response.ContentType =
            "application/problem+json";

        return new ValueTask(
            http.Response.WriteAsJsonAsync(problem));
    }
}
```

Marker:

```csharp
[AttributeUsage(
    AttributeTargets.Method |
    AttributeTargets.Class)]
public sealed class UseCustomProblemWriterAttribute
    : Attribute
{
}
```

A source example also demonstrated reading `context.Exception.GetType().Name`. That may be useful diagnostically, but exception type disclosure should be reviewed before production exposure.

---

# 11. Exception handling

An exception pipeline can create a safe 500 problem:

```csharp
var problemContext = new ProblemDetailsContext
{
    HttpContext = http,
    Exception = exception,
    AdditionalMetadata =
        http.GetEndpoint()?.Metadata,
    ProblemDetails = new ProblemDetails
    {
        Status =
            StatusCodes.Status500InternalServerError,
        Title = "Unhandled server error",
        Detail = "An unexpected error occurred.",
        Instance = http.Request.Path
    }
};

var written =
    await service.TryWriteAsync(problemContext);
```

The public document should contain:

- generic safe title/detail;
- trace ID;
- stable application error code;
- optionally a documentation type.

The detailed exception belongs in logs and telemetry.

## Expected versus unexpected failures

Not every exception should become a generic 500.

Application code should map expected conditions deliberately, for example:

- not found → 404;
- validation failure → 400 or 422 according to policy;
- duplicate/concurrency conflict → 409;
- authentication required → 401;
- insufficient permission → 403.

Unexpected exceptions use the safe 500 path.

---

# 12. Authentication redirects for APIs

Cookie authentication normally redirects browser requests.

For API endpoints, redirects are often replaced with JSON status responses.

## Login redirect → 401

```csharp
options.Events.OnRedirectToLogin = async context =>
{
    if (!context.Request.Path
            .StartsWithSegments("/api"))
    {
        context.Response.Redirect(
            context.RedirectUri);
        return;
    }

    context.Response.StatusCode =
        StatusCodes.Status401Unauthorized;

    // create and write ProblemDetails
};
```

## Access-denied redirect → 403

```csharp
options.Events.OnRedirectToAccessDenied =
    async context =>
    {
        if (!context.Request.Path
                .StartsWithSegments("/api"))
        {
            context.Response.Redirect(
                context.RedirectUri);
            return;
        }

        context.Response.StatusCode =
            StatusCodes.Status403Forbidden;

        // create and write ProblemDetails
    };
```

## Meaning

```text
401:
    no acceptable authenticated principal exists

403:
    authentication succeeded,
    but authorization requirements failed
```

Do not collapse both into one generic authentication error.

For mixed page/API applications, endpoint metadata is usually more robust than a fragile path-string convention, although the source demonstrates a path check for clarity.

---

# 13. Important client-error distinctions

## 400 Bad Request

Examples:

- malformed input;
- malformed JSON surfaced by the application;
- invalid parameters;
- invalid media-type syntax.

## 401 Unauthorized

Authentication is required or failed to produce an acceptable principal.

Relevant authentication headers can still matter.

## 403 Forbidden

The caller is authenticated but lacks permission.

## 404 Not Found

A route or resource does not exist.

A body is optional, but a structured document improves consistency and can distinguish route absence from domain resource absence.

## 405 Method Not Allowed

The target exists but does not support the HTTP method.

The `Allow` header is important.

## 406 Not Acceptable

The server cannot produce a representation acceptable under the request's `Accept` constraints.

## 409 Conflict

The request conflicts with current resource state, for example:

- duplicate key/business identity;
- optimistic concurrency conflict;
- incompatible state transition.

## 415 Unsupported Media Type

The request body media type is unsupported or required content-type information is missing.

## 422 Unprocessable Content

Some APIs use it for domain/semantic validation after syntactic parsing succeeded.

The API should apply one documented policy consistently.

---

# 14. Validation problem details

Validation failures need field-level information.

A typical shape includes:

```json
{
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "name": [
      "The name field is required."
    ]
  }
}
```

Useful rules:

- preserve field keys clients can map to controls;
- use stable error codes when clients need programmatic behavior;
- avoid returning only one concatenated string;
- distinguish model-binding/parsing failures from domain validation where the API contract needs that distinction;
- do not hide errors by replacing `ModelState` with a generic message.

---

# 15. Security boundary

A production Problem Details response is a public protocol artifact.

Safe output:

```text
stable type
stable title
safe detail
status
instance
traceId
application error code
safe field errors
```

Unsafe output:

```text
stack trace
raw database error
SQL text
connection string
access token
filesystem path
private hostnames
internal implementation details
unreviewed exception message
```

Use the trace ID to connect the public response to detailed server logs.

---

# 16. Operational and testing checklist

Test at least:

1. controller-created problem;
2. automatic invalid model-state response;
3. exception-handler 500;
4. explicit middleware write;
5. cookie API 401;
6. cookie API 403;
7. supported `Accept`;
8. unsupported `Accept`;
9. custom metadata writer selected;
10. custom writer not selected;
11. `TryWriteAsync == false` fallback;
12. `Response.HasStarted == true`;
13. no sensitive exception information;
14. actual status equals `ProblemDetails.Status`;
15. `traceId` is present and correlates with logs;
16. `405` preserves `Allow`;
17. validation field errors remain machine-readable.

---

# 17. Decision guide

Use this order:

```text
1. Determine the semantic failure.
2. Choose the correct HTTP status.
3. Choose a stable problem type/code.
4. Construct a safe model.
5. Add correlation and approved metadata.
6. Ensure the response has not started.
7. Let IProblemDetailsService select a writer.
8. Handle TryWriteAsync == false deliberately.
9. Test negotiation and fallback.
10. Keep detailed diagnostics in logs.
```

## Misconceptions to reject

- ProblemDetails automatically chooses the correct status.
- `IProblemDetailsService` makes `Response.HasStarted` irrelevant.
- `TryWriteAsync` returning false means an empty response was successfully written.
- Adding XML MVC formatters automatically creates an XML Problem Details writer.
- 401 and 403 mean the same thing.
- A custom writer may safely expose raw exceptions.
- Direct JSON serialization is identical to the service/writer pipeline.
- Every 404 or 405 must contain a body.
- A trace ID is a substitute for a stable application error code.
- Coverage IDs alone prove a source-preserving transcript.
