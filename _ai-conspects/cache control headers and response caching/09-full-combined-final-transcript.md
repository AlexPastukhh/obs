# Full combined final transcript — cache control headers and response caching

Generated: 2026-06-27 12:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 8 / 8
unique embedded screenshots: 91 / 91
screenshot uses on canvas: 91 / 91
repeated screenshot placements retained: 0
regions: 8 / 8
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 Mental model

HTTP caching is a contract between origin, private clients and shared intermediaries.
Four independent questions must be answered:

```text
May the response be stored?
Who may store it?
How long is it fresh?
Which request values define a different representation?
```

Validators answer a fifth question after freshness expires: has the resource changed?

```text
Cache-Control  storage, audience, freshness and stale behavior
Vary           request-header dimensions of the cache key
ETag           opaque resource version
Last-Modified  timestamp validator
Age            time already spent in a cache
Expires        older absolute freshness mechanism
```

ASP.NET Core has distinct tools:

```text
ResponseCacheAttribute  writes MVC cache-related headers
cache profiles          named reusable ResponseCache policies
custom middleware       conditional header rules
ResponseCaching         HTTP-semantic in-process response storage
Output Caching          server-controlled output policy, separate feature
IMemoryCache/distributed cache  application/data caching
```

## R01 — Global cache configuration and middleware setup

ASP.NET Core exposes several different global mechanisms. A global `ResponseCacheAttribute` establishes MVC header defaults, cache profiles provide reusable named policies, custom middleware can apply conditional rules, and `UseResponseCaching` adds an in-process HTTP response cache.

### Global MVC filter

- Registering `ResponseCacheAttribute` in `MvcOptions.Filters` applies its header policy to every MVC controller/action unless a more specific attribute overrides it.
- A safe API baseline is often `NoStore = true` with `Location = ResponseCacheLocation.None` to prevent accidental storage.
- The attribute participates through MVC filter infrastructure; it is not middleware and it does not itself retain response bodies.
- A per-action `[ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]` can replace the global policy for a deliberately cacheable endpoint.

### Named cache profiles

- Configure `MvcOptions.CacheProfiles` once and reference a profile with `[ResponseCache(CacheProfileName = "Public5Min")]`.
- Profiles reduce duplicated numbers and directives and make policy review easier.
- Typical profiles include public short-lived data, private client-only data and a no-store policy.
- A profile configures response headers; it still does not create ETags or guarantee server-side storage.

### Conditional header middleware

- Custom middleware is the most flexible place to inspect route, status code, authentication, content type or application metadata.
- Run `await next()` first when the policy depends on the produced status or headers.
- Do not overwrite an explicit `Cache-Control` already set by an endpoint unless the global rule intentionally has higher precedence.
- A common safety rule is to add `no-store` to authenticated responses that have no explicit policy.

### Response Caching middleware

- Register services with `AddResponseCaching()` and place `UseResponseCaching()` before endpoints whose responses may be cached.
- The middleware follows HTTP caching headers and eligibility conditions; enabling it once does not cache every response automatically.
- It is intended for HTTP semantic response caching, primarily public anonymous GET/HEAD responses.
- It is different from output caching and from application/data caching.

### Caveats

- Middleware ordering determines which requests and responses it can observe.
- A global header policy and an in-process response cache solve different problems and may be used independently.

## R02 — Vary header semantics and cache-key variants

`Vary` tells caches which request headers change the representation. The cache must keep a separate stored variant for each relevant header value.

### Common variants

- `Vary: Accept` is required when the same URL can return JSON, XML or vendor representations according to content negotiation.
- `Vary: Accept-Encoding` separates compressed and uncompressed byte representations.
- `Vary: Accept-Language` separates localized representations.
- A tenant/version header such as `X-Tenant-Id` or `X-Api-Version` may be included when it truly determines the response.

### Missing Vary

- Without the correct `Vary`, a cache can serve JSON to an XML client, the wrong language, version or tenant representation.
- Incorrect variation can be a correctness bug and, in a multi-tenant or user-specific system, a data-leak risk.
- `Vary` controls variant-key correctness; it does not set freshness or permit storage by itself.

