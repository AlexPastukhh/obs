# Lazy<T> initialization, thread safety, and caching patterns — source-preserving transcript v002

Generated: 2026-07-01

## Coverage

```text
unique embedded screenshots: 38
image uses: 38
native SVG labels: 21
source-preserving blocks: 38
uncovered screenshot uses: 0
duplicate screenshot contents: 0
```

## Why Stage1 v001 is superseded

The old Stage1 pass formally assigned all 38 source IDs but repeatedly used generic statements such as “Lazy<T> delays creation until Value” for screenshots that actually contained different mode, exception, async, and cache semantics.

This v002 transcript preserves every screenshot individually.

## Native canvas labels

The following Excalidraw labels are canvas annotations rather than replacement transcripts:

```text
LAZY
!!!
exception caching
factory lazy
ctor lazy
async
lazy<Task>
SO HERE WE CAN HAVE DIFFERENT ARGS BUT IT ISNOT SUITABLE FOR SHARED CACHE,
ONLY FOR SOME PRIVATE CACHE
SHARED CACHE IMPLEMENTATION, CAN CREATE METHOD THAT ACCEPTS
ARGUMENT AND SETS IT AS KEY AND INTERNALLY DOES GETORADD
ONE CAPTURED VALUE FOR ALL USAGES, CANT CHANGE IT
DEFAULT
BEST FOR PATTER C
lazy with params
different patterns
lock contention
threadsafety modes
exception behavior
```



---

# Basics, constructors, and value access

Generated: 2026-07-01

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible C# is preserved.
- Thread-safety and exception semantics are kept source-specific.
- Every source includes recall questions.

## S-001 — Basic Lazy<T> behavior

**Known limits:** none

### Near-literal normalized transcript

## Basic behavior

### 1) Deferred execution

Creation is postponed until `.Value` is accessed.

### 2) Caching

After the first successful creation, the result is stored.

### 3) Exception caching — usually

If the factory throws, `Lazy<T>` can remember that exception and throw it again on future `.Value` calls. Exact behavior depends on the constructor and `LazyThreadSafetyMode`.

### Study meaning

`Lazy<T>` combines delayed creation with one-value caching. Failure behavior is part of the selected constructor/mode and must be chosen deliberately.

### Recall questions

1. What operation normally triggers initialization?
2. What happens after successful initialization?
3. Is exception caching identical for every constructor and mode?
4. What three behaviors define the basic Lazy<T> model?


---

## S-002 — Simple deferred computation example

**Known limits:** none

### Near-literal normalized transcript

## Simple example

```csharp
using System;

Lazy<int> lazyNumber = new Lazy<int>(() =>
{
    Console.WriteLine("Computing...");
    return 42;
});

Console.WriteLine("Before Value");
Console.WriteLine(lazyNumber.Value); // prints "Computing...", then 42
Console.WriteLine(lazyNumber.Value); // just 42, no recompute
```

### Study meaning

Creating the `Lazy<int>` does not run the lambda. The first `.Value` call executes it and caches `42`; later reads reuse the cached result.

### Recall questions

1. What is printed before the factory runs?
2. Which line triggers `Computing...`?
3. How many times is the lambda executed?
4. What does the second `.Value` call return?


---

## S-003 — Value and IsValueCreated

**Known limits:** none

### Near-literal normalized transcript

## Key properties and members

### `.Value`

Gets the actual `T`. Triggers initialization if it has not happened yet.

### `.IsValueCreated`

Returns `true` if the value was successfully created already.

```csharp
if (!lazy.IsValueCreated)
{
    // not initialized yet
}
```

Important: if initialization throws, `IsValueCreated` stays `false`.

### Study meaning

`IsValueCreated` reports successful publication, not whether an initialization attempt occurred. A cached exception can therefore coexist with `IsValueCreated == false`.

### Recall questions

1. What does `.Value` do before initialization?
2. When does `IsValueCreated` become true?
3. What is its value after a failed factory execution?
4. Does false necessarily mean the factory has never run?


---

## S-004 — Default and factory constructors

**Known limits:** none

### Near-literal normalized transcript

## Constructors

### 1) Default constructor

```csharp
var x = new Lazy<MyType>();
```

