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
