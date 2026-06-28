# Final semantic transcript — C# Regex options and conditional replacement

Authoritative source: `source/sharp regex options  + COND REPLACE.svg`

---

# R01 — matching and replacement fundamentals

## Case-insensitive matching

```csharp
bool isMatch = Regex.IsMatch(
    input,
    pattern,
    RegexOptions.IgnoreCase
);
```

Inline option:

```csharp
bool isMatch = Regex.IsMatch(
    input,
    "(?i)hello"
);
```

Use method/constructor options when the behavior applies to the whole expression. Use scoped inline options when only part of the pattern needs the behavior.

## Basic replacement

```csharp
string result = Regex.Replace(
    input,
    "foo",
    "bar"
);
```

With options:

```csharp
string result = Regex.Replace(
    input,
    "foo",
    "bar",
    RegexOptions.IgnoreCase
);
```

## Capture groups

```csharp
string result = Regex.Replace(
    input,
    @"Name:\s*(\w+)",
    "Name: $1 (replaced)"
);
```

Named group:

```regex
(?<name>\w+)
```

Replacement:

```text
${name}
```

In replacement strings, `$` has special group-substitution meaning. Use `$$` for a literal dollar sign or use a `MatchEvaluator`.

## Dynamic replacement

```csharp
string result = Regex.Replace(
    input,
    @"\d+",
    match =>
    {
        int value =
            int.Parse(match.Value);

        return (value * 10)
            .ToString();
    }
);
```

A `MatchEvaluator` is appropriate when replacement depends on the matched text, capture groups, external state or application rules.

---

# R02 — conditional and N-th occurrence replacement

## Conditional replacement

```csharp
string result = Regex.Replace(
    input,
    $@"\b{Regex.Escape(word)}\b",
    match =>
    {
        if (match.Value.Length > 3)
        {
            return "REPLACEMENT";
        }

        return match.Value;
    }
);
```

Returning `match.Value` keeps the original occurrence.

## Replace only the N-th occurrence

```csharp
int count = 0;

string result = Regex.Replace(
    input,
    pattern,
    match =>
    {
        count++;

        return count == target
            ? "REPLACED"
            : match.Value;
    }
);
```

This counter is global for the whole input.

For capture-aware logic:

```csharp
string result = Regex.Replace(
    input,
    @"(\d+)([a-zA-Z]+)",
    match =>
    {
        int number =
            int.Parse(
                match.Groups[1].Value
            );

        string text =
            match.Groups[2].Value;

        return number > 10
            ? $"{number}_{text}"
            : match.Value;
    }
);
```

Avoid sharing mutable counters between concurrent operations unless the state is local to one replacement call.

---

# R03 — performance, culture and safety

## Reuse regex instances

```csharp
private static readonly Regex SafeRegex =
    new(
        pattern,
        RegexOptions.Compiled
        | RegexOptions.IgnoreCase
        | RegexOptions.CultureInvariant,
        TimeSpan.FromMilliseconds(200)
    );
```

## `RegexOptions.Compiled`

Compiled regexes trade startup/memory for repeated execution speed.

Use when:

```text
the same regex is used frequently
the application is long-running
measurements show a benefit
```

Avoid automatically compiling expressions used once or only a few times.

Source-generated regexes are another strong option in modern .NET for known compile-time patterns.

## Culture

`IgnoreCase` can follow culture-specific casing rules. For protocol identifiers, file extensions, URLs or machine-readable tokens, `CultureInvariant` often gives more stable behavior.

For user-facing language-sensitive text, culture-aware matching may be intentional.

## Timeouts

Some patterns can cause catastrophic backtracking, especially with nested quantifiers and ambiguous alternation.

```csharp
var regex = new Regex(
    pattern,
    RegexOptions.None,
    TimeSpan.FromMilliseconds(200)
);
```

```csharp
try
{
    bool match =
        regex.IsMatch(input);
}
catch (RegexMatchTimeoutException)
{
    // fail safely
}
```

Use timeouts especially when:

```text
input is user-controlled
patterns are complex
the service is internet-facing
the match runs on latency-sensitive paths
```

A timeout limits damage but does not make a poor pattern efficient. Prefer non-backtracking-compatible designs or simpler deterministic patterns where possible.

---

# R04 — per-line N-th replacement

## Split, replace, join

For “replace the N-th match on each line,” the clearest approach is often:

```csharp
string result = string.Join(
    Environment.NewLine,
    input
        .Split(Environment.NewLine)
        .Select(line =>
        {
            int count = 0;

            return Regex.Replace(
                line,
                pattern,
                match =>
                {
                    count++;

                    return count == target
                        ? "BAR"
                        : match.Value;
                }
            );
        })
);
```

Benefits:

```text
counter naturally resets for every line
easy to read and test
no multiline state machine
```

Be deliberate about newline preservation when mixed `\r\n` and `\n` input is possible.

## Single-pass stateful evaluator

A single `Regex.Replace` can track the current line and occurrence count, but the evaluator becomes more complex:

```text
track line boundaries
reset match count on line changes
handle empty lines
handle CRLF correctly
```

Use this only when avoiding line splitting is important and the implementation is thoroughly tested.

## Checklist

```text
[ ] escape dynamic literal text with Regex.Escape
[ ] use MatchEvaluator for conditional logic
[ ] keep per-call mutable state local
[ ] reuse hot regex instances
[ ] measure before choosing Compiled
[ ] use CultureInvariant for machine identifiers
[ ] set a timeout for untrusted or complex matches
[ ] prefer split-per-line logic when it is clearer
```

# Coverage

```text
unique embedded screenshots: 23
image uses: 23
native SVG labels: 18
duplicate extra placements: 0

processed image uses: 23
processed text labels: 18
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