Uses `new MyType()` when `.Value` is first accessed.

Requires a public parameterless constructor.

### 2) Factory constructor

```csharp
var x = new Lazy<MyType>(() => CreateMyType());
```

Most common and most useful.

### Study meaning

The parameterless Lazy constructor delegates creation to `new T()`. A value factory supports custom construction, dependencies, arguments captured by closure, and arbitrary setup logic.

### Recall questions

1. What requirement does `new Lazy<MyType>()` impose on MyType?
2. When is `new MyType()` executed?
3. Why is the factory constructor more flexible?
4. Which constructor is described as most common?


---

## S-005 — Factory plus thread-safety mode

**Known limits:** none

### Near-literal normalized transcript

### 3) Factory + thread-safety mode

```csharp
var x = new Lazy<MyType>(
    () => CreateMyType(),
    LazyThreadSafetyMode.ExecutionAndPublication);
```

This lets you control behavior under concurrency.

### Study meaning

The second constructor argument selects synchronization, publication, and exception-caching semantics rather than merely performance.

### Recall questions

1. Which constructor argument selects concurrency behavior?
2. Which mode is shown?
3. What aspects besides speed can a mode change?


---

## S-006 — ExecutionAndPublication semantics

**Known limits:** none

### Near-literal normalized transcript

## Thread-safety modes

### `LazyThreadSafetyMode.ExecutionAndPublication` — most common

Use this by default in multithreaded applications.

- only one thread runs the factory;
- other threads wait;
- one result is published and reused;
- exceptions are cached.

Good for:

- expensive initialization;
- singleton/shared instances;
- correctness-first scenarios.

### Study meaning

This mode serializes initialization. It avoids duplicate work and gives every caller the same successful value or the same cached failure.

### Recall questions

1. How many threads execute the factory?
2. What do concurrent callers do?
3. Are exceptions cached?
4. Name the three recommended use cases.


---

## S-007 — ExecutionAndPublication code example

**Known limits:** the screenshot is a cropped code continuation; the complete visible code is preserved

### Near-literal normalized transcript

```csharp
var lazy = new Lazy<Service>(
    () => new Service(),
    LazyThreadSafetyMode.ExecutionAndPublication);
```

### Study meaning

This is the explicit form of the common correctness-first lazy initialization pattern for a service.

### Recall questions

1. What type is created?
2. Which factory expression creates it?
3. Which mode is explicitly selected?


---

## S-013 — Lazy<T> versus manual null checking

**Known limits:** none

### Near-literal normalized transcript

## `Lazy<T>` versus “just null-checking”

Manual approach:

```csharp
if (_obj == null)
    _obj = Create();
```

In multithreaded code this is unsafe unless correct locking is added.

`Lazy<T>` provides a tested implementation with clear semantics.

### Study meaning

A null check alone does not make initialization atomic. Multiple threads can observe null and create multiple values or publish state incorrectly.

### Recall questions

1. What race exists in the null-check example?
2. What extra mechanism would manual code require?
3. What does Lazy<T> provide beyond shorter syntax?


---

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


---

# Asynchronous lazy initialization

Generated: 2026-07-01

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible C# is preserved.
- Thread-safety and exception semantics are kept source-specific.
- Every source includes recall questions.

## S-014 — Async factory rule

**Known limits:** none

### Near-literal normalized transcript

If the factory is asynchronous, use:

```csharp
Lazy<Task<T>>
```

Do not use `Lazy<T>` and then block with `.Result`.

### Study meaning

The Lazy value should be the Task itself. Callers await the cached Task instead of synchronously blocking and risking deadlocks or thread starvation.

### Recall questions

1. What generic shape is recommended for async initialization?
2. Why is `.Result` discouraged?
3. What exactly is cached in Lazy<Task<T>>?


---

## S-015 — Lazy<Task<string>> file example

**Known limits:** none

### Near-literal normalized transcript

```csharp
private readonly Lazy<Task<string>> _content;

public MyType(string path)
{
    _content = new Lazy<Task<string>>(
        () => File.ReadAllTextAsync(path));
}

public Task<string> GetContentAsync()
    => _content.Value;
```

### Study meaning

The first call creates one asynchronous file-read Task. Later callers receive the same Task and therefore share the same completion/result.

