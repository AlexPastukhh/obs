# Final semantic transcript — `MemberNotNull`, nullable flow and helper initialization

Authoritative source:

```text
source/membernotnull attribute,NULL.svg
```

Coverage:

```text
unique embedded screenshots: 2
image uses: 2
native SVG labels: 1
remaining unclosed: 0
```

---

# R01 — `[MemberNotNull]` on an initialization helper

Nullable reference type analysis tracks whether a reference is believed to be
null or non-null at each program point. Sometimes initialization happens in a
helper method, and the compiler cannot infer that the helper always assigns a
field or property.

```csharp
using System.Diagnostics.CodeAnalysis;

public abstract class Base
{
    protected Dictionary<string, int> Dict = null!;

    [MemberNotNull(nameof(Dict))]
    protected void EnsureDict()
    {
        Dict = new Dictionary<string, int>();
    }
}
```

`[MemberNotNull(nameof(Dict))]` is a postcondition understood by the compiler:

```text
when EnsureDict returns normally,
Dict is known to be non-null
```

The attribute may name one or several fields/properties:

```csharp
[MemberNotNull(nameof(_cache), nameof(_service))]
private void Initialize()
{
    _cache = new();
    _service = CreateService();
}
```

Important properties of the contract:

- it changes compile-time nullable flow analysis;
- it does not perform a runtime null check;
- the implementation must actually establish the promised state;
- if the method returns normally without assigning the member, the annotation
  lies to the compiler and later code can still fail at runtime.

The `null!` initializer suppresses the field-declaration warning only. It does
not initialize the object. `[MemberNotNull]` communicates where real
initialization occurs.


---

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


---

# Flow summary

```text
field starts in a compiler-unknown or suppressed state
    ↓
annotated helper performs the real assignment
    ↓
helper returns normally
    ↓
nullable flow state for the named member becomes non-null
    ↓
constructor and later code can use the member without a false warning
```
