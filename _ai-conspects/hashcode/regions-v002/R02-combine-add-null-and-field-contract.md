# R02 — Combine, Add, nulls, comparers, and field consistency

Generated: 2026-06-30

## Transcript policy

- each screenshot has its own normalized source block;
- code is preserved in fenced blocks;
- explanation is kept separate from source text;
- uncertainty/limits are stated rather than silently filled;
- each screenshot has recall questions.

## S-006 — Conditional HashCode accumulation

**Known limits:** none

### Near-literal normalized transcript

Conditional logic can be expressed with the accumulator:

```csharp
public override int GetHashCode()
{
    var hash = new HashCode();

    hash.Add(Id);

    if (Name is not null)
        hash.Add(Name);

    if (Metadata is not null)
        hash.Add(Metadata.Version);

    return hash.ToHashCode();
}
```

### Study meaning

The hash can include values only when relevant, but equality must mirror the same conditions and identity rules.

### Recall questions

1. Why is the accumulator useful for conditional fields?
2. What must Equals do when Name or Metadata is conditional?
3. What happens if hashing includes a value equality ignores?
4. Why call ToHashCode only after all additions?


---

## S-007 — Incremental HashCode.Add

**Known limits:** none

### Near-literal normalized transcript

`Add` lets code add one value at a time:

```csharp
var hash = new HashCode();

hash.Add(X);
hash.Add(Y);
hash.Add(Z);

return hash.ToHashCode();
```

This is the flexible version of `HashCode.Combine`.

### Study meaning

Incremental accumulation supports loops, conditions, and larger identity models while keeping the implementation explicit.

### Recall questions

1. When is Add preferable to Combine?
2. What final method produces the int hash?
3. Does Add itself return the final hash?
4. What ordering property follows from adding values sequentially?


---

## S-008 — Collection hashing with the HashCode accumulator

**Known limits:** the screenshot shows GetHashCode; the corresponding Equals implementation is not visible

### Near-literal normalized transcript

Example with a collection:

```csharp
public sealed class Order
    : IEquatable<Order>
{
    public int Id
    {
        get;
        init;
    }

    public IReadOnlyList<string> Tags
    {
        get;
        init;
    } = Array.Empty<string>();

    public override int GetHashCode()
    {
        var hash = new HashCode();

        hash.Add(Id);

        foreach (var tag in Tags)
        {
            hash.Add(tag);
        }

        return hash.ToHashCode();
    }
}
```

This is where `HashCode` is more convenient than a fixed `Combine` call.

### Study meaning

Adding tags in sequence makes the hash order-sensitive. Equality for Order must use the same sequence semantics.

### Recall questions

1. Is the shown Tags hash order-sensitive?
2. What equality rule must match it?
3. Why is Combine awkward for an arbitrary list?
4. What comparer might be supplied for tag strings?


---

## S-009 — HashCode struct for many fields

**Known limits:** none

### Near-literal normalized transcript

For many fields, loops, or collections, use `HashCode`:

```csharp
public override int GetHashCode()
{
    var hash = new HashCode();

    hash.Add(FirstName);
    hash.Add(LastName);
    hash.Add(BirthDate);

    return hash.ToHashCode();
}
```

Useful when:

- there are many fields;
- some values are conditional;
- items are added in a loop.

### Study meaning

This pattern avoids a long fixed-arity call and scales naturally as the identity model becomes conditional or iterative.

### Recall questions

1. Which three values are added?
2. Name three situations suited to the accumulator.
3. What must remain consistent with these fields?
4. Why use a local HashCode value?


---

## S-010 — HashCode.Combine is for a small fixed set

**Known limits:** none

### Near-literal normalized transcript

`HashCode.Combine` provides overloads for a fixed number of arguments and is convenient for common cases:

```csharp
return HashCode.Combine(A, B);

return HashCode.Combine(A, B, C);

return HashCode.Combine(A, B, C, D);
```

For a small set of fields, this is ideal.

### Study meaning

Use Combine when the contributing values are known, fixed, and few. Use the accumulator for variable-length or conditional input.

### Recall questions

1. What kind of input is Combine best for?
2. Why is it awkward in a loop?
3. When should code switch to HashCode.Add?
4. Does Combine remove the need to align with Equals?


---

## S-011 — Nulls with HashCode.Combine

**Known limits:** none

