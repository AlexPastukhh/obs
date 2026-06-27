# Regional transcript — R01: Vary header semantics, variants, risks and guidance

Conspect: `vary header`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`Vary` tells an HTTP cache which request headers select different representations of the same URL.

## Meaning

- A cache key normally starts with the request URL.
- `Vary: Accept` tells the cache to keep separate entries for different Accept values.
- `Vary` does not set freshness and does not make a response cacheable by itself.
- It only declares representation-selection dimensions.

## Common examples

- `Vary: Accept` for JSON, XML or vendor-media-type content negotiation.
- `Vary: Accept-Encoding` for gzip/br/identity byte representations.
- `Vary: Accept-Language` for localized responses.
- `Vary: X-Tenant-Id` when that header genuinely selects tenant-specific public variants.

## Missing Vary

- A cache can serve JSON to an XML client.
- It can serve the wrong language, API version or tenant representation.
- In the worst case, an incorrect variant key can leak data or create cross-tenant behavior.

## Overusing Vary

- High-cardinality headers create many entries and low hit rates.
- Varying by `Cookie` or `Authorization` approaches a cache-per-user design and is difficult to manage safely.
- Authenticated and personalized endpoints are usually better handled with private/no-store policy or application-level data caching.

## Rules of thumb

- Use server/shared response caching primarily for anonymous public GETs.
- Add `Vary` for every request header that truly changes the representation.
- Avoid adding headers that do not affect output.
- For authenticated endpoints, consider service/repository caching, a carefully configured gateway, or ETag/304 validation.

## Caveats

- Query-string dimensions are part of the URL and are not declared through `Vary`.
- `Vary: *` effectively prevents ordinary shared-cache reuse.

## Covered text elements

```text
(none; source region is screenshot-only)
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
