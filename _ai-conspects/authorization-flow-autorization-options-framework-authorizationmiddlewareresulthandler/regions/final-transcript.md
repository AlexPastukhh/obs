# Final semantic transcript — ASP.NET Core authorization flow

Authoritative source: `source/authorization flow,autorization options, framework, authorizationmiddlewareresulthandler(2).svg`

Coverage: **119 unique screenshots / 120 placements + 112 native SVG labels**

This version supersedes the earlier `54/55` source boundary. The additional
material completes result handling, failure inspection, policy scheme behavior
and custom `IAuthorizationMiddlewareResultHandler` implementations.

---

# R01 — authorization architecture, options and policy construction

## Pipeline position and runtime pieces

Authorization runs after routing has selected an endpoint and normally after
authentication has populated `HttpContext.User`.

Typical ordering:

```csharp
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
```

The main runtime pieces are:

```text
UseAuthorization
    adds AuthorizationMiddleware

IAuthorizationPolicyProvider
    supplies named/default/fallback policies

AuthorizationPolicy
    combined requirements and authentication schemes

IPolicyEvaluator
    authenticates policy schemes and maps authorization to
    success/challenge/forbid

IAuthorizationService
    evaluates requirements through handlers

IAuthorizationHandler
    succeeds or fails requirements

IAuthorizationMiddlewareResultHandler
    translates the policy result into HTTP pipeline behavior
```

Authorization answers whether the current user may access the selected endpoint.
It does not establish the user identity by itself.

## `AuthorizationOptions`

```csharp
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = ...;
    options.FallbackPolicy = ...;
    options.InvokeHandlersAfterFailure = true;

    options.AddPolicy("AdminOnly", policy =>
    {
        policy.RequireRole("Admin");
    });
});
```

Important options:

```text
DefaultPolicy
    used when authorization is explicitly requested but no policy name is given

FallbackPolicy
    used when endpoint metadata contains no authorization requirement

InvokeHandlersAfterFailure
    controls whether later handlers still run after context.Fail()

named policies
    registered through AddPolicy and retrieved by the policy provider
```

`DefaultPolicy` is not the same as `FallbackPolicy`.

A typical default policy requires an authenticated user:

```csharp
options.DefaultPolicy =
    new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
```

A fallback policy can lock down endpoints globally unless they are marked
anonymous:

```csharp
options.FallbackPolicy =
    new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
```

## Endpoint authorization metadata

The middleware combines several metadata sources from the selected endpoint.

### `IAuthorizeData`

Produced by ordinary authorization attributes and endpoint conventions:

```csharp
[Authorize]
[Authorize(Roles = "Admin")]
[Authorize(Policy = "CanEditOrders")]
```

This is raw metadata. The policy provider combines it into an effective
`AuthorizationPolicy`.

### Direct `AuthorizationPolicy`

An endpoint can carry a policy object that has already been built:

```csharp
var policy =
    new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .RequireRole("Admin")
        .Build();

app.MapGet("/admin", () => "admin")
   .RequireAuthorization(policy);
```

### `IAuthorizationRequirementData`

Custom metadata may create requirements dynamically:

```csharp
public sealed class MinimumAgeAttribute(int age)
    : Attribute, IAuthorizationRequirementData
{
    public IEnumerable<IAuthorizationRequirement>
        GetRequirements()
    {
        yield return new MinimumAgeRequirement(age);
    }
}
```

The middleware gathers and combines:

```text
IAuthorizeData
direct AuthorizationPolicy metadata
IAuthorizationRequirementData
```

The resulting policy contains requirements and zero or more authentication
schemes.

## Named policy lookup

A named policy can be requested directly:

```csharp
var policy =
    await policyProvider.GetPolicyAsync("AdminOnly");
```

Normal endpoint authorization usually obtains named policies indirectly while
combining endpoint metadata.

---

# R02 — `AuthorizationMiddleware` and `PolicyEvaluator`

## Step 1: obtain the selected endpoint

```csharp
var endpoint = context.GetEndpoint();
```

The middleware marks that it observed an endpoint. Endpoint routing can later
detect incorrect middleware order.

## Step 2: build or retrieve the effective policy

The middleware may use a cached policy. Otherwise it reads ordered endpoint
metadata and calls the policy provider to combine it.

Conceptual input:

```csharp
endpoint.Metadata.GetOrderedMetadata<IAuthorizeData>();
endpoint.Metadata.GetOrderedMetadata<AuthorizationPolicy>();
endpoint.Metadata.GetOrderedMetadata<IAuthorizationRequirementData>();
```

Example endpoint:

```csharp
[Authorize(Roles = "Admin")]
[Authorize(Policy = "CanManageOrders")]
public IActionResult ManageOrders() => Ok();
```

The effective policy contains requirements from both declarations.

## Step 3: no policy means continue

When no explicit, direct or fallback policy applies:

```csharp
await next(context);
return;
```

Authorization middleware performs no access decision.

## Step 4: authenticate schemes required by the policy

```csharp
var authenticateResult =
    await policyEvaluator.AuthenticateAsync(
        policy,
        context);
```

If the policy explicitly lists schemes:

