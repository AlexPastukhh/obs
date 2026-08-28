# Knowledge Registry

Source: `regions/R01R09-full-svg-reconciliation-v002.md`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| 429/423 boundary, advisory Retry-After, IsAcquired/optional lease metadata and rejection formatting | `http.rate-limit-responses-and-retry-after` | `http` | `../_knowledge/http/rate-limit-responses-and-retry-after.md` | MAPPED |
| Fixed-window/token-bucket/concurrency algorithms, queued-volume caveat and chained/global/endpoint policies | `aspnet-core.rate-limiter-policies-and-endpoint-middleware` | `aspnet-core` | `../_knowledge/aspnet-core/rate-limiter-policies-and-endpoint-middleware.md` | MAPPED |
| Registration, middleware order, endpoint metadata, rejection callback and partition boundary | `aspnet-core.rate-limiter-policies-and-endpoint-middleware` | `aspnet-core` | `../_knowledge/aspnet-core/rate-limiter-policies-and-endpoint-middleware.md` | MAPPED |
| Identity lockout options/success reset and manual lockout state, failure-only counting, concurrency/audit trade-offs | `aspnet-core.account-lockout-and-failed-login-throttling` | `aspnet-core` | `../_knowledge/aspnet-core/account-lockout-and-failed-login-throttling.md` | MAPPED |
| Multiplexer/IDatabase lifetime and Redis structure/command semantics | `redis.connection-and-data-structures`; `redis.values-and-command-atomicity` | `redis` | `../_knowledge/redis/connection-and-data-structures.md`; `../_knowledge/redis/values-and-command-atomicity.md` | MERGED |
| IDistributedCache portability versus Redis atomics, expiring counters and lost-update/TTL races | `redis.expiring-counters-portability-and-distributed-throttling` | `redis` | `../_knowledge/redis/expiring-counters-portability-and-distributed-throttling.md` | MAPPED |
| Per-instance limiter state and layered local/Redis/Identity protection | `aspnet-core.rate-limiter-policies-and-endpoint-middleware`; `redis.expiring-counters-portability-and-distributed-throttling` | `aspnet-core`; `redis` | `../_knowledge/aspnet-core/rate-limiter-policies-and-endpoint-middleware.md`; `../_knowledge/redis/expiring-counters-portability-and-distributed-throttling.md` | MAPPED |
| Cache stampede, local per-key single-flight and cross-instance coordination | `aspnet-core.imemorycache-expiration-invalidation-and-stampede` | `aspnet-core` | `../_knowledge/aspnet-core/imemorycache-expiration-invalidation-and-stampede.md` | MERGED |
| Browser-title fragment | — | — | — | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
