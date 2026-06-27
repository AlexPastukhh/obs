# Regional transcript — R04: ResponseCache attribute and variation settings

Conspect: `cache control headers and response caching`  
Generated: 2026-06-27 12:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Source heading

`response cache attr vary`

## Semantic transcript

`ResponseCacheAttribute` is an MVC policy attribute that writes or removes cache-related response headers. It does not store the response by itself.

## Core properties

- `Duration` writes a `max-age` value.
- `Location = Any` allows public/shared caching; `Client` selects private client caching; `None` prevents shared/client caching through the generated policy.
- `NoStore = true` emits `no-store` and overrides normal retention intent.
- `CacheProfileName` loads a reusable profile from MVC options.

## VaryByHeader

- `VaryByHeader = "Accept"` adds `Vary: Accept` for negotiated representations.
- The endpoint must also declare/produce the supported media types, for example with `[Produces]`.
- The same result can be set manually through `Response.Headers.Vary` when an attribute is not appropriate.

## VaryByQueryKeys

- `VaryByQueryKeys` tells ASP.NET Core Response Caching middleware which query keys form distinct cache entries.
- This is middleware feature metadata, not a standard HTTP `Vary` header.
- It requires the response-caching feature to be available and should include only query keys that truly change the response.

## What the attribute does not do

- It does not generate ETags or implement `If-None-Match` handling.
- It does not guarantee a browser, CDN or middleware will store the response.
- It cannot make an authenticated or otherwise ineligible response safe for shared caching.

## Caveats

- Headers are instructions and metadata; actual storage depends on the cache and eligibility rules.
- A per-action policy should override a global default only when the endpoint's data is demonstrably safe to cache.

## Covered text element

`T-008`

## Covered screenshot uses

```text
IU-090, IU-091
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
