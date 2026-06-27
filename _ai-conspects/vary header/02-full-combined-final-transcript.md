# Full combined final transcript — vary header

Generated: 2026-06-27 14:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 0 / 0
unique embedded screenshots: 5 / 5
screenshot uses on canvas: 5 / 5
repeated screenshot placements retained: 0
logical regions: 1 / 1
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Vary header semantics, variants, risks and guidance

`Vary` tells an HTTP cache which request headers select different representations of the same URL.

### Meaning

- A cache key normally starts with the request URL.
- `Vary: Accept` tells the cache to keep separate entries for different Accept values.
- `Vary` does not set freshness and does not make a response cacheable by itself.
- It only declares representation-selection dimensions.

### Common examples

- `Vary: Accept` for JSON, XML or vendor-media-type content negotiation.
- `Vary: Accept-Encoding` for gzip/br/identity byte representations.
- `Vary: Accept-Language` for localized responses.
- `Vary: X-Tenant-Id` when that header genuinely selects tenant-specific public variants.

### Missing Vary

- A cache can serve JSON to an XML client.
- It can serve the wrong language, API version or tenant representation.
- In the worst case, an incorrect variant key can leak data or create cross-tenant behavior.

### Overusing Vary

- High-cardinality headers create many entries and low hit rates.
- Varying by `Cookie` or `Authorization` approaches a cache-per-user design and is difficult to manage safely.
- Authenticated and personalized endpoints are usually better handled with private/no-store policy or application-level data caching.

### Rules of thumb

- Use server/shared response caching primarily for anonymous public GETs.
- Add `Vary` for every request header that truly changes the representation.
- Avoid adding headers that do not affect output.
- For authenticated endpoints, consider service/repository caching, a carefully configured gateway, or ETag/304 validation.

### Caveats

- Query-string dimensions are part of the URL and are not declared through `Vary`.
- `Vary: *` effectively prevents ordinary shared-cache reuse.

## Coverage map

### R01

- text elements: `0`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `01-transcript-R01-vary-header-variants-risks-and-guidance.md`

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots under `source/` remain authoritative for exact source
punctuation, code spelling and framework-version details.
