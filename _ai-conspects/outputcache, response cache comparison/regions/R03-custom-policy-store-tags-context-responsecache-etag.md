# R03 — Custom policy, store/tags, OutputCacheContext, ResponseCaching and ETag

Status: **verified and closed**

Evidence: 56 restored image uses and 39 physical SVG text nodes.

## Output Cache setup

The complete setup shown in the source includes:

- `builder.Services.AddOutputCache(...)`;
- registration of named policies or an `IOutputCachePolicy`;
- `app.UseOutputCache()` in the middleware pipeline;
- endpoint/controller selection through attributes or fluent metadata.

A custom policy implements three lifecycle methods:

```csharp
ValueTask CacheRequestAsync(OutputCacheContext context, CancellationToken token);
ValueTask ServeFromCacheAsync(OutputCacheContext context, CancellationToken token);
ValueTask ServeResponseAsync(OutputCacheContext context, CancellationToken token);
```

## `OutputCacheContext`

The screenshots explain the main controls:

- `EnableOutputCaching`: whether Output Cache participates for the request.
- `AllowCacheLookup`: whether an existing entry may be read.
- `AllowCacheStorage`: whether a newly generated response may be stored.
- `AllowLocking`: whether request coalescing/resource locking is used.
- `CacheVaryByRules`: headers, query keys, route values, host and custom variation.
- `Tags`: groups entries for later invalidation.
- `ResponseExpirationTimeSpan`: freshness duration for the response.
- `ResponseTime`: timestamp associated with the generated/cached response.

These flags are independent. This allows read-only, write-only, normal read-through/write-through, or fully disabled
behaviors.

## Store and tag invalidation

`IOutputCacheStore` exposes low-level operations such as get, set and evict-by-tag. It is the middleware's storage
abstraction, not the normal API for manually serving cached payloads from application code.

Tags do not create new cache keys or separate variants. They attach grouping metadata to entries. Multiple entries can
share a tag, and `EvictByTagAsync` invalidates that group without scanning application key conventions.

Safe tag assignment is done through the fluent `Tag(...)` operation or early in policy execution. The reviewed sheet
treats late tag mutation as risky because store implementations and middleware timing may already have captured the
metadata used for persistence.

## Dynamic tags

The source includes a product-details pattern:

- fixed tag: `product-details`;
- resource tag: `product-details:{id}` (for example, `product-details:123`);
- optional language or other variant tag.

The key still determines lookup identity. Tags only support grouped invalidation.

## ResponseCaching versus Output Cache

The completed sheet separates two layers:

**ResponseCaching middleware**

- follows HTTP caching semantics;
- uses `Cache-Control`, `Vary`, validators and related response headers;
- is mainly time/header driven;
- does not provide Output Cache-style tags and first-class programmatic eviction.

**Output Cache**

- is a server-side cached-response middleware;
- can use named/custom policies;
- supports tag invalidation and storage abstraction;
- can make request- and response-aware decisions through lifecycle callbacks.

## ETag and revalidation

The reviewed examples combine short server TTL with `ETag` or `Last-Modified` so browsers/CDNs can revalidate cheaply
after their local copy becomes stale.

The sheet's operational conclusion is:

- without a middleware/component that performs validator comparison, merely emitting an ETag does not make arbitrary
  application code return `304 Not Modified`;
- Output Cache can revalidate a cached response against request validators;
- application code remains responsible for validator logic when it bypasses such middleware behavior;
- avoid treating a generated `304` as a normal body response to store.

## Custom policy versus fluent builder

The fluent builder is preferred for declarative operations already represented by the DSL: cache, expiration, variation,
tags, locking and request predicates.

A custom policy is appropriate for imperative decisions at lifecycle stages, direct manipulation of the independent
flags, response-aware admission, or logic that cannot be expressed clearly by a builder operation.

## Closed source uses

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013,
S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-041, S-042, S-043, S-044,
S-045, S-052, S-053, S-054, S-055, S-056, S-057, S-058, S-059, S-060, S-061, S-083, S-085,
S-087, S-088, S-089, S-090, S-091, S-092, S-093, S-137, S-138, S-139, S-140, S-141, S-142,
S-143, S-147, S-148, S-149
```
