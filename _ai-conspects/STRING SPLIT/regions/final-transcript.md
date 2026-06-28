# Final semantic transcript — C# `String.Split`

Authoritative source: `source/STRING SPLIT.svg`

## Basic split

```csharp
string input =
    "a,b,c";

string[] parts =
    input.Split(',');
```

Several separators:

```csharp
string[] parts =
    input.Split(
        new[] { ',', ';' }
    );
```

String separator:

```csharp
string[] parts =
    input.Split(
        "::",
        StringSplitOptions.None
    );
```

## Options

```csharp
string[] parts =
    input.Split(
        ',',
        StringSplitOptions
            .RemoveEmptyEntries
        | StringSplitOptions
            .TrimEntries
    );
```

`TrimEntries` trims each result; `RemoveEmptyEntries` discards empty results.

## Limit count

```csharp
string[] parts =
    input.Split(
        separator,
        count: 2
    );
```

Useful for key/value parsing where the remainder should stay intact.

## Parsing caveat

`Split` is not a CSV parser. Quoting, escaped separators and embedded newlines require a real CSV parser or a state machine.

For allocation-sensitive parsing, use spans and delimiter indexes:

```csharp
ReadOnlySpan<char> span =
    input.AsSpan();

int separatorIndex =
    span.IndexOf(',');
```

Choose `Split` for simple delimiter formats with explicit rules.


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
