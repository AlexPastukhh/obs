# Problem Details — source-preserving transcript pass 1 v002

Generated: 2026-06-30

## Honest coverage boundary

```text
repository source accounting: 86 / 86 placements
repository unique assets: 77
repository duplicate placement groups: 9

exact PNG placements recovered for this pass: 35 / 86
exact unique PNG contents recovered: 27 / 77
explicit recovered duplicate records: 8
pending exact placements: 51 / 86
pending exact unique contents: 50 / 77
```

The existing four region files are useful semantic summaries, but each compresses 12–32 screenshots into roughly eight bullets. They are not a near-literal source-preserving transcript.

This pass transcribes only screenshots for which the exact embedded PNG bytes were independently recovered. It does not fabricate the remaining 50 unique screenshots.

## Recovered duplicate placements

```text
S-031 -> S-025
S-048 -> S-028
S-056 -> S-032
S-060 -> S-038
S-067 -> S-046
S-070 -> S-052
S-075 -> S-064
S-081 -> S-030
```

A ninth documented duplicate group, `S-086 -> S-010`, remains pending because neither exact PNG was recovered in this pass.

---

# R01 — configuration, fields, client errors, and safe public contracts — source-preserving pass 1

Generated: 2026-06-30

This pass includes only source images whose decoded bytes were recovered exactly.
Pending IDs remain listed in the coverage ledger and are not reconstructed from memory.

## S-001 — Do 404 and 405 need ProblemDetails bodies?

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Question: “Do I need to care about empty-body status codes such as 404 and 405?”

You do not have to; it depends on the API goals.

If the API is primarily consumed by code rather than humans, an empty body can be acceptable because clients can key off:

- the status code;
- relevant headers, such as `Allow` for `405`;
- authentication headers such as `WWW-Authenticate` for `401`.

If a consistent developer experience is important, `404` and `405` are two common framework-generated errors clients encounter early. Returning a ProblemDetails document gives them the same structured error contract as other failures.

### Study meaning

ProblemDetails is a contract-quality decision, not a requirement for every status. Empty bodies can be valid, but consistency is valuable for public or multi-client APIs.

### Recall questions

1. When can an empty 404/405 body be acceptable?
2. Which header is especially relevant to 405?
3. Why might a public API still prefer ProblemDetails for these statuses?

## S-011 — ProblemDetails standard fields

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

ProblemDetails is a standard error-response shape, commonly serialized as:

```http
Content-Type: application/problem+json
```

Typical fields:

- `type` — URI identifying or documenting the error type;
- `title` — short human-readable summary;
- `status` — HTTP status code;
- `detail` — human-readable occurrence details; avoid leaking sensitive production data;
- `instance` — request path, occurrence identifier, or correlation URI;
- `extensions` — application metadata such as `traceId`.

### Study meaning

The standard fields separate stable error classification from occurrence-specific diagnostics and extensible machine-readable metadata.

### Recall questions

1. Which field should identify the stable error type?
2. Where does traceId belong?
3. Why must detail be sanitized in production?
4. What can instance represent?

## S-020 — Benefits of returning ProblemDetails

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Why return ProblemDetails?

1. **Consistent error shape for clients**  
   Mobile, web, front-end, and service clients parse failures through the same structure.

2. **Better debugging without leaking secrets**  
   Include a `traceId`, a stable error code such as `extensions["code"]`, and keep production stack traces out.

3. **Alignment with ASP.NET Core `[ApiController]`**  
   Model-validation failures already use ProblemDetails-like payloads. Using the same shape elsewhere keeps the API uniform.

4. **Self-describing errors**  
   The `type` value can link to documentation and explain what the client should do next.

### Study meaning

The main value is a stable public error contract that separates client guidance and support correlation from internal implementation details.

### Recall questions

1. Which metadata helps support correlate an occurrence?
2. Why use a stable application error code?
3. How does ProblemDetails align with ApiController behavior?
4. What makes an error self-describing?

## S-027 — The type field makes errors self-describing

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

A ProblemDetails error becomes more self-describing when:

```text
type
```

