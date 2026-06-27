# Regional transcript — R01: Consent cookie creation, essential cookies and examples

Conspect: `usecookiepolicy`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 10 / 10
unique screenshots represented: 10
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Cookie policy can require user consent for non-essential cookies while allowing cookies marked essential.

## Consent requirement

- `CheckConsentNeeded` decides whether the current request requires consent before non-essential cookies may be appended.
- When consent is required and not granted, non-essential cookie writes can be suppressed by the policy.
- Essential cookies bypass the consent requirement because the application declares them necessary for core functionality.

## IsEssential

- Set `CookieOptions.IsEssential = true` only for cookies genuinely required for the requested service.
- Authentication, antiforgery or session cookies may be essential in a particular application, but the classification is a product/legal decision, not an automatic framework fact.

## Consent cookie

- The policy uses a configured consent-cookie name and value to remember the user's decision.
- The consent feature can create the consent cookie string or grant/withdraw consent through request APIs.
- The configured value must match the value used when the framework checks consent.

## Existing cookies

- Consent policy controls appending cookies for the current response; it does not automatically erase every non-essential cookie previously stored in the browser.
- Withdrawal flows should explicitly delete cookies that are no longer permitted.

## Caveats

- Cookie consent requirements depend on jurisdiction and product behavior.
- Marking every cookie essential defeats the purpose of consent policy.

## Nearby source labels

- examples
- CheckConsentNeeded
- IsEssential
- ConsentCookie
- ConsentCookieValue
- configured name
- configured value
- how to create consent cookie
- essential consent
- cookie
- existing non essential cookies

## Covered screenshot uses

```text
IU-016, IU-017, IU-018, IU-043, IU-044, IU-045, IU-046, IU-047, IU-048, IU-049
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
