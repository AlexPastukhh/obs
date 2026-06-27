# Regional transcript — R07: Failures, cancellation, ordering and the selection guide

Conspect: `async processing of multiple calls,parallelism`  
Generated: 2026-06-27 04:00:00 UTC

## Coverage

```text
region: R07
image uses processed: 28 / 28
unique screenshots represented: 28
repeated placements retained: 4
remaining image uses: 0
```

## Semantic transcript

This region consolidates the comparison into operational rules for production code: how to collect results, how failure propagates and how to choose an API.

## Best effort versus fail the operation

- Best-effort processing catches exceptions inside each item and returns an outcome that records success or failure.
- This allows every item to run while preserving a complete error report.
- A fail-the-operation design lets an exception propagate and optionally cancels a linked token to reduce further work.

## Task.WhenAll exception handling

- All supplied tasks continue unless cancellation is requested explicitly.
- After completion, each task exposes its own status and exception.
- The exception rethrown by `await` should not be treated as the only available failure; inspect tasks or return result wrappers when all errors matter.

## Parallel.ForEachAsync failure handling

- An unhandled iteration failure faults the overall operation and typically stops further scheduling.
- Already-running iterations may still complete or observe cancellation.
- Catching inside the loop is required for best-effort semantics.

## Cancellation

- `Parallel.ForEachAsync` accepts cancellation through `ParallelOptions`.
- Semaphore code must pass the token to both `WaitAsync` and the underlying operation.
- Always release an acquired semaphore permit in `finally`; do not release when acquisition itself failed.

## Final decision matrix

- Semaphore plus `WhenAll`: easiest ordered results, task composition and per-item outcomes.
- `Parallel.ForEachAsync`: fewer task allocations for large sources and convenient bounded worker scheduling.
- `Parallel.ForEach`: CPU-bound synchronous parallel work only.
- `Task.WaitAll`: blocking API; avoid on an asynchronous server path.

## Caveats

- Cancellation is cooperative and cannot undo completed remote side effects.
- A shared result collection must match the selected concurrency pattern.

## Nearby SVG labels used for orientation

- Can be used on a client but cant be used on a server
- TaskWailtAll
- THread is being blocked
- For demo purposes reverse results order(performing some operations with when all operations completed)

## Covered screenshot uses

```text
IU-027, IU-028, IU-031, IU-032, IU-033, IU-035, IU-037, IU-039, IU-041, IU-042, IU-043, IU-044, IU-046
IU-048, IU-050, IU-051, IU-052, IU-053, IU-054, IU-055, IU-056, IU-057, IU-058, IU-059, IU-061, IU-062
IU-063, IU-064
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
Repeated placements remain separate coverage units because they occur separately on the SVG canvas.
The source screenshots remain authoritative for exact code punctuation.
