# Full source-preserving transcript v002 — Equality / IEquatable / GetHashCode / ValueObject

Generated: 2026-07-04 UTC

```text
authoritative SVG: source/equality.svg
SHA-256: 73853021447ae9b656b8bb9cf137bdb6f673849c28342ac0dd62052d9251f399
Git blob SHA: 02906f4e05e6e444ad07a4de26cd17d1255aac5c
viewBox: 0 0 4652.0796233406745 4051.770643390252
unique embedded screenshots: 18 / 18
image uses: 18 / 18
duplicate extra placements: 0
native SVG text lines: 6 / 6
source blocks: 18 / 18
```

## Topic boundary

C# equality contracts, value objects, IEquatable and hash-based collections.

## Transcript policy

Visible wording and code are preserved source-by-source with conservative OCR normalization.
Obvious glyph substitutions, broken member-access spacing and editor artifacts are corrected.
Exact screenshot typography remains authoritative.

---

## S-001 — ToString()

```text
source_id: S-001
image_hash: 2fb2a1d86511
placements: 1
image_file: source/images-near-literal-v001/S-001__2fb2a1d86511.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
ToString()

ToString() has nothing to do with equality correctness.
You override it only if you want:

- better logging,

- better debugging,

- prettier API output,

- or a domain-friendly string representation.
So for a value object like Money, EmailAddress, OrderId, overriding ToString() is often useful, but it is
not part of the equality contract. Records synthesize ToString() for convenience, but that does not mean
your class-based value object must do the same.
~~~

### Recall

1. Какое правило equality показано в «ToString()»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-002 — Build the Address class in the correct form

```text
source_id: S-002
image_hash: b27cf2487c48
placements: 1
image_file: source/images-near-literal-v001/S-002__b27cf2487c48.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Build the Address class in the correct form
public class Address: ValueObject
{
public string City { get; init; }
public string Street { get; init; }
public string Zip { get; init; }
public string Country { get; init; }
protected override IEnumerable<object> GetEqualityComponents()
{
yield return City;
yield return Street;
yield return Zip;
yield return Country;
}
~~~

### Recall

1. Какое правило equality показано в «Build the Address class in the correct form»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-003 — GetHashCode()

```text
source_id: S-003
image_hash: b8d72382830f
placements: 1
image_file: source/images-near-literal-v001/S-003__b8d72382830f.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
GetHashCode()
If two objects are equal according to Equals, they must return the same hash code.
That is required for correct behavior in:
- Dictionary
- HashSet
- lookup structures
So if:
a.Equals(b) == true
then:
a.GetHashCode() == b.GetHashCode()
must also be true.
The reverse is not required.
~~~

### Recall

1. Какое правило equality показано в «GetHashCode()»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-004 — 3) IEquatable<T> and the big picture of equality

```text
source_id: S-004
image_hash: e5a50bf0fa30
placements: 1
image_file: source/images-near-literal-v001/S-004__e5a50bf0fa30.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
3) IEquatable<T> and the big picture of equality
This is one of the most important parts.
There are 3 related members:
- Equals(object?)
- IEquatable<T>.Equals(T?)
- (GetHashCode()
They all belong to the same equality story.
~~~

### Recall

1. Какое правило equality показано в «3) IEquatable<T> and the big picture of equality»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-005 — Good practical rule

```text
source_id: S-005
image_hash: 8c6171ea1ed4
placements: 1
image_file: source/images-near-literal-v001/S-005__8c6171ea1ed4.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Good practical rule
For a public value object class, I'd usually implement all of these:
public sealed class Money: IEquatable<Money>
{
public decimal Amount { get; }
public string Currency { get; }
public Money(decimal amount, string currency)
{
Amount = amount;
Currency = currency;
}
public bool Equals(Money? other)
{
if (ReferenceEquals(null, other)) return false;
if (ReferenceEquals(this, other)) return true;
return Amount == other.Amount &&
Currency == other.Currency;
}
~~~

### Recall

1. Какое правило equality показано в «Good practical rule»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-006 — The big picture

```text
source_id: S-006
image_hash: 54bb840b6741
placements: 1
image_file: source/images-near-literal-v001/S-006__54bb840b6741.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
The big picture
When you create a custom type, you may want two instances to be considered equal by value, not by
reference.
Example:
new Person("A", "B")
new Person("A", "B")
Should these be equal?
- by default for a normal class: no, because they are different references
- with custom equality: maybe yes, if same values mean same logical object
To support value equality properly, you usually implement:
- typed equality: IEquatable<T>.Equals(T?)
- object equality: override Equals(object?)
- matching hash code: override GetHashCode()
~~~

