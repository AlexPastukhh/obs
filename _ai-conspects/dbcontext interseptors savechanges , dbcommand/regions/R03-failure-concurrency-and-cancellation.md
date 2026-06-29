# R03 — Save failure, optimistic concurrency, and cancellation

Generated: 2026-06-29

## Transcript standard

This is the active source-preserving transcript for the region.

- Each screenshot has a separate source block.
- Visible prose and code are transferred close to the source.
- Obvious spelling/OCR artifacts and punctuation are normalized.
- Cropped content is explicitly marked.
- Summary/meaning is kept separate from the near-literal layer.
- Every source has recall questions.

## Canvas labels relevant to this region

- `failure`
- `concurrency`
- `concur exception and normal failure callback`
- `fallbacks`
- `suppressing concurrency exception`

## Source-by-source transcript

### S-017 — SaveChangesFailed event data and example

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

In `SaveChangesFailed` / `SaveChangesFailedAsync`, the callback receives `DbContextErrorEventData`.

Most useful properties:

- `eventData.Context`;
- `eventData.Exception`.

Example:

```csharp
public override Task SaveChangesFailedAsync(
    DbContextErrorEventData eventData,
    CancellationToken cancellationToken = default)
{
    Console.WriteLine(
        eventData.Context?.GetType().Name);
    Console.WriteLine(
        eventData.Exception.GetType().Name);
    Console.WriteLine(
        eventData.Exception.Message);

    return Task.CompletedTask;
}
```

#### Study meaning

Failure callbacks observe/log an exception after the save fails; they do not return an alternate save result.

#### Recall questions

1. What event-data type carries a failed-save exception?
2. Which two main properties are useful?
3. What is returned from the async callback?

### S-022 — Concurrency callback event data

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

In `ThrowingConcurrencyException` / its async counterpart, the callback receives `ConcurrencyExceptionEventData`.

#### Study meaning

This callback is specifically invoked at the point where EF is about to throw an optimistic-concurrency exception.

#### Recall questions

1. Which event-data type is used for concurrency interception?
2. Does this callback run before or after the exception is thrown?

### S-025 — Failure and concurrency callbacks in the lifecycle

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Use post-success callbacks when reacting after the save succeeded. The `result` is the SaveChanges return value, and the interceptor can modify that returned result if needed.

On failure, `SaveChangesInterceptor` exposes:

- `SaveChangesFailed`;
- `SaveChangesFailedAsync`.

They are used for logging, cleanup, or compensating behavior when saving throws.

For optimistic concurrency, separate concurrency-related callbacks exist. This makes SaveChanges interception relevant for concurrency-token workflows too.

#### Study meaning

Successful, failed, and concurrency outcomes are separate hooks and should not be conflated.

#### Recall questions

1. Which callbacks run when saving throws?
2. What are failure callbacks appropriate for?
3. Why are concurrency callbacks separate?

### S-026 — Inspect exception and conflicting entries

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Useful concurrency event-data properties:

- `eventData.Context`;
- `eventData.Exception`;
- `eventData.Entries` — entries involved in the concurrency violation.

For relational providers, EF can cast the event data to `RelationalConcurrencyExceptionEventData` for extra database-operation information.

Example:

```csharp
public override ValueTask<InterceptionResult>
    ThrowingConcurrencyExceptionAsync(
        ConcurrencyExceptionEventData eventData,
        InterceptionResult result,
        CancellationToken cancellationToken = default)
{
    Console.WriteLine(eventData.Exception.Message);

    foreach (var entry in eventData.Entries)
    {
        Console.WriteLine(
            $"{entry.Metadata.Name} state={entry.State}");
    }

    return new(result);
}
```

#### Study meaning

The interceptor can inspect exactly which tracked entries caused the optimistic-concurrency conflict before deciding whether to let EF throw.

#### Recall questions

1. Which property lists conflicting entries?
2. What extra type can relational providers expose?
3. What does returning the incoming result unchanged mean?

### S-027 — SaveChangesFailedAsync logging interceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Failure callbacks run when `SaveChanges` / `SaveChangesAsync` throws.

