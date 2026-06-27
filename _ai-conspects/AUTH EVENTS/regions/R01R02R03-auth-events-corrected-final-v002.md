# Corrected semantic transcript — AUTH EVENTS v002

Authoritative source: `source/AUTH EVENTS.svg`  
Corrected coverage: **93 unique screenshots / 94 placements + 38 native SVG labels**

The former transcript covered six screenshots. The repaired SVG restores the complete cookie/JWT event map, context classes, implementation examples and API-response behavior.

---

# R01 — Cookie authentication events

Cookie events can be configured inline:

```csharp
options.Events.OnSigningIn = context =>
{
    return Task.CompletedTask;
};
```

or through a reusable event class:

```csharp
builder.Services.AddScoped<CustomCookieEvents>();

builder.Services
    .AddAuthentication()
    .AddCookie(options =>
    {
        options.EventsType = typeof(CustomCookieEvents);
    });
```

A dedicated class is preferable when event logic needs dependency injection, database access, reusable services or meaningful tests.

## `OnSigningIn` — `CookieSigningInContext`

Runs before the authentication ticket is written to the cookie.

Commonly accessed members include:

```text
Principal
Properties
CookieOptions
HttpContext
```

Typical uses:

- add or remove claims before cookie creation;
- set authentication properties;
- choose persistent versus session cookie behavior;
- set expiry and issued time;
- customize cookie flags for the sign-in operation.

Example:

```csharp
options.Events.OnSigningIn = context =>
{
    var identity = (ClaimsIdentity)context.Principal!.Identity!;
    identity.AddClaim(new Claim("tenant", "northwind"));

    context.Properties.IsPersistent = true;
    context.Properties.ExpiresUtc =
        DateTimeOffset.UtcNow.AddHours(8);

    return Task.CompletedTask;
};
```

Changes here affect the cookie being issued now. They do not automatically rewrite cookies that were already issued.

## `OnSignedIn` — `CookieSignedInContext`

Runs after sign-in completes.

Good uses:

```text
audit successful login
emit telemetry
record last-login time
trigger post-login side effects
```

Do not rely on this event to change the already-created cookie. Claim changes belong in `OnSigningIn`.

## `OnValidatePrincipal` — `CookieValidatePrincipalContext`

Runs when an incoming cookie principal is validated. This is the most important cookie-refresh/revocation hook.

Important operations:

```csharp
context.RejectPrincipal();
await context.HttpContext.SignOutAsync();

context.ReplacePrincipal(newPrincipal);
context.ShouldRenew = true;
```

Typical scenarios:

- user was disabled or deleted;
- password/security-stamp changed;
- tenant membership was revoked;
- claims must be refreshed from the database;
- cookie version is older than the current account version.

Example:

```csharp
options.Events.OnValidatePrincipal = async context =>
{
    var userId = context.Principal?
        .FindFirstValue(ClaimTypes.NameIdentifier);

    var state = await users.GetSecurityStateAsync(userId);

    if (!state.IsActive)
    {
        context.RejectPrincipal();
        await context.HttpContext.SignOutAsync();
        return;
    }

    if (state.ClaimsVersion !=
        context.Principal!.FindFirstValue("claims_version"))
    {
        context.ReplacePrincipal(
            await principalFactory.CreateAsync(state.User));

        context.ShouldRenew = true;
    }
};
```

Cryptographic cookie validity does not prove the account is still enabled or that its claims remain acceptable.

## `OnSigningOut` — `CookieSigningOutContext`

Runs before sign-out completes. Appropriate uses include:

```text
audit logout
revoke a server-side session
delete refresh/session records
clean up per-session resources
```

The event should be idempotent because sign-out may be requested more than once.

## Redirect events — `RedirectContext<CookieAuthenticationOptions>`

Cookie authentication is traditionally page-oriented:

```text
challenge -> redirect to login
forbid    -> redirect to access denied
logout    -> redirect to logout/return URL
```

Events:

```text
OnRedirectToLogin
OnRedirectToAccessDenied
OnRedirectToLogout
OnRedirectToReturnUrl
```

For APIs, redirects often need to become JSON `401`/`403` responses:

```csharp
options.Events.OnRedirectToLogin = async context =>
{
    context.Response.StatusCode = StatusCodes.Status401Unauthorized;

    await problemDetails.TryWriteAsync(
        new ProblemDetailsContext
        {
            HttpContext = context.HttpContext,
            ProblemDetails =
            {
                Status = StatusCodes.Status401Unauthorized,
                Title = "Authentication required"
            }
        });
};
```

Forbid uses status `403`.

Only one component should own the response body. Once headers or a body are written, later middleware cannot safely replace them.

## Sliding expiration — `OnCheckSlidingExpiration`

With sliding expiration enabled, the handler decides whether a ticket should be renewed.

