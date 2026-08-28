# Problem Details writers, context, and endpoint metadata

Knowledge ID: `aspnet-core.problem-details-writers-context-and-metadata`

Topic: `aspnet-core`

## Factory, service, and writer have different responsibilities

A generic Problem Details flow can involve both:

```text
ProblemDetailsFactory
    -> creates/populates the ProblemDetails model

IProblemDetailsService
    -> selects a registered writer and asks it to write

IProblemDetailsWriter
    -> decides whether it can write and performs the output
```

A helper can accept both the factory and service because creating the model and selecting/rendering an output format are separate responsibilities.

Response lifecycle safety remains the caller's responsibility. The source explicitly notes that `ProblemDetailsService` itself does not guard `HttpResponse.HasStarted`.

## `ProblemDetailsContext` is the writer-pipeline input

The basic context contains the request and response model:

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

var written =
    await problemDetailsService.TryWriteAsync(pdContext);
```

The fuller context model can also contain:

- `Exception`, when available;
- `AdditionalMetadata`, such as endpoint metadata.

A writer can therefore make decisions from the HTTP request, the problem model, the failure, and endpoint metadata together.

## `TryWriteAsync` is an attempt, not a serialization guarantee

`TryWriteAsync(...)` returns a boolean result:

```text
true
    -> a registered writer handled the response

false
    -> no writer could handle it
```

The service tries writers in sequence and uses the first one that can write.

One reason a writer can decline is content negotiation. For example, an `Accept` header that does not match a supported Problem Details representation can leave no matching writer.

If the application requires an error body in all cases, it can provide a fallback before the response starts:

```csharp
if (!written)
{
    context.Response.ContentType = "text/plain";

    await context.Response.WriteAsync(
        $"{statusCode} {title}: {detail}");
}
```

This is the same generic writer/fallback mechanic that specialized middleware such as Status Code Pages can also use.

## The default writer is the JSON Problem Details writer

The source describes the built-in default writer as:

- checking `Accept` compatibility, including JSON/problem+json/wildcards;
- applying defaults;
- adding `traceId`;
- applying `CustomizeProblemDetails`;
- writing JSON as `application/problem+json`.

`IProblemDetailsService` orchestrates writer selection; it does not directly mean "serialize JSON".

## Rich context enables endpoint-aware custom writers

A complete context can include the exception and current endpoint metadata:

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
```

This allows a custom writer to inspect both the failure and declarative metadata attached to the endpoint.

## `CanWrite` can make a writer opt-in through metadata

The source uses a marker attribute:

```csharp
public sealed class CustomMetadataProblemDetailsWriter
    : IProblemDetailsWriter
{
    public bool CanWrite(ProblemDetailsContext context)
    {
        var hasMarker = context.AdditionalMetadata?
            .OfType<UseCustomProblemWriterAttribute>()
            .Any() == true;

        return hasMarker;
    }
}
```

If the marker is absent, the writer declines and later/default writers remain eligible.

The marker can target methods or classes:

```csharp
[AttributeUsage(
    AttributeTargets.Method | AttributeTargets.Class)]
public sealed class UseCustomProblemWriterAttribute : Attribute
{
}
```

This turns an alternative error representation into an endpoint-level opt-in contract rather than a controller-by-controller imperative branch.

## A writer can enrich the existing Problem Details model

The custom writer can inspect `context.Exception` and endpoint metadata, then add controlled extensions:

```csharp
if (context.Exception is not null)
{
    pd.Extensions["exceptionType"] =
        context.Exception.GetType().Name;
}

var endpointName = context.AdditionalMetadata?
    .OfType<EndpointNameMetadata>()
    .FirstOrDefault()?
    .EndpointName;

if (!string.IsNullOrWhiteSpace(endpointName))
{
    pd.Extensions["endpoint"] = endpointName;
}
```

It then writes the same enriched `ProblemDetails` object as `application/problem+json`.

Exception-type output is a diagnostic example and should be reviewed or removed for production when it exposes information the public API should not reveal.

## Writer customization stays inside the service pipeline

`CustomizeProblemDetails` applies when a response is written through the Problem Details service/writer path.

A component that manually writes a response without invoking the service bypasses those configured writers and customizations.

That boundary is important: registering a customization does not automatically modify every response that happens to contain JSON shaped like Problem Details.

## What should be recallable

- What is the difference between `ProblemDetailsFactory`, `IProblemDetailsService`, and `IProblemDetailsWriter`?
- Who must check `Response.HasStarted`?
- Which fields can `ProblemDetailsContext` carry?
- What does `TryWriteAsync(false)` mean?
- Why can content negotiation make every writer decline?
- What does the default JSON writer do before writing?
- How can endpoint metadata make a custom writer opt-in?
- What happens when `CanWrite` returns false?
- How can a writer use `Exception` and endpoint metadata to enrich `ProblemDetails`?
- Why should exception-type diagnostics be reviewed for production?
- When does `CustomizeProblemDetails` apply, and how can manual response writing bypass it?

## Related knowledge

- `aspnet-core.status-code-pages-and-problem-details`
- `aspnet-core.exception-middleware-response-lifecycle`
- `aspnet-core.exception-handler-features`
- `aspnet-core.endpoint-metadata-and-mvc-action-descriptors`

## Sources

- Workspace: `_ai-conspects/EXCEPTIONHANDLERS/`
- Authoritative processed source: `04-stage4-corrected-source-preserving-transcript.md`, S-009 through S-022 and the service-pipeline boundary in S-023
- Current source of truth: `CURRENT_SOURCE_OF_TRUTH.md`
- Closure evidence: `03-closure-audit.md`
- Provenance caveat: the current SOT says preserved source images remain authoritative, but `_ai-conspects/EXCEPTIONHANDLERS/source/` is not physically resolvable on the current branch
