# Full combined final transcript — async processing of multiple calls,parallelism

Generated: 2026-06-27 04:00:00 UTC

## 01 Source basis and coverage

This document integrates the complete SVG:

```text
meaningful text elements: 30 / 30
unique embedded screenshots: 62 / 62
screenshot uses on canvas: 83 / 83
repeated screenshot placements retained: 21
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 Concurrency versus parallelism

Parallelism means that at least two operations execute at the same instant,
usually on different CPU cores or worker threads. Concurrency means that
multiple operations are in progress over overlapping time.

Asynchronous I/O is primarily concurrency. An HTTP or database request spends
most of its lifetime waiting on an external system. When the code awaits that
operation, the .NET thread can return to the pool and process other work.
Adding more blocked threads does not make the remote I/O faster.

CPU-bound work is different. Image processing, compression, hashing and
numerical computation can benefit from true parallel execution across cores.
`Parallel.ForEach` is designed for that synchronous CPU-bound category.

## 03 Starting asynchronous operations

Most .NET I/O methods return hot tasks. Calling `HttpClient.GetAsync`, for
example, initiates the request and returns a task representing its completion.

A LINQ expression such as:

```csharp
var tasks = urls.Select(url => client.GetAsync(url));
```

is deferred. The selector has not run until `tasks` is enumerated. Calling
`Task.WhenAll(tasks)`, `ToList()` or iterating with `foreach` performs that
enumeration and invokes `GetAsync` for every input.

By contrast, this loop starts each request immediately:

```csharp
var tasks = new List<Task<HttpResponseMessage>>();

foreach (var url in urls)
{
    tasks.Add(client.GetAsync(url));
}
```

Awaiting the collected tasks later does not postpone their start. The start
point is the async-method invocation.

A sequential loop places the `await` inside the loop:

```csharp
foreach (var url in urls)
{
    using var response = await client.GetAsync(url, cancellationToken);
    // Process one result before starting the next request.
}
```

This minimizes downstream load and preserves simple ordering, but total latency
is approximately the sum of the individual latencies.

## 04 SemaphoreSlim plus Task.WhenAll

`SemaphoreSlim` provides bounded asynchronous concurrency while retaining
normal task composition and returned results.

```csharp
public async Task<IReadOnlyList<TResult>> RunBoundedAsync<TInput, TResult>(
    IEnumerable<TInput> inputs,
    int maxConcurrency,
    Func<TInput, CancellationToken, Task<TResult>> operation,
    CancellationToken cancellationToken)
{
    using var gate = new SemaphoreSlim(maxConcurrency);

    var tasks = inputs.Select(async input =>
    {
        await gate.WaitAsync(cancellationToken);

        try
        {
            return await operation(input, cancellationToken);
        }
        finally
        {
            gate.Release();
        }
    }).ToArray();

    return await Task.WhenAll(tasks);
}
```

The semaphore limits active operations. The common `Select` implementation
still creates one task per input, so a very large source can consume substantial
memory even though only `maxConcurrency` items are in flight.

`Task.WhenAll<TResult>` returns results in the order of the input task sequence,
not completion order. That makes ordered aggregation straightforward without
concurrent writes to a shared `List<T>`.

The gate must be released in `finally`. A leaked permit eventually causes all
remaining operations to wait forever. Pass cancellation both to `WaitAsync`
and to the actual I/O operation.

## 05 Parallel.ForEachAsync

`Parallel.ForEachAsync`, available in .NET 6+, provides worker-driven bounded
enumeration:

```csharp
var results = new TResult[items.Count];

await Parallel.ForEachAsync(
    Enumerable.Range(0, items.Count),
    new ParallelOptions
    {
        MaxDegreeOfParallelism = maxConcurrency,
        CancellationToken = cancellationToken
    },
    async (index, token) =>
    {
        results[index] = await operation(items[index], token);
    });
