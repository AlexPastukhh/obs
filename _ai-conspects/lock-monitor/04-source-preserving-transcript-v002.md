# Lock / Monitor — corrected source-by-source transcript v002

> Source-preserving correction transcript. Wording is normalized, but visible claims and code are retained.

## S-001 — Is blocking always bad in ASP.NET Core?

### Near-literal visible content

- Blocking is not automatically wrong.
- Bad blocking means blocking a request thread while waiting for I/O or long work when asynchronous APIs exist.
- Examples: `Thread.Sleep`, `.Result`/`.Wait()` on async I/O, synchronous database/network/file calls when async alternatives exist, or holding a lock while doing expensive work.
- This hurts scalability because the request thread sits idle.

### Study takeaway

- This hurts scalability because the request thread sits idle.

## S-002 — Fine blocking

### Near-literal visible content

- A short critical section protected by `lock` is normal.
- A memory-only update such as incrementing a counter can be safely protected by a private gate.
- `lock` itself is not the problem; blocking long operations or blocking on async work is the problem.

### Visible code

```csharp
private static readonly object _gate = new();
private static int _counter;

public static void Increment()
{
    lock (_gate)
    {
        _counter++;
    }
}
```

### Study takeaway

- `lock` itself is not the problem; blocking long operations or blocking on async work is the problem.

## S-003 — What is `_gate`?

### Near-literal visible content

- `_gate` is an object used as the synchronization token.
- The runtime monitor associated with that object decides which thread may enter the critical section.
- Think of it as a private door: one thread enters while others wait.
- The object should usually be `private readonly` and used only for coordination.

### Visible code

```csharp
private readonly object _gate = new();

lock (_gate)
{
    // critical section
}
```

### Study takeaway

- The object should usually be `private readonly` and used only for coordination.

## S-004 — Why use a private object?

### Near-literal visible content

- `Monitor` works on reference-type objects.
- A private gate prevents unrelated external code from locking the same object and creating accidental deadlocks or contention.
- Avoid locking on `this`, `typeof(...)`, public objects, or interned strings.
- Use a dedicated private lock object.

### Visible code

```csharp
// Bad
lock (this) { }
lock (typeof(MyType)) { }
lock ("shared-string") { }

// Good
private readonly object _gate = new();
lock (_gate) { }
```

### Study takeaway

- Use a dedicated private lock object.

## S-005 — How lock works conceptually

### Near-literal visible content

- Try to acquire exclusive ownership of `_gate`.
- If another thread already owns it, wait.
- After acquisition, run the protected work.
- When leaving the block, release the monitor automatically.
- Only one thread at a time can be inside a `lock` using the same gate; different gates are independent.

### Study takeaway

- Only one thread at a time can be inside a `lock` using the same gate; different gates are independent.

## S-006 — lock is syntax over Monitor

### Near-literal visible content

- The C# `lock` statement is roughly translated into `Monitor.Enter` followed by `Monitor.Exit` in `finally`.
- The `finally` is essential so the monitor is released even when the critical section throws.

### Visible code

```csharp
lock (_gate)
{
    DoWork();
}

// Roughly:
Monitor.Enter(_gate);
try
{
    DoWork();
}
finally
{
    Monitor.Exit(_gate);
}
```

### Study takeaway

- The `finally` is essential so the monitor is released even when the critical section throws.

## S-007 — Monitor — full picture

### Near-literal visible content

- `Monitor` is a synchronization primitive that provides exclusive access to a reference-type object.
- It provides Enter, Exit, TryEnter, Wait, Pulse, and PulseAll.
- These form two families: mutual exclusion and condition waiting/signaling.
- Monitor itself is the underlying idea behind `lock`.

### Study takeaway

- Monitor itself is the underlying idea behind `lock`.

## S-008 — Monitor.Enter

### Near-literal visible content

- `Monitor.Enter(obj)` acquires the monitor for the object, waiting if necessary.
- If another thread owns the monitor, the current thread blocks until it can enter.
- Use `try/finally` so `Monitor.Exit` always runs.

### Visible code

```csharp
Monitor.Enter(_gate);
try
{
    DoWork();
}
finally
{
    Monitor.Exit(_gate);
}
```

### Study takeaway

- Use `try/finally` so `Monitor.Exit` always runs.

## S-009 — Monitor.Exit

### Near-literal visible content

- `Monitor.Exit(obj)` releases the monitor lock for the object.
- Only the thread that entered/owns the monitor should exit it.
- It is normally called from `finally`.

