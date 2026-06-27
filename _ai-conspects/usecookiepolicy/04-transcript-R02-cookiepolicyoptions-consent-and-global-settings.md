# Regional transcript — R02: CookiePolicyOptions, consent and global settings

Conspect: `usecookiepolicy`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 16 / 16
unique screenshots represented: 16
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`UseCookiePolicy` applies global cookie-policy decisions and callbacks to cookies appended or deleted later in the response pipeline.

## Middleware position

- Place cookie policy before middleware/components whose cookie operations must be governed.
- Cookie operations performed before the policy middleware cannot be retroactively changed.

## Options

- `CheckConsentNeeded` evaluates per request.
- `MinimumSameSitePolicy` can raise the effective SameSite level according to the framework's policy matrix.
- Global secure and HttpOnly policies can influence appended cookies.
- `ConsentCookie` configures the consent cookie's name, path and related options.

## Consent value

- `ConsentCookieValue` defines the stored marker recognized as granted consent.
- Custom names and values must be configured consistently across grant, check and withdrawal paths.

## Global scope

- Policy options affect cookies produced through the ASP.NET Core response cookie APIs after the middleware runs.
- Global settings should be conservative because they apply to framework and application cookies alike.

## Caveats

- SameSite behavior interacts with cross-site authentication flows and browser rules.
- A global policy can break a cookie whose protocol requires a different setting.

## Nearby source labels

- CheckConsentNeeded
- usecookiepolicy
- MinimumSameSitePolicy
- ---All options cheat sheet---
- HttpOnly
- Secure
- ConsentCookie
- !!!
- ConsentCookieValue
- OnAppendCookie
- OnDeleteCookie
- What is cookie deletion
- consent
- IsEssential

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-013, IU-014, IU-015
IU-019, IU-020, IU-021
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
