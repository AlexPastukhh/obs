# Regional transcript — R02: SemaphoreSlim throttling and bounded concurrency

Conspect: `async processing of multiple calls,parallelism`  
Generated: 2026-06-27 04:00:00 UTC

## Coverage

```text
region: R02
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 3
remaining image uses: 0
```

## Semantic transcript

`SemaphoreSlim` is a general asynchronous gate. It limits how many operations may be in flight while preserving the normal task-based composition model.

## Core pattern

- Create a semaphore with `maxConcurrency` permits.
- Each operation awaits `WaitAsync(cancellationToken)` before starting the expensive I/O call.
- Release the permit in `finally` so exceptions and cancellation cannot leak capacity.
- Create one task per input and await the complete set with `Task.WhenAll`.

## What the gate controls

- The semaphore limits active operations, not the number of task objects already allocated.
- Waiting tasks do not block threads because `WaitAsync` is asynchronous.
- The same gate can throttle several call types that share one downstream capacity limit.

## Result behavior

- `Task.WhenAll<TResult>` returns an array whose positions correspond to the input task sequence.
- Completion order does not change result order.
- Per-item code can return `null`, a result wrapper or a discriminated success/failure value for best-effort processing.

## Lifetime

- A method-local gate can be disposed after all tasks complete.
- A shared service-level gate can be reused for a stable downstream limit and disposed with the owning service.
- The selected concurrency value must respect sockets, database connection pools, remote rate limits and application memory.

## Caveats

- The simple `Select` plus `WhenAll` pattern still allocates one task/closure per input.
- A semaphore does not automatically stop sibling tasks when one task fails.

## Nearby SVG labels used for orientation

- parallel calls
- Sepaphoreslim
- 1 IF YOU NEED TO PRESERVE TASK ORDER
- 4 IF THE NUMBER OF TASKS NOT TOO LARGE(ALLOCATES EACH TASK)
- FAIL)
- 3 IF YOU WANT BEST EFFORT(NO CANCELLATOIN OF FURTHER TASKS ON

## Covered screenshot uses

```text
IU-081, IU-082, IU-083
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
Repeated placements remain separate coverage units because they occur separately on the SVG canvas.
The source screenshots remain authoritative for exact code punctuation.
