# DbContext / SaveChanges / DbCommand interceptors — corrected near-literal transcript

Generated: 2026-06-29

## Status

```text
source SVG embedded screenshots: 59
source SVG image uses: 59
near-literal source blocks: 59
native SVG text labels integrated: 18
uncovered source images: 0
```

## Why this correction exists

The previous authoritative reconciliation correctly accounted for all 59 screenshots, but compressed each region into one overview paragraph. That was sufficient for source accounting, not for detailed repetition or question generation.

This transcript keeps a separate normalized source block for every screenshot, preserves visible code and concrete examples, marks cropped fragments, and adds recall questions.



---

# R01 — SaveChanges lifecycle, event data, and successful-save auditing

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

- `savechanges`
- `event data`

## Source-by-source transcript

### S-003 — Purpose and phases of SaveChangesInterceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The main interface is `ISaveChangesInterceptor`, and EF Core provides `SaveChangesInterceptor` as a convenience base class so only needed methods are overridden.

Common uses:

- auditing (`CreatedAt`, `UpdatedAt`, `CreatedBy`, `UpdatedBy`);
- soft delete;
- multi-tenant stamping;
- validation/global rules before saving;
- reacting after a successful save.

EF Core concurrency documentation also mentions using a SaveChanges interceptor to automatically assign a new GUID concurrency token before save.

Important phases:

- before save starts;
- after save succeeds;
- if save fails;
- if a concurrency failure happens;
- synchronous and asynchronous versions for these phases.

#### Study meaning

`SaveChangesInterceptor` is an application-level lifecycle hook around EF's unit-of-work commit.

#### Recall questions

1. Why use the convenience base class instead of implementing every interface method?
2. Name five practical uses.
3. Which separate failure phase is specific to optimistic concurrency?

### S-004 — Event data types by interceptor method

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

What can be obtained from `eventData` in different interceptor methods?

Short version:

- save callbacks receive save-related event data;
- command callbacks receive command-related event data;
- concurrency callbacks receive concurrency-specific event data.

In `SavingChanges` / `SavingChangesAsync`, the event data type is `DbContextEventData`.

Most useful property:

```csharp
eventData.Context
```

which is the current `DbContext`.

#### Study meaning

Event data types are specialized around the intercepted lifecycle phase and expose the state relevant to that phase.

#### Recall questions

1. What event-data type is received before SaveChanges?
2. Which property gives the current context?
3. Why do command callbacks use a different event-data type?

### S-008 — Inspect ChangeTracker in SavingChangesAsync

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A common pre-save interceptor:

```csharp
public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
    DbContextEventData eventData,
    InterceptionResult<int> result,
    CancellationToken cancellationToken = default)
{
    var context = eventData.Context;

    foreach (var entry in context!.ChangeTracker.Entries())
    {
        // inspect Added / Modified / Deleted entities
    }

    return new(result);
}
```

In practice the callback most often uses:

- `Context`;
- then `Context.ChangeTracker`.

#### Study meaning

This is where entity-state inspection, audit stamping, validation, and soft-delete conversion are normally performed.

#### Recall questions

1. What object is enumerated to inspect tracked entities?
2. Which entity states are explicitly mentioned?
3. Why is the incoming `result` returned unchanged in the normal path?

### S-009 — Primary pre-save methods

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Important `SaveChangesInterceptor` methods before a save:

```csharp
public override InterceptionResult<int> SavingChanges(
    DbContextEventData eventData,
    InterceptionResult<int> result)
```

```csharp
public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
    DbContextEventData eventData,
    InterceptionResult<int> result,
    CancellationToken cancellationToken = default)
```

Use them to inspect tracked entities and modify them before SQL is sent.

These are save-interception points and are normally returned unchanged unless execution is intentionally changed or suppressed.

#### Study meaning

The synchronous and asynchronous callbacks have the same interception role; the async version also receives cancellation.

#### Recall questions

1. When in the save pipeline are these methods called?
2. What are their two core parameters besides cancellation?
3. When should the incoming result not be returned unchanged?

### S-013 — Event data after successful SaveChanges

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

In `SavedChanges` / `SavedChangesAsync`, the callback receives:

- `SaveChangesCompletedEventData`;
- the integer `result`.

Useful values:

- `eventData.Context`;
- `result` — the number returned by `SaveChanges`;
- the event type indicates that the save completed.

