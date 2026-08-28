# Status Code Pages and Problem Details responses

Knowledge ID: `aspnet-core.status-code-pages-and-problem-details`

Topic: `aspnet-core`

Status Code Pages handles otherwise bodyless `400`–`599` responses. It is not exception middleware and it does not replace an error body an endpoint already wrote. With Problem Details services registered, the default flow is conceptually:

```text
empty-body 4xx/5xx response
-> StatusCodePages handler
-> IProblemDetailsService.TryWriteAsync
-> configured writers/content negotiation
-> CustomizeProblemDetails
```

```csharp
builder.Services.AddProblemDetails(options =>
{
    options.CustomizeProblemDetails = context =>
        context.ProblemDetails.Extensions["traceId"] =
            context.HttpContext.TraceIdentifier;
});

app.UseStatusCodePages();
```

The writer path runs only when the response is eligible, a writer can be selected, and the middleware handles the status. Existing response bodies are not overwritten.

## Direct callback and selected statuses

Use the callback form when only selected API statuses should receive a body or when exact response checks are required:

```csharp
app.UseWhen(
    ctx => ctx.Request.Path.StartsWithSegments("/api"),
    api => api.UseStatusCodePages(async statusContext =>
    {
        var http = statusContext.HttpContext;
        if (http.Response.HasStarted)
            return;

        var code = http.Response.StatusCode;
        if (code is not (
            StatusCodes.Status404NotFound or
            StatusCodes.Status405MethodNotAllowed or
            StatusCodes.Status406NotAcceptable or
            StatusCodes.Status415UnsupportedMediaType))
        {
            return;
        }

        var factory = http.RequestServices
            .GetRequiredService<ProblemDetailsFactory>();
        var service = http.RequestServices
            .GetRequiredService<IProblemDetailsService>();

        var detail = code switch
        {
            StatusCodes.Status404NotFound => "Endpoint not found.",
            StatusCodes.Status405MethodNotAllowed =>
                "HTTP method not allowed for this endpoint.",
            StatusCodes.Status406NotAcceptable =>
                "Check the Accept header.",
            StatusCodes.Status415UnsupportedMediaType =>
                "Check the Content-Type header.",
            _ => null
        };

        var problem = factory.CreateProblemDetails(
            http,
            statusCode: code,
            title: ReasonPhrases.GetReasonPhrase(code),
            type: $"https://httpstatuses.com/{code}",
            detail: detail,
            instance: http.Request.Path);

        var written = await service.TryWriteAsync(
            new ProblemDetailsContext {
                HttpContext = http,
                ProblemDetails = problem
            });

        if (!written && !http.Response.HasStarted)
        {
            http.Response.ContentType =
                "application/problem+json; charset=utf-8";
            await http.Response.WriteAsJsonAsync(problem);
        }
    }));
```

`Response.HasStarted` means headers/body can no longer be safely replaced. `TryWriteAsync(false)` means no configured writer wrote the problem, so a deliberate JSON fallback is possible only before the response starts.

Status Code Pages knows the status, not the precise business cause. A generic problem commonly carries `status`, a standard `title`, a type URI, safe `detail`, and request-path `instance`. Do not claim an exact cause that the middleware cannot know or expose internal exception details. `406` can point the client to `Accept`; `415` can point it to `Content-Type`.

## Re-execution

`UseStatusCodePagesWithReExecute("/api/error/{0}")` sends an eligible response through the pipeline again at an error endpoint. It does not accept the same arbitrary callback. Restrict the branch before the middleware or filter status codes inside the error endpoint, and prevent recursive re-execution.

```csharp
app.UseWhen(
    ctx => ctx.Request.Path.StartsWithSegments("/api"),
    api => api.UseStatusCodePagesWithReExecute("/api/error/{0}"));
```

The error endpoint can read the original request location:

```csharp
var feature = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();
var originalPath = feature?.OriginalPath ?? HttpContext.Request.Path.Value;
var originalQuery = feature?.OriginalQueryString;
```

Filtering only inside the error endpoint still pays for another pipeline execution for every re-executed status. The original response normally had not started; checking `HasStarted` in the endpoint is not the primary selection mechanism.

Place Status Code Pages where it can see the statuses produced by the intended downstream pipeline. Keep exception handling separate, and make API/page branching explicit when their error representations differ.

## What should be recallable

- Which status/body conditions trigger Status Code Pages?
- How do `AddProblemDetails`, `IProblemDetailsService`, writers, and customization connect?
- Why check `HasStarted` before writing or falling back?
- What does `TryWriteAsync(false)` mean?
- When should the callback form be used instead of re-execution?
- Where can selected codes be filtered for `WithReExecute`?
- How is the original path/query recovered?
- Why can a generic status page not reconstruct a business-specific cause?

## Sources

- Workspace: `_ai-conspects/statuscodepages/`
- Authoritative processed sources: `10-full-source-preserving-transcript-v002.md`, S-001 through S-012 and native canvas code, plus `11-technical-corrections-v002.md`
- Original SVG: `source/statuscodepages.svg`
