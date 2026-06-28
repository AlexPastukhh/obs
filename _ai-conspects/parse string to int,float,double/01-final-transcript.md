# Final semantic transcript — parsing strings to `int`, `float` and `double` in C#

Authoritative source: `source/parse string to int,float,double.svg`  
Coverage: **9 unique screenshots / 9 placements + 0 native SVG labels**

---

# R01 — `Parse`, `TryParse` and `Convert`

Use `TryParse` for user input and validation:

```csharp
if (
    int.TryParse(
        text,
        out int value
    )
)
{
    // use value
}
```

It reports success without throwing for ordinary invalid input.

Use `Parse` when invalid input is exceptional and should fail fast:

```csharp
int value =
    int.Parse(text);
```

Possible failures include:

```text
null input
invalid format
overflow
```

`Convert.ToInt32` has different null behavior:

```csharp
Convert.ToInt32(null);
// 0
```

Invalid non-null text still throws. Do not choose `Convert` merely to avoid validation.

---

# R02 — culture and numeric styles

External machine-readable data should usually specify culture:

```csharp
double.TryParse(
    text,
    NumberStyles.Float
        | NumberStyles.AllowThousands,
    CultureInfo.InvariantCulture,
    out double value
);
```

Culture controls decimal and group separators:

```text
"1.25"
"1,25"
```

can mean different things in different cultures.

Use the current culture for user-entered localized values. Use `InvariantCulture` for APIs, files and protocols that define a culture-independent format.

`float` stores less precision than `double`. `decimal` is often preferable for base-10 financial calculations.

`float` and `double` can represent special values such as `NaN` and infinities when the accepted styles and input support them.

---

# R03 — numeric prefixes and JavaScript-like behavior

C# `int.Parse("123abc")` does not behave like JavaScript `parseInt`; it rejects trailing non-numeric text.

To read a numeric prefix explicitly:

```csharp
string digits =
    new(
        text
            .TakeWhile(char.IsDigit)
            .ToArray()
    );

bool ok =
    int.TryParse(
        digits,
        out int value
    );
```

For signs, decimal points or exponents, use a deliberate parser or regex:

```csharp
Match match =
    Regex.Match(
        text,
        @"^[+-]?\d+"
    );
```

If the number may appear anywhere:

```csharp
Match match =
    Regex.Match(
        text,
        @"[+-]?\d+"
    );
```

The anchored and unanchored forms solve different problems. Validate overflow after extraction through the target type’s `TryParse`.

---

# R04 — outcome matrix

Mental model:

```text
Parse
    returns value
    throws on invalid/null/overflow

TryParse
    returns true/false
    writes parsed value or default on failure
    does not use exceptions for expected invalid input

Convert
    conversion-oriented API
    special null behavior
    still throws for many invalid inputs
```

Decision guide:

```text
user input or validation
    TryParse

trusted invariant-format data
    TryParse with InvariantCulture

known-valid internal literal
    Parse

need numeric prefix from mixed text
    extract prefix, then TryParse

performance-sensitive repeated parsing
    TryParse avoids exception cost
```

Always select the exact numeric type required by range and precision, not only by convenience.

---

# Coverage

```text
unique embedded screenshots: 9
image uses: 9
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 9
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
