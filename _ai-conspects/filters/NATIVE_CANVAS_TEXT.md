# Native SVG canvas text

The SVG contains 188 non-empty physical text nodes grouped into 41 canvas blocks. They are preserved here with whitespace normalized.

## T-GROUP-01

```text
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;
public class RequireAdminFilter : IAsyncAuthorizationFilter
{
public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
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

## T-GROUP-02

```text
using Microsoft.AspNetCore.Mvc.Filters;
public class SimpleCacheResourceFilter : IResourceFilter
{
public void OnResourceExecuting(ResourceExecutingContext context)
{
// Example: short-circuit if cached
var key = context.HttpContext.Request.Path.ToString();
var cached = MyCache.Get(key);
if (cached != null)
{
context.Result = new Microsoft.AspNetCore.Mvc.ContentResult
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

## T-GROUP-03

```text
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;
public class TimingActionFilter : IAsyncActionFilter
{
private readonly ILogger<TimingActionFilter> _log;
public TimingActionFilter(ILogger<TimingActionFilter> log) => _log = log;
public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
{
var sw = Stopwatch.StartNew();
// Example: auto-validate ModelState and short-circuit
if (!context.ModelState.IsValid)
{
context.Result = new Microsoft.AspNetCore.Mvc.BadRequestObjectResult(context.ModelState);
return;
}
var executedContext = await next(); // actually runs the action
sw.Stop();
_log.LogInformation("Action {action} took {ms}ms", context.ActionDescriptor.DisplayName, sw.ElapsedMilliseconds);
// You can inspect executedContext.Result or Exception here
}
}
```

## T-GROUP-04

```text
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
public class ApiExceptionFilter : IExceptionFilter
{
public void OnException(ExceptionContext context)
{
var ex = context.Exception;
// map exception types to status codes / ProblemDetails
var pd = new ProblemDetails {
Title = "An error occurred",
Detail = ex.Message
};
context.Result = new ObjectResult(pd) { StatusCode = 500 };
context.ExceptionHandled = true;
}
}
```

## T-GROUP-05

```text
!!!
```

## T-GROUP-06

```text
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
public class WrapResultFilter : IResultFilter
{
public void OnResultExecuting(ResultExecutingContext context)
{
if (context.Result is ObjectResult obj)
{
// wrap existing payload
var newObj = new { data = obj.Value, ok = true };
context.Result = new ObjectResult(newObj) { StatusCode = obj.StatusCode };
}
}
public void OnResultExecuted(ResultExecutedContext context)
{
// after result wrote to response
}
}
```

## T-GROUP-07

```text
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Threading;
public class LogEndpointFilter : IEndpointFilter
{
private readonly ILogger<LogEndpointFilter> _log;
public LogEndpointFilter(ILogger<LogEndpointFilter> log) => _log = log;
public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext ctx, EndpointFilterDelegate next)
{
_log.LogInformation("Before endpoint {e}", ctx.Endpoint?.DisplayName);
var result = await next(ctx);
_log.LogInformation("After endpoint {e}", ctx.Endpoint?.DisplayName);
return result;
}
}
// Attach example:
app.MapGet("/hi", () => "hello").AddEndpointFilter<LogEndpointFilter>();
```

## T-GROUP-08

```text
!!!
```

## T-GROUP-09

```text
more intuitivee
```

## T-GROUP-10

```text
returning cached result before model binding
```

## T-GROUP-11

```text
resource filter after
action can cache
validated models
```

## T-GROUP-12

```text
CAN ALSO USE FILTER ATTRIBUTES
CANT USE DI IN CTOR, NEED TO GET FROM CONTEXT
IT IS A DEFAULT WAY TO USE FILTERS ACTUALLY
```

## T-GROUP-13

```text
IFILTERFACTORY
```

## T-GROUP-14

```text
can pass shit to attr with filt fact
```

## T-GROUP-15

```text
filters
_____
filters vs middleware and
theor
```

## T-GROUP-16

```text
filters
```

## T-GROUP-17

```text
!!!!
```

## T-GROUP-18

```text
middleware simply runs
before filters
```

## T-GROUP-19

```text
can add this under main sheet which is lower
```

## T-GROUP-20

```text
mb better to use
more excplicit ismthFilter or iasyncSmthFilter
and base Attribute class
```

## T-GROUP-21

```text
but here you also can do async things
```

## T-GROUP-22

```text
<---ASYNC FILTERS
```

## T-GROUP-23

```text
!!!
```

## T-GROUP-24

```text
DI FOR GLOBAL AND TYPEFILTER WITH SERVICEFILTER
```

## T-GROUP-25

```text
ordering
```

## T-GROUP-26

```text
exception filter
```

## T-GROUP-27

```text
so when we are in mvc land and return object result or derived from object
result, we dont care about accept header, its automatically handled
in middleware we nneed to use pdservice/factory for some content negotiations
```

## T-GROUP-28

```text
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
public class ApiExceptionFilter : IExceptionFilter
{
public void OnException(ExceptionContext context)
{
var ex = context.Exception;
// map exception types to status codes / ProblemDetails
var pd = new ProblemDetails {
Title = "An error occurred",
Detail = ex.Message
};
context.Result = new ObjectResult(pd) { StatusCode = 500 };
context.ExceptionHandled = true;
}
}
```

## T-GROUP-29

```text
result after exec vs
resource after action
```

## T-GROUP-30

```text
invalidmodstrespfac with
middleware and filter
```

## T-GROUP-31

```text
checking if rout is from api
or controller
```

## T-GROUP-32

```text
how to get services from httpcontext
```

## T-GROUP-33

```text
why we cant use exc filters
to catch exceptions from auth filters
```

## T-GROUP-34

```text
exception middleware can
```

## T-GROUP-35

```text
return viewresult error page
```

## T-GROUP-36

```text
filter instead of
statuscodepages?
```

## T-GROUP-37

```text
always run result filter
```

## T-GROUP-38

```text
alwats run result filter
```

## T-GROUP-39

```text
filter will run even if previous stages short circuited
```

## T-GROUP-40

```text
example
```

## T-GROUP-41

```text
marking exception as
handled to stop propagation
```
