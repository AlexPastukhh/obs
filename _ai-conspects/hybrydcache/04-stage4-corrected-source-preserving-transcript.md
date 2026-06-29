# HybridCache — corrected near-literal combined transcript

Generated: 2026-06-29

## Status

```text
source SVG image uses: 21
source blocks in this transcript: 21
near-literal normalized blocks: 21
blocks with explicit crop limitation: 3
recall-question sets: 21
```

The previous transcript had source-ID coverage but compressed groups of screenshots into short summaries. This corrected transcript preserves visible prose, code, concrete values, scenarios, and trade-offs.

---

# HybridCache — corrected source-preserving transcript: setup, API shape, and stampede protection

Generated: 2026-06-29

## Corrected boundary

```text
R01: S-001..S-004
```

The former 8/8/5 partition did not follow the actual source order. This corrected region groups setup, the controller API, and single-flight behavior.

### S-001 — Controller/service GetOrCreateAsync example

**Readability:** high  
**Known limits:** bottom record line is partly covered by the screenshot UI, but its declaration is readable

#### Near-literal normalized transcript

The example uses HybridCache in an API controller:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Hybrid;

[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly HybridCache _cache;

    public ProductsController(HybridCache cache)
        => _cache = cache;

    [HttpGet("{id:int}")]
    public Task<ProductDto> Get(
        int id,
        CancellationToken ct)
    {
        var key = $"product:{id}";

        return _cache.GetOrCreateAsync(
            key,
            async token =>
            {
                // Expensive load (DB/API)
                await Task.Delay(200, token);

                return new ProductDto(
                    id,
                    $"Product {id}",
                    DateTime.UtcNow);
            },
            cancellationToken: ct);
    }
}
```

A record declaration is visible at the bottom:

```csharp
public record ProductDto(
    int Id,
    string Name,
    DateTime GeneratedAtUtc);
```

#### Study meaning

The controller injects `HybridCache`, derives a stable cache key, and supplies a factory that runs only when the value is absent. The request cancellation token is propagated.

#### Recall questions

1. What key is used for a product?
2. When is the factory executed?
3. Why is `CancellationToken` passed both to the action and cache call?
4. What demonstrates that the returned value came from a fresh factory execution?
### S-002 — Redis connection string in appsettings.json

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The configuration contains:

```json
{
  "ConnectionStrings": {
    "Redis": "localhost:6379"
  }
}
```

#### Study meaning

The distributed L2 provider reads a named Redis connection string from application configuration.

#### Recall questions

1. What connection-string name is used?
2. Which endpoint is configured in the example?
### S-003 — Minimal HybridCache registration with Redis

**Readability:** high  
**Known limits:** a screenshot UI artifact appears after the AddHybridCache comment and has been removed

#### Near-literal normalized transcript

**Packages**

- Redis provider: `Microsoft.Extensions.Caching.StackExchangeRedis`
- HybridCache: `Microsoft.Extensions.Caching.Hybrid`

**Program.cs**

```csharp
using Microsoft.Extensions.Caching.Hybrid;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// L2 (distributed)
builder.Services.AddStackExchangeRedisCache(o =>
{
    o.Configuration =
        builder.Configuration.GetConnectionString("Redis");
    o.InstanceName = "myapp:";
});

// HybridCache (L1 + L2 orchestration)
builder.Services.AddHybridCache();

var app = builder.Build();

