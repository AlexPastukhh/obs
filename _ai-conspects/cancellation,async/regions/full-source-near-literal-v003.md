# Cancellation / async — source-preserving transcript

Source: complete corrected SVG, 42 screenshots and 37 SVG text nodes.  
Method: near-literal visual transcription with light formatting normalization.

## Canvas structure

Main roads:

1. Cancellation fundamentals.
2. Linked token sources and multiple cancellation reasons.
3. Request-abort propagation.
4. Cooperative CPU-bound cancellation.
5. Async exception flow and cancellation exceptions.

## Source transcript

### S-001 — Why cancellation matters

Supporting cancellation:

```text
Frees up threads for I/O-bound work
    → improves scalability

Frees up CPU resources for computational-bound work
```

### S-002 — `CancellationTokenSource`

A `CancellationTokenSource` is an object that manages cancellation tokens and sends cancellation notifications to the individual tokens.

### S-003 — `CancellationToken`

A cancellation token is a lightweight value type passed to one or more listeners, typically as a method parameter.

### S-004 — Token versus source

`CancellationToken`:

- lightweight value passed into methods;
- consumers observe it through `IsCancellationRequested`, `ThrowIfCancellationRequested`, or APIs that accept a token.

`CancellationTokenSource`:

- controller object that can trigger cancellation;
- owns a `Token`;
- `Cancel()` signals cancellation to consumers using that token.

Typical patterns:

- caller-driven cancellation: `HttpContext.RequestAborted`;
- timeout cancellation: `new CancellationTokenSource(TimeSpan.FromSeconds(2))`;
- linked cancellation: combine request disconnect, timeout, and internal abort.

### S-005 — Linked-CTS client, start

```csharp
public class BookCoversClient
{
    private readonly IHttpClientFactory _httpClientFactory;

    public BookCoversClient(
        IHttpClientFactory httpClientFactory) =>
        _httpClientFactory = httpClientFactory;

    public async Task<List<BookCoverDto>>
        GetCoversCancelAllOnFirstFailureAsync(
            IEnumerable<string> urls,
            CancellationToken requestCt)
    {
        var client = _httpClientFactory.CreateClient();

        // Internal CTS lets this operation cancel its whole batch.
        using var cts =
            CancellationTokenSource.CreateLinkedTokenSource(requestCt);
```

### S-006 — Linked-CTS client, loop

```csharp
        var results = new List<BookCoverDto>();

        foreach (var url in urls)
        {
            // Fail fast when cancellation was already requested.
            cts.Token.ThrowIfCancellationRequested();

            using var response =
                await client.GetAsync(url, cts.Token);

            if (!response.IsSuccessStatusCode)
            {
                // Abort the entire batch.
                cts.Cancel();
                break;
            }

            var json = await response.Content
                .ReadAsStringAsync(cts.Token);

            var dto = JsonSerializer.Deserialize<BookCoverDto>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

            if (dto is not null)
                results.Add(dto);
        }

        return results;
    }
}
```

### S-007 — Why use `using`

`CancellationTokenSource` implements `IDisposable`. Disposing it releases internal resources such as timers and registrations. Disposal is particularly important when timeout CTS instances are created frequently.

### S-008 — `CreateLinkedTokenSource(requestCt)`

It creates a new `CancellationTokenSource` whose token becomes canceled when any linked token becomes canceled.

You now have:

- external token: `requestCt`, usually request aborted/client disconnected;
- internal token source: owned by the operation and cancelable manually;
- linked token: the token passed to all operations.

### S-009 — Why not pass `requestCt` directly

The operation has two cancellation reasons:

1. the caller goes away and `requestCt` is canceled;
2. the operation decides to abort, for example after a downstream failure, and calls its own `Cancel()`.

Linking allows one token to be passed everywhere:

```text
linked token = request aborted OR internal abort
```

### S-010 — Manual check before `GetAsync`

Many async APIs already observe the supplied token. A manual call is mainly a fail-fast and clarity measure:

```csharp
cts.Token.ThrowIfCancellationRequested();
```

If cancellation was already requested, an API such as `HttpClient.GetAsync` will normally throw `OperationCanceledException`, but it may still allocate objects, perform setup, or queue work before it checks. A loop-top check guarantees that the next iteration stops immediately.

### S-011 — Is the manual check required?

Not strictly. Removing it can still be correct when every operation observes the token.

It is useful because it:

- avoids extra work after cancellation;
- makes the behavior explicit;
- protects work that does not accept a token, such as parsing, mapping, logging, or request-data construction.

### S-012 — Request-abort token

ASP.NET Core provides a token that fires when the HTTP request is aborted:

```csharp
HttpContext.RequestAborted
```

A controller action can receive it as a `CancellationToken` parameter and pass it through every asynchronous layer.

