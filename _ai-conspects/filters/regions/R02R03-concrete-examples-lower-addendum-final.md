# R02 + R03 — concrete filter examples and lower addendum

File type: **source-preserving near-literal transcript v002**

## Coverage

```text
repository source IDs: S-094..S-131
image uses: 38
status: 38 / 38 source uses covered
```

Text and code were read directly from the uploaded SVG screenshots. Spacing and minor punctuation are normalized; visible identifiers, values, comments, method names, and conceptual sequence are preserved.

---

## S-094 — `cdc273573b`

```text
canvas: x=1880.767, y=9360.315
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Authorization filters

**When run:** first in the MVC filter pipeline, before model binding.

**Purpose / use cases:** authentication/authorization checks and short-circuiting requests that lack permissions. They are useful when the policy does not need model state or action arguments.

**Context:** `AuthorizationFilterContext`, including `HttpContext`, `ActionDescriptor`, and `RouteData`. Set `context.Result` to a result such as `ForbidResult`, `UnauthorizedResult`, or `ChallengeResult` to short-circuit.

---

## S-095 — `4cd15187e6`

```text
canvas: x=1999.941, y=9800.325
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `RequireAdminFilter` authorization example

```csharp
public class RequireAdminFilter : IAsyncAuthorizationFilter
{
    public async Task OnAuthorizationAsync(
        AuthorizationFilterContext context)
    {
        var user = context.HttpContext.User;

        if (!user.Identity?.IsAuthenticated ?? true)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        if (!user.IsInRole("Admin"))
        {
            context.Result = new ForbidResult();
            return;
        }

        await Task.CompletedTask;
    }
}
```

Apply with `[TypeFilter(typeof(RequireAdminFilter))]`, register and use `ServiceFilter`, or add it globally.

---

## S-096 — `c0ae691671`

```text
canvas: x=1874.601, y=10358.315
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Resource filters

**When run:** around model binding. Their “before” part runs before model binding; their “after” part runs after result execution.

**Purpose:** response caching, short-circuiting expensive work before binding, per-request setup/teardown, feature flags, and timing around model binding + action + result.

**Contexts:** `ResourceExecutingContext` and `ResourceExecutedContext`. The executing context can set `Result` before binding. The executed context can expose an exception from the action/result path.

---

## S-097 — `4e842e450c`

```text
canvas: x=7743.258, y=10676.703
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Built-in antiforgery + always-run result filter

The example combines global `AutoValidateAntiforgeryTokenAttribute` with an always-run result filter that rewrites antiforgery validation failure results into an SPA-friendly `ProblemDetails` shape.

---

## S-098 — `ff3cd91324`

```text
canvas: x=2027.699, y=10788.716
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `SimpleCacheResourceFilter`

```csharp
public class SimpleCacheResourceFilter : IResourceFilter
{
    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        var key = context.HttpContext.Request.Path.ToString();
        var cached = MyCache.Get(key);

        if (cached != null)
        {
            context.Result = new ContentResult
            {
                Content = cached,
                ContentType = "application/json",
            };
        }
    }

    public void OnResourceExecuted(ResourceExecutedContext context)
    {
        // maybe update cache with context.Result if success
    }
}
```

Setting `context.Result` before `next` short-circuits before model binding and action execution.

---

## S-099 — `956f5aa779`

```text
canvas: x=7669.416, y=10802.380
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Global antiforgery registration

```csharp
builder.Services.AddControllersWithViews(options =>
{
    options.Filters.Add(
        new AutoValidateAntiforgeryTokenAttribute());

    options.Filters.Add<AntiforgeryFailureResultFilter>();
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
```

`AutoValidateAntiforgeryTokenAttribute` is intended for global usage and skips safe methods such as GET, HEAD, OPTIONS, and TRACE.

---

## S-100 — `3ce5c3e0c4`

```text
canvas: x=6514.618, y=10943.675
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### “Always-run” exists only for result filters

ASP.NET Core defines `IAlwaysRunResultFilter` and `IAsyncAlwaysRunResultFilter`. There is no general “always-run authorization filter” or “always-run action filter.” Always-run result filters can run for results produced by authorization/resource/exception short-circuiting.

---

## S-101 — `6619e54238`

```text
canvas: x=2046.252, y=11281.358
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Async resource-filter example

```csharp
public class AsyncResourceFilter : IAsyncResourceFilter
{
    public async Task OnResourceExecutionAsync(
        ResourceExecutingContext context,
        ResourceExecutionDelegate next)
    {
        // pre logic
        var executedContext = await next();
        // model binding + action + result already ran
        // inspect executedContext.Result / Exception
    }
}
```

---

## S-102 — `aaa8161088`

