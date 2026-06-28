# Final semantic transcript — C# string replacement

Authoritative source: `source/REPLACE.svg`

## Literal replacement

```csharp
string result =
    input.Replace(
        "old",
        "new"
    );
```

Character overload:

```csharp
string result =
    input.Replace(
        '-',
        '_'
    );
```

Strings are immutable; assign the return value.

## Comparison-aware replacement

Modern .NET versions include comparison-aware overloads:

```csharp
string result =
    input.Replace(
        "hello",
        "hi",
        StringComparison
            .OrdinalIgnoreCase
    );
```

Confirm availability for the target framework.

## Regex replacement

Use regex when matching is pattern-based or conditional:

```csharp
string result =
    Regex.Replace(
        input,
        Regex.Escape(search),
        replacement,
        RegexOptions.IgnoreCase,
        TimeSpan.FromMilliseconds(
            200
        )
    );
```

Computed replacement:

```csharp
string result =
    Regex.Replace(
        input,
        pattern,
        match =>
            Transform(match)
    );
```

## Choosing an API

```text
literal, case-sensitive
    string.Replace

literal, comparison-aware
    comparison overload when available

pattern or captures
    Regex.Replace

many one-pass transformations
    consider a parser or StringBuilder
```

Replacement strings in regex treat `$1`, `${name}` and `$$` specially. Use `MatchEvaluator` when literal replacement data may contain `$`.


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
