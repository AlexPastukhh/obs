# AuthenticationTicket, AuthenticationProperties, HttpContext.User — source-preserving transcript

Source: complete corrected SVG, 43 screenshots and 31 SVG text nodes.  
Method: near-literal visual transcription with light spelling/punctuation normalization.  
Interpretation is separated from visible content.

## Canvas structure

Main roads:

1. `HttpContext.User` → `ClaimsPrincipal` → identities, claims, `IsAuthenticated`.
2. `AuthenticationTicket` → principal, properties, authentication scheme.
3. `AuthenticationProperties` → issued/expiry, persistence, refresh, redirect, items, parameters.
4. Token storage helpers and JWT `SaveToken`.
5. Cookie persistence versus JWT per-request behavior.

## Source transcript

### S-001 — `AuthenticationProperties.Parameters`

**Visible text**

`Parameters` is a parameter bag used to pass values during authentication operations:

```csharp
properties.Parameters
```

Think of it as operation-time/transient state rather than `Items`. A common use is a remote-authentication or challenge flow in which the handler reads parameters to influence protocol behavior.

### S-002 — Parameter example

```csharp
var props = new AuthenticationProperties();
props.Parameters["prompt"] = "login";

await HttpContext.ChallengeAsync("oidc", props);
```

Not every handler uses every parameter. The handler-specific documentation or source determines which parameter keys have meaning.

### S-003 — Token storage helpers

`AuthenticationProperties` can store tokens through extension methods:

```csharp
properties.StoreTokens(tokens);
properties.GetTokenValue("access_token");
properties.UpdateTokenValue("access_token", value);
```

`GetTokenValue` returns a token value stored in the authentication properties.

### S-004 — How tokens are represented

Conceptually, stored tokens are kept inside the properties state under special keys.

```csharp
properties.StoreTokens(new[]
{
    new AuthenticationToken
    {
        Name = "access_token",
        Value = accessToken
    },
    new AuthenticationToken
    {
        Name = "refresh_token",
        Value = refreshToken
    }
});
```

### S-005 — Reading stored tokens later

```csharp
var accessToken = properties.GetTokenValue("access_token");
var refreshToken = properties.GetTokenValue("refresh_token");
```

### S-006 — JWT `SaveToken`

For JWT bearer:

```csharp
options.SaveToken = true;
```

After token validation succeeds, the raw incoming bearer token is copied into `AuthenticationProperties` under the token name `access_token`.

### S-007 — Result of `SaveToken`

```csharp
var result = await HttpContext.AuthenticateAsync("Bearer");
var token = result.Properties?.GetTokenValue("access_token");
```

When `SaveToken = false`, the bearer token can still be validated successfully, but it is not retained in the result properties.

### S-008 — Retrieving `Items`

```csharp
var result = await HttpContext.AuthenticateAsync("Cookies");
var tenant = result.Properties?.Items["tenant"];
```

With cookie authentication, `Items` can be serialized into the protected cookie ticket and restored on later requests. With JWT bearer, the items normally belong only to the current authentication result unless custom handler/event code persists them elsewhere.

### S-009 — `AuthenticationProperties.Items`

`Items` is persistent string key/value state:

```csharp
properties.Items
```

It is the main place for authentication state that may need to travel with the ticket.

```csharp
var props = new AuthenticationProperties();
props.Items["tenant"] = "acme";
props.Items["login_reason"] = "checkout";

await HttpContext.SignInAsync("Cookies", principal, props);
```

### S-010 — Redirect flow

Typical remote challenge flow:

```text
Challenge to OIDC
    ↓
external login happens
    ↓
after completion, handler can redirect to RedirectUri
```

Cookie challenge/forbid can also use redirect-related properties when constructing login or access-denied redirects.

### S-011 — `RedirectUri`

`RedirectUri` means where the handler should redirect after the authentication operation completes.

```csharp
properties.RedirectUri
```

Common challenge example:

```csharp
await HttpContext.ChallengeAsync(
    "oidc",
    new AuthenticationProperties
    {
        RedirectUri = "/dashboard"
    });
```

### S-012 — `AllowRefresh = false`

Conceptually:

```text
AllowRefresh = false
tells handler/session logic not to refresh or renew this ticket
```

The exact behavior depends on the selected handler. Cookie authentication is the common place where refresh and renewal semantics matter.

### S-013 — `AllowRefresh`

`AllowRefresh` indicates whether refreshing the authentication session is permitted.

```csharp
properties.AllowRefresh
```

Cookie example:

```csharp
var props = new AuthenticationProperties
{
    AllowRefresh = true
};
```

This can matter with cookie refresh and sliding expiration.

### S-014 — `AllowRefresh` and JWT

For normal JWT bearer validation, `AllowRefresh` is usually not meaningful. The bearer handler validates an incoming token; it does not maintain a browser session cookie that it can renew.

### S-015 — Persistent cookie example

```csharp
var props = new AuthenticationProperties
{
    IsPersistent = true
};

await HttpContext.SignInAsync("Cookies", principal, props);
```

A persistent cookie may survive browser close, depending on cookie settings. A non-persistent/session cookie normally disappears when the browser session ends.

