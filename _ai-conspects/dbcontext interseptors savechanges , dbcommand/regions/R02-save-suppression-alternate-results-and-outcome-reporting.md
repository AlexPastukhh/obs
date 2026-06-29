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
