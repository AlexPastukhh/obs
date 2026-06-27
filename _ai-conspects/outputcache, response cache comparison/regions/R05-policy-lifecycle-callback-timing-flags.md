# R05 — Policy lifecycle, callback timing and flag mutation

Status: **verified and closed**

Evidence: 13 restored image uses and 27 physical SVG text nodes.

## Lifecycle order

The reviewed source establishes this working model:

1. `CacheRequestAsync` runs before Output Cache performs lookup.
2. If lookup is allowed and a candidate entry exists, `ServeFromCacheAsync` runs.
3. If the request continues to the endpoint and a fresh response is produced, `ServeResponseAsync` runs before the final
   storage decision.

## When hooks do not run

`ServeFromCacheAsync` does not run when there is no candidate hit, lookup is disabled, or output caching has been
disabled for the request.

`ServeResponseAsync` belongs to the generated-response path. It is not the hook for deciding whether a previously found
cached entry should be served.

## Flag placement

Use `CacheRequestAsync` for decisions that must exist before lookup:

- `EnableOutputCaching`;
- `AllowCacheLookup`;
- initial `AllowCacheStorage`;
- `AllowLocking`;
- initial vary rules and tags.

Use `ServeFromCacheAsync` for candidate-hit freshness/acceptability. For example, an admin request can reject the hit and
continue to the endpoint.

Use `ServeResponseAsync` for facts available only after endpoint execution:

- status and headers;
- final body size;
- whether `Set-Cookie` was emitted;
- final `AllowCacheStorage`;
- expiration of the new response.

## Read/write combinations

The source shows four useful mental models:

- lookup yes, storage yes: normal read-through/write-through cache;
- lookup yes, storage no: serve an existing entry but do not write a replacement;
- lookup no, storage yes: bypass old entries and write the fresh response;
- output caching disabled: neither lookup nor storage.

A “force fresh” operation normally means rejecting/bypassing the candidate hit, then separately deciding whether the
new response should be stored.

## Why lookup cannot be disabled in the hit hook

If `AllowCacheLookup` is false before lookup, no candidate-hit callback occurs. Therefore a general “do not look up this
request” rule must be set in `CacheRequestAsync`, not deferred to `ServeFromCacheAsync`.

## Storage decision timing

The fresh-response callback is the reliable place to finalize `AllowCacheStorage` based on response facts. The inspected
examples also show that this callback can be part of response processing even when storage is ultimately turned off;
its purpose is to make the final admission decision.

## Tags

Assign intended tags through the builder or early policy phase. Late changes in `ServeResponseAsync` are treated as
implementation-sensitive and should not be the primary tagging design.

## Closed source uses

```text
S-106, S-107, S-108, S-109, S-110, S-111, S-133, S-134, S-135, S-136, S-144, S-145, S-146
```
