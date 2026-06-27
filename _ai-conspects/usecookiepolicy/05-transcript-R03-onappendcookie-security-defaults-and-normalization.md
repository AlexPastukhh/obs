# Regional transcript — R03: OnAppendCookie, security defaults and normalization

Conspect: `usecookiepolicy`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`OnAppendCookie` can inspect and modify each cookie immediately before it is appended, making it suitable for narrowly scoped normalization.

## Callback data

- The callback receives the context, cookie name, value and mutable `CookieOptions`.
- It can enforce a secure flag, HttpOnly or SameSite rule based on the cookie and request.
- It can also suppress the append operation when an application-specific rule requires it.

## Security defaults

- HTTPS applications commonly enforce secure cookies.
- HttpOnly should be enabled for cookies that JavaScript does not need to read.
- SameSite must be selected according to the actual navigation or authentication protocol.

## Prefer local configuration

- When one cookie has special requirements, configure that cookie where it is created.
- Use the global callback for a uniform invariant or legacy integration that cannot be configured locally.
- A helper that constructs standard `CookieOptions` is easier to test than many name-based callback branches.

## Deletion relationship

- Appending and deleting must use compatible path and domain options.
- A global append callback does not automatically normalize deletion unless the delete callback applies matching rules.

## Caveats

- Do not blindly force `SameSite=Strict` on external sign-in or cross-site protocols.
- Mutating every cookie by name string is brittle when multiple components own cookies.

## Nearby source labels

- OnAppendCookie
- When does deltetion occur
- What is cookie deletion
- usecookiepolicy
- CheckConsentNeeded
- plain
- Response.Cookies.Delete
- on deleted cookies
- force some security defaults
- for both onappend and ondelete

## Covered screenshot uses

```text
IU-011, IU-012, IU-022, IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-032, IU-035
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
