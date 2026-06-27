# Cache-Control, response caching, and ETag flows — semantic transcript v001

Generated: 2026-06-27 UTC

## Source policy

This is a new conspect created from the uploaded complete SVG. Embedded screenshots are the primary source. Canvas placement, nearby labels, and vector paths were treated only as navigation hints. Every screenshot placement was visually reviewed.

## R01 — HTTP cache model and interaction of request and response Cache-Control

HTTP caching is a transaction between a client, one or more caches, and the origin. Request `Cache-Control` expresses what the client is willing to accept for the current request; response `Cache-Control` describes how the returned representation may be stored and reused. The two sets are combined and the stricter applicable behavior wins for that exchange. Browser-generated `max-age=0`, `no-cache`, or reload directives can force a browser/proxy-style cache to revalidate even when the server response would otherwise still be fresh.

**Reviewed image uses:** S-001, S-002, S-003, S-013, S-023, S-025, S-032, S-038, S-044, S-051, S-061

**Assigned SVG text nodes:** T-001, T-017, T-018, T-019, T-020, T-021

### Image-level evidence

- **S-001:** Browser-generated request Cache-Control max-age=0 versus application-generated request headers.
- **S-002:** Client request directives: max-age, max-stale, min-fresh, no-cache, no-store, and only-if-cached.
- **S-003:** Overview of Cache-Control on requests and responses across private and shared caches.
- **S-013:** Distinction between request Cache-Control and response Cache-Control.
- **S-023:** Combined request and response directives use the stricter effective rule.
- **S-025:** Client no-cache can force validation even when the response advertises max-age.
- **S-032:** Client request no-store overrides a response that would otherwise permit public storage.
- **S-038:** Directive precedence is rule-specific rather than one universal override mechanism.
- **S-044:** Directive categories: cacheability, validation/revalidation, and advanced stale serving.
- **S-051:** Repeated placement of the browser-generated max-age=0 explanation.
- **S-061:** Full request-directive list and only-if-cached example.

## R02 — Freshness, max-age, heuristic caching, and missing freshness metadata

`max-age` defines freshness lifetime. A fresh cached response can normally be reused without contacting the origin. After the lifetime expires, it becomes stale and usually needs validation or a new fetch. Without explicit freshness metadata, browsers may apply heuristic caching, especially when validators or `Last-Modified` exist, but APIs should not rely on that implementation-dependent behavior. If there is neither `max-age` nor `Expires`, a normal API client should assume it may need to call the server again.

**Reviewed image uses:** S-004, S-007, S-014, S-016, S-019, S-020, S-033, S-035, S-054, S-055

**Assigned SVG text nodes:** T-006, T-010, T-012, T-014, T-022, T-023

### Image-level evidence

- **S-004:** Freshness flow for public max-age=60 across first, fresh, and stale requests.
- **S-007:** Browser heuristic decisions when validators exist but explicit freshness does not.
- **S-014:** No max-age or Expires: response is not safely predictable as cacheable and APIs should usually be called again.
- **S-016:** Heuristic caching example using ETag without explicit freshness.
- **S-019:** max-age as the central performance-oriented freshness directive.
- **S-020:** max-age without validators gives fresh reuse, then usually a full fetch after expiry.
- **S-033:** After max-age expiry, ETag validation determines 304 versus a new 200 response.
- **S-035:** Without no-cache, freshness directives decide whether a cached response can be reused directly.
- **S-054:** No caching directives: browsers may use heuristics, but APIs should not rely on them.
- **S-055:** Without immutable, a long-lived fresh response may still be revalidated on reload or by policy.

## R03 — Validators, conditional requests, no-cache, and must-revalidate flows

`ETag` and `Last-Modified` are validators, not freshness directives. A stale or explicitly `no-cache` response is conditionally requested with `If-None-Match` or `If-Modified-Since`; an unchanged representation yields `304 Not Modified`, while changed content returns `200` with a new representation and validator. `no-cache` means storage is allowed but every reuse must be validated. `must-revalidate` forbids serving stale content once freshness ends. Combining `max-age`, a validator, and optionally `must-revalidate` gives cheap fresh hits and cheap 304 validation after expiry.

