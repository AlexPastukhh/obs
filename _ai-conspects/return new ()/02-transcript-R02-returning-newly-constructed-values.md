# Regional transcript — R02: Returning newly constructed values

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

A return statement can provide the target type for object creation. In this example:

```csharp
return new(
    InterceptionResult<int>.SuppressWithResult(0)
);
```

the enclosing method declares:

```csharp
ValueTask<InterceptionResult<int>>
```

as its return type. The compiler therefore interprets the return expression as construction of that `ValueTask` type.

The full equivalent form is:

```csharp
return new ValueTask<InterceptionResult<int>>(
    InterceptionResult<int>.SuppressWithResult(0)
);
```

## How inference works

This is contextual typing, not runtime inference:

1. the compiler reads the required return type;
2. it selects that type as the target of `new`;
3. it performs constructor-overload resolution using the supplied argument;
4. it verifies that the resulting value is valid for the return statement.

The syntax removes repetition but does not change the constructed runtime type.

## `new()` versus `new(...)`

Both forms can be target-typed:

```csharp
MyType value = new();
return new(argument);
```

`new()` selects a parameterless constructor. `new(argument)` selects a matching constructor while still omitting the explicit type name.

## Readability guidance

Target-typed construction is clearest when the target type is immediately visible, as in a typed variable declaration, property initializer, argument position, or method return type. Write the explicit type when the contextual target is distant or when nested generics make the abbreviated expression harder to understand.

## Caveats

- Target typing does not convert an incompatible constructor argument automatically.
- Overload ambiguity can still produce a compile-time error.
- This syntax does not mean “return an anonymous new object.”
- Language-version settings must support target-typed `new`.

## Covered source units

```text
IU-002
```

The preserved SVG and extracted screenshot remain authoritative for exact code and punctuation.