```text
canvas: x=7671.313, y=11344.370
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Always-run antiforgery result filter declaration

```csharp
public sealed class AntiforgeryFailureResultFilter :
    IAsyncAlwaysRunResultFilter
{
    public async Task OnResultExecutionAsync(
        ResultExecutingContext context,
        ResultExecutionDelegate next)
    {
        // inspect and possibly replace result
    }
}
```

---

## S-103 — `93e97c033b`

```text
canvas: x=2081.183, y=11519.750
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Consequences of early resource short-circuit

When a resource filter returns a result before calling the next delegate:

```text
model binding did not occur
action arguments were not created
action method did not run
```

---

## S-104 — `3d0f6f2523`

```text
canvas: x=2045.330, y=11729.867
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why model binding can be expensive

Model binding may read/parse the request body, deserialize JSON, allocate the request model, run validation attributes, populate `ModelState`, and pass the bound object to the action. Resource-filter position matters because it can avoid all of that work.

---

## S-105 — `85331318f5`

```text
canvas: x=7634.580, y=11731.269
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Rewrite antiforgery failure as `ProblemDetails`

```csharp
if (context.Result is AntiforgeryValidationFailedResult)
{
    context.Result = new ObjectResult(new ProblemDetails
    {
        Title = "Antiforgery validation failed",
        Detail = "The CSRF token is missing, expired, or invalid.",
        Status = StatusCodes.Status400BadRequest,
        Type = "https://example.com/problems/antiforgery-failed"
    })
    {
        StatusCode = StatusCodes.Status400BadRequest
    };
}

await next();
```

Always-run result filters can execute even when earlier filters short-circuit to a result.

---

## S-106 — `eecbbe9ef1`

```text
canvas: x=2151.543, y=12158.832
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### What a resource filter gives you

`ResourceExecutingContext` includes:

- `HttpContext`
- `RouteData`
- `ActionDescriptor`
- no action arguments yet
- no populated `ModelState` from model binding
- ability to set `Result` and short-circuit

Good uses: early caching, feature flags, request-scoped setup/teardown, preventing expensive model binding/action work.

---

## S-107 — `0842a50ea2`

```text
canvas: x=7647.091, y=12227.481
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Per-action antiforgery opt-out

```csharp
[IgnoreAntiforgeryToken]
[HttpPost("/webhook")]
public IActionResult Webhook() => Ok();
```

`IgnoreAntiforgeryToken` overrides a higher-level antiforgery filter for that action.

---

## S-108 — `454d45ba8e`

```text
canvas: x=2019.093, y=12624.526
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Resource-filter mental model and safe use

Remember:

```text
Resource filters decide whether model binding and action execution happen.
Action filters control how the action runs once inputs exist.
```

Use resource filters when action parameters are not needed and the concern is infrastructure such as cache, throttling, or feature flags. Avoid them for business rules requiring validated models.

---

## S-109 — `3cbadeb20a`

```text
canvas: x=1934.767, y=13247.649
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Action filters

**When run:** after model binding and immediately before the action, then again after the action finishes.

**Purpose:** inspect or modify bound action arguments, validate `ModelState`, log/time action execution, add metrics, and implement behavior requiring the parsed action context.

**Contexts:** `ActionExecutingContext` and `ActionExecutedContext`. Useful members include `ActionArguments`, `ModelState`, `Controller`, `Result`, and `Exception`. Setting the executing context’s `Result` short-circuits the action.

---

## S-110 — `06c25fd10a`

```text
canvas: x=2049.780, y=13779.326
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `TimingActionFilter`

```csharp
public class TimingActionFilter : IAsyncActionFilter
{
    private readonly ILogger<TimingActionFilter> _log;

    public TimingActionFilter(ILogger<TimingActionFilter> log)
        => _log = log;

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var sw = Stopwatch.StartNew();

        if (!context.ModelState.IsValid)
        {
            context.Result =
                new BadRequestObjectResult(context.ModelState);
            return;
        }

        var executedContext = await next();
        sw.Stop();

        _log.LogInformation(
            "Action {action} took {ms}ms",
            context.ActionDescriptor.DisplayName,
            sw.ElapsedMilliseconds);

        // inspect executedContext.Result or Exception here
    }
}
```

---

## S-111 — `941b0bd39d`

```text
canvas: x=2022.434, y=14545.649
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Exception filters

**When run:** only when an exception is thrown during MVC action or result execution. They do not catch exceptions thrown in middleware, routing, authorization filters, or other earlier stages.

**Purpose:** map domain/application exceptions to HTTP status codes or `ProblemDetails`, log with action metadata, and return MVC results.

**Context:** `ExceptionContext`, including `Exception`, `HttpContext`, and `ActionDescriptor`. Set a result and/or `ExceptionHandled = true` to stop propagation.

---

## S-112 — `b39d3b79e0`

