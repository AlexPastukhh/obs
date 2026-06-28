# Final semantic transcript — C# Regex sheet

Authoritative source: `source/sheet regex sharp.svg`

## Core operations

```csharp
bool matched =
    Regex.IsMatch(
        input,
        pattern
    );

Match match =
    Regex.Match(
        input,
        pattern
    );

MatchCollection matches =
    Regex.Matches(
        input,
        pattern
    );

string replaced =
    Regex.Replace(
        input,
        pattern,
        replacement
    );

string[] parts =
    Regex.Split(
        input,
        pattern
    );
```

Use `Match.Groups` for captures and named groups:

```regex
(?<name>[A-Za-z]+)
```

```csharp
string name =
    match.Groups["name"].Value;
```

## Dynamic values and `Regex.Escape`

Never concatenate an untrusted literal directly into regex syntax:

```csharp
string searchText =
    GetSearchText();

string pattern =
    Regex.Escape(
        searchText
    );
```

For a whole-word literal:

```csharp
string pattern =
    $@"\b{
        Regex.Escape(searchText)
    }\b";
```

`Regex.Escape` neutralizes characters such as `.`, `*`, `?`, `(` and `[` so they are matched literally.

## Options and timeout

```csharp
var regex = new Regex(
    pattern,
    RegexOptions.IgnoreCase
    | RegexOptions.CultureInvariant,
    TimeSpan.FromMilliseconds(200)
);
```

Common options:

```text
IgnoreCase
Multiline
Singleline
Compiled
CultureInvariant
ExplicitCapture
NonBacktracking where compatible
```

Use a timeout for complex patterns or untrusted input.

## Replacement

```csharp
string result =
    regex.Replace(
        input,
        match =>
            Transform(
                match.Value
            )
    );
```

Evaluator replacement is appropriate for conditional logic and computed output.


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
