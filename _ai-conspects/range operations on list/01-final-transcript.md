# Final semantic transcript — C# range operations on `List<T>`

Authoritative source: `source/range operations on list.svg`  
Coverage: **18 unique screenshots / 18 placements + 4 native SVG labels**

---

# R01 — slicing, ranges and mutation

`List<T>.GetRange(index, count)` copies a contiguous range into a new list:

```csharp
var slice =
    list.GetRange(1, 3);
```

It throws when `index`, `count` or their combination is outside the valid list bounds.

LINQ offers a lazy, non-throwing composition for many user-controlled ranges:

```csharp
IEnumerable<T> slice =
    list.Skip(start).Take(count);
```

`Skip` ignores excess start positions and `Take` stops at the end. Add `.ToList()` when a materialized list is required.

The range operator can slice supported values:

```csharp
var slice = list[start..end];
var fromStart = list[..3];
var toEnd = list[2..];
var lastTwo = list[^2..];
```

For `List<T>`, range access produces a copied range and still throws for invalid boundaries.

Mutation APIs change the original list:

```csharp
list.RemoveRange(index, count);
list.InsertRange(index, collection);
```

Replacing a range is normally expressed as remove plus insert:

```csharp
list.RemoveRange(1, 2);
list.InsertRange(
    1,
    new[] { "X", "Y" });
```

---

# R02 — safety and clamping

When range values come from user input or external data, clamp them before using APIs that throw:

```csharp
int safeStart =
    Math.Max(0, start);

safeStart =
    Math.Min(
        safeStart,
        list.Count);

int safeCount =
    Math.Max(0, count);

safeCount =
    Math.Min(
        safeCount,
        list.Count - safeStart);

List<T> slice =
    list.GetRange(
        safeStart,
        safeCount);
```

Equivalent start/end logic:

```csharp
int safeStart =
    Math.Clamp(
        start,
        0,
        list.Count);

int safeEnd =
    Math.Clamp(
        end,
        safeStart,
        list.Count);

var slice =
    list[safeStart..safeEnd];
```

Rules:

```text
start must be within 0..Count
count must be non-negative
start + count must not exceed Count
end must not be less than start
```

`Skip(start).Take(count)` is usually the simplest safe behavior when “return as many as possible” is acceptable. Explicit clamping is preferable when the API contract must expose exact index math.

---

# R03 — enumeration, chunks and sliding windows

Generate indexes lazily:

```csharp
IEnumerable<T> values =
    Enumerable.Range(start, count)
        .Select(index => list[index]);
```

This allocates no result collection until materialized, but invalid indexes still throw.

For streaming-safe enumeration:

```csharp
IEnumerable<T> SafeRange<T>(
    IReadOnlyList<T> list,
    int start,
    int count)
{
    int safeStart =
        Math.Clamp(
            start,
            0,
            list.Count);

    int safeEnd =
        Math.Clamp(
            start + Math.Max(0, count),
            safeStart,
            list.Count);

    for (
        int index = safeStart;
        index < safeEnd;
        index++)
    {
        yield return list[index];
    }
}
```

Chunking in modern .NET:

```csharp
IEnumerable<T[]> chunks =
    source.Chunk(size);
```

Sliding windows of size `window` have valid start indexes:

```text
0 .. Count - window
```

so the number of full windows is:

```text
Count - window + 1
```

Implementation:

```csharp
var windows =
    Enumerable.Range(
        0,
        Math.Max(
            0,
            list.Count - window + 1))
    .Select(
        index =>
            list.Skip(index)
                .Take(window));
```

---

# R04 — performance and decision guide

Typical characteristics:

```text
GetRange
    creates a new List<T>
    copies the selected values
    O(n) in selected count

Skip/Take
    lazy enumeration
    no result allocation until materialized
    repeated access may re-enumerate

range operator on List<T>
    copies the selected range
    validates boundaries

RemoveRange
    mutates the list
    later elements may need shifting

Chunk
    enumerates once and produces arrays
```

Decision guide:

```text
safe user-controlled range
    Skip + Take

need a List<T>
    Skip + Take + ToList
    or validated GetRange

must use GetRange/range syntax
    clamp start/count/end first

streaming or custom iteration
    iterator with yield return

full non-overlapping batches
    Chunk

overlapping windows
    generated start indexes + slice
```

Practical rule: controlled internal indexes can use direct range APIs; external or computed indexes should be validated or safely clamped.

---

# Coverage

```text
unique embedded screenshots: 18
image uses: 18
native SVG labels: 4
duplicate extra placements: 0

processed image uses: 18
processed text labels: 4
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
