# R01/R02/R03 - ASP.NET Core IMemoryCache final transcript v001

Conspect: `imemorycache`  
File type: **source-preserving final combined transcript**  
Generated: 2026-06-22 UTC

## 0.1 Area overview / reading quality

This sheet covers the lifecycle of in-process cached values:

```text
registration -> lookup/create -> expiration/eviction -> explicit invalidation
-> group invalidation -> stampede protection
```

The source is readable at high confidence. Exact code remains preserved in `source/images/`.

## 1. Registration and core API

`IMemoryCache` is registered with `AddMemoryCache()` and injected into application services. The interface has low-level methods, while common usage goes through extension methods such as `Get`, `Set`, `TryGetValue`, `GetOrCreate`, `GetOrCreateAsync`, and `Remove`.

A typical read-through flow is:

```text
1. build a stable cache key
2. try cache lookup
3. on miss, load data
4. store with explicit options
5. return the value
```

Cache keys should encode all inputs that affect the result. A product-by-ID value and a product-list value need different key namespaces.

## 2. Expiration and eviction

Sliding expiration extends the lifetime every time an entry is accessed. Absolute expiration sets a hard upper bound. Combining both is often safer: sliding expiration keeps hot values alive, while absolute expiration prevents a permanently hot entry from living forever.

`MemoryCacheEntryOptions` can configure:

- sliding expiration;
- absolute expiration or relative absolute expiration;
- priority;
- entry size;
- eviction callbacks;
- expiration tokens.

A global `SizeLimit` is application-defined, not bytes unless the application consistently treats units as bytes. Every entry in a size-limited cache must set its `Size`. When pressure reaches the limit, the cache evicts entries according to expiration, priority and recency rules.

`IMemoryCache` does not automatically react to arbitrary database changes. Explicit invalidation is still required when source data changes.

## 3. Removal and update invalidation

When the exact affected key is known, call `Remove(key)`. Update workflows commonly invalidate both the single-item key and related list/category keys after the durable update succeeds.

The safest ordering is:

```text
write source of truth -> commit/confirm success -> invalidate cache
```

Invalidating before the update is committed can allow another request to repopulate stale data.

## 4. Invalidating many related entries

`IMemoryCache` has no built-in wildcard delete or tag API. Common strategies are:

### Explicit key registry

Track the keys belonging to a group and remove them individually. This gives precise invalidation but requires synchronization and cleanup of the registry.

### Versioned keys

Keep a version counter per logical group, for example a category version. Include that version in every cache key:

```text
category:{categoryId}:v{version}:page:{page}
```

When underlying data changes, increment the version. Old entries become unreachable and expire naturally. This makes invalidation O(1) and is usually the simplest robust in-process group-invalidation strategy.

In a multi-instance deployment, a version stored only in local memory is not shared. Store the version in a distributed store or publish invalidation events if every node must observe the change.

### Manual tags/indexes

Maintain a concurrent map from a tag to its member keys. Invalidate the tag by removing all registered keys. This supports multiple tags but requires thread-safe membership updates, stale-key cleanup and bounded memory.

### Expiration tokens

Entries can share an expiration token. Cancelling/replacing the token expires the entire group. This is useful for in-process group invalidation when token lifecycle is carefully managed.

## 5. Choosing an invalidation strategy

```text
remove known key        -> best for precise item updates
versioned key           -> best for broad logical invalidation with simple O(1) bump
manual tag registry     -> best when entries need several overlapping groups
expiration token        -> compact in-process group invalidation
short TTL only          -> acceptable when some staleness is allowed
```

Versioned keys do not immediately free the old entries; they make them unreachable and rely on later expiration/eviction. Use reasonable TTLs and size limits.

## 6. Cache stampede and GetOrCreate

`GetOrCreate` and `GetOrCreateAsync` are convenience methods, not a guarantee that the factory executes only once. Several requests can observe the same miss and run the expensive factory concurrently.

That behavior is often acceptable for cheap, idempotent work. It is dangerous when the factory is expensive, hits a rate-limited dependency or produces a large burst of allocations/traffic.

A single-flight pattern uses a per-key lock or `SemaphoreSlim`:

```text
fast cache check
-> acquire per-key gate
-> check cache again
-> one caller loads and stores
-> release gate
```

The second cache check after acquiring the gate is essential because another caller may have populated the entry while this caller was waiting.

Per-key gate maps need lifecycle management. Removing a semaphore while another caller may still use it can race; keeping every key forever leaks memory. Production solutions often use a dedicated keyed-lock library, `Lazy<Task<T>>`, a bounded lock map, or a cache/pool for gates.

Do not cache failures indefinitely. Decide whether exceptions should be propagated, briefly negative-cached, or retried according to dependency semantics.

## 7. Multi-instance and distributed caveat

`IMemoryCache` is per process. Each server instance has its own values, versions, tags and locks. Therefore:

- local version bump does not invalidate other nodes;
- local stampede protection does not stop another node from loading the same key;
- application restarts clear everything;
- memory pressure and eviction are independent per node.

Use a distributed cache/invalidation bus and, when necessary, a distributed lock or a backend that already provides request coalescing.

## 8. Final checklist

```text
- choose stable, namespaced keys
- set explicit expiration
- combine sliding + absolute when appropriate
- set Size for every entry if SizeLimit is enabled
- invalidate only after successful source update
- use versioned keys/tokens/tags for groups
- treat GetOrCreate as non-single-flight
- use double-checked per-key locking for expensive factories
- plan for gate cleanup and exception behavior
- remember IMemoryCache is node-local
```

## 9. Coverage

```text
R01: 8 image uses + 4 labels
R02: 8 image uses + 2 labels
R03: 4 image uses + 1 label
Total: 20 image uses + 7 labels
Remaining unclosed: 0
```
