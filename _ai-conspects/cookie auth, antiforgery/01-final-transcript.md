# Final transcript — cookie auth, antiforgery

Generated: 2026-06-27 UTC

## Full-source correction

The previous transcript was created from an incomplete text-only export. The corrected SVG contains 127 embedded screenshots and 135 physical SVG text nodes. Stage4 reprocessed the complete canvas and rewrote the semantic transcript from the screenshot evidence.

```text
Complete embedded assets: 127
Complete image uses: 127
Physical SVG text nodes: 135
Processed image uses: 127
Processed text nodes: 135
Missing: 0
Unreviewed: 0
```

## Reading order

1. [R02 — Cookie authentication basics and browser semantics](regions/R02-cookie-authentication-basics-and-browser-semantics.md)
2. [R03 — SPA antiforgery, authentication setup, and cookie policy](regions/R03-spa-antiforgery-and-cookie-policy.md)
3. [R04 — Cookie options, scope, secure prefixes, and ticket format](regions/R04-cookie-options-domain-path-prefixes-and-format.md)
4. [R05 — ITicketStore, principal validation, and claims renewal](regions/R05-ticket-store-principal-validation-and-claims-renewal.md)

## Consolidated model

Cookie authentication first recovers and validates an authentication ticket, then populates `HttpContext.User`; authorization evaluates the accepted principal afterward. Persistent browser-cookie behavior is controlled through sign-in properties and cookie attributes, while ticket validity, sliding renewal, and app-level principal validation remain server-side concerns.

For SPAs, HttpOnly auth cookies require deliberate SameSite/CORS/credentials configuration and CSRF protection. ASP.NET Core antiforgery uses a cookie token plus a request token returned to the client and sent in a header on unsafe requests.

Cookie scope is governed by name, host/domain, and path. `__Host-` and `__Secure-` names let the browser enforce security invariants. `TicketDataFormat` normally stays on the Data Protection-backed default.

`ITicketStore` moves ticket payloads server-side and leaves a key in the browser. Claims stored in an issued ticket remain a snapshot until the app re-signs the user or principal validation replaces the principal and requests renewal.

## Evidence

Exact source coordinates, hashes, extracted images, text nodes, region assignments, and closure state are preserved in `data/` and `source/images/`.
