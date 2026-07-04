# Full source-preserving transcript v001 — Equality / IEquatable / GetHashCode / ValueObject

    Generated: 2026-07-04 UTC

    ```text
    source SVG: source/equality.svg
    SHA-256: 73853021447ae9b656b8bb9cf137bdb6f673849c28342ac0dd62052d9251f399
    Git blob SHA: 02906f4e05e6e444ad07a4de26cd17d1255aac5c
    viewBox: 0 0 4652.0796233406745 4051.770643390252
    unique embedded screenshots: 18 / 18
    image uses: 18 / 18
    duplicate extra placements: 0
    native SVG text lines: 6 / 6
    source blocks: 18 / 18
    ```

    This transcript is near-literal normalized and OCR-assisted. Obvious OCR noise is corrected where clear; exact punctuation, indentation and version-specific API spelling remain authoritative in the preserved screenshots.

    ## Integrated map

    Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

    ## Source-by-source transcript

## S-001 — ToString()

        ```text
        source_id: S-001
        image_hash: 2fb2a1d86511
        placements: 1
        image_file: source/images-near-literal-v001/S-001__2fb2a1d86511.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        ToString()

ToString() has nothing to do with equality correctness.
You overrid- it only if you want:

- better logging,

- better debugging,

- prettier API output,

- ora domain-friendly string representation.
So for a valu- object lik- Money , EmailAddress , OrderId, overriding ToString() is often useful, but it is
not part of th- equality contract. Records synthesiz- ToString() for convenience, but that does not mean
your class-based valu- object must do th- same. — Microsoft Leam +1
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-002 — Bl Your Address class in th- correct form

        ```text
        source_id: S-002
        image_hash: b27cf2487c48
        placements: 1
        image_file: source/images-near-literal-v001/S-002__b27cf2487c48.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Bl Your Address class in th- correct form
csharp - Konuporats koa
public class Address : ValueObject
{
public string City { get; init; }
public string Street { get; init; }
public string Zip { get; init; }
public string Country { get; init; }
protected overrid- IEnumerable<object> GetEqualityComponents()
{
yield return City;
yield return Street;
yield return Zip;
yield return Country;
}
t
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-003 — GetHashCode()

        ```text
        source_id: S-003
        image_hash: b8d72382830f
        placements: 1
        image_file: source/images-near-literal-v001/S-003__b8d72382830f.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        GetHashCode()
If two objects ar- equal according to Equals , they must return th- sam- hash code.
That is required for correct behavior in:
- Dictionary
- HashSet
- lookup structures
So if:
```csharp ay
a.Equals(b) == true
then:
```csharp ay
a.GetHashCode() == b.GetHashCode()
must also b- true.
Th- revers- is not required.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-004 — 3) |IEquatable<T> and th- big pictur- of equality

        ```text
        source_id: S-004
        image_hash: e5a50bf0fa30
        placements: 1
        image_file: source/images-near-literal-v001/S-004__e5a50bf0fa30.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        3) |IEquatable<T> and th- big pictur- of equality