### Near-literal normalized transcript

`HashCode.Combine` handles null values:

```csharp
public override int GetHashCode()
{
    return HashCode.Combine(
        Name,
        OptionalDescription);
}
```

If `OptionalDescription` is `null`, that is acceptable.

### Study meaning

Manual `?.GetHashCode() ?? 0` logic is usually unnecessary when using the modern helper.

### Recall questions

1. Does Combine accept null reference values?
2. Why is a manual null fallback often redundant?
3. Must Equals also define how null values compare?
4. Can two different values still collide?


---

## S-012 — Why equality/hash field mismatch is invalid

**Known limits:** none

### Near-literal normalized transcript

The shown implementation is bad because equality ignores `BirthDate`, but the hash code includes it.

Rule:

> If two objects are equal, they must return the same hash code.

Hashing and equality must match logically.

### Study meaning

Equal objects may never be separated into different hash buckets by different hash codes. Unequal objects may still share a hash because collisions are allowed.

### Recall questions

1. Which direction of the contract is mandatory?
2. May unequal objects have equal hashes?
3. Why does including BirthDate violate the contract?
4. What collection behavior can break?


---

## S-013 — Use the same fields as equality

**Known limits:** none

### Near-literal normalized transcript

If `Equals(...)` uses:

- `FirstName`;
- `LastName`;
- `BirthDate`;

then `GetHashCode()` should use the same fields.

Bad mismatch:

```csharp
public override bool Equals(object? obj)
{
    return obj is Person p
        && FirstName == p.FirstName
        && LastName == p.LastName;
}

public override int GetHashCode()
{
    return HashCode.Combine(
        FirstName,
        LastName,
        BirthDate); // wrong mismatch
}
```

### Study meaning

The screenshot’s heading states the general rule, while the bad example demonstrates equality using fewer fields than hashing.

### Recall questions

1. Which fields does Equals actually use in the bad example?
2. Which extra field appears in hashing?
3. How should the code be repaired?
4. Could equality instead be changed to include BirthDate?


---

## S-014 — Manual unchecked hash formula versus HashCode.Combine

**Known limits:** none

### Near-literal normalized transcript

Older code often used a manual formula:

```csharp
public override int GetHashCode()
{
    unchecked
    {
        int hash = 17;

        hash = hash * 23
            + FirstName.GetHashCode();

        hash = hash * 23
            + LastName.GetHashCode();

        hash = hash * 23
            + BirthDate.GetHashCode();

        return hash;
    }
}
```

This can work, but `HashCode.Combine(...)` is normally:

- shorter;
- clearer;
- less error-prone.

Modern .NET generally prefers `HashCode.Combine`.

### Study meaning

Handwritten formulas require explicit null handling, comparer consistency, and careful maintenance. The framework helper communicates intent better.

### Recall questions

1. Why is unchecked used in older formulas?
2. What null bug can the old code have?
3. What comparison-rule bug can it have?
4. Why is Combine easier to maintain?


---

## S-015 — Typical HashCode.Combine implementation

**Known limits:** none

### Near-literal normalized transcript

```csharp
public sealed class Person
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

    public DateTime BirthDate
    {
        get;
        init;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(
            FirstName,
            LastName,
            BirthDate);
    }
}
```

The helper takes the fields and mixes them into one `int` hash code.

### Study meaning

The implementation is valid only when equality uses the same FirstName, LastName, and BirthDate semantics.

### Recall questions

1. Which fields contribute?
2. What type is returned?
3. Why are init-only properties helpful for keys?
4. What missing method is needed for custom value equality?


---

## S-016 — Why hash codes exist

**Known limits:** none

### Near-literal normalized transcript

`HashCode` in .NET helps build good `GetHashCode()` implementations when object identity depends on several fields.

Hash-based collections include:

- `Dictionary<TKey, TValue>`;
- `HashSet<T>`.

They use `GetHashCode()` to quickly narrow down where an item should go.

Important:

- hash code is not equality;
- equal objects must have equal hash codes;
- unequal objects may still have the same hash code.

Hash codes support fast lookup; they are not proof of identity.

### Study meaning

Hashing selects a candidate bucket. Equality resolves matches inside that bucket.

### Recall questions

1. What does the hash choose?
2. What confirms equality inside a bucket?
3. Are collisions allowed?
4. Why is hash not proof of identity?
