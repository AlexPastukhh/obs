# .NET format strings, culture, and round-trip output

Knowledge ID: `dotnet.format-strings-culture-and-round-trip`

Topic: `dotnet`

Formatting converts values to text through the type-specific `ToString(format, provider)` contract. Parameterless numeric `ToString()` is generally similar to the general representation. Standard numeric formats include `G` general, `F` fixed, `N` grouped number, `C` currency, `P` percent (multiplies by 100), `E` exponential, integer-only `D`/`X`, and supported round-trip `R`. Precision is format-specific: `F2` means two decimals, `D5` at least five decimal digits, and `X4` at least four hexadecimal digits.

```csharp
1234.5.ToString("F2"); // 1234.50
0.1234.ToString("P1"); // 12.3 % (culture-dependent)
255.ToString("X4");    // 00FF
42.ToString("D5");     // 00042
```

Culture controls separators, symbols, and names. Use UI culture for user-facing output and an explicit invariant representation for protocols/interchange. Custom tokens include required `0`, optional `#`, `.` as a decimal placeholder, `,` as a group separator or scaling marker, percent, and per-mille. Formattable types include integral/floating numbers, `decimal`, `BigInteger`, `DateTime`, `DateTimeOffset`, `DateOnly`, `TimeOnly`, and `TimeSpan`; date/time types have their own syntax (`yyyy-MM-dd`, `TimeSpan` `@"hh\:mm\:ss"`). `Guid` supports `N/D/B/P`; enums support name/general, decimal, and hex forms. Custom types can implement `IFormattable` or a formatter/provider.

Some types—including `Uri`, `Version`, exceptions, and framework-specific objects—have a meaningful parameterless `ToString()` but no standard format-string language. A useful `ToString()` override does not imply support for arbitrary format specifiers.

Round-trip formatting aims to parse back to the same value; it is not decimal-place rounding or display formatting. `R`, or explicit sufficient general precision such as `G17` for `double` and `G9` for `float`, serves exact recovery scenarios. `float` has roughly 7 decimal digits of precision and `double` roughly 15–16.

## Composite formatting and interpolation

`string.Format` uses zero-based numbered placeholders that select arguments after the format string:

```csharp
string.Format("{0} is {1} years old", "Alice", 30);
// "Alice is 30 years old"
```

```text
{0} -> "Alice"
{1} -> 30
```

Its replacement arguments are supplied through `params object[]`. An array passed in that position can therefore supply multiple placeholder values:

```csharp
string[] name = ["Peter", "Jacob"];
string[] pattern = [
    "Nobody likes this",
    "{0} likes this",
    "{0} and {1} like this"
];

string result = string.Format(pattern[name.Length], name);
// "Peter and Jacob like this"
```

In a pattern table, one index can choose the format string while the array supplies `{0}`, `{1}`, and later values.

Interpolation and composite formatting can produce the same output shape:

```csharp
var name = "Alex";
var age = 25;

var interpolated = $"Name={name}, Age={age}";
var composite = string.Format("Name={0}, Age={1}", name, age);
```

Use interpolation when values are directly available and readability is central. `string.Format` is useful when the pattern is data-driven, selected dynamically, localized, or stored separately from its values.

## Sources
- Workspace: `_ai-conspects/formatting, numeric formatting, what can be formatted/`
- Processed source: `01-final-transcript.md`, complete transcript
- Workspace: `_ai-conspects/STRING FORMAT,INTERPOLATION/`
- Authoritative reconstructed source: `regions/R01-string-format-interpolation-final-transcript-v001.md`, complete transcript
- Original SVG: `source/STRING FORMAT,INTERPOLATION.svg`
