# R04 — Response-aware cache admission, safety rules and dynamic expiration

Status: **verified and closed**

Evidence: 33 restored image uses and 27 physical SVG text nodes.

## Request phase versus response phase

`CacheRequestAsync` is for request-known facts:

- method, authentication, headers and path;
- initial lookup/storage/locking permissions;
- initial variation and expiration;
- complete disablement for endpoints that must never participate.

`ServeFromCacheAsync` is the cache-hit phase. The source examples use it for hit-specific decisions such as forcing a
fresh response for administrators or honoring an explicit no-cache/max-age-zero request.

`ServeResponseAsync` is the fresh-response phase. It can inspect the status code, headers and body metadata before final
storage.

## Preserve default-policy defenses

The built-in policy already rejects several dangerous cases. A custom policy that replaces it must reintroduce the
protections it needs. The reviewed defensive checks include:

- do not store error responses;
- do not store responses that emit `Set-Cookie`;
- do not cache authenticated or user-specific output by accident;
- reject oversized bodies;
- decide explicitly whether redirects are cacheable;
- choose freshness from the actual response result where appropriate.

## Errors

Typical custom logic stores successful responses and disables storage for `4xx`/`5xx` results. This prevents temporary
failures from becoming reusable output.

A response-derived policy can assign different outcomes:

- success: longer TTL;
- not found: short TTL;
- server error: no storage.

## Cookies, session and personalized responses

A `Set-Cookie` header is a clear warning, but it is not the only personalization signal. An endpoint can read
`HttpContext.User`, session, tenant, profile, permissions or other user-specific state without setting a cookie in the
response.

Therefore the safe rule is stronger than “do not cache Set-Cookie responses”:

- disable output caching for personalized endpoints unless every content-changing dimension is intentionally and safely
  varied;
- do not cache authenticated responses merely because the body happened not to set a cookie;
- use explicit metadata/policy to opt such endpoints out.

## Size and redirects

`Content-Length` or equivalent response metadata can be used to reject large generated responses before storage.
Redirect caching should be an explicit business choice, not an accidental consequence of broad custom eligibility.

## Dynamic expiration

The sheet uses `ResponseExpirationTimeSpan` in both request and response examples:

- request phase sets a normal default;
- cache-hit phase can decide whether the existing hit is acceptable;
- response phase chooses the store-time freshness for the new response.

Examples include short freshness for an admin-forced refresh, different TTLs by response status, and caching only hot
products to avoid filling the store with cold entries.

## Cache hit versus newly generated response

A hit-specific decision and a storage-time decision solve different problems. Rejecting an existing hit does not
automatically define how long the replacement should live. When forcing a fresh response, set the intended expiration
for the newly generated response explicitly.

## Closed source uses

```text
S-094, S-095, S-096, S-097, S-098, S-099, S-100, S-101, S-102, S-103, S-104, S-105, S-112,
S-113, S-114, S-115, S-116, S-117, S-118, S-119, S-120, S-121, S-122, S-123, S-124, S-125,
S-126, S-127, S-128, S-129, S-130, S-131, S-132
```
