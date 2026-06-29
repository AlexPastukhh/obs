# Full combined final transcript — return new ()

Generated: 2026-06-29 00:00:00 UTC

## Coverage

```text
text elements: 0 / 0
unique screenshots: 2 / 2
screenshot uses: 2 / 2
regions: 2 / 2
remaining text elements: 0
remaining screenshot uses: 0
```

## Target-typed `new` in the interceptor

The method returns `ValueTask<InterceptionResult<int>>`, so this expression:

```csharp
return new(
    InterceptionResult<int>.SuppressWithResult(0)
);
```

is equivalent to:

```csharp
return new ValueTask<InterceptionResult<int>>(
    InterceptionResult<int>.SuppressWithResult(0)
);
```

The compiler derives the constructed type from the return context. The argument is an `InterceptionResult<int>` created by `SuppressWithResult(0)`.

## EF Core behavior

`SuppressWithResult(0)` suppresses the normal save operation and supplies zero as its result. The interceptor therefore returns a completed `ValueTask` containing an interception result that tells EF Core not to perform the save.

The method can return the `ValueTask` directly because the result is already available; an `async` state machine is unnecessary.

## General rule

Target-typed object creation works when the compiler has a clear expected type. It can appear in variable declarations, property initializers, argument positions and return expressions. Constructor-overload resolution still applies normally.

## Practical guidance

Use the abbreviated form when the target type is obvious. Use an explicit constructor type when the context is distant, when nested generic types reduce readability, or when overload behavior needs to be immediately visible.

## Regional coverage map

| Region | Text | Uses | Unique | Remaining |
|---|---:|---:|---:|---:|
| R01 | 0 | 1 | 1 | 0 |
| R02 | 0 | 1 | 1 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The preserved SVG and screenshots remain authoritative for exact source code and punctuation.
