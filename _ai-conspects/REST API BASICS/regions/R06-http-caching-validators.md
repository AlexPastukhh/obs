# R06 — HTTP caching, validators and ASP.NET Core response caching

## Coverage

```text
image uses reviewed: 49
physical SVG text nodes reviewed: 18
non-empty SVG text nodes reviewed: 16
empty SVG text nodes recorded: 2
remaining image uses: 0
remaining text nodes: 0
```

## Area understanding

This region separates client/proxy caching rules from server-side response storage. It covers freshness, revalidation, representation variance, security constraints and the ASP.NET Core components that emit cache headers versus actually store responses.

## Verified transcript

### Cacheable constraint and cache types

A REST response should explicitly state whether it may be cached.

- **Private cache:** browser or client-side cache for one user/device.
- **Shared cache:** CDN, gateway or reverse proxy shared across users.

Shared caching can reduce API requests dramatically, but it must not serve user-specific or sensitive responses to another user.

### Freshness model

Freshness tells a cache that it may reuse a response for a period without contacting the origin.

Preferred control:

```text
Cache-Control: public, max-age=...
```

`Expires` is also available but depends on synchronized clocks and offers less control.

### Validation model

Conditional requests ask whether a cached representation has changed:

```text
ETag + If-None-Match
Last-Modified + If-Modified-Since
```

If unchanged, the server returns `304 Not Modified` without a new body.

A strong validator changes whenever the representation changes. A weak validator can indicate semantic equivalence without byte-for-byte equality.

### Combining freshness and validation

A practical “expiration plus validation” flow is:

1. while fresh, serve from cache without a request;
2. when stale, revalidate with `ETag` or `Last-Modified`;
3. return `304` if unchanged;
4. return `200` with a new body and updated cache entry if changed.

This combines fewer requests during the freshness window with bandwidth savings after expiration.

### `Vary`

`Vary` tells caches which request headers select a different representation. Reviewed examples include:

```text
Vary: Accept
Vary: Accept-Encoding
Vary: Accept-Language
Vary: X-Tenant-Id
```

Missing `Vary` can serve the wrong format, language, encoding or tenant representation. Overusing high-cardinality headers such as cookies can create a near-zero-hit-rate cache and excessive memory use.

### ASP.NET Core response caching

`[ResponseCache]` controls response headers such as `Cache-Control`. It does **not** by itself store responses on the API server.

Server-side response caching requires:

```text
builder.Services.AddResponseCaching();
app.UseResponseCaching();
```

Cache profiles can centralize repeated duration/policy settings and be referenced by controllers.

### Authentication and cookies

Responses that depend on `Authorization`, session cookies, user permissions, locale or tenant state are user-specific. Conservative guidance is:

- prefer anonymous/public GET responses for shared caching;
- use `private` or `no-store` for sensitive responses;
- avoid shared caching when authorization is present unless a carefully designed gateway/CDN policy makes it safe;
- consider caching data at the service/repository level instead of whole responses for authenticated APIs.

### Cache-Control directives

The source covers:

- freshness: `max-age`, `s-maxage`;
- cache type: `public`, `private`;
- validation: `no-cache`, `must-revalidate`;
- storage/transformation: `no-store`, `no-transform`;
- request controls: `min-fresh`, `max-stale`, `only-if-cached`.

`no-store` prohibits storage. `no-transform` tells intermediaries not to alter the representation. `only-if-cached` asks for an existing cached response and can result in `504 Gateway Timeout` when none is available.

## Practical conclusion

Choose cache policy from representation sensitivity first. Use `Vary` whenever request headers select a representation, combine freshness with validators and remember that `[ResponseCache]` emits policy while response-caching middleware performs server-side storage.