```

The framework keeps approximately `MaxDegreeOfParallelism` bodies active and
pulls additional items as workers become available. It does not normally need
to pre-create one waiting task for every item, so it can be more memory-friendly
for very large sources.

The API returns one completion task rather than an array of item results.
Concurrent aggregation therefore needs one of these designs:

- a thread-safe collection when order does not matter;
- a pre-sized array indexed by the input position;
- a lock around a small mutation;
- an output channel or streaming pipeline.

A normal `List<T>` cannot be mutated concurrently.

## 06 Why synchronous Parallel.ForEach is wrong for I/O

`Parallel.ForEach` expects a synchronous delegate and is intended for CPU-bound
work.

An async lambda passed where `Action<T>` is expected becomes `async void`.
The caller cannot await its completion normally, and exception handling becomes
unsafe.

The other common mistake is sync-over-async:

```csharp
Parallel.ForEach(urls, url =>
{
    using var response = httpClient
        .GetAsync(url)
        .GetAwaiter()
        .GetResult();
});
```

This blocks one ThreadPool thread per active iteration while the external system
does the actual work. It wastes threads rather than providing useful CPU
parallelism.

`Task.WaitAll`, `.Wait()` and `.Result` have the same blocking property.
Asynchronous application code should normally use `await Task.WhenAll`.

## 07 Server-side consequences of blocking

Blocking may be merely wasteful in a small client application, but it is
dangerous in a server. A blocked request thread cannot process another request.
Under load, the ThreadPool can become starved, increasing latency and causing
timeouts or throughput collapse.

Server-side code should be async end-to-end:

- await I/O rather than synchronously waiting;
- bound fan-out to protect downstream systems;
- propagate cancellation;
- avoid creating a new `HttpClient` per request;
- coordinate retry policy with the concurrency limit.

## 08 Allocation shape and backpressure

Semaphore plus `Select` plus `WhenAll` commonly materializes one task and
closure for every input. Active operations remain bounded, but waiting task
objects can still be numerous.

`Parallel.ForEachAsync` uses a small set of worker loops that pull work as
capacity becomes free. This reduces the number of waiting task objects for
large sequences.

Neither option is a complete producer/consumer backpressure pipeline. When
inputs arrive continuously or results must stream, use `Channel<T>`,
`IAsyncEnumerable<T>` or a dedicated pipeline with bounded buffers.

## 09 Database and downstream-resource constraints

The maximum useful concurrency is determined by the smallest constrained
resource:

- HTTP connection limits and remote rate limits;
- database connection-pool size;
- database lock and query capacity;
- memory used by requests and responses;
- external-service quotas.

For EF Core operations, one `DbContext` must not be used concurrently. Each
active operation needs an independent context/unit of work, commonly created
through `IDbContextFactory<TContext>` or a separate dependency-injection scope.

A high concurrency value can make total throughput worse by increasing pool
waits, lock contention and retries. Measure the complete system rather than
choosing a value from CPU count alone.

## 10 Failure and cancellation semantics

A semaphore controls admission; it does not define failure policy. With a set
of tasks passed to `Task.WhenAll`, sibling tasks continue unless cancellation
is requested explicitly.

For best-effort processing, catch inside each item and return an outcome:

```csharp
public sealed record ItemOutcome<T>(
    bool IsSuccess,
    T? Value,
    Exception? Error);

async Task<ItemOutcome<T>> RunOneAsync<T>(
    Func<CancellationToken, Task<T>> operation,
    CancellationToken cancellationToken)
{
    try
    {
        return new(true, await operation(cancellationToken), null);
    }
    catch (Exception error) when (error is not OperationCanceledException)
    {
        return new(false, default, error);
    }
}
```

For fail-fast intent, create a linked cancellation source and cancel it after
the first observed failure. Cancellation remains cooperative: operations that
already completed cannot be undone, and remote side effects may already exist.

An unhandled exception in `Parallel.ForEachAsync` faults the overall operation
and normally prevents more items from being scheduled. Already-running bodies
may finish or observe cancellation. Catch exceptions inside the body when every
item should be attempted.

## 11 Result ordering and post-processing

Four orders must be distinguished:

1. input order;
2. operation start order;
3. completion order;
4. returned-result order.

`Task.WhenAll<TResult>` returns results in input-task order. A `ConcurrentBag<T>`
or append-on-completion design records nondeterministic completion/race order.

`Parallel.ForEachAsync` does not promise stable processing order. Preserve order
by carrying each input index and writing to an indexed result slot.

Sorting, reversing or aggregating after every operation completes is separate
from execution order. A deliberately reversed result list does not prove that
requests completed in reverse order.

## 12 Selection guide

Choose `SemaphoreSlim` plus `Task.WhenAll` when:

- ordered returned results are important;
- the input is not enormous;
- per-item success/failure results are required;
- task composition with `WhenAny`, timeouts or other operations is useful;
- one gate must coordinate several operation types.

Choose `Parallel.ForEachAsync` when:

- the application targets .NET 6+;
- the source may be very large;
- the work is naturally one operation per item;
- result order is unimportant or will be reconstructed;
- worker-driven enumeration and lower waiting-task overhead are desirable.

Choose synchronous `Parallel.ForEach` only for measured CPU-bound work.

Avoid `Task.WaitAll` and other synchronous waits on an asynchronous server
execution path.

## 13 End-to-end HTTP example

```csharp
public sealed record BookCoverDto(string Url, int BookId);