Example:

```csharp
public override ValueTask<int> SavedChangesAsync(
    SaveChangesCompletedEventData eventData,
    int result,
    CancellationToken cancellationToken = default)
{
    Console.WriteLine(
        $"Context: {eventData.Context?.GetType().Name}");
    Console.WriteLine($"Save result: {result}");

    return new(result);
}
```

#### Study meaning

The post-save callback can log context and affected-row result after a successful commit.

#### Recall questions

1. What event-data type is used after success?
2. What does `result` represent?
3. What should normally be returned?

### S-015 — Pre-save audit timestamp interceptor

**Readability:** high  
**Known limits:** the final return statement is just below the screenshot edge but is implied by the complete pattern

#### Near-literal normalized transcript

Example:

```csharp
public sealed class AuditSaveChangesInterceptor
    : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData,
        InterceptionResult<int> result)
    {
        var context = eventData.Context;
        if (context is null)
            return result;

        var now = DateTime.UtcNow;

        foreach (var entry in context.ChangeTracker.Entries())
        {
            if (entry.Entity is IAuditable auditable)
            {
                if (entry.State == EntityState.Added)
                {
                    auditable.CreatedAt = now;
                    auditable.UpdatedAt = now;
                }
                else if (entry.State == EntityState.Modified)
                {
                    auditable.UpdatedAt = now;
                }
            }
        }

        return result;
    }
}
```

#### Study meaning

The interceptor centralizes audit timestamps and applies them consistently before EF generates SQL.

#### Recall questions

1. Which timestamps are set for Added entities?
2. Which timestamp is updated for Modified entities?
3. Why is `UtcNow` preferable for persistence?
4. What happens if the context is null?

### S-018 — Successful-save method signatures

**Readability:** high  
**Known limits:** this source begins with the tail of the prior code block

#### Near-literal normalized transcript

After a successful save:

```csharp
public override int SavedChanges(
    SaveChangesCompletedEventData eventData,
    int result)
```

```csharp
public override ValueTask<int> SavedChangesAsync(
    SaveChangesCompletedEventData eventData,
    int result,
    CancellationToken cancellationToken = default)
```

The preceding pre-save method returns the incoming interception result unchanged.

#### Study meaning

These are the synchronous and asynchronous success callbacks and both preserve the caller-visible result unless deliberately changed.

#### Recall questions

1. What event data is supplied after success?
2. What is the return type of the async callback?
3. Can this callback reverse the committed database changes?

### S-019 — What to return from post-save callbacks

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Normally return:

- `new(result)` from the async override; or
- `ValueTask.FromResult(result)`.

A different integer can be returned because save interceptors may modify the result before it is returned to EF/application code.

#### Study meaning

The normal and safest behavior is result preservation; changing it should be explicit and rare.

#### Recall questions

1. What are two normal async return forms?
2. What type must an alternate return value have?

### S-021 — Log after successful SaveChangesAsync

**Readability:** high  
**Known limits:** the closing braces sit just below the screenshot crop but the method body is readable

#### Near-literal normalized transcript

```csharp
using Microsoft.EntityFrameworkCore.Diagnostics;

public sealed class AuditSaveChangesInterceptor
    : SaveChangesInterceptor
{
    public override ValueTask<int> SavedChangesAsync(
        SaveChangesCompletedEventData eventData,
        int result,
        CancellationToken cancellationToken = default)
    {
        var context = eventData.Context;
        var contextName =
            context?.GetType().Name ?? "UnknownContext";

        Console.WriteLine(
            $"[{DateTime.UtcNow:O}] {contextName}: " +
            $"SaveChangesAsync succeeded. " +
            $"Rows/entities written: {result}");

        return new ValueTask<int>(result);
    }
}
```

#### Study meaning

This is a post-success audit/logging example that records context identity, timestamp, and returned affected count.

#### Recall questions

1. What timestamp format is used?
2. What fallback context name is used?
3. Why is the original result returned?


---

# R02 — Save suppression, alternate results, and outcome reporting

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

- `when we can suppress`
- `how to know that something was suppressed`
- `some negative flags or`
- `!!! scoped marker service`
- `what to return from callback`

## Source-by-source transcript

### S-001 — Where SaveChanges suppression is possible

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

For `DbContext` / `SaveChanges` interceptors, the important split is:

