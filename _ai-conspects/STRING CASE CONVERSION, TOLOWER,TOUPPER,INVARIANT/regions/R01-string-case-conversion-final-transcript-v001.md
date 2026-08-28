# Final source-reconstructed transcript - C# string case conversion

Generated: 2026-07-07

Source: `source/STRING CASE CONVERSION, TOLOWER,TOUPPER,INVARIANT.svg`, source screenshots, and Stage0 source inventory.

## Coverage

```text
Source screenshots: 4 / 4 visually checked from complete canvas preview
Status before this file: regional transcripts not started
```

## Core API examples

The sheet compares culture-sensitive case conversion with invariant case conversion.

```csharp
var s = "HeLLo";

var lower = s.ToLower();              // culture-sensitive
var upper = s.ToUpper();

var lowerInv = s.ToLowerInvariant();  // consistent across cultures (often preferred)
var upperInv = s.ToUpperInvariant();
```

## `s.ToLower()` vs `s.ToLowerInvariant()`

### `s.ToLower()`

`ToLower()` converts to lowercase using the current culture:

```csharp
CultureInfo.CurrentCulture
```

Consequences:

- output can differ depending on culture;
- Turkish casing rules can change the result compared to English;
- use it when transforming user-facing text according to the user's locale rules.

### `s.ToLowerInvariant()`

`ToLowerInvariant()` converts to lowercase using invariant culture:

```csharp
InvariantCulture
```

Consequences:

- output is consistent across machines regardless of current culture;
- useful for stable normalization across environments;
- appropriate for logging keys, technical normalization, protocol-ish strings and similar non-user-facing values.

The same idea applies to `ToUpper()` versus `ToUpperInvariant()`.

## Do not lowercase only to compare strings

If the goal is case-insensitive comparison, do not do this:

```csharp
if (a.ToLower() == b.ToLower()) { ... }
```

Prefer an explicit `StringComparison`:

```csharp
if (string.Equals(a, b, StringComparison.OrdinalIgnoreCase)) { ... }
```

Why this is preferred:

- avoids allocations because no new lowercase strings are created;
- avoids culture pitfalls;
- is faster and clearer about intent.

## Practical rule

```text
User-facing display casing: ToLower()/ToUpper() can be appropriate because they use current culture.
Stable technical normalization: prefer ToLowerInvariant()/ToUpperInvariant().
Case-insensitive comparison: prefer string.Equals(..., StringComparison.OrdinalIgnoreCase) or another explicit StringComparison overload.
```
