# R03 — SPA antiforgery, authentication setup, and cookie policy

## Coverage

```text
Image uses: S-024–S-051 (28)
SVG text nodes assigned to region: 68
Status: visually and semantically verified
```

## Cookie authentication for a SPA

Cookies can be a good authentication mechanism for a React/ASP.NET Core application when the browser and API are same-site or CORS and cookie settings are configured deliberately. HttpOnly cookies reduce token theft through JavaScript, but automatic browser attachment means state-changing requests require CSRF protection.

The canvas distinguishes authentication from authorization:

- authentication establishes `ClaimsPrincipal` and `HttpContext.User`;
- authorization evaluates policies, roles, and claims after authentication.

A conventional setup registers cookie authentication, configures login/access-denied paths and cookie name, registers authorization policies, and orders middleware as routing → cookie policy when used → authentication → authorization → endpoints.

## Basic login/logout flow

The preserved controller example validates antiforgery on POST login/logout, checks credentials, builds claims and a `ClaimsIdentity`, calls `SignInAsync`, accepts only a local `returnUrl`, and calls `SignOutAsync` on logout. Endpoint examples demonstrate `[Authorize]`, policy requirements, and role requirements.

Multiple authentication schemes can coexist. Policies can explicitly select the cookie scheme for browser endpoints and bearer/JWT for API endpoints.

## Two-token antiforgery model

The SPA flow uses a cookie token plus a request token:

1. the server calls `IAntiforgery.GetAndStoreTokens(HttpContext)`;
2. ASP.NET Core sets the antiforgery cookie when needed;
3. an endpoint returns the request token string to React;
4. React stores that token in memory;
5. unsafe requests send it in a configured header such as `X-CSRF-TOKEN`;
6. the browser automatically sends the antiforgery cookie;
7. the server validates that the request token corresponds to the cookie token and applicable identity.

The request token and cookie token are related but not identical. Sending the cookie token itself in the header is not the intended protocol.

`AutoValidateAntiforgeryToken` or the equivalent global filter validates unsafe methods while generally excluding GET/HEAD/OPTIONS/TRACE. A protected API action fails before action execution when the token pair is absent or invalid.

## React client behavior

The token endpoint is fetched with `credentials: "include"`. React then sends both the auth/antiforgery cookies and the request-token header on unsafe requests. A practical client caches the request token in process memory or a non-persisted React Query store, refreshes it after login or when the server rejects it, and avoids localStorage/sessionStorage unless there is a strong reason because persistent browser storage increases exposure under XSS.

## Why both halves matter

The header alone does not prove same-site origin: an attacker could cause a victim browser to submit a request, but normally cannot read the request token from the trusted origin. The cookie is the second half of the binding. Validation checks the cookie/request-token pair rather than accepting an arbitrary header value.

## `UseCookiePolicy` and manually appended cookies

`UseCookiePolicy` is a separate middleware layer that can inspect or modify cookies as they are appended or deleted. It can enforce minimum SameSite behavior, Secure/HttpOnly policy, or consent requirements. It does not inherit `AddCookie` settings; it can override or adjust cookies at write time and must be placed before components that issue cookies.

For `Response.Cookies.Append`, `CookieOptions` exposes path, domain, HttpOnly, boolean Secure, SameSite, Expires/MaxAge, IsEssential, and less-common extension/priority settings. The canvas maps these to cookie-auth options and highlights that `CookieSecurePolicy` is an authentication option while `CookieOptions.Secure` is a boolean.