This is on- of th- most important parts.
Ther- ar- 3 related members:
- Equals(object?)
- IEquatable<T>. Equals(T?)
- (GetHashCode()
They all belong to th- sam- equality story.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-005 — Good practical rule

        ```text
        source_id: S-005
        image_hash: 8c6171ea1ed4
        placements: 1
        image_file: source/images-near-literal-v001/S-005__8c6171ea1ed4.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Good practical rule
For a public valu- object class, I'd usually implement all of these:
```csharp
public sealed class Money : IEquatable<Money>
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
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-006 — Th- big picture

        ```text
        source_id: S-006
        image_hash: 54bb840b6741
        placements: 1
        image_file: source/images-near-literal-v001/S-006__54bb840b6741.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Th- big picture
When you creat- a custom type, you may want two instances to b- considered equal by value, not by
reference.
Example:
```csharp Q
new Person("A", "B")
new Person("A", "B")
Should thes- b- equal?
- by default for a normal class: no, becaus- they ar- different references
- with custom equality: mayb- yes, if sam- values mean sam- logical object
To support valu- equality properly, you usually implement:
- typed equality: IEquatable<T>.Equals(T?)
- object equality: overrid- Equals(object?)
- matching hash code: overrid- GetHashCode()
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-007 — Standard pattern

        ```text
        source_id: S-007
        image_hash: f33b4c275364
        placements: 1
        image_file: source/images-near-literal-v001/S-007__f33b4c275364.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Standard pattern
```csharp oO
public sealed class Person : IEquatable<Person>
{
public string FirstNam- { get; init; } = "";
public string LastNam- { get; init; } = “";
public bool Equals(Person? other)
{
return other is not null &&
FirstNam- == other.FirstNam- &&
LastNam- == other.LastName;
}
public overrid- bool Equals(object? obj)
{
return obj is Person other && Equals(other);
}
public overrid- int GetHashCode()
{
return HashCode.Combine(FirstName, LastName) ;
}
}
That is th- classic value-equality implementation.
|
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-008 — ) Reason #1: Expressiv- intent (th- biggest reason)

        ```text
        source_id: S-008
        image_hash: 491984032fb4
        placements: 1
        image_file: source/images-near-literal-v001/S-008__491984032fb4.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        ) Reason #1: Expressiv- intent (th- biggest reason)
This method is answering on- conceptual question:
“What ar- th- equality components, in order?”
yield return expresses this declaratively, step by step:
csharp - Konuporat- koa,
yield return City;
yield return Street;
yield return Zip;
yield return Country;
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-009 — public overrid- bool Equals(object? obj)

        ```text
        source_id: S-009
        image_hash: 53bb137abb24
        placements: 1
        image_file: source/images-near-literal-v001/S-009__53bb137abb24.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        I

public overrid- bool Equals(object? obj)
=> obj is Money other && Equals(other) ;

public overrid- int GetHashCode()
=> HashCode.Combine(Amount, Currency);

public static bool operator ==(Money? left, Money? right)
=> Equals(left, right);

public static bool operator !=(Money? left, Money? right)
=> !Equals(left, right);

public overrid- string ToString()
=> $"{Amount} {Currency}";

}
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-010 — This reads like:

        ```text
        source_id: S-010
        image_hash: d41a38e70efb
        placements: 1
        image_file: source/images-near-literal-v001/S-010__d41a38e70efb.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        This reads like:
“Equality consists of City, then Street, then Zip, then Country.”
Compar- with:
csharp - Konuporat- koa,
return new object[] { City, Street, Zip, Country };
That's fine, but:
- It hides th- sequenc- insid- a container
- Makes it easier to accidentally reorder or duplicat- items
- Feels lik- “building a data structure” instead of “declaring equality”
This is about clarity and intent, not speed.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-011 — Equals(object?)

        ```text
        source_id: S-011
        image_hash: 68712cda1046
        placements: 1
        image_file: source/images-near-literal-v001/S-011__68712cda1046.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Equals(object?)
This is th- bas- virtual method from object .
Every .NET object has it.
Signature:
<a> C# Q
public overrid- bool Equals(object? obj)
This exists so equality can work when th- valu- is only known as object .
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-012 — Example:

        ```text
        source_id: S-012
        image_hash: 4cd1fc2d31c8
        placements: 1
        image_file: source/images-near-literal-v001/S-012__4cd1fc2d31c8.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Example:
```csharp a)
object x = new Person(...);
object y = new Person(...);
bool sam- = x.Equals(y);
If you overrid- this, you defin- your type’s object-level equality behavior.
Typical implementation:
```csharp a)
public overrid- bool Equals(object? obj)
{
return obj is Person other && Equals(other);
}
It usually just forwards to th- strongly typed version.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-013 — @ Reason #2: No accidental coupling to a concret- collection

        ```text
        source_id: S-013
        image_hash: 4f7b3c374f05
        placements: 1
        image_file: source/images-near-literal-v001/S-013__4f7b3c374f05.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        @ Reason #2: No accidental coupling to a concret- collection
