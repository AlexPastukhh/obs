# Regional transcript — R05: Parallel.ForEach, Task.WaitAll and sync-over-async

Conspect: `async processing of multiple calls,parallelism`  
Generated: 2026-06-27 04:00:00 UTC

## Coverage

```text
region: R05
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Synchronous parallel APIs are designed for CPU-bound work. Using them around asynchronous I/O either loses the task or blocks ThreadPool threads.

## Why Parallel.ForEach is wrong for async I/O

- `Parallel.ForEach` expects a synchronous delegate and schedules iterations on worker threads.
- Passing an async lambda to an `Action<T>` produces `async void`, so completion and exceptions are not tracked normally.
- Calling `.Result`, `.Wait()` or `GetAwaiter().GetResult()` turns asynchronous I/O into a blocking wait.
- Threads then sit idle while the remote system performs the actual work.

## Server impact

- Blocked ThreadPool threads cannot process unrelated requests.
- Under load, additional threads are injected slowly and thread-pool starvation increases latency.
- The result can be timeouts and throughput collapse even though CPU usage is not high.

## Task.WaitAll

- `Task.WaitAll` blocks the calling thread until every task finishes.
- In request-processing code, use `await Task.WhenAll` so the request thread can return to the pool.
- Synchronous waiting is mainly reserved for strictly synchronous boundaries where async propagation is impossible and the risk is understood.

## Appropriate Parallel.ForEach use

- Use it for CPU-bound in-memory work such as image transforms, compression, hashing or numerical computation.
- Read external data asynchronously first, then parallelize the CPU-heavy transformation if measurement shows a benefit.
- Do not equate multiple I/O operations with multiple threads.

## Caveats

- Async concurrency can overlap I/O with very few active threads.
- Parallelism means simultaneous execution; concurrency means multiple operations making progress over overlapping time.

## Nearby SVG labels used for orientation

- of db calls
- not parallel lack of work in case
- TaskWailtAll
- THread is being blocked

## Covered screenshot uses

```text
IU-034, IU-036, IU-038, IU-040
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
Repeated placements remain separate coverage units because they occur separately on the SVG canvas.
The source screenshots remain authoritative for exact code punctuation.