### Recall

1. Какое правило equality показано в «The big picture»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-007 — Standard pattern

```text
source_id: S-007
image_hash: f33b4c275364
placements: 1
image_file: source/images-near-literal-v001/S-007__f33b4c275364.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Standard pattern
public sealed class Person: IEquatable<Person>
{
public string FirstName { get; init; } = "";
public string LastName { get; init; } = "";
public bool Equals(Person? other)
{
return other is not null &&
FirstName == other.FirstName &&
LastName == other.LastName;
}
public override bool Equals(object? obj)
{
return obj is Person other && Equals(other);
}
public override int GetHashCode()
{
return HashCode.Combine(FirstName, LastName);
}
}
That is the classic value-equality implementation.
|
~~~

### Recall

1. Какое правило equality показано в «Standard pattern»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-008 — Reason #1: Expressive intent (the biggest reason)

```text
source_id: S-008
image_hash: 491984032fb4
placements: 1
image_file: source/images-near-literal-v001/S-008__491984032fb4.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Reason #1: Expressive intent (the biggest reason)
This method is answering one conceptual question:
"What are the equality components, in order?"
yield return expresses this declaratively, step by step:
yield return City;
yield return Street;
yield return Zip;
yield return Country;
~~~

### Recall

1. Какое правило equality показано в «Reason #1: Expressive intent (the biggest reason)»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-009 — => obj is Money other && Equals(other);

```text
source_id: S-009
image_hash: 53bb137abb24
placements: 1
image_file: source/images-near-literal-v001/S-009__53bb137abb24.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
I

public override bool Equals(object? obj)
=> obj is Money other && Equals(other);

public override int GetHashCode()
=> HashCode.Combine(Amount, Currency);

public static bool operator ==(Money? left, Money? right)
=> Equals(left, right);

public static bool operator !=(Money? left, Money? right)
=> !Equals(left, right);

public override string ToString()
=> $"{Amount} {Currency}";

}
~~~

### Recall

1. Какое правило equality показано в «=> obj is Money other && Equals(other);»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-010 — This reads like:

```text
source_id: S-010
image_hash: d41a38e70efb
placements: 1
image_file: source/images-near-literal-v001/S-010__d41a38e70efb.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
This reads like:
"Equality consists of City, then Street, then Zip, then Country."
Compare with:
return new object[] { City, Street, Zip, Country };
That's fine, but:
- It hides the sequence inside a container
- Makes it easier to accidentally reorder or duplicate items
- Feels like "building a data structure" instead of "declaring equality"
This is about clarity and intent, not speed.
~~~

### Recall

1. Какое правило equality показано в «This reads like:»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-011 — Equals(object?)

```text
source_id: S-011
image_hash: 68712cda1046
placements: 1
image_file: source/images-near-literal-v001/S-011__68712cda1046.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Equals(object?)
This is the base virtual method from object .
Every .NET object has it.
Signature:
<a> C# Q
public override bool Equals(object? obj)
This exists so equality can work when the value is only known as object .
~~~

### Recall

1. Какое правило equality показано в «Equals(object?)»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-012 — Example:

```text
source_id: S-012
image_hash: 4cd1fc2d31c8
placements: 1
image_file: source/images-near-literal-v001/S-012__4cd1fc2d31c8.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Example:
object x = new Person(...);
object y = new Person(...);
bool same = x.Equals(y);
If you override this, you define your type's object-level equality behavior.
Typical implementation:
public override bool Equals(object? obj)
{
return obj is Person other && Equals(other);
}
It usually just forwards to the strongly typed version.
~~~

