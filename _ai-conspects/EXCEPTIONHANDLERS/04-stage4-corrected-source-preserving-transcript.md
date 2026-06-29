# Exception Handlers — corrected near-literal combined transcript

Generated: 2026-06-29

## Status

```text
source SVG image uses: 24
source blocks in this transcript: 24
near-literal normalized blocks: 24
blocks with explicit crop limitation: 2
recall-question sets: 24
```

The previous Stage1 transcript had complete ID coverage but replaced distinct sources with repeated general statements. This corrected layer is intended for repetition and question generation.

---

# Exception Handlers — corrected source-preserving transcript: global middleware and response lifecycle

Generated: 2026-06-29

## Transcript standard

This file supersedes the previous generic semantic blocks for S-001 through S-008.

- Visible prose and code are transferred close to the source.
- Punctuation and obvious screenshot/OCR artifacts are normalized.
- Cropped content is explicitly marked.
- The preserved source image remains authoritative for an unreadable character.
- Every source has recall questions.

## Sources

### S-001 — UseExceptionHandler pipeline and the start of the manual ProblemDetails flow

**Readability:** high  
**Known limits:** top of the file is outside the screenshot; the code continues in S-002

#### Near-literal normalized transcript

The code branches by environment:

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler(errorApp =>
    {
        errorApp.Run(async context =>
        {
            // If the response already started, we can't write our problem details
            if (context.Response.HasStarted)
            {
                return;
            }

            var exceptionHandlerFeature =
                context.Features.Get<IExceptionHandlerFeature>();
            var ex = exceptionHandlerFeature?.Error;

            // Resolve ProblemDetailsFactory from DI
            var problemDetailsFactory =
                context.RequestServices
                    .GetRequiredService<ProblemDetailsFactory>();
```

The screenshot is the first part of a longer example. It shows the production branch, a custom `UseExceptionHandler` callback, the `HasStarted` guard, extraction of `IExceptionHandlerFeature`, and resolving `ProblemDetailsFactory` from dependency injection.

#### Study meaning

The exception middleware can replace the response only before the response has started. `IExceptionHandlerFeature.Error` gives the exception captured by the middleware. The factory is resolved from request services so the generated `ProblemDetails` follows ASP.NET Core defaults.

#### Recall questions

1. Why is `UseDeveloperExceptionPage` placed only in the development branch?
2. What does `context.Response.HasStarted` protect against?
3. What information is taken from `IExceptionHandlerFeature`?
4. Why is `ProblemDetailsFactory` resolved from `context.RequestServices`?
### S-002 — Create and write ProblemDetails with the factory

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The continuation maps the exception to an HTTP status and creates a standard problem response:

```csharp
// You can map exception types to status codes if you want
var statusCode = StatusCodes.Status500InternalServerError;

// Create ProblemDetails using the factory (consistent defaults)
var problem = problemDetailsFactory.CreateProblemDetails(
    context,
    statusCode: statusCode,
    title: "An unexpected error occurred.",
    type: "https://httpstatuses.com/500",
    detail: app.Environment.IsDevelopment() ? ex?.ToString() : null,
    instance: context.Request.Path
);

// Optionally attach extra info (extensions)
problem.Extensions["traceId"] = context.TraceIdentifier;

context.Response.Clear();
context.Response.StatusCode = statusCode;
context.Response.ContentType = "application/problem+json";

await context.Response.WriteAsJsonAsync(problem);
```

The callback then closes the nested delegates.

#### Study meaning

`ProblemDetailsFactory` supplies the standard RFC-style shape and framework defaults. The full exception is included only in development. `traceId` is added as an extension. `Clear()` removes stale response state before setting the new status, content type, and JSON body.

#### Recall questions

1. Which fields are supplied to `CreateProblemDetails`?
2. Why is `detail` conditional on the environment?
3. Why is `traceId` useful?
4. Why must `Response.Clear()` be called only before the response starts?
### S-003 — What IExceptionHandlerFeature is

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

**What “features” are**

`HttpContext.Features` is a per-request “bag” of interfaces that middleware can add to share information with later middleware.

**What `IExceptionHandlerFeature` contains**

When an exception occurs downstream and is intercepted by `UseExceptionHandler`, the middleware sets an `IExceptionHandlerFeature` in that bag. It typically provides:

- `Error` — the actual `Exception` object that was thrown.
- `Path` — the original request path where the exception happened. This is useful because the handler may run on a different path or pipeline.
- Sometimes endpoint information, depending on framework version and internals.

#### Study meaning

The feature collection is middleware-to-middleware request state. `IExceptionHandlerFeature` is the bridge between the exception-catching middleware and the code that formats the error response.

#### Recall questions

1. What is `HttpContext.Features`?
2. Which `IExceptionHandlerFeature` property contains the thrown exception?
3. Why can the original `Path` differ from the path used by the handler?
### S-004 — How the handler reads the captured exception

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The shown code is:

```csharp
var exceptionHandlerFeature =
    context.Features.Get<IExceptionHandlerFeature>();
var ex = exceptionHandlerFeature?.Error;
```

It means:

- “Give me the exception captured by the exception-handler middleware.”
- “Use it to populate `ProblemDetails`, for example in development.”

Without this feature, the handler would only know that an error occurred, not which error occurred.

In this example, `ex` is used mainly for:

```csharp
ex?.ToString()
```

in development, which includes the message and stack trace. In production, stack traces should not be returned for security reasons.

#### Study meaning

The middleware catches the exception, stores it in the feature collection, and the error-writing callback retrieves it. Production responses should remain generic even though detailed exception information is available internally.

#### Recall questions

1. What does `exceptionHandlerFeature?.Error` return?
2. Why is `ex?.ToString()` appropriate only in development output?
3. What information would be unavailable without `IExceptionHandlerFeature`?
### S-005 — Why return when Response.HasStarted is true

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`HttpResponse.HasStarted == true` means the server has already begun sending the response to the client — at least the headers, and possibly part of the body.

Once headers are sent:

- you cannot reliably change the status code;
- you cannot change headers such as `Content-Type`;
- you usually cannot cleanly replace the body with a new `ProblemDetails` payload.

Therefore the guard is:

```csharp
if (context.Response.HasStarted)
{
    return;
}
```

It prevents a second failure such as:

- “Cannot clear headers because the response has already started”;
- sending a corrupted or partial response.

#### Study meaning

`HasStarted` is the boundary after which the application no longer controls the complete HTTP response. An exception can still be observed and logged, but safely replacing the response is usually impossible.

#### Recall questions

1. What does `HasStarted` say about headers and body bytes?
2. Which response properties become unsafe to change after start?
3. What secondary failure does the guard prevent?
### S-006 — Examples of a response that has already started

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`HasStarted` can become true when:

- the endpoint is streaming a response, such as a file download or a large response;
- something wrote to the response body early, for example:

```csharp
await Response.BodyWriter.WriteAsync(...);
```

- an earlier middleware wrote headers or body data before the exception occurred.

If an exception happens after bytes were already written, the server cannot “rewind time” and send a clean JSON error envelope. The remaining options are usually:

- log the exception;
- sometimes abort the connection;
- or write nothing further.

#### Study meaning

Streaming and early writes create a point of no return. Global exception handling still detects the failure, but it cannot guarantee a valid replacement payload.

#### Recall questions

1. Name three situations that can set `HasStarted`.
2. Why can a JSON error envelope not replace an already-streaming response?
3. What actions remain possible after bytes have been sent?
### S-007 — What the exception middleware can and cannot catch

**Readability:** high  
**Known limits:** bottom of the source is cropped; only the two visible limitations are transcribed

#### Near-literal normalized transcript

An exception handler catches exceptions thrown downstream of the point where it is registered, but there are real limits.

It cannot catch or safely transform exceptions that occur:

1. **Before `UseExceptionHandler` runs.** Middleware order matters: anything earlier in the pipeline is not wrapped by it.
2. **After the response has started.** It can catch the exception, but it cannot safely change the response into a new `ProblemDetails` payload.

The screenshot continues below the visible crop, so only these two limitations are fully readable.

#### Study meaning

Global exception handling is not global in time: it wraps only the remainder of the middleware pipeline. Detection and response replacement are separate capabilities; after response start, detection may succeed while replacement fails.

#### Recall questions

1. How does middleware order determine which exceptions are caught?
2. Can the middleware observe an exception after the response starts?
3. Why does observing the exception not imply that a new response can be written?
### S-008 — Map known exception types to better status codes

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A production improvement is to map known exceptions to more meaningful HTTP status codes, for example:

- `KeyNotFoundException` → `404`;
- a domain validation exception → `422`;
- unknown exceptions → `500`.

The shown pattern is:

```csharp
var statusCode = ex switch
{
    KeyNotFoundException =>
        StatusCodes.Status404NotFound,

    _ =>
        StatusCodes.Status500InternalServerError
};
```

#### Study meaning

A generic 500 is appropriate for unexpected failures, but expected domain or lookup failures should become stable API contracts with explicit status codes.

#### Recall questions

1. Why should `KeyNotFoundException` not necessarily return 500?
2. What should the default arm of the switch return?
3. Where would a domain validation exception normally map?



---

# Exception Handlers — corrected source-preserving transcript: ProblemDetails service, context, and writers

Generated: 2026-06-29

## Transcript standard

This file supersedes the previous generic semantic blocks for S-009 through S-018.

### S-009 — Helper signature and HasStarted guard for IProblemDetailsService

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The helper method begins as:

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

The method receives both `ProblemDetailsFactory` and `IProblemDetailsService`.

#### Study meaning

The factory creates the model; the service chooses a registered writer and emits the response. The application, not the service, performs the `HasStarted` guard before clearing and replacing the response.

#### Recall questions

1. Why does the helper accept both a factory and a service?
2. Where is the `HasStarted` check performed?
3. What response state is set before writing?
### S-010 — Create ProblemDetailsContext and call TryWriteAsync

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The helper creates a `ProblemDetails` object:

```csharp
var problem = problemDetailsFactory.CreateProblemDetails(
    httpContext: context,
    statusCode: statusCode,
    title: title,
    detail: detail,
    instance: context.Request.Path);
```

It wraps the model and request in a `ProblemDetailsContext`:

```csharp
var pdContext = new ProblemDetailsContext
{
    HttpContext = context,
    ProblemDetails = problem
};
```

Then it asks the service to write it:

```csharp
var written =
    await problemDetailsService.TryWriteAsync(pdContext);
```

#### Study meaning

`ProblemDetailsContext` is the input object passed through the writer pipeline. `TryWriteAsync` returns whether any registered writer successfully handled the response.

#### Recall questions

1. Which fields are placed in `ProblemDetailsContext` here?
2. What does `TryWriteAsync` return?
3. Why is the request path used as `instance`?
### S-011 — Plain-text fallback when no ProblemDetails writer accepts the response

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

If no writer succeeds, the helper falls back to text:

```csharp
if (!written)
{
    context.Response.ContentType = "text/plain";

    await context.Response.WriteAsync(
        $"{statusCode} {title}: {detail}");
}
```

#### Study meaning

The writer pipeline can decline a response, commonly because content negotiation does not match. A fallback guarantees that the client still receives an error body.

#### Recall questions

1. When is the fallback executed?
2. Which content type is used by the fallback?
3. What information is placed in the text body?
### S-012 — Meaning of the written boolean

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`TryWriteAsync(...)` returns a `bool` inside `ValueTask<bool>`.

The service processes writers in sequence and finishes when:

- one writer writes successfully; or
- none of the writers can write successfully.

Therefore:

- `written == true` means a writer handled the response;
- `written == false` means no writer could write it.

A common reason for `false` is that the request `Accept` header does not match a supported media type, for example a client accepts only `text/plain`. Problem-details generation depends on `Accept` matching a supported type; the default writer produces JSON.

That is why fallback logic is useful.

#### Study meaning

`TryWriteAsync` is a negotiation-aware attempt, not a guaranteed serialization call. The result must be checked if the application requires a body in all cases.

#### Recall questions

1. What does `written == false` mean?
2. How can the `Accept` header cause the default writer to decline?
3. Why is a plain-text fallback reasonable?
### S-013 — Why Response.Clear is used before a replacement error payload

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Middleware may run after another component has already touched response state such as status code, headers, or body intent. Before writing a replacement error payload, `Clear()` is used to avoid:

- stale headers;
- the wrong content type;
- a partially prepared output.

The rule is that `Clear()` is safe only before the response has started:

```csharp
if (context.Response.HasStarted)
{
    return;
}
```

If the response has started, clearing or replacing headers and body is too late.

#### Study meaning

`Clear()` makes the error response internally consistent, but only while the server still owns the unsent response.

#### Recall questions

1. What stale response state can `Clear()` remove?
2. Why must the code check `HasStarted` first?
3. What can happen if `Clear()` is attempted too late?
### S-014 — IProblemDetailsService itself does not guard HasStarted

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The shown explanation states that `ProblemDetailsService` itself does not check `HttpContext.Response.HasStarted`.

Its current responsibility is to:

- validate `context`, `ProblemDetails`, and `HttpContext`;
- iterate registered `IProblemDetailsWriter` instances;
- call `CanWrite(...)`;
- call `WriteAsync(...)` on the first matching writer.

There is no `HasStarted` guard in that service.

#### Study meaning

The caller must enforce response lifecycle safety. The service focuses on writer selection and output, not on determining whether the response can still be replaced.

#### Recall questions

1. Which component must check `HasStarted`?
2. What does `ProblemDetailsService` validate?
3. How does it select a writer?
### S-015 — What IProblemDetailsWriter is and what the default writer does

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`IProblemDetailsService.TryWriteAsync(...)` does not directly serialize JSON. It delegates to registered `IProblemDetailsWriter` services.

The writers are tried in sequence until one succeeds. The built-in default writer is the JSON problem-details writer.

The default writer:

- checks `Accept` compatibility, including `application/json`, `application/problem+json`, and wildcards;
- applies defaults;
- adds `traceId`;
- runs `CustomizeProblemDetails`;
- writes JSON as `application/problem+json`.

Writers are the pluggable formatting and output layer.

#### Study meaning

The service orchestrates; writers decide whether and how to render the problem response. Custom writers can add alternative formats or endpoint-specific behavior.

#### Recall questions

1. Does `IProblemDetailsService` serialize JSON itself?
2. What does `CanWrite`/content negotiation decide?
3. Which customizations are applied by the default writer?
4. Why are writers described as a pluggable output layer?
### S-016 — Fields available in ProblemDetailsContext

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Documentation shows that `TryWriteAsync` receives a `ProblemDetailsContext`.

The context includes:

- `HttpContext`;
- `ProblemDetails`;
- `Exception`, when available;
- `AdditionalMetadata`.

#### Study meaning

A writer can use more than the response model. It can inspect request state, the exception, and metadata attached by the endpoint or exception-handling pipeline.

#### Recall questions

1. Which object contains the response model passed to writers?
2. When may `Exception` be available?
3. What is `AdditionalMetadata` useful for?
### S-017 — Examples of data a custom writer can inspect

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Examples given in the source:

- exception-handler middleware can attach the exception;
- endpoint metadata can be passed;
- custom writers can inspect more than only the response body and `HttpContext`.

#### Study meaning

The writer pipeline can make formatting decisions from both the failure and the endpoint that failed, allowing targeted behavior without hard-coding it into every controller.

#### Recall questions

1. What extra information can exception middleware attach?
2. How can endpoint metadata influence a custom writer?
3. Why is this richer than serializing `ProblemDetails` directly?
### S-018 — Build a ProblemDetailsContext with exception and endpoint metadata

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The example creates a complete context:

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

#### Study meaning

The writer receives the exception and the endpoint metadata together with the standard response model. The same boolean fallback pattern is retained.

#### Recall questions

1. How is endpoint metadata obtained?
2. Where is the exception placed?
3. What fallback is used if no writer handles the context?



---

# Exception Handlers — corrected source-preserving transcript: custom writer, endpoint metadata, and default exception output

Generated: 2026-06-29

> Compatibility note: this file keeps the old repository filename, but the former
> `local try-catch / domain validation / pitfalls` scope was incorrect. The actual
> sources concern `ProblemDetailsContext`, writer selection, endpoint metadata,
> `CustomizeProblemDetails`, and the default exception response.

## Transcript standard

This file supersedes the previous generic and semantically misassigned blocks for S-019 through S-024.

### S-019 — Custom writer selects endpoints by marker metadata

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The custom writer starts as:

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

#### Study meaning

`CanWrite` limits the custom writer to endpoints carrying a marker attribute. Other responses remain available to later/default writers.

#### Recall questions

1. What condition makes this writer eligible?
2. Where does the endpoint metadata come from?
3. What happens if `CanWrite` returns false?
### S-020 — Custom writer enriches ProblemDetails from the exception and endpoint

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The `WriteAsync` method begins:

```csharp
public ValueTask WriteAsync(ProblemDetailsContext context)
{
    var http = context.HttpContext;
    var pd = context.ProblemDetails;

    // Add extra info from context.Exception (if available)
    if (context.Exception is not null)
    {
        pd.Extensions["exceptionType"] =
            context.Exception.GetType().Name;
    }

    // Add some endpoint metadata info (demo)
    var endpointName = context.AdditionalMetadata?
        .OfType<EndpointNameMetadata>()
        .FirstOrDefault()?
        .EndpointName;
```

#### Study meaning

The writer modifies the existing problem model instead of constructing an unrelated response. It adds controlled diagnostic information from the exception and endpoint metadata.

#### Recall questions

1. Which extension is added from `context.Exception`?
2. How is the endpoint name discovered?
3. Why might exposing exception type require production review?
### S-021 — Finish the custom writer and define the marker attribute

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The continuation writes the endpoint extension and JSON response:

```csharp
if (!string.IsNullOrWhiteSpace(endpointName))
{
    pd.Extensions["endpoint"] = endpointName;
}

http.Response.ContentType = "application/problem+json";

return new ValueTask(
    http.Response.WriteAsJsonAsync(pd));
```

The endpoint marker is defined as:

```csharp
[AttributeUsage(
    AttributeTargets.Method | AttributeTargets.Class)]
public sealed class UseCustomProblemWriterAttribute : Attribute
{
}
```

#### Study meaning

The marker can be placed on a controller class or action method. The custom writer then writes the enriched `ProblemDetails` as JSON.

#### Recall questions

1. Which targets can receive `UseCustomProblemWriterAttribute`?
2. What content type does the writer set?
3. Under which condition is the `endpoint` extension added?
### S-022 — Purpose of the endpoint-aware custom writer

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The example:

- handles only endpoints with a custom marker;
- adds the exception type as a safe internal example, with a note to remove it in production if necessary;
- adds endpoint metadata information to `ProblemDetails.Extensions`.

#### Study meaning

The pattern is useful for opt-in error formats or diagnostics. The endpoint chooses the behavior declaratively through metadata.

#### Recall questions

1. What makes the custom writer opt-in?
2. Which two pieces of information are added?
3. Why might exception type be removed in production?
### S-023 — UseExceptionHandler together with AddProblemDetails customization

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

When `AddProblemDetails(...)` is registered, ASP.NET Core registers an `IProblemDetailsService`.

If the built-in exception handler is used:

```csharp
app.UseExceptionHandler();
```

and no custom handler writes its own body, an unhandled exception is written as a `ProblemDetails` response through that service.

A configured `CustomizeProblemDetails` callback is applied to those exception responses.

The callback is not automatically applied when:

- a custom `UseExceptionHandler(errorApp => ...)` writes the response itself and does not call the problem-details service;
- the response has already started.

#### Study meaning

`AddProblemDetails` customizes responses only when the response flows through its service/writer pipeline. Writing a body manually bypasses that pipeline unless it is explicitly invoked.

#### Recall questions

1. When is `CustomizeProblemDetails` applied to exception responses?
2. How can a custom `UseExceptionHandler` callback bypass it?
3. What response lifecycle condition prevents application?
### S-024 — Default ProblemDetails written for an unhandled exception

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

When `UseExceptionHandler` handles an unhandled exception and writes through the problem-details service, the result typically contains:

- **Status:** `500` by default, unless the exception handler maps it differently;
- **Title:** something like “An error occurred while processing your request.”;
- **Type:** a generic server-error type or the framework default;
- **Detail:** usually not the full exception, especially in production;
- **Instance:** often the request path;
- **Extensions:** commonly a `traceId` and other diagnostics.

Therefore the default behavior is a generic 500 `ProblemDetails` response unless the application customizes it.

#### Study meaning

The default response is deliberately safe and generic. Domain-specific status mapping, detailed development output, and custom extensions are application choices.

#### Recall questions

1. What is the default status code?
2. Which field commonly contains the request path?
3. Why is the full exception usually omitted from `detail` in production?
4. How can the application change the default output?


