# Final semantic transcript — enumerating flag combinations with bit masks

Authoritative source: `source/Bitwise checking for all combinations.svg`  
Coverage: **14 unique screenshots / 14 placements + 14 native SVG labels**

---

# R01 — flags and powers of two

A flags enum represents independent choices with distinct bits:

```csharp
[Flags]
public enum Permission
{
    None  = 0,
    Read  = 1 << 0,
    Write = 1 << 1,
    Share = 1 << 2,
}
```

Values are powers of two:

```text
001
010
100
```

Combine flags with bitwise OR:

```csharp
Permission value =
    Permission.Read |
    Permission.Share;
```

The result contains both bits.

Check inclusion:

```csharp
bool hasRead =
    (value & Permission.Read)
    == Permission.Read;
```

`Enum.HasFlag` is readable, while explicit bitwise checks give direct control and avoid ambiguity about zero-valued flags.

---

# R02 — enumerate all non-empty combinations

For `n` independent flags there are:

```text
2^n total subsets
2^n - 1 non-empty subsets
```

Each integer mask from `1` through `(1 << n) - 1` identifies one subset.

```csharp
for (
    long mask = 1;
    mask < (1L << n);
    mask++
)
{
    long combined = 0;

    for (int i = 0; i < n; i++)
    {
        if (
            (mask & (1L << i))
            != 0
        )
        {
            combined |= values[i];
        }
    }

    yield return combined;
}
```

For three flags:

```text
001 -> C
010 -> B
011 -> B + C
100 -> A
101 -> A + C
110 -> A + B
111 -> A + B + C
```

The loop enumerates the power set except the empty set.

---

# R03 — generic enum conversion

Bitwise operators work on integral values, not directly on unconstrained generic enum values.

A generic implementation typically:

```text
1. gets atomic enum values
2. converts each to an integral representation
3. combines bits
4. converts the numeric result back to the enum type
```

Example:

```csharp
object boxed =
    Enum.ToObject(
        typeof(TEnum),
        combinedValue
    );

TEnum result =
    (TEnum)boxed;
```

`Enum.ToObject` returns `object`, so the cast is required to satisfy the generic return type.

`yield return` produces each combination lazily and keeps the iterator running for later results.

---

# R04 — correctness and scale constraints

Filter out:

```text
zero/None
duplicate numeric values
pre-combined enum members
aliases that repeat the same bit pattern
```

Otherwise the “atomic flags” list can generate duplicate or misleading combinations.

Use an integral width that can contain every bit. A `long` mask supports at most 63 practical positive bit positions when shifting with signed values; use `ulong` when that better matches the enum’s underlying type.

The algorithm is exponential:

```text
n = 20 -> about one million combinations
n = 30 -> about one billion combinations
```

Do not materialize every combination for a large flag count.

A robust generic method should also validate that the enum is intended for flags and that each selected atomic value has exactly one bit set.

---

# Coverage

```text
unique embedded screenshots: 14
image uses: 14
native SVG labels: 14
duplicate extra placements: 0

processed image uses: 14
processed text labels: 14
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
