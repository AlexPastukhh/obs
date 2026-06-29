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

