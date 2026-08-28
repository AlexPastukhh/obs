# Knowledge Registry

Source workspace: `_ai-conspects/idistributedcache/`

Authoritative processed source: `02-corrected-semantic-transcript-v002.md` (identical regional copy: `regions/R01R02R03-idistributedcache-corrected-final-v002.md`)

Original SVG: `source/idistributedcache.svg`

Evidence and coverage: `data/final-coverage-audit-v002.json`; 72 of 72 image uses and 23 of 23 native SVG labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01 provider-neutral byte/string cache contract and the process, restart, sharing and cost boundary versus `IMemoryCache` | `aspnet-core` | `aspnet-core.distributed-cache-storage-and-invalidation` | `../_knowledge/aspnet-core/distributed-cache-storage-and-invalidation.md` | MAPPED |
| R01 get/set/refresh/remove methods, UTF-8 helpers and application-owned serialization/schema compatibility | `aspnet-core` | `aspnet-core.distributed-cache-storage-and-invalidation` | `../_knowledge/aspnet-core/distributed-cache-storage-and-invalidation.md` | MAPPED |
| R01 absolute/sliding expiration and representative Redis provider registration behind `IDistributedCache` | `aspnet-core` | `aspnet-core.distributed-cache-storage-and-invalidation` | `../_knowledge/aspnet-core/distributed-cache-storage-and-invalidation.md` | MAPPED |
| R01 namespaced/versioned key design, post-mutation exact invalidation and portable group-invalidation limits | `aspnet-core` | `aspnet-core.distributed-cache-storage-and-invalidation` | `../_knowledge/aspnet-core/distributed-cache-storage-and-invalidation.md` | MAPPED |
| R01 durable source-of-truth boundary and tolerance of miss, timeout, eviction, staleness and serialization/version failures | `aspnet-core` | `aspnet-core.distributed-cache-storage-and-invalidation` | `../_knowledge/aspnet-core/distributed-cache-storage-and-invalidation.md` | MAPPED |
| R02 per-key `SemaphoreSlim` cache fill, double-check sequence and representative implementation | `dotnet` | `dotnet.per-key-async-single-flight` | `../_knowledge/dotnet/per-key-async-single-flight.md` | MAPPED |
| R02 gate-map growth, non-atomic `CurrentCount` cleanup race and two-gates-for-one-key timeline | `dotnet` | `dotnet.per-key-async-single-flight` | `../_knowledge/dotnet/per-key-async-single-flight.md` | MAPPED |
| R02 factory/cache-write failure boundary and bounded, reference-counted or retained-gate cleanup choices | `dotnet` | `dotnet.per-key-async-single-flight` | `../_knowledge/dotnet/per-key-async-single-flight.md` | MAPPED |
| R03 `Lazy<Task<T>>` shared in-flight computation, `ExecutionAndPublication` and compare-and-remove lifecycle | `dotnet` | `dotnet.per-key-async-single-flight` | `../_knowledge/dotnet/per-key-async-single-flight.md` | MAPPED |
| R03 shared result/exception/cancellation policy and retry-after-failure decision | `dotnet` | `dotnet.per-key-async-single-flight` | `../_knowledge/dotnet/per-key-async-single-flight.md` | MAPPED |
| R02-R03 process-local coordination versus distributed locks, lease/failure/partition limits and idempotent-work boundary | `dotnet` | `dotnet.per-key-async-single-flight` | `../_knowledge/dotnet/per-key-async-single-flight.md` | MAPPED |
| Source inventory, recovered placements, duplicate accounting and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Storage, expiration, serialization, key ownership and invalidation remain in the ASP.NET Core distributed-cache unit.
- Gate ownership, shared-task lifecycle and process-local single-flight form a reusable .NET concurrency unit rather than a provider-specific Redis unit.
- The detailed race and shared-task mechanics are not collapsed into the existing IMemoryCache overview; that unit remains related but does not replace this source's complete lifecycle explanation.

| Status | Count |
|---|---:|
| MAPPED | 11 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
