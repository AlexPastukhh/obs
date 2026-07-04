# `Contains`, `StartsWith`, `EndsWith` — source-preserving final transcript v002

Authoritative source:

```text
source/CONTAINS STARTSWITH ENDSWITH.svg
```

Coverage:

```text
unique embedded screenshots: 1
image uses on canvas: 1
native SVG labels: 0
processed image uses: 1
remaining image uses: 0
```

## S-001 / IU-001 — three string-search examples

Metadata:

```text
source id: S-001
image-use id: IU-001
embedded-image SHA-1 short: 230bda2580
readability: high
cropped: no
confidence: high
```

### Near-literal visible code

The screenshot contains this code:

```csharp
var s = "Hello World";

bool a = s.Contains("World"); // case-sensitive, culture-sensitive by default

bool b = s.StartsWith("Hello", StringComparison.Ordinal); // explicit
bool c = s.EndsWith("world", StringComparison.OrdinalIgnoreCase); // true
```

Spacing was normalized, but the identifiers, string values, method calls, comparison options, and comments were preserved.

### What each line does

```csharp
var s = "Hello World";
```

Creates the source string.

```csharp
bool a = s.Contains("World");
```

Checks whether the exact substring `"World"` occurs anywhere inside `s`.

Result:

```text
a == true
```

The match is case-sensitive. `"World"` is present with exactly that capitalization.

```csharp
bool b = s.StartsWith("Hello", StringComparison.Ordinal);
```

Checks whether `s` begins with `"Hello"` using an explicit ordinal comparison.

Result:

```text
b == true
```

```csharp
bool c = s.EndsWith("world", StringComparison.OrdinalIgnoreCase);
```

Checks whether `s` ends with `"world"` using ordinal comparison while ignoring case.

Result:

```text
c == true
```

The actual ending is `"World"`, but `OrdinalIgnoreCase` treats `"World"` and `"world"` as equal for this comparison.

## Technical correction to the screenshot comment

The screenshot comment says:

```text
case-sensitive, culture-sensitive by default
```

For this exact overload:

```csharp
s.Contains("World")
```

the accurate behavior is:

```text
case-sensitive and ordinal/culture-insensitive
```

The original comment is preserved above because this is a source-preserving transcript. The correction is kept separate so the study material does not teach the inaccurate part.

## Comparison choices used in the screenshot

### No explicit comparison argument

```csharp
s.Contains("World")
```

This uses the overload without `StringComparison`.

For machine-oriented comparisons, using an overload with an explicit `StringComparison` often communicates intent more clearly:

```csharp
s.Contains("World", StringComparison.Ordinal)
```

### `StringComparison.Ordinal`

```csharp
s.StartsWith("Hello", StringComparison.Ordinal)
```

Use ordinal comparison when strings should be compared by their code-unit values rather than linguistic culture rules. Typical examples include identifiers, protocol tokens, file-format markers, and other machine-readable text.

### `StringComparison.OrdinalIgnoreCase`

```csharp
s.EndsWith("world", StringComparison.OrdinalIgnoreCase)
```

Uses ordinal rules but ignores case.

## Core distinctions

```text
Contains
    substring may occur anywhere

StartsWith
    required text must be at the beginning

EndsWith
    required text must be at the end
```

All three methods return `bool`.

## Common mistakes

### Replacing explicit comparison with `ToLower()`

Avoid transforming both strings only to compare them:

```csharp
s.ToLower().EndsWith("world")
```

Prefer an overload that states the comparison rule directly:

```csharp
s.EndsWith("world", StringComparison.OrdinalIgnoreCase)
```

### Confusing substring search with equality

```csharp
s.Contains("Hello")
```

does not mean that the whole string equals `"Hello"`.

For whole-string equality, use:

```csharp
string.Equals(s, "Hello", StringComparison.Ordinal)
```

### Forgetting nullability

These are instance methods. Calling one when `s` is `null` throws `NullReferenceException`.

A guarded form can be written as:

```csharp
bool starts = s?.StartsWith("Hello", StringComparison.Ordinal) == true;
```

## Repetition summary

Given:

```csharp
var s = "Hello World";
```

the screenshot demonstrates:

```text
Contains("World")                                  -> true
StartsWith("Hello", Ordinal)                       -> true
EndsWith("world", OrdinalIgnoreCase)               -> true
```

The most important correction is that `Contains(string)` is case-sensitive and ordinal/culture-insensitive, not culture-sensitive.
