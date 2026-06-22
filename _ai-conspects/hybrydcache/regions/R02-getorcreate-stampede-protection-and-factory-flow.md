# R02 - GetOrCreate / stampede protection / factory flow

Generated: 2026-06-20 08:05:01 UTC

`GetOrCreateAsync` checks the cache first and runs a factory only on miss. The factory is the expensive operation, such as a database query, HTTP call, or computation.

A key value of HybridCache is stampede protection: if many requests miss the same key, one factory run can serve the group instead of hammering the backing store.

This region covers factory behavior, cancellation/error handling, expiration options, and the single-flight mental model.