### S-013 — Controller propagation example

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/books")]
public class BooksController : ControllerBase
{
    private readonly BookCoversClient _covers;

    public BooksController(BookCoversClient covers) =>
        _covers = covers;

    [HttpGet("{id:guid}/covers")]
    public async Task<IActionResult> GetCovers(
        Guid id,
        CancellationToken cancellationToken)
    {
        // Bound to HttpContext.RequestAborted by ASP.NET Core.
        var urls = BuildUrls(id);

        var covers =
            await _covers.GetCoversCancelAllOnFirstFailureAsync(
                urls,
                cancellationToken);

        return Ok(covers);
    }
}
```

### S-014 — Client disconnect behavior

If the client disconnects mid-flight:

- ASP.NET Core cancels the action token;
- awaited operations receiving that token throw `OperationCanceledException` or `TaskCanceledException`;
- work stops early.

### S-015 — CPU-bound cancellation

Async cancellation does not automatically stop CPU work. CPU loops must observe the token.

Two patterns are shown:

1. check `IsCancellationRequested`;
2. preferably call `ThrowIfCancellationRequested()`.

### S-016 — Return/break pattern

```csharp
for (int i = 0; i < 1_000_000; i++)
{
    if (cancellationToken.IsCancellationRequested)
        break;

    DoCpuWork(i);
}
```

This exits normally and can therefore look like a successful partial result.

### S-017 — Preferred exception pattern

Preferred when the operation should complete in the canceled state:

```csharp
cancellationToken.ThrowIfCancellationRequested();
```

### S-018 — CPU loop with throw

```csharp
for (int i = 0; i < 1_000_000; i++)
{
    cancellationToken.ThrowIfCancellationRequested();
    DoCpuWork(i);
}
```

### S-019 — Consistency

Throwing makes the operation consistent with other cancellable APIs because cancellation is represented by `OperationCanceledException`.

### S-020 — “Let it bubble”

During an ASP.NET Core request, if the client disconnects, `HttpContext.RequestAborted` is canceled. If the token is propagated into awaited operations, they can throw `OperationCanceledException` or `TaskCanceledException`.

“Let it bubble” means not converting normal request cancellation into an ordinary application error response.

### S-021 — What ASP.NET Core does

When cancellation propagates:

- the server knows the request was aborted;
- it normally stops trying to write the response because the connection is gone;
- Kestrel aborts or closes the response stream;
- cancellation may appear in logs/diagnostics but it is not a client-visible 500 because the client is already gone.

“ASP.NET will abort the response” means request processing ends because there is no longer a client connection to which bytes can reliably be sent.

### S-022 — Why not catch and return a response

A response cannot be reliably returned to a disconnected client. Attempting to write may:

- throw again;
- waste CPU;
- create confusing logs.

Treat request cancellation as normal control flow. Do not log it as an application error; if logged at all, use low severity.

### S-023 — Demo boundary

```text
Demo
Listening to multiple cancellation tokens
```

### S-024 — Multiple-token example, method start

```csharp
public async Task<IEnumerable<BookCoverDto>>
    GetBookCoversAsync(
        Guid bookId,
        CancellationToken cancellationToken)
{
    var httpClient = _httpClientFactory.CreateClient();
    var bookCovers = new List<BookCoverDto>();

    var bookCoverUrls = new[]
    {
        $"http://localhost:52644/api/bookcovers/{bookId}=dummycover1",
        $"http://localhost:52644/api/bookcovers/{bookId}=dummycover2",
        $"http://localhost:52644/api/bookcovers/{bookId}=dummycover3",
        $"http://localhost:52644/api/bookcovers/{bookId}=dummycover4",
        $"http://localhost:52644/api/bookcovers/{bookId}=dummycover5"
    };

    using var cancellationTokenSource =
        new CancellationTokenSource();
```

### S-025 — Creating the linked source

```csharp
    using var linkedCancellationTokenSource =
        CancellationTokenSource.CreateLinkedTokenSource(
            cancellationTokenSource.Token,
            cancellationToken);
```

The new token is canceled if either the internal source or the controller/request token is canceled.

### S-026 — Passing the linked token

```csharp
foreach (var bookCoverUrl in bookCoverUrls)
{
    var response = await httpClient.GetAsync(
        bookCoverUrl,
        linkedCancellationTokenSource.Token);

    if (response.IsSuccessStatusCode)
    {
        var bookCover =
            JsonSerializer.Deserialize<BookCoverDto>(
                await response.Content.ReadAsStringAsync(
                    linkedCancellationTokenSource.Token),
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
```

The same linked token must be propagated to both the HTTP request and content-reading operation.

### S-027 — ASP.NET Core request cancellation guidance

Normally you do not catch request-cancellation exceptions in controllers, and often should not log them as errors.

1. Pass the request token (`HttpContext.RequestAborted` or the action parameter token) into async I/O and then through all layers.
2. Use `async`/`await` all the way through; avoid `.Result`, `.Wait()`, and `Task.WaitAll`.

### S-028 — Older async exception problems

A `try/catch` surrounding `Task.Run` does not catch an exception that occurs later inside the task unless the task is awaited. With multiple tasks, older blocking patterns often exposed failures through `AggregateException`.

### S-029 — Async/await fixes the structure

Using `async` and `await` all the way through makes exceptions surface at an await point and allows ordinary structured `try/catch`.

### S-030 — Where to handle async exceptions

Options include:

- catch close to the operation with `try/catch`;
- use an exception filter;
- configure exception-handler middleware.

The correct layer depends on whether the failure is local, action-specific, or global.

### S-031 — Catch the base cancellation exception

Catch `OperationCanceledException`. `TaskCanceledException` derives from it, so the base catch covers both.

### S-032 — Concurrency summary

Execute multiple tasks asynchronously, not necessarily in CPU parallel:

```text
async/await
await Task.WhenAll(...)
await Task.WhenAny(...)
```

`WhenAll` and `WhenAny` coordinate asynchronous work; they do not automatically make CPU work parallel.

### S-033 — CTS/token summary

`CancellationTokenSource` owns the signal. Tokens passed into action parameters and downstream calls receive notification when the consumer navigates away or another linked reason cancels the operation.

### S-034 — Cancellation exception summary

Catch `OperationCanceledException`; `TaskCanceledException` derives from it.

### S-035 — Why async/await solves old exception issues

Older async patterns could:

- swallow exceptions;
- surface them later on another thread;
- wrap them in `AggregateException`.

With `async`/`await`:

- if an awaited operation fails, the exception is thrown at the await point;
- normal `try/catch` can handle it.

### S-036 — Ordinary async catch

```csharp
try
{
    await httpClient.GetAsync(url, ct);
}
catch (HttpRequestException ex)
{
    // handle the HTTP failure
}
```

### S-037 — Cancellation represented as an exception

In .NET cancellation commonly appears as:

- `OperationCanceledException`;
- `TaskCanceledException`, derived from `OperationCanceledException`.

This is why catching `OperationCanceledException` covers both.

Do you need to catch request-cancellation exceptions? Most of the time, no. When the client disconnects, a JSON error body cannot normally be delivered. Letting cancellation bubble stops the work and lets ASP.NET Core end the request.

### S-038 — Minimal controller

```csharp
[HttpGet]
public async Task<IActionResult> Get(CancellationToken ct)
{
    var data = await _service.GetDataAsync(ct);
    return Ok(data);
}
```

### S-039 — When to catch cancellation

Catch only when extra work is needed, for example:

- record a “request canceled” metric;
- perform cleanup;
- avoid noisy error logs;
- translate internal cancellation to a specific result while the client is still connected.

Metrics plus rethrow remains the normal request-abort shape.

### S-040 — Filter expected cancellation and rethrow

```csharp
try
{
    await _service.GetDataAsync(ct);
}
catch (OperationCanceledException)
    when (ct.IsCancellationRequested)
{
    // Log at Debug/Information or increment a metric.
    throw;
}
```

### S-041 — Request cancellation versus internal cancellation

An application may have its own source for timeout or abort-on-failure. Linked tokens combine reasons, but the reasons may need different handling.

For client/request cancellation, catching merely to return a response is usually pointless. For internal timeout, the client may still be connected and a deliberate status mapping can be appropriate.

### S-042 — Identify the reason behind a linked token

A linked token says only that some source canceled it. Inspect the original source tokens separately:

```csharp
catch (OperationCanceledException)
    when (linkedToken.IsCancellationRequested)
{
    if (HttpContext.RequestAborted.IsCancellationRequested)
    {
        // Client disconnected.
    }
    else if (timeoutCts.IsCancellationRequested)
    {
        // Internal timeout.
    }

    throw;
}
```

Practical takeaway:

```text
linkedToken.IsCancellationRequested means:
“this linked token was canceled by some source”,
not “the internal source alone canceled it”.
```

## Integrated study summary

- Cancellation is cooperative: code must observe the token.
- The source owns the signal; the token is passed to consumers.
- Linked sources combine request abort, timeout, and internal abort into one propagated token.
- Owned sources and linked sources should be disposed.
- Request-abort cancellation normally bubbles rather than becoming an error response.
- CPU-bound work must check the token at meaningful boundaries.
- `OperationCanceledException` is the general cancellation exception; `TaskCanceledException` derives from it.
- `async`/`await` makes exception flow structured at await points.