With yield return:
- You return a pur- sequence
- No implied ownership
- No temptation to mutate
With List<object> :
csharp O Konuposat- koa,
return new List<object> { City, Street, Zip, Country };
Now someon- might:
- Chang- it to Add() conditionally
- Cach- it
- Modify it later
yield return makes it clear:
“This is a read-only, throwaway enumeration.”
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-014 — IEquatable<T>.Equals(T?)

        ```text
        source_id: S-014
        image_hash: 4c01fa3f1e51
        placements: 1
        image_file: source/images-near-literal-v001/S-014__4c01fa3f1e51.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        IEquatable<T>.Equals(T?)
This is th- strongly typed equality method.
Example:
```csharp ay
public bool Equals(Person? other)
{
return other is not null &
FirstNam- == other.FirstNam- &&
LastNam- == other.LastName;
}
Why is this useful?
Becaus- it:
- avoids boxing in som- cases
- avoids typ- checks through object
- is what generic collections often prefer for equality comparisons
So for your own type, this is usually th- “real” equality logic.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-015 — 5) Reason #3: No risk of reusing stal- data

        ```text
        source_id: S-015
        image_hash: 7fa6152aaf32
        placements: 1
        image_file: source/images-near-literal-v001/S-015__7fa6152aaf32.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        5) Reason #3: No risk of reusing stal- data
Consider this mistake:
csharp O Konuposat- Koa,
privat- object[] _components;
protected overrid- IEnumerable<object> GetEqualityComponents({)
{
return _components ??= new object[] { City, Street, Zip, Country };
}
This breaks equality if properties chang- (or during construction).
With yield return:
- Values ar- read at enumeration time
- No caching
- No hidden state
This is correct by construction.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-016 — [6] Reason #4: Works naturally with base-class logic

        ```text
        source_id: S-016
        image_hash: a6ff67ad3343
        placements: 1
        image_file: source/images-near-literal-v001/S-016__a6ff67ad3343.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        [6] Reason #4: Works naturally with base-class logic
Th- bas- class only needs:
csharp O Konuposat- koa,
GetEqualityComponents() .SequenceEqual (other .GetEqual ityComponents())
It doesn’t care:
- how values ar- stored
- whether they com- from fields, properties, calculations
yield return fits this perfectly.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-017 — Why not only overrid- Equals(object?) ?

        ```text
        source_id: S-017
        image_hash: e8347042e576
        placements: 1
        image_file: source/images-near-literal-v001/S-017__e8347042e576.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        Why not only overrid- Equals(object?) ?
You can, but IEquatable<T> is better for typed/generic scenarios.
Many .NET collections and comparers us- it when available.
So th- usual rul- is:

- if your typ- has valu- equality, implement IEquatable<T>

- also overrid- Equals(object?)

- also overrid- GetHashCode()
They belong together.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?


---

## S-018 — If you overrid- one, do you need th- others?

        ```text
        source_id: S-018
        image_hash: 3aa243dc9147
        placements: 1
        image_file: source/images-near-literal-v001/S-018__3aa243dc9147.png
        transcript_mode: OCR-assisted near-literal normalized
        ```

        ### Видимый текст / код

        ```text
        If you overrid- one, do you need th- others?
If you overrid- Equals , you should overrid- GetHashCod- .
If you implement valu- equality, usually do all 3:
- IEquatable<T>.Equals(T?)
- Equals(object?)
- (GetHashCode()
That keeps behavior consistent.
        ```

        ### Смысл

        Конспект закрывает class-based value equality в C#: `Equals(object?)`,
`IEquatable<T>.Equals(T?)`, `GetHashCode`, operators, `GetEqualityComponents`,
`ToString` как diagnostics-only и практические правила для Dictionary/HashSet.

        ### Вопросы
1. Какие members участвуют в equality contract?
2. Почему равные объекты обязаны иметь одинаковый hash code?
3. Что не входит в correctness equality, но полезно для диагностики?