links to documentation that explains the problem and tells the client what to do next.

### Study meaning

A stable type URI is more valuable than a generic HTTP-status explanation when it documents the application's specific error semantics.

### Recall questions

1. What should the type URI document?
2. How does type differ from title?
3. Why should type remain stable?

## S-035 — High-value 4xx scenarios

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

ProblemDetails is especially useful for validation and client mistakes where the client must fix the request:

- `400` malformed `Accept` or `Content-Type`;
- `400` malformed JSON or parsing errors, if surfaced;
- `404` resource not found;
- `409` conflicts such as concurrency or duplicates;
- `415` unsupported or missing request `Content-Type` when a body exists;
- `406` no acceptable representation satisfies `Accept`;
- `422` domain validation, when the API uses it.

With custom or vendor media types, clear ProblemDetails responses help clients distinguish cases such as `415` from `406`.

### Study meaning

The most valuable problem documents explain actionable client mistakes and distinguish nearby protocol failures precisely.

### Recall questions

1. What is the difference between 406 and 415?
2. When is 409 appropriate?
3. Why are custom media-type APIs especially helped by structured errors?

## S-044 — 5xx errors and multiple-client APIs

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

For unexpected server errors, clients usually cannot repair the cause, but ProblemDetails can still provide:

- a generic safe message;
- a `traceId` for support;
- a consistent response shape.

A typical implementation uses exception handling middleware together with ProblemDetails creation/writing.

ProblemDetails also becomes more valuable when an API has multiple clients or is public, because consistency and a documented error contract matter quickly.

### Study meaning

A 5xx body should help correlation and contract stability without exposing stack traces, secrets, or raw exception messages.

### Recall questions

1. What should a production 500 response contain?
2. What should it omit?
3. Why do multiple clients increase the value of a stable error format?

## S-049 — Lower-value scenarios

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

ProblemDetails can be minimal or unnecessary in lower-value cases:

1. Internal prototypes or learning projects where client and server are controlled together and still changing.
2. UI-first applications where server errors are not maintained as a stable public contract and the single SPA handles failures ad hoc.

### Study meaning

The decision is proportional to contract stability, client diversity, and operational support needs.

### Recall questions

1. When is a simple error body often enough?
2. What changes when third-party or multiple clients appear?
3. Why should prototypes avoid premature complexity?

## S-058 — Cases where a body is low-value or impossible

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Cases where the client may not read a body:

- some redirects;
- `HEAD` requests;
- browser-driven authentication challenges.

Errors after the response has started are different: when `Response.HasStarted == true`, a reliable ProblemDetails response can no longer be sent. At that point, log the error and abort or let the failure propagate according to pipeline policy.

### Study meaning

Do not force a body where HTTP semantics, client behavior, or response lifecycle make it useless or unsafe.

### Recall questions

1. Why is a HEAD body not useful?
2. What should happen after HasStarted?
3. Which authentication flows may be browser-driven?

## S-063 — Do not obsess over ProblemDetails everywhere

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Do not over-engineer ProblemDetails when:

- the project is still an early learning prototype;
- the response has already started;
- the error is not meaningful for clients to parse in the rare application-specific case.

### Study meaning

A stable error contract is valuable, but protocol correctness and practical client value matter more than mechanically wrapping every failure.

### Recall questions

1. Which lifecycle condition makes ProblemDetails impossible?
2. When can a prototype use a simpler response?
3. What should guide whether a client-readable body is worthwhile?

## S-068 — What not to put in ProblemDetails

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Do not expose:

- production stack traces;
- connection strings, secrets, SQL, or internal file paths;
- raw exception messages that may contain sensitive information.

Prefer:

- a stable safe `title` and `detail`;
- `traceId`;
- a stable error code in `extensions["code"]`;
- a documentation URI in `type`.

### Study meaning

ProblemDetails is a public contract. Diagnostics should support correlation without turning the response into an information-disclosure channel.

### Recall questions

1. Which internal details must stay out of production responses?
2. What should replace a raw exception message?
3. Where should a stable application error code go?
4. How should support correlate the public response with logs?


