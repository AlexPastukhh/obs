# R01 — filters pipeline, ordering, middleware, DI, factories, exceptions, negotiation

File type: **source-preserving near-literal transcript v002**

## Coverage

```text
repository source IDs: S-001..S-093
image uses: 93
status: 93 / 93 source uses covered
```

Text and code were read directly from the uploaded SVG screenshots. Spacing and minor punctuation are normalized; visible identifiers, values, comments, method names, and conceptual sequence are preserved.

---

## S-001 — `941b0bd39d`

```text
canvas: x=10288.091, y=703.542
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Duplicate exception-filter overview

This is a second placement of the exception-filter definition: action/result-stage MVC exceptions, `ExceptionContext`, result conversion, and the limitation that middleware/earlier-stage exceptions are outside its scope.

---

## S-002 — `f81807d7cb`

```text
canvas: x=7952.838, y=745.335
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Duplicate exception-path diagram

This is a second canvas placement of the same exception-path visualization: authorization/resource/model binding/action/result stages with exception filters conceptually catching eligible action/result failures.

---

## S-003 — `8fd67e3089`

```text
canvas: x=13042.366, y=831.530
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### After `next()` in a result filter is too late to reshape the payload

```csharp
var executedContext = await next();
```

At this point the action result has executed: content negotiation and serialization may have happened, and response headers/body may already be written. Do not rely on post-`next` code to replace `context.Result`, change `ObjectResult.Value`, or reliably alter status/body shape.

---

## S-004 — `0c2388550b`

```text
canvas: x=6944.983, y=849.958
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Mark an exception handled and define the replacement result

```csharp
public override void OnException(ExceptionContext context)
{
    context.Result = new ObjectResult(new
    {
        error = "Something went wrong"
    })
    {
        StatusCode =
            StatusCodes.Status500InternalServerError
    };

    context.ExceptionHandled = true;
}
```

Setting a result plus `ExceptionHandled` stops propagation and defines the response.

---

## S-005 — `66fe83e5fb`

```text
canvas: x=4798.617, y=971.579
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `IOrderedFilter`

`IOrderedFilter` exposes:

```csharp
int Order { get; }
```

Within the same filter stage and same scope, filters are sorted by ascending order for the “before” path. Lower values run earlier.

---

## S-006 — `b39d3b79e0`

```text
canvas: x=10336.925, y=1190.552
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Duplicate `ApiExceptionFilter` code

This repeats the concrete filter that creates `ProblemDetails`, sets an `ObjectResult` status 500, and marks the exception handled.

---

## S-007 — `5cb44405b8`

```text
canvas: x=71.849, y=1199.858
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Sync versus async action filters

Synchronous filters implement `IActionFilter` with:

```text
OnActionExecuting
OnActionExecuted
```

These methods return `void`; do not block on async work with `.Result`/`.Wait()`.

Use sync filters for quick checks, headers, simple logging, or immediate short-circuiting.

---

## S-008 — `ecf38bf9b5`

```text
canvas: x=8015.191, y=1215.355
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### What exception middleware is best at

Exception middleware wraps the whole pipeline and is ideal for one global catch-all, consistent app-wide error JSON, logging/correlation, and exceptions from middleware as well as endpoints.

It does not naturally receive the selected action’s MVC-specific context. Exception filters handle the narrower MVC/action-level slice.

---

## S-009 — `d0c1855678`

```text
canvas: x=3065.574, y=1220.652
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Duplicate placement

This screenshot repeats the same simplified MVC versus non-MVC pipeline as the adjacent source. It is a separate canvas placement, not an extraction error.

---

## S-010 — `f81807d7cb`

```text
canvas: x=1253.949, y=1242.719
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Exception-path visualization

Mental model:

```text
try
{
    authorization filters
    resource filters (before)
    model binding
    action filters (before)
    action method
    action filters (after)
    result filters
    resource filters (after)
}
catch (Exception)
{
    exception filters run here
}
```

The diagram is conceptual: exception-filter coverage is centered on the MVC action/result execution core, not every earlier pipeline stage.

---

## S-011 — `38a40047a6`

```text
canvas: x=1954.138, y=1275.760
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Built-in filter types and where they run

- Authorization: first; may short-circuit access.
- Resource: before model binding and after result execution; suited to caching and early short-circuit.
- Action: immediately before/after controller action, after binding.
- Exception: for unhandled exceptions from action/result execution; not middleware/routing/model-binding failures.
- Result: before/after executing the action result.
- Endpoint: Minimal APIs/endpoint handlers supporting `IEndpointFilter`.

---

## S-012 — `2849530074`

```text
canvas: x=4846.293, y=1305.724
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Ordering rules

1. Scope: global → controller → action.
2. Stage: authorization → resource → model binding → action → result; exception filters run for eligible failures.
3. Same stage/scope: lower `Order` runs earlier before `next`.
4. After-callbacks unwind in reverse order (LIFO).
5. Unspecified order is effectively the default value, commonly treated as `0`; negative values can run earlier.

