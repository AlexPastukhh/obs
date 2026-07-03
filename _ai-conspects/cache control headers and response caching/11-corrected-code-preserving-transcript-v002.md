# Cache-Control and ASP.NET Core Response Caching — corrected code-preserving transcript v002

Generated: 2026-07-03

## Evidence boundary

```text
exact SVG: source/cache control headers and response caching.svg
physical screenshot placements: 91 / 91
unique screenshot contents: 91 / 91
native non-empty SVG labels: 8 / 8
broken/external/dangling sources: 0
```

The previous `09-full-combined-final-transcript.md` remains a useful semantic overview. This v002 file is authoritative for corrected semantics, code examples, repetition, and question generation.

---

# M01 — HTTP caching mental model

A cache decision answers separate questions:

```text
May this response be stored?
Who may store it?
How long is it fresh?
Which request dimensions produce a different representation?
How is a stale representation validated?
```

Header responsibilities:

| Header/directive | Responsibility |
|---|---|
| `Cache-Control` | storage, audience, freshness, stale/revalidation policy |
| `Vary` | request-header dimensions of the cache key |
| `ETag` | opaque representation validator |
| `Last-Modified` | timestamp validator |
| `Age` | time already spent in a cache |
| `Expires` | older absolute freshness mechanism |

Two complementary models:

1. **Freshness/expiration** — while `max-age` is valid, a cache can serve the stored response without contacting the origin.
2. **Validation/revalidation** — after expiry, the cache can send `If-None-Match`/`If-Modified-Since`; unchanged content receives `304 Not Modified` without the representation body.

The strongest practical combination is:

```http
Cache-Control: public, max-age=120
ETag: "resource-version"
```

During the freshness window there is no origin request. After expiry, a conditional request can avoid retransmitting the body.

---

# M02 — ASP.NET Core mechanisms are different tools

## `ResponseCacheAttribute`

`ResponseCacheAttribute` participates in the MVC filter pipeline and sets/removes cache-related response headers. It does not store response bodies and does not generate ETags.

Per-action example:

```csharp
[HttpGet("{courseId}", Name = "GetCourseForAuthor")]
[ResponseCache(
    Duration = 120,
    Location = ResponseCacheLocation.Any)]
public IActionResult GetCourseForAuthor(
    Guid authorId,
    Guid courseId)
{
    return Ok(new
    {
        authorId,
        courseId,
        title = "Example"
    });
}
```

Expected policy is similar to:

```http
Cache-Control: public, max-age=120
```

The header permits/controls cache behavior; it does not prove the API process itself stored the body.

## Named cache profiles

```csharp
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add(
        "Public5Min",
        new CacheProfile
        {
            Duration = 300,
            Location = ResponseCacheLocation.Any,
            VaryByHeader = "Accept"
        });

    options.CacheProfiles.Add(
        "Private30Sec",
        new CacheProfile
        {
            Duration = 30,
            Location = ResponseCacheLocation.Client
        });

    options.CacheProfiles.Add(
        "NoStore",
        new CacheProfile
        {
            NoStore = true,
            Location = ResponseCacheLocation.None
        });
});
```

Usage:

```csharp
[ResponseCache(CacheProfileName = "Public5Min")]
public IActionResult GetCatalog() => Ok(...);
```

A single attribute can also select a profile and override one property:

```csharp
[ResponseCache(
    CacheProfileName = "Public5Min",
    VaryByHeader = "Accept-Language")]
```

`ResponseCacheAttribute` does not allow multiple instances on the same class/method; use one attribute or put the combined policy in a profile.

## Response Caching middleware

```csharp
builder.Services.AddResponseCaching();

var app = builder.Build();

app.UseResponseCaching();
app.MapControllers();
```

This enables an in-process HTTP-semantic response cache. It stores only eligible responses; enabling it does not cache every endpoint.

Typical candidates:

- successful GET/HEAD requests;
- anonymous/public responses;
- explicit cacheability;
- no unsafe user-specific headers.

## Global MVC safety default

```csharp
builder.Services.AddControllers(options =>
{
    options.Filters.Add(
        new ResponseCacheAttribute
        {
            NoStore = true,
            Location = ResponseCacheLocation.None
        });
});
```