- `SavingChanges` / `SavingChangesAsync` run at the start of `SaveChanges`. They receive `InterceptionResult<int>`, can suppress the normal save pipeline, and can return their own integer result. EF documentation also notes that `SavedChanges` is still called afterward if command creation was suppressed in `SavingChanges`.
- `SavedChanges` / `SavedChangesAsync` run after `SaveChanges` completes. They are post-action hooks; they do not “unsave” what already happened in the database. The documentation describes them as being called at the end of `DbContext.SaveChanges`.

Practical answer:

- You can suppress the save from happening in the pre-save interceptor: `SavingChanges*`.
- You cannot use `SavedChanges*` to retroactively cancel a save that already happened.

The same pattern exists across EF interception: suppression belongs to the interception point for the pending operation, not to arbitrary callbacks that run afterward. EF frames suppression around the operation EF is about to perform, rather than undoing an already completed operation.

#### Study meaning

This source establishes the lifecycle rule: pre-operation callbacks can suppress; post-operation callbacks can observe or replace a same-shaped returned value but cannot reverse database work.

#### Recall questions

1. Which SaveChanges callback can suppress the pending save?
2. Why can `SavedChanges` not undo a completed save?
3. What type of result does `SavingChanges` receive?
4. How does this principle generalize to other EF interceptors?

### S-005 — SuppressWithResult can replace only the integer result

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

For `SaveChanges`, an interceptor can return:

```csharp
public override InterceptionResult<int> SavingChanges(
    DbContextEventData eventData,
    InterceptionResult<int> result)
{
    return InterceptionResult<int>.SuppressWithResult(123);
}
```

The repository then receives:

```csharp
int written = await context.SaveChangesAsync(); // 123
```

The caller still receives an `int`. You cannot make `SaveChangesAsync()` suddenly return `MyCustomResult`; the public API signature remains the same.

#### Study meaning

Suppression can replace execution and the result value, but not the method's declared return type.

#### Recall questions

1. What value does the caller receive in the example?
2. Can an interceptor change `SaveChangesAsync` from `Task<int>` to another public result type?
3. What does `SuppressWithResult` control?

### S-007 — SavingChanges suppression semantics

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`SavingChanges(...)` can suppress the save and return its own result by returning an `InterceptionResult<int>` with a result set.

If `HasResult` is true, EF suppresses the operation and uses that result instead.

#### Study meaning

`InterceptionResult<T>` carries both the “continue or suppress” decision and, when suppressed, the replacement result.

#### Recall questions

1. What does `HasResult == true` mean to EF?
2. What result is used when the operation is suppressed?

### S-014 — How to report richer suppression information

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Direct answer:

- You can replace the returned value only with another value of the same return type.
- You cannot change the method’s return type through interception.
- If richer information is needed outside, encode or report it yourself, for example:
  - reserve a sentinel value such as `-999`;
  - set a value on a scoped service;
  - log it;
  - publish a domain event;
  - throw/catch your own exception instead of suppressing.

A common pattern is a scoped marker service:

```csharp
public sealed class SaveOutcome
{
    public bool WasSuppressed { get; set; }
}
```

Register it as scoped. The interceptor sets `WasSuppressed = true`, and the repository checks the scoped service after `SaveChangesAsync()` returns.

#### Study meaning

Because the public return type remains `int`, application-level metadata must travel through an explicit side channel.

#### Recall questions

1. Why is a scoped marker service clearer than a magic negative number?
2. Name four side channels for richer save outcome information.
3. When might throwing a domain-specific exception be preferable to suppression?

### S-030 — Changing the post-save returned row count

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Normal pattern: inspect `eventData`, optionally log or publish, then return the incoming `result`.

Changing the returned result is rare but technically allowed:

```csharp
public sealed class CustomResultInterceptor : SaveChangesInterceptor
{
    public override ValueTask<int> SavedChangesAsync(
        SaveChangesCompletedEventData eventData,
        int result,
        CancellationToken cancellationToken = default)
    {
        // Example only; changing the count is unusual and can be confusing.
        return new ValueTask<int>(result + 1000);
    }
}
```

#### Study meaning

A post-save interceptor can alter the integer returned to the caller, but the actual database work and affected rows do not change.

#### Recall questions