### Recall

1. Какое правило equality показано в «Example:»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-013 — Reason #2: No accidental coupling to a concrete collection

```text
source_id: S-013
image_hash: 4f7b3c374f05
placements: 1
image_file: source/images-near-literal-v001/S-013__4f7b3c374f05.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Reason #2: No accidental coupling to a concrete collection
With yield return:
- You return a pure sequence
- No implied ownership
- No temptation to mutate
With List<object>:
return new List<object> { City, Street, Zip, Country };
Now someone might:
- Change it to Add() conditionally
- Cache it
- Modify it later
yield return makes it clear:
"This is a read-only, throwaway enumeration."
~~~

### Recall

1. Какое правило equality показано в «Reason #2: No accidental coupling to a concrete collection»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-014 — IEquatable<T>.Equals(T?)

```text
source_id: S-014
image_hash: 4c01fa3f1e51
placements: 1
image_file: source/images-near-literal-v001/S-014__4c01fa3f1e51.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
IEquatable<T>.Equals(T?)
This is the strongly typed equality method.
Example:
public bool Equals(Person? other)
{
return other is not null &
FirstName == other.FirstName &&
LastName == other.LastName;
}
Why is this useful?
Because it:
- avoids boxing in some cases
- avoids type checks through object
- is what generic collections often prefer for equality comparisons
So for your own type, this is usually the "real" equality logic.
~~~

### Recall

1. Какое правило equality показано в «IEquatable<T>.Equals(T?)»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-015 — 5) Reason #3: No risk of reusing stale data

```text
source_id: S-015
image_hash: 7fa6152aaf32
placements: 1
image_file: source/images-near-literal-v001/S-015__7fa6152aaf32.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
5) Reason #3: No risk of reusing stale data
Consider this mistake:
private object[] _components;
protected override IEnumerable<object> GetEqualityComponents({)
{
return _components ??= new object[] { City, Street, Zip, Country };
}
This breaks equality if properties change (or during construction).
With yield return:
- Values are read at enumeration time
- No caching
- No hidden state
This is correct by construction.
~~~

### Recall

1. Какое правило equality показано в «5) Reason #3: No risk of reusing stale data»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-016 — Reason #4: Works naturally with base-class logic

```text
source_id: S-016
image_hash: a6ff67ad3343
placements: 1
image_file: source/images-near-literal-v001/S-016__a6ff67ad3343.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Reason #4: Works naturally with base-class logic
The base class only needs:
GetEqualityComponents() .SequenceEqual (other.GetEqual ityComponents())
It doesn't care:
- how values are stored
- whether they come from fields, properties, calculations
yield return fits this perfectly.
~~~

### Recall

1. Какое правило equality показано в «Reason #4: Works naturally with base-class logic»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-017 — Why not only override Equals(object?) ?

```text
source_id: S-017
image_hash: e8347042e576
placements: 1
image_file: source/images-near-literal-v001/S-017__e8347042e576.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
Why not only override Equals(object?) ?
You can, but IEquatable<T> is better for typed/generic scenarios.
Many .NET collections and comparers use it when available.
So the usual rule is:

- if your type has value equality, implement IEquatable<T>

- also override Equals(object?)

- also override GetHashCode()
They belong together.
~~~

### Recall

1. Какое правило equality показано в «Why not only override Equals(object?) ?»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?

---

## S-018 — If you override one, do you need the others?

```text
source_id: S-018
image_hash: 3aa243dc9147
placements: 1
image_file: source/images-near-literal-v001/S-018__3aa243dc9147.png
transcript_mode: OCR-assisted near-literal normalized v002
```

### Near-literal normalized visible content

~~~text
If you override one, do you need the others?
If you override Equals, you should override GetHashCode .
If you implement value equality, usually do all 3:
- IEquatable<T>.Equals(T?)
- Equals(object?)
- (GetHashCode()
That keeps behavior consistent.
~~~

### Recall

1. Какое правило equality показано в «If you override one, do you need the others?»?
2. Какие members equality contract должны оставаться согласованными?
3. Как это правило влияет на Dictionary или HashSet?