---

## S-013 — `72e6deb132`

```text
canvas: x=6957.690, y=1339.266
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Marking handled without a result is ambiguous

```csharp
public override void OnException(ExceptionContext context)
{
    context.ExceptionHandled = true;
}
```

This stops propagation but usually leaves an unclear or empty response. In practice, also assign a result or explicitly write the response.

---

## S-014 — `49004b3eec`

```text
canvas: x=13035.871, y=1368.186
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Observe result-execution failures

```csharp
var executedContext = await next();

if (executedContext.Exception is not null)
{
    _logger.LogError(
        executedContext.Exception,
        "Result execution failed.");
}
```

`ResultExecutedContext.Exception` exists to observe formatter, serialization, and result-execution failures.

---

## S-015 — `0c27c81622`

```text
canvas: x=10.000, y=1702.181
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Asynchronous action filters

Implement `IAsyncActionFilter` and one method:

```csharp
Task OnActionExecutionAsync(
    ActionExecutingContext context,
    ActionExecutionDelegate next)
```

Run logic before `await next()`, await the action, then run logic after. Use this for database/HTTP I/O, async logging/metrics, and other genuinely asynchronous work.

---

## S-016 — `41f4fdc306`

```text
canvas: x=8019.331, y=1753.715
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why exception filters still matter: MVC context

Exception filters can see the selected controller/action, route values, action-descriptor metadata, model state/action arguments where available, and MVC result/formatter conventions.

That enables different results for MVC pages and APIs, metadata-based exception mapping, and MVC-aware content negotiation more directly than generic middleware.

---

## S-017 — `d652a7a3d0`

```text
canvas: x=1934.053, y=1801.824
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Order / pipeline notes

Filters run inside MVC/endpoint execution; middleware runs earlier and at a wider scope.

Within a filter stage, scope and `Order` matter. Authorization filters run before resource/action filters. Before-callbacks nest from outer to inner, while after-callbacks unwind in reverse order.

---

## S-018 — `523f563dfd`

```text
canvas: x=13031.723, y=1816.797
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Result-execution timing

```csharp
var sw = Stopwatch.StartNew();
var executedContext = await next();
sw.Stop();

_logger.LogInformation(
    "Result execution took {Ms} ms",
    sw.ElapsedMilliseconds);
```

This measures actual result formatting/serialization and response writing, not merely action-method time.

---

## S-019 — `3de69cafc6`

```text
canvas: x=4819.682, y=1837.010
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Ordered-filter example

```csharp
public class FirstFilter :
    Attribute, IActionFilter, IOrderedFilter
{
    public int Order { get; set; } = -10;

    public void OnActionExecuting(ActionExecutingContext ctx) { }
    public void OnActionExecuted(ActionExecutedContext ctx) { }
}

public class SecondFilter :
    Attribute, IActionFilter, IOrderedFilter
{
    public int Order { get; set; } = 10;

    public void OnActionExecuting(ActionExecutingContext ctx) { }
    public void OnActionExecuted(ActionExecutedContext ctx) { }
}
```

First runs earlier on the way in; after callbacks unwind in the opposite order.

---

## S-020 — `bbec772b18`

```text
canvas: x=6993.966, y=1868.988
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Can an exception filter return HTTP 200?

Technically yes:

```csharp
public override void OnException(ExceptionContext context)
{
    context.Result = new JsonResult(new
    {
        message = "handled"
    })
    {
        StatusCode = 200
    };

    context.ExceptionHandled = true;
}
```

The framework can send that response, but doing so can hide failures.

---

## S-021 — `c06b50a708`

```text
canvas: x=1844.476, y=2147.751
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Global-filter mental model

```csharp
options.Filters.Add<SomeFilter>();
```

A filter added through MVC options applies to all controllers/actions passing through MVC. That is a **global filter**.

---

## S-022 — `21f4c2a915`

```text
canvas: x=2496.335, y=2179.969
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Global registration code

```csharp
builder.Services.AddControllers(options =>
{
    // DI resolves this type
    options.Filters.Add<TimingActionFilter>();

    // already-created instance: no constructor DI
    options.Filters.Add(new SomeFilterThatHasNoDI());
});
```

---

## S-023 — `40c1ea244d`

```text
canvas: x=8034.220, y=2229.900
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Per-controller / per-action handling

Exception middleware is global unless you build branch pipelines. Exception filters can be registered globally for MVC or applied per controller/action, enabling rules such as “only these endpoints map `DomainException` to 409.”

---

## S-024 — `147f10a7a7`

```text
canvas: x=13011.890, y=2238.130
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Cleanup around result execution

```csharp
BeginSomething();

try
{
    var executedContext = await next();
}
finally
{
    EndSomething();
}
```

