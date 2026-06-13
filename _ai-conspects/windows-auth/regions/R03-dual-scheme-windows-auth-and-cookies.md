# R03 - Dual scheme Windows Auth + cookies/client auth

Generated: 2026-06-13 05:49:12 UTC

Image uses: 7

```text
S-026, S-025, S-024, S-023, S-022, S-021, S-040
```

## Core idea

Some applications need two authentication stories at the same time.

Typical split:

```text
employees/internal users -> Windows Authentication
external clients/users -> cookie auth, JWT bearer, OIDC, or another app-managed scheme
```

This is not the same as “Windows Auth plus login page automatically”. Windows Auth is a server/browser/domain challenge flow. Cookie auth is an application-issued session after a login flow.

## Why multiple schemes are tricky

When an app has one authentication scheme, defaults are easy.

With multiple schemes, the framework must know:

```text
which scheme authenticates the request
which scheme challenges unauthenticated users
which scheme signs in users
which endpoints require which scheme
```

If this is not explicit, the wrong scheme can run.

Examples of wrong behavior:

```text
an API endpoint returns an HTML login page instead of 401
a Windows-only endpoint redirects to a cookie login screen
an external-client endpoint triggers a browser Windows Auth prompt
a policy accepts the wrong identity source
```

## Scheme selection

A clean design is to name the schemes and select them intentionally.

Conceptual examples:

```text
Windows scheme:
Negotiate

Cookie/client scheme:
Cookies
Bearer
OpenID Connect
```

Endpoint requirements can then be explicit:

```csharp
[Authorize(AuthenticationSchemes = NegotiateDefaults.AuthenticationScheme)]
public IActionResult EmployeeOnly() => Ok();

[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
public IActionResult ClientArea() => Ok();
```

The exact scheme names depend on registration.

## Policy-based separation

Instead of putting scheme strings everywhere, policies can express the separation.

Conceptually:

```text
EmployeePolicy -> require Windows Auth / domain identity / maybe AD group
ClientPolicy   -> require cookie or token identity
```

Then endpoints use:

```csharp
[Authorize(Policy = "EmployeePolicy")]
```

This is easier to maintain when many controllers/actions follow the same rule.

## Default scheme caution

When adding multiple schemes, be careful with the default scheme.

A default is convenient, but it can hide mistakes.

For example:

```text
DefaultAuthenticateScheme = Cookies
```

may mean cookie auth fills `HttpContext.User` unless Windows Auth is explicitly requested.

For employee-only endpoints, you usually want the Windows scheme to run or to be selected through a policy.

## Challenge behavior

Authentication failure can produce different client behavior depending on the scheme.

```text
Windows/Negotiate challenge:
browser may silently send credentials or show a login prompt.

Cookie challenge:
browser is usually redirected to a login page.

Bearer/API challenge:
client usually receives 401 with WWW-Authenticate: Bearer.
```

This is why API endpoints and browser pages often need different scheme/challenge choices.

## Recommended mental model

Treat Windows Auth and cookie/client auth as different identity entrances.

```text
Windows Auth entrance:
trusted internal domain identity

Cookie/client entrance:
application or external identity-provider identity
```

Then decide per endpoint:

```text
which entrance is valid here?
what claims/groups/roles are required?
what should happen when unauthenticated?
```

## Boundary note

R03 is about scheme composition and endpoint/policy selection.

R04 covers deployment realities: SPN, app pool identity, browser prompts, 401 loops, claims/whoami diagnostics.
