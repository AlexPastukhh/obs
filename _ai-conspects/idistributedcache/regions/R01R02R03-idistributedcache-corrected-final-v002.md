# Corrected semantic transcript — idistributedcache v002

Authoritative source: `source/idistributedcache.svg`  
Corrected coverage: **70 unique screenshots / 72 placements + 23 native SVG labels**

The former transcript was based only on vector labels. The repaired SVG restores the screenshot material containing API summaries, provider setup and complete stampede-protection examples.

---

# R01 — `IDistributedCache` basics, methods, setup and invalidation

`IDistributedCache` is a provider-neutral, byte-oriented cache interface. It allows several application instances to share cache values when they point to the same backend.

Typical providers include:

```text
Redis distributed cache
SQL Server distributed cache
other provider implementations of IDistributedCache
```

This differs from `IMemoryCache`:

```text
IMemoryCache
    lives in one process
    fastest access
    disappears on restart
    is not shared by several app instances

IDistributedCache
    uses an out-of-process provider
    adds network and serialization cost
    can be shared by several app instances
    survives individual application-process restarts
```

## Core methods

```csharp
Task<byte[]?> GetAsync(
    string key,
    CancellationToken cancellationToken = default);

Task SetAsync(
    string key,
    byte[] value,
    DistributedCacheEntryOptions options,
    CancellationToken cancellationToken = default);

Task RefreshAsync(
    string key,
    CancellationToken cancellationToken = default);

Task RemoveAsync(
    string key,
    CancellationToken cancellationToken = default);
```

Synchronous equivalents also exist.

Meaning:

```text
Get / GetAsync
    retrieves bytes or null on a miss
    normally does not deserialize an application object

Set / SetAsync
    stores bytes with expiration options

Refresh / RefreshAsync
    refreshes sliding expiration without fetching the value

Remove / RemoveAsync
    explicitly invalidates one key
```

String helper methods encode and decode UTF-8 strings:

```csharp
GetStringAsync(key);
SetStringAsync(key, json, options);
```

They are convenient but do not remove the need for object serialization, schema compatibility or versioned cache keys.

## Expiration options

```csharp
var options = new DistributedCacheEntryOptions
{
    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
    SlidingExpiration = TimeSpan.FromMinutes(2)
};
```

An absolute expiration places a hard upper bound on lifetime. Sliding expiration extends lifetime when the entry is refreshed or accessed according to provider behavior.

## Redis registration

Representative registration:

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration =
        builder.Configuration.GetConnectionString("Redis");

    options.InstanceName = "myapp:";
});
```

Consumers normally depend on `IDistributedCache` rather than the concrete provider.

## Serialization and key design

```csharp
var json = JsonSerializer.Serialize(value);
await cache.SetStringAsync(key, json, options, cancellationToken);

var cached = await cache.GetStringAsync(key, cancellationToken);
var value = cached is null
    ? default
    : JsonSerializer.Deserialize<T>(cached);
```

Keys should include stable namespaces and payload versions:

```text
product:42:v3
catalog:page:4:v2
tenant:17:user:99:v1
```

A version suffix is often the simplest way to invalidate a whole logical group because `IDistributedCache` does not expose portable tag deletion.

## Explicit invalidation

After a successful mutation:

```csharp
await repository.UpdateAsync(product, cancellationToken);
await cache.RemoveAsync($"product:{product.Id}:v3", cancellationToken);
```

For page or group invalidation, use versioned keys, a catalog-version token or a provider-specific feature.

## Cache is not the system of record

Callers must tolerate:

```text
cache miss
provider timeout
eviction
stale data
serialization failure
schema/version mismatch
```

The database or another durable source remains authoritative.

---

# R02 — `SemaphoreSlim` single-flight and its cleanup race

`IDistributedCache` intentionally has no built-in `GetOrCreate` method. A common extension therefore implements:

```text
fast cache check
per-key gate lookup
wait for gate
second cache check
run factory only on a miss
store value
release gate
```

Representative one-process implementation:

```csharp
private static readonly ConcurrentDictionary<string, SemaphoreSlim>
    Gates = new();

public static async Task<T> GetOrAddAsync<T>(
    this IDistributedCache cache,
    string key,
    Func<CancellationToken, Task<T>> factory,
    DistributedCacheEntryOptions options,
    CancellationToken cancellationToken = default)
{
    var json = await cache.GetStringAsync(key, cancellationToken);
    if (json is not null)
        return JsonSerializer.Deserialize<T>(json)!;

    var gate = Gates.GetOrAdd(
        key,
        static _ => new SemaphoreSlim(1, 1));

    await gate.WaitAsync(cancellationToken);

    try
    {
        json = await cache.GetStringAsync(key, cancellationToken);
        if (json is not null)
            return JsonSerializer.Deserialize<T>(json)!;

        var value = await factory(cancellationToken);

        await cache.SetStringAsync(
            key,
            JsonSerializer.Serialize(value),
            options,
            cancellationToken);

        return value;
    }
    finally
    {
        gate.Release();
    }
}
```

The second cache check is essential. Another waiter may have populated the cache while the current request was waiting.

## Why gates are removed

Keeping one semaphore forever for every distinct key can create unbounded dictionary growth:

```text
user:1
user:2
product:1
search:hash
...
```

The dictionary also retains key strings and semaphore objects.

## The unsafe cleanup heuristic

A tempting cleanup is:

```csharp
gate.Release();