This gives middleware-like around semantics specifically for the MVC result-execution stage.

---

## S-025 — `08ae02e2db`

```text
canvas: x=6984.014, y=2308.988
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why documentation says an exception filter cannot turn failure into success

“Success” refers to pipeline semantics, not only the numeric status. The action already threw; the normal action flow did not complete. The filter can replace the failed outcome with a result, but it cannot rewind execution and make the action have returned normally.

---

## S-026 — `34f39277ad`

```text
canvas: x=4843.625, y=2396.279
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Setting order on wrappers or the filter

`TypeFilterAttribute` and `ServiceFilterAttribute` expose an `Order` property:

```csharp
[TypeFilter(typeof(MyFilter), Order = 5)]
public IActionResult Foo() { ... }
```

Alternatively, the actual filter type can implement `IOrderedFilter`.

---

## S-027 — `83aa9c210c`

```text
canvas: x=9503.575, y=2468.289
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Do not throw from authorization filters

ASP.NET Core guidance is not to throw exceptions inside authorization filters. Exception filters do not handle them because exception filters cover later action/result stages. Authorization failures should set an appropriate result such as challenge/forbid.

---

## S-028 — `b2eb70ec56`

```text
canvas: x=8099.627, y=2580.437
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Exception filters integrate with MVC result execution

An exception filter can set `context.Result`, mark the exception handled, and return `BadRequestObjectResult`, `ObjectResult`, `ViewResult`, etc. MVC then continues with result execution, formatters, and content negotiation.

Middleware generally writes directly to the response and does not automatically re-enter MVC result processing.

---

## S-029 — `171b527dd6`

```text
canvas: x=2068.394, y=2611.134
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `TypeFilter` / `ServiceFilter` placement scope

```csharp
[TypeFilter(typeof(SomeFilter))]
// or
[ServiceFilter(typeof(SomeFilter))]
```

The filter applies only to the controller/action where the attribute is placed. This is usage scope, not DI lifetime scope.

---

## S-030 — `5bfcf5d5aa`

```text
canvas: x=6974.816, y=2756.179
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Practical exception-filter result guidance

Exception filters may convert failures to 400/409/422/500 and can technically return 200, but fake-success responses usually make behavior confusing and hide errors. Use a status/result that accurately represents the failure.

---

## S-031 — `4ccaf6e8a8`

```text
canvas: x=12987.330, y=2760.641
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Reacting to result-execution exceptions

After `next()`, a result filter may observe an exception from serialization or another result filter. It can log and in limited cases mark it handled, but it is often too late to generate a new response if headers/body have started. It is not a reliable place to replace an already-writing JSON payload.

---

## S-032 — `095e5ccfd0`

```text
canvas: x=9539.908, y=2900.141
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Outer exception middleware may catch authorization-filter exceptions

An unhandled exception escaping MVC can generally be caught by outer exception-handling middleware such as `UseExceptionHandler`. That does not make throwing from authorization filters a recommended design; the filter should return a denial result.

---

## S-033 — `610026ad88`

```text
canvas: x=8109.552, y=2991.355
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Expected versus unexpected exceptions

A common split:

- exception filter: translate known domain/application exceptions to clean 400/404/409 results with user-facing details;
- exception middleware: catch everything else, log it as 500, and return a generic error.

If the app is Minimal APIs only, uses one error style everywhere, and needs no per-endpoint customization, global middleware alone is usually enough.

---

## S-034 — `8d47bd7302`

```text
canvas: x=4880.431, y=3098.129
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Wrapper attribute already implements ordering

When a filter is applied through `TypeFilterAttribute` or `ServiceFilterAttribute`, ordering can be controlled on the attribute itself. The underlying filter does not also need to implement `IOrderedFilter` unless it is used through another registration path or needs its own default.

---

## S-035 — `ae6eae4206`

```text
canvas: x=2034.108, y=3226.281
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### DI nuance for global filters and wrappers

- Global filter added by type (`Add<T>()`) is resolved with DI.
- Global filter added as an already-created instance does not use DI for construction.
- `TypeFilter` creates the filter and resolves constructor dependencies.
- `ServiceFilter` obtains the filter instance from DI and respects its registered lifetime.

---

## S-036 — `da34178427`

```text
canvas: x=2974.933, y=3286.400
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Resolve MVC error services from a filter context

```csharp
var http = context.HttpContext;

var factory =
    http.RequestServices
        .GetRequiredService<ProblemDetailsFactory>();
```

The canvas note emphasizes how services may be resolved from `HttpContext.RequestServices` when the object is not constructor-created through DI.

---

## S-037 — `b18b5ad027`

