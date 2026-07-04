# HttpContext.Items and HttpContext.Features — source-preserving transcript v001

Source Git blob: `677f4776c09894da50db21d2d529de986c2f67ea`

```text
screenshots: 27 / 27
native canvas labels: 7 / 7
```

## S-001 — Why an object key instead of a const string

`HttpContext.Items` is an `IDictionary<object, object?>`. A private object key gives collision-proof identity.

String keys compare by value. Two libraries using the same text, such as `"CorrelationId"`, can overwrite/read each other's value.

```csharp
const string Key = "CorrelationId";
```

An object key compares by reference identity, so only code holding the exact key instance can retrieve the value.

## S-002 — Collision-safe Items key pattern

Use a static object field:

```csharp
public static class HttpContextItemKeys
{
    public static readonly object CorrelationId = new();
}
```

Store a value:

```csharp
ctx.Items[HttpContextItemKeys.CorrelationId] = "abc";
```

This avoids key collisions across middleware, shared libraries, and packages.

## S-003 — Items example: correlation ID middleware

A middleware generates or reads a correlation ID, stores it for later components, and returns it in a response header.

```csharp
app.Use(async (ctx, next) =>
{
    var correlationId =
        ctx.Request.Headers.TryGetValue("X-Correlation-ID", out var headerValue)
            ? headerValue.ToString()
            : Guid.NewGuid().ToString("N");

    ctx.Items["CorrelationId"] = correlationId;
    ctx.Response.Headers["X-Correlation-ID"] = correlationId;

    await next();
});
```

## S-004 — Features example: exception handling

Exception-handler middleware places structured exception data in `HttpContext.Features`.

```csharp
app.UseExceptionHandler("/error");

app.Map("/error", (HttpContext context) =>
{
    var feature =
        context.Features.Get<
            Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();

    var ex = feature?.Error;

    return Results.Problem(
        title: "Unhandled exception",
        detail: ex?.Message,
        statusCode: 500);
});
```

Features are used because this is an infrastructure/framework contract between middleware and the error endpoint.

## S-005 — Defining and setting a custom feature

You can add an application-specific typed feature.

```csharp
public interface IMyFeature
{
    string CorrelationId { get; }
}

public sealed class MyFeature : IMyFeature
{
    public string CorrelationId { get; init; } = "";
}
```

Middleware sets it:

```csharp
context.Features.Set<IMyFeature>(
    new MyFeature { CorrelationId = "abc123" });

await _next(context);
```

## S-006 — What HttpContext.Features is

`HttpContext.Features` is a per-request `IFeatureCollection`: a typed collection of interfaces representing capabilities and shared data for the current request.

Think of it as:

- a typed bag of infrastructure features;
- populated by the server (Kestrel/IIS), framework, and middleware;
- read or replaced by later middleware/endpoints.

```csharp
var feature =
    context.Features.Get<IExceptionHandlerFeature>();
```

## S-007 — Features versus Items

`HttpContext.Items`:

- dictionary from `object` to `object?`;
- app-level per-request scratchpad;
- application chooses the keys and values.

`HttpContext.Features`:

- typed interface collection;
- infrastructure/capability-oriented;
- commonly established by server/framework/middleware;
- a stronger typed contract than Items.

Rule of thumb: use Items for simple app data; Features for a reusable typed capability or middleware/framework contract.

## S-008 — Why `new object()` is unique

```csharp
public static readonly object CorrelationId = new();
```

creates one unique object instance. Other code cannot accidentally recreate the same key unless it references that exact field.

Mental model:

```text
string key -> same text can collide
object key -> exact object identity
```

## S-009 — Controller reads a correlation ID from Items

```csharp
[HttpGet]
public IActionResult Get()
{
    var correlationId =
        HttpContext.Items["CorrelationId"]?.ToString();

    return Ok(new
    {
        Message = "OK",
        CorrelationId = correlationId
    });
}
```

Items fits because the value is application-specific and simple key/value storage is enough.

## S-010 — Why exception data belongs in Features

Exception-handler middleware publishes a typed exception feature. The error handler consumes the framework contract.

This is not merely arbitrary scratch data: the type communicates exactly which capability/data is available and avoids magic-key conventions.

## S-011 — Later code reads a custom feature

```csharp
var myFeature =
    context.Features.Get<IMyFeature>();
```

For application-only data, Items is often simpler. Choose a feature when multiple components should share a stable typed contract.

## S-012 — Why Features exists

ASP.NET Core uses Features so components can share request-specific capabilities without hard-coding concrete dependencies.

Examples:

- server adds low-level HTTP features;
- exception middleware adds exception details;
- routing adds endpoint/route features;
- custom middleware can publish application features;
- later components read them.

## S-013 — Exception plus original path

`IExceptionHandlerPathFeature` includes the exception and the original request path.

```csharp
app.Map("/error", (
    HttpContext context,
    ILoggerFactory loggerFactory) =>
{
    var logger = loggerFactory.CreateLogger("Errors");
    var feature =
        context.Features.Get<IExceptionHandlerPathFeature>();

    if (feature is not null)
    {
        logger.LogError(
            feature.Error,
            "Unhandled exception on path {Path}",
            feature.Path);
    }

    return Results.Problem(
        statusCode: 500,
        title: "Server error");
});
```

## S-014 — Items example: tenant resolution

Middleware resolves a tenant from host/header/path and stores a tenant object for later application use.

