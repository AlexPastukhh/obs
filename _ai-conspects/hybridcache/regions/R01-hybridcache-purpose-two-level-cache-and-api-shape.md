# R01 - HybridCache purpose / two-level cache / API shape

Generated: 2026-06-20 08:05:01 UTC

HybridCache is a higher-level cache abstraction that combines a fast local cache with an optional distributed cache and a unified `GetOrCreateAsync` style API.

It reduces repeated cache-aside boilerplate: check cache, compute on miss, store, handle expiration, and coordinate concurrent misses.

This region covers the two-level cache mental model, cache key design, and the main API shape.