```csharp
[Authorize(AuthenticationSchemes = "Cookies,Bearer")]
```

the evaluator authenticates those schemes, merges successful identities into one
principal and assigns it to `HttpContext.User`.

If no scheme is listed, it can reuse an existing authentication result or the
current principal. Authentication features preserve richer information than
`HttpContext.User` alone:

```text
principal
authentication ticket
properties
scheme
success/failure state
```

This prevents losing ticket/properties information when authorization needs the
previous authentication result.

Repeated `AuthenticateAsync("Cookies")` calls do not necessarily redo all
expensive cookie validation. Authentication handlers commonly cache one
authenticate task per request.

## `AllowAnonymous`

The middleware still performs policy authentication first so the user may be
populated. When endpoint metadata contains `IAllowAnonymous`, it skips the
failure/challenge handling and continues:

```csharp
await next(context);
```

`AllowAnonymous` therefore means “do not block this endpoint on authorization,”
not necessarily “never attempt authentication.”

## Step 5: choose the authorization resource

Middleware commonly passes the current `HttpContext` as the resource:

```csharp
object resource = context;
```

Framework switches may choose the endpoint instead. Custom handlers must know
which resource type they expect.

## Step 6: authorize

```csharp
var authorizeResult =
    await policyEvaluator.AuthorizeAsync(
        policy,
        authenticateResult,
        context,
        resource);
```

The evaluator asks `IAuthorizationService` to evaluate the policy requirements.

Decision mapping:

```text
authorization succeeds
    -> PolicyAuthorizationResult.Success()

authorization fails and authentication succeeded
    -> PolicyAuthorizationResult.Forbid(failure)

authorization fails and authentication did not succeed
    -> PolicyAuthorizationResult.Challenge()
```

This distinction explains:

```text
challenge
    client must authenticate

forbid
    client is authenticated but not permitted
```

---

# R03 — authorization service, handlers and evaluator internals

## `DefaultAuthorizationService`

The default service performs this sequence:

```text
1. create AuthorizationHandlerContext
2. resolve registered IAuthorizationHandler instances
3. invoke each handler
4. optionally stop after failure
5. evaluate the final handler context
```

Conceptually:

```csharp
var authContext =
    contextFactory.CreateContext(
        requirements,
        user,
        resource);

var handlers =
    await handlerProvider.GetHandlersAsync(authContext);

foreach (var handler in handlers)
{
    await handler.HandleAsync(authContext);

    if (!options.InvokeHandlersAfterFailure &&
        authContext.HasFailed)
    {
        break;
    }
}

return evaluator.Evaluate(authContext);
```

## Handler provider

`DefaultAuthorizationHandlerProvider` obtains registered handlers from dependency
injection. Register custom handlers normally:

```csharp
builder.Services.AddSingleton<
    IAuthorizationHandler,
    MinimumAgeHandler>();

builder.Services.AddScoped<
    IAuthorizationHandler,
    TenantAccessHandler>();
```

## Success and failure

A handler succeeds a requirement:

```csharp
context.Succeed(requirement);
```

A handler records explicit failure:

```csharp
context.Fail();
```

or a detailed reason:

```csharp
context.Fail(
    new AuthorizationFailureReason(
        this,
        "Tenant access denied."));
```

Important distinction:

```text
pending requirement
    no handler has succeeded it

explicit failure
    context.Fail() was called
```

Once `Fail()` is called, the authorization attempt remains failed even if a later
handler succeeds a requirement.

## `InvokeHandlersAfterFailure`

Default behavior is `true`:

```text
handler A calls Fail()
handler B still runs
handler C still runs
final result remains failure
```

Continuing can be useful for:

```text
collecting multiple failure reasons
auditing and metrics
logging side effects
diagnostics
```

Set it to `false` when a hard failure should stop further work or later handlers
are expensive:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.InvokeHandlersAfterFailure = false;
});
```

## Final evaluator

After all selected handlers run, the evaluator returns success only when:

```text
no explicit failure exists
all requirements have been succeeded
```

On failure it preserves:

```text
FailedRequirements
FailureReasons
```

That information later reaches `PolicyAuthorizationResult.AuthorizationFailure`
for custom response handling.

---

# R04 — result types and `AuthorizationMiddlewareResultHandler`

## `PolicyAuthorizationResult`

The result has three effective states:

```text
Succeeded
Challenged
Forbidden
```

A forbidden result may preserve the detailed `AuthorizationFailure`:

```csharp
PolicyAuthorizationResult.Forbid(
    authorizationFailure);
```

That allows later components to inspect failed requirements and reasons.

## Default result handler

`AuthorizationMiddlewareResultHandler` converts the policy result into pipeline
behavior.

Conceptually:

```csharp
if (authorizeResult.Succeeded)
{
    await next(context);
    return;
}

if (authorizeResult.Challenged)
{
    // challenge policy schemes or default scheme
    return;
}

