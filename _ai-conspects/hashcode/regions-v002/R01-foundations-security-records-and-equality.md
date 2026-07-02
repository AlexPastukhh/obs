# R01 — foundations, security boundaries, records, and equality

Generated: 2026-06-30

## Transcript policy

- each screenshot has its own normalized source block;
- code is preserved in fenced blocks;
- explanation is kept separate from source text;
- uncertainty/limits are stated rather than silently filled;
- each screenshot has recall questions.

## S-001 — Hash codes are not security primitives; records generate equality

**Known limits:** none

### Near-literal normalized transcript

## Don’t use hash code for security

`GetHashCode()` and `HashCode` are not cryptographic.

For:

- password hashing;
- signatures;
- secure digests;

use cryptographic APIs such as SHA-256, HMAC, bcrypt, Argon2, and similar tools chosen for the actual security purpose.

`HashCode` is only for collection hashing.

## Records

For `record` types, .NET usually generates equality and hashing:

```csharp
public record Person(
    string FirstName,
    string LastName);
```

You often do not need to write `GetHashCode()` manually. Records are convenient for value-like objects.

### Study meaning

Collection hashes are optimized for in-memory lookup, not collision resistance, secrecy, or long-term stability. Records reduce boilerplate when value equality is the intended identity model.

### Recall questions

1. Why is GetHashCode unsuitable for passwords?
2. Which security properties are missing from collection hashes?
3. What equality/hash behavior does a record normally generate?
4. When is a record a good fit?


---

## S-002 — Hash codes are not stable IDs

**Known limits:** none

### Near-literal normalized transcript

Do not persist or share hash codes as identifiers.

Do not assume:

- the same hash across processes;
- the same hash across runtime versions;
- uniqueness.

A hash code exists for in-memory hashing behavior.

This is wrong as a durable key:

```csharp
var id = obj.GetHashCode();
```

### Study meaning

A hash code may collide and may change between runs or runtime implementations. Durable identity needs an explicit stable identifier such as a database key or GUID chosen for that purpose.

### Recall questions

1. Why can the same object value have a different hash in another process?
2. Are hash codes unique?
3. What should be used as a durable identifier?
4. What is the intended lifetime of a collection hash?


---

## S-003 — Mutable dictionary keys and HashSet elements

**Known limits:** none

### Near-literal normalized transcript

Do not use mutable equality/hash fields on an object stored as a dictionary key or HashSet element.

Bad:

```csharp
var person = new Person
{
    FirstName = "A",
    LastName = "B"
};

var set = new HashSet<Person>
{
    person
};

person.LastName = "C"; // dangerous
```

Why dangerous?

The object’s hash code may change after insertion, while the hash-based collection does not move the existing entry to a new bucket. Later lookup can no longer find it correctly.

Fields involved in equality and hashing should ideally be immutable while the object is stored.

### Study meaning

The key object can still be physically present, but lookup starts from the new hash and searches the wrong bucket.

### Recall questions

1. Why does mutation not move an existing entry?
2. Which fields are dangerous to mutate?
3. Does the same problem apply to HashSet?
4. What is the safest key design?


---

## S-004 — IEquatable<T>, Equals, and GetHashCode

**Known limits:** none

### Near-literal normalized transcript

When implementing custom equality, normally provide:

- `Equals(object?)`;
- `IEquatable<T>.Equals(T?)`;
- `GetHashCode()`.

Example:

```csharp
public sealed class Person
    : IEquatable<Person>
{
    public string FirstName
    {
        get;
        init;
    } = "";

    public string LastName
    {
        get;
        init;
    } = "";

    public bool Equals(Person? other)
    {
        return other is not null
            && FirstName == other.FirstName
            && LastName == other.LastName;
    }

    public override bool Equals(object? obj)
        => obj is Person other
            && Equals(other);

    public override int GetHashCode()
        => HashCode.Combine(
            FirstName,
            LastName);
}
```

### Study meaning

Typed equality avoids repeated casts and gives generic collections an efficient, consistent equality path. The same identity fields appear in both equality and hashing.

### Recall questions

1. Why implement IEquatable<Person>?
2. How does Equals(object?) delegate?
3. Which fields define Person identity here?
4. Why must GetHashCode use the same fields?


---

## S-005 — HashCode.Add with an explicit comparer

**Known limits:** none

### Near-literal normalized transcript

`HashCode.Add(value, comparer)` accepts a comparer.

For case-insensitive email hashing:

```csharp
public override int GetHashCode()
{
    var hash = new HashCode();

    hash.Add(
        Email,
        StringComparer.OrdinalIgnoreCase);

    return hash.ToHashCode();
}
```

If equality uses:

```csharp
StringComparer.OrdinalIgnoreCase
    .Equals(a, b)
```

hashing must use the same comparer.

### Study meaning

Equality and hashing must agree not only on fields but also on comparison rules such as case sensitivity.

### Recall questions

1. Why is the comparer part of the equality contract?
2. What bug occurs if equality ignores case but hashing does not?
3. Which comparer is shown?
4. When should culture-aware comparison be considered separately?
