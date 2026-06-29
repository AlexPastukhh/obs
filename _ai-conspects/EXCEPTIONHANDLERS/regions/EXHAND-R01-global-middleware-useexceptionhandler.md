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