---

# R02 — factory, service, and implicit versus explicit pipeline — source-preserving pass 1

Generated: 2026-06-30

This pass includes only source images whose decoded bytes were recovered exactly.
Pending IDs remain listed in the coverage ledger and are not reconstructed from memory.

## No exact source PNGs recovered in this pass

The region remains covered by the existing semantic summary and SVG text labels, but its screenshot-level transcript is pending the canonical 86-use SVG or extracted source images.


---

# R03 — worked middleware/authentication flows and TryWriteAsync — source-preserving pass 1

Generated: 2026-06-30

This pass includes only source images whose decoded bytes were recovered exactly.
Pending IDs remain listed in the coverage ledger and are not reconstructed from memory.

## S-006 — IProblemDetailsService does not guard Response.HasStarted

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Question: does `IProblemDetailsService` check `HttpContext.Response.HasStarted`?

No. The service itself does not perform that guard. Its write flow:

- validates the supplied context;
- runs configured ProblemDetails customization;
- iterates registered `IProblemDetailsWriter` implementations;
- calls capability selection such as `CanWrite(...)`;
- invokes `WriteAsync(...)` on the first suitable writer.

Therefore the calling middleware or handler must check:

```csharp
if (context.Response.HasStarted)
{
    return;
}
```

before clearing headers or attempting to replace the response body.

### Study meaning

Response lifecycle safety belongs to the caller. Writer selection cannot make an already-started response writable again.

### Recall questions

1. Who must check Response.HasStarted?
2. What does IProblemDetailsService do instead?
3. Why can no writer safely replace a response after it has started?

## S-007 — Middleware helper: lifecycle guard and response reset

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** first part of a continued code example

### Near-literal normalized transcript

The helper begins:

```csharp
private static async Task WriteProblemWithFactoryAsync(
    HttpContext context,
    IProblemDetailsService problemDetailsService,
    ProblemDetailsFactory problemDetailsFactory,
    int statusCode,
    string title,
    string detail)
{
    if (context.Response.HasStarted)
    {
        return;
    }

    context.Response.Clear();
    context.Response.StatusCode = statusCode;
```

The remaining model creation, service write, and fallback continue in S-018 and S-025.

### Study meaning

A replacement error payload should first establish that writing is still legal, then clear stale response state and set the intended status.

### Recall questions

1. Why does the method return when HasStarted is true?
2. What does Response.Clear remove?
3. Why must StatusCode be set before writing?

## S-014 — Why middleware calls Response.Clear

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Middleware may run after another component already touched the response status, headers, or body.

Calling:

```csharp
context.Response.Clear();
```

before writing a replacement error can avoid:

- stale headers;
- an incorrect old `Content-Type`;
- partially configured output.

The rule is strict: only clear before the response has started.

```csharp
if (context.Response.HasStarted)
{
    return;
}
```

After headers or body bytes have started, changing or clearing the response is too late.

### Study meaning

Clear is not a recovery mechanism for a committed response. It is preparation for a replacement response while the response remains mutable.

### Recall questions

1. What stale state can Response.Clear remove?
2. When is Clear legal?
3. What should code do after HasStarted becomes true?

## S-018 — Create ProblemDetails and call TryWriteAsync

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Continuation of the helper:

```csharp
var problem = problemDetailsFactory.CreateProblemDetails(
    httpContext: context,
    statusCode: statusCode,
    title: title,
    detail: detail,
    instance: context.Request.Path);

var pdContext = new ProblemDetailsContext
{
    HttpContext = context,
    ProblemDetails = problem
};

var written = await problemDetailsService.TryWriteAsync(
    pdContext);
```

### Study meaning

The factory creates a model using MVC conventions; the service then customizes, selects a writer, negotiates representation, and attempts to emit it.

### Recall questions

1. What responsibilities belong to ProblemDetailsFactory?
2. What is carried in ProblemDetailsContext?
3. Why use TryWriteAsync instead of assuming a writer exists?

## S-025 — Plain-text fallback when no writer handled the response

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Continuation after `TryWriteAsync`:

```csharp
if (!written)
{
    context.Response.ContentType = "text/plain";

    await context.Response.WriteAsync(
        $"{statusCode} {title}: {detail}");
}
```

The fallback is explicit because `TryWriteAsync` returning `false` means no registered writer produced the response.

### Study meaning

A false result must not be treated as success. The caller owns the fallback representation and should keep it simple and safe.

### Recall questions

1. What does written == false mean?
2. Who owns fallback behavior?
3. Why is a plain-text fallback useful?

## S-028 — Contents of ProblemDetailsContext

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

`TryWriteAsync` receives a `ProblemDetailsContext`.

The context includes:

- `HttpContext`;
- `ProblemDetails`;
- `Exception`, when the surrounding pipeline supplies one;
- `AdditionalMetadata`.

Custom writers can therefore inspect more than the body model alone.

### Study meaning

ProblemDetailsContext is the shared envelope through customization and writer execution. Exception and endpoint metadata are pipeline-dependent additions.

### Recall questions

1. Which two properties are always central?
2. When can Exception be available?
3. What can AdditionalMetadata contain?

## S-030 — Exception middleware context, metadata, TryWrite, and fallback

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

An exception-handling path can build:

```csharp
var pdContext = new ProblemDetailsContext
{
    HttpContext = httpContext,
    Exception = exception,
    ProblemDetails = new ProblemDetails
    {
        Status = StatusCodes.Status500InternalServerError,
        Title = "Unhandled server error",
        Detail = "An unexpected error occurred.",
        Instance = httpContext.Request.Path
    },
    AdditionalMetadata =
        httpContext.GetEndpoint()?.Metadata
};

var written = await _pds.TryWriteAsync(pdContext);

if (!written)
{
    httpContext.Response.ContentType = "text/plain";
    await httpContext.Response.WriteAsync(
        "An unexpected error occurred.");
}
```

### Study meaning

Exception middleware has access to exception and endpoint context that a controller-created result may not have. Public detail remains sanitized.

### Recall questions

1. Which status and title are used?
2. Why is the exception supplied separately from public detail?
3. What is passed as AdditionalMetadata?
4. What happens when no writer accepts?

## S-032 — What custom writers can inspect

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Examples of richer writer context:

- exception-handler middleware can attach the exception;
- endpoint metadata can be passed through;
- custom writers can inspect more than the ProblemDetails body and `HttpContext`.

### Study meaning

Writer selection and formatting can be endpoint-aware and pipeline-aware, but this power should not leak unsafe internal data.

### Recall questions

1. Which pipeline can attach an Exception?
2. How can endpoint metadata influence a writer?
3. Why must internal information be filtered before serialization?

## S-037 — Cookie OnRedirectToLogin: browser redirect versus API 401

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
options.Events.OnRedirectToLogin = async ctx =>
{
    if (!ctx.Request.Path.StartsWithSegments("/api"))
    {
        ctx.Response.Redirect(ctx.RedirectUri);
        return;
    }

    ctx.Response.StatusCode =
        StatusCodes.Status401Unauthorized;

    var http = ctx.HttpContext;
    var factory = http.RequestServices
        .GetRequiredService<ProblemDetailsFactory>();
    var pds = http.RequestServices
        .GetRequiredService<IProblemDetailsService>();

    var pd = factory.CreateProblemDetails(
        httpContext: http,
        statusCode: StatusCodes.Status401Unauthorized,
        title: "Unauthorized",
        type: "https://httpstatuses.com/401",
        detail: "Authentication is required to access this resource.",
        instance: http.Request.Path);

    await pds.WriteAsync(
        new ProblemDetailsContext
        {
            HttpContext = http,
            ProblemDetails = pd
        });
};
```

### Study meaning

Cookie authentication is page-oriented by default. API paths should return a 401 problem response instead of HTML navigation.

### Recall questions

1. Why are non-API requests redirected?
2. Which status is returned for API requests?
3. Which two services are resolved?
4. How does this differ from forbid?

## S-038 — Purpose of the custom metadata writer

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

The custom writer example:

- handles only endpoints marked with a custom endpoint attribute;
- adds exception type as a demonstration of internal context access;
- adds endpoint metadata information into ProblemDetails extensions.

The source cautions that exception type may need to be removed from production responses.

### Study meaning

A specialized writer can own one endpoint policy without capturing every problem response globally.

### Recall questions

1. How does the writer restrict its scope?
2. Which two extra data sources does it use?
3. Why may exception type be unsafe in production?

## S-045 — Meaning of the TryWriteAsync boolean

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

`TryWriteAsync(...)` returns a `bool` through `ValueTask<bool>`.

Writer processing completes when:

- one writer successfully handles the response; or
- no registered writer can handle it.

Therefore:

```text
written == true
    a writer handled the response