This combination intentionally produces a strong no-storage policy. `NoStore = true` is the part that forbids storage. `Location = None` alone means `no-cache`, not `no-store`.

## Conditional middleware

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

Run `next()` first when the policy depends on status, authentication, content type, or headers produced by downstream code. Do not overwrite an explicit endpoint policy unless the global rule deliberately has higher precedence.

---

# M03 — Authentication, cookies, and personalization

Whole-response shared caching is dangerous when the representation depends on:

- bearer-token identity;
- cookie/session state;
- permissions;
- tenant;
- localization;
- feature flags;
- user-specific data.

A response stored for user A must never be served to user B.

Conservative policies:

```http
Cache-Control: no-store
```

for sensitive data, or:

```http
Cache-Control: private, max-age=30
```

when short client-local reuse is explicitly safe.

Varying by `Authorization` or `Cookie` usually creates near-per-user variants, poor hit rates, high memory use, and difficult safety review. Application/data caching keyed by explicit tenant/user rules is often more controllable than whole-response caching.

---

# M04 — `Vary` and variant correctness

`Vary` tells a cache which request headers change the representation.

```http
Vary: Accept
```

is required when one URL can return different media types by content negotiation.

Other examples:

```http
Vary: Accept-Encoding
Vary: Accept-Language
Vary: X-Tenant-Id
Vary: X-Api-Version
```

Missing `Vary` can cause the wrong format, language, version, or tenant representation to be served. Overusing high-cardinality dimensions destroys reuse and can create unsafe cache behavior.

Controller example:

```csharp
[HttpGet("{id:int}")]
[Produces("application/json", "application/xml")]
[ResponseCache(
    Duration = 60,
    VaryByHeader = "Accept")]
public IActionResult<ProductDto> Get(int id)
{
    return Ok(new ProductDto
    {
        Id = id,
        Name = "Phone"
    });
}
```

Manual variant header:

```csharp
app.MapGet(
    "/api/products/{id:int}",
    (HttpContext http, int id) =>
    {
        http.Response.Headers.Vary = "Accept";

        return Results.Ok(new ProductDto
        {
            Id = id,
            Name = "Phone"
        });
    })
    .Produces<ProductDto>("application/json")
    .Produces<ProductDto>("application/xml");
```

`Vary` fixes cache-key correctness. It does not grant storage permission or define freshness.

---

# M05 — Directive semantics and request/response flows

## Response directives

| Directive | Meaning |
|---|---|
| `no-store` | do not retain the response anywhere |
| `no-cache` | storage is allowed, but validate before every reuse |
| `public` | shared caches may store when other requirements permit |
| `private` | only private/client caches may store |
| `max-age=N` | fresh for N seconds |
| `s-maxage=N` | shared-cache freshness; overrides `max-age` for shared caches |
| `must-revalidate` | once stale, validation is required before reuse |
| `proxy-revalidate` | shared-cache analogue of `must-revalidate` |
| `stale-while-revalidate=N` | may serve stale temporarily while revalidating |
| `stale-if-error=N` | may serve stale when origin fails |
| `no-transform` | intermediaries should not modify payload |
| `immutable` | supporting clients should avoid revalidation while fresh; suitable for fingerprinted assets |

## Request directives

| Directive | Client request meaning |
|---|---|
| `max-age=N` | accept a cached response no older than N seconds |
| `max-stale[=N]` | willing to accept stale content within tolerance |
| `min-fresh=N` | require at least N seconds of freshness remaining |
| `no-cache` | validate before using a stored response |
| `no-store` | ask caches not to retain request/response |
| `only-if-cached` | use cache only; do not contact origin |

## `max-age` flow

```http
Cache-Control: public, max-age=60
```

- t=0: origin returns 200; cache stores response as fresh.
- t=30: cache serves it without an origin call.
- t=70: it is stale; other directives/validators decide what happens next.

## `no-cache` + ETag flow

```http
Cache-Control: no-cache
ETag: "abc"
```

Every reuse requires validation:

```http
If-None-Match: "abc"
```

