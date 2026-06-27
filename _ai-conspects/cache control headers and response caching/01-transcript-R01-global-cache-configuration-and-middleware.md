# Regional transcript — R01: Global cache configuration and middleware setup

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

`global cache configurations`

## Semantic transcript

ASP.NET Core exposes several different global mechanisms. A global `ResponseCacheAttribute` establishes MVC header defaults, cache profiles provide reusable named policies, custom middleware can apply conditional rules, and `UseResponseCaching` adds an in-process HTTP response cache.

## Global MVC filter

- Registering `ResponseCacheAttribute` in `MvcOptions.Filters` applies its header policy to every MVC controller/action unless a more specific attribute overrides it.
- A safe API baseline is often `NoStore = true` with `Location = ResponseCacheLocation.None` to prevent accidental storage.
- The attribute participates through MVC filter infrastructure; it is not middleware and it does not itself retain response bodies.
- A per-action `[ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]` can replace the global policy for a deliberately cacheable endpoint.

## Named cache profiles

- Configure `MvcOptions.CacheProfiles` once and reference a profile with `[ResponseCache(CacheProfileName = "Public5Min")]`.
- Profiles reduce duplicated numbers and directives and make policy review easier.
- Typical profiles include public short-lived data, private client-only data and a no-store policy.
- A profile configures response headers; it still does not create ETags or guarantee server-side storage.

## Conditional header middleware

- Custom middleware is the most flexible place to inspect route, status code, authentication, content type or application metadata.
- Run `await next()` first when the policy depends on the produced status or headers.
- Do not overwrite an explicit `Cache-Control` already set by an endpoint unless the global rule intentionally has higher precedence.
- A common safety rule is to add `no-store` to authenticated responses that have no explicit policy.

## Response Caching middleware

- Register services with `AddResponseCaching()` and place `UseResponseCaching()` before endpoints whose responses may be cached.
- The middleware follows HTTP caching headers and eligibility conditions; enabling it once does not cache every response automatically.
- It is intended for HTTP semantic response caching, primarily public anonymous GET/HEAD responses.
- It is different from output caching and from application/data caching.

## Caveats

- Middleware ordering determines which requests and responses it can observe.
- A global header policy and an in-process response cache solve different problems and may be used independently.

## Covered text element

`T-004`

## Covered screenshot uses

```text
IU-042, IU-043, IU-044, IU-045, IU-046, IU-047, IU-048, IU-049, IU-050, IU-051, IU-052, IU-067
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
