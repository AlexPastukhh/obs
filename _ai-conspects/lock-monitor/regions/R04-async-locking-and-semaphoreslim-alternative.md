# R04 - Async locking caveat and SemaphoreSlim alternative

Generated: 2026-06-21 14:45:12 UTC

## Source scope

```text
S-025
```

## Why await cannot be used inside lock

C# does not allow `await` inside a normal `lock` statement.

The monitor is thread-affine and scope-based, while `await` can suspend the method and resume later, potentially on another thread.

Conceptually, this is invalid:

```csharp
lock (_gate)
{
    await Task.Delay(100);
}
```

Even if a monitor were manually held across an await, doing so would be a poor design because the critical section could remain blocked for an unbounded asynchronous delay.

## Async-compatible alternative

For asynchronous mutual exclusion, use an async-compatible primitive such as `SemaphoreSlim`:

```csharp
private readonly SemaphoreSlim _gate = new(1, 1);

await _gate.WaitAsync(cancellationToken);
try
{
    await DoAsyncWork(cancellationToken);
}
finally
{
    _gate.Release();
}
```

The `finally` remains essential.

## Guidance

Use `lock` / `Monitor` for short synchronous critical sections.

Use `SemaphoreSlim.WaitAsync` or another async coordination primitive when protected work contains `await`.

Keep the protected region small and avoid holding synchronization while performing slow I/O.

