# Knowledge Registry

Source workspace: `_ai-conspects/redis-multiplexer-redis-lock/`

Authoritative processed sources: verified region transcripts R01 through R04; `03-stage3-final-coverage-audit.md` confirms 24/24 image uses covered. `CURRENT_SOURCE_OF_TRUTH.md` has stale P02/final-audit status, so it is not used to downgrade the physically present completed regions.

Original SVG: `source/redis-multiplexer-redis-lock.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 temporary counters/cache/TTL use cases, database hot-path cost and durable DB versus operational Redis ownership | `redis.expiring-counters-portability-and-distributed-throttling` | `redis` | `../_knowledge/redis/expiring-counters-portability-and-distributed-throttling.md` | MERGED |
| R02 shared multiplexer lifetime, lightweight `IDatabase`, Redis command surface, `IDistributedCache` portability limits and service-wrapper boundary | `redis.expiring-counters-portability-and-distributed-throttling` | `redis` | `../_knowledge/redis/expiring-counters-portability-and-distributed-throttling.md` | MERGED |
| R03 lost-update timeline, atomic increment, first-count expiry, two-command crash gap, TTL recovery/script choices and application-owned threshold policy | `redis.expiring-counters-portability-and-distributed-throttling` | `redis` | `../_knowledge/redis/expiring-counters-portability-and-distributed-throttling.md` | MERGED |
| R04 cache-stampede causal flow and rebuild/wait/stale/fail-fast strategy | `redis.cache-stampede-and-token-owned-locks` | `redis` | `../_knowledge/redis/cache-stampede-and-token-owned-locks.md` | MAPPED |
| R04 `SET NX PX`, unique owner token, atomic compare-and-delete release and short/long TTL failure modes | `redis.cache-stampede-and-token-owned-locks` | `redis` | `../_knowledge/redis/cache-stampede-and-token-owned-locks.md` | MAPPED |
| R04 suitable versus correctness-critical lock use cases and single-instance versus RedLock boundary | `redis.cache-stampede-and-token-owned-locks` | `redis` | `../_knowledge/redis/cache-stampede-and-token-owned-locks.md` | MAPPED |

Boundary decision: the counter/access material is genuinely already owned by the existing expiring-counter unit and was extended rather than duplicated. Stampede locks form an independent coordination model and receive their own unit.

| Status | Count |
|---|---:|
| MAPPED | 3 |
| MERGED | 3 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