```csharp
using Microsoft.EntityFrameworkCore.Diagnostics;

public sealed class FailureLoggingInterceptor
    : SaveChangesInterceptor
{
    public override Task SaveChangesFailedAsync(
        DbContextErrorEventData eventData,
        CancellationToken cancellationToken = default)
    {
        var ex = eventData.Exception;
        var contextName =
            eventData.Context?.GetType().Name
            ?? "UnknownContext";

        Console.WriteLine(
            $"[{DateTime.UtcNow:O}] {contextName}: " +
            $"SaveChangesAsync failed: " +
            $"{ex.GetType().Name}: {ex.Message}");

        return Task.CompletedTask;
    }
}
```

#### Study meaning

The callback records exception type/message and context identity while allowing the failure to continue through the normal flow.

#### Recall questions

1. What information is logged?
2. Does this callback suppress the exception?
3. Why is `Task.CompletedTask` returned?

### S-028 — Relationship between concurrency callback and normal failure callback

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

If there is a concurrency exception, does the normal failure callback run too?

Safe practical model:

- `ThrowingConcurrencyException...` runs before EF throws the concurrency exception.
- If the interceptor does **not** suppress, EF throws `DbUpdateConcurrencyException`; this is a save failure, so the ordinary failure path is expected to apply.
- If the interceptor **does** suppress, there is no thrown concurrency exception, so the ordinary “save failed because an exception was thrown” path is not the same.

Operational model:

1. concurrency callback runs first;
2. then either:
   - the exception continues and failure behavior follows; or
   - suppression prevents the throw.

#### Study meaning

Suppression changes control flow before the general failure pipeline receives a thrown exception.

#### Recall questions

1. Which callback runs first?
2. When is `SaveChangesFailed` expected afterward?
3. Why does suppression change the failure path?

### S-034 — Return values for cancellation callbacks

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

What do cancellation callbacks return?

- `Task.CompletedTask` for the async version;
- nothing (`void`) for the synchronous version.

They are intended for:

- logging;
- metrics;
- cleanup;
- correlation IDs/tracing.

They are not a place to return an alternate SaveChanges result.

#### Study meaning

Cancellation callbacks are notifications, not result-replacement interception points.

#### Recall questions

1. What does the async cancellation callback return?
2. Name four uses.
3. Can it return an alternate affected-row count?

### S-040 — ThrowingConcurrencyException callback purpose

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

EF Core exposes `ThrowingConcurrencyException` and `ThrowingConcurrencyExceptionAsync`. They run before EF throws `DbUpdateConcurrencyException`.

The documentation explicitly states that these interception points allow the exception to be suppressed, possibly together with asynchronous database changes to resolve the conflict.

Conceptual async signature:

```csharp
public override ValueTask<InterceptionResult>
    ThrowingConcurrencyExceptionAsync(
        ConcurrencyExceptionEventData eventData,
        InterceptionResult result,
        CancellationToken cancellationToken = default)
```

#### Study meaning

This is an advanced interception point because it can take over optimistic-concurrency resolution instead of merely observing the failure.

#### Recall questions

1. When is this callback invoked?
2. What exception is EF about to throw?
3. What advanced action can the interceptor take?

### S-044 — Log concurrency conflict and let the exception continue

**Readability:** high  
**Known limits:** bottom bullet is slightly cropped but readable

#### Near-literal normalized transcript

```csharp
using Microsoft.EntityFrameworkCore.Diagnostics;

public sealed class ConcurrencyLoggingInterceptor
    : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult>
        ThrowingConcurrencyExceptionAsync(
            ConcurrencyExceptionEventData eventData,
            InterceptionResult result,
            CancellationToken cancellationToken = default)
    {
        Console.WriteLine(
            $"[{DateTime.UtcNow:O}] Concurrency conflict for context " +
            $"{eventData.Context?.GetType().Name}");

        return new ValueTask<InterceptionResult>(result);
    }
}
```

Returning the incoming result unchanged means:

- EF continues normal behavior;
- `DbUpdateConcurrencyException` is thrown.

#### Study meaning

Observation/logging does not suppress; explicit suppression is required to alter control flow.

#### Recall questions

