# ValueTask — final source-preserving transcript

## 0.1 Area understanding / reading quality

This conspect contrasts `Task<T>` with `ValueTask<T>` and focuses on the narrow case where `ValueTask<T>` can avoid an allocation: a frequently synchronous hot path.

Reading quality is high. The code screenshots are preserved for exact syntax.

## 1. Mental model

`Task<T>` is a reference-type object representing a future result. It is safe to await multiple times and works naturally with combinators such as `WhenAll` and `WhenAny`.

`ValueTask<T>` is a small value type that can represent either:

1. an already available result without creating a `Task<T>`; or
2. a real asynchronous operation backed by a `Task<T>` or another source.

The practical model is a union of a cheap synchronous result path and a normal asynchronous path.

## 2. Where ValueTask helps

The main benefit appears when a method completes synchronously most of the time, for example a cache lookup.

A non-`async` method can return:

```csharp
return ValueTask.FromResult(cached);
```

or:

```csharp
return new ValueTask<T>(cached);
```

Both represent an already completed `ValueTask<T>`. On cache hits, no `Task<T>` object needs to be created.

On the caller side, code normally still uses `await`; the caller does not need to distinguish whether completion was synchronous or asynchronous.

## 3. Async branches and allocation reality

If the slow branch already calls an API that returns `Task<T>`—for example EF Core, HTTP or typical application I/O—wrapping that task in `ValueTask<T>` does not remove the inner `Task<T>` allocation. The async branch is therefore usually about the same cost as returning `Task<T>`, plus a small wrapper.

Marking the outer method `async ValueTask<T>` can also introduce an async state machine. Even when a cache branch completes synchronously, the method remains compiled as async and may lose part of the allocation advantage compared with a non-async fast-path method.

Returning `cached` directly from an `async ValueTask<T>` method is already the correct synchronous result. Inside such a method, `ValueTask.FromResult(cached)` cannot be returned where the compiler expects `T`.

An outer method that avoids `await` and directly returns `new ValueTask<T>(InnerAsync())` still does not remove allocations performed by `InnerAsync`.

## 4. Appropriate and inappropriate usage

`ValueTask<T>` is useful when:

- the API is on a measured hot path;
- synchronous completion is common;
- avoiding one task allocation per call matters;
- the contract can be consumed with normal single-await semantics.

It is less useful when:

- the operation is genuinely asynchronous almost every time;
- the underlying API already returns `Task<T>`;
- composability and repeated awaits are more important;
- the code becomes harder to understand for negligible savings.

Special high-performance cases may use `IValueTaskSource`, reusable operations or pooling so that even some asynchronous completions avoid allocating a normal task.

## 5. Server-side cautions

Do not use `Task.Run` as a general fix for blocking server work. Running blocking work inline occupies a ThreadPool thread; wrapping it in `Task.Run` still occupies a ThreadPool thread. The real fix is true asynchronous I/O or moving long-running work to an appropriate background job.

The conclusion is: use `ValueTask<T>` selectively and only after measurement. Its main win is the synchronous fast path, not the ordinary task-backed async path.