1. What changes when `result + 1000` is returned?
2. What does not change?
3. Why is this usually a bad production practice?

### S-037 — Consequences of modifying SavedChanges result

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The caller of:

```csharp
await context.SaveChangesAsync()
```

would receive `result + 1000`, even though the actual database work did not change.

EF explicitly allows interceptors to modify the result, but in real code this is usually a bad idea unless there is a very deliberate reason.

#### Study meaning

The caller-visible integer can diverge from the actual affected-row count, which can mislead application logic.

#### Recall questions

1. What value is modified: the database result or only the caller-visible result?
2. Why can downstream code become incorrect if it trusts the modified count?

### S-056 — SaveChanges suppression is broader than concurrency suppression

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Can `SaveChanges` suppress too?

Yes. For `SavingChanges` / `SavingChangesAsync`, if `HasResult` is true, EF suppresses the save and uses the supplied result.

Save suppression is not limited to concurrency exceptions.

You can suppress:

- the whole save in `SavingChanges...`;
- the concurrency throw in `ThrowingConcurrencyException...`.

#### Study meaning

There are two distinct suppression points: the pending save operation and the pending concurrency exception throw.

#### Recall questions

1. What are the two suppression points shown?
2. Which callback suppresses the whole save?
3. Which callback suppresses only the exception throw?

### S-057 — Example suppressing the whole save

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
    DbContextEventData eventData,
    InterceptionResult<int> result,
    CancellationToken cancellationToken = default)
{
    return new(
        InterceptionResult<int>.SuppressWithResult(0));
}
```

That means:

- EF does not execute the normal save;
- `SaveChangesAsync()` returns `0`.

Summary:

- command interceptors can suppress commands;
- save interceptors can suppress saves;
- the concurrency callback can suppress the throw of a concurrency exception.

#### Study meaning

This is the simplest whole-save short-circuit: no SQL is sent and the replacement integer is zero.

#### Recall questions

1. Does EF execute the normal save in this example?
2. What value reaches the caller?
3. How does this differ from suppressing `DbUpdateConcurrencyException`?


---

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


---

# R04 — DbCommand categories, callbacks, and result shapes

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

- `command interseptors`
- `scalar executing returns object`

## Source-by-source transcript

### S-002 — SaveChangesInterceptor versus DbCommandInterceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Database command interceptors can:

- view execution;
- change the `DbCommand`;
- suppress execution;
- modify the result returned to EF.

They see:

- SQL text;
- parameters;
- execution type;
- returned reader, scalar, or affected-row count.

This differs from `SaveChangesInterceptor`:

- `SaveChangesInterceptor` works in terms of tracked entities and the SaveChanges lifecycle;
- `DbCommandInterceptor` works in terms of raw SQL commands.

#### Study meaning

Choose the interceptor based on abstraction level: unit-of-work/entity lifecycle versus provider command execution.

#### Recall questions

1. What four capabilities are listed for command interception?
2. What data does a command interceptor observe?
3. How does its abstraction differ from SaveChanges interception?

### S-006 — Three DbCommand result categories

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A `DbCommand` typically runs in one of three ways:

- **Reader:** returns rows, such as `SELECT ...`;
- **Scalar:** returns one value, such as `SELECT COUNT(*) ...`;
- **NonQuery:** returns affected-row count, such as `UPDATE`, `DELETE`, `INSERT`.

Command interceptor callback groups:

- `ReaderExecuting` / `ReaderExecuted`;
- `ScalarExecuting` / `ScalarExecuted`;
- `NonQueryExecuting` / `NonQueryExecuted`;

plus asynchronous counterparts.

#### Study meaning

Each command shape has a distinct result type, so suppression and result replacement must use the matching callback family.

#### Recall questions

1. What does each of the three command categories return?
2. Which callback family handles rowsets?
3. Why are there separate method families?

### S-010 — Suppress a scalar command with an object result

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

For scalar commands:

```csharp
public override InterceptionResult<object> ScalarExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<object> result)
{
    return InterceptionResult<object>
        .SuppressWithResult(42);
}
```

The caller receives an `object` representing `42`, not a new wrapper type chosen by the interceptor.

The interceptor should not usually inspect the incoming result value parameter; what matters is whether `HasResult == true`, meaning an earlier interceptor already suppressed execution.

#### Study meaning

Scalar interception is object-shaped because different database scalar queries can return different CLR types.

#### Recall questions

1. What public result type does ScalarExecuting use?
2. What does `HasResult` indicate?
3. What value is returned in the example?

### S-012 — ReaderExecuting logging example

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override InterceptionResult<DbDataReader> ReaderExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<DbDataReader> result)
{
    Console.WriteLine("About to run SQL:");
    Console.WriteLine(command.CommandText);

    foreach (DbParameter p in command.Parameters)
    {
        Console.WriteLine(
            $"  {p.ParameterName} = {p.Value}");
    }

    return result;
}
```

