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
