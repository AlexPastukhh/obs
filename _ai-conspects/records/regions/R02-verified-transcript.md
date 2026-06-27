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


## Source closure

- Verified image uses: 14
- Verified non-empty SVG text nodes: 10
- Missing: 0
- Unreviewed: 0
