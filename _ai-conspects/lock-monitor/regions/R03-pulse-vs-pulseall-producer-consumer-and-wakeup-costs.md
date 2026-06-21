# R03 - Pulse vs PulseAll, producer/consumer flow and wakeup costs

Generated: 2026-06-21 14:45:12 UTC

## Source scope

```text
S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024
```

## Pulse and PulseAll

`Monitor.Pulse(gate)` wakes one thread waiting on that monitor.

`Monitor.PulseAll(gate)` wakes all threads waiting on that monitor.

Neither method releases the lock immediately. The awakened thread can continue only after the current owner exits the critical section and the waiter reacquires the same monitor.

## Queue pattern

A classic producer/consumer shape uses one gate and one queue.

Producer:

```csharp
lock (_gate)
{
    _queue.Enqueue(item);
    Monitor.Pulse(_gate);
}
```

Consumer:

```csharp
lock (_gate)
{
    while (_queue.Count == 0)
    {
        Monitor.Wait(_gate);
    }

    return _queue.Dequeue();
}
```

`Monitor.Wait` releases the gate while the consumer sleeps and reacquires it before returning.

## Why the condition is a while loop

A wakeup is only permission to check again. It is not a guarantee that the condition remains true.

Another consumer may reacquire the monitor first and consume the only queued item. Therefore:

```text
while condition is false
    wait
```

is correct, while a one-time `if` check is unsafe.

## Choosing Pulse

Use `Pulse` when one state change allows one waiter to make useful progress.

Example:

```text
one item added
one consumer can dequeue it
```

This avoids waking all consumers when only one can proceed.

## Choosing PulseAll

Use `PulseAll` when:

```text
multiple waiters may now proceed
shutdown/state change affects every waiter
several different conditions share one monitor
all waiters should wake, re-check and possibly exit
```

Every awakened waiter must still reacquire the lock and re-check its condition.

## Wakeup cost

If one item is added and `PulseAll` wakes ten consumers:

```text
all ten wake
all compete for the monitor
one dequeues
nine re-check and wait again
```

This is correct but wasteful. It creates unnecessary context switches and lock contention.

## Practical guidance

Prefer `Pulse` for one-resource/one-consumer progress.

Prefer `PulseAll` for global state changes or when the signaling code cannot know which waiter condition became true.

For new application code, higher-level primitives may be clearer:

```text
Channel<T>
SemaphoreSlim
concurrent collections
async queues
```

## Boundary correction

Stage0 provisionally described this area as deadlocks/reentrancy/timeouts. Visual review showed that the actual screenshots are primarily about `Wait`, `Pulse`, `PulseAll`, queue coordination and wakeup costs. The final R03 title follows the source content.

