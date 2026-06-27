# Regional transcript — R04: Parallel.ForEachAsync behavior and result collection

Conspect: `async processing of multiple calls,parallelism`  
Generated: 2026-06-27 04:00:00 UTC

## Coverage

```text
region: R04
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 3
remaining image uses: 0
```

## Semantic transcript

`Parallel.ForEachAsync` is an async-aware bounded worker loop. It is concurrency for asynchronous operations rather than CPU parallelism in the classic sense.

## Execution model

- `ParallelOptions.MaxDegreeOfParallelism` caps the number of concurrently active bodies.
- The framework obtains items from the source as worker capacity becomes available.
- The body receives a cancellation token and returns a `ValueTask`/async completion.
- Awaiting I/O yields the worker rather than occupying a thread with blocking wait.

## Result strategies

- Use `ConcurrentBag<T>` or another concurrent collection when order is irrelevant.
- Use a pre-sized result array and write by captured index when order must be reconstructed.
- Use a lock only around the smallest necessary mutation.
- Do not append concurrently to a normal `List<T>`.

## Database calls

- Bound concurrency to the database connection pool and database capacity, not merely CPU count.
- Do not execute concurrent operations through the same EF Core `DbContext`; create independent contexts/units of work per concurrent operation.
- A high degree of concurrency can reduce throughput by increasing lock contention, pool waits and server load.

## Caveats

- The API does not return per-item results directly.
- Completion order is nondeterministic.

## Nearby SVG labels used for orientation

- Parallel.Foreachasync
- of db calls
- not parallel lack of work in case

## Covered screenshot uses

```text
IU-045, IU-047, IU-049
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
Repeated placements remain separate coverage units because they occur separately on the SVG canvas.
The source screenshots remain authoritative for exact code punctuation.