```text
canvas: x=4871.931, y=3448.462
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### When to implement `IOrderedFilter` on the class

Use class-level `IOrderedFilter` when:

- the filter is registered globally without an attribute carrying `Order`;
- the filter should have a built-in default order regardless of registration;
- the same filter is used in multiple places with one consistent order.

If each usage needs a different order, prefer the attribute’s `Order` instead of hard-coding it.

---

## S-038 — `95a58236de`

```text
canvas: x=8121.683, y=3484.252
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Practical “best of both” setup

Use exception middleware as the global safety net, especially for non-MVC failures. Use exception filters only where MVC endpoints need fine-grained mapping or MVC-style results.

---

## S-039 — `da3fc812f7`

```text
canvas: x=12973.859, y=3541.576
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### What `ResultExecutedContext` contains

Important post-execution state:

- `Canceled`
- `Exception`
- `ExceptionHandled`
- `Result`
- inherited `HttpContext` and action metadata

It answers whether the result ran, failed, or was canceled/short-circuited.

---

## S-040 — `54803721e1`

```text
canvas: x=2019.866, y=3616.885
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Plain attribute filter without constructor DI

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class SimpleLogAttribute : ActionFilterAttribute
{
    public string Name { get; set; } = "";

    public override void OnActionExecuting(
        ActionExecutingContext context)
    {
        Console.WriteLine(
            $"Entering {Name ?? context.ActionDescriptor.DisplayName}");

        // If unavoidable, request services can be read from:
        // context.HttpContext.RequestServices
    }
}
```

Attribute arguments must be compile-time constants or settable attribute properties.

---

## S-041 — `84d8a27fc3`

```text
canvas: x=2861.498, y=3703.457
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Async short-circuiting attribute

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public sealed class ValidateAcceptedHeaderAttribute :
    Attribute, IAsyncActionFilter
{
    public Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        // your logic...
        return next();
    }
}
```

The source demonstrates an async interface implementation on an attribute.

---

## S-042 — `b43be743e0`

```text
canvas: x=3675.377, y=3722.282
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Async action-filter attribute

```csharp
public class MyFilterAttribute : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        // before
        await next(); // execute action
        // after
    }
}
```

---

## S-043 — `cf8cdf4e5f`

```text
canvas: x=4937.431, y=3805.296
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Ordering rule of thumb

When applying with `[TypeFilter]` or `[ServiceFilter]` and only one usage needs a custom order, set `Order` on the attribute.

When registering globally or without an attribute wrapper, implement `IOrderedFilter` or use an MVC descriptor that supplies order.

---

## S-044 — `303807c694`

```text
canvas: x=13024.439, y=4042.110
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Result filter after result execution

Good uses include result-execution timing, serialization/write failures, cancellation observation, and cleanup of state created in the result filter’s “before” part.

Typical questions: “How long did serialization take?”, “Did JSON serialization throw?”, “Record metadata after result writing.”

---

## S-045 — `55118ba82a`

```text
canvas: x=6606.953, y=4054.828
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### What `InvalidModelStateResponseFactory` expects

The delegate is intended to run inside MVC after binding/validation creates an invalid `ModelStateDictionary`. It requires an `ActionContext`.

Middleware would need to build an `ActionContext` and populate `ModelState` itself, which is possible but not the natural abstraction boundary.

---

## S-046 — `7532e65cd0`

```text
canvas: x=11285.401, y=4096.128
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Complete filter beginning

A practical `ApiOrMvcExceptionFilter : IExceptionFilter` first checks `Response.HasStarted`, then classifies the selected endpoint and returns either `ProblemDetails` or an MVC error view. It uses endpoint metadata plus `ControllerActionDescriptor` rather than assuming every exception-filter context is one kind of controller endpoint.

---

## S-047 — `7fc49e2552`

```text
canvas: x=8060.344, y=4128.888
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Error-page exception filter

```csharp
public class ErrorViewExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.HttpContext.GetEndpoint()?
            .Metadata
            .GetMetadata<ControllerActionDescriptor>() is null)
        {
            return;
        }

        // Example heuristic: do not return an HTML view for API actions.
        if (context.ActionDescriptor.EndpointMetadata
            .OfType<ProducesAttribute>()
            .Any())
        {
            return;
        }

        context.Result = new ViewResult
        {
            ViewName = "Error"
        };

        context.ExceptionHandled = true;
    }
}
```

---

## S-048 — `40a6b49ab9`

```text
canvas: x=2025.821, y=4193.905
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Attribute usage example

```csharp
[HttpGet("books/{id}")]
[BookResultFilter]
public IActionResult Get(int id) { ... }
```

A custom filter attribute can be placed directly on an action.

---

## S-049 — `334cc70230`

```text
canvas: x=9350.479, y=4194.507
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why inspect `ProducesAttribute`

`[Produces(...)]` adds declared media types to endpoint metadata and can shape output negotiation. Checking for it can act as a simple guard: if the endpoint explicitly declares API media types, do not return an HTML error view. It is not a perfect classifier.

---

## S-050 — `ebd3105665`

```text
canvas: x=2014.483, y=4328.466
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Does a plain attribute require registration?

