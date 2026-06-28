# Final semantic transcript — C# string to characters

Authoritative source: `source/string to char list.svg`

## String enumeration

A C# string implements `IEnumerable<char>`:

```csharp
string text = "Hello";

foreach (char value in text)
{
    Console.WriteLine(value);
}
```

To create an array:

```csharp
char[] characters =
    text.ToCharArray();
```

To create a list:

```csharp
List<char> characters =
    text.ToList();
```

or:

```csharp
var characters =
    new List<char>(text);
```

## Allocation choices

```text
foreach
    no collection allocation; process sequentially

ToCharArray
    creates a new char[]

ToList
    creates a new List<char>

AsSpan
    creates a non-owning view for synchronous processing
```

```csharp
ReadOnlySpan<char> span =
    text.AsSpan();
```

## Unicode caveat

`char` is a UTF-16 code unit, not always a complete Unicode character. Supplementary characters can use a surrogate pair.

For Unicode scalar values:

```csharp
foreach (
    Rune rune
    in text.EnumerateRunes()
)
{
    Console.WriteLine(rune);
}
```

Use `char` when code-unit processing is intended; use `Rune` for Unicode code-point processing.


# Coverage

```text
unique embedded screenshots: 1
image uses: 1
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 1
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
