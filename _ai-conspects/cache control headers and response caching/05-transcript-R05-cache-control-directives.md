# Regional transcript — R05: Cache-Control directives

Conspect: `cache control headers and response caching`  
Generated: 2026-06-27 12:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Source heading

`directives`

## Semantic transcript

`Cache-Control` appears on responses as storage/reuse policy and on requests as client preferences or constraints. Similar names can have different direction-specific meanings.

## Most important response directives

- `no-store`: do not store the response anywhere; use for secrets, tokens, banking, highly sensitive or dangerous-to-retain data.
- `max-age=N`: the response is fresh for N seconds and may be reused without revalidation.
- `public`: shared caches may store the response.
- `private`: only private/client caches may store the response; shared caches must not.
- `no-cache`: storage is allowed, but the response must be validated before every reuse.
- `must-revalidate`: after becoming stale, the cache must validate and may not serve the stale response unless another directive explicitly permits it.

## Shared-cache and advanced directives

- `s-maxage=N` sets freshness specifically for shared caches and overrides `max-age` there.
- `proxy-revalidate` is the shared-cache analogue of `must-revalidate`.
- `stale-while-revalidate=N` allows temporary stale service while background revalidation occurs.
- `stale-if-error=N` allows stale service when the origin fails.
- `no-transform` asks intermediaries not to modify the payload.
- `immutable` tells supporting clients that a fingerprinted resource will not change during its freshness lifetime.

## Request directives

- Request `max-age=N` asks for a cached response no older than N seconds.
- `max-stale[=N]` allows a stale response within the stated tolerance.
- `min-fresh=N` requires enough freshness to remain for at least N seconds.
- Request `no-cache` asks caches to validate before using a stored response.
- Request `no-store` asks caches not to retain the request or resulting response.
- `only-if-cached` asks for a cached result without contacting the origin and can produce 504 when none is available.

## Safety matrix

- `no-store` and `no-cache` are not synonyms.
- `public` and `private` answer who may store; `max-age` answers how long it is fresh.
- `Vary` answers which request-header values define different variants.
- Validators answer whether a stale representation has changed.

## Caveats

- Support for advanced directives varies among browsers, CDNs and proxies.
- A directive must be evaluated together with the rest of the response and request headers.

## Covered text element

`T-007`

## Covered screenshot uses

```text
IU-068, IU-069, IU-070, IU-071, IU-072, IU-073, IU-074, IU-075, IU-076
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