app.MapControllers();
app.Run();
```

#### Study meaning

Redis is registered as the distributed cache. `AddHybridCache()` adds the L1/L2 orchestration service consumed by controllers.

#### Recall questions

1. Which package provides the Redis cache provider?
2. What does `InstanceName = "myapp:"` do?
3. Which call registers HybridCache?
4. Which layer is Redis in this setup?
### S-004 — Stampede protection in GetOrCreateAsync

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`HybridCache.GetOrCreateAsync` includes stampede protection, also described as “single-flight”, for a given key.

Only one concurrent caller runs the factory. Other callers wait for that result instead of all hitting the database or API.

Example: if 200 requests arrive at the same time for `product:123` and the cache is empty:

- request #1 runs the factory and performs the DB call;
- requests #2 through #200 wait;
- when request #1 completes, all callers receive the same cached result.

#### Study meaning

The protection reduces load spikes on the backing service and prevents hundreds of identical concurrent cache-miss computations.

#### Recall questions

1. What is single-flight/stampede protection?
2. How many factories run for 200 simultaneous misses on the same key?
3. Do different cache keys share the same single-flight operation?



---

# HybridCache — corrected source-preserving transcript: invalidation and multi-instance coherence

Generated: 2026-06-29

## Corrected boundary

```text
R02: S-005..S-017
```

This is the large conceptual road about key/tag invalidation, two-server behavior, stale L1 values, and mitigation strategies.

### S-005 — Multi-instance nuance when removing by key or tag

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

When removing by key or tag:

- the distributed cache entry is cleared, so all instances stop getting it from Redis;
- the local memory cache, L1, is cleared on the **current** instance;
- other servers' local memory caches may still hold the old value until their entries expire.

Common ways to handle this:

- keep L1 TTL short for data that is sensitive to staleness;
- rely on L2 correctness and tolerate brief per-node staleness;
- use pub/sub invalidation signals so other nodes also drop their L1 entry.

#### Study meaning

L2 is shared, but L1 belongs to one process. Removing a distributed entry is not automatically a broadcast to every process-local memory cache.

#### Recall questions

1. Which cache layers are cleared on the server that performs removal?
2. Why can another server still return the old value?
3. Name three strategies for controlling cross-node staleness.
### S-006 — Cache tags and RemoveByTagAsync

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

HybridCache supports tags: tags are attached while caching and can later invalidate a group.

```csharp
var product = await _cache.GetOrCreateAsync(
    key: $"product:{id}",
    factory: async ct =>
        await LoadFromDbAsync(id, ct),
    options: new HybridCacheEntryOptions
    {
        Expiration = TimeSpan.FromMinutes(5)
    },
    tags: new[]
    {
        "products",
        $"category:{categoryId}"
    },
    cancellationToken: ct);
```

To invalidate everything in a category:

```csharp
await _cache.RemoveByTagAsync(
    $"category:{categoryId}",
    ct);
```

The source notes that tag invalidation is a supported HybridCache API.

#### Study meaning

Tags provide group invalidation without the caller tracking every individual cache key.

#### Recall questions

1. At what point are tags associated with an entry?
2. How would all products in one category be invalidated?
3. Why are both a broad `products` tag and a category tag useful?
### S-007 — Update product and invalidate related keys

**Readability:** high  
**Known limits:** right edge of the private helper is cropped; the invalidation code is readable

#### Near-literal normalized transcript

The visible service code performs a database update, then removes relevant cache entries:

```csharp
public ProductService(HybridCache cache)
    => _cache = cache;

public async Task UpdateProductAsync(
    int id,
    ProductUpdate dto,
    CancellationToken ct)
{
    await UpdateDbAsync(id, dto, ct);

    await _cache.RemoveAsync(
        $"product:{id}",
        ct);

    await _cache.RemoveAsync(
        new[]
        {
            "products:list",
            $"products:category:{dto.Category}"
        },
        ct);
}
```

A private `UpdateDbAsync(...)` helper continues to the right, but the right edge is cropped.

#### Study meaning

After changing source data, both the individual product and affected aggregate/list keys must be invalidated.

#### Recall questions

1. Why is the individual product key removed?
2. Which aggregate keys are also removed?
3. Why should database update normally happen before cache invalidation?
### S-008 — RemoveAsync clears the current L1 and shared L2 entry

**Readability:** high  
**Known limits:** the lower half of the class continues in another screenshot

#### Near-literal normalized transcript

HybridCache is a two-level cache, memory plus distributed, with invalidation APIs.

`HybridCache.RemoveAsync(key)` removes an entry by key. The source states that removal affects both the primary and secondary caches.

The example class starts as:

```csharp
using Microsoft.Extensions.Caching.Hybrid;