Unchanged: `304 Not Modified`; changed: normal `200` with new body.

## `must-revalidate`

```http
Cache-Control: public, max-age=60, must-revalidate
ETag: "abc"
```

After expiry, stale content may not simply be served; validation is required.

## `no-store`

```http
Cache-Control: no-store
```

No reusable stored copy should exist. Use for tokens, PII, banking data, secrets, and responses where retention itself is unsafe.

## Shared-cache override

```http
Cache-Control: public, max-age=60, s-maxage=600
```

Private caches get one minute of freshness; shared caches get ten minutes.

---

# M06 — Global configuration choices

Choose the mechanism by responsibility:

| Need | Tool |
|---|---|
| safe MVC default headers | global `ResponseCacheAttribute` filter |
| reusable named policy | MVC cache profile |
| endpoint-specific header policy | one `[ResponseCache(...)]` attribute |
| route/status/auth conditional logic | custom middleware |
| process-local HTTP response storage | Response Caching middleware |
| server-owned policy and invalidation features | Output Caching |
| domain/data result reuse | `IMemoryCache` / distributed cache |

Header policy and body storage are independent concerns. A service can emit cache headers without storing the response locally, or use application caching while the final HTTP response remains `private`/`no-store`.

---

# M07 — When server response caching is useful or unnecessary

## Often unnecessary

- authenticated/personalized APIs;
- rapidly changing responses with low repeat rate;
- a CDN/gateway already owns public caching;
- the main goal is bandwidth validation with ETag/Last-Modified;
- a React/mobile client already has a data-fetching cache and the endpoint is not safely reusable across callers.

## Useful cases

- public anonymous GETs with repeated callers;
- internal service-to-service traffic where a CDN adds little value;
- expensive DB queries/serialization repeated within a short window;
- microcaching for burst smoothing;
- application-controlled tenant/feature dimensions;
- operational constraints prevent gateway/CDN changes;
- origin resource savings matter more than edge delivery.

Measure:

- hit ratio;
- memory use;
- origin CPU/DB savings;
- latency;
- stale-data incidents;
- variant count.

---

# M08 — `ResponseCacheAttribute` filter model

`ResponseCacheAttribute` is an MVC filter factory/ordered filter, not middleware. Adding it to `MvcOptions.Filters` makes it global in the MVC filter pipeline.

The implementation allows only one instance per class/method. Attribute properties override values loaded from a named cache profile.

---

# M09 — Practical recipes

```http
# Public catalog; browser 2 min, CDN 10 min
Cache-Control: public, max-age=120, s-maxage=600
```

```http
# User-specific but safe in client cache
Cache-Control: private, max-age=30
```

```http
# Sensitive endpoint
Cache-Control: no-store
```

```http
# Always validate
Cache-Control: no-cache
ETag: "abc123"
```

```http
# Never serve stale after expiry
Cache-Control: public, max-age=60, must-revalidate
```

```http
# CDN resilience when supported
Cache-Control: public, max-age=60, stale-while-revalidate=30, stale-if-error=600
```

```http
# Fingerprinted immutable asset
Cache-Control: public, max-age=31536000, immutable
```

`immutable` is appropriate when a content change produces a new URL. Do not use it for a mutable resource at a stable URL.

---

# M10 — Critical corrections to the old integrated transcript

## Correction 1 — only one `ResponseCacheAttribute`

Invalid old example:

```csharp
[ResponseCache(CacheProfileName = "Public5Min")]
[ResponseCache(VaryByHeader = "Accept")]
```

Correct:

```csharp
[ResponseCache(
    CacheProfileName = "Public5Min",
    VaryByHeader = "Accept")]
```

or set `VaryByHeader` in the profile.

## Correction 2 — `Location = None` is not `no-store`

`ResponseCacheLocation.None` maps to `no-cache` policy behavior. Storage can still occur, but reuse requires validation.

Storage prohibition requires:

```csharp
NoStore = true
```

The common safe combination:

```csharp
[ResponseCache(
    NoStore = true,
    Location = ResponseCacheLocation.None)]
```

produces a strong no-storage/no-cache policy. Do not attribute the storage prohibition to `Location = None` alone.
