# Regional transcript — R01: Task creation, hot tasks and when work starts

Conspect: `async processing of multiple calls,parallelism`  
Generated: 2026-06-27 04:00:00 UTC

## Coverage

```text
region: R01
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 3
remaining image uses: 0
```

## Semantic transcript

This region separates creating an enumerable of async delegates from actually invoking an async operation. Most .NET I/O APIs return hot tasks: the request starts when the method is called, not when the returned task is awaited.

## Deferred LINQ task creation

- `urls.Select(async url => await client.GetAsync(url))` creates a deferred `IEnumerable<Task<...>>`.
- No selector body runs until the sequence is enumerated.
- `Task.WhenAll(tasks)`, `ToList()` or a `foreach` enumerates the sequence and invokes the async selector for every item.
- Each selector runs synchronously until its first incomplete `await`; by that point the I/O call has normally already been issued.

## Eager task creation

- A normal `foreach` that calls `GetAsync` and adds the returned task to a list starts each request during the loop.
- Awaiting later does not delay the start of a hot task; it only observes its eventual completion.
- The important question is when the async method is invoked, not when the task object is stored or awaited.

## Practical consequence

- Building a task collection can itself start all operations immediately.
- For a large input, eager creation can create unbounded concurrency unless a throttle is applied.
- Materialize a deferred task sequence once if it must not be enumerated more than once.

## Caveats

- Custom APIs can return cold task-like abstractions, but normal `HttpClient` async methods start work when invoked.
- Repeated enumeration of a deferred task sequence can invoke the operation repeatedly.

## Nearby SVG labels used for orientation

- some async code inside (Task inside)
- create collection with
- started in foreach

## Covered screenshot uses

```text
IU-078, IU-079, IU-080
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
Repeated placements remain separate coverage units because they occur separately on the SVG canvas.
The source screenshots remain authoritative for exact code punctuation.