### Overusing Vary

- High-cardinality headers create many cache entries and a poor hit rate.
- Varying by `Cookie` or `Authorization` is usually unsuitable for shared response caching.
- For authenticated endpoints, application/data caching or carefully controlled private caching is often safer.
- `Vary: *` effectively prevents normal reuse by shared caches and should be avoided unless required.

### Rule of thumb

- Use server response caching mainly for anonymous/public GETs.
- Use `Vary` only for request headers that actually alter the representation.
- Prefer ETag/Last-Modified validation when bandwidth savings are useful but full shared storage is unsafe.

### Caveats

- A cache key can also vary by URL and query string; `Vary` only describes request-header dimensions.
- Every added variant dimension multiplies storage and reduces reuse.

## R03 — Response-caching basics, freshness and validation

HTTP caching can eliminate requests while a response is fresh and can eliminate response bodies through conditional validation after it becomes stale.

### Cache locations

- A private cache belongs to one browser, mobile app or client HTTP stack.
- A shared cache is a CDN, gateway, reverse proxy or other intermediary serving multiple users.
- The response controls who may store it with directives such as `public`, `private` and `no-store`.

### Freshness model

- `Cache-Control: public, max-age=120` permits a fresh cached response to be reused for 120 seconds without contacting the origin.
- Freshness reduces latency, origin CPU/database work and network traffic.
- Freshness can serve temporarily stale business data, so the duration must match the domain tolerance.
- Without explicit freshness information, clients may recontact the API every time or apply heuristic behavior that APIs should not rely on.

### Validation model

- The server emits `ETag` or `Last-Modified`.
- The client later sends `If-None-Match` or `If-Modified-Since`.
- An unchanged resource returns `304 Not Modified` with no representation body.
- A changed resource returns a normal `200` response and the cache updates its stored representation.
- ETags are usually more reliable for application resources than timestamp-only validation.

### Combining models

- While `max-age` is unexpired, the cache reuses the response without a request.
- After expiry, validators allow a cheap conditional request.
- The combination gives fewer requests during the freshness window and smaller responses after the window.
- ASP.NET Core controllers do not automatically create application ETags merely because `[ResponseCache]` is present.

### Caveats

- Caching is correct only when invalidation/freshness rules match the underlying data.
- A 304 saves bandwidth but still reaches the origin unless validation is handled by an intermediary.

## R04 — ResponseCache attribute and variation settings

`ResponseCacheAttribute` is an MVC policy attribute that writes or removes cache-related response headers. It does not store the response by itself.

### Core properties

- `Duration` writes a `max-age` value.
- `Location = Any` allows public/shared caching; `Client` selects private client caching; `None` prevents shared/client caching through the generated policy.
- `NoStore = true` emits `no-store` and overrides normal retention intent.
- `CacheProfileName` loads a reusable profile from MVC options.

### VaryByHeader

- `VaryByHeader = "Accept"` adds `Vary: Accept` for negotiated representations.
- The endpoint must also declare/produce the supported media types, for example with `[Produces]`.
- The same result can be set manually through `Response.Headers.Vary` when an attribute is not appropriate.

### VaryByQueryKeys

- `VaryByQueryKeys` tells ASP.NET Core Response Caching middleware which query keys form distinct cache entries.
- This is middleware feature metadata, not a standard HTTP `Vary` header.
- It requires the response-caching feature to be available and should include only query keys that truly change the response.

### What the attribute does not do

- It does not generate ETags or implement `If-None-Match` handling.
- It does not guarantee a browser, CDN or middleware will store the response.
- It cannot make an authenticated or otherwise ineligible response safe for shared caching.

### Caveats

- Headers are instructions and metadata; actual storage depends on the cache and eligibility rules.
- A per-action policy should override a global default only when the endpoint's data is demonstrably safe to cache.

## R05 — Cache-Control directives

`Cache-Control` appears on responses as storage/reuse policy and on requests as client preferences or constraints. Similar names can have different direction-specific meanings.

### Most important response directives

