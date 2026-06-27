# R01 — Location, Origin, exposed response headers and cross-origin visibility

Generated: 2026-06-27 UTC

```text
Image uses: 15
SVG text nodes: 8
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region covers navigation/location and cross-origin response visibility.

- `Location` is used by redirects and can also accompany resource-creation responses such as `201 Created`.
- Redirect status and method semantics matter; clients may follow redirects differently depending on the status code and request method.
- The `Origin` request header identifies the requesting origin in CORS-relevant requests. It is produced by the user agent and is not equivalent to an arbitrary application-controlled custom header.
- Cross-origin JavaScript cannot read every response header by default. Only CORS-safelisted response headers are exposed unless the server names additional headers through `Access-Control-Expose-Headers`.
- Headers such as `Expires` and `Pragma` may be present in the response but still require correct CORS exposure before browser JavaScript can inspect them cross-origin.
- Browser developer tools may display headers that page JavaScript is not permitted to read; observability in devtools is not proof of script access.
- The screenshots distinguish response headers, request headers, redirect targets, and CORS policy instead of treating “the browser can see it” as one capability.

## Covered image uses

S-007, S-011, S-014, S-016, S-026, S-032, S-033, S-034, S-037, S-038, S-039, S-043, S-044, S-047, S-052

## Covered SVG text nodes

T-010, T-011, T-016, T-017, T-018, T-019, T-020, T-021

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