### Visible code

```csharp
Monitor.Exit(_gate);
```

### Study takeaway

- It is normally called from `finally`.

## S-010 — Monitor.TryEnter — immediate attempt

### Near-literal visible content

- `TryEnter` attempts to acquire the lock without waiting forever.
- The immediate form returns a Boolean indicating whether entry succeeded.
- If entry succeeds, the caller must release the monitor in `finally`.

### Visible code

```csharp
if (Monitor.TryEnter(_gate))
{
    try
    {
        DoWork();
    }
    finally
    {
        Monitor.Exit(_gate);
    }
}
else
{
    // could not acquire immediately
}
```

### Study takeaway

- If entry succeeds, the caller must release the monitor in `finally`.

## S-011 — TryEnter with a timeout

### Near-literal visible content

- A timeout overload waits only for the specified period.
- If the monitor cannot be acquired within that time, the code follows the failure path.

### Visible code

```csharp
if (Monitor.TryEnter(_gate, TimeSpan.FromMilliseconds(100)))
{
    try
    {
        DoWork();
    }
    finally
    {
        Monitor.Exit(_gate);
    }
}
else
{
    // could not acquire within 100 ms
}
```

### Study takeaway

- If the monitor cannot be acquired within that time, the code follows the failure path.

## S-012 — Safe Boolean-overload pattern

### Near-literal visible content

- The `ref bool lockTaken` overload records whether the lock was acquired.
- Only call `Monitor.Exit` when `lockTaken` is true.
- This is often considered the safest explicit Monitor pattern.

### Visible code

```csharp
bool lockTaken = false;
try
{
    Monitor.TryEnter(
        _gate,
        TimeSpan.FromMilliseconds(100),
        ref lockTaken);

    if (lockTaken)
        DoWork();
}
finally
{
    if (lockTaken)
        Monitor.Exit(_gate);
}
```

### Study takeaway

- This is often considered the safest explicit Monitor pattern.

## S-013 — Enter versus TryEnter

### Near-literal visible content

- `Enter` blocks until the lock is acquired and has no timeout.
- `TryEnter` attempts entry immediately or for a limited timeout.
- Use `TryEnter` for timeout behavior, best-effort access, avoiding indefinite waiting, or fallback logic.

### Study takeaway

- Use `TryEnter` for timeout behavior, best-effort access, avoiding indefinite waiting, or fallback logic.

## S-014 — Monitor argument rules

### Near-literal visible content

- `Monitor.Enter`, `Exit`, `TryEnter`, `Wait`, `Pulse`, and `PulseAll` receive the object whose monitor is used.
- `TryEnter` overloads may also receive a timeout and/or `ref bool lockTaken`.
- `Wait`, `Pulse`, and `PulseAll` require the calling thread to already own the monitor; otherwise `SynchronizationLockException` is thrown.
- `Monitor.Exit` also requires ownership.

### Study takeaway

- `Monitor.Exit` also requires ownership.

## S-015 — Monitor is reentrant

### Near-literal visible content

- A thread that already owns a monitor can enter the same monitor again.
- The runtime keeps a recursion count.
- The same thread must exit the monitor the matching number of times before another thread can acquire it.

### Visible code

```csharp
lock (_gate)
{
    MethodB();
}

void MethodB()
{
    lock (_gate)
    {
        // same thread re-enters
    }
}
```

### Study takeaway

- The same thread must exit the monitor the matching number of times before another thread can acquire it.

## S-016 — Monitor.Wait, Pulse, and PulseAll

### Near-literal visible content

- These methods implement condition waiting, not general event broadcasting.
- `Wait` must be called while holding the lock; it temporarily releases the monitor and suspends the thread.
- When awakened, the thread must reacquire the monitor before `Wait` returns.
- `Pulse` wakes one waiter; `PulseAll` wakes all current waiters.
- Always re-check the condition in a `while` loop after waking.

### Visible code

```csharp
lock (_gate)
{
    while (!condition)
        Monitor.Wait(_gate);
}
```

### Study takeaway

- Always re-check the condition in a `while` loop after waking.

## S-017 — Pulse and PulseAll semantics

### Near-literal visible content

- `Monitor.Pulse(_gate)` marks one waiting thread as ready.
- `Monitor.PulseAll(_gate)` marks all waiting threads as ready.
- A pulse does not release the monitor immediately.
- Woken threads still have to reacquire the lock before continuing.

### Visible code

```csharp
Monitor.Pulse(_gate);
Monitor.PulseAll(_gate);
```

