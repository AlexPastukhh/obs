# link generator — final coverage transcript v001

Source SVG: `link generator.svg`  
Conspect folder: `link generator`  
Stage: combined ten-conspect final coverage

## R01 — URL helpers and `LinkGenerator`

Inside controllers and Razor Pages, use the contextual `Url` helper for ordinary endpoint URL generation:

```text
Url.Action
Url.RouteUrl
Url.Page
Url.Link
```

Outside controllers/pages—services, middleware, link factories—inject `LinkGenerator`. It is a DI service from ASP.NET Core routing and is normally available when routing, controllers, Razor Pages or minimal APIs are configured; it usually does not need manual registration.

A request-scoped email link factory can combine `LinkGenerator` with `IHttpContextAccessor`:

```csharp
var http = httpContextAccessor.HttpContext
    ?? throw new InvalidOperationException("No active HTTP request");

var verificationLink = linkGenerator.GetUriByName(
    httpContext: http,
    endpointName: UserEndpoints.VerifyEmail,
    values: new { token = verificationToken.Id });
```

Named endpoints provide a stable address independent of the concrete path template. Handle a null result because link generation can fail when no endpoint matches the supplied address/values.

### Path versus absolute URI

`GetPathByName`, `GetPathByAction` and related methods return a path. `GetUriByName`, `GetUriByAction` and related methods produce an absolute URI and require scheme/host information, either from `HttpContext` or explicit arguments.

For background jobs there may be no active request. Generate with configured public origin data:

```csharp
linkGenerator.GetUriByName(
    httpContext: null,
    endpointName: UserEndpoints.VerifyEmail,
    values: new { token = verificationToken.Id },
    scheme: "https",
    host: new HostString("api.example.com"));
```

This is often preferable for production email links because the public origin is stable and not derived from an untrusted request Host header.

### Practical rules

```text
- controllers/Razor Pages: prefer Url.*;
- reusable services: inject LinkGenerator;
- name endpoints that must be linked from outside their defining module;
- supply every required route value;
- distinguish a relative path from an absolute public URI;
- use configured scheme/host for workers and queued email generation;
- validate forwarded-host configuration before trusting request-derived absolute URLs;
- handle null when link generation cannot find a matching endpoint.
```

Ambient route values can affect contextual URL generation. Explicit endpoint names and values make infrastructure-generated links more predictable.

## Coverage

```text
R01 processed image uses: 4
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
