# Regional transcript — R07: When server response caching is not needed

Conspect: `cache control headers and response caching`  
Generated: 2026-06-27 12:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 25 / 25
unique screenshots represented: 25
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Source heading

`when you dont need response caching`

## Semantic transcript

For many APIs, especially authenticated React/mobile APIs, browser caching, a CDN, validators or application-level caching provide more value than ASP.NET Core in-process whole-response caching.

## Authenticated and personalized APIs

- Authorization headers and cookies usually mean the representation is user-specific.
- ASP.NET Core Response Caching middleware does not normally cache requests carrying `Authorization` and avoids responses with `Set-Cookie`.
- Varying by user identity destroys reuse and can be unsafe.
- Prefer `no-store` for sensitive responses or `private` with a short lifetime when client-local reuse is safe.

## Representation-changing headers

- Accept, Accept-Language, Accept-Encoding, tenant and version headers can create separate variants.
- For high-cardinality combinations, the cache becomes fragmented and expensive.
- Use correct `Vary` when caching remains appropriate; otherwise do not cache the whole response.

## Rapidly changing or personalized data

- A low hit rate gives little benefit while increasing stale-data risk.
- User-specific or frequently changing endpoints are often better served by application/data caching with explicit invalidation.
- A short private cache can still reduce repeated requests from one client when the contract allows it.

## Existing CDN or gateway

- Public cacheable responses are often handled more efficiently and scalably at the edge.
- Do not add another in-process cache merely because a caching middleware exists.
- Use ETag/Last-Modified when the main goal is to save bandwidth while still validating freshness.

## React/client APIs

- A React application does not automatically require server response caching.
- The browser cache, a data-fetching client cache, a CDN/reverse proxy and conditional requests may cover the practical need.
- The choice depends on data ownership, sharing, invalidation and expected reuse, not on the frontend framework.

## Caveats

- Client-side application caches and HTTP caches have different invalidation and security behavior.
- Authentication alone is not a reason to cache per user in a shared response cache.

## Covered text element

`T-006`

## Covered screenshot uses

```text
IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-015, IU-016, IU-017, IU-018, IU-019, IU-020
IU-021, IU-022, IU-028, IU-029, IU-053, IU-054, IU-077, IU-078, IU-086, IU-087, IU-088, IU-089
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