Useful for:

- targeted SQL logging;
- correlation/tracing;
- debugging query shape and parameters.

#### Study meaning

The reader pre-execution callback can inspect SQL and parameters without changing the command.

#### Recall questions

1. What result shape is used by ReaderExecuting?
2. What command data is logged?
3. Why must the incoming result normally be returned?

### S-023 — ScalarExecuting logging interceptor

**Readability:** high  
**Known limits:** the closing lines continue just below the screenshot but the complete behavior is visible

#### Near-literal normalized transcript

```csharp
public sealed class ScalarLoggingInterceptor
    : DbCommandInterceptor
{
    public override InterceptionResult<object> ScalarExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<object> result)
    {
        Console.WriteLine("Scalar SQL:");
        Console.WriteLine(command.CommandText);

        return result;
    }
}
```

#### Study meaning

This observes scalar SQL before execution while preserving normal execution.

#### Recall questions

1. Which method is overridden?
2. What is logged?
3. Does the example suppress execution?

### S-024 — What ScalarExecuting means

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

A scalar command returns one value, not a result set. Scalar interceptor methods therefore return/use `object`.

EF documents `ScalarExecuting` as returning `InterceptionResult<object>`.

Why it is useful for `EXISTS` and aggregate queries: those queries naturally return one value.

Examples:

- `SELECT COUNT(*) FROM Posts`;
- `SELECT MAX(Rating) FROM Posts`;
- `SELECT MIN(CreatedAt) FROM Posts`;
- provider-specific `EXISTS` patterns or a query translated to a single boolean-like result.

Scalar-shaped values include:

- `COUNT(*)` → integer/long;
- `MAX(...)` → one value;
- `EXISTS(...)` → usually boolean or provider-specific scalar representation.

#### Study meaning

Scalar refers to the database result shape, not to a particular CLR type.

#### Recall questions

1. Why does the callback use `object`?
2. Name three aggregate queries that produce scalar results.
3. How can EXISTS be represented?

### S-029 — ScalarExecuted result inspection

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Post-execution scalar callback:

```csharp
public override object ScalarExecuted(
    DbCommand command,
    CommandExecutedEventData eventData,
    object result)
{
    Console.WriteLine($"Scalar result: {result}");
    return result;
}
```

Great for:

- `COUNT(*)`;
- `EXISTS`;
- aggregate queries.

#### Study meaning

After execution, the interceptor sees the actual provider scalar value and normally returns it unchanged.

#### Recall questions

1. Which event data is used after execution?
2. What can be logged?
3. What should normally be returned?

### S-032 — Possible CLR values of a scalar command

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

The interceptor method deals with `object` because different scalar commands can return different CLR values:

- `int`;
- `long`;
- `string`;
- `bool`;
- `DateTime`;
- `decimal`;
- `DBNull.Value` or another null-like database result, depending on provider path.

#### Study meaning

`object` is required to accommodate heterogeneous provider results.

#### Recall questions

1. Name six possible scalar CLR values.
2. How can a database null be represented?

### S-033 — Command event data types

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

In command interceptors, methods such as:

- `ReaderExecuting`;
- `ScalarExecuting`;
- `NonQueryExecuting`;

receive event data such as:

- `CommandEventData`;
- `CommandExecutedEventData`;
- `CommandErrorEventData`.

#### Study meaning

The event-data subtype reflects before-execution, successful execution, or command error.

#### Recall questions

1. Which event data is typical before execution?
2. Which type is associated with completed execution?
3. Which type carries a command error?