```text
canvas: x=2071.268, y=15032.659
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `ApiExceptionFilter`

```csharp
public class ApiExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var ex = context.Exception;

        var pd = new ProblemDetails
        {
            Title = "An error occurred",
            Detail = ex.Message
        };

        context.Result = new ObjectResult(pd)
        {
            StatusCode = 500
        };

        context.ExceptionHandled = true;
    }
}
```

---

## S-113 — `7c6fc71927`

```text
canvas: x=2074.268, y=15691.149
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### App-wide exception handling note

For truly application-wide handling—including middleware, routing, and static-file failures—use exception-handling middleware such as `UseExceptionHandler`. Exception filters are scoped to MVC action/result execution.

---

## S-114 — `aeec5b68bb`

```text
canvas: x=2074.434, y=15905.815
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Result filters

**When run:** around result execution, after the action returns an `IActionResult` but before and after the framework executes it.

**Purpose:** transform or replace result objects, wrap payloads, set response headers, inspect formatter/serialization failures, and perform result-focused timing/cleanup.

**Contexts:** `ResultExecutingContext` and `ResultExecutedContext`. The executing context exposes the result about to run; the executed context can expose an exception produced while executing it.

---

## S-115 — `7ea3dbea17`

```text
canvas: x=2140.237, y=16337.659
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `WrapResultFilter`

```csharp
public class WrapResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        if (context.Result is ObjectResult obj)
        {
            var wrapped = new
            {
                data = obj.Value,
                ok = true
            };

            context.Result = new ObjectResult(wrapped)
            {
                StatusCode = obj.StatusCode
            };
        }
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // after result wrote to response
    }
}
```

---

## S-116 — `a133529706`

```text
canvas: x=2119.434, y=16930.649
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Endpoint filters for Minimal APIs

Endpoint filters run around a supported endpoint delegate, similarly to action filters but for endpoint/minimal-API execution.

**Uses:** validation, logging, authorization-like checks, rate limiting, inspecting endpoint arguments, short-circuiting, and transforming the returned value.

**Context:** `EndpointFilterInvocationContext`, with `HttpContext`, `Arguments`, and endpoint metadata. The filter returns `object?`/`ValueTask<object?>`.

---

## S-117 — `b9685b1586`

```text
canvas: x=2181.118, y=17400.992
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `LogEndpointFilter`

```csharp
public class LogEndpointFilter : IEndpointFilter
{
    private readonly ILogger<LogEndpointFilter> _log;

    public LogEndpointFilter(ILogger<LogEndpointFilter> log)
        => _log = log;

    public async ValueTask<object?> InvokeAsync(
        EndpointFilterInvocationContext ctx,
        EndpointFilterDelegate next)
    {
        _log.LogInformation(
            "Before endpoint {e}",
            ctx.HttpContext.GetEndpoint()?.DisplayName);

        var result = await next(ctx);

        _log.LogInformation(
            "After endpoint {e}",
            ctx.HttpContext.GetEndpoint()?.DisplayName);

        return result;
    }
}

app.MapGet("/hi", () => "hello")
   .AddEndpointFilter<LogEndpointFilter>();
```

---

## S-118 — `bd9e23d6b7`

```text
canvas: x=2207.991, y=17985.992
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Ordering and levels

Default scope order is broad to narrow:

```text
global filters
controller-level filters
action-level filters
```

Within the same stage/scope, implement `IOrderedFilter` or use an attribute’s `Order` property.

```csharp
public class MyOrderedFilter :
    Attribute, IActionFilter, IOrderedFilter
{
    public int Order { get; set; }

    public void OnActionExecuting(ActionExecutingContext context) { }
    public void OnActionExecuted(ActionExecutedContext context) { }
}
```

---

## S-119 — `c590ef2101`

```text
canvas: x=2179.716, y=18567.659
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Practical filter-selection rules

- Every HTTP request, including static files and health checks → **middleware**.
- All MVC actions and MVC context is needed → **global filter**.
- DI only for selected controllers/actions → `TypeFilter` or `ServiceFilter`.
- Need action arguments or `ModelState` → **action filter**.
- Need to short-circuit before model binding → **resource filter**.
- Need to transform `IActionResult` or headers before writing → **result filter**.
- Convert controller exceptions to HTTP responses → **exception filter**, with middleware still used as the global safety net.
- Minimal APIs → **endpoint filters**.

---

## S-120 — `01d6b5358a`

```text
canvas: x=2097.434, y=19115.315
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Can `TypeFilter` / `ServiceFilter` attach any filter?

For MVC controllers/actions, the attributes can attach a class implementing one or more ASP.NET Core filter interfaces to a controller or action. The actual behavior still depends on which filter interface the class implements and where that filter stage occurs.

---

## S-121 — `195466a9e9`

```text
canvas: x=2580.813, y=22573.382
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Middleware and global filters: one-line definitions

