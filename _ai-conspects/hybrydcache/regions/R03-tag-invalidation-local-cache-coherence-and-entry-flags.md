# HybridCache — corrected source-preserving transcript: tag bookkeeping and local-cache flags

Generated: 2026-06-29

## Corrected boundary

```text
R03: S-018..S-021
```

### S-018 — Conceptual internal model of tags

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Conceptually, HybridCache stores:

- the cached entry under its normal key, for example `product:123`;
- an internal tag index, or a tag-versioning structure, that lets it find or invalidate entries associated with a tag.

`RemoveByTagAsync(tag)` invalidates all entries associated with that tag without the caller listing every key.

You do not need to invalidate multiple keys manually because HybridCache keeps the tag-to-entry bookkeeping.

#### Study meaning

Tags separate logical grouping from physical key management. The implementation may use indexing or versioning, but the caller uses one logical tag operation.

#### Recall questions

1. What two kinds of bookkeeping are described?
2. Why does the caller not need a list of all tagged keys?
3. What implementation detail is intentionally described only conceptually?
### S-019 — Tag invalidation API flow

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

When an item is cached, tags are provided:

```csharp
await _hybridCache.GetOrCreateAsync(
    key: $"product:{id}",
    factory: ct => LoadFromDbAsync(id, ct),
    options: new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(10)
    },
    tags: new[]
    {
        "products",
        $"category:{categoryId}"
    },
    cancellationToken: ct);
```

Later, a category is invalidated:

```csharp
await _hybridCache.RemoveByTagAsync(
    $"category:{categoryId}",
    ct);
```

#### Study meaning

The group relationship is established at write time and consumed later by the invalidation API.

#### Recall questions

1. Which tags are attached to each product?
2. What expiration is shown?
3. Which call invalidates one category?
### S-020 — Disable the local cache for a specific call

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

HybridCache can selectively disable the in-memory L1 layer per call or key through `HybridCacheEntryOptions.Flags`.

```csharp
using Microsoft.Extensions.Caching.Hybrid;

var opts = new HybridCacheEntryOptions
{
    Expiration = TimeSpan.FromMinutes(5), // L2 / overall lifetime
    Flags = HybridCacheEntryFlags.DisableLocalCache
        // disables L1 read + write
};

var value = await hybridCache.GetOrCreateAsync(
    key: $"user:{userId}:permissions",
    factory: ct =>
        LoadPermissionsAsync(userId, ct),
    options: opts,
    cancellationToken: ct);
```

#### Study meaning

`DisableLocalCache` makes the request rely on the shared layer and factory, avoiding both reads from and writes to process-local memory.

#### Recall questions

1. Which flag disables both L1 read and L1 write?
2. Why might permissions be a candidate for this setting?
3. What does `Expiration` represent in this example?
### S-021 — Disable only L1 read or only L1 write

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

HybridCache can be more granular: disable only local-cache reads or only local-cache writes.

This is useful when stale in-memory data should not be used, but populating L1 for later requests is acceptable — or the reverse.

```csharp
var optsNoL1Read = new HybridCacheEntryOptions
{
    Expiration = TimeSpan.FromMinutes(5),
    Flags = HybridCacheEntryFlags.DisableLocalCacheRead
};

var optsNoL1Write = new HybridCacheEntryOptions
{
    Expiration = TimeSpan.FromMinutes(5),
    Flags = HybridCacheEntryFlags.DisableLocalCacheWrite
};
```

The source explicitly notes that these values exist in the enum.

#### Study meaning

Read and write controls allow one-way L1 behavior. They are more precise than disabling local cache entirely.

#### Recall questions

1. What does `DisableLocalCacheRead` prevent?
2. What does `DisableLocalCacheWrite` prevent?
3. Give a case where bypassing a stale L1 read but allowing a new L1 write is useful.