1. What does returning the unchanged result mean?
2. Which exception is still thrown?
3. What is logged?

### S-049 — Suppress the optimistic-concurrency exception

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
using Microsoft.EntityFrameworkCore.Diagnostics;

public sealed class SuppressConcurrencyInterceptor
    : SaveChangesInterceptor
{
    public override ValueTask<InterceptionResult>
        ThrowingConcurrencyExceptionAsync(
            ConcurrencyExceptionEventData eventData,
            InterceptionResult result,
            CancellationToken cancellationToken = default)
    {
        Console.WriteLine(
            "Suppressing optimistic concurrency exception.");

        return new ValueTask<InterceptionResult>(
            InterceptionResult.Suppress());
    }
}
```

This tells EF not to throw the exception. The documentation explicitly notes that these concurrency interception points allow suppression.

Important caution:

- suppressing concurrency exceptions is advanced and easy to misuse;
- the application needs a clear alternative resolution strategy.

#### Study meaning

Suppressing the throw does not automatically resolve conflicting state. It only prevents EF from raising the exception.

#### Recall questions

1. Which return expression suppresses the throw?
2. Does suppression resolve the conflict by itself?
3. Why is a deliberate resolution policy required?

### S-050 — Why concurrency suppression exists

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A concurrency exception means EF was about to throw `DbUpdateConcurrencyException` because the save affected an unexpected number of rows, usually because another actor changed the data after it was loaded.

The concurrency callback exists before EF throws that exception and allows suppression.

#### Study meaning

Optimistic concurrency is detected by unexpected affected-row count; the interception point allows an application-specific outcome before the exception is emitted.

#### Recall questions

1. What usually causes EF to detect a concurrency conflict?
2. At what point does the callback run?
3. What can it suppress?

### S-051 — Advanced scenarios for suppressing a concurrency exception

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Why suppress it?

Usually only in advanced cases, for example:

- treat a conflict as a non-error in a special workflow;
- convert “somebody already updated/deleted this” into idempotent success;
- perform custom conflict-resolution logic yourself;
- swallow the exception and return a domain-specific result instead.

Example scenario:

- command says “mark notification as read”;
- another process already marked it read;
- application decides that the desired state is already achieved;
- suppress the concurrency exception and treat the operation as effectively complete.

Return:

```csharp
InterceptionResult.Suppress()
```

instead of the incoming result.

#### Study meaning

A conflict may be acceptable when the intended final state already holds, but this must be explicit domain logic.

#### Recall questions

1. Give one idempotent scenario where suppression may be valid.
2. What does `InterceptionResult.Suppress()` replace?
3. Why should this remain a narrow workflow?

### S-052 — SaveChanges cancellation callbacks

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The API also includes:

- `SaveChangesCanceled`;
- `SaveChangesCanceledAsync`.

They run when `SaveChangesAsync` is canceled.

Example:

```csharp
public sealed class CancellationInterceptor
    : SaveChangesInterceptor
{
    public override Task SaveChangesCanceledAsync(
        DbContextEventData eventData,
        CancellationToken cancellationToken = default)
    {
        Console.WriteLine(
            $"[{DateTime.UtcNow:O}] SaveChangesAsync was canceled for " +
            $"{eventData.Context?.GetType().Name}");

        return Task.CompletedTask;
    }
}
```

#### Study meaning

Cancellation is reported through its own callback rather than as a normal successful or failed save result.

#### Recall questions

1. Which two cancellation callbacks exist?
2. What event data is received?
3. What does the example log?

### S-053 — Required follow-up after suppressing concurrency

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

If concurrency is suppressed, the application needs a clear policy. Typical options:

- reload state from the database;
- detach conflicted entries;
- mark them unchanged;
- translate to a custom application result such as “already handled”;
- return a domain-level status instead of relying on exception flow.

A safe pattern is to suppress only for a narrow intentional case such as an idempotent delete.

#### Study meaning

The interceptor must leave the DbContext and domain outcome in a coherent state; otherwise later operations may work with stale or conflicted entries.

#### Recall questions

1. Name three state-management actions after suppression.
2. Why might conflicted entries need to be detached or reloaded?
3. What narrow example is described as safer?
