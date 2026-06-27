# R02 — Middleware options, default policy, fluent builder and cache-key variation

Status: **verified and closed**

Evidence: 47 restored image uses and 34 physical SVG text nodes.

## Core model

`AddOutputCache` configures global middleware options and named policies. The sheet distinguishes two levels:

1. `OutputCacheOptions`, which controls middleware-wide limits and defaults.
2. `OutputCachePolicyBuilder`, which describes an endpoint or named policy.

The reviewed screenshots cover these middleware options:

- `DefaultExpirationTimeSpan`: used when caching is enabled without an explicit `Expire(...)`; the shown default is 60 seconds.
- `MaximumBodySize`: maximum response-body size eligible for caching; the shown default is 64 MB.
- `SizeLimit`: total cache-store budget; the shown default is 100 MB.
- `UseCaseSensitivePaths`: whether path casing creates separate keys.
- `ApplicationServices`: framework/policy service-provider access, not an ordinary application lookup mechanism.

## `AddPolicy` overloads

The source distinguishes:

- a named fluent builder;
- a named `IOutputCachePolicy` instance;
- a named builder with `excludeDefaultPolicy: true`.

A normal builder composes on top of the built-in default policy. Excluding the default is appropriate only when the
custom policy deliberately replaces eligibility, lookup, locking, variation and storage rules.

`Cache()` starts policy construction from the normal built-in behavior. `NoCache()` explicitly opts an endpoint out.

## Built-in default policy

The reviewed examples describe the default policy as conservative:

- cache successful HTTP 200 responses;
- cache GET/HEAD requests;
- do not cache authenticated requests;
- do not cache responses that set cookies;
- use a default freshness window when no explicit expiration is supplied;
- vary by query keys unless narrowed by policy.

When a custom policy excludes the default, these protections must be added explicitly where they are still required.

## Fluent operations

The sheet covers:

- `Cache()` / `NoCache()`;
- `Expire(TimeSpan)`;
- `SetVaryByQuery(...)`;
- `SetVaryByHeader(...)`;
- `SetVaryByRouteValue(...)`;
- `SetVaryByHost(bool)`;
- `SetCacheKeyPrefix(...)`;
- `VaryByValue(...)`;
- `Tag(...)`;
- `With(...)`;
- `SetLocking(bool)`.

`SetCacheKeyPrefix` partitions or namespaces a key. `VaryByValue` adds a custom request-derived variation component.
They can sometimes model similar buckets, but the prefix communicates partitioning while `VaryByValue` communicates
an additional key dimension.

`With(...)` decides whether a policy fragment applies to the current request. It is not itself a key dimension.
`VaryByValue(...)` changes the cache key for requests where the policy is applied.

## Query, header, route, host and custom variation

The full export clarifies:

- `QueryKeys = "*"` means vary by all query-string keys.
- The wildcard meaning is specific to that query-key API and should not be generalized to every vary operation.
- `SetVaryByQuery("culture")` narrows variation to the selected query key.
- `SetVaryByHeader("Accept-Language")` creates variants by request header.
- Route-value and host variation can be redundant where the normal key already separates the same requests, but they
  remain useful for explicit/custom policy intent.
- A custom value such as tenant, device class or feature bucket belongs in `VaryByValue`.

## Personalized data warning

A cached response is shared by every request that maps to the same key. A user identifier that influences response
content must either be represented in a safe variation dimension or, more commonly, make the endpoint ineligible for
output caching. Do not rely on nearby route or query variation to separate users unless that is the actual identity
boundary.

## Closed source uses

```text
S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035,
S-036, S-037, S-038, S-039, S-040, S-046, S-047, S-048, S-049, S-050, S-051, S-062, S-063,
S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-073, S-074, S-075, S-076,
S-077, S-078, S-079, S-080, S-081, S-082, S-084, S-086
```
