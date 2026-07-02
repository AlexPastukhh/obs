# Lazy<T> — repetition guide v002

Generated: 2026-07-01

## Core mental model

1. A Lazy instance represents one eventual value.
2. `.Value` triggers initialization and then returns the cached value.
3. `IsValueCreated` means successful value creation, not merely an attempted factory call.
4. The value factory controls construction; the mode controls concurrency and failure semantics.
5. `ExecutionAndPublication` performs factory work once while other callers wait.
6. `PublicationOnly` allows duplicate factory work and publishes the first successful value.
7. `None` provides no concurrency safety.
8. Exception caching depends on constructor and mode.
9. Async initialization should cache a `Task<T>` rather than block with `.Result`.
10. One Lazy instance cannot accept different arguments at Value time.
11. Closures and per-object fields bind one fixed argument.
12. `ConcurrentDictionary<TKey, Lazy<TValue>>` provides shared lazy initialization per key.

## Mode comparison

| Mode | Factory executions under contention | Waiting | Exceptions cached | Typical use |
|---|---:|---:|---:|---|
| ExecutionAndPublication | one | yes | yes with factory | default shared/expensive initialization |
| PublicationOnly | potentially many | less | no | cheap repeatable factory or temporary-failure retry |
| None | unsafe/undefined concurrently | no synchronization | yes with factory | strictly single-threaded ownership |

## High-value questions

1. Why can `IsValueCreated` remain false while Value keeps throwing?
2. Why does PublicationOnly require a side-effect-free factory?
3. Compare the cost of duplicate work with lock contention.
4. Why is PublicationOnly usually wrong for database or HTTP cache loaders?
5. Why does `None` not solve temporary factory failures?
6. When are constructor exceptions cached?
7. Why should async lazy initialization use `Lazy<Task<T>>`?
8. How does a closure bind one argument?
9. Why does a method returning Lazy<T> not automatically create a cache?
10. Why is `ConcurrentDictionary<TKey, Lazy<TValue>>` a two-layer design?
11. What does “compute once per key” mean?
12. Compare Pattern B object ownership with Pattern C application-cache ownership.

## Coding prompts

1. Implement the basic `Lazy<int>` example and prove one computation.
2. Demonstrate cached factory exceptions.
3. Demonstrate PublicationOnly retry after a temporary failure.
4. Build `Lazy<Task<string>>` for a file read and await it safely.
5. Implement a TemplateFile with an object-owned lazy field.
6. Implement a per-user cache with `ConcurrentDictionary<int, Lazy<string>>`.
7. Add eviction to a keyed Lazy cache after a failed load.
8. Write a benchmark comparing ExecutionAndPublication and PublicationOnly for cheap factories.
9. Show why manual `if (_obj == null)` is racy.
10. Design a factory that is unsafe for PublicationOnly and explain the duplicated side effect.

## Misconceptions to reject

- Lazy<T> always caches every exception.
- IsValueCreated becomes true after any factory attempt.
- PublicationOnly gives each thread its own result.
- PublicationOnly guarantees factory execution once.
- ConcurrentDictionary alone guarantees one expensive computation per key.
- None is a normal mode for shared ASP.NET Core services.
- Lazy<T>.Value can accept a different parameter each time.
- Lazy<Task<T>> should be consumed through `.Result`.
