# Thread safety, lock contention, and exception behavior

Generated: 2026-07-01

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible C# is preserved.
- Thread-safety and exception semantics are kept source-specific.
- Every source includes recall questions.

## S-008 — LazyThreadSafetyMode.None

**Known limits:** none

### Near-literal normalized transcript

## `LazyThreadSafetyMode.None`

No thread safety.

- fastest;
- unsafe if multiple threads access it concurrently;
- fine when access is known to be single-threaded.

Good for:

- local variables;
- single-threaded contexts;
- performance-sensitive internals where usage is controlled.

```csharp
var lazy = new Lazy<int>(
    () => Compute(),
    LazyThreadSafetyMode.None);
```

### Study meaning

`None` removes synchronization. It is only safe when the caller can guarantee there is no concurrent access to the same Lazy instance.

### Recall questions

1. What protection does None provide?
2. Why can it be fastest?
3. Name three suitable contexts.
4. Why is it risky in an ASP.NET Core shared service?


---

## S-009 — PublicationOnly semantics

**Known limits:** none

### Near-literal normalized transcript

## `LazyThreadSafetyMode.PublicationOnly`

Multiple threads may run the factory at the same time.

- the first successfully created value wins and is stored;
- other computed values are discarded;
- reduces blocking compared with `ExecutionAndPublication`;
- exceptions are not cached in the same way, so future attempts can retry.

Good for:

- expensive but side-effect-free factories;
- cases where duplicate work is acceptable;
- situations where less lock contention is desired.

```csharp
var lazy = new Lazy<Thing>(
    () => BuildThing(),
    LazyThreadSafetyMode.PublicationOnly);
```

### Study meaning

PublicationOnly trades duplicate work for reduced waiting. Correctness requires every competing factory execution to be safe and equivalent.

### Recall questions

1. Can several threads run the factory?
2. Which computed result is retained?
3. What happens to losing results?
4. How does exception behavior differ?
5. What factory property is essential?


---

## S-010 — PublicationOnly factory requirements

**Known limits:** none

### Near-literal normalized transcript

## Very important

The factory can run multiple times in this mode.

Therefore the factory should be:

- idempotent or side-effect-free;
- safe to run more than once.

### Study meaning

A factory that sends emails, charges a card, inserts a row, or mutates shared state is generally unsuitable for PublicationOnly because duplicate executions are expected under contention.

### Recall questions

1. Why can PublicationOnly repeat work?
2. What does idempotent mean here?
3. Give two side effects that would make the factory unsafe.


---

## S-011 — Exception caching with ExecutionAndPublication

**Known limits:** none

### Near-literal normalized transcript

## Exception behavior

`Lazy<T>` can cache exceptions.

With `ExecutionAndPublication` and typical factory constructors, if the factory throws the first time:

- `.Value` throws;
- future `.Value` calls throw the same exception again;
- the factory is not retried.

```csharp
var lazy = new Lazy<int>(
    () => throw new InvalidOperationException("boom"));

try { _ = lazy.Value; } catch { }
try { _ = lazy.Value; } catch { } // throws again
```

### Study meaning

Exception caching makes failure deterministic and fail-fast, but it can permanently poison that Lazy instance when the failure was temporary.

### Recall questions

1. How many times does the shown factory execute?
2. What do later Value calls do?
3. When is this behavior useful?
4. When can it be harmful?


---

## S-012 — PublicationOnly retry behavior

**Known limits:** none

### Near-literal normalized transcript

## With `PublicationOnly`

A failed attempt does not necessarily poison the Lazy forever.

Another thread or a later access may retry and succeed.

### Study meaning

Because exceptions are not cached in PublicationOnly, temporary failures can be followed by another creation attempt.

### Recall questions

1. Is the first exception permanently cached?
2. Who may retry?
3. What mode is appropriate when recovery without restart matters?


---

## S-016 — Definition of lock contention

**Known limits:** none

### Near-literal normalized transcript

## What “less lock contention” means

