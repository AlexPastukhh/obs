# Final semantic transcript — `Contains`, `StartsWith` and `EndsWith` in C#

Authoritative source: `source/CONTAINS STARTSWITH ENDSWITH.svg`

```csharp
string text =
    "HelloWorld";
```

## Contains

```csharp
bool contains =
    text.Contains(
        "world",
        StringComparison
            .OrdinalIgnoreCase
    );
```

Use when the value may occur anywhere.

## StartsWith

```csharp
bool starts =
    text.StartsWith(
        "hello",
        StringComparison
            .OrdinalIgnoreCase
    );
```

Useful for prefixes, but validate boundaries when the prefix is a structured token.

## EndsWith

```csharp
bool ends =
    text.EndsWith(
        ".json",
        StringComparison
            .OrdinalIgnoreCase
    );
```

Common for extensions and suffix markers.

## Comparison choice

```text
Ordinal / OrdinalIgnoreCase
    machine identifiers, protocols, extensions

CurrentCulture
    user-facing linguistic text

InvariantCulture
    stable linguistic rules independent of current culture
```

Do not call `ToLower()` solely to compare values. Comparison overloads avoid temporary strings and state the intended rules.

## Null handling

These are instance methods:

```csharp
bool matches =
    text?.StartsWith(
        prefix,
        comparison
    )
    == true;
```

For equality, use `string.Equals`, not `Contains`.


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