- `no-store`: do not store the response anywhere; use for secrets, tokens, banking, highly sensitive or dangerous-to-retain data.
- `max-age=N`: the response is fresh for N seconds and may be reused without revalidation.
- `public`: shared caches may store the response.
- `private`: only private/client caches may store the response; shared caches must not.
- `no-cache`: storage is allowed, but the response must be validated before every reuse.
- `must-revalidate`: after becoming stale, the cache must validate and may not serve the stale response unless another directive explicitly permits it.

### Shared-cache and advanced directives

- `s-maxage=N` sets freshness specifically for shared caches and overrides `max-age` there.
- `proxy-revalidate` is the shared-cache analogue of `must-revalidate`.
- `stale-while-revalidate=N` allows temporary stale service while background revalidation occurs.
- `stale-if-error=N` allows stale service when the origin fails.
- `no-transform` asks intermediaries not to modify the payload.
- `immutable` tells supporting clients that a fingerprinted resource will not change during its freshness lifetime.

### Request directives

- Request `max-age=N` asks for a cached response no older than N seconds.
- `max-stale[=N]` allows a stale response within the stated tolerance.
- `min-fresh=N` requires enough freshness to remain for at least N seconds.
- Request `no-cache` asks caches to validate before using a stored response.
- Request `no-store` asks caches not to retain the request or resulting response.
- `only-if-cached` asks for a cached result without contacting the origin and can produce 504 when none is available.

### Safety matrix

- `no-store` and `no-cache` are not synonyms.
- `public` and `private` answer who may store; `max-age` answers how long it is fresh.
- `Vary` answers which request-header values define different variants.
- Validators answer whether a stale representation has changed.

### Caveats

- Support for advanced directives varies among browsers, CDNs and proxies.
- A directive must be evaluated together with the rest of the response and request headers.

## R06 — Request/response cache flows

Concrete flows clarify the difference between freshness, validation, storage prohibition, shared-cache eligibility and variant selection.

### max-age flow

- First request reaches the API and stores `200` plus `Cache-Control: public, max-age=60` and the body.
- A request at 30 seconds is served from cache with no API call.
- After 60 seconds the entry is stale and must be revalidated or replaced according to other directives and validators.
- Without explicit freshness, APIs should expect regular origin requests rather than depend on heuristic caching.

### must-revalidate flow

- With `max-age=60, must-revalidate` plus an ETag, the fresh period behaves normally.
- After expiry, the cache must issue a conditional request and cannot simply serve stale content.
- A 304 keeps the stored body; a 200 replaces it.
- Without `must-revalidate`, some policies/directives may allow stale service in specific circumstances.

### no-cache flow

- The response may be stored.
- Every reuse requires validation, commonly through `If-None-Match`.
- An unchanged resource returns 304 and avoids the representation body.
- Without `no-cache`, freshness directives determine when validation is needed.

### no-store flow

- The response must not be stored.
- A later request must reach the origin again because no reusable copy exists.
- Use for tokens, PII, banking data and other responses where retention is itself unsafe.

### public/private and s-maxage

- `public, max-age=300` allows browser and shared-cache reuse.
- `private, max-age=300` allows only the client-private cache.
- `public, max-age=60, s-maxage=600` gives browsers one minute and shared caches ten minutes of freshness.
- Being explicit avoids ambiguous intermediary behavior.

### Vary flow

- `Vary: Accept` keeps separate entries for JSON and vendor media types.
- Missing `Vary` can return the wrong representation even if freshness is otherwise correct.
- `Vary` changes cache-key correctness, not freshness.

### Caveats

- A response with no usable caching directives is often treated as non-cacheable by shared caches.
- Each intermediary can have additional policy constraints beyond the origin headers.

## R07 — When server response caching is not needed

For many APIs, especially authenticated React/mobile APIs, browser caching, a CDN, validators or application-level caching provide more value than ASP.NET Core in-process whole-response caching.

### Authenticated and personalized APIs

- Authorization headers and cookies usually mean the representation is user-specific.
- ASP.NET Core Response Caching middleware does not normally cache requests carrying `Authorization` and avoids responses with `Set-Cookie`.
- Varying by user identity destroys reuse and can be unsafe.
- Prefer `no-store` for sensitive responses or `private` with a short lifetime when client-local reuse is safe.