Less lock contention means fewer threads are fighting over the same lock.

When multiple threads reach code protected by a lock or lock-like synchronization:

- only one can proceed at a time;
- the others must wait;
- that waiting is contention.

### Study meaning

Contention is waiting caused by multiple runnable threads competing for one synchronization point.

### Recall questions

1. What is lock contention?
2. How many threads proceed through one lock at a time?
3. What cost do waiting threads impose?


---

## S-017 — Contention in ExecutionAndPublication

**Known limits:** none

### Near-literal normalized transcript

## In Lazy<T> terms

With `ExecutionAndPublication`:

- the first thread enters and runs the factory;
- other threads attempting `.Value` must wait;
- they contend on the same synchronization point.

This is often correct and desired, but under heavy concurrency it means blocking.

### Study meaning

ExecutionAndPublication deliberately converts duplicate work into waiting.

### Recall questions

1. Which thread runs the factory?
2. What do the others do?
3. Why can this still be the preferred behavior?


---

## S-018 — What PublicationOnly can improve

**Known limits:** none

### Near-literal normalized transcript

## What is the benefit?

The benefit is not correctness — both modes can be correct.

The benefit is sometimes latency or throughput under contention.

### ExecutionAndPublication

- one thread works;
- others block and wait.

### PublicationOnly

- many threads may work in parallel;
- there is less waiting/blocking;
- duplicate work occurs.

The practical benefit can be fewer blocked threads and possibly better performance when the factory is cheap enough and lock waiting costs more than duplicate work.

### Study meaning

PublicationOnly is a performance trade-off. It is beneficial only when duplicated factory work is cheaper than serialized waiting.

### Recall questions

1. Is PublicationOnly inherently more correct?
2. What cost does it reduce?
3. What new cost does it introduce?
4. When can throughput improve?


---

## S-019 — Why PublicationOnly is often bad for shared per-key caches

**Known limits:** none

### Near-literal normalized transcript

Question:

> If multiple threads do one work and only the first value gets cached, and everyone gets this value rather than their own, what is the benefit?

Answer:

With `PublicationOnly`:

- multiple threads may run the factory;
- only one result is published and cached;
- all callers ultimately use the published value;
- extra work from losing threads is mostly wasted.

That is why PublicationOnly is often a bad fit for Pattern C.

### Study meaning

In a shared cache, the goal is commonly “perform expensive work once per key.” PublicationOnly can violate the work-once goal even though the final cached value is correct.

### Recall questions

1. How many values are eventually cached?
2. What happens to losing results?
3. Why is this wasteful in a shared cache?


---

## S-020 — Why duplicate work is costly in Pattern C

**Known limits:** none

### Near-literal normalized transcript

## Why this usually does not help in Pattern C

Pattern C is commonly used for expensive work:

- database calls;
- HTTP calls;
- file reads;
- heavy parsing or CPU work.

In those cases, duplicate work is much worse than waiting.

Therefore in most real Pattern C scenarios, `PublicationOnly` gives little benefit and substantial waste. `ExecutionAndPublication` is the default recommendation.

### Study meaning

The expensive operation, not the lock, dominates cost in typical cache-by-key scenarios.

### Recall questions

1. Name four expensive operations listed.
2. Which cost is usually worse: waiting or duplicate expensive work?
3. What mode is recommended for Pattern C?


---

## S-021 — When PublicationOnly can make sense

**Known limits:** none

### Near-literal normalized transcript

## When `PublicationOnly` can make sense

The factory should be:

- cheap;
- idempotent;
- safe to run multiple times;
- used where lock contention measurably hurts performance.

Example-like cases:

- lightweight object creation;
- cheap computed lookup;
- low-cost parsing;
- scenarios where “do not block threads” matters more than duplicate work.

Even then, choose it based on measured performance behavior, not by default.

### Study meaning

PublicationOnly is a specialized optimization that should be justified by profiling and safe factory semantics.

### Recall questions

1. What four factory/traffic conditions are required?
2. Name three example workloads.
3. What evidence should justify selecting this mode?


