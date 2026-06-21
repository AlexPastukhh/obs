# R01 — Cookie authentication redirects and API ProblemDetails final coverage transcript v001

Conspect: `cookies auth ON REDIRECT  probmem details returning`  
Source: `cookies auth ON REDIRECT  probmem details returning.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

Cookie authentication normally redirects on challenge/forbid. This sheet shows how to retain browser redirects for page routes while returning API-friendly 401/403 ProblemDetails for API routes.

Reading quality: verified. The whole sheet is a single coherent region; all 4 image uses and 43 SVG text labels were reviewed against preserved source evidence.

## 1. Why the redirect becomes a problem for APIs

Cookie authentication is browser-oriented by default. A failed challenge normally produces a redirect to the login page, and a forbidden result normally redirects to an access-denied page. That behavior is useful for MVC/Razor pages but undesirable for JSON APIs.

The sheet illustrates a frontend-development failure mode:

1. the browser calls an API through a Vite/dev proxy;
2. the backend answers with `302` and an absolute `Location` header pointing at the backend login page;
3. the proxy passes the redirect through unchanged;
4. the browser follows it as a new cross-origin request;
5. the request can then fail CORS checks and, even if it succeeds, the client receives HTML instead of the expected JSON error.

The important distinction is therefore endpoint intent: interactive page endpoints may redirect, API endpoints should normally return status codes and a machine-readable body.

## 2. Split page behavior from API behavior

The event handlers keep the normal redirect for non-API routes and replace it for API routes. The source uses a path check such as:

```csharp
if (!ctx.Request.Path.StartsWithSegments("/api"))
{
    ctx.Response.Redirect(ctx.RedirectUri);
    return;
}
```

For an API challenge, set `401 Unauthorized`. For access denial after a user has authenticated, set `403 Forbidden`.

```csharp
ctx.Response.StatusCode = StatusCodes.Status401Unauthorized;
// or StatusCodes.Status403Forbidden
```

In applications with endpoint metadata, prefer a stable API marker over a raw `/api` prefix. The core design is the same: detect whether redirect semantics are appropriate before writing the response.

## 3. Create and write ProblemDetails

The source resolves `ProblemDetailsFactory` and `IProblemDetailsService` from request services, creates a `ProblemDetails` instance, and writes it through the configured service.

For a challenge:

```csharp
var pd = factory.CreateProblemDetails(
    httpContext: http,
    statusCode: StatusCodes.Status401Unauthorized,
    title: "Unauthorized",
    type: "https://httpstatuses.com/401",
    detail: "Authentication is required to access this resource.",
    instance: http.Request.Path);
```

For access denial, use `403`, title `Forbidden`, and a permission-oriented detail. `TryWriteAsync`/`WriteAsync` allows the application's configured ProblemDetails writers and defaults to participate.

A safe fallback checks whether the service actually wrote the response. If not, set `application/problem+json` and serialize the object directly:

```csharp
var written = await pds.TryWriteAsync(new ProblemDetailsContext
{
    HttpContext = http,
    ProblemDetails = pd
});

if (!written)
{
    http.Response.ContentType = "application/problem+json";
    await http.Response.WriteAsJsonAsync(pd);
}
```

Do not redirect and then attempt to write JSON: once the redirect response is chosen, the two semantics conflict.

## 4. Security and integration notes

- Treat the supplied return URL as data; rely on framework-generated redirect URIs or validate local URLs before using custom values.
- Do not expose sensitive authentication details in `detail`.
- Preserve page redirects only where a browser navigation is expected.
- For APIs, keep the status code and body aligned: challenge → `401`, authenticated-but-not-authorized → `403`.
- The response should be written once; avoid continuing to later middleware after the authentication event has produced the final body.

## 6. Coverage

```text
R01 processed image uses: 4
R01 processed text labels: 43
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