No. A class deriving from `ActionFilterAttribute`, `ResultFilterAttribute`, or implementing a filter interface and used as an attribute is created through runtime metadata/reflection, not per-request DI.

Do not store scoped/per-request services or state in attribute instance fields. For service-backed behavior, prefer `TypeFilter`, `ServiceFilter`, or `IFilterFactory`; resolving from `RequestServices` is possible but less testable.

---

## S-051 — `6120c9e082`

```text
canvas: x=13046.162, y=4509.091
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Resource filter after the whole MVC pipeline

`ResourceExecutedContext` is suited to end-to-end MVC timing, disposing per-request resources created before binding, inspecting downstream exceptions, and detecting early short-circuiting.

Typical questions: “How long did MVC take?”, “Did anything in binding/action/result throw?”, “End my scope after MVC is done.”

---

## S-052 — `a5031e6b19`

```text
canvas: x=8043.463, y=4557.967
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why middleware is awkward for MVC error views

Middleware does not naturally participate in MVC view rendering. It would need to write raw HTML, re-execute an MVC route, or redirect while separately preserving error details. An MVC exception filter can return a `ViewResult` directly.

---

## S-053 — `b38f914c7a`

```text
canvas: x=6631.776, y=4570.114
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Fabricating `ActionContext` in middleware

```csharp
var actionContext = new ActionContext(
    httpContext,
    httpContext.GetRouteData() ?? new RouteData(),
    new ActionDescriptor(),
    new ModelStateDictionary());
```

Middleware can construct this, but it does not naturally possess the selected MVC action’s true metadata and validation state.

---

## S-054 — `18c334b18d`

```text
canvas: x=11291.449, y=4572.099
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Branching in a combined API/MVC exception filter

```csharp
if (kind == EndpointKind.Api)
{
    context.Result = CreateApiResult(context);
    context.ExceptionHandled = true;
    return;
}

if (kind == EndpointKind.MvcView)
{
    context.Result = CreateMvcViewResult(context);
    context.ExceptionHandled = true;
    return;
}

// Unknown: let global middleware handle it.
```

---

## S-055 — `b8c662493f`

```text
canvas: x=9372.503, y=4686.706
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### API-versus-view heuristics

Using `[Produces]` as the distinction is only a heuristic: many APIs rely on defaults and some view endpoints may declare content types.

More reliable signals include `[ApiController]`, controller base type (`Controller` versus `ControllerBase`), explicit endpoint metadata, or an application-specific marker attribute.

---

## S-056 — `ddbc5bd924`

```text
canvas: x=8080.844, y=4859.824
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Per-controller exception policy

```csharp
[TypeFilter(typeof(AdminDetailedErrorsFilter))]
public class AdminController : Controller
{
    ...
}
```

Only selected controllers/actions get detailed exception behavior. Middleware would require explicit branching or metadata inspection for the same scoping.

---

## S-057 — `69385ec0b7`

```text
canvas: x=11302.396, y=4966.976
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `GetEndpointKind` core checks

```csharp
private static EndpointKind GetEndpointKind(
    ExceptionContext context)
{
    if (context.ActionDescriptor.EndpointMetadata
        .OfType<ApiControllerAttribute>()
        .Any())
    {
        return EndpointKind.Api;
    }

    if (context.ActionDescriptor
        is ControllerActionDescriptor cad)
    {
        if (typeof(Controller)
            .IsAssignableFrom(cad.ControllerTypeInfo))
        {
            return EndpointKind.MvcView;
        }

        if (typeof(ControllerBase)
            .IsAssignableFrom(cad.ControllerTypeInfo))
        {
            return EndpointKind.Api;
        }
    }

    // optional Produces fallback...
}
```

---

## S-058 — `e4186b8e64`

```text
canvas: x=13065.728, y=5004.091
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Direct “after” comparison

**Result filter after `next()`:** result-focused; measure formatter/serialization/write time, detect output errors, correlate negotiation.

**Resource filter after `next()`:** whole MVC pipeline focused; measure binding + action + result, perform request-scoped cleanup, and inspect exceptions from stages inside the resource wrapper.

---

## S-059 — `e60cadf6ee`

```text
canvas: x=6675.869, y=5031.281
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Executing `InvalidModelStateResponseFactory`

The source shows adding errors to a model-state dictionary, obtaining `ApiBehaviorOptions.InvalidModelStateResponseFactory`, and invoking the returned `IActionResult` through an MVC action context. This works only when MVC services/formatters are registered.

---

## S-060 — `69f6b87818`

```text
canvas: x=13244.679, y=5034.316
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why inspect endpoint metadata

Endpoint routing copies applicable controller/action attributes and conventions into selected endpoint metadata. It reflects what routing actually selected for this request, includes action and controller metadata, and avoids direct reflection when a controller type is not readily available.

