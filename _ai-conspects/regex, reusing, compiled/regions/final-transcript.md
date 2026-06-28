# Final semantic transcript — reusing and compiling .NET regular expressions

Authoritative source: `source/regex, reusing, compiled.svg`  
Coverage: **11 unique screenshots / 11 placements + 9 native SVG labels**

---

# R01 — reuse the regex object

Constructing a `Regex` repeatedly with the same pattern repeats parsing and internal setup work.

Avoid:

```csharp
foreach (string input in inputs)
{
    var result =
        new Regex(pattern)
            .IsMatch(input);
}
```

Reuse:

```csharp
private static readonly Regex DateRegex =
    new(
        @"^\d{4}-\d{2}-\d{2}$",
        RegexOptions.CultureInvariant,
        TimeSpan.FromMilliseconds(200)
    );
```

Then:

```csharp
bool valid =
    DateRegex.IsMatch(input);
```

Good storage locations:

```text
static readonly field
cached service instance
singleton for an immutable pattern/options combination
```

Regex instances are safe for ordinary concurrent matching operations.

---

# R02 — `RegexOptions.Compiled`

`RegexOptions.Compiled` asks .NET to compile matching logic rather than use only the interpreted engine path.

Trade-off:

```text
startup/construction cost
    higher

memory
    usually higher

repeated execution
    can be faster

one-off use
    often not worth compilation cost
```

Use it for hot, repeated matching in a long-running process after measuring realistic input. Reusing the instance is important whether or not `Compiled` is selected.

For short-lived tools or rarely used patterns, the interpreted form can be simpler and cheaper overall.

---

# R03 — case rules and timeouts

Case-insensitive matching can depend on the current culture:

```csharp
RegexOptions.IgnoreCase
```

For technical identifiers, protocols, file extensions, URLs or machine-readable data, combine with:

```csharp
RegexOptions.CultureInvariant
```

For user-visible natural language, culture-aware behavior may be the intended choice.

## Timeout

Complex patterns can exhibit catastrophic backtracking, especially with nested quantifiers and ambiguous alternatives.

```csharp
var regex = new Regex(
    pattern,
    RegexOptions.Compiled
        | RegexOptions.IgnoreCase
        | RegexOptions.CultureInvariant,
    TimeSpan.FromMilliseconds(200)
);
```

A timeout aborts expensive matching and throws `RegexMatchTimeoutException`. Handle it as a distinct validation or processing failure.

Use timeouts whenever input or patterns are not fully trusted.

---

# R04 — safe reusable template

```csharp
private static readonly Regex SafeRegex =
    new(
        Pattern,
        RegexOptions.Compiled
            | RegexOptions.IgnoreCase
            | RegexOptions.CultureInvariant,
        TimeSpan.FromMilliseconds(200)
    );
```

Checklist:

```text
[ ] reuse the same Regex object
[ ] do not construct inside hot loops
[ ] use Compiled only when repeated execution justifies it
[ ] select culture behavior deliberately
[ ] set a timeout for complex or untrusted matching
[ ] benchmark with realistic patterns and inputs
[ ] keep pattern, options and timeout together as one reusable unit
```

Compilation does not fix a pathological pattern. Pattern design and timeout protection still matter.

---

# Coverage

```text
unique embedded screenshots: 11
image uses: 11
native SVG labels: 9
duplicate extra placements: 0

processed image uses: 11
processed text labels: 9
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