- **Middleware:** pipeline components that run for every applicable HTTP request through ASP.NET Core’s request pipeline.
- **Global filters:** MVC/endpoint filter components applied to MVC/controller/action execution after routing.

Middleware sees raw HTTP context and wraps a broader pipeline. Filters run in endpoint/MVC execution and expose richer MVC context such as action descriptors, arguments, `ModelState`, and result objects.

---

## S-122 — `7f6a04d706`

```text
canvas: x=2510.766, y=23147.928
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Best uses and available context

Use middleware for app-wide protocol/infrastructure concerns: request logging, correlation IDs, CORS, compression, static files, authentication middleware, rate limiting, and global exception handling.

Use global filters for MVC-specific concerns needing controller/action context: action auditing, argument inspection, result transformation, model-aware caching, and MVC exception/result mapping.

Middleware has `HttpContext`; filters additionally expose stage-specific MVC contexts.

---

## S-123 — `5912b882bf`

```text
canvas: x=2555.380, y=23669.140
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### DI, lifetime, and ordering differences

Conventional middleware is usually created when the pipeline is built. Constructor injection should be limited to singleton-safe dependencies; scoped dependencies should be resolved per request through `Invoke/InvokeAsync` parameters or `RequestServices`.

Filters can be resolved per request and can safely use scoped constructor dependencies when registered through DI.

Middleware ordering is registration order. Filter ordering combines scope (global/controller/action), filter stage, and `Order`/`IOrderedFilter`.

---

## S-124 — `0da49600f6`

```text
canvas: x=2502.975, y=24181.932
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Quick decision guide

Choose middleware when the concern must run for all requests, before routing, or requires global exception/protocol handling.

Choose global filters when all MVC actions need a rule but the rule requires MVC context or scoped services.

Choose controller/action `TypeFilter`/`ServiceFilter` when only selected endpoints need it.

---

## S-125 — `c823591f9a`

```text
canvas: x=2551.974, y=24823.902
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Short answers

Yes, middleware can access DI. Resolve scoped dependencies per request, not in a singleton-like middleware constructor.

Global filters still add value when middleware exists because filters run inside MVC and expose action descriptors, model state, action arguments, controller instances, and MVC result execution. Use each layer for the context it owns.

---

## S-126 — `e3406d5a77`

```text
canvas: x=2641.908, y=25299.443
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Correct per-request middleware DI

```csharp
public class MyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<MyMiddleware> _log;

    public MyMiddleware(
        RequestDelegate next,
        ILogger<MyMiddleware> log)
    {
        _next = next;
        _log = log;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var scoped =
            context.RequestServices
                   .GetRequiredService<IMyScopedService>();

        await scoped.DoWorkAsync();
        await _next(context);
    }
}
```

---

## S-127 — `5437083de5`

```text
canvas: x=2619.158, y=25824.291
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Explicit service scope and what not to do

When a genuinely separate scope is needed:

```csharp
using var scope =
    context.RequestServices
           .GetRequiredService<IServiceScopeFactory>()
           .CreateScope();

var service =
    scope.ServiceProvider.GetRequiredService<ISomething>();
```

Do not constructor-inject a scoped service into conventional middleware, because the middleware instance is created outside the per-request lifetime and can capture the wrong scope.

---

## S-128 — `b57a5cba1b`

```text
canvas: x=2618.232, y=26352.099
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Middleware lifetime recommendation

Constructor-inject singleton-safe services. Resolve scoped services from the request provider or as `InvokeAsync` parameters. This keeps middleware lifetime aligned with service lifetime.

---

## S-129 — `ae3d39b584`

```text
canvas: x=2617.884, y=26535.806
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why global filters when middleware exists?

Middleware runs for MVC and non-MVC requests and sees protocol-level `HttpContext`. Global filters run only in MVC/filter-aware endpoint execution and see `ActionExecutingContext`, `ModelState`, `ActionArguments`, `ActionDescriptor`, controller instances, and result objects.

Choose filters for model validation, MVC response envelopes, action-level auditing, per-action caching, and MVC exception-to-result mapping.

---

## S-130 — `120b3d3b4a`

```text
canvas: x=2570.505, y=27042.220
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Concrete layer-selection examples

Filters are better when wrapping controller return values, inspecting/modifying action arguments, producing MVC `ProblemDetails` based on action metadata, or running only for MVC endpoints.

Middleware is better for IP blocking before routing, global URL logging, CORS, compression, maintenance-mode short-circuiting, and any concern that must run before endpoint selection.

---

## S-131 — `d0c1855678`

```text
canvas: x=2636.334, y=27556.412
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Simplified request pipeline

```text
server receives request
global middleware
UseRouting / routing middleware
endpoint middleware (auth, etc.)
MVC endpoint execution:
    authorization filters
    resource filters
    model binding
    action filters / action execution
    result filters / result execution
response unwinds through middleware
```

Non-MVC requests do not run global MVC filters.