```csharp
options.SlidingExpiration = true;

options.Events.OnCheckSlidingExpiration = context =>
{
    if (context.Principal.HasClaim("session_fixed", "true"))
        context.ShouldRenew = false;

    return Task.CompletedTask;
};
```

Sliding expiration extends an active session; it is not an account-revocation mechanism. Revocation and claim freshness still belong in `OnValidatePrincipal`.

---

# R02 — JWT bearer events

## `OnMessageReceived` — `MessageReceivedContext`

Runs when the bearer handler is locating the token.

Common uses:

```text
read a token from a controlled nonstandard location
support SignalR/WebSocket query-string access tokens
normalize a proxy-specific token source
set context.Token explicitly
```

Example for a limited SignalR path:

```csharp
options.Events.OnMessageReceived = context =>
{
    var accessToken = context.Request.Query["access_token"];
    var path = context.HttpContext.Request.Path;

    if (!StringValues.IsNullOrEmpty(accessToken) &&
        path.StartsWithSegments("/hubs/chat"))
    {
        context.Token = accessToken;
    }

    return Task.CompletedTask;
};
```

Query-string tokens should be restricted to the endpoint that requires them because URLs may be logged or exposed.

Do not perform complex authorization or database-heavy business decisions here.

## `OnTokenValidated` — `TokenValidatedContext`

Runs after signature, issuer, audience, lifetime and token-structure validation have succeeded and a principal exists.

Appropriate uses:

- verify tenant/account state;
- reject blocked or deleted users;
- perform application-specific token-version checks;
- add trusted application claims;
- validate state that cannot be encoded safely into a long-lived token.

```csharp
options.Events.OnTokenValidated = async context =>
{
    var tenant = context.Principal!.FindFirstValue("tenant");

    if (!await tenantRegistry.IsEnabledAsync(tenant))
        context.Fail("Tenant is disabled.");
};
```

“Token validated” means the configured token validation succeeded. It does not prove every business rule is satisfied.

## `OnAuthenticationFailed` — `AuthenticationFailedContext`

Runs when authentication fails, for example because of:

```text
expired token
invalid signature
wrong issuer/audience
malformed token
custom validation exception
```

Good uses:

```text
structured logging
metrics
diagnostic correlation
safe custom response ownership when required
```

Do not expose raw exception messages or security-sensitive details in production responses.

## `OnChallenge` — `JwtBearerChallengeContext`

Runs when the authentication system produces a `401` challenge.

If the event writes the complete response, call:

```csharp
context.HandleResponse();
```

Then set the status and write the body:

```csharp
options.Events.OnChallenge = async context =>
{
    context.HandleResponse();
    context.Response.StatusCode =
        StatusCodes.Status401Unauthorized;

    await problemDetails.TryWriteAsync(...);
};
```

Without `HandleResponse`, the default bearer challenge may also try to modify the response.

## `OnForbidden` — `ForbiddenContext`

Runs for `403`: the principal is authenticated, but authorization failed.

```csharp
options.Events.OnForbidden = async context =>
{
    context.Response.StatusCode =
        StatusCodes.Status403Forbidden;

    await problemDetails.TryWriteAsync(...);
};
```

Distinction:

```text
OnAuthenticationFailed
    authentication processing failed

OnChallenge
    endpoint requires authentication and no acceptable principal exists

OnForbidden
    acceptable principal exists but lacks authorization
```

---

# R03 — Shared API endpoint metadata and response behavior

Cookie and bearer handlers expose different event types, but both participate in the same request pipeline.

Common context information includes:

```text
HttpContext
Request / Response
authentication scheme
handler options
Principal where available
authentication properties where available
```

The source also maps API-oriented endpoint metadata through `IApiEndpointMetadata`.

Known API-style endpoint examples include:

```text
[ApiController] actions
minimal APIs that consume or produce JSON
endpoints returning TypedResults
SignalR endpoints
```

Metadata can be inspected through:

```csharp
var endpoint = httpContext.GetEndpoint();

var isApi = endpoint?.Metadata
    .GetMetadata<IApiEndpointMetadata>() is not null;
```

Framework behavior differs by target framework and endpoint style. Applications supporting custom metadata or mixed page/API endpoints should still make the intended response shape explicit.

## ProblemDetails ownership

A shared helper can produce consistent `401` and `403` bodies:

```csharp
await problemDetailsService.TryWriteAsync(
    new ProblemDetailsContext
    {
        HttpContext = httpContext,
        ProblemDetails =
        {
            Status = status,
            Title = title
        }
    });
```

Rules:

```text
set the status before writing
do not write twice
do not leak authentication exceptions
keep authentication events focused on handler concerns
keep resource authorization in policies/handlers
```

---

# Corrected coverage

```text
previous unique screenshots: 6
corrected unique screenshots: 93
previous image uses: 6
corrected image uses: 94
recovered missing unique screenshots: 87
recovered missing image uses: 88
native SVG labels: 38
duplicate extra placements: 1

processed image uses: 94
processed text labels: 38
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
