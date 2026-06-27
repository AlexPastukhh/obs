# R02 — Expect, Referer, Authorization and WWW-Authenticate/realm

Generated: 2026-06-27 UTC

```text
Image uses: 34
SVG text nodes: 13
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region covers protocol headers with special browser/server behavior.

- `Expect: 100-continue` lets a client ask the server to acknowledge request headers before sending a potentially large body. Browser script generally cannot freely control every forbidden/special request header.
- `Referer` carries the referring URL according to referrer policy and browser privacy rules. Its spelling is historical; applications should not assume it is always present or complete.
- `Authorization` carries credentials for an authentication scheme, commonly `Basic` or `Bearer`. It is distinct from cookie authentication even though both can authenticate a request.
- Basic credentials are an encoded user/password token, not encryption. They require transport protection and careful credential handling.
- Bearer tokens grant access to whoever possesses the token; storage, transport, expiration, and scope are therefore critical.
- `WWW-Authenticate` is a response challenge. A `401` response can include one or more challenges identifying accepted schemes and parameters.
- `realm` describes the protection space for applicable schemes. It is challenge metadata, not an application role and not authorization by itself.
- Authentication headers participate in caching, redirects, CORS/preflight, and proxy behavior; the screenshots emphasize that request and response sides have different responsibilities.

## Covered image uses

S-001, S-002, S-003, S-004, S-005, S-006, S-008, S-009, S-010, S-012, S-013, S-015, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024, S-025, S-027, S-028, S-029, S-030, S-031, S-035, S-036, S-040, S-041, S-042, S-045, S-046, S-048

## Covered SVG text nodes

T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-012, T-013, T-014, T-015

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
