# R04 — Typed headers, CookieHeaderValue, SetCookieHeaderValue and comparers

Generated: 2026-06-27 UTC

```text
Image uses: 10
SVG text nodes: 10
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region covers typed header models.

- `GetTypedHeaders()` on request/response provides parsed models for headers whose syntax is richer than a raw string.
- `CookieHeaderValue` represents request `Cookie` data; `SetCookieHeaderValue` represents one response `Set-Cookie` value. They are different protocols and should not be substituted for each other.
- Typed values expose structured properties and formatting/parsing rules, reducing ad-hoc string manipulation.
- `HeaderNames` still supplies standard names when raw dictionary access is required.
- Media-type and quality-value comparers support negotiated values and wildcard matching. They compare header semantics, not arbitrary strings.
- Typed models are especially useful at infrastructure boundaries; everyday application code should still avoid parsing or rewriting headers it does not own.
- Converting back to raw strings must preserve the header's grammar, quoting, separators, and multiplicity.

## Covered image uses

S-095, S-096, S-097, S-099, S-101, S-102, S-104, S-105, S-106, S-107

## Covered SVG text nodes

T-064, T-065, T-066, T-067, T-070, T-072, T-075, T-076, T-078, T-080

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