### S-035 — NonQueryExecuting logging interceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public sealed class NonQueryLoggingInterceptor
    : DbCommandInterceptor
{
    public override InterceptionResult<int> NonQueryExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<int> result)
    {
        Console.WriteLine("NonQuery SQL:");
        Console.WriteLine(command.CommandText);

        return result;
    }
}
```

#### Study meaning

Non-query callbacks are integer-shaped because INSERT/UPDATE/DELETE style commands return affected-row counts.

#### Recall questions

1. What result type does NonQueryExecuting use?
2. Which SQL command families normally use it?
3. Does the example change execution?

### S-039 — ScalarExecuting and ScalarExecuted together

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override InterceptionResult<object> ScalarExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<object> result)
{
    Console.WriteLine("Scalar SQL:");
    Console.WriteLine(command.CommandText);
    return result;
}

public override object ScalarExecuted(
    DbCommand command,
    CommandExecutedEventData eventData,
    object result)
{
    Console.WriteLine(
        $"Scalar result type: {result?.GetType().Name}");
    Console.WriteLine(
        $"Scalar result value: {result}");
    return result;
}
```

#### Study meaning

The pair logs both the SQL before execution and the type/value returned afterward.

#### Recall questions

1. What is available before execution?
2. What additional information is available afterward?
3. Why use the null-conditional operator on `result`?

### S-041 — NonQueryExecuted result

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override int NonQueryExecuted(
    DbCommand command,
    CommandExecutedEventData eventData,
    int result)
{
    Console.WriteLine(
        $"Rows affected: {result}");
    return result;
}
```

#### Study meaning

The post-execution non-query callback receives and can observe or replace the affected-row integer.

#### Recall questions

1. What does `result` represent?
2. What event-data type is used?
3. What should normally be returned?

### S-043 — Commands commonly handled as non-query

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Non-query interception is commonly relevant for:

- `UPDATE`;
- `DELETE`;
- `INSERT`.

#### Study meaning

These statements normally return affected-row count rather than a rowset or scalar data value.

#### Recall questions

1. Which three SQL statement types are listed?
2. What result shape do they usually return?

### S-045 — Reader, scalar, and non-query result-type comparison

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Examples of scalar `result`:

- `42`;
- `true`;
- `3.14m`;
- `"abc"`.

Difference from other command kinds:

- `ReaderExecuting` — commands returning rowsets; result type is `DbDataReader`;
- `ScalarExecuting` — one-value result; result type is `object`;
- `NonQueryExecuting` — INSERT/UPDATE/DELETE-style commands; result type is affected-row `int`.

#### Study meaning

The callback generic/result type is determined by the database execution shape.

#### Recall questions

1. What result type is used for rowsets?
2. Why is scalar result `object`?
3. What does non-query return?

### S-055 — Core DbCommand execution methods

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Main methods:

- `ExecuteNonQuery()` / `ExecuteNonQueryAsync()`:
  - executes commands such as INSERT, UPDATE, DELETE;
  - returns affected-row count.
- `ExecuteReader()` / `ExecuteReaderAsync()`:
  - executes a query returning rows;
  - returns a `DbDataReader`.
- `ExecuteScalar()` / `ExecuteScalarAsync()`:
  - returns the first column of the first row of the first result set;
  - everything else is ignored.
- `CreateParameter()` / `CreateDbParameter()`:
  - creates a new parameter object for the command.
- `Cancel()`:
  - attempts to cancel command execution.
- `Dispose()` / `DisposeAsync()`:
  - cleanup.

#### Study meaning

The ADO.NET command API explains why EF command interception has reader, scalar, and non-query callback families.

#### Recall questions

1. What exactly does ExecuteScalar return?
2. Which method returns `DbDataReader`?
3. Which methods are used for cleanup?


---

# R05 — DbCommand metadata, registration, SQL mutation, and suppression

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

- `dbcommand`
- `command event data`

## Source-by-source transcript

### S-011 — Start of SQL logging interceptor

**Readability:** high  
**Known limits:** this source contains only the beginning of the code example

#### Near-literal normalized transcript

Example: log SQL before execution.

```csharp
using System.Data.Common;
using Microsoft.EntityFrameworkCore.Diagnostics;

