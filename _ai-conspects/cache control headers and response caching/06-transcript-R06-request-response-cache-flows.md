# Regional transcript — R06: Request/response cache flows

Conspect: `cache control headers and response caching`  
Generated: 2026-06-27 12:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Source heading

`some useful flows for clarification`

## Semantic transcript

Concrete flows clarify the difference between freshness, validation, storage prohibition, shared-cache eligibility and variant selection.

## max-age flow

- First request reaches the API and stores `200` plus `Cache-Control: public, max-age=60` and the body.
- A request at 30 seconds is served from cache with no API call.
- After 60 seconds the entry is stale and must be revalidated or replaced according to other directives and validators.
- Without explicit freshness, APIs should expect regular origin requests rather than depend on heuristic caching.

## must-revalidate flow

- With `max-age=60, must-revalidate` plus an ETag, the fresh period behaves normally.
- After expiry, the cache must issue a conditional request and cannot simply serve stale content.
- A 304 keeps the stored body; a 200 replaces it.
- Without `must-revalidate`, some policies/directives may allow stale service in specific circumstances.

## no-cache flow

- The response may be stored.
- Every reuse requires validation, commonly through `If-None-Match`.
- An unchanged resource returns 304 and avoids the representation body.
- Without `no-cache`, freshness directives determine when validation is needed.

## no-store flow

- The response must not be stored.
- A later request must reach the origin again because no reusable copy exists.
- Use for tokens, PII, banking data and other responses where retention is itself unsafe.

## public/private and s-maxage

- `public, max-age=300` allows browser and shared-cache reuse.
- `private, max-age=300` allows only the client-private cache.
- `public, max-age=60, s-maxage=600` gives browsers one minute and shared caches ten minutes of freshness.
- Being explicit avoids ambiguous intermediary behavior.

## Vary flow

- `Vary: Accept` keeps separate entries for JSON and vendor media types.
- Missing `Vary` can return the wrong representation even if freshness is otherwise correct.
- `Vary` changes cache-key correctness, not freshness.

## Caveats

- A response with no usable caching directives is often treated as non-cacheable by shared caches.
- Each intermediary can have additional policy constraints beyond the origin headers.

## Covered text element

`T-003`

## Covered screenshot uses

```text
IU-030, IU-031, IU-032, IU-033, IU-034, IU-035, IU-036, IU-037, IU-038, IU-039, IU-040, IU-041
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