---

## S-061 — `bc36a57ab1`

```text
canvas: x=2047.908, y=5035.216
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Custom `IFilterFactory` attribute

```csharp
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class MyFactoryAttribute : Attribute, IFilterFactory
{
    public string SomeValue { get; }

    public bool IsReusable => false;

    public MyFactoryAttribute(string someValue)
        => SomeValue = someValue;

    public IFilterMetadata CreateInstance(
        IServiceProvider serviceProvider)
    {
        var service =
            serviceProvider.GetRequiredService<IMyService>();

        return new MyFilter(service, SomeValue);
    }
}
```

The attribute carries constant metadata; the factory resolves runtime services and creates the real filter.

---

## S-062 — `77b451d732`

```text
canvas: x=8177.582, y=5268.253
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Domain-validation exception mapped to model-state response

```csharp
public class DomainValidationExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is DomainValidationException ex)
        {
            foreach (var error in ex.Errors)
            {
                context.ModelState.AddModelError(
                    error.Field,
                    error.Message);
            }

            context.Result =
                new BadRequestObjectResult(context.ModelState);

            context.ExceptionHandled = true;
        }
    }
}
```

---

## S-063 — `65b20fa802`

```text
canvas: x=11353.785, y=5368.365
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `ProducesAttribute` fallback in endpoint classification

```csharp
if (context.ActionDescriptor.EndpointMetadata
    .OfType<ProducesAttribute>()
    .Any())
{
    return EndpointKind.Api;
}

return EndpointKind.Unknown;
```

The source explicitly labels this as an optional heuristic rather than a strict classifier.

---

## S-064 — `fb3f3bfa8a`

```text
canvas: x=6686.740, y=5385.762
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### When an exception filter is better than fabricating MVC state in middleware

If controllers already own the failure and you need exactly the MVC invalid-model-state response, an exception/action filter has real `ActionContext`, controller metadata, and `ModelState`. Middleware would need to fabricate those objects, making the solution more brittle.

---

## S-065 — `6564696d5a`

```text
canvas: x=2043.846, y=5496.258
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Real filter created by `IFilterFactory`

```csharp
public class MyFilter : IAsyncActionFilter
{
    private readonly IMyService _service;
    private readonly string _value;

    public MyFilter(IMyService service, string value)
    {
        _service = service;
        _value = value;
    }

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        // use _service and _value
        await next();
    }
}

[MyFactory("abc")]
public IActionResult Bar() => Ok();
```

---

## S-066 — `5603aa04b8`

```text
canvas: x=13063.889, y=5514.580
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Quick result/resource-filter rule

- Change response/result → do it before `next()` in the appropriate filter.
- Measure/observe serialization specifically → result filter after `next()`.
- Measure/observe the whole MVC execution → resource filter after `next()`.

---

## S-067 — `e269ed8b95`

```text
canvas: x=13244.347, y=5530.416
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `[ApiController]` in endpoint metadata

Asking whether `ApiControllerAttribute` is present in the selected endpoint’s metadata is a strong routing-native signal that the endpoint should be treated as an API. Reflection on the controller type is another option.

---

## S-068 — `48edb1003a`

```text
canvas: x=11351.285, y=5612.087
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Creating an API `ProblemDetails` result

```csharp
private static IActionResult CreateApiResult(
    ExceptionContext context)
{
    var problem = new ProblemDetails
    {
        Title = "An unexpected error occurred.",
        Status = StatusCodes.Status500InternalServerError,
        Detail = "Contact support if the problem persists.",
        Instance = context.HttpContext.Request.Path
    };

    return new ObjectResult(problem)
    {
        StatusCode = problem.Status
    };
}
```

---

## S-069 — `692c787076`

```text
canvas: x=6759.758, y=5679.448
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Invalid `ModelState` is not normally an exception

With `[ApiController]`, automatic validation typically short-circuits and returns 400 without throwing. Exception middleware is relevant only if application code throws validation exceptions itself.

If the goal is the same `ProblemDetails` shape rather than literally invoking MVC’s invalid-model-state factory, use `ProblemDetailsFactory` or `IProblemDetailsService` in middleware.

---

## S-070 — `4ed5da7da8`

```text
canvas: x=8147.749, y=5708.562
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why middleware is not equivalent for validation context

Middleware does not have MVC `ModelState` by default. It can return a 400 response, but it cannot participate in MVC validation structures and action context as naturally.

---

## S-071 — `f9590a79dc`

```text
canvas: x=13278.583, y=5809.871
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why an action descriptor may not be a controller action

Inside MVC it is often a controller action, but possible cases include:

- Razor Pages with page descriptors;
- custom MVC action descriptors from extensibility;
- a classification helper reused in middleware or other endpoint types such as Minimal APIs, gRPC, SignalR, or static/non-endpoint requests.

Do not blindly cast every descriptor to `ControllerActionDescriptor`.

---

## S-072 — `6a311c7e34`

```text
canvas: x=8174.130, y=5852.586
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Content-negotiation scenario

