# Final screenshot-backed transcript — records

Generated: 2026-06-27 UTC

# R01 — Record semantics, generated members and record-versus-entity choice

## Boundary

This region covers what records are, compiler-generated behavior, equality, custom members, mutability caveats, and when an identity-oriented class is a better model.

## Verified transcript

C# records are value-oriented types. A `record` declaration without `struct` is a reference type (`record class`); `record struct` is a value type. Records are not merely classes with properties: the compiler generates value-style behavior.

For ordinary records, generated members include value-based `Equals`, typed equality support, `GetHashCode`, `==`/`!=`, a useful `ToString`, and support for `with` expressions. Two record instances with equal participating members compare equal even when they are different references. A normal class keeps reference equality unless equality is implemented explicitly.

Records may contain methods, validation, custom properties, private members, constructors, and customized equality-related members. Overriding only one part of equality or hashing can break the contract, so customization must be deliberate.

Mutable properties are legal, but mutation is awkward when equality and hash codes depend on those members, especially after insertion into dictionaries or sets. Records are most natural when mostly immutable.

A record is not automatically the right choice for an entity. A normal class may be better when the domain object has identity independent of values, a mutable lifecycle, ORM/proxy requirements, or reference-based semantics. Examples include users, orders, and database entities.


# R02 — Record class, positional syntax, non-positional syntax and with expressions

## Boundary

This region covers why `record class` exists, positional and non-positional declarations, generated properties, and nondestructive mutation with `with`.

## Verified transcript

`record class` occupies a specific niche: reference-type layout/lifetime and nullable-reference semantics, combined with value equality. It is useful for logically value-like models that are too large, rich, or framework-oriented to be attractive structs.

A positional declaration such as:

```csharp
public record Person(string FirstName, string LastName);
```

creates public properties, a matching constructor, deconstruction support, and record equality. For a record class the generated positional properties are `init` properties by default.

A non-positional record declares the body and properties explicitly. It still receives record equality; positional syntax is convenience, not what makes the type a record. Non-positional form gives more control over constructors, validation, access restrictions, and additional members.

A `with` expression creates a new instance with selected members changed:

```csharp
var changed = original with { Name = "Eva" };
```

It does not mutate the original. This supports immutable/value-style programming. The copy is shallow, so referenced nested objects are still shared unless they are replaced.

The region also contrasts record class and record struct: both receive generated value equality, but the former is a reference type and the latter a value type copied by value.


# R03 — Record structs, copying, ref/in/out and value-type storage

## Boundary

This region covers `record struct`, value-type copying, `ref`/`in`/`out`, storage location, large-struct costs, and choosing reference semantics with value equality.

## Verified transcript

The keyword `record` by itself means `record class`, so it is a reference type. A value-type record must be declared as `record struct` or `readonly record struct`.

Structs are copied by value in ordinary assignment and parameter passing. For small immutable values this is often desirable. For larger structs, repeated copies can increase data movement, cache pressure, and mutation confusion.

Parameter modifiers change the behavior:

- `ref` passes by reference and permits read/write access;
- `in` passes by reference with read-only intent and is often useful for large structs;
- `out` passes by reference for assignment by the callee.

Avoid reducing the topic to “stack versus heap.” A value type is stored inline wherever it lives: a local may be in stack/register-related storage, a field is inline inside its containing object, an array stores elements inline, and boxing places a wrapped copy on the managed heap. A large struct field inside a class therefore lives inside that heap object.

The practical concern is representation and copying, not a simple stack-good/heap-bad rule. Structs are strongest when small, immutable, value-like, frequently created, and logically data—examples include `DateTime`, `Guid`, `TimeSpan`, points, decimals, small IDs, coordinates, and compact money values.

A record class can be preferable when value equality is wanted but the model is larger, nullable, shared by reference, inheritance/framework integration matters, or copying the full value is undesirable.


# R04 — Reference-type value objects and EF complex-type modeling

## Boundary

This region covers immutable reference-type value objects and their use as richer domain/EF complex types.

## Verified transcript

An immutable, logically value-like object can reasonably be a record class even when multiple owners share the same reference. Value equality still compares contents, while the runtime passes a reference rather than copying all fields.

The screenshots use an `Address` record as the main example. Sharing an immutable address reference is not dangerous in the same way as sharing mutable state. This does not require manually interning or deduplicating equal instances; it only means reference-type value objects are legitimate.

A small compact type such as `Money` may fit `readonly record struct`. A richer value object with several fields, strings, validation, or framework integration may fit `record class`. For EF Core owned/complex-type modeling, a record class can be conceptually suitable when the object is owned by an entity, immutable, compared by value, and not an independent identity-based entity. Actual mapping details remain version- and feature-specific.


# Coverage conclusion

```text
Processed image uses: 43 / 43
Processed non-empty SVG text nodes: 22 / 22
Missing image uses: 0
Unreviewed image uses: 0
Missing text nodes: 0
Unreviewed text nodes: 0
```