**Reviewed image uses:** S-005, S-006, S-012, S-018, S-021, S-026, S-028, S-030, S-034, S-036, S-039, S-057, S-065, S-066

**Assigned SVG text nodes:** T-003, T-007, T-008, T-009, T-026

### Image-level evidence

- **S-005:** ETag or Last-Modified without explicit Cache-Control may still permit heuristic storage and later validation.
- **S-006:** Always-revalidate pattern: validator plus Cache-Control no-cache.
- **S-012:** Classic no-cache plus ETag flow from cached response to conditional request and 304.
- **S-018:** must-revalidate behavior after a max-age lifetime expires.
- **S-021:** Last-Modified with no-cache and conditional If-Modified-Since validation.
- **S-026:** Without must-revalidate, some caches can serve stale content in limited policy-defined situations.
- **S-028:** Combined ETag and max-age flow: fresh reuse followed by conditional validation.
- **S-030:** no-cache plus ETag revalidation example with 304 and 200 outcomes.
- **S-034:** no-cache allows storage but requires validation before every reuse.
- **S-036:** must-revalidate is useful when serving stale content is unacceptable after expiry.
- **S-039:** must-revalidate prohibits stale reuse once a response becomes stale.
- **S-057:** After freshness expires, validators drive conditional requests; no-cache requires validation every reuse.
- **S-065:** Recipe for always validating with no-cache and ETag.
- **S-066:** Recipe for prohibiting stale delivery with max-age and must-revalidate.

## R04 — Cacheability and safety: no-store, public, private, and shared caches

`no-store` is the strongest safety directive: caches should not store the request or response. Use it for tokens, financial data, medical data, and similarly sensitive responses. `public` allows shared caches such as CDNs and proxies to store a response; `private` limits storage to a private client cache and is the normal choice for personalized but locally cacheable content. Shared-cache safety must be explicit because an authenticated or user-specific response can otherwise leak between users. When `public` and `private` are omitted, caches fall back to their cacheability rules and heuristics, so explicit policy is safer.

**Reviewed image uses:** S-008, S-011, S-017, S-022, S-024, S-027, S-029, S-031, S-037, S-040, S-041, S-043, S-060, S-062, S-063, S-064

**Assigned SVG text nodes:** T-005, T-024, T-025, T-027, T-028

### Image-level evidence

- **S-008:** no-store as the primary directive for sensitive data.
- **S-011:** Guidance for public content that is identical for every user.
- **S-017:** Private browser caching guidance for personalized content.
- **S-022:** Browser cache is private and can safely hold user-specific responses when policy allows.
- **S-024:** Sensitive personalized content should generally use no-store and avoid shared caching.
- **S-027:** public versus private determines whether shared caches may store the representation.
- **S-029:** Shared caches can expose personalized content unless responses are private, no-store, or correctly varied.
- **S-031:** private max-age example for user-specific data cacheable only on the client.
- **S-037:** no-store prevents storage and is appropriate for tokens, PII, and banking data.
- **S-040:** Response directive list covering max-age, s-maxage, cacheability, validation, and stale-serving policies.
- **S-041:** public/private safety examples for browser and shared caches.
- **S-043:** Omitting public/private can be ambiguous for shared caches, so explicit scope is recommended.
- **S-060:** Other directives include no-transform and immutable.
- **S-062:** Recipe for public catalog data using public, max-age, and s-maxage.
- **S-063:** Recipe for user-specific data using private and a short max-age.
- **S-064:** Recipe for sensitive endpoints using no-store.

## R05 — Advanced directives: s-maxage, Vary, immutable, stale-while-revalidate, and stale-if-error

`s-maxage` gives shared caches a freshness lifetime different from the browser's `max-age`. `Vary` makes the cache key depend on request headers such as `Accept`, preventing the wrong representation variant from being reused. `immutable` tells supporting clients that a fresh fingerprinted asset will not change, reducing reload-time validation. `stale-while-revalidate` permits stale delivery while validation runs in the background, and `stale-if-error` permits stale delivery during origin failure. These directives are most useful with CDNs, versioned static assets, and deliberately designed resilient caching.