written == false
    no writer could write it
```

A common false case is an `Accept` header that does not match supported problem media types. The built-in default is JSON-oriented, so explicit fallback logic is useful.

### Study meaning

The boolean is a representation-selection result, not merely an indication that no exception was thrown.

### Recall questions

1. What does true guarantee?
2. What does false require from the caller?
3. How can Accept cause false?

## S-046 — Custom writer CanWrite using endpoint metadata

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
public sealed class CustomMetadataProblemDetailsWriter
    : IProblemDetailsWriter
{
    public bool CanWrite(ProblemDetailsContext context)
    {
        // Example: only handle endpoints tagged with a custom marker
        var hasMarker = context.AdditionalMetadata?
            .OfType<UseCustomProblemWriterAttribute>()
            .Any() == true;

        return hasMarker;
    }
```

### Study meaning

CanWrite should be narrow enough that a custom writer does not intercept unrelated problem responses.

### Recall questions

1. Where is the custom marker read from?
2. What happens when the marker is absent?
3. Why does writer ordering still matter?

## S-050 — Cookie OnRedirectToAccessDenied: browser redirect versus API 403

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
options.Events.OnRedirectToAccessDenied = async ctx =>
{
    if (!ctx.Request.Path.StartsWithSegments("/api"))
    {
        ctx.Response.Redirect(ctx.RedirectUri);
        return;
    }

    ctx.Response.StatusCode =
        StatusCodes.Status403Forbidden;

    var http = ctx.HttpContext;
    var factory = http.RequestServices
        .GetRequiredService<ProblemDetailsFactory>();
    var pds = http.RequestServices
        .GetRequiredService<IProblemDetailsService>();

    var pd = factory.CreateProblemDetails(
        httpContext: http,
        statusCode: StatusCodes.Status403Forbidden,
        title: "Forbidden",
        type: "https://httpstatuses.com/403",
        detail: "You do not have permission to access this resource.",
        instance: http.Request.Path);

    await pds.WriteAsync(
        new ProblemDetailsContext
        {
            HttpContext = http,
            ProblemDetails = pd
        });
};
```

### Study meaning

Forbid means an acceptable authenticated principal exists but lacks permission. It should not be mislabeled as authentication failure.

### Recall questions

1. Which status represents access denied?
2. How does 403 differ from 401?
3. Why preserve redirects for browser pages?

## S-052 — Custom writer WriteAsync: exception and endpoint extensions

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** first half of a continued writer implementation

### Near-literal normalized transcript

```csharp
public ValueTask WriteAsync(
    ProblemDetailsContext context)
{
    var http = context.HttpContext;
    var pd = context.ProblemDetails;

    if (context.Exception is not null)
    {
        pd.Extensions["exceptionType"] =
            context.Exception.GetType().Name;
    }

    var endpointName =
        context.AdditionalMetadata?
            .OfType<EndpointNameMetadata>()
            .FirstOrDefault()?
            .EndpointName;
```

The remaining extension and JSON write continue in S-064.

### Study meaning

The writer mutates the final model using context supplied by the surrounding pipeline. Exception-type disclosure is a demonstration, not a universal production recommendation.

### Recall questions

1. Where is exceptionType stored?
2. How is endpointName discovered?
3. Which context property supplies metadata?

## S-053 — IProblemDetailsWriter chain and built-in JSON writer

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

`IProblemDetailsService.TryWriteAsync(...)` does not directly serialize JSON. It delegates to registered `IProblemDetailsWriter` services in order until one accepts.

The built-in writer is the default JSON problem-details writer.

Its responsibilities include:

- checking `Accept` compatibility with supported JSON/problem JSON media types;
- validating the context;
- applying defaults;
- adding trace information;
- running `CustomizeProblemDetails`;
- writing JSON as `application/problem+json`.

Writers form the pluggable formatting/output layer.

### Study meaning

ProblemDetails service orchestration and writer serialization are separate abstractions. Registration order and capability checks determine the actual representation.

### Recall questions

1. Does IProblemDetailsService serialize directly?
2. What does the default writer produce?
3. When does CustomizeProblemDetails run?
4. Why is writer order significant?

## S-059 — JSON fallback after TryWriteAsync

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

```csharp
var written = await pds.TryWriteAsync(
    new ProblemDetailsContext
    {
        HttpContext = http,
        ProblemDetails = pd
    });

if (!written)
{
    // fallback if no ProblemDetails writer is available
    http.Response.ContentType =
        "application/problem+json";

    await http.Response.WriteAsJsonAsync(pd);
}
```

### Study meaning

This fallback keeps a structured JSON body even when the registered writer chain declines. Direct serialization bypasses writer customization/selection at this point, so use it deliberately.

### Recall questions

1. When does the fallback execute?
2. Which content type is assigned?
3. What pipeline behavior is bypassed by direct WriteAsJsonAsync?

## S-064 — Custom writer completion and endpoint marker attribute

**Verification:** exact embedded PNG content recovered locally  
**Known limits:** none

### Near-literal normalized transcript

Continuation of the custom writer:

```csharp
if (!string.IsNullOrWhiteSpace(endpointName))
{
    pd.Extensions["endpoint"] = endpointName;
}

http.Response.ContentType =
    "application/problem+json";

return new ValueTask(
    http.Response.WriteAsJsonAsync(pd));
```

Marker attribute:

```csharp
[AttributeUsage(
    AttributeTargets.Method |
    AttributeTargets.Class)]
public sealed class UseCustomProblemWriterAttribute
    : Attribute
{
}
```

### Study meaning

The marker makes writer selection explicit at endpoint/class level, while the writer adds endpoint information and owns the JSON output.

### Recall questions

1. Where is the endpoint name stored?
2. Which targets can carry the marker?
3. What content type does the writer set?


---

# R04 — writer chain, custom writers, and content negotiation — source-preserving pass 1

Generated: 2026-06-30

This pass includes only source images whose decoded bytes were recovered exactly.
Pending IDs remain listed in the coverage ledger and are not reconstructed from memory.

## S-031 — duplicate placement of S-025

**Verification:** exact embedded PNG bytes match `S-025`.

No second transcript is created. Use the source-preserving block for `S-025`.

## S-048 — duplicate placement of S-028

**Verification:** exact embedded PNG bytes match `S-028`.

No second transcript is created. Use the source-preserving block for `S-028`.

## S-056 — duplicate placement of S-032

**Verification:** exact embedded PNG bytes match `S-032`.

No second transcript is created. Use the source-preserving block for `S-032`.

## S-060 — duplicate placement of S-038

**Verification:** exact embedded PNG bytes match `S-038`.

No second transcript is created. Use the source-preserving block for `S-038`.

## S-067 — duplicate placement of S-046

**Verification:** exact embedded PNG bytes match `S-046`.

No second transcript is created. Use the source-preserving block for `S-046`.

## S-070 — duplicate placement of S-052

**Verification:** exact embedded PNG bytes match `S-052`.

No second transcript is created. Use the source-preserving block for `S-052`.

## S-075 — duplicate placement of S-064

**Verification:** exact embedded PNG bytes match `S-064`.

No second transcript is created. Use the source-preserving block for `S-064`.

## S-081 — duplicate placement of S-030

**Verification:** exact embedded PNG bytes match `S-030`.

No second transcript is created. Use the source-preserving block for `S-030`.
