# ASP.NET Core filters — integrated final study transcript

The source-preserving regional files are authoritative for screenshot-by-screenshot repetition. This file connects the material into one study path.

## 1. Pipeline position

```text
middleware
routing / endpoint selection
MVC endpoint:
    authorization filters
    resource filters (before)
    model binding
    action filters (before)
    action method
    action filters (after)
    exception filters for eligible failures
    result filters (before)
    result execution / formatters / serialization
    result filters (after)
    resource filters (after)
middleware unwind
```

Middleware is wider and earlier. MVC filters are narrower but know the action, controller, arguments, model state, and result.

## 2. Filter types

### Authorization

Runs first in MVC. Use it to challenge, forbid, or short-circuit access. Do not throw for ordinary denial.

### Resource

Wraps model binding, action execution, and result execution. It is the earliest MVC stage that can avoid model binding, making it suitable for early caching, feature flags, and request-scoped setup.

### Action

Runs after binding and around the action method. Use it when action arguments, `ModelState`, controller instance, or action timing matter.

### Exception

Converts eligible action/result-stage exceptions into MVC results. It does not replace global exception middleware and does not catch authorization-filter, routing, or arbitrary middleware failures.

### Result

Runs around result execution. Modify/wrap the result before `next`; after `next`, primarily observe serialization, output formatting, cancellation, or failures.

### Endpoint

A related Minimal-API pipeline concept using `IEndpointFilter`, not an MVC action filter.

## 3. Sync and async forms

Use synchronous filter interfaces for synchronous work. Use async interfaces when real asynchronous work is required.

Do not block async operations with `.Result` or `.Wait()` inside synchronous filter methods.

## 4. Ordering

Ordering combines:

1. filter stage;
2. scope: global → controller → action;
3. `Order` within the same stage/scope.

The before path runs from outer to inner. The after path unwinds in reverse order.

`TypeFilterAttribute` and `ServiceFilterAttribute` expose `Order`. A filter class itself needs `IOrderedFilter` when it is registered without such a wrapper or needs a built-in default.

## 5. DI and filter creation

### Plain attribute

Good for constant metadata and simple behavior. It is not a normal per-request DI-created object; do not retain scoped state/services in it.

### Global filter by type

```csharp
options.Filters.Add<MyFilter>();
```

Resolved through DI.

### `ServiceFilter`

Resolves an already-registered filter from DI and respects its lifetime.

### `TypeFilter`

Creates the filter through an object factory and resolves constructor services. `Arguments` can pass extra constant values, but is weakly typed.

### `IFilterFactory`

Best when an attribute carries constant metadata while the real filter needs DI services and custom creation logic.

## 6. Middleware versus filters

Use middleware for concerns that must run for every request or before routing: CORS, compression, static files, rate limiting, global logging, and global exception handling.

Use filters for concerns requiring MVC stage data: model state, action arguments, controller metadata, action/result timing, result wrapping, per-action exception mapping, and MVC content negotiation.

## 7. Exception handling

A practical architecture:

```text
global exception middleware:
    catch anything escaping the pipeline
    log unexpected failures
    handle non-MVC failures

exception filters:
    map known MVC/domain failures
    use action/controller metadata
    return ObjectResult / ViewResult / ChallengeResult
```

Set a replacement result and mark the exception handled. Marking handled without defining a response is usually ambiguous.

An exception filter can technically produce HTTP 200, but it cannot make the failed action have completed normally and should not manufacture fake success.

## 8. Content negotiation

Returning `ObjectResult` keeps MVC output formatting. The request `Accept` header, registered formatters, `[Produces]`, and `ContentTypes` affect whether JSON, XML, or 406 is produced.

Middleware can write JSON directly, but then it must reproduce formatter-selection rules itself.

## 9. API versus MVC view errors

Strong signals include `[ApiController]` and controller base type. `[Produces]` is only a heuristic.

A mixed app may return `ProblemDetails` for APIs and `ViewResult("Error")` for MVC pages. Unknown/non-MVC endpoints should normally be left to outer middleware.

## 10. Status-code pages

Generic 404/405/401/403/415/406 handling should not rely solely on MVC filters because many of those statuses occur without an MVC action. Use status-code-pages or exception middleware as appropriate; use filters for MVC-specific variants.

## 11. Antiforgery example

A global `AutoValidateAntiforgeryTokenAttribute` can be paired with `IAsyncAlwaysRunResultFilter` to rewrite `AntiforgeryValidationFailedResult` as SPA-friendly `ProblemDetails`.

Only result filters have always-run interfaces. `[IgnoreAntiforgeryToken]` can opt out per action.