public sealed class ProductService
{
    private readonly HybridCache _cache;

    public ProductService(HybridCache cache)
        => _cache = cache;
```

The removal code continues in S-007.

#### Study meaning

For the current application instance, a key removal prevents both an L1 hit and a later L2 hit. Cross-node L1 behavior is treated separately in the following sources.

#### Recall questions

1. What does `RemoveAsync(key)` remove on the current instance?
2. Why is multi-instance behavior still a separate concern?
3. Which class receives `HybridCache` through DI?
### S-009 — Two-level cache model and the start of the two-server example

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

HybridCache in a multi-server application consists of two caches:

- **L1** — an in-memory cache inside each server process: fast but local;
- **L2** — a distributed cache such as Redis: slower but shared by all servers.

Invalidating a tag or key can clear L2 for everyone, but it cannot automatically reach into the RAM of other servers unless a cross-node signal exists. Other servers may continue serving a stale value from their L1 until it expires.

Example assumptions:

- Server A and Server B sit behind a load balancer.
- Both use HybridCache with L1 memory and L2 Redis.
- product `123` is cached under key `product:123`.
- L1 TTL is five minutes.

#### Study meaning

The source establishes the difference between shared storage correctness and per-process memory coherence.

#### Recall questions

1. What makes L1 fast but local?
2. Why can clearing Redis not directly clear another process's RAM?
3. What key and TTL are used in the example?
### S-010 — How both servers initially cache the same value

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

**Step 1: first request hits Server A**

`Client → LoadBalancer → A`

- A misses L1.
- A misses Redis.
- A loads the database value: `Price = 10`.
- A stores:
  - `L1(A): product:123 = 10` for five minutes;
  - `Redis(L2): product:123 = 10`.

**Step 2: another request hits Server B**

`Client → LoadBalancer → B`

- B misses L1.
- B hits Redis and gets `10`.
- B stores:
  - `L1(B): product:123 = 10` for five minutes.

Now both servers hold `10` in their own RAM.

#### Study meaning

Server B does not call the database because the shared L2 has the value, but it creates its own independent L1 copy.

#### Recall questions

1. Which layer supplies Server B's first result?
2. How many L1 copies exist after the second request?
3. Which component initially reads from the database?
### S-011 — Data changes and invalidation is executed on one server

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

**Step 3: the price changes to 12**

The database is updated:

```text
Price = 12
```

Then invalidation is called:

```csharp
await hybridCache.RemoveAsync("product:123");
// or RemoveByTagAsync("products")
```

After this call:

- the Redis entry is removed — the shared cache is cleared;
- the server that executed removal clears its own L1;
- the other server's L1 is unchanged.

If invalidation ran on Server A:

- `L1(A)` is cleared;
- Redis is cleared;
- `L1(B)` still contains the old `10` until its five-minute TTL ends.

#### Study meaning

The invalidation operation is correct for shared state and the current node but does not broadcast into Server B's process memory.

#### Recall questions

1. What value is now in the database?
2. Which three cache states result when invalidation runs on A?
3. Why is B's old value still available?
### S-012 — A request routed to the invalidating server sees fresh data

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

After invalidation, a request routed to Server A behaves as follows:

`Client → LB → A`

- A has an L1 miss because its local entry was cleared.
- Redis misses because the distributed entry was cleared.
- A loads the database and gets `12`.
- A returns `12`.

#### Study meaning

The server that performed invalidation obtains and repopulates the new value on its next request.

#### Recall questions

1. Why does A miss both L1 and Redis?
2. Where does A obtain the value 12?
3. What value is returned to the client?
### S-013 — A request routed to the other server can still see stale data

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A request routed to Server B behaves differently:

`Client → LB → B`

- B has an L1 hit and still holds the old value `10`.
- B returns `10`, which is stale.

This occurs because L1 is local RAM. Redis invalidation does not automatically tell every server:

> “Delete `product:123` from your memory cache too.”

A separate signaling mechanism is required for that.

#### Study meaning

This is the core multi-instance consistency gap: the shared cache is correct, but a different node can bypass it with a local hit.

#### Recall questions

1. Why does B not check Redis?
2. Which value does B return?
3. What mechanism is missing if immediate cross-node consistency is required?
### S-014 — Strategies: short L1 TTL or accepting brief staleness

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

**Option 1: keep L1 TTL short for data that must be fresh**

For sensitive data, set L1 TTL to approximately 5–10 seconds.

Example policy:

- L1 TTL: 5 seconds;
- L2 TTL: 5 minutes.

Result:

- L1 still provides speed;
- the maximum stale window across nodes is about five seconds.

**Option 2: accept brief staleness**

For a product list page, news feed, or catalog browsing, being stale for 30–60 seconds may be acceptable. In that case the L1 TTL can remain longer.

#### Study meaning

TTL is a consistency-versus-performance control. The acceptable stale window should reflect the business sensitivity of the data.

#### Recall questions

1. What stale window results from a five-second L1 TTL?
2. Why can L2 use a longer TTL than L1?
3. Give examples of data for which 30–60 seconds of staleness may be acceptable.
### S-015 — Strategies: broadcast invalidation or disable L1

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

**Option 3: cross-node invalidation signals**

Use Redis pub/sub or a message bus.

- When `product:123` is evicted, publish an event such as `invalidate product:123`.
- Every server listens and removes the key from its own L1.
- The stale window becomes close to zero.

This requires infrastructure and is not automatically provided by a basic cache API.

**Option 4: disable L1 for selected keys**

For data that must be consistent:

- do not cache it in L1;
- use only Redis/L2;
- invalidation affects everyone immediately because every server reads Redis.

The trade-off is slower access than RAM but consistent behavior across nodes.

#### Study meaning

Immediate coherence requires either communication between nodes or avoiding process-local copies.

#### Recall questions

1. How does pub/sub reduce the stale window?
2. Why is broadcast invalidation not free?
3. What is the performance trade-off of disabling L1?
### S-016 — Comparison with Output Cache tags

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Output Cache has a similar multi-node issue.

The output-cache store can be:

- an in-memory store per server, which has the same cross-node issue as L1;
- a distributed store, if configured, which is shared.

If the output-cache store is local memory, evicting on Server A does not clear Server B's output-cache entries.

The same principle applies: local caches do not automatically invalidate across nodes.

#### Study meaning

The consistency rule is not unique to HybridCache. Any per-process cache requires expiration, signaling, or avoidance of local caching.

#### Recall questions

1. How does an in-memory output cache resemble HybridCache L1?
2. What changes when the output cache uses distributed storage?
3. State the general cross-node invalidation rule.
### S-017 — One-sentence multi-instance takeaway

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

In a multi-instance application, anything cached in RAM is per server. Invalidating on one server does not guarantee that other servers discard their RAM copy unless:

- RAM TTL is short;
- invalidation is broadcast;
- or RAM caching is avoided for that data.

#### Study meaning

This is the concise rule that should guide L1 policy and consistency expectations.

#### Recall questions

1. What are the three ways listed to limit stale per-server RAM data?
2. Why is shared L2 invalidation alone insufficient?



---

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



---

# HybridCache — R04 boundary result

Generated: 2026-06-29

No separate R04 source region exists after the corrected source-order review.

```text
R01: S-001..S-004
R02: S-005..S-017
R03: S-018..S-021
R04: none
total: 21
```

