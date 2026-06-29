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

