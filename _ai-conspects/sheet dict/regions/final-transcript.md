# Final semantic transcript — Dictionary, HashSet and ConditionalWeakTable

Authoritative source: `source/sheet dict.svg`

---

# R01 — dictionary equality and key-set operations

## Dictionary equality

Two dictionaries are equal by content when:

```text
counts are equal
each key exists in the other dictionary
the values for matching keys are equal
```

```csharp
static bool DictionaryEqual<TKey, TValue>(
    IReadOnlyDictionary<TKey, TValue> left,
    IReadOnlyDictionary<TKey, TValue> right,
    IEqualityComparer<TValue>? valueComparer = null)
    where TKey : notnull
{
    valueComparer ??=
        EqualityComparer<TValue>.Default;

    if (left.Count != right.Count)
    {
        return false;
    }

    foreach (var (key, leftValue) in left)
    {
        if (!right.TryGetValue(
                key,
                out var rightValue))
        {
            return false;
        }

        if (!valueComparer.Equals(
                leftValue,
                rightValue))
        {
            return false;
        }
    }

    return true;
}
```

There is no built-in dictionary `SetEquals` because equality must define both key and value semantics.

Key equality comes from the dictionary comparer. Value equality comes from `EqualityComparer<TValue>.Default` or an explicitly supplied comparer.

## Treat keys as a set

Union:

```csharp
var allKeys =
    new HashSet<TKey>(
        left.Keys,
        left.Comparer
    );

allKeys.UnionWith(
    right.Keys
);
```

Intersection:

```csharp
var commonKeys =
    new HashSet<TKey>(
        left.Keys,
        left.Comparer
    );

commonKeys.IntersectWith(
    right.Keys
);
```

Difference:

```csharp
var onlyLeft =
    new HashSet<TKey>(
        left.Keys,
        left.Comparer
    );

onlyLeft.ExceptWith(
    right.Keys
);
```

Use the same comparer as the source dictionary when key semantics matter, for example case-insensitive strings.

## Build a dictionary from selected keys

```csharp
var common =
    left.Keys
        .Intersect(
            right.Keys,
            left.Comparer
        )
        .ToDictionary(
            key => key,
            key => left[key],
            left.Comparer
        );
```

For hot paths, `TryGetValue` can avoid repeated lookups.

## `KeyValuePair` is a value type

```csharp
KeyValuePair<TKey, TValue>
```

is a struct. Equality is value-based according to its component equality rules, not object reference identity.

---

# R02 — capacity and preallocation

## Constructor capacity

```csharp
int expectedCount = 10_000;

var dictionary =
    new Dictionary<int, string>(
        expectedCount
    );

var set =
    new HashSet<Guid>(
        expectedCount
    );
```

Capacity reserves internal table storage so the collection can accept roughly that number of items before resizing.

It is not a maximum size. If more elements are added, the collection grows automatically.

## Why preallocation helps

Without capacity, growth can require:

```text
allocate larger bucket/entry arrays
rehash existing entries
copy metadata
leave old arrays for garbage collection
```

For known large counts, preallocation can reduce:

```text
allocations
rehashes
CPU work
GC pressure
latency spikes
```

The benefit is largest in:

```text
hot loops
startup-heavy indexing
real-time services
game engines
high-throughput ingestion
```

For small collections, the difference is usually negligible.

## Capacity is implementation storage

Requested capacity may be rounded to an implementation-appropriate table size.

```text
capacity
    current internal accommodation

Count
    number of stored entries

maximum size
    not defined by constructor capacity
```

## `EnsureCapacity`

```csharp
dictionary.EnsureCapacity(
    expectedCount
);
```

This ensures at least the requested capacity and returns the resulting capacity.

## `TrimExcess`

```csharp
dictionary.TrimExcess();
```

or:

```csharp
dictionary.TrimExcess(
    targetCapacity
);
```

This can shrink internal storage but reallocates and rehashes. Do not call it repeatedly in hot paths.

## Comparer-aware construction

Prefer:

```csharp
var dictionary =
    new Dictionary<
        string,
        int
    >(
        capacity: 1000,
        comparer:
            StringComparer.OrdinalIgnoreCase
    );
```

Avoid building with one comparer and copying into another dictionary later:

```csharp
var copied =
    new Dictionary<string, int>(
        oldDictionary,
        StringComparer.OrdinalIgnoreCase
    );
```

That path allocates a new table and reinserts every entry. If the comparer is known up front, provide it during the original construction.

---

# R03 — Dictionary API sheet

## Core characteristics

```text
namespace
    System.Collections.Generic

structure
    hash table

average key lookup
    O(1)

worst case
    O(n) with severe collisions

ordering
    do not rely on it as a sorted contract
```

Use `SortedDictionary` or an ordered abstraction when sorted order is part of the requirement.

## Lookup

```csharp
TValue value =
    dictionary[key];
```

Indexer lookup throws when the key is missing.

```csharp
if (dictionary.TryGetValue(
        key,
        out TValue? value))
{
    // value found
}
```

Other operations:

```text
GetValueOrDefault(key)
ContainsKey(key)
ContainsValue(value)
```

`ContainsValue` is O(n).

## Add and update

```csharp
dictionary.Add(
    key,
    value
);
```

Throws if the key exists.

```csharp
bool added =
    dictionary.TryAdd(
        key,
        value
    );
```

Indexer assignment inserts or overwrites:

```csharp
dictionary[key] =
    value;
```

## Remove

```csharp
bool removed =
    dictionary.Remove(key);
```

Modern .NET also supports retrieving the removed value:

```csharp
if (dictionary.Remove(
        key,
        out TValue? removedValue))
{
    // removed
}
```

```csharp
dictionary.Clear();
```

## Count, capacity and enumeration

```text
Count
EnsureCapacity
TrimExcess
Keys
Values
GetEnumerator
```

```csharp
foreach (
    KeyValuePair<TKey, TValue> pair
    in dictionary
)
{
    Console.WriteLine(
        $"{pair.Key}: {pair.Value}"
    );
}
```

`Keys` and `Values` are live collection views, not copied arrays.

## Interface behavior

Some operations are exposed through implemented interfaces, such as non-generic `IDictionary` or `ICollection<KeyValuePair<TKey,TValue>>`.

Prefer the strongly typed dictionary API in normal code; interface casts are mainly relevant to generic infrastructure.

---

# R04 — `ConditionalWeakTable`

## Weak-key association

```csharp
var table =
    new ConditionalWeakTable<
        object,
        Metadata
    >();

object key =
    new();

table.Add(
    key,
    new Metadata()
);
```

The entry remains while the key is alive. When no strong reference to the key exists, the runtime may collect the key and remove the association automatically.

```csharp
key = null!;
// association becomes eligible for cleanup
```

## What is weak

```text
key
    weakly held for lifetime purposes

value
    kept alive by the association while key lives
```

The table does not prevent the key from being garbage-collected.

Keys must be reference types.

## Common use cases

```text
attach metadata to objects you do not own
cache an expensive derived value per object
framework/runtime bookkeeping
avoid modifying the target object's class
avoid memory leaks from ordinary strong-key dictionaries
```

```csharp
Result GetResult(MyClass key)
{
    return cache.GetValue(
        key,
        static value =>
            Compute(value)
    );
}
```

## Not a general-purpose dictionary

`ConditionalWeakTable` intentionally has a limited API:

```text
not designed for normal enumeration
not a set of stable business records
not a replacement for Dictionary
not a way to observe garbage collection timing
```

## Relation to JavaScript `WeakMap`

Both provide weak-key associations with reference/object keys and automatic lifetime-based cleanup.

Differences are runtime- and API-specific, but the shared concept is:

```text
metadata follows the key object's lifetime
the table does not keep the key alive
```

# Coverage

```text
unique embedded screenshots: 35
image uses: 35
native SVG labels: 11
duplicate extra placements: 0

processed image uses: 35
processed text labels: 11
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
