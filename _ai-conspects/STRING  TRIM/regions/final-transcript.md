# Final semantic transcript — C# string trimming

Authoritative source: `source/STRING  TRIM.svg`

## Whitespace trimming

```csharp
string value = "  hello  ";

string trimmed = value.Trim();
string left = value.TrimStart();
string right = value.TrimEnd();
```

`Trim()` removes leading and trailing whitespace recognized by the runtime. It does not change whitespace inside the string.

Strings are immutable, so every method returns a new string value when a change is required:

```csharp
value.Trim();
Console.WriteLine(value); // original value

value = value.Trim();
```

## Trimming selected characters

Modern .NET supports convenient character overloads:

```csharp
string value = "---hello---";

string result =
    value.Trim('-');
```

Several characters:

```csharp
char[] trimChars =
    { '-', '_', ' ' };

string result =
    value.Trim(trimChars);
```

The argument is a set of removable boundary characters, not a substring. Trimming continues while the next boundary character belongs to that set.

```text
Trim("ab") conceptually means:
remove any leading/trailing 'a' or 'b'
not:
remove the exact substring "ab"
```

## Single-character versus sequence removal

For a known prefix/suffix sequence, use explicit checks:

```csharp
if (value.StartsWith(
        prefix,
        StringComparison.Ordinal))
{
    value =
        value[prefix.Length..];
}
```

```csharp
if (value.EndsWith(
        suffix,
        StringComparison.Ordinal))
{
    value =
        value[..^suffix.Length];
}
```

## Null and normalization

`Trim` is an instance method:

```csharp
string? input = GetValue();

string? result =
    input?.Trim();
```

Use an explicit fallback when required:

```csharp
string result =
    input?.Trim()
    ?? string.Empty;
```

Do not trim automatically when surrounding whitespace is meaningful, such as passwords, fixed-width data or signed payloads.

## Checklist

```text
[ ] assign the returned value
[ ] distinguish whitespace trimming from character-set trimming
[ ] use StartsWith/EndsWith for exact sequences
[ ] choose StringComparison explicitly for technical strings
[ ] preserve whitespace when it is part of the contract
```


# Coverage

```text
unique embedded screenshots: 2
image uses: 2
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 2
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
