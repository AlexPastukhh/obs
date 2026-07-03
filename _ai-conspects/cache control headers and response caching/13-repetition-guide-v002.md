# Cache-Control and Response Caching — repetition guide v002

## One-minute mental model

```text
Cache-Control -> may store / who / freshness / stale policy
Vary          -> variant key
ETag          -> representation version
304           -> unchanged body omitted
ResponseCacheAttribute -> MVC headers
ResponseCaching middleware -> eligible in-process HTTP response storage
Output/application cache -> separate server-controlled mechanisms
```

## Compare

1. `no-cache` vs `no-store`.
2. `public` vs `private`.
3. `max-age` vs `s-maxage`.
4. freshness vs validation.
5. `Vary` vs freshness directives.
6. Response Caching vs Output Caching.
7. HTTP response caching vs application/data caching.
8. browser cache vs CDN/shared cache.
9. ETag vs Last-Modified.
10. global MVC filter vs middleware.

## Debug sequence

1. Is storage safe?
2. Is the response user/tenant specific?
3. Who may store it?
4. How long is stale tolerance?
5. Which request values change the representation?
6. Is validation required?
7. Is the response eligible for the chosen middleware/cache?
8. Is middleware in the correct pipeline location?
9. Are cookies/Authorization/Set-Cookie involved?
10. Did a real repeated-request test prove a hit?

## Coding exercises

1. Create public/private/no-store profiles.
2. Repair a duplicated ResponseCache attribute.
3. Demonstrate why `Location=None` differs from `NoStore=true`.
4. Add Vary for Accept and Accept-Language.
5. Implement a simple ETag/If-None-Match path.
6. Write tests for fresh, stale, 304, and changed-resource flows.
7. Protect authenticated responses with a conditional no-store middleware.
8. Compare Response Caching and Output Caching for one endpoint.
9. Measure hit ratio and memory under several Vary dimensions.
10. Design a per-tenant application-cache key without shared-response leakage.