if (gate.CurrentCount == 1)
    Gates.TryRemove(key, out _);
```

This is not an atomic guarantee that nobody is waiting or about to wait.

Possible race:

```text
A releases the old gate
A observes CurrentCount == 1
B already holds a reference to the old gate
A removes the dictionary entry
C arrives and creates a new gate
B and C may now use two different gates for the same cache key
```

For a short period, the process no longer has one unique synchronization object for that key.

This does not always produce two factory calls because the second cache check may still find the value. Duplicate factories become possible when the cache was not populated, visibility is delayed, the provider fails, serialization fails or the factory throws.

## Failure case

```csharp
var value = await factory(cancellationToken); // may throw
await cache.SetStringAsync(key, Serialize(value), options, cancellationToken);
```

If the factory or cache write throws, the `finally` block still releases and may remove the gate, but there is no cache value. Another request may legitimately create a new gate and run the factory again.

Therefore:

```text
“gate removed” does not prove “cache populated”
CurrentCount is not a complete lifecycle reference count
cleanup is a heuristic unless ownership/waiter tracking is atomic
```

## Better cleanup choices

- retain gates in a bounded or evicting in-memory cache;
- maintain an explicit reference-counted gate holder;
- accept a small per-key dictionary for a bounded keyspace;
- use `Lazy<Task<T>>` as a single-flight holder;
- use a distributed lock when coordination must span processes.

A per-process semaphore protects only one process. Several application replicas still each have their own dictionary and can all call the factory.

---

# R03 — `Lazy<Task<T>>` single-flight and multi-instance behavior

A dictionary of in-flight tasks can express the intended rule more directly:

```text
for one key, one caller creates the task
all other callers await that same task
the completed/failed in-flight entry is removed
the durable result remains in the distributed cache
```

Representative shape:

```csharp
private static readonly ConcurrentDictionary<string, Lazy<Task<object>>>
    InFlight = new();

public static async Task<T> GetOrAddSingleFlightAsync<T>(
    IDistributedCache cache,
    string key,
    Func<CancellationToken, Task<T>> factory,
    DistributedCacheEntryOptions options,
    CancellationToken cancellationToken)
{
    var cached = await cache.GetStringAsync(key, cancellationToken);
    if (cached is not null)
        return JsonSerializer.Deserialize<T>(cached)!;

    Lazy<Task<object>> lazy = InFlight.GetOrAdd(
        key,
        _ => new Lazy<Task<object>>(
            async () =>
            {
                var second = await cache.GetStringAsync(
                    key,
                    cancellationToken);

                if (second is not null)
                    return JsonSerializer.Deserialize<T>(second)!;

                var value = await factory(cancellationToken);

                await cache.SetStringAsync(
                    key,
                    JsonSerializer.Serialize(value),
                    options,
                    cancellationToken);

                return value!;
            },
            LazyThreadSafetyMode.ExecutionAndPublication));

    try
    {
        return (T)await lazy.Value;
    }
    finally
    {
        InFlight.TryRemove(
            new KeyValuePair<string, Lazy<Task<object>>>(key, lazy));
    }
}
```

The compare-and-remove form avoids deleting a newer in-flight entry created after the current one.

## Exception and cancellation policy

A shared task also shares its result, exception and often its cancellation behavior. The implementation must decide:

```text
Should one caller's cancellation cancel the shared factory?
Should the factory use a service-level token instead?
Should failed tasks be removed immediately?
May later callers retry after failure?
```

A common policy is to remove a failed or completed in-flight entry so a later miss can retry.

## Process-local versus distributed single-flight

```text
SemaphoreSlim dictionary
Lazy<Task<T>> dictionary
    coordinate callers only inside one process

Redis/provider distributed lock
    can coordinate callers across application replicas
```

Even with a distributed lock, duplicate work can occur after lease expiry, process failure or network partition. The factory should therefore be idempotent when possible, and the system should tolerate repeated computation.

---

# Corrected coverage

```text
previous image uses: 0
corrected image uses: 72
corrected unique screenshots: 70
recovered missing image uses: 72
native SVG labels: 23
duplicate extra placements: 2

processed image uses: 72
processed text labels: 23
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
