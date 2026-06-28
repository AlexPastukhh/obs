# Final semantic transcript — .NET formatting and numeric format strings

Authoritative source: `source/formatting, numeric formatting, what can be formatted.svg`  
Coverage: **28 unique screenshots / 28 placements + 5 native SVG labels**

---

# R01 — `ToString`, standard numeric formats and precision

Formatting converts a value into text. For types that implement `IFormattable`, the common shape is:

```csharp
value.ToString(format, provider);
```

Calling parameterless `ToString()` uses the type's default representation. For numbers, this is generally similar to the general numeric format:

```csharp
double value = 1234.5678;

value.ToString();
value.ToString("G");
```

Useful standard numeric formats:

```text
G   general compact representation
F   fixed-point
N   number with group separators
C   currency
P   percent; multiplies by 100 and adds a percent symbol
E   exponential/scientific notation
D   decimal integer, integer types only
X   hexadecimal integer, integer types only
R   round-trip representation for supported numeric types
```

Examples:

```csharp
1234.5.ToString("F2");  // 1234.50
1234.5.ToString("N2");  // culture-dependent grouping
1234.5.ToString("C2");  // culture-dependent currency
0.1234.ToString("P1");  // 12.3 %
255.ToString("X4");     // 00FF
42.ToString("D5");      // 00042
```

The digits after the format letter are a precision specifier, but their meaning depends on the format. `F2` means two decimal places; `D5` means at least five digits; `X4` means at least four hexadecimal digits.

---

# R02 — culture, custom numeric formats and date/time values

Culture affects separators, symbols, month names and other text:

```csharp
using System.Globalization;

decimal money = 1234.5m;

money.ToString(
    "C2",
    CultureInfo.GetCultureInfo("en-US"));
```

Formatting intended for users should use an explicit or ambient UI culture. Machine-readable interchange should use a stable invariant representation appropriate to the protocol.

Custom numeric format tokens include:

```text
0   required digit
#   optional digit
.   decimal separator placeholder
,   group separator or scaling marker
%   percent
‰   per mille
```

Examples:

```csharp
1234.5.ToString("000000");   // 001234
1234.5.ToString("#,##0.00");
0.1234.ToString("0.0%");
```

Date/time-related values also support format strings:

```csharp
DateTime date =
    new(2026, 4, 7);

TimeSpan span =
    TimeSpan.FromMinutes(90);

date.ToString("yyyy-MM-dd");
span.ToString(@"hh\:mm\:ss");
```

Relevant types include `DateTime`, `DateTimeOffset`, `DateOnly`, `TimeOnly` and `TimeSpan`, each with its own supported format syntax.

---

# R03 — what can be formatted

Types commonly supporting standard or custom formatting include:

```text
integral and floating-point numbers
decimal and BigInteger
DateTime and DateTimeOffset
DateOnly, TimeOnly and TimeSpan
Guid
enums
user-defined types implementing IFormattable
```

`Guid` examples:

```csharp
Guid id = Guid.NewGuid();

id.ToString("N"); // 32 digits
id.ToString("D"); // hyphens
id.ToString("B"); // braces
id.ToString("P"); // parentheses
```

Enums can render names or numeric forms:

```csharp
DayOfWeek day =
    DayOfWeek.Thursday;

day.ToString();    // Thursday
day.ToString("D"); // numeric value
day.ToString("G"); // general
day.ToString("X"); // hex
```

Many other objects have meaningful parameterless `ToString()` overrides but no standard format-string language. Examples may include `Uri`, `Version`, exceptions and framework-specific types.

A custom type can define formatting by implementing `IFormattable` or a custom formatter/provider.

---

# R04 — round-trip formatting and floating-point precision

Round-trip formatting aims to produce text that parses back to the same numeric value. It is not a request for a number of decimal places and is not a display-oriented currency or binary format.

```csharp
double value = 0.1;

string text =
    value.ToString("R");

double restored =
    double.Parse(
        text,
        CultureInfo.InvariantCulture);
```

For modern .NET floating-point output, `G17` for `double` and `G9` for `float` are explicit high-precision general formats often used when exact parse-back behavior matters:

```csharp
double d = 1d / 3d;
float f = 1f / 3f;

d.ToString(
    "G17",
    CultureInfo.InvariantCulture);

f.ToString(
    "G9",
    CultureInfo.InvariantCulture);
```

`float`/`System.Single` is 32-bit and has roughly 7 decimal digits of precision. `double`/`System.Double` is 64-bit and has roughly 15–16 decimal digits of precision.

Use display formats for UI and round-trip/invariant formats for storage or interchange when the protocol requires exact numeric recovery.

Practical rules:

```text
[ ] choose the format by intent: UI, logs, IDs or interchange
[ ] specify culture when output must be predictable
[ ] remember that precision digits mean different things for different formats
[ ] use D/X only for integer types
[ ] use custom formats for exact display patterns
[ ] use R or sufficient G precision for parse-back scenarios
[ ] do not confuse round-trip with rounding to decimal places
```

---

# Coverage

```text
unique embedded screenshots: 28
image uses: 28
native SVG labels: 5
duplicate extra placements: 0

processed image uses: 28
processed text labels: 5
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
