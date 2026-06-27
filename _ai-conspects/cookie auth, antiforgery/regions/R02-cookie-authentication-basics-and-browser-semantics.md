# R02 — Cookie authentication basics and browser semantics

## Coverage

```text
Image uses: S-001–S-023 (23)
SVG text nodes assigned to region: 20
Status: visually and semantically verified
```

## Authentication, `HttpContext.User`, and authorization

A request gets an authenticated `ClaimsPrincipal` when the authentication handler successfully reads a valid authentication ticket. The `[Authorize]` attribute does not create claims or populate `HttpContext.User`; it consumes the authentication result and checks whether the established user satisfies endpoint policy, role, or claim requirements.

With cookie authentication, the ticket normally comes either from the protected value inside the cookie or, when `ITicketStore` is configured, from server-side storage addressed by a key contained in the cookie. The practical sequence is: read cookie → recover ticket → reconstruct principal → populate `HttpContext.User` → perform authorization.

## Persistence and expiration

`AuthenticationProperties.IsPersistent` controls whether the handler emits a persistent browser cookie. A non-persistent sign-in normally produces a session cookie without `Expires`; a persistent sign-in produces `Expires` and/or equivalent max-age behavior. The expiry can be supplied explicitly through `AuthenticationProperties.ExpiresUtc` or derived from handler options such as `ExpireTimeSpan`.

`IsPersistent` is not an independent server flag stored elsewhere; it affects the `Set-Cookie` attributes. Ticket validity is still checked during authentication, including ticket expiration and scheme/application compatibility.

## Redirect paths and failure behavior

`LoginPath`, `LogoutPath`, `AccessDeniedPath`, and `ReturnUrlParameter` are handler routing conventions:

- challenge of an unauthenticated user typically redirects to `LoginPath`;
- forbid of an authenticated but unauthorized user typically redirects to `AccessDeniedPath`;
- `ReturnUrlParameter` carries the original local target.

If the configured path does not exist, the redirect target returns 404. The remedies are to create the endpoint, configure a real path, or override redirect events and return 401/403 for APIs.

## Ticket protection and validity layers

The low-level flow is: sign-in builds an `AuthenticationTicket`; `TicketDataFormat` serializes and protects it with Data Protection; the protected value becomes the cookie; later `UseAuthentication` unprotects it, checks expiry and other rules, deserializes the ticket, and sets the principal.

Cryptographic validity is necessary but not sufficient for business validity. A cookie can unprotect successfully and still be rejected because the ticket expired, the scheme or application name changed, key material is incompatible, custom principal validation fails, or renewal/expiration rules reject it.

## SameSite, SPA, proxies, and CORS

`SameSite=Lax` is usually suitable for traditional MVC/Razor applications and same-site navigation or form posts. It becomes problematic when the SPA and API are genuinely cross-site, for iframe scenarios, or for some external redirect and POST-based identity flows. Cross-site cookie use usually requires `SameSite=None` together with `Secure`.

Same-site is not identical to same-origin. A development proxy can make a React request appear same-origin to the browser even when the proxy forwards internally to another backend. In that case `credentials: "include"` and Lax cookies can work because browser-visible origin/site semantics govern cookie sending.

## Auth cookies versus session cookies

There is no special visual browser-cookie type named “authentication cookie.” In DevTools both have ordinary cookie fields. The difference is the server-side contract:

- a normal ASP.NET Core auth cookie often contains a long opaque protected ticket;
- a session cookie commonly contains a short opaque session ID whose state lives in a distributed cache or store.

Names, values, and sizes are conventions, not proof of semantics.

## Source-preserving side note

S-012 is an unrelated cache/Redis note present on the canvas. It states that a shared `ConnectionMultiplexer` should be reused and that `IDatabase` is a lightweight surface over that connection manager. It is retained and closed in the ledger rather than silently discarded.
