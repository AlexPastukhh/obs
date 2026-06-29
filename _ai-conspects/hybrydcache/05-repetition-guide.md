# HybridCache — repetition guide

Generated: 2026-06-29

## Mental model

1. L1 is in-process memory and exists independently on each server.
2. L2 is distributed storage such as Redis and is shared.
3. `GetOrCreateAsync` checks caches and invokes the factory on a miss.
4. Stampede protection runs one factory per key while concurrent callers wait.
5. `RemoveAsync` clears the current node's L1 and the shared L2 entry.
6. Other nodes may still have stale L1 copies.
7. Tags provide logical group invalidation.
8. Immediate cross-node L1 consistency requires short TTL, broadcast invalidation, or no L1.
9. `HybridCacheEntryFlags` can disable local read, local write, or the whole local layer.

## High-value questions

1. Trace the exact read path for a cold key on Server A and then Server B.
2. Explain why Server B can return stale data after Server A invalidates the key.
3. Compare short L1 TTL, pub/sub invalidation, and disabling L1.
4. Explain how stampede protection changes 200 concurrent cache misses.
5. Compare `RemoveAsync` and `RemoveByTagAsync`.
6. Explain the role of tag-to-entry bookkeeping.
7. Compare `DisableLocalCache`, `DisableLocalCacheRead`, and `DisableLocalCacheWrite`.
8. Design a cache policy for permissions, catalog browsing, and stock quantity.
9. Explain how L1 TTL and L2 TTL should differ for sensitive and insensitive data.
10. Compare the HybridCache multi-node problem with in-memory Output Cache.

## Coding prompts

1. Build the Redis + HybridCache registration shown in the transcript.
2. Implement a product controller using `GetOrCreateAsync`.
3. Implement update-and-invalidate logic for one product and related lists.
4. Add category tags and invalidate a category.
5. Configure a permission lookup that bypasses L1.
6. Sketch a pub/sub invalidation listener for all application nodes.
