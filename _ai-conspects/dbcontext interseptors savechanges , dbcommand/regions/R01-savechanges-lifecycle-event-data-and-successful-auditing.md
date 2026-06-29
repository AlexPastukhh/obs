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
