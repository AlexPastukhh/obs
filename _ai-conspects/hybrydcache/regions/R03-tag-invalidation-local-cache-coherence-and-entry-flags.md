# R03 - Tag invalidation, local-cache coherence and entry flags

Generated: 2026-06-21 14:45:12 UTC

## Source scope

```text
S-017, S-018, S-019, S-020, S-021
```

## Tag invalidation

An entry can be created with one or more tags:

```csharp
await hybridCache.GetOrCreateAsync(
    key: $"product:{id}",
    factory: ct => LoadFromDbAsync(id, ct),
    options: new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(10)
    },
    tags: new[] { "products", $"category:{categoryId}" },
    cancellationToken: ct);
```

Later, related entries can be invalidated without listing every key:

```csharp
await hybridCache.RemoveByTagAsync(
    $"category:{categoryId}",
    ct);
```

Conceptually, HybridCache maintains tag-to-entry bookkeeping or an equivalent tag-versioning mechanism.

## Why tags help

Tags make group invalidation practical:

```text
invalidate all products
invalidate one category
invalidate one tenant/version group
```

The caller does not need to remember each individual cache key.

## Multi-instance local-cache nuance

The in-memory L1 cache is process-local.

In a multi-instance application:

```text
server A RAM cache
server B RAM cache
server C RAM cache
```

Invalidating distributed state from one instance does not automatically prove that every other process has dropped its RAM copy.

Mitigations include:

```text
short local TTL
broadcast invalidation
avoid local caching for strongly coherent data
disable local reads/writes for a specific call
```

## Entry flags

`HybridCacheEntryOptions.Flags` can selectively control layers.

Disable the local L1 layer for a specific entry/call:

```csharp
var options = new HybridCacheEntryOptions
{
    Expiration = TimeSpan.FromMinutes(5),
    Flags = HybridCacheEntryFlags.DisableLocalCache
};
```

More granular flags can disable only local reads or local writes:

```csharp
Flags = HybridCacheEntryFlags.DisableLocalCacheRead
```

```csharp
Flags = HybridCacheEntryFlags.DisableLocalCacheWrite
```

This is useful when stale RAM data should not be read but warming the local cache is acceptable, or vice versa.

## Design takeaway

Choose coherence intentionally:

```text
fast local reads -> accept bounded staleness
strict cross-node freshness -> shorten/disable L1 or broadcast invalidation
group invalidation -> use tags
```

The cache key, tags, expiration and local-layer flags are one consistency design, not independent decorations.

## Boundary correction

Stage0 grouped these screenshots under serialization/keys/tags/expiration. Visual review showed the actual focus is tag invalidation, multi-instance local-cache behavior and layer-control flags. The final R03 title follows the source content.

