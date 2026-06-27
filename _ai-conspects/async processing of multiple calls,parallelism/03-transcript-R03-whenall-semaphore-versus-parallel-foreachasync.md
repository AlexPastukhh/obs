# Regional transcript — R03: Task.WhenAll plus SemaphoreSlim versus Parallel.ForEachAsync

Conspect: `async processing of multiple calls,parallelism`  
Generated: 2026-06-27 04:00:00 UTC

## Coverage

```text
region: R03
image uses processed: 8 / 8
unique screenshots represented: 8
repeated placements retained: 8
remaining image uses: 0
```

## Semantic transcript

Both approaches provide bounded asynchronous concurrency. The main differences are allocation shape, result collection, ordering, failure policy and composition.

## Shared purpose

- Both can cap active I/O operations at a configured degree of concurrency.
- Both can await asynchronous work without blocking worker threads.
- Both require explicit coordination when the body mutates shared state.

## Allocation and backpressure

- `Select` plus a semaphore commonly creates one task per input immediately, even though only a few pass the gate.
- `Parallel.ForEachAsync` maintains a small set of worker loops and pulls additional items as capacity becomes available.
- For very large sequences, worker-driven enumeration usually holds fewer task objects and closures in memory.
- For tens or hundreds of inputs, the simpler task-per-item pattern is often perfectly adequate.

## Result collection

- `Task.WhenAll<TResult>` naturally aggregates returned values without concurrent writes to a shared collection.
- `Parallel.ForEachAsync` is oriented toward side effects and returns a single completion task.
- Results from `Parallel.ForEachAsync` require a thread-safe collection, a lock, a pre-sized array indexed by input position or another explicit aggregation design.

## Ordering

- `Task.WhenAll` preserves the ordering of the input task sequence in its result array.
- `Parallel.ForEachAsync` processes and completes items in nondeterministic order.
- Stable output order with `Parallel.ForEachAsync` requires indexing or a later sort/reconstruction step.

## Failure and cancellation

- Awaiting `Task.WhenAll` waits for all supplied tasks to reach a terminal state; failed tasks are available for inspection afterward.
- The semaphore itself only throttles and has no failure-propagation policy.
- `Parallel.ForEachAsync` normally stops scheduling more work after failure/cancellation propagates, although already-running iterations may still finish.
- For deliberate fail-fast behavior with task-per-item code, link a cancellation source and cancel it when the first failure is observed.

## Selection guide

- Prefer semaphore plus `WhenAll` for ordered returned results, per-task failure wrappers and composition with other task combinators.
- Prefer `Parallel.ForEachAsync` for very large streams, side-effect-oriented bodies and worker-driven bounded enumeration.
- Use a lower-level pipeline or channel when true producer/consumer backpressure, streaming results or multiple stages are required.

## Caveats

- `Parallel.ForEachAsync` is available in .NET 6 and later.
- Neither approach makes an unsafe dependency, such as one shared EF Core `DbContext`, safe for concurrent use.

## Nearby SVG labels used for orientation

- 4 IF YOU NEED CANCEL FURTHER TASKS ON FIRST FAIL
- 3 IF YOU NEED TO RUN A LOT OF TASKS
- (YOU MIGHT NEED THREAD SAFE COLLECTION OF RESULTS IF YOU NEED )
- 4 IF THE NUMBER OF TASKS NOT TOO LARGE(ALLOCATES EACH TASK)
- FAIL)

## Covered screenshot uses

```text
IU-070, IU-071, IU-072, IU-073, IU-074, IU-075, IU-076, IU-077
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
Repeated placements remain separate coverage units because they occur separately on the SVG canvas.
The source screenshots remain authoritative for exact code punctuation.
