# R03 — ASP.NET Core header abstractions, StringValues operations and common typed properties

Generated: 2026-06-27 UTC

```text
Image uses: 45
SVG text nodes: 42
Boundary review: verified
Transcript status: complete
```

## Semantic transcript

This region maps raw HTTP headers to ASP.NET Core APIs.

- `HttpRequest.Headers` and `HttpResponse.Headers` expose `IHeaderDictionary`. A header can have zero, one, or multiple values and is represented with `StringValues`.
- Indexer access is convenient but can hide absence/multiplicity. `TryGetValue` is the explicit presence check.
- `Add` requires the key not to exist; `Append` adds values; `AppendCommaSeparatedValues` and `GetCommaSeparatedValues` handle comma-list syntax; `SetCommaSeparatedValues` replaces the field with an encoded list.
- `TryAddWithoutValidation` bypasses normal value validation and must be reserved for cases where the caller already understands the wire syntax.
- `ContainsKey` and `Remove` operate on header names. Header names are case-insensitive even though values can have header-specific comparison rules.
- `HeaderNames` constants avoid spelling mistakes. Framework abstractions provide strongly named properties/helpers for common request headers such as `Accept`, `Authorization`, `Host`, `User-Agent`, `If-None-Match`, and `If-Modified-Since`.
- Common response headers include `ETag`, `Location`, `Retry-After`, `Content-Type`, `Content-Length`, `Content-Encoding`, `Cache-Control`, and `Set-Cookie`.
- The transcript keeps request and response applicability explicit. A name appearing in both directions does not imply identical semantics.
- Multiple header values are not universally interchangeable with one comma-joined string. `Set-Cookie` is the important counterexample and must remain separate field values.

## Covered image uses

S-049, S-050, S-051, S-053, S-054, S-055, S-056, S-057, S-058, S-059, S-060, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-073, S-074, S-075, S-076, S-077, S-078, S-079, S-080, S-081, S-082, S-083, S-084, S-085, S-086, S-087, S-088, S-089, S-090, S-091, S-092, S-093, S-094

## Covered SVG text nodes

T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-042, T-043, T-044, T-045, T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057, T-058, T-059, T-060, T-061, T-062, T-063

## Verification note

Every listed image use was visually reviewed in the Stage4 contact sheets. The SVG labels were used as navigation/context, not as a replacement for reading the embedded screenshots.