When one action supports multiple formatters, an exception filter can return `ObjectResult` and let MVC choose the output based on the request’s `Accept` header and registered formatter constraints.

---

## S-073 — `139c13e19d`

```text
canvas: x=9848.306, y=5962.287
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Automatic output formatting for `ObjectResult`

MVC chooses a formatter based on:

1. the request `Accept` header;
2. constraints such as `[Produces]` / `ObjectResult.ContentTypes`;
3. registered formatters.

JSON is normally available; XML can be added:

```csharp
builder.Services
    .AddControllers()
    .AddXmlSerializerFormatters();
// or AddXmlDataContractSerializerFormatters()
```

---

## S-074 — `b1e9ae59ca`

```text
canvas: x=11342.729, y=6009.142
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Creating an MVC error view result

```csharp
private static IActionResult CreateMvcViewResult(
    ExceptionContext context)
{
    var view = new ViewResult
    {
        ViewName = "Error"
    };

    view.ViewData["TraceId"] =
        context.HttpContext.TraceIdentifier;

    return view;
}

private enum EndpointKind
{
    Api,
    MvcView,
    Unknown
}
```

---

## S-075 — `ad1cebfdc2`

```text
canvas: x=2034.105, y=6023.739
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Capability comparison

Conceptually:

| Capability | Plain attribute | TypeFilter | ServiceFilter | IFilterFactory |
|---|---|---|---|---|
| Attribute syntax | yes | wrapper | wrapper | yes |
| Constructor DI | no | yes | yes | yes |
| Pass values from attribute | constants/properties only | limited `Arguments` | no | yes |
| Custom creation logic | no | no | no | yes |
| Explicit lifetime control | no | no | via DI | yes |
| Conditional creation | no | no | no | yes |

`IFilterFactory` is the most flexible when metadata values and runtime service creation must coexist.

---

## S-076 — `4e35540146`

```text
canvas: x=8158.396, y=6032.062
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `ProblemDetails` through `ObjectResult`

```csharp
public class ProblemDetailsExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        var problem = new ProblemDetails
        {
            Title = "Something went wrong",
            Status = 500
        };

        context.Result = new ObjectResult(problem)
        {
            StatusCode = 500
        };

        context.ExceptionHandled = true;
    }
}
```

Returning `ObjectResult` lets MVC output formatters/content negotiation choose JSON, XML, etc.

---

## S-077 — `504e7a6d09`

```text
canvas: x=13253.902, y=6291.694
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Before routing, no endpoint is selected

If code runs before `UseRouting`, `HttpContext.GetEndpoint()` is `null`. In a filter, routing and endpoint selection have already happened; in middleware, placement determines whether endpoint metadata is available.

---

## S-078 — `8233e81073`

```text
canvas: x=11380.952, y=6394.642
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `[ApiController]` metadata as the strongest API signal

```csharp
context.ActionDescriptor.EndpointMetadata
       .OfType<ApiControllerAttribute>()
       .Any()
```

`[ApiController]` is the canonical switch for API behaviors, making it a strong classification signal.

---

## S-079 — `884a60c455`

```text
canvas: x=9874.097, y=6455.544
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### JSON negotiation example

```csharp
return new ObjectResult(new { message = "oops" })
{
    StatusCode = 500
};
```

```http
GET /api/test
Accept: application/json
```

```json
{ "message": "oops" }
```

---

## S-080 — `6e8a51cc56`

```text
canvas: x=8174.463, y=6472.062
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Metadata-driven exception mapping

```csharp
public void OnException(ExceptionContext context)
{
    var publicApi =
        context.ActionDescriptor.EndpointMetadata
               .OfType<PublicApiAttribute>()
               .Any();

    if (publicApi &&
        context.Exception is RateLimitExceededException)
    {
        context.Result = new StatusCodeResult(429);
        context.ExceptionHandled = true;
    }
}
```

---

## S-081 — `c84bce13e7`

```text
canvas: x=2062.213, y=6543.167
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Passing constants to a plain attribute

```csharp
public class MyAttr : ActionFilterAttribute
{
    public string Name { get; }

    public MyAttr(string name) => Name = name;
}

[MyAttr("Orders.Read")]
public IActionResult Get() => Ok();
```

Attribute constructor values must be valid compile-time attribute arguments.

---

## S-082 — `0233c90eb4`

```text
canvas: x=11436.200, y=6775.320
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Endpoint-classification strategy

For controller actions:

- `Controller` usually implies MVC views;
- `ControllerBase` usually implies API style.

Optional fallback: inspect `[Produces]`.

