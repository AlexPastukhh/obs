# Regional transcript — R08: When server response caching is useful

Conspect: `cache control headers and response caching`  
Generated: 2026-06-27 12:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 19 / 19
unique screenshots represented: 19
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Source heading

`when you may need server response caching`

## Semantic transcript

In-process server response caching is useful when repeated eligible responses occur within a short window and edge caching is unavailable, insufficient or operationally outside the application's control.

## Good cases

- Anonymous/public GET endpoints with stable data and repeated callers.
- Internal callers on the same network where a CDN adds little value.
- Expensive serialization, database queries or composition repeated within a short freshness window.
- Endpoints with application-specific cache keys or invalidation rules that are easier to control in-process.
- Deployments where the team cannot configure the gateway/CDN or needs a quick localized optimization.

## Cases edge caches cannot express well

- Correctness tied to domain events, authorization decisions or known invalidation signals.
- Tenant/feature-flag dimensions whose cache keys are explicitly controlled by the application.
- Responses that should be cached in the service but not stored in shared external caches.
- Dynamic endpoints with very short repeated bursts where even a few seconds of reuse smooths load.

## Practical recipes

- Public catalog: `public, max-age=120, s-maxage=600`.
- User-specific but client-cacheable: `private, max-age=30`.
- Sensitive endpoint: `no-store`.
- Always validate: `no-cache` plus ETag/Last-Modified.
- Never serve stale after expiry: `public, max-age=60, must-revalidate`.
- CDN resilience: `public, max-age=60, stale-while-revalidate=30, stale-if-error=600` when the intermediary supports it.

## Operational checklist

- Confirm the endpoint is eligible: normally GET/HEAD, successful and free of unsafe per-user headers.
- Choose public versus private deliberately.
- Set a freshness lifetime from business tolerance.
- Add validators when revalidation should be cheap.
- Add `Vary` or query-key variation for every dimension that changes the representation.
- Measure cache hit ratio, memory use, stale-data incidents and origin-resource savings.

## Application caching alternative

- Caching database results, computed models or service results often provides better invalidation control than whole-response caching.
- Application caching can be used even when the final HTTP response must be private or no-store.
- ASP.NET Core Response Caching middleware is HTTP-header driven and is not event-based invalidation.

## Caveats

- In-process response caches are instance-local unless the chosen implementation provides another storage model.
- Caching only helps when repeated requests map to the same safe cache key during the freshness window.

## Covered text element

`T-005`

## Covered screenshot uses

```text
IU-055, IU-056, IU-057, IU-058, IU-059, IU-060, IU-061, IU-062, IU-063, IU-064, IU-065, IU-066, IU-079
IU-080, IU-081, IU-082, IU-083, IU-084, IU-085
```

## Audit note

Every listed screenshot placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and extracted screenshots remain authoritative for exact code and header examples.
