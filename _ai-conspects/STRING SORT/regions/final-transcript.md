# Final semantic transcript — sorting strings in C#

Authoritative source: `source/STRING SORT.svg`

## Arrays and lists

```csharp
string[] words =
{
    "Apple",
    "banana",
    "Cherry"
};

Array.Sort(words);
```

Case-insensitive ordinal sorting:

```csharp
Array.Sort(
    words,
    StringComparer
        .OrdinalIgnoreCase
);
```

List:

```csharp
wordsList.Sort(
    StringComparer
        .CurrentCultureIgnoreCase
);
```

These mutate the collection.

## LINQ ordering

```csharp
string[] sorted =
    words
        .OrderBy(
            value => value,
            StringComparer
                .OrdinalIgnoreCase
        )
        .ToArray();
```

`OrderBy` returns a new ordered sequence and does not modify the source.

Descending:

```csharp
var sorted =
    words.OrderByDescending(
        value => value,
        comparer
    );
```

## Comparer selection

```text
Ordinal
    technical identifiers; deterministic code-unit ordering

OrdinalIgnoreCase
    case-insensitive technical identifiers

CurrentCulture
    user-facing localized text

InvariantCulture
    stable linguistic behavior across environments
```

Choose deliberately instead of converting strings with `ToLower`.

## Stable tie breaking

When the comparer considers values equal, add a secondary key when deterministic ordering matters:

```csharp
var sorted =
    words
        .OrderBy(
            x => x,
            comparer
        )
        .ThenBy(
            x => x,
            StringComparer.Ordinal
        );
```


# Coverage

```text
unique embedded screenshots: 1
image uses: 1
native SVG labels: 1
duplicate extra placements: 0

processed image uses: 1
processed text labels: 1
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
