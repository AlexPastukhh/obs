# R02 — constructor flow after the helper call

A derived constructor can call the annotated helper:

```csharp
public sealed class Derived : Base
{
    public Derived()
    {
        EnsureDict();

        // The compiler now treats Dict as non-null.
        Dict["created"] = 1;
    }
}
```

Without the attribute, the compiler may not connect the helper call with the
member assignment and can continue to report nullable warnings.

The guarantee begins after the method returns normally. If the method throws,
there is no completed object state to reason about.

## Conditional variant

When initialization is guaranteed only for one boolean result, use
`MemberNotNullWhen`:

```csharp
[MemberNotNullWhen(true, nameof(_value))]
private bool TryInitialize()
{
    _value = LoadValue();
    return _value is not null;
}

if (TryInitialize())
{
    Console.WriteLine(_value.Length);
}
```

This means:

```text
when TryInitialize returns true,
_value is non-null
```

## Choosing the right technique

Use a normal constructor assignment when possible:

```csharp
public Base()
{
    Dict = new();
}
```

Use `[MemberNotNull]` when the initialization is intentionally delegated to a
helper and the compiler needs the postcondition.

Use `required`, constructor parameters or non-null initializers when the member
must be supplied by object creation. Use `[MemberNotNullWhen]` for conditional
initialization.

The attribute is a precise compiler contract, not a replacement for correct
runtime initialization.
