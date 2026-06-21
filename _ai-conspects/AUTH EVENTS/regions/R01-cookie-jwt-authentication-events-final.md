# R01 — Cookie and JWT authentication events and API endpoint metadata final coverage transcript v001

Conspect: `AUTH EVENTS`  
Source: `AUTH EVENTS.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

A map of CookieAuthenticationEvents and JwtBearerEvents, their context objects, where responses may be customized, and how known API endpoint metadata affects API-oriented authentication behavior.

Reading quality: verified. The whole sheet is a single coherent region; all 6 image uses and 38 SVG text labels were reviewed against preserved source evidence.

## 1. Cookie authentication events

The cookie handler exposes lifecycle events around sign-in, validation, sign-out, redirects, and sliding expiration.

- `OnSigningIn` — before the ticket/cookie is issued; inspect or adjust sign-in properties and principal through the signing-in context.
- `OnSignedIn` — after sign-in completes.
- `OnValidatePrincipal` — validate an existing cookie principal; reject stale identities, replace the principal, and request renewal when claims/security-stamp state changes.
- `OnSigningOut` — before the cookie is removed.
- `OnRedirectToLogin` — challenge behavior, normally a login redirect.
- `OnRedirectToAccessDenied` — forbid behavior, normally an access-denied redirect.
- `OnRedirectToLogout` / `OnRedirectToReturnUrl` — logout and post-logout navigation hooks.
- `OnCheckSlidingExpiration` — decide whether the ticket should be renewed when sliding expiration is enabled.

Redirect events use a cookie redirect context carrying the HTTP context, options, properties, and redirect URI. They are suitable places to preserve redirects for pages but write `401`/`403` ProblemDetails for APIs.

## 2. JWT bearer events

The JWT bearer handler exposes:

- `OnMessageReceived` with `MessageReceivedContext` — obtain or override the token source, commonly for query-string tokens in controlled SignalR scenarios.
- `OnTokenValidated` with `TokenValidatedContext` — run application checks after cryptographic/token validation succeeds.
- `OnAuthenticationFailed` with `AuthenticationFailedContext` — observe failures and optionally customize failure output/logging.
- `OnChallenge` with `JwtBearerChallengeContext` — customize the `401` challenge response. If the event writes the response, mark it handled so the default challenge is not written afterward.
- `OnForbidden` with `ForbiddenContext` — customize the `403` response for an authenticated principal that lacks permission.

Authentication failure, challenge, and forbidden are different stages. Avoid exposing exception details in production responses.

## 3. Writing API responses

Challenge/forbid redirect or bearer events are possible locations for a configured `IProblemDetailsService`. Set the correct status code before writing and ensure only one component owns the body.

For cookie authentication:

- challenge for an API → `401` instead of login HTML/redirect;
- forbid for an API → `403` instead of access-denied redirect;
- interactive endpoints may keep browser redirects.

For JWT bearer, `OnChallenge` and `OnForbidden` are the corresponding hooks.

## 4. Known API endpoints and metadata

The sheet notes the framework concept of a “known API endpoint”: an endpoint carrying `IApiEndpointMetadata`. It is a concrete metadata marker, not merely an arbitrary label.

Examples shown as recognized API-style endpoints include:

- `[ApiController]` controller endpoints;
- minimal APIs that read JSON or write JSON;
- minimal endpoints returning `TypedResults`;
- SignalR endpoints.

Endpoint metadata can be queried through `HttpContext.GetEndpoint()?.Metadata`. Framework behavior varies by target framework version, so custom applications should still make API/page intent explicit when supporting multiple versions or custom endpoint styles.

## 5. Practical map

```text
Cookie sign-in lifecycle:
OnSigningIn → cookie creation → OnSignedIn

Cookie request lifecycle:
cookie read → OnValidatePrincipal → authorization

Cookie failures:
challenge → OnRedirectToLogin
forbid    → OnRedirectToAccessDenied

JWT lifecycle:
OnMessageReceived → token validation → OnTokenValidated
                                  ↘ OnAuthenticationFailed
challenge → OnChallenge
forbid    → OnForbidden
```

Use events for authentication-handler concerns. Keep resource-specific authorization decisions in authorization handlers/policies rather than embedding them in token or cookie events.

## 6. Coverage

```text
R01 processed image uses: 6
R01 processed text labels: 38
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
