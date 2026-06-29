# Regional transcript — R01: Target-typed new expressions

Conspect: `return new ()`  
Generated: 2026-06-29 00:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 1 / 1
unique screenshots represented: 1
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The example appears inside an EF Core save interceptor override:

```csharp
public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
    DbContextEventData eventData,
    InterceptionResult<int> result,
    CancellationToken cancellationToken = default)
{
    return new(
        InterceptionResult<int>.SuppressWithResult(0)
    );
}
```

`new(...)` is a **target-typed object-creation expression**. The compiler obtains the constructed type from the method return type, so the expression is equivalent to:

```csharp
return new ValueTask<InterceptionResult<int>>(
    InterceptionResult<int>.SuppressWithResult(0)
);
```

The omitted type is therefore `ValueTask<InterceptionResult<int>>`, not `InterceptionResult<int>`. The value passed to the constructor is already an `InterceptionResult<int>`.

## Interception meaning

`InterceptionResult<int>.SuppressWithResult(0)` tells EF Core to suppress the normal save operation and supply `0` as the result. Consequently, the database save is skipped and the intercepted `SaveChangesAsync` operation reports zero affected rows.

The screenshot also distinguishes several suppression scopes:

- command interceptors can suppress individual database commands;
- save interceptors can suppress the entire save operation;
- concurrency interception can suppress propagation of a concurrency exception.

## Why direct ValueTask return is valid

The method is not marked `async`; it creates and returns a completed `ValueTask<InterceptionResult<int>>` directly. This avoids an unnecessary async state machine when the result is already available synchronously.

## Caveats

- Target-typed `new` requires a compile-time target type.
- The constructor must be compatible with the supplied argument.
- Suppressing a save is a behavioral decision, not merely syntax shortening; use it only when the interceptor intentionally replaces the normal operation.
- A returned result of `0` may affect calling code that expects rows to have been written.

## Covered source units

```text
IU-001
```

The preserved SVG and extracted screenshot remain authoritative for exact code and punctuation.