**Reviewed image uses:** S-047, S-050, S-053, S-059, S-067

**Assigned SVG text nodes:** T-002

### Image-level evidence

- **S-047:** s-maxage overrides shared-cache freshness while browser max-age remains separate.
- **S-050:** Vary: Accept prevents a cache from returning the wrong media type or API version.
- **S-053:** immutable for long-lived fingerprinted assets that do not change at the same URL.
- **S-059:** immutable mainly affects validation during the fresh period and remains dependent on freshness.
- **S-067:** CDN resilience recipe using stale-while-revalidate and stale-if-error.

## R06 — ASP.NET Core Response Caching Middleware versus Output Cache

ASP.NET Core Response Caching Middleware behaves like an HTTP cache: it follows response headers and also honors client request directives that prevent reuse. It works best for public GET/HEAD responses where ordinary HTTP semantics should control caching. Output Cache is application-controlled server-side caching: policies can vary by route, query, header, or custom dimensions and can choose whether client request directives affect reuse. Output Cache is generally safer for SPA/API server caching where the application must have the final decision. Browser cache, CDN/proxy cache, Response Caching Middleware, and Output Cache can coexist as separate layers.

**Reviewed image uses:** S-009, S-010, S-015, S-042, S-045, S-046, S-048, S-049, S-052, S-056, S-058

**Assigned SVG text nodes:** T-011, T-013, T-016, T-029, T-030, T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040

### Image-level evidence

- **S-009:** Output Cache described as server-side shared caching whose key and policies must prevent personalized leaks.
- **S-010:** Nuance that Output Cache is shared server-side caching even though policies can vary by dimensions.
- **S-015:** Output Cache safety rule: cache only effectively public content for the selected key.
- **S-042:** ResponseCache attribute controls HTTP headers and influences browser/proxy caching and Response Caching Middleware.
- **S-045:** Client max-age=0 can force a browser/proxy cache or Response Caching Middleware to revalidate.
- **S-046:** SPA, browser cache, CDN, and Response Caching Middleware can create several independent caching layers.
- **S-048:** Response Caching Middleware stores HTTP responses and follows HTTP request and response caching semantics.
- **S-049:** Multi-layer caching is not inherently wrong; each layer follows its own policy and key.
- **S-052:** Output Cache uses server policies and does not need client cache directives to decide reuse.
- **S-056:** Response Caching Middleware is appropriate for standards-based public HTTP caching.
- **S-058:** Response Caching Middleware is less suitable when the server must override client cache directives.

## R07 — Practical caching recipes and decision checklist

A practical policy starts with the data class. Public catalog data can use `public`, browser `max-age`, and CDN `s-maxage`. User-specific but non-sensitive data can use short `private` caching. Sensitive endpoints use `no-store`. Always-validate resources use `no-cache` plus `ETag` or `Last-Modified`. Add `must-revalidate` when stale data is unacceptable, and add stale-serving directives only when resilience requirements justify them. The final checklist is: safety first, correct public/private scope, deliberate freshness, validators for bandwidth savings, and a correct cache key through `Vary` or application policy.

**Reviewed image uses:** S-068

**Assigned SVG text nodes:** T-004, T-015

### Image-level evidence

- **S-068:** Final checklist for safety, scope, freshness, validators, shared-cache lifetime, and cache-key correctness.


## Practical synthesis

Cache correctness starts with four separate questions: who may store the response, how long it is fresh, how it is validated after freshness ends, and which request dimensions belong in the cache key. Browser/proxy HTTP caching and ASP.NET Core Response Caching Middleware follow request and response cache semantics. Output Cache is server-policy-driven and is often the better fit when an API or SPA backend must retain final control over reuse. Validators save bandwidth but do not by themselves define freshness; public/private/no-store protect the storage boundary; and Vary or application-specific dimensions protect representation correctness.

## Closure

```text
embedded assets: 67
total image uses: 68
processed image uses: 68
restored image uses: 68
duplicate placements: 1
SVG text nodes: 40
vector paths: 15
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
