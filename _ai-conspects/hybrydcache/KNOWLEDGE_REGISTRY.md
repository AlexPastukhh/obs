# Knowledge Registry

Source workspace: `_ai-conspects/hybrydcache/`

Authoritative processed sources: `04-stage4-corrected-source-preserving-transcript.md`; `CURRENT_SOURCE_OF_TRUTH.md`

Exact source: `source/hybrydcache.svg` is present on the current branch. The corrected source of truth reports 21 total image uses, 21 near-literal source blocks, 0 problem image uses, and 0 uncovered image uses.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 S-001: controller injection of `HybridCache`, stable `product:{id}` key, cache-miss factory, `ProductDto` result shape, and request/factory cancellation propagation | `dotnet.hybridcache-registration-getorcreate-and-single-flight` | `dotnet` | `../_knowledge/dotnet/hybridcache-registration-getorcreate-and-single-flight.md` | MAPPED |
| R01 S-002/S-003: Redis connection string, Redis and HybridCache packages, `AddStackExchangeRedisCache`, `InstanceName = "myapp:"`, `AddHybridCache()`, and Redis as distributed L2 | `dotnet.hybridcache-registration-getorcreate-and-single-flight` | `dotnet` | `../_knowledge/dotnet/hybridcache-registration-getorcreate-and-single-flight.md` | MAPPED |
| R01 S-004: per-key GetOrCreateAsync stampede protection/single-flight, one factory for 200 simultaneous same-key misses, and backing-service load-spike prevention | `dotnet.hybridcache-registration-getorcreate-and-single-flight` | `dotnet` | `../_knowledge/dotnet/hybridcache-registration-getorcreate-and-single-flight.md` | MAPPED |
| R02 S-005: shared L2 versus process-local L1 invalidation boundary and the short-TTL/tolerated-staleness/broadcast-signal strategy set | `dotnet.hybridcache-multi-instance-l1-l2-coherence` | `dotnet` | `../_knowledge/dotnet/hybridcache-multi-instance-l1-l2-coherence.md` | MAPPED |
| R02 S-006: assigning broad/category tags during GetOrCreateAsync and group invalidation through `RemoveByTagAsync` | `dotnet.hybridcache-key-tag-invalidation` | `dotnet` | `../_knowledge/dotnet/hybridcache-key-tag-invalidation.md` | MAPPED |
| R02 S-007/S-008: database-update-before-invalidation flow, individual and aggregate key removal, `RemoveAsync` primary/secondary behavior on the current instance, and multi-instance caveat | `dotnet.hybridcache-key-tag-invalidation` | `dotnet` | `../_knowledge/dotnet/hybridcache-key-tag-invalidation.md` | MAPPED |
| R02 S-009/S-010: two-level L1/L2 model, Server A/Server B initial population, local five-minute copies, and Server B obtaining its first value from shared Redis | `dotnet.hybridcache-multi-instance-l1-l2-coherence` | `dotnet` | `../_knowledge/dotnet/hybridcache-multi-instance-l1-l2-coherence.md` | MAPPED |
| R02 S-011/S-012/S-013: database price 10->12 transition, invalidation on A clearing L1(A)+Redis but not L1(B), fresh request path on A, and stale local-hit path on B | `dotnet.hybridcache-multi-instance-l1-l2-coherence` | `dotnet` | `../_knowledge/dotnet/hybridcache-multi-instance-l1-l2-coherence.md` | MAPPED |
| R02 S-014: L1 TTL as consistency/performance control, example 5-second L1 plus 5-minute L2, and acceptable 30–60 second staleness for less-sensitive catalog/feed data | `dotnet.hybridcache-multi-instance-l1-l2-coherence` | `dotnet` | `../_knowledge/dotnet/hybridcache-multi-instance-l1-l2-coherence.md` | MAPPED |
| R02 S-015: Redis pub/sub/message-bus invalidation broadcast and disabling L1 for consistency-sensitive data, including infrastructure/performance trade-offs | `dotnet.hybridcache-multi-instance-l1-l2-coherence` | `dotnet` | `../_knowledge/dotnet/hybridcache-multi-instance-l1-l2-coherence.md` | MAPPED |
| R02 S-016/S-017: Output Cache analogy and general rule that per-process RAM is not cross-node coherent without short TTL, broadcast invalidation, or avoiding local caching | `dotnet.hybridcache-multi-instance-l1-l2-coherence` | `dotnet` | `../_knowledge/dotnet/hybridcache-multi-instance-l1-l2-coherence.md` | MAPPED |
| R03 S-018/S-019: conceptual tag index/versioning bookkeeping, tags established at write time, and later group invalidation without caller-maintained key lists | `dotnet.hybridcache-key-tag-invalidation` | `dotnet` | `../_knowledge/dotnet/hybridcache-key-tag-invalidation.md` | MAPPED |
| R03 S-020: `HybridCacheEntryFlags.DisableLocalCache` disables both local reads and writes for a call/key; permissions example and five-minute expiration | `dotnet.hybridcache-local-cache-flags` | `dotnet` | `../_knowledge/dotnet/hybridcache-local-cache-flags.md` | MAPPED |
| R03 S-021: `DisableLocalCacheRead` and `DisableLocalCacheWrite` provide one-way L1 controls and allow asymmetric stale-read/fresh-write policies | `dotnet.hybridcache-local-cache-flags` | `dotnet` | `../_knowledge/dotnet/hybridcache-local-cache-flags.md` | MAPPED |
| Corrected region-boundary bookkeeping, superseded 8/8/5 partition, R04-empty result, screenshot UI cleanup notes, coverage counts, and recall-question metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- No new topic is introduced. HybridCache is a .NET caching API under `Microsoft.Extensions.Caching.Hybrid`, so its durable mechanics extend the existing `dotnet` topic. ASP.NET Core registration/controller examples are preserved inside the units rather than forcing the library into a separate framework topic.
- R01 becomes one setup/GetOrCreate/single-flight unit because registration, stable key/factory flow, cancellation propagation, and per-key stampede protection are one cache-fill lifecycle.
- Key invalidation and tag invalidation are one unit. S-018/S-019 tag bookkeeping belongs there because it explains how the public group-invalidation contract is established and consumed.
- R02's multi-server scenario is retained as one coherence unit rather than split by screenshot. The 10->12 example, TTL policy, pub/sub strategy, disable-L1 strategy, and Output Cache analogy all explain the same shared-L2/process-local-L1 boundary.
- R03 S-020/S-021 form an independent local-cache-flags unit because read/write suppression is a reusable API control with finer semantics than the higher-level coherence strategy.
- Crop limitations in S-001, S-007, and S-008 are provenance/readability metadata only. The readable claims mapped here are fully represented and do not require an `UNRESOLVED` learning status.
- The earlier Stage3 8/8/5 region partition is superseded by the corrected source-order boundary in the current SOT: R01 S-001..S-004, R02 S-005..S-017, R03 S-018..S-021, R04 none.

| Status | Count |
|---|---:|
| MAPPED | 14 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