Use `ObjectResult` for API errors because it runs through formatters. Leave unknown/minimal/non-MVC endpoint failures to global middleware.

---

## S-083 — `c8def98585`

```text
canvas: x=8170.915, y=6913.657
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Middleware can emulate per-action policies only manually

Generic exception middleware would need to inspect endpoint metadata and recreate a policy-per-action model. Exception filters are the framework-native mechanism for MVC-scoped behavior.

---

## S-084 — `6b05b4afc2`

```text
canvas: x=9872.321, y=6948.994
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### XML negotiation example

```http
GET /api/test
Accept: application/xml
```

Conceptual response:

```xml
<object>
  <message>oops</message>
</object>
```

The same `ObjectResult` code was used; MVC selected an XML formatter.

---

## S-085 — `4bd27c5397`

```text
canvas: x=8198.993, y=7069.001
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Convert an exception to an MVC authentication result

```csharp
if (context.Exception is TokenExpiredException)
{
    context.Result = new ChallengeResult();
    context.ExceptionHandled = true;
}
```

`ChallengeResult` participates in MVC/authentication conventions. Middleware can set status/headers, but reproducing the same MVC-level result semantics manually is less direct.

---

## S-086 — `9b74ca6c1e`

```text
canvas: x=2031.901, y=7075.848
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### What `ServiceFilter` does

```csharp
[ServiceFilter(typeof(MyFilter))]
```

It resolves `MyFilter` from DI and uses its registered lifetime. The attribute does not support passing arbitrary constructor arguments:

```csharp
// no such ServiceFilter Arguments API
[ServiceFilter(typeof(MyFilter), Arguments = ...)]
```

---

## S-087 — `dc542b79ad`

```text
canvas: x=9870.088, y=7421.963
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `[Produces]` can constrain negotiation

```csharp
[Produces("application/json")]
public IActionResult Get() => Ok(new { x = 1 });
```

Even if the client requests XML, MVC may return JSON because the action is restricted to JSON, or produce 406 depending on configuration. `[Produces]` shapes/limits content negotiation.

---

## S-088 — `41935f47e6`

```text
canvas: x=2074.038, y=7583.514
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Passing constants to `TypeFilter`

`TypeFilterAttribute.Arguments` can pass extra constructor arguments:

```csharp
[TypeFilter(
    typeof(MyFilter),
    Arguments = new object[] { "Orders.Read" })]
```

Limitations: `object[]`, weak compile-time safety, awkward/discoverability issues, positional constructor binding, and attribute arguments still cannot be runtime values.

---

## S-089 — `92b6564845`

```text
canvas: x=9877.761, y=7943.297
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Exception `ObjectResult` preserves negotiation

```csharp
public void OnException(ExceptionContext context)
{
    context.Result = new ObjectResult(new ProblemDetails
    {
        Title = "Something went wrong",
        Status = 500
    })
    {
        StatusCode = 500
    };

    context.ExceptionHandled = true;
}
```

If JSON and XML formatters are enabled, the error result is formatted according to `Accept`.

---

## S-090 — `50d59e6ad8`

```text
canvas: x=8137.336, y=8133.387
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Status-code pages question

For a screenshot/topic about generic 404/406/415 status-code pages, filters are usually the wrong main tool. A filter can handle selected MVC cases, but status-code-pages middleware is designed for statuses produced outside or after MVC routing/action selection.

---

## S-091 — `fe4225f257`

```text
canvas: x=1975.471, y=8225.168
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### `RequirePermissionAttribute : IFilterFactory`

```csharp
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public sealed class RequirePermissionAttribute :
    Attribute, IFilterFactory
{
    public string Permission { get; }

    public RequirePermissionAttribute(string permission)
        => Permission = permission;

    public bool IsReusable => false;

    public IFilterMetadata CreateInstance(IServiceProvider sp)
    {
        var permissionService =
            sp.GetRequiredService<IPermissionService>();

        return new RequirePermissionFilter(
            permissionService,
            Permission);
    }
}
```

The permission string is constant attribute metadata; the filter instance receives runtime services.

---

## S-092 — `03c5262ce7`

```text
canvas: x=8187.336, y=8555.887
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Why a filter is unreliable for generic status-code pages

Many relevant status codes occur without MVC action execution:

- 404: no endpoint/controller matched;
- 405: method/routing mismatch;
- 401/403: often authentication/authorization middleware;
- 415: often input formatting/model binding;
- 406: output formatting/negotiation.

A filter cannot guarantee a body for every such status because there may be no action/filter pipeline to run.

---

## S-093 — `d1295b56dc`

```text
canvas: x=2076.354, y=8746.866
readability: high
cut off: no, unless explicitly described in the source text
confidence: high
```

### Metadata + runtime services + request scope

A factory-style attribute is the first point where these coexist cleanly:

```text
attribute metadata
runtime-resolved services
request/filter creation scope
```
