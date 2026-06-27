# Full combined final transcript — usecookiepolicy

Generated: 2026-06-27 08:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 42 / 42
unique embedded screenshots: 49 / 49
screenshot uses on canvas: 49 / 49
repeated screenshot placements retained: 0
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 Middleware role

`UseCookiePolicy` applies global cookie policy to cookie append and delete
operations performed later in the response pipeline. Place it before components
whose cookies must be governed.

The policy can:

- require consent for non-essential cookies;
- apply global SameSite, Secure and HttpOnly rules;
- configure the consent cookie;
- inspect or modify append/delete operations through callbacks.

## 03 Consent and essential cookies

`CheckConsentNeeded` decides whether the request requires consent.
When consent is required but not granted, non-essential cookie appends can be
suppressed.

`CookieOptions.IsEssential` marks a cookie as necessary for the service and
allows it despite the consent gate. This classification should reflect the
actual product and legal requirement.

The policy uses a configured consent-cookie name and consent value. Grant,
check and withdrawal flows must use the same configuration.

Consent policy does not automatically delete all non-essential cookies that
already exist in the browser. Withdrawal should explicitly delete cookies that
are no longer permitted.

## 04 Global policy options

`MinimumSameSitePolicy` can raise effective SameSite behavior according to the
framework policy matrix.

Global Secure and HttpOnly policies can normalize cookies, but they apply
broadly and can break protocol-specific cookies when chosen blindly.

`ConsentCookie` configures the cookie that stores the user's consent decision.
`ConsentCookieValue` is the marker recognized as consent.

Global policy should be conservative because it can affect authentication,
session, antiforgery and application cookies.

## 05 OnAppendCookie

`OnAppendCookie` receives the cookie name, value, request context and mutable
`CookieOptions`.

It can:

- enforce a global invariant;
- adjust Secure, HttpOnly, SameSite, path or domain;
- suppress an append;
- apply request-dependent compatibility behavior.

Prefer configuring a cookie where it is created when only that cookie needs a
special rule. Use the callback for genuinely global or otherwise inaccessible
cookie producers.

## 06 Cookie deletion and OnDeleteCookie

Deleting a cookie means sending an expired Set-Cookie header. Browsers identify
cookies by name, path and domain, so delete options must match the original
cookie.

`OnDeleteCookie` can normalize the expired cookie's options before it is sent.
A poorly designed global callback can change path/domain and fail to delete the
original cookie.

Append and delete policy should be symmetrical. A shared options factory is
often safer than duplicating name-based callback branches.

Deleting the browser cookie may not revoke a server-side session or token; that
lifecycle must be handled separately.

## 07 Callback versus static configuration

Prefer dedicated authentication/session options and reusable local
`CookieOptions` factories.

Use global callbacks for:

- a uniform organization-wide invariant;
- request-dependent behavior unavailable at startup;
- compatibility with components that do not expose adequate options.

Keep callbacks small, deterministic and tested. Verify consent suppression,
essential-cookie behavior, delete path/domain matching and cross-site
authentication scenarios when SameSite is modified.

## Regional source map

### R01 — Consent cookie creation, essential cookies and examples

Coverage: `10` screenshot uses, `10` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `03-transcript-R01-consent-cookie-essential-cookies-and-examples.md`.

### R02 — CookiePolicyOptions, consent and global settings

Coverage: `16` screenshot uses, `16` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `04-transcript-R02-cookiepolicyoptions-consent-and-global-settings.md`.

### R03 — OnAppendCookie, security defaults and normalization

Coverage: `12` screenshot uses, `12` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `05-transcript-R03-onappendcookie-security-defaults-and-normalization.md`.

### R04 — OnDeleteCookie, deletion semantics and global callback issues

Coverage: `8` screenshot uses, `8` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `06-transcript-R04-ondeletecookie-deletion-semantics-and-global-callbacks.md`.

### R05 — Callback patterns, static configuration and exceptional use cases

Coverage: `3` screenshot uses, `3` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `07-transcript-R05-callback-patterns-static-configuration-and-use-cases.md`.

## Exactness note

This document is the authoritative integrated semantic transcript. The complete
SVG and recovered screenshots remain authoritative for exact punctuation,
version-specific API signatures and code spelling.
