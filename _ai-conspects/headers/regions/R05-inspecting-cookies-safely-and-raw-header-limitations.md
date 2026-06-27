# R05 — Inspecting cookies safely and raw-header limitations

Generated: 2026-06-27 UTC

```text
Image uses: 6
SVG text nodes: 8
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region records the practical cookie-inspection boundary.

- Request cookies should normally be read through `HttpRequest.Cookies`, which applies the framework's cookie parsing.
- Response `Set-Cookie` values are separate header entries and should be parsed as `SetCookieHeaderValue` instances rather than split on commas.
- Commas can appear inside legal cookie attributes such as date values, so generic comma splitting corrupts the syntax.
- Typed parsing allows inspection of name/value, domain, path, expiration, `Max-Age`, `Secure`, `HttpOnly`, and `SameSite`.
- Raw header strings are useful for diagnostics but are not a safe substitute for typed parsing when code must make decisions.
- The screenshots distinguish browser cookie storage, the request `Cookie` header, and response `Set-Cookie`; these are related stages, not one interchangeable object.

## Covered image uses

S-098, S-100, S-103, S-108, S-109, S-110

## Covered SVG text nodes

T-068, T-069, T-071, T-073, T-074, T-077, T-079, T-081

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