### S-016 — `IsPersistent`

`IsPersistent` indicates whether the authentication session should persist across browser sessions.

```csharp
properties.IsPersistent
```

### S-017 — JWT `ExpiresUtc`

For JWT bearer, the handler derives expiry from the validated token:

```text
token.ValidTo
    ↓
AuthenticationProperties.ExpiresUtc
```

This describes the current authentication result; it does not create a server-side session.

### S-018 — Cookie sign-in with explicit lifetime

```csharp
var props = new AuthenticationProperties
{
    IsPersistent = true,
    IssuedUtc = DateTimeOffset.UtcNow,
    ExpiresUtc = DateTimeOffset.UtcNow.AddHours(8)
};

await HttpContext.SignInAsync("Cookies", principal, props);
```

### S-019 — `ExpiresUtc`

`ExpiresUtc` means when the authentication ticket/session expires.

```csharp
properties.ExpiresUtc
```

Cookie authentication uses this heavily:

```text
ExpiresUtc controls ticket lifetime.
Sliding expiration compares IssuedUtc and ExpiresUtc.
An expired ticket fails authentication.
```

### S-020 — JWT `IssuedUtc`

The JWT handler derives the issue time from the validated token:

```text
token.ValidFrom
    ↓
AuthenticationProperties.IssuedUtc
```

After bearer authentication:

```csharp
var issued = result.Properties?.IssuedUtc;
```

### S-021 — `IssuedUtc`

`IssuedUtc` means when the ticket, session, or token was issued.

```csharp
properties.IssuedUtc
```

Cookie handlers may set it during sign-in when it is absent:

```text
SignInAsync
    ↓
if IssuedUtc missing:
    set IssuedUtc = current time
```

It is also used in sliding-expiration calculations.

### S-022 — AuthenticationProperties cheat sheet

`AuthenticationProperties` is a state bag for an authentication operation or session.

Important properties:

```text
AllowRefresh
ExpiresUtc
IssuedUtc
IsPersistent
Items
Parameters
RedirectUri
```

Stored authentication tokens are also associated with the properties through helper methods.

### S-023 — Manual authenticate

Cookie scheme:

```csharp
var result = await HttpContext.AuthenticateAsync("Cookies");

if (result.Succeeded)
{
    var principal = result.Principal;
    var properties = result.Properties;
    var ticket = result.Ticket;
}
```

Bearer scheme:

```csharp
var result = await HttpContext.AuthenticateAsync("Bearer");

if (result.Succeeded)
{
    var principal = result.Principal;
    var properties = result.Properties;
    var token = properties?.GetTokenValue("access_token");
}
```

### S-024 — JWT authenticate flow

```text
JwtBearerHandler
    reads bearer token
    validates token
    creates ClaimsPrincipal
    creates AuthenticationProperties
    creates AuthenticationTicket
    returns AuthenticateResult.Success(ticket)
```

JWT bearer does not normally persist that ticket by itself. The next request must send the bearer token again.

### S-025 — Where cookie tickets appear

On cookie authentication:

```text
CookieAuthenticationHandler
    reads cookie
    unprotects ticket
    optional ITicketStore retrieves real ticket
    validates ticket/principal
    returns AuthenticateResult.Success(ticket)
```

The ticket was originally created during sign-in:

```text
SignInAsync("Cookies", principal, properties)
    ↓
cookie handler creates AuthenticationTicket
    ↓
protects/stores ticket
    ↓
later request restores ticket
```

### S-026 — `AuthenticationScheme`

The scheme that produced the ticket is available as:

```csharp
ticket.AuthenticationScheme
```

Examples include:

```text
"Cookies"
"Bearer"
"oidc"
"AppAuth"
```

The same principal could theoretically be authenticated by different schemes, so the scheme is part of the ticket identity.

### S-027 — `AuthenticationTicket.Properties`

```csharp
ticket.Properties
```

Typical contents:

```text
IssuedUtc
ExpiresUtc
IsPersistent
AllowRefresh
RedirectUri
Items
Parameters
stored tokens
```

### S-028 — Reading the principal

```csharp
var userId = ticket.Principal.FindFirst("sub")?.Value;
var isAuthenticated = ticket.Principal.Identity?.IsAuthenticated;
```

### S-029 — `AuthenticationTicket.Principal`

```csharp
ticket.Principal
```

The principal contains:

```text
ClaimsPrincipal
    ClaimsIdentity
        claims
        authentication type
        name claim type
        role claim type
```

### S-030 — Constructor shape

```csharp
var ticket = new AuthenticationTicket(
    principal,
    properties,
    "Cookies");
```

or:

```csharp
var ticket = new AuthenticationTicket(
    principal,
    properties,
    "Bearer");
```

### S-031 — `RedirectUri` and JWT relevance

JWT bearer is API-oriented. A normal challenge usually returns:

```http
401 Unauthorized
WWW-Authenticate: Bearer
```

It does not normally redirect, so `RedirectUri` is usually not used by a JWT bearer challenge.

### S-032 — Passing `RedirectUri` to bearer challenge

