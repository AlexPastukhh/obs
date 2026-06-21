# StatusCodePages and ProblemDetails — final coverage transcript

Source: `statuscodepages.svg`  
Coverage: **12 image uses + 77 canvas labels**

## 0.1 Area understanding / reading quality

This conspect explains how ASP.NET Core turns otherwise empty 4xx/5xx responses into useful API responses. It compares custom `UseStatusCodePages`, `UseStatusCodePagesWithReExecute`, and the default integration with `AddProblemDetails`. The area is text-heavy, but both code and labels were readable. Source images remain authoritative for exact syntax.

## Core behavior

Status-code pages middleware acts after downstream middleware/endpoints. It is relevant when a response:

```text
- has a 4xx or 5xx status;
- has not started writing headers/body;
- would otherwise have an empty body.
```

It does not replace exception handling, and it generally does not overwrite responses that already contain a body. It also cannot always know the business reason why a request produced 404, 406, 415, or another status; by default it mainly knows the status code.

## R01 — API-scoped custom StatusCodePages and ProblemDetails writers

The source scopes status-code handling to API routes using `UseWhen`, so HTML pages and unrelated endpoints are not forced into an API problem format.

A custom handler can select only relevant codes such as:

```text
404 Not Found
405 Method Not Allowed
406 Not Acceptable
415 Unsupported Media Type
```

Before writing, it checks `Response.HasStarted`. It then creates a `ProblemDetails` object using `ProblemDetailsFactory` or equivalent services. Useful fields include:

```text
status   -> current response status
 title    -> standard reason phrase or application title
 type     -> documentation/status URI
 detail   -> safe explanation
 instance -> request path
```

For 405/406/415 the handler can add safe, actionable guidance, such as checking the HTTP method, `Accept` header, or `Content-Type`. It should not invent an exact internal reason that the pipeline did not expose.

`IProblemDetailsService.TryWriteAsync` is the preferred writer path because it negotiates across registered `IProblemDetailsWriter` implementations. If no writer accepts the request, a controlled JSON fallback can be used, provided the response has not started.

## R02 — `UseStatusCodePagesWithReExecute`

`UseStatusCodePagesWithReExecute("/api/error/{0}")` re-executes the request pipeline using an error endpoint while preserving the original status information in the status-code re-execute feature.

The error endpoint can read:

```text
- the current status code;
- the original request path/query;
- the re-execute feature;
- request headers or route context needed for safe diagnostics.
```

It can return a `ProblemDetails` response and set `instance` or extensions that identify the original path. The source notes that filtering may still be required inside the error endpoint if only selected codes should receive bodies.

Tradeoffs:

```text
- every selected error re-enters part of the pipeline;
- the error endpoint must avoid recursive or already-started responses;
- it still cannot reconstruct every precise reason behind a status code;
- it is useful when a centralized endpoint/controller is preferred.
```

## R03 — `AddProblemDetails` with default StatusCodePages behavior

With:

```csharp
builder.Services.AddProblemDetails();
app.UseStatusCodePages();
```

the default status-code pages handler can ask `IProblemDetailsService` to produce a ProblemDetails response for otherwise empty error responses. This means a customization callback such as `CustomizeProblemDetails` can run even though application code did not explicitly call `Results.Problem` or `Problem()`.

Important conditions:

1. **Empty body** — if an endpoint already wrote JSON, returned a problem result, or started the response, StatusCodePages should not replace it.
2. **Content negotiation** — a registered writer must support a content type acceptable to the client, commonly JSON.
3. **Status range** — the middleware targets error statuses, not successful or redirect responses.
4. **Middleware placement** — it must wrap the endpoints whose responses it is expected to inspect.

The default output is intentionally generic. It can include status, standard title, a type URI, instance, and custom extensions such as trace identifiers, but it does not know the application-specific cause of a 404/406/415 unless that information is supplied elsewhere.

## Practical decision guide

```text
UseStatusCodePages + AddProblemDetails
- simple generic ProblemDetails for empty 4xx/5xx responses;
- customization through ProblemDetails options/writers.

Custom UseStatusCodePages handler
- choose exact status codes;
- add safe code-specific guidance;
- write through IProblemDetailsService with fallback.

UseStatusCodePagesWithReExecute
- centralize handling in an endpoint/controller;
- preserve original path/status feature;
- accept the cost and complexity of pipeline re-execution.
```

## Safety checklist

```text
- Check Response.HasStarted before writing.
- Do not overwrite an existing response body.
- Do not expose secrets or internal exception details.
- Respect Accept/content negotiation.
- Keep API behavior separate from browser/HTML behavior when needed.
- Use exception middleware for exceptions and StatusCodePages for empty status responses.
```
