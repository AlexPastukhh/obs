# R01 — ASP.NET Core OutputCache and ResponseCaching comparison final coverage transcript v001

Conspect: `outputcache, response cache comparison`  
Source: `outputcache, response cache comparison.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

ResponseCaching follows client/proxy HTTP caching semantics; OutputCache is server-controlled and policy-driven. Correct policy design separates lookup, storage, variation, and response validation.

Reading quality: verified. The whole sheet is a single coherent region; all 5 image uses and 125 SVG text labels were reviewed against preserved source evidence.

## 1. Response caching versus output caching

`ResponseCachingMiddleware` implements HTTP response-cache semantics. It pays attention to request/response cache headers and is primarily useful where clients or intermediaries may cache a publicly cacheable representation.

`OutputCacheMiddleware` stores server output under server-defined policies. The application decides eligibility, cache keys/variants, lookup, storage, expiration, tags, and invalidation. It is therefore better suited to protecting server work even when clients do not cooperate with cache headers.

## 2. Policy model and lifecycle

A custom `IOutputCachePolicy` participates in three phases:

- `CacheRequestAsync`: decide whether output caching is enabled, whether an existing entry may be looked up, whether a new response may be stored, and establish variation/key rules.
- `ServeFromCacheAsync`: react to a cache hit before it is served.
- `ServeResponseAsync`: inspect the generated response and make final storage decisions, expiration, and tags.

The flags have distinct meanings:

- `EnableOutputCaching` — the middleware/policy is active for this request;
- `AllowCacheLookup` — an existing entry may satisfy the request;
- `AllowCacheStorage` — the generated response may be stored.

A policy can disable lookup but still run the endpoint and store a new response, or allow lookup while deciding later not to store the generated response.

## 3. Fluent builders and custom policies

Fluent policy builders cover common rules such as expiration, query/header/route variation, tags, and predicates. A custom policy is appropriate when rules depend on richer request or response state.

Do not assume a custom policy automatically inherits all default-policy restrictions. Either start from/extend an intended base policy or explicitly reproduce the safety rules you need.

Global options include default expiration, maximum body size, total size limit, and path case sensitivity.

## 4. Cache identity and variants

Variation creates separate entries for representations that differ by:

- query keys;
- route values;
- selected headers;
- host;
- custom values returned from request-dependent callbacks.

`SetCacheKeyPrefix` namespaces groups of keys; it is not the same as `VaryByValue`, which creates variants based on a value. Without the required variation, one user's/route's representation can be served to another.

Tags group entries for invalidation. Adding a tag does not itself create a new cache key or representation; it adds an eviction relationship to the stored entry.

## 5. Response-dependent storage rules

Useful `ServeResponseAsync` rules include:

- cache only successful responses intended for reuse;
- skip personalized/session-dependent endpoints;
- avoid responses that set cookies;
- skip errors and usually redirects;
- cache only small bodies;
- cache only “hot” products to avoid many unused entries;
- change expiration based on response data;
- apply tags derived from the generated representation.

Endpoints that internally depend on `User`, session, per-user permissions, or other personalized state should generally have output caching disabled unless the full personalization dimension is deliberately part of the key and the privacy implications are understood.

## 6. ETags and `304 Not Modified`

OutputCache can compare `If-None-Match` against the cached representation's ETag. If the cached entry is still fresh, it can answer `304 Not Modified` without running the endpoint or checking the database. It revalidates against the cached response, not the underlying data source.

If the application requires database revalidation (for example, a client forces a freshness check), disable/bypass cache lookup, run the endpoint, compare the current version, and return `304` or `200` according to current data.

Do not normally store the `304` itself as the cached representation. Store the full `200` representation and use `304` only as validation protocol output.

## 7. Low-level store access

`IOutputCacheStore` exposes byte-oriented get/set/evict operations used by the middleware. Application code can use it, but doing so couples business code to cache key format and serialization. Prefer policies, tags, and the public output-cache abstractions unless a custom store-level workflow is intentional.

## 6. Coverage

```text
R01 processed image uses: 5
R01 processed text labels: 125
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
