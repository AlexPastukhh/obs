# Final semantic transcript — StringComparer and case-insensitive string comparison

Authoritative source: `source/STRINGCOMPARER,compare strings case insens.svg`

---

# R01 — `string.Compare`

```csharp
int result = string.Compare(
    left,
    right,
    StringComparison.OrdinalIgnoreCase
);
```

Return meaning:

```text
result < 0
    left sorts before right

result == 0
    equal under the selected comparison

result > 0
    left sorts after right
```

Use `string.Compare` when ordering matters:

```text
custom sorting
comparison functions
ordered data structures
culture-aware ordering
```

If only equality is needed, prefer:

```csharp
bool equal = string.Equals(
    left,
    right,
    StringComparison.OrdinalIgnoreCase
);
```

This communicates intent more clearly than comparing the result to zero.

---

# R02 — ordinal and invariant comparison

## `Ordinal`

```csharp
StringComparison.Ordinal
StringComparison.OrdinalIgnoreCase
```

Ordinal comparison uses deterministic code-unit-oriented rules rather than linguistic collation.

Use for technical identifiers:

```text
protocol tokens
HTTP header names when an API specifies case-insensitivity
file extensions treated as identifiers
database keys
route/query parameter names
claim types
configuration keys
machine-generated values
```

Example:

```csharp
bool equal = string.Equals(
    "FILE.TXT",
    "file.txt",
    StringComparison.OrdinalIgnoreCase
);
```

Benefits:

```text
fast
stable across cultures
predictable for machine identifiers
avoids locale-specific casing surprises
```

## `InvariantCulture`

```csharp
StringComparison.InvariantCulture
StringComparison.InvariantCultureIgnoreCase
```

Invariant culture performs linguistic comparison using a stable culture-independent rule set.

Use when text is human-language-like but comparison behavior must stay consistent across machines/users.

Examples can include:

```text
globally consistent display-name sorting
stable linguistic ordering for an application-wide catalog
culture-aware behavior that must not depend on current UI culture
```

Do not choose invariant culture merely because a string is “important.” For technical identifiers, ordinal comparison is usually the correct choice.

Invariant comparison is more language-aware than ordinal, but it is not equivalent to every user's locale.

---

# R03 — current culture and comparer selection

## `CurrentCulture`

```csharp
StringComparison.CurrentCulture
StringComparison.CurrentCultureIgnoreCase
```

This uses the current thread/culture settings.

Use for user-facing text when behavior should match the user's locale:

```text
localized UI sorting
searching human-readable names
culture-specific alphabetical order
```

Results can vary across cultures or execution environments.

## Comparer objects

Collections accept `StringComparer`:

```csharp
var dictionary =
  new Dictionary<string, int>(
    StringComparer.OrdinalIgnoreCase
  );
```

```csharp
var set =
  new HashSet<string>(
    StringComparer.OrdinalIgnoreCase
  );
```

```csharp
names.Sort(
  StringComparer.CurrentCultureIgnoreCase
);
```

This centralizes equality and hashing rules. For dictionaries/sets, the comparer must define both equality and compatible hash codes.

## Rule of thumb

```text
technical identifiers
    Ordinal / OrdinalIgnoreCase

user-facing localized text
    CurrentCulture / CurrentCultureIgnoreCase

stable linguistic behavior across machines
    InvariantCulture / InvariantCultureIgnoreCase
```

Avoid:

```csharp
a.ToLower() == b.ToLower()
```

Prefer comparison APIs:

```csharp
string.Equals(
    a,
    b,
    StringComparison.OrdinalIgnoreCase
);
```

Benefits:

```text
no temporary lowercased strings
clear comparison semantics
fewer culture pitfalls
works with collection comparers
```

## Checklist

```text
[ ] use Equals for equality and Compare for ordering
[ ] use OrdinalIgnoreCase for most machine identifiers
[ ] use CurrentCulture for user-facing linguistic text
[ ] use InvariantCulture only for stable linguistic rules
[ ] pass StringComparer to dictionaries and sets
[ ] avoid normalization through ToLower solely for comparison
```

# Coverage

```text
unique embedded screenshots: 13
image uses: 13
native SVG labels: 2
duplicate extra placements: 0

processed image uses: 13
processed text labels: 2
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
