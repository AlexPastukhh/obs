# Equality — final coverage transcript v001

Source SVG: `equality.svg`  
Conspect folder: `equality`  
Stage: combined final coverage transcript

## 0.1 Area overview / understanding / reading quality

This conspect explains the complete custom equality contract in C#: `Equals(object?)`, `IEquatable<T>.Equals(T?)`, `GetHashCode()`, `==`/`!=`, `ToString()`, and a reusable `GetEqualityComponents()` pattern.

The source was visually readable. Code punctuation should still be checked against the preserved screenshots before copying verbatim, but the semantic flow is clear.

## R01 — ToString and operators

`ToString()` is not part of the equality contract. It is mainly for logging, debugging, diagnostics, or human-readable representation. Two objects having the same text does not make them equal unless the equality implementation explicitly compares the same data.

`==` and `!=` are optional operator overloads for user-defined reference types. When supplied, they should delegate to the same equality logic as `Equals` and must handle null/reference identity safely. Operators must not introduce a second, contradictory definition of equality.

Typical shape:

```csharp
public static bool operator ==(Money? left, Money? right)
    => Equals(left, right);

public static bool operator !=(Money? left, Money? right)
    => !Equals(left, right);
```

## R02 — Equals(object?) and IEquatable<T>

The equality story has three central members:

```text
Equals(object?)
IEquatable<T>.Equals(T?)
GetHashCode()
```

`Equals(object?)` is the universal virtual entry point used when the compile-time type is only `object`. The usual override performs a type check and forwards to strongly typed equality:

```csharp
public override bool Equals(object? obj)
    => obj is Money other && Equals(other);
```

`IEquatable<T>.Equals(T?)` is normally the real value-equality implementation. It avoids repeated casts and lets generic collections such as `List<T>`, `Dictionary<TKey,TValue>`, and `HashSet<T>` use strongly typed comparison.

A robust implementation checks:

```text
- reference identity when useful
- null
- runtime/type compatibility according to the chosen design
- every field or property that participates in value identity
```

Example intent:

```csharp
public bool Equals(Money? other)
{
    if (ReferenceEquals(null, other)) return false;
    if (ReferenceEquals(this, other)) return true;

    return Amount == other.Amount
        && Currency == other.Currency;
}
```

For value types, implementing `IEquatable<T>` avoids boxing in many generic equality paths. For reference types, it gives one typed place where the actual equality rule lives.

## R03 — GetHashCode contract

The critical rule is:

```text
If two objects are equal, they must produce the same hash code.
```

Unequal objects may still collide. Hash codes are not unique identifiers and must not be persisted as stable IDs.

Hash-based collections first choose a bucket using the hash and then confirm equality. Therefore the fields used by `GetHashCode()` must match the fields used by `Equals`.

```csharp
public override int GetHashCode()
    => HashCode.Combine(Amount, Currency);
```

If equality changes while an object is being used as a dictionary key or hash-set member, lookup can break. Values participating in equality should therefore be effectively immutable while stored in hash-based collections.

## R04 — GetEqualityComponents pattern

For classes with many equality members or a value-object hierarchy, the compared components can be centralized:

```csharp
protected virtual IEnumerable<object?> GetEqualityComponents()
{
    yield return Amount;
    yield return Currency;
}
```

Then typed equality can compare the component sequence and `GetHashCode()` can combine the same sequence. The benefit is a single list of identity components, reducing accidental drift between equality and hash logic.

The pattern still requires care:

```text
- preserve component order
- define null semantics
- use sequence/content equality for collections when that is intended
- avoid mutable components
- decide whether derived runtime types may compare equal to base types
```

An expression-based component selector may reduce boilerplate for many fields, but it adds reflection/expression complexity and should not obscure the actual identity rule.

## Practical equality checklist

```text
1. Decide whether the type has reference identity or value identity.
2. Put the real comparison in IEquatable<T>.Equals.
3. Forward Equals(object?) to typed equality.
4. Use exactly the same components in GetHashCode.
5. Keep == and != consistent if overloaded.
6. Do not treat ToString as equality.
7. Keep equality components stable while used in hash collections.
```

## Coverage

```text
R01: 3 image uses
R02: 7 image uses
R03: 2 image uses
R04: 6 image uses
Text labels: 6
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