### Representation-changing headers

- Accept, Accept-Language, Accept-Encoding, tenant and version headers can create separate variants.
- For high-cardinality combinations, the cache becomes fragmented and expensive.
- Use correct `Vary` when caching remains appropriate; otherwise do not cache the whole response.

### Rapidly changing or personalized data

- A low hit rate gives little benefit while increasing stale-data risk.
- User-specific or frequently changing endpoints are often better served by application/data caching with explicit invalidation.
- A short private cache can still reduce repeated requests from one client when the contract allows it.

### Existing CDN or gateway

- Public cacheable responses are often handled more efficiently and scalably at the edge.
- Do not add another in-process cache merely because a caching middleware exists.
- Use ETag/Last-Modified when the main goal is to save bandwidth while still validating freshness.

### React/client APIs

- A React application does not automatically require server response caching.
- The browser cache, a data-fetching client cache, a CDN/reverse proxy and conditional requests may cover the practical need.
- The choice depends on data ownership, sharing, invalidation and expected reuse, not on the frontend framework.

### Caveats

- Client-side application caches and HTTP caches have different invalidation and security behavior.
- Authentication alone is not a reason to cache per user in a shared response cache.

## R08 — When server response caching is useful

In-process server response caching is useful when repeated eligible responses occur within a short window and edge caching is unavailable, insufficient or operationally outside the application's control.

### Good cases

- Anonymous/public GET endpoints with stable data and repeated callers.
- Internal callers on the same network where a CDN adds little value.
- Expensive serialization, database queries or composition repeated within a short freshness window.
- Endpoints with application-specific cache keys or invalidation rules that are easier to control in-process.
- Deployments where the team cannot configure the gateway/CDN or needs a quick localized optimization.

### Cases edge caches cannot express well

- Correctness tied to domain events, authorization decisions or known invalidation signals.
- Tenant/feature-flag dimensions whose cache keys are explicitly controlled by the application.
- Responses that should be cached in the service but not stored in shared external caches.
- Dynamic endpoints with very short repeated bursts where even a few seconds of reuse smooths load.

### Practical recipes

- Public catalog: `public, max-age=120, s-maxage=600`.
- User-specific but client-cacheable: `private, max-age=30`.
- Sensitive endpoint: `no-store`.
- Always validate: `no-cache` plus ETag/Last-Modified.
- Never serve stale after expiry: `public, max-age=60, must-revalidate`.
- CDN resilience: `public, max-age=60, stale-while-revalidate=30, stale-if-error=600` when the intermediary supports it.

### Operational checklist

- Confirm the endpoint is eligible: normally GET/HEAD, successful and free of unsafe per-user headers.
- Choose public versus private deliberately.
- Set a freshness lifetime from business tolerance.
- Add validators when revalidation should be cheap.
- Add `Vary` or query-key variation for every dimension that changes the representation.
- Measure cache hit ratio, memory use, stale-data incidents and origin-resource savings.

### Application caching alternative

- Caching database results, computed models or service results often provides better invalidation control than whole-response caching.
- Application caching can be used even when the final HTTP response must be private or no-store.
- ASP.NET Core Response Caching middleware is HTTP-header driven and is not event-based invalidation.

### Caveats

- In-process response caches are instance-local unless the chosen implementation provides another storage model.
- Caching only helps when repeated requests map to the same safe cache key during the freshness window.

## 11 ASP.NET Core configuration examples

### Safe MVC default and named profiles

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ResponseCacheAttribute
    {
        NoStore = true,
        Location = ResponseCacheLocation.None
    });

    options.CacheProfiles.Add(
        "Public5Min",
        new CacheProfile
        {
            Duration = 300,
            Location = ResponseCacheLocation.Any
        });

    options.CacheProfiles.Add(
        "Private30Sec",
        new CacheProfile
        {
            Duration = 30,
            Location = ResponseCacheLocation.Client
        });
});
```

```csharp
[ResponseCache(CacheProfileName = "Public5Min")]
[Produces("application/json", "application/xml")]
[ResponseCache(VaryByHeader = "Accept")]
public IActionResult GetCatalog() => Ok(...);
```

### Response Caching middleware

```csharp
builder.Services.AddResponseCaching();