### Study takeaway

- Woken threads still have to reacquire the lock before continuing.

## S-018 — Producer-consumer example

### Near-literal visible content

- A producer enqueues an item under the gate and calls `Pulse`.
- A consumer waits while the queue is empty.
- After waking and reacquiring the monitor, the consumer rechecks the condition and dequeues an item.

### Visible code

```csharp
private readonly object _gate = new();
private readonly Queue<int> _queue = new();

public void Enqueue(int value)
{
    lock (_gate)
    {
        _queue.Enqueue(value);
        Monitor.Pulse(_gate);
    }
}

public int Dequeue()
{
    lock (_gate)
    {
        while (_queue.Count == 0)
            Monitor.Wait(_gate);

        return _queue.Dequeue();
    }
}
```

### Study takeaway

- After waking and reacquiring the monitor, the consumer rechecks the condition and dequeues an item.

## S-019 — What happens during condition signaling

### Near-literal visible content

- A thread enters the lock, sees the queue is empty, and calls `Monitor.Wait`.
- `Wait` releases the lock and suspends that thread.
- Another thread enters, changes the condition, and calls Pulse/PulseAll.
- The waiting thread becomes eligible to run but continues only after it reacquires the same monitor.
- Monitor does not create a queue, semaphore, or communication channel; it coordinates access around a condition guarded by the lock.

### Study takeaway

- Monitor does not create a queue, semaphore, or communication channel; it coordinates access around a condition guarded by the lock.

## S-020 — Pulse versus PulseAll

### Near-literal visible content

- `Pulse` wakes one waiting thread.
- `PulseAll` wakes all waiting threads.
- Use the choice deliberately: waking every waiter can create unnecessary contention.

### Study takeaway

- Use the choice deliberately: waking every waiter can create unnecessary contention.

## S-021 — Multiple waiting consumers

### Near-literal visible content

- Suppose consumers A, B, and C are waiting because the queue is empty.
- If one item is added, `Pulse` is usually sufficient: one waiter wakes and one item can be consumed.
- `PulseAll` wakes all three, but only one can take the item; the others reacquire the lock, find the condition false, and wait again.
- This can waste scheduling and lock work.

### Study takeaway

- This can waste scheduling and lock work.

## S-022 — PulseAll sequence

### Near-literal visible content

- All waiting threads are awakened, but they do not run inside the lock simultaneously.
- They reacquire the monitor one at a time.
- The first may consume the available item; later threads must re-check the condition and may go back to waiting.
- Use `while`, not `if`, around `Monitor.Wait`.

### Study takeaway

- Use `while`, not `if`, around `Monitor.Wait`.

## S-023 — When to use Pulse

### Near-literal visible content

- Use `Pulse` when one state change allows one waiter to make progress.
- Typical examples: one queued item becomes available, one slot becomes free, or only one consumer can use the changed state.
- It is the normal queue case.

### Visible code

```csharp
lock (_gate)
{
    _queue.Enqueue(item);
    Monitor.Pulse(_gate);
}
```

### Study takeaway

- It is the normal queue case.

## S-024 — When to use PulseAll

### Near-literal visible content

- Use `PulseAll` when multiple waiters may now be able to proceed, or when a global condition changes and every waiter should re-check it.
- Examples: shutdown requested, a shared resource becomes broadly available, or the condition is no longer true for everyone.
- It can be wasteful because every awakened thread must reacquire the lock and re-evaluate its condition.

### Visible code

```csharp
lock (_gate)
{
    _stopping = true;
    Monitor.PulseAll(_gate);
}
```

### Study takeaway

- It can be wasteful because every awakened thread must reacquire the lock and re-evaluate its condition.

## S-025 — Can await be used inside lock?

### Near-literal visible content

- No. C# does not allow `await` inside a `lock` statement.
- `lock` is a thread-affine, scope-based synchronous monitor; an `await` may suspend and resume later, potentially on another thread.
- For asynchronous mutual exclusion, use a construct such as `SemaphoreSlim` with `WaitAsync`, then release it in `finally`.
- Keep synchronous `lock` sections short and free of async I/O.

### Visible code

```csharp
// Not allowed
lock (_gate)
{
    await Task.Delay(100);
}

// Async-compatible alternative
await _semaphore.WaitAsync();
try
{
    await DoAsyncWork();
}
finally
{
    _semaphore.Release();
}
```

### Study takeaway

- Keep synchronous `lock` sections short and free of async I/O.
