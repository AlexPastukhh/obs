# Regional transcript — R02: Vary header semantics and cache-key variants

Conspect: `cache control headers and response caching`  
Generated: 2026-06-27 12:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Source heading

`vary`

## Semantic transcript

`Vary` tells caches which request headers change the representation. The cache must keep a separate stored variant for each relevant header value.

## Common variants

- `Vary: Accept` is required when the same URL can return JSON, XML or vendor representations according to content negotiation.
- `Vary: Accept-Encoding` separates compressed and uncompressed byte representations.
- `Vary: Accept-Language` separates localized representations.
- A tenant/version header such as `X-Tenant-Id` or `X-Api-Version` may be included when it truly determines the response.

## Missing Vary

- Without the correct `Vary`, a cache can serve JSON to an XML client, the wrong language, version or tenant representation.
- Incorrect variation can be a correctness bug and, in a multi-tenant or user-specific system, a data-leak risk.
- `Vary` controls variant-key correctness; it does not set freshness or permit storage by itself.

## Overusing Vary

- High-cardinality headers create many cache entries and a poor hit rate.
- Varying by `Cookie` or `Authorization` is usually unsuitable for shared response caching.
- For authenticated endpoints, application/data caching or carefully controlled private caching is often safer.
- `Vary: *` effectively prevents normal reuse by shared caches and should be avoided unless required.

## Rule of thumb

- Use server response caching mainly for anonymous/public GETs.
- Use `Vary` only for request headers that actually alter the representation.
- Prefer ETag/Last-Modified validation when bandwidth savings are useful but full shared storage is unsafe.

## Caveats

- A cache key can also vary by URL and query string; `Vary` only describes request-header dimensions.
- Every added variant dimension multiplies storage and reduces reuse.

## Covered text element

`T-001`

## Covered screenshot uses

```text
IU-023, IU-024, IU-025, IU-026, IU-027
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