### Recall questions

1. What type does the factory return?
2. When does the file read begin?
3. Do later callers start another read?
4. How should a caller consume GetContentAsync?


---

# Factories, arguments, and object-owned Lazy fields

Generated: 2026-07-01

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible C# is preserved.
- Thread-safety and exception semantics are kept source-specific.
- Every source includes recall questions.

## S-022 — Constructor-based Lazy<T> example

**Known limits:** none

### Near-literal normalized transcript

Constructor-based lazy creation is mainly useful when `T` has a public parameterless constructor and does not need dependency-injection arguments.

### Simple in-memory object

```csharp
public class ExpensiveLookup
{
    public Dictionary<int, string> Data { get; }

    public ExpensiveLookup()
    {
        Console.WriteLine("Building lookup...");
        Data = Enumerable.Range(1, 100000)
            .ToDictionary(x => x, x => $"Item-{x}");
    }
}

var lazyLookup = new Lazy<ExpensiveLookup>();
```

### Study meaning

The default Lazy constructor delays a normal parameterless constructor. It works well for self-contained objects but cannot directly pass constructor arguments.

### Recall questions

1. What constructor must ExpensiveLookup expose?
2. What data structure is built?
3. How many entries are generated?
4. When does the constructor run?


---

## S-025 — How default Lazy<T> creates the value

**Known limits:** none

### Near-literal normalized transcript

## How the value is created

### Without a factory

```csharp
var lazy = new Lazy<MyType>();
```

- uses `new MyType()`;
- `MyType` must have a public parameterless constructor;
- dependencies or arguments cannot be passed directly.

### Study meaning

The constructor-based form delegates creation to reflection/runtime construction of `T`.

### Recall questions

1. What expression creates the value?
2. What constructor is required?
3. Why can this form not directly receive dependencies?


---

## S-026 — How a value factory creates the value

**Known limits:** none

### Near-literal normalized transcript

### With a factory

```csharp
var lazy = new Lazy<MyType>(
    () => new MyType(dep1, dep2));
```

The factory uses custom `Func<T>` logic.

It can:

- pass constructor arguments;
- resolve dependencies;
- run setup code;
- choose implementations dynamically.

This is the main reason ASP.NET Core code normally uses a factory.

### Study meaning

A lambda closes over dependencies and defines exactly how the one cached value should be created.

### Recall questions

1. What delegate shape does Lazy<T> use?
2. Name four capabilities of the factory form.
3. Why is it common in dependency-injected applications?


---

## S-028 — Lazy<T> and arguments

**Known limits:** none

### Near-literal normalized transcript

## `Lazy<T>` with arguments

`Lazy<T>` does not accept arguments at `.Value` time.

Why:

- it is designed to compute one value once;
- `.Value` has no parameters;
- its factory is `Func<T>`, not `Func<TArg, T>`.

Common argument patterns:

- capture a fixed argument in a closure;
- return a separate `Lazy<T>` per argument;
- use a keyed cache such as `ConcurrentDictionary<TKey, Lazy<TValue>>`.

### Study meaning

Arguments must be bound when constructing a Lazy instance or represented by selecting a separate Lazy instance.

### Recall questions

1. Why can Value not accept an argument?
2. What delegate type is the factory?
3. Name the three argument patterns.


---

## S-029 — Pattern A: capture a fixed argument

**Known limits:** none

### Near-literal normalized transcript

## Pattern A: capture an argument in a closure

When the argument is known while creating the Lazy instance:

```csharp
string path = "config.json";

var lazyText =
    new Lazy<string>(
        () => File.ReadAllText(path));
```

`path` is captured by the lambda.

This works when the argument is fixed for that Lazy instance.

### Study meaning

The closure permanently associates this Lazy value with one path. Changing caller arguments later does not turn the same Lazy into a per-argument cache.

### Recall questions

1. What path is captured?
2. When is the file read?
3. How many path values can one Lazy instance represent?
4. What object stores the captured variable?


---

## S-030 — Pattern B: a method returning Lazy<T>

**Known limits:** none

### Near-literal normalized transcript

## Pattern B: return a `Lazy<T>` per argument

When different lazy values are needed for different arguments:

```csharp
Lazy<string> CreateLazyFile(string path)
{
    return new Lazy<string>(
        () => File.ReadAllText(path));
}
```

Each `Lazy<string>` is tied to one `path`.

### Study meaning

The method creates independent Lazy objects. Sharing or caching those Lazy objects is the caller's responsibility.

### Recall questions

1. What does the method return?
2. How is path bound to the result?
3. Are two calls with the same path automatically shared?
4. Who owns the returned Lazy instance?


---

## S-032 — Object-owned lazy field example

**Known limits:** none

### Near-literal normalized transcript

## Object field example

A class instance has a file path and loads content lazily:

```csharp
public sealed class TemplateFile
{
    private readonly Lazy<string> _content;

    public TemplateFile(string path)
    {
        _content = new Lazy<string>(
            () => File.ReadAllText(path));
    }

    public string Content => _content.Value;
}
```

Each `TemplateFile` has its own lazy state. This is Pattern B/object design.

### Study meaning

The constructor binds one path to one object's private Lazy field. There is no shared application-wide cache unless callers store and reuse the TemplateFile itself.

### Recall questions

1. What field stores the lazy state?
2. When is the file read?
3. Does another TemplateFile instance share the cached value?
4. What public member triggers initialization?


---

## S-035 — Pattern B characteristics

**Known limits:** none

### Near-literal normalized transcript

## Pattern B

- creates a lazy value on demand;
- ties it to one argument;
- the caller owns the Lazy instance;
- no sharing or caching occurs unless the caller stores it.

### Study meaning

Pattern B creates a Lazy object but does not itself define a shared cache.

### Recall questions

1. Who owns the Lazy instance?
2. How many arguments is it tied to?
3. What is required for reuse across calls?


---

## S-038 — Pattern B is object design

**Known limits:** none

### Near-literal normalized transcript

## Pattern B is about object design

> This object has a lazily created field.

### Study meaning

The lazy lifetime follows one object instance rather than a shared keyed cache.

### Recall questions

1. What owns the lazy field?
2. What determines its lifetime?
3. How does this differ from Pattern C?


---

# Shared keyed caching with ConcurrentDictionary and Lazy

Generated: 2026-07-01

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible C# is preserved.
- Thread-safety and exception semantics are kept source-specific.
- Every source includes recall questions.

## S-031 — Pattern C: ConcurrentDictionary<TKey, Lazy<TValue>>

**Known limits:** none

### Near-literal normalized transcript

## Pattern C: keyed shared Lazy cache

```csharp
using System;
using System.Collections.Concurrent;
using System.Threading;

var cache =
    new ConcurrentDictionary<int, Lazy<string>>();

string GetUserData(int userId)
{
    var lazy = cache.GetOrAdd(
        userId,
        id => new Lazy<string>(
            () => ExpensiveLoadUserData(id),
            LazyThreadSafetyMode.ExecutionAndPublication));

    return lazy.Value;
}
```

This is the standard “lazy with arguments” pattern for shared application caches.

### Study meaning

The dictionary chooses one Lazy object per key. The Lazy object then ensures one expensive successful initialization per stored key.

### Recall questions

1. What is the dictionary key?
2. What is the dictionary value type?
3. What does GetOrAdd create?
4. Why is Lazy nested inside ConcurrentDictionary?
5. What mode is recommended here?


---

## S-034 — Pattern C characteristics

**Known limits:** the screenshot is a cropped comparison card; the visible Pattern C bullets are preserved

### Near-literal normalized transcript

## Pattern C

- creates or reuses a lazy value by key;
- provides a shared cache;
- is suitable for services, applications, and concurrent requests;
- aims to compute once per key.

### Study meaning

Pattern C is an application caching strategy rather than merely an object-construction detail.

### Recall questions

1. What defines the cache entry?
2. Who shares the cache?
3. What is the work-count goal per key?


---

## S-037 — Pattern C is a caching strategy

**Known limits:** none

### Near-literal normalized transcript

## Pattern C is about caching strategy

> This application or service has a lazy cache by key.

### Study meaning

The important boundary is shared ownership and per-key reuse across many callers.

### Recall questions

1. What owns the cache?
2. What selects the cached Lazy value?
3. Why is this an application-level design?
