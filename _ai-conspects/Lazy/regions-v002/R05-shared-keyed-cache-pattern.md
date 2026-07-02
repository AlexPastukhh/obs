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
