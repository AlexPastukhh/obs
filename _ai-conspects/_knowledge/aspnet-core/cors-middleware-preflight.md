# CORS middleware and preflight handling

Knowledge ID: `aspnet-core.cors-middleware-preflight`

Topic: `aspnet-core`

## Core model

Use ASP.NET Core CORS middleware for browser preflight rather than manually reproducing the CORS decision protocol in controller actions.

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("spa", policy =>
    {
        policy
            .WithOrigins("https://app.example")
            .WithMethods("GET", "POST", "PATCH", "DELETE")
            .WithHeaders("Content-Type", "Authorization", "If-Match")
            .AllowCredentials()
            .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });
});
```

The policy explicitly controls allowed origins, methods, request headers, credentials, and preflight cache duration.

## Pipeline placement

```csharp
app.UseRouting();
app.UseCors("spa");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
```

Middleware order matters. CORS must run early enough to handle the request before endpoint authorization rejects the preflight.

In ordinary controller applications, a dedicated `[HttpOptions]` action is unnecessary for browser preflight because the middleware can short-circuit it. Add an explicit `OPTIONS` endpoint only when the API intentionally exposes resource-capability metadata beyond CORS.

## Manual-handling risk

Manual code would need to process `Origin`, requested method and headers, allowed origins/methods/headers, credentials policy, preflight cache duration, and cache variation. Omitting one dimension can produce policy or caching errors.

## What should be recallable

- Why should CORS middleware normally handle browser preflights?
- Which policy dimensions are configured in `AddCors`?
- Where does `UseCors` belong relative to authentication and authorization in this source's pipeline?
- When is an explicit `[HttpOptions]` endpoint justified?
- What responsibilities make manual preflight handling error-prone?

## Related knowledge

- `http.options-and-cors-preflight` — protocol semantics handled by the middleware.
- `http.vary-origin-cache-variants` — cache variation required for reflected origins.

## Sources

- Workspace: `_ai-conspects/options requ/`
- Processed source: `01-final-transcript.md`, R02 — ASP.NET Core handling
- Original SVG: `source/options requ.svg`