var app = builder.Build();

app.UseResponseCaching();
app.MapControllers();
```

The middleware caches only responses that satisfy its HTTP eligibility rules.
Typical candidates are successful anonymous GET/HEAD responses with explicit
cacheability. Requests carrying authorization and responses setting cookies are
normally unsuitable.

### Conditional no-store safety middleware

```csharp
app.Use(async (context, next) =>
{
    await next();

    if (context.Response.StatusCode is >= 200 and < 300 &&
        context.User.Identity?.IsAuthenticated == true &&
        !context.Response.Headers.ContainsKey("Cache-Control"))
    {
        context.Response.Headers.CacheControl = "no-store";
    }
});
```

## 12 Decision guide

| Scenario | Preferred policy |
|---|---|
| Sensitive token/PII/banking response | `no-store` |
| User-specific response safe only in browser | `private, max-age=N` |
| Public stable catalog | `public, max-age=N`, optionally `s-maxage` |
| Representation changes by Accept | add `Vary: Accept` |
| Data changes but 304 is useful | ETag/Last-Modified validation |
| CDN already owns public caching | configure CDN/origin headers; avoid redundant local cache |
| Authenticated/personalized API | usually no server response caching; use data caching/private policy |
| Expensive repeated anonymous GET without edge cache | Response Caching or Output Caching after measurement |
| Domain-event invalidation needed | application/output caching with explicit invalidation |

## 13 Final checklist

1. Decide whether storage is safe.
2. Choose `public`, `private` or `no-store` explicitly.
3. Select a freshness lifetime from business tolerance.
4. Add validators when cheap revalidation matters.
5. Add `Vary` and query-key variation for every true representation dimension.
6. Avoid user-specific shared-cache keys.
7. Confirm middleware ordering and actual cache eligibility.
8. Test response headers and repeated requests.
9. Measure hit rate, memory, origin savings and stale-data risk.
10. Prefer application caching when invalidation belongs to domain events.

## 14 Regional source map

### R01 coverage

- text elements: `1`
- screenshot uses: `12`
- unique screenshots: `12`
- repeated placements: `0`
- remaining: `0`
- transcript: `01-transcript-R01-global-cache-configuration-and-middleware.md`

### R02 coverage

- text elements: `1`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`
- transcript: `02-transcript-R02-vary-header-and-cache-key-variants.md`

### R03 coverage

- text elements: `1`
- screenshot uses: `7`
- unique screenshots: `7`
- repeated placements: `0`
- remaining: `0`
- transcript: `03-transcript-R03-response-caching-basics-freshness-and-validation.md`

### R04 coverage

- text elements: `1`
- screenshot uses: `2`
- unique screenshots: `2`
- repeated placements: `0`
- remaining: `0`
- transcript: `04-transcript-R04-responsecache-attribute-and-vary-settings.md`

### R05 coverage

- text elements: `1`
- screenshot uses: `9`
- unique screenshots: `9`
- repeated placements: `0`
- remaining: `0`
- transcript: `05-transcript-R05-cache-control-directives.md`

### R06 coverage

- text elements: `1`
- screenshot uses: `12`
- unique screenshots: `12`
- repeated placements: `0`
- remaining: `0`
- transcript: `06-transcript-R06-request-response-cache-flows.md`

### R07 coverage

- text elements: `1`
- screenshot uses: `25`
- unique screenshots: `25`
- repeated placements: `0`
- remaining: `0`
- transcript: `07-transcript-R07-when-server-response-caching-is-not-needed.md`

### R08 coverage

- text elements: `1`
- screenshot uses: `19`
- unique screenshots: `19`
- repeated placements: `0`
- remaining: `0`
- transcript: `08-transcript-R08-when-server-response-caching-is-useful.md`

## 15 Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots remain authoritative for exact header examples, code
punctuation and version-specific ASP.NET Core behavior.
