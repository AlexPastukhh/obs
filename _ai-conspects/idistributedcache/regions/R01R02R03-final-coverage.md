# idistributedcache — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — cache-stampede protection with SemaphoreSlim and Lazy

A per-key `SemaphoreSlim` can reduce duplicate factory work inside one process, but the gate lifecycle is the difficult part. The correct pattern is: check the cache, acquire the key gate, check the cache again, run the factory, store the value, then release the gate. The second cache check is necessary because another caller may have filled the cache while this caller waited.

Removing a semaphore from a dictionary too early can allow a new semaphore to be created while callers are still associated with the old one, causing two factories to run. A failed factory also leaves no cache value, so a subsequent caller may legitimately retry. Error handling must distinguish a planned retry from an accidental second gate.

A dictionary of `Lazy<Task<T>>` or another single-flight abstraction can make one-process coalescing easier: all callers await the same task, and a failed entry is removed so the next request can retry. Neither `SemaphoreSlim` nor in-memory `Lazy` protects against stampedes across multiple application instances; cross-instance protection requires a distributed lock, provider-native primitive, or a design that tolerates duplicate work.

**Covered source labels:** `T-002, T-003, T-004, T-006, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023`

## R02 — IDistributedCache basics, setup and removal

`IDistributedCache` is a provider-neutral byte-oriented cache abstraction. Core operations read, write, refresh sliding expiration, and remove entries, with synchronous and asynchronous forms. String helpers are convenience wrappers; structured objects still need explicit serialization and versioning.

Entry options can use absolute expiration, relative absolute expiration, and sliding expiration. A distributed provider—such as Redis or another configured backend—allows multiple application instances to see the same cache. The cache is not a system of record: callers must handle misses, provider failures, stale values, serialization changes, and eviction.

Use `Remove` / `RemoveAsync` for explicit invalidation. Configure the provider and connection independently from the application’s cache-access service, and include a key-naming/version strategy to prevent collisions and incompatible payload reuse.

**Covered source labels:** `T-001, T-005, T-007, T-008`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