```csharp
await HttpContext.ChallengeAsync(
    "Bearer",
    new AuthenticationProperties
    {
        RedirectUri = "/login"
    });
```

In normal JWT bearer behavior this does not mean “redirect to `/login`”. JWT bearer challenge is not a login redirect handler.

Mental model:

```text
Cookie/OIDC:
    RedirectUri can shape redirect behavior.

JWT bearer:
    Challenge is 401 + WWW-Authenticate, not redirect.
```

### S-033 — `AllowRefresh` and JWT relevance

Normal bearer flow:

```text
request has bearer token
    ↓
handler validates token
    ↓
returns current AuthenticateResult
```

The handler does not refresh the token, rewrite it, issue a new token, or maintain a session. Therefore setting `AllowRefresh` in JWT authentication properties does not cause the bearer handler to refresh anything.

```text
Cookie:
    AllowRefresh can matter for a refreshable session ticket.

JWT bearer:
    AllowRefresh normally has no practical effect during bearer validation.
```

### S-034 — `Parameters` and JWT relevance

The JWT bearer handler generally does not consume arbitrary parameters in its ordinary authenticate/challenge path.

You can pass them:

```csharp
await HttpContext.ChallengeAsync(
    "Bearer",
    new AuthenticationProperties
    {
        Parameters =
        {
            ["some_key"] = "some_value"
        }
    });
```

Unless the bearer handler or custom event code reads the key, it has no effect.

### S-035 — Reading custom parameters in an event

```csharp
options.Events.OnChallenge = context =>
{
    var value =
        context.Properties.GetParameter<string>("some_key");

    return Task.CompletedTask;
};
```

For JWT, `Parameters` is mainly useful when your own event code explicitly consumes it.

### S-036 — Ticket structure

```text
AuthenticationTicket
├── ClaimsPrincipal
│   ├── user id
│   ├── username
│   ├── roles
│   └── claims
├── AuthenticationProperties
│   ├── issued time
│   ├── expires time
│   ├── is persistent
│   └── allow refresh
└── scheme name
```

### S-037 — `HttpContext.User`

`HttpContext.User` has type `ClaimsPrincipal` and represents the current user.

```csharp
ClaimsPrincipal user = context.User;
```

### S-038 — `ClaimsPrincipal`

A principal is a user container and can contain multiple identities:

```text
ClaimsPrincipal
    Identity 1: cookie identity
    Identity 2: bearer identity
    Identity 3: custom identity
```

Important members:

```csharp
context.User.Identity
context.User.Identities
context.User.Claims
context.User.IsInRole("Admin")
context.User.FindFirst("sub")
context.User.HasClaim(...)
```

### S-039 — `ClaimsIdentity`

A `ClaimsIdentity` is one identity inside the principal. It contains:

```text
AuthenticationType
IsAuthenticated
NameClaimType
RoleClaimType
Claims
```

`context.User.Identity?.IsAuthenticated` comes from the selected/primary identity.

### S-040 — `IsAuthenticated`

For a `ClaimsIdentity`, `IsAuthenticated` is usually true when the identity has a non-empty `AuthenticationType`.

```csharp
var identity = new ClaimsIdentity(claims, "Cookies");
```

This identity is authenticated.

```csharp
var identity = new ClaimsIdentity(claims);
```

This identity is usually not authenticated.

### S-041 — Principal claims

`ClaimsPrincipal.Claims` returns claims across identities.

```csharp
var userId = context.User.FindFirst("sub")?.Value;
```

### S-042 — Multiple identities

If a policy authenticates both cookie and bearer schemes:

```csharp
[Authorize(AuthenticationSchemes = "Cookies,Bearer")]
```

authorization may merge identities:

```text
HttpContext.User
    ClaimsPrincipal
        ClaimsIdentity(authType: "Cookies")
        ClaimsIdentity(authType: "Bearer")
```

This is why `ClaimsPrincipal` is a larger abstraction than a single `ClaimsIdentity`.

### S-043 — AuthenticationTicket in JWT bearer

With JWT bearer, `AuthenticationTicket` is usually only a per-request framework object carrying:

- the authenticated `ClaimsPrincipal`;
- the scheme name;
- `AuthenticationProperties`;

through the authentication pipeline.

After JWT validation, the ticket enters:

```text
AuthenticateResult.Success(ticket)
    ↓
possibly HttpContext.User
    ↓
possibly IAuthenticateResultFeature
    ↓
authorization uses it
```

Unlike a cookie ticket, JWT bearer does not persist this ticket by default. The JWT itself is the persistent credential; the ticket is ASP.NET Core’s in-memory representation of “this request authenticated successfully”.

## Integrated study summary

- A ticket is the result package: principal + properties + scheme.
- `HttpContext.User` is the request principal, not the ticket.
- A principal can contain multiple identities.
- Cookie authentication persists/protects a ticket; bearer authentication reconstructs an in-memory result from each incoming JWT.
- `Items` is persistent ticket state; `Parameters` is transient operation input.
- `RedirectUri`, `IsPersistent`, and `AllowRefresh` are mainly meaningful for redirect/session handlers.
- `SaveToken` controls whether the incoming JWT is stored in the result properties.
