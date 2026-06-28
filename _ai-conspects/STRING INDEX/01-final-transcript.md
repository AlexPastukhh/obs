# Final semantic transcript — C# string indexes

Authoritative source: `source/STRING INDEX.svg`

## `IndexOf`

```csharp
int index =
    text.IndexOf(',');

bool hasComma =
    index >= 0;
```

Substring with explicit comparison:

```csharp
int index =
    text.IndexOf(
        "token",
        StringComparison
            .OrdinalIgnoreCase
    );
```

## `LastIndexOf`

```csharp
int last =
    text.LastIndexOf(',');
```

Both methods return `-1` when no match exists.

## Start position and count

Overloads can limit the search range:

```csharp
int index =
    text.IndexOf(
        value,
        startIndex,
        count,
        comparison
    );
```

Check overload semantics carefully, especially for `LastIndexOf`, whose starting position scans backward.

## Index from end

C# range syntax:

```csharp
char last =
    text[^1];

string suffix =
    text[^3..];
```

The string must be non-empty for `[^1]`.

## Predicate-based search

`string` has no dedicated `FindIndex(Func<char,bool>)`.

Options:

```csharp
int index =
    text
        .Select(
            (character, index) =>
                (character, index)
        )
        .Where(
            item =>
                char.IsDigit(
                    item.character
                )
        )
        .Select(
            item => item.index
        )
        .DefaultIfEmpty(-1)
        .First();
```

For performance and clarity, a loop is usually better:

```csharp
int index = -1;

for (
    int i = 0;
    i < text.Length;
    i++
)
{
    if (char.IsDigit(text[i]))
    {
        index = i;
        break;
    }
}
```


# Coverage

```text
unique embedded screenshots: 1
image uses: 1
native SVG labels: 2
duplicate extra placements: 0

processed image uses: 1
processed text labels: 2
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
