# Knowledge Registry

Source workspace: `_ai-conspects/cookie auth, antiforgery/`

Authoritative processed source: `regions/R02-cookie-authentication-basics-and-browser-semantics.md` through `regions/R05-ticket-store-principal-validation-and-claims-renewal.md`

Original SVG: `source/cookie auth, antiforgery.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R02 cookie/ticket/store-to-principal flow, authentication-before-authorization and auth-cookie/session-cookie representation | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MAPPED |
| R02 `IsPersistent`, session/persistent expiry, `ExpiresUtc`/`ExpireTimeSpan`, redirect paths, missing-path 404 and API overrides | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MAPPED |
| R02/R04 ticket protection, cryptographic-versus-business validity, default/custom `TicketDataFormat`, shared Data Protection and forwarding boundary | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MAPPED |
| R02 SameSite Lax/None/Secure, cross-site SPA and browser-visible proxy/CORS credential behavior | `http.browser-cookie-delivery-and-security` | `http` | `../_knowledge/http/browser-cookie-delivery-and-security.md` | MERGED |
| R02/R04 proxy host reasoning, Domain/Path/name collisions and browser-enforced `__Host-`/`__Secure-` invariants | `http.cookie-scope-and-secure-prefixes` | `http` | `../_knowledge/http/cookie-scope-and-secure-prefixes.md` | MAPPED |
| R03 claims/login/logout/local-returnUrl flow, multiple schemes, middleware order and authentication-versus-authorization | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MAPPED |
| R03 two-token antiforgery flow, non-interchangeable pair, SPA in-memory transport, cross-tab/session refresh and CSRF/XSS boundary | `aspnet-core.antiforgery-token-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/antiforgery-token-lifecycle.md` | MERGED |
| R03 `UseCookiePolicy` ordering, global attribute/consent adjustment, manual `CookieOptions` and producer-policy distinction | `aspnet-core.cookie-policy-consent-and-defaults` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-policy-consent-and-defaults.md` | MERGED |
| R05 server-side key-cookie model, protected distributed storage, TTL, Store/Renew/Retrieve/Remove and corruption behavior | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MAPPED |
| R05 `OnValidatePrincipal`, per-request lookup cost, security-version strategies, `ReplacePrincipal`/`ShouldRenew`, explicit sign-in and current-request transformation | `aspnet-core.cookie-authentication-ticket-and-principal-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/cookie-authentication-ticket-and-principal-lifecycle.md` | MAPPED |
| S-012 unrelated Redis `ConnectionMultiplexer`/lightweight `IDatabase` side note | `redis.connection-and-data-structures` | `redis` | `../_knowledge/redis/connection-and-data-structures.md` | MERGED |
| Coverage counts, image/text assignments and reconciliation mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- Authentication ticket creation, server-side storage, validation and renewal are one lifecycle despite spanning R02, R04 and R05.
- Browser host/path/prefix enforcement is protocol knowledge, separate from ASP.NET Core ticket handling.
- The verified antiforgery and Cookie Policy claims extend existing focused units rather than duplicating them.
- The unrelated Redis note is explicitly retained through the pre-existing Redis unit.

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 4 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