```csharp
app.Use(async (ctx, next) =>
{
    var tenantId =
        ctx.Request.Headers["X-Tenant-Id"].ToString();

    var tenant = new TenantInfo
    {
        TenantId = string.IsNullOrWhiteSpace(tenantId)
            ? "default"
            : tenantId,
        Name = "Acme Tenant"
    };

    ctx.Items["Tenant"] = tenant;
    await next();
});

public sealed class TenantInfo
{
    public string TenantId { get; set; } = "";
    public string Name { get; set; } = "";
}
```

## S-015 — IExceptionHandlerFeature example

When `UseExceptionHandler` catches an exception, it stores information in `HttpContext.Features`.

```csharp
var exceptionHandlerFeature =
    context.Features.Get<IExceptionHandlerFeature>();

var ex = exceptionHandlerFeature?.Error;
```

This is how an error endpoint obtains the original exception.

## S-016 — When to choose Items versus Features

Use `Items` when:

- data is application-specific;
- quick request-scoped storage is enough;
- no formal typed contract is needed;
- examples include tenant, correlation ID, loaded entity, and request flags.

Use `Features` when:

- data/capability is infrastructure-level;
- middleware/framework components cooperate;
- a typed extensibility contract is desired;
- examples include exception handling, endpoint routing metadata, and custom middleware capabilities.

## S-017 — Endpoint metadata after routing

After routing, middleware can inspect the selected endpoint.

```csharp
app.Use(async (ctx, next) =>
{
    var endpoint = ctx.GetEndpoint();

    if (endpoint is not null)
    {
        var endpointName = endpoint.DisplayName;
        ctx.Items["EndpointName"] = endpointName;
    }

    await next();
});
```

`GetEndpoint()` is a convenience API over routing-populated features. Real uses include endpoint-specific logging, custom policy checks, and metrics labels.

## S-018 — Common exception feature types

`IExceptionHandlerFeature` contains the exception and may expose associated details.

`IExceptionHandlerPathFeature` additionally includes the original request path.

```csharp
var f = context.Features.Get<IExceptionHandlerPathFeature>();
var ex = f?.Error;
var path = f?.Path;
```

## S-019 — Controller reads tenant data from Items

```csharp
[HttpGet]
public IActionResult GetTenantData()
{
    var tenant =
        HttpContext.Items["Tenant"] as TenantInfo;

    return Ok(new
    {
        Tenant = tenant?.TenantId,
        tenant?.Name
    });
}
```

Items fits because this is custom business data for one request and no framework contract is required.

## S-020 — Endpoint and server/transport features

`IEndpointFeature` stores the selected endpoint; usually access it through `context.GetEndpoint()`.

Server/transport features may represent:

- request body;
- response body;
- connection information;
- TLS/client certificates;
- WebSockets;
- HTTP/2 or HTTP/3-specific capabilities.

Most application code uses higher-level `HttpContext` convenience APIs rather than accessing low-level features directly.

## S-021 — Request-body and transport capabilities

Features can expose lower-level server-specific capabilities, for example HTTPS/TLS information. Applications usually use `Request`, `Response`, `Connection`, and other high-level APIs; direct feature access is advanced and less common.

## S-022 — Items example: request timing

Store a request start timestamp early and read it after downstream code completes.

```csharp
app.Use(async (ctx, next) =>
{
    var startedAt = DateTime.UtcNow;
    ctx.Items["RequestStartedAtUtc"] = startedAt;

    await next();

    var elapsed = DateTime.UtcNow - startedAt;
    ctx.Response.Headers["X-Elapsed-Ms"] =
        ((int)elapsed.TotalMilliseconds).ToString();
});
```

Items fits because this is temporary, request-only, application-internal data.

## S-023 — Custom request-audit feature contract

A typed middleware-to-endpoint contract:

```csharp
public interface IRequestAuditFeature
{
    string CorrelationId { get; }
    DateTime StartedUtc { get; }
}

public sealed class RequestAuditFeature : IRequestAuditFeature
{
    public string CorrelationId { get; init; } = "";
    public DateTime StartedUtc { get; init; }
}
```

## S-024 — Items example: user-profile enrichment

Middleware loads extra profile data once and stores it for later use.

```csharp
app.Use(async (ctx, next) =>
{
    if (ctx.User.Identity?.IsAuthenticated == true)
    {
        var profile = new UserProfile
        {
            UserId =
                ctx.User.FindFirst("sub")?.Value ?? "unknown",
            DisplayName = "Jane Doe"
        };

        ctx.Items["UserProfile"] = profile;
    }

    await next();
});
```

## S-025 — Middleware sets a request-audit feature

```csharp
app.Use(async (ctx, next) =>
{
    var feature = new RequestAuditFeature
    {
        CorrelationId = Guid.NewGuid().ToString("N"),
        StartedUtc = DateTime.UtcNow
    };

    ctx.Features.Set<IRequestAuditFeature>(feature);
    await next();
});
```

## S-026 — Endpoint/controller reads the audit feature

```csharp
[HttpGet("audit")]
public IActionResult Audit()
{
    var audit =
        HttpContext.Features.Get<IRequestAuditFeature>();

    return Ok(new
    {
        audit?.CorrelationId,
        audit?.StartedUtc
    });
}
```

Features fits because it is a typed interface contract, cleaner than magic strings when multiple components depend on it.

## S-027 — Controller reads enriched user profile

```csharp
public sealed class UserProfile
{
    public string UserId { get; set; } = "";
    public string DisplayName { get; set; } = "";
}

[HttpGet("me")]
public IActionResult Me()
{
    var profile =
        HttpContext.Items["UserProfile"] as UserProfile;

    return profile is null
        ? Unauthorized()
        : Ok(profile);
}
```

# Native canvas labels

```text
HTTPCONTEXT'S FEATURES
vs items
custom feature
items examples
features examples
when what
object key for items
```
