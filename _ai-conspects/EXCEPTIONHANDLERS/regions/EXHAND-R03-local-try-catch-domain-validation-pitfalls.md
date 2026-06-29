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

