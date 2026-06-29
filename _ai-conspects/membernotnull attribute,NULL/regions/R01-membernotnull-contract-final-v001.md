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
