# Knowledge Migration Registry

**Workspace:** cache control headers and response caching

**Source of Truth:** `11-corrected-code-preserving-transcript-v002.md` (M01-M10 sections)

**Total Images:** 91 unique screenshots (complete coverage)

---

## Learning Claims Mapping

### MAPPED to aspnet-core.cache-control-headers-responsecache-attribute-and-middleware

| Source Claim Group | Knowledge ID | Topic | Destination File | Mapping |
|---|---|---|---|---|
| Only one ResponseCacheAttribute per method; multiple attributes invalid | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |
| Global MVC safety filter with NoStore and Location.None semantics | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |
| Conditional caching middleware: run next() then apply policy | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |
| VaryByHeader in ResponseCache attribute and manual Response.Headers.Vary in ASP.NET | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |
| Configuration matrix: filter, profile, attribute, middleware, application cache choice | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |
| When server caching useful vs unnecessary in ASP.NET context | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |
| ASP.NET critical corrections: multiple attributes forbidden, Location.None is no-cache not no-store | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |
| ASP.NET practical recipes with ResponseCache examples | aspnet-core.cache-control-headers-responsecache-attribute-and-middleware | aspnet-core | cache-control-headers-responsecache-attribute-and-middleware.md | MAPPED |

### MERGED to existing units

| Source Claim Group | Knowledge ID | Topic | Destination File | Mapping |
|---|---|---|---|---|
| ResponseCacheAttribute as MVC filter that sets headers, does not store | aspnet-core.response-and-output-caching-policies | aspnet-core | response-and-output-caching-policies.md | MERGED |
| AddResponseCaching and UseResponseCaching middleware registration | aspnet-core.response-and-output-caching-policies | aspnet-core | response-and-output-caching-policies.md | MERGED |
| Named cache profiles for duration/location/vary reuse | aspnet-core.response-and-output-caching-policies | aspnet-core | response-and-output-caching-policies.md | MERGED |
| HTTP caching mental model: storage, audience, freshness, validation, representation dimensions | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| Cache-Control response directives: no-store, no-cache, public, private, max-age, s-maxage, must-revalidate, proxy-revalidate, stale-while-revalidate, etc. | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| Cache-Control request directives: max-age, max-stale, min-fresh, no-cache, no-store, only-if-cached | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| max-age freshness flow and stale behavior | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| no-cache plus ETag revalidation flow with If-None-Match to 304 | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| must-revalidate stale-cannot-serve semantics | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| no-store forbids all storage for tokens, PII, secrets | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| s-maxage override for shared-cache lifetime | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| Authentication, cookies, personalization: shared-cache danger | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| Private vs shared caching policy semantics | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| Vary header declaration of representation dimensions | http.vary-representation-cache-keys | http | vary-representation-cache-keys.md | MERGED |
| Missing Vary destroys correctness: wrong format, language, tenant | http.vary-representation-cache-keys | http | vary-representation-cache-keys.md | MERGED |
| immutable directive for fingerprinted assets | http.cache-validation-headers | http | cache-validation-headers.md | MERGED |
| Workspace processing metadata and source audit | N/A | N/A | N/A | NON_LEARNING |

---

## Coverage Summary

| State | Count |
|---|---|
| MAPPED | 8 |
| MERGED | 16 |
| NON_LEARNING | 1 |
| **Total** | **25** |

---

## Boundary Decisions

This workspace contains two categories of content:

1. **ASP.NET Core-specific depth (MAPPED)**: ResponseCacheAttribute limitations (single-instance rule), dangerous Location.None semantics, advanced patterns (global filters, conditional middleware), ASP.NET Vary usage with examples, configuration decision matrix, and practical ASP.NET recipes. These represent the new contributions of this workspace.

2. **Foundational ResponseCache mechanics (MERGED)**: ResponseCacheAttribute as filter, named profiles, Response Caching middleware registration are already covered in `aspnet-core.response-and-output-caching-policies`. That unit is authoritative for these baseline concepts.

3. **Generic HTTP cache semantics (MERGED)**: Cache-Control directives, freshness/expiration flows, validation flows, Vary correctness, authentication safety, and immutable directive are comprehensively covered in existing HTTP-level units (`http.cache-validation-headers` and `http.vary-representation-cache-keys`).

The new unit provides ASP.NET-specific depth and examples, without duplicating foundational HTTP cache protocol knowledge or basic ResponseCache mechanics already present in response-and-output-caching-policies.

---

## Related Existing Knowledge

- `http.cache-validation-headers` — HTTP Cache-Control, freshness, validation, ETags, revalidation flows
- `http.vary-representation-cache-keys` — Vary header and cache-key variant selection
- `aspnet-core.response-and-output-caching-policies` — ResponseCache vs OutputCache comparison, policy builders
- `aspnet-core.output-cache-safety-value-and-locking` — OutputCache thread safety
- `aspnet-core.output-cache-admission-and-policy-lifecycle` — OutputCache admission and lookup