if (authorizeResult.Forbidden)
{
    // forbid policy schemes or default scheme
    return;
}
```

### Success

```csharp
await next(context);
```

The selected endpoint executes.

### Challenge

If the policy names schemes, each scheme is challenged:

```csharp
foreach (
    var scheme
    in policy.AuthenticationSchemes)
{
    await context.ChallengeAsync(scheme);
}
```

Otherwise the default challenge scheme is used:

```csharp
await context.ChallengeAsync();
```

Actual behavior depends on the authentication handler:

```text
JWT bearer
    commonly returns 401 and may add WWW-Authenticate

cookie
    commonly redirects to a login page

OpenID Connect
    commonly redirects to the identity provider
```

### Forbid

Named schemes are forbidden individually:

```csharp
foreach (
    var scheme
    in policy.AuthenticationSchemes)
{
    await context.ForbidAsync(scheme);
}
```

Otherwise the default forbid scheme is used.

Typical behavior:

```text
JWT bearer
    403 Forbidden

cookie
    access-denied redirect or configured API behavior

remote schemes
    scheme-specific
```

## Why a custom result handler exists

Applications may need:

```text
JSON for authorization failures
a custom status for one failed requirement
different behavior for API and browser endpoints
resource-hiding 404 instead of 403
centralized security logging
problem-details responses
safe production messages
```

Interface:

```csharp
public interface IAuthorizationMiddlewareResultHandler
{
    Task HandleAsync(
        RequestDelegate next,
        HttpContext context,
        AuthorizationPolicy policy,
        PolicyAuthorizationResult authorizeResult);
}
```

The parameters provide:

```text
next
    next endpoint/middleware delegate

context
    current HttpContext

policy
    final combined policy

authorizeResult
    success/challenge/forbid and failure details
```

## Inspect failed requirements

```csharp
if (
    authorizeResult.Forbidden &&
    authorizeResult.AuthorizationFailure is { } failure)
{
    var failedRequirements =
        failure.FailedRequirements;

    var reasons =
        failure.FailureReasons;
}
```

This supports targeted response logic.

## Safe custom JSON response

A robust handler customizes only selected cases and delegates everything else to
the framework handler:

```csharp
public sealed class JsonAuthorizationResultHandler
    : IAuthorizationMiddlewareResultHandler
{
    private readonly
        AuthorizationMiddlewareResultHandler
        _defaultHandler = new();

    public async Task HandleAsync(
        RequestDelegate next,
        HttpContext context,
        AuthorizationPolicy policy,
        PolicyAuthorizationResult authorizeResult)
    {
        if (
            authorizeResult.Forbidden &&
            IsApiRequest(context))
        {
            context.Response.StatusCode =
                StatusCodes.Status403Forbidden;

            context.Response.ContentType =
                "application/json";

            await context.Response.WriteAsJsonAsync(
                new
                {
                    error = "forbidden",
                    message =
                        "You do not have permission "
                        + "to access this resource.",
                });

            return;
        }

        await _defaultHandler.HandleAsync(
            next,
            context,
            policy,
            authorizeResult);
    }

    private static bool IsApiRequest(
        HttpContext context)
    {
        return context.Request.Path
            .StartsWithSegments("/api");
    }
}
```

Register the handler:

```csharp
builder.Services.AddSingleton<
    IAuthorizationMiddlewareResultHandler,
    JsonAuthorizationResultHandler>();
```

## Requirement-specific response and resource hiding

A custom handler may map one failed requirement to 404:

```csharp
if (
    authorizeResult.Forbidden &&
    authorizeResult.AuthorizationFailure
        ?.FailedRequirements
        .OfType<Show404Requirement>()
        .Any() == true)
{
    context.Response.StatusCode =
        StatusCodes.Status404NotFound;

    return;
}
```

This can hide the existence of private resources.

## Do not bypass scheme behavior accidentally

Writing `401` or `403` directly skips the selected authentication scheme’s
challenge/forbid pipeline.

That may lose:

```text
WWW-Authenticate headers
cookie login/access-denied redirects
OpenID Connect redirects
custom handler events
scheme-specific response customization
```

Therefore:

```text
customize only the cases you own
delegate all other cases to the default result handler
```

This is especially important when the same application serves both browser and
API endpoints.

---

# End-to-end flow

```text
routing selects endpoint
    ↓
authentication may establish user/result features
    ↓
AuthorizationMiddleware reads endpoint metadata
    ↓
policy provider combines default/named/direct requirements
    ↓
PolicyEvaluator authenticates required schemes
    ↓
AllowAnonymous may bypass blocking
    ↓
AuthorizationService runs handlers
    ↓
evaluator returns success or AuthorizationFailure
    ↓
PolicyEvaluator maps failure to challenge/forbid
    ↓
IAuthorizationMiddlewareResultHandler:
    success   -> next(context)
    challenge -> ChallengeAsync
    forbid    -> ForbidAsync
    custom    -> targeted response, otherwise delegate to default
```

---

# Coverage

```text
unique embedded screenshots: 119
image uses: 120
native SVG labels: 112
duplicate extra placements: 1

R01 image uses: 24
R01 text labels: 31

R02 image uses: 36
R02 text labels: 37

R03 image uses: 24
R03 text labels: 16

R04 image uses: 36
R04 text labels: 28

processed image uses: 120
processed text labels: 112
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