---

## S-023 — PublicationOnly for retriable lazy initialization

**Known limits:** none

### Near-literal normalized transcript

## Example: use `PublicationOnly` for retriable lazy initialization

When failure may be temporary and lazy retry is desired:

```csharp
private readonly Lazy<ApiClient> _client =
    new(
        () => ApiClientFactory.Create(),
        LazyThreadSafetyMode.PublicationOnly);
```

What changes:

- exceptions are not cached;
- after one failed access, a later access can try again;
- the first successful creation wins and is stored.

Trade-off during contention:

- multiple threads may run the factory simultaneously;
- this is acceptable only when the factory is idempotent and safe to repeat;
- duplicate temporary work must be acceptable.

### Study meaning

PublicationOnly can serve as a recovery-friendly lazy mode, but it does not provide a controlled backoff, timeout, or sophisticated retry policy.

### Recall questions

1. What failure property motivates PublicationOnly here?
2. What happens after one failed access?
3. What value is retained after success?
4. What concurrency trade-off remains?


---

## S-024 — Practical mode-selection checklist

**Known limits:** none

### Near-literal normalized transcript

## Practical checklist

Use exception caching with `ExecutionAndPublication` when:

- initialization failure means the app is broken until deployment/configuration is fixed;
- examples: parsing local config, loading embedded resources, building static lookup tables;
- deterministic fail-fast behavior is desired.

Avoid exception caching, or use `PublicationOnly`, when:

- failure may be temporary;
- examples: network, DNS, database availability, cloud metadata, or secrets-provider hiccups;
- the app should recover without restart.

Avoid `None` unless:

- access is certainly single-threaded, which is rare in ASP.NET Core;
- note that `None` still caches factory exceptions, so it often does not solve a temporary-failure problem.

### Study meaning

Thread safety and exception caching are separate selection criteria. `None` removes synchronization but does not generally provide retry semantics for a value factory.

### Recall questions

1. Give three permanent-failure examples.
2. Give five temporary-failure examples.
3. Why is None not a normal retry solution?
4. Which mode supports later retry?


---

## S-027 — Constructor choice and exception caching

**Known limits:** none

### Near-literal normalized transcript

## Exception caching

- without a value factory, exceptions from `new T()` are not cached;
- with a value factory, exceptions are cached in `ExecutionAndPublication` and `None`;
- `PublicationOnly` never caches exceptions, whether a factory is used or not.

### Study meaning

Exception semantics depend on both how the value is created and which mode is selected.

### Recall questions

1. Are default-constructor exceptions cached?
2. Which factory modes cache exceptions?
3. Which mode never caches them?
4. Why must constructor choice be part of failure design?


---

## S-033 — Direct comparison of thread-safety modes

**Known limits:** none

### Near-literal normalized transcript

## If multiple threads reach expensive work, who gets which result?

### `ExecutionAndPublication`

- only one thread does the expensive work;
- all threads receive the one cached result.

### `PublicationOnly`

- multiple threads may do the expensive work;
- only one result is cached;
- all threads ultimately receive the winning published result;
- other computed results are discarded.

### `None`

- no safe guarantee exists under concurrency.

### Study meaning

The modes differ in work duplication and synchronization, not in the goal of exposing one final Lazy value after successful publication.

### Recall questions

1. Which mode guarantees one factory execution?
2. Which mode discards losing results?
3. Do losing callers keep their own computed values?
4. What guarantee exists with None?


---

## S-036 — Avoid None in Pattern C

**Known limits:** none

### Near-literal normalized transcript

## Avoid `None` in Pattern C

Pattern C is usually used in concurrent applications such as web apps, so `LazyThreadSafetyMode.None` is risky.

### Study meaning

A shared dictionary does not make each Lazy value thread-safe. Its internal mode must still match concurrent access.

### Recall questions

1. Why is Pattern C normally concurrent?
2. Does ConcurrentDictionary automatically synchronize Lazy.Value creation?
3. Which mode is normally preferred?
