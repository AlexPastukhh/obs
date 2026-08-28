# Final source-reconstructed transcript - C# string format and interpolation

Generated: 2026-07-07

Source: `source/STRING FORMAT,INTERPOLATION.svg`, three source screenshots under `source/images/`, and Stage0 source inventory.

## Coverage

```text
SVG text labels: 1 / 1 transcribed (`FORMAT`)
Source screenshots: 3 / 3 visually checked
Status before this file: regional transcripts not started
```

## Topic

```text
FORMAT
```

The conspect compares `string.Format(...)` placeholder replacement with C# string interpolation.

## `string.Format` placeholders

`string.Format` uses numbered placeholders:

```text
{0}, {1}, {2}, ...
```

The placeholders are zero-based indexes into the replacement arguments passed after the format string.

Example from the source:

```csharp
string.Format("{0} is {1} years old", "Alice", 30);
// "Alice is 30 years old"
```

Meaning:

```text
{0} -> "Alice"
{1} -> 30
```

## Passing an array to the `params object[]` argument

The kata example uses an array of names and a pattern selected by length:

```csharp
// When name = ["Peter", "Jacob"]
string.Format(pattern[2], name); // pattern[2] = "{0} and {1} like this"
// Becomes: "Peter and Jacob like this"
```

This works because `string.Format(pattern[name.Length], name)` receives `name` as the `params object[]` argument. C# treats the array as multiple arguments for the placeholders, so the array elements are used to fill `{0}`, `{1}`, etc.

Practical rule:

```text
pattern[index] chooses the format string
params object[] supplies the values for numbered placeholders
```

## Interpolation versus `string.Format`

The source also compares interpolation and `string.Format`:

```csharp
var name = "Alex";
var age = 25;

var s1 = $"Name={name}, Age={age}";
var s2 = string.Format("Name={0}, Age={1}", name, age);
```

Both strings represent the same formatted output shape:

```text
Name=Alex, Age=25
```

Use interpolation when the values are directly available in code and readability matters. Use `string.Format` when the format pattern is data-driven, selected dynamically, localized, or stored separately from the values.
