# R01 — Record semantics, generated members and record-versus-entity choice

## Boundary

This region covers what records are, compiler-generated behavior, equality, custom members, mutability caveats, and when an identity-oriented class is a better model.

## Verified transcript

C# records are value-oriented types. A `record` declaration without `struct` is a reference type (`record class`); `record struct` is a value type. Records are not merely classes with properties: the compiler generates value-style behavior.

For ordinary records, generated members include value-based `Equals`, typed equality support, `GetHashCode`, `==`/`!=`, a useful `ToString`, and support for `with` expressions. Two record instances with equal participating members compare equal even when they are different references. A normal class keeps reference equality unless equality is implemented explicitly.

Records may contain methods, validation, custom properties, private members, constructors, and customized equality-related members. Overriding only one part of equality or hashing can break the contract, so customization must be deliberate.

Mutable properties are legal, but mutation is awkward when equality and hash codes depend on those members, especially after insertion into dictionaries or sets. Records are most natural when mostly immutable.

A record is not automatically the right choice for an entity. A normal class may be better when the domain object has identity independent of values, a mutable lifecycle, ORM/proxy requirements, or reference-based semantics. Examples include users, orders, and database entities.


## Source closure

- Verified image uses: 11
- Verified non-empty SVG text nodes: 5
- Missing: 0
- Unreviewed: 0