public sealed class BookCoverClient
{
    private readonly IHttpClientFactory _httpClientFactory;

    public BookCoverClient(IHttpClientFactory httpClientFactory)
        => _httpClientFactory = httpClientFactory;

    public async Task<IReadOnlyList<BookCoverDto>> GetCoversAsync(
        IReadOnlyList<string> urls,
        int maxConcurrency,
        CancellationToken cancellationToken)
    {
        var client = _httpClientFactory.CreateClient();
        using var gate = new SemaphoreSlim(maxConcurrency);

        var tasks = urls.Select(async url =>
        {
            await gate.WaitAsync(cancellationToken);

            try
            {
                using var response =
                    await client.GetAsync(url, cancellationToken);

                response.EnsureSuccessStatusCode();

                return await response.Content
                    .ReadFromJsonAsync<BookCoverDto>(
                        cancellationToken: cancellationToken);
            }
            finally
            {
                gate.Release();
            }
        }).ToArray();

        var results = await Task.WhenAll(tasks);

        return results
            .Where(result => result is not null)
            .Cast<BookCoverDto>()
            .ToArray();
    }
}
```

The requests overlap, active calls are bounded, threads are not blocked, results
remain aligned with input-task order and semaphore capacity cannot leak.

## 14 Regional source map

### R01 — Task creation, hot tasks and when work starts

This region separates creating an enumerable of async delegates from actually invoking an async operation. Most .NET I/O APIs return hot tasks: the request starts when the method is called, not when the returned task is awaited.

Coverage: `3` placements, `3` unique screenshots, `3` repeated placements, `0` remaining. Detailed file: `01-transcript-R01-task-creation-hot-tasks-and-when-work-starts.md`.

### R02 — SemaphoreSlim throttling and bounded concurrency

`SemaphoreSlim` is a general asynchronous gate. It limits how many operations may be in flight while preserving the normal task-based composition model.

Coverage: `3` placements, `3` unique screenshots, `3` repeated placements, `0` remaining. Detailed file: `02-transcript-R02-semaphoreslim-throttling-and-bounded-concurrency.md`.

### R03 — Task.WhenAll plus SemaphoreSlim versus Parallel.ForEachAsync

Both approaches provide bounded asynchronous concurrency. The main differences are allocation shape, result collection, ordering, failure policy and composition.

Coverage: `8` placements, `8` unique screenshots, `8` repeated placements, `0` remaining. Detailed file: `03-transcript-R03-whenall-semaphore-versus-parallel-foreachasync.md`.

### R04 — Parallel.ForEachAsync behavior and result collection

`Parallel.ForEachAsync` is an async-aware bounded worker loop. It is concurrency for asynchronous operations rather than CPU parallelism in the classic sense.

Coverage: `3` placements, `3` unique screenshots, `3` repeated placements, `0` remaining. Detailed file: `04-transcript-R04-parallel-foreachasync-behavior-and-result-collection.md`.

### R05 — Parallel.ForEach, Task.WaitAll and sync-over-async

Synchronous parallel APIs are designed for CPU-bound work. Using them around asynchronous I/O either loses the task or blocks ThreadPool threads.

Coverage: `4` placements, `4` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `05-transcript-R05-parallel-foreach-task-waitall-and-sync-over-async.md`.

### R06 — Server-side concurrency, ordering and resource limits

A pattern that appears acceptable in a desktop client can damage a server because a server must preserve threads and shared downstream resources for many users.

Coverage: `8` placements, `8` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `06-transcript-R06-server-concurrency-ordering-and-resource-limits.md`.

### R07 — Failures, cancellation, ordering and the selection guide

This region consolidates the comparison into operational rules for production code: how to collect results, how failure propagates and how to choose an API.

Coverage: `28` placements, `28` unique screenshots, `4` repeated placements, `0` remaining. Detailed file: `07-transcript-R07-failures-cancellation-ordering-and-selection-guide.md`.

### R08 — End-to-end implementations and result aggregation

The final region applies the concepts to multiple HTTP calls: sequential code, unbounded `WhenAll`, bounded `SemaphoreSlim` and result post-processing.

Coverage: `26` placements, `26` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `08-transcript-R08-end-to-end-implementations-and-result-aggregation.md`.

## 15 Exactness note

This is the integrated semantic transcript. The complete SVG and extracted
screenshots under `source/` remain authoritative for exact code punctuation and
version-specific API details.