public sealed class SqlLoggingInterceptor
    : DbCommandInterceptor
{
```

The method implementation continues in S-012.

#### Study meaning

The interceptor derives from `DbCommandInterceptor` and uses `DbCommand`/EF diagnostics types.

#### Recall questions

1. Which namespaces are imported?
2. Which base class is used?
3. Where does the method body continue?

### S-016 — Modify SQL text before execution

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

EF documentation includes command-interception examples where command text is changed before execution. Interceptors are specifically designed to allow this.

```csharp
public sealed class TaggingInterceptor
    : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result)
    {
        command.CommandText =
            "-- intercepted
" + command.CommandText;

        return result;
    }
}
```

#### Study meaning

A command interceptor can mutate the SQL string before it reaches the provider/database.

#### Recall questions

1. What modification is made to the SQL?
2. Which callback family is used?
3. What result is returned?

### S-020 — Legitimate and risky SQL mutation use cases

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Real uses of SQL modification:

- add database-specific hints;
- prepend comments/tags;
- enforce query-shape conventions.

Caution: changing SQL text can break provider assumptions if it is not done carefully.

#### Study meaning

Mutation is powerful but provider-sensitive; observation and tagging are safer than arbitrary rewriting.

#### Recall questions

1. Name three real uses.
2. What major risk is called out?

### S-031 — Register an interceptor

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Register interceptors through EF Core options using `AddInterceptors(...)`. The documentation explicitly says to use `AddInterceptors(IInterceptor[])` to register application interceptors.

Example:

```csharp
builder.Services.AddDbContext<AppDbContext>((sp, options) =>
{
    options.UseSqlServer(connectionString);
    options.AddInterceptors(
        new AuditSaveChangesInterceptor());
});
```

#### Study meaning

Interceptors are attached to the DbContext options pipeline, typically during DI registration.

#### Recall questions

1. Which options method registers interceptors?
2. Where in DI setup is the example placed?
3. How could a DI-resolved interceptor be supplied instead of `new`?

### S-036 — Common command event-data properties

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Commonly useful properties on command event data:

- `Command` — the `DbCommand`;
- `Context` — the current `DbContext`;
- `CommandId`;
- `Connection`;
- `ConnectionId`;
- `CommandSource`.

Example:

```csharp
public override InterceptionResult<object> ScalarExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<object> result)
{
    Console.WriteLine(command.CommandText);
    Console.WriteLine(
        eventData.Context?.GetType().Name);
    Console.WriteLine(eventData.CommandId);

    return result;
}
```

After execution, `CommandEndEventData` also provides duration and execute-method information.

#### Study meaning

Event data supports command correlation, context correlation, connection correlation, source classification, and timing.

#### Recall questions

1. Which property identifies the current DbContext?
2. What does CommandId correlate?
3. What extra data appears after execution?

### S-038 — Meaning of command identifiers, connection, and source

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

`CommandId` is a correlation ID for the specific `DbCommand` instance — “this exact command object.” It is useful for matching executing and executed logs for the same command.

`Connection` is the actual `DbConnection`, such as `SqlConnection` or `NpgsqlConnection`. It allows provider-specific inspection such as database name, data source, state, transaction association, and similar details.

`ConnectionId` is a correlation ID for the specific connection instance. Many commands may run on one connection:

- `CommandId` identifies one command;
- `ConnectionId` identifies the connection used by that command.

`CommandSource` tells why EF generated the command. It identifies the source of the DbCommand.

#### Study meaning

These properties let diagnostics correlate operations at command, connection, and EF-origin levels.

#### Recall questions

1. What does CommandId identify?
2. Why can several CommandIds share one ConnectionId?
3. What kind of information can be obtained from the provider connection?
4. What question does CommandSource answer?

### S-042 — CommandSource values

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Examples of `CommandSource` values include:

- `LinqQuery`;
- `SaveChanges`;
- `Migrations`;
- `FromSqlQuery`;
- `ExecuteSqlRaw`;
- `ValueGenerator`;
- `Scaffolding`;
- `ExecuteUpdate`;
- `ExecuteDelete`.

#### Study meaning

CommandSource classifies which EF subsystem or public API caused the command.

#### Recall questions

1. Which value indicates a normal LINQ query?
2. Which values correspond to bulk update/delete APIs?
3. Which value identifies migration SQL?

### S-046 — DbCommandInterceptor can suppress execution

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Can `DbCommandInterceptor` suppress execution?

Yes. EF command-interceptor documentation explicitly states that command execution can be viewed, changed, or suppressed, and that the result can be modified before being returned to EF.

Examples include short-circuiting a scalar or reader result in advanced scenarios. This is much less common than logging or modifying commands.

#### Study meaning

Suppression is available but requires a shape-compatible replacement value and a deliberate cache/emulation/deny policy.

#### Recall questions

1. Can command execution be suppressed?
2. What else can command interception do?
3. Why is command suppression less common than logging?

### S-047 — Use CommandSource to distinguish SaveChanges and migrations

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

```csharp
public override InterceptionResult<int> NonQueryExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<int> result)
{
    if (eventData.CommandSource ==
        CommandSource.SaveChanges)
    {
        Console.WriteLine(
            "This SQL came from SaveChanges");
    }

    if (eventData.CommandSource ==
        CommandSource.Migrations)
    {
        Console.WriteLine(
            "This SQL came from a migration");
    }

    return result;
}
```

Intuition:

- `CommandId` — which command?
- `Connection` — which actual database connection object?
- `ConnectionId` — which connection instance, in a log-friendly ID form?
- `CommandSource` — why did EF create this command?

#### Study meaning

This enables source-aware diagnostics and policies without guessing from raw SQL.

#### Recall questions

1. How can migration SQL be distinguished from SaveChanges SQL?
2. What does each of the four metadata values answer?

### S-048 — Conceptual command-deny suppression

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Conceptually:

```csharp
public override InterceptionResult<int> NonQueryExecuting(
    DbCommand command,
    CommandEventData eventData,
    InterceptionResult<int> result)
{
    if (command.CommandText.Contains("forbidden_table"))
    {
        return InterceptionResult<int>
            .SuppressWithResult(0);
    }

    return result;
}
```

Use cases:

- deny certain commands;
- emulate/cache specific commands;
- testing.

#### Study meaning

The example short-circuits a non-query and reports zero affected rows instead of executing it.

#### Recall questions

1. What condition triggers suppression?
2. What replacement result is returned?
3. Name three use cases.
4. What production risks would need review?

### S-054 — Main DbCommand properties

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Main properties:

- `CommandText` — SQL text or stored-procedure name to execute;
- `CommandTimeout` — timeout in seconds before execution fails;
- `CommandType` — how `CommandText` is interpreted, usually `Text` or `StoredProcedure`;
- `Connection` / `DbConnection` — database connection used by this command;
- `Transaction` / `DbTransaction` — transaction this command runs inside;
- `Parameters` / `DbParameterCollection` — command parameters such as `@p0`, `@id`;
- `DesignTimeVisible` — mostly design-time/UI tooling related, not important in normal EF interception;
- `UpdatedRowSource` — mostly relevant for `DbDataAdapter`, not typical EF Core usage.

#### Study meaning

These are the main low-level ADO.NET properties available through the intercepted DbCommand.

#### Recall questions

1. What does CommandType control?
2. Which property exposes the current transaction?
3. Which two properties are mostly irrelevant to normal EF Core interception?
4. What units does CommandTimeout use?

### S-058 — Five command properties usually inspected in EF Core

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Usually inspect these five:

```csharp
command.CommandText
command.CommandType
command.CommandTimeout
command.Parameters
command.Transaction
```

Sometimes also inspect:

```csharp
command.Connection
```

#### Study meaning

This is the practical shortlist for logging, diagnostics, and policy enforcement.

#### Recall questions

1. Which five properties are the usual shortlist?
2. When might Connection also be inspected?

### S-059 — Practical meaning of DbCommand properties

**Readability:** high  
**Known limits:** none

#### Near-literal normalized transcript

Example SQL:

```sql
UPDATE Posts SET Title = @p0 WHERE Id = @p1
```

Then:

- `CommandText` — that SQL string;
- `Parameters` — `@p0`, `@p1`;
- `Connection` — current SQL Server/Postgres/etc. connection;
- `Transaction` — current transaction if one exists;
- `CommandType` — usually `Text`.

Important note: `DbCommand` is the base class. Real runtime objects are usually provider-specific subclasses such as:

- `SqlCommand`;
- `NpgsqlCommand`;
- `SqliteCommand`.

#### Study meaning

EF exposes provider-neutral base abstractions while runtime instances retain provider-specific behavior and properties.

#### Recall questions

1. Which property contains the SQL string?
2. Where are `@p0` and `@p1` found?
3. What does CommandType normally equal for generated SQL?
4. Name three provider-specific DbCommand subclasses.
