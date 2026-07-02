# HashCode, Equals, Dictionary, and HashSet — source-preserving transcript v002

Generated: 2026-06-30

## Source verification

```text
source/hashcode.svg
Git blob SHA: 0eaf471525a9cf3056a6815b07a7c1c266ed210c
unique screenshots: 24
image uses: 24
native SVG labels: 19
duplicate screenshots: 0
broken embedded images: 0
```

The repository source blob matches the uploaded complete SVG.

## Corrected coverage

```text
source-specific transcript blocks: 24 / 24
code/example blocks represented: 24 / 24
recall-question sets: 24 / 24
SVG labels preserved: 19 / 19
uncovered screenshots: 0
```

The old Stage1 document remains useful as a concise overview, but it compressed all 24 screenshots into four summaries and omitted most code. This v002 document is the authoritative study transcript.

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


---

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


---

# R03 — collection and order-independent loop hashing

Generated: 2026-06-30

## Transcript policy

- each screenshot has its own normalized source block;
- code is preserved in fenced blocks;
- explanation is kept separate from source text;
- uncertainty/limits are stated rather than silently filled;
- each screenshot has recall questions.

## S-017 — Original order-independent loop snippet

**Known limits:** none

### Near-literal normalized transcript

The source evaluates this pattern:

```csharp
if (a is null)
    return 0;

// sort first -> stable hash independent of original order
var hash = 0;

foreach (
    var s in a.OrderBy(
        x => x,
        StringComparer.Ordinal))
{
    hash = HashCode.Combine(
        hash,
        s?.GetHashCode() ?? 0);
}

return hash;
```

The criticism of this style is mostly correct.

### Study meaning

Sorting can intentionally make collection hashing independent of original enumeration order, but manually extracting element hashes and repeatedly combining an accumulated int is not the clearest modern implementation.

### Recall questions

1. Why does the code sort first?
2. What set-like equality goal is implied?
3. What two implementation details are criticized?
4. Does sorting alone define duplicate semantics?


---

## S-018 — Intent of the sorted collection hash

**Known limits:** none

### Near-literal normalized transcript

The code appears to want:

- to hash a collection of strings;
- in an order-independent way;
- so `["a", "b"]` and `["b", "a"]` produce the same hash.

That is why it sorts first.

Sorting can make sense when order should not matter.

### Study meaning

Hash semantics must match equality semantics: if equality treats collections as sets or multisets, hashing cannot remain order-sensitive.

### Recall questions

1. Which two sequences should hash the same?
2. What transformation removes original order?
3. Does this behave as a set or a multiset when duplicates exist?
4. What must Equals do?


---

## S-019 — Manual null handling is often unnecessary

**Known limits:** none

### Near-literal normalized transcript

When using `HashCode.Add(...)` or `HashCode.Combine(...)`, null handling is generally supported.

Code such as:

```csharp
s?.GetHashCode() ?? 0
```

is often more manual and clumsy than needed.

### Study meaning

Pass the value and the intended comparer to the helper rather than pre-hashing it yourself.

### Recall questions

1. Why avoid calling element.GetHashCode manually?
2. How can a comparer be preserved?
3. What does Add do with null?
4. When might a custom null policy still be required?


---

## S-020 — Repeated Combine in a loop is not ideal

**Known limits:** none

### Near-literal normalized transcript

`HashCode.Combine(...)` is most natural for a small fixed number of values.

Inside a loop, prefer:

```csharp
var hash = new HashCode();

foreach (
    var s in a.OrderBy(
        x => x,
        StringComparer.Ordinal))
{
    hash.Add(
        s,
        StringComparer.Ordinal);
}

return hash.ToHashCode();
```

This is cleaner and expresses loop accumulation directly.

### Study meaning

The accumulator avoids repeatedly treating a previous int hash as if it were another original identity field.

### Recall questions

1. Why is Combine less natural in a loop?
2. Which comparer is used for sorting and adding?
3. Why must those comparer choices agree?
4. What method returns the final int?


---

## S-021 — Improved set-like collection hash

**Known limits:** none

### Near-literal normalized transcript

If order should not matter:

```csharp
public static int GetSetLikeHash(
    IEnumerable<string>? values)
{
    if (values is null)
        return 0;

    var hash = new HashCode();

    foreach (
        var value in values.OrderBy(
            x => x,
            StringComparer.Ordinal))
    {
        hash.Add(
            value,
            StringComparer.Ordinal);
    }

    return hash.ToHashCode();
}
```

Benefits:

- no manual `GetHashCode()` calls;
- no manual element-null fallback;
- consistent comparer use;
- `HashCode` fits loop accumulation better.

The original instinct is correct, but the accumulator version is the cleaner modern style.

### Study meaning

The function is order-independent but still duplicate-sensitive: `['a']` and `['a','a']` do not necessarily represent the same multiset. Define whether equality is sequence-, set-, or multiset-based.

### Recall questions

1. Why is the method called set-like rather than necessarily a true set hash?
2. What role does sorting play?
3. Which comparer is used twice?
4. How should duplicate values be treated?


---

# R04 — mutable keys, Dictionary, HashSet, and bucket flow

Generated: 2026-06-30

## Transcript policy

- each screenshot has its own normalized source block;
- code is preserved in fenced blocks;
- explanation is kept separate from source text;
- uncertainty/limits are stated rather than silently filled;
- each screenshot has recall questions.

## S-022 — HashSet uses the same hashing principle

**Known limits:** none

### Near-literal normalized transcript

`HashSet<T>` is also hash-based.

Difference in purpose:

- `Dictionary<TKey, TValue>` stores key → value;
- `HashSet<T>` stores items, and each item acts as its own key.

Internally the same principle applies:

1. compute item hash;
2. choose bucket;
3. compare equality inside that bucket.

Mutable equality/hash fields are therefore dangerous in `HashSet<T>` too.

### Study meaning

The mutable-key rule applies to any hash-indexed collection, not only dictionaries.

### Recall questions

1. What acts as the key in HashSet?
2. What are the three lookup stages?
3. Why can Contains fail after mutation?
4. How can an item be safely changed?


---

## S-023 — Dictionary flow before mutation

**Known limits:** none

### Near-literal normalized transcript

Before mutation:

```text
key.Email = "a@test.com"
hash = 1234
bucket = 2
```

Stored:

```text
bucket 2 ->
entry(
    key.Email = "a@test.com",
    value = "hello")
```

Lookup with the same unchanged key:

```text
1. compute hash -> 1234
2. go to bucket 2
3. compare equality
4. found
```

### Study meaning

The lookup succeeds because the current hash still points to the bucket selected at insertion.

### Recall questions

1. When was bucket 2 selected?
2. What happens after reaching the bucket?
3. Does the collection scan every bucket?
4. Which invariant is still intact?


---

## S-024 — Dictionary flow after key mutation

**Known limits:** none

### Near-literal normalized transcript

After mutation:

```text
key.Email = "b@test.com"
hash = 8888
bucket = 1
```

But storage is still:

```text
bucket 2 ->
entry(the same object, but now mutated)
```

Lookup now:

```text
1. compute hash -> 8888
2. go to bucket 1
3. nothing there
4. not found
```

The problem is directly tied to hashtable bucket flow.

### Study meaning

Mutation changes the key's current identity without reindexing the collection's internal storage.

### Recall questions

1. Where is the entry physically stored?
2. Which bucket does the new hash choose?
3. Why is equality never checked against the old entry?
4. How can code repair the collection state?
