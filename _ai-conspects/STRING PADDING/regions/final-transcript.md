# Final semantic transcript — C# string padding

Authoritative source: `source/STRING PADDING.svg`

## `PadLeft`

```csharp
string value = "42";

string result =
    value.PadLeft(
        5,
        '0'
    );
// "00042"
```

Default padding character is a space:

```csharp
value.PadLeft(5);
```

## `PadRight`

```csharp
string result =
    value.PadRight(
        5,
        '.'
    );
// "42..."
```

If the requested total width is less than or equal to the original length, the original value is returned.

## Formatting alternatives

Numeric formatting is often clearer for numbers:

```csharp
string result =
    number.ToString("D5");
```

Composite/interpolated alignment:

```csharp
string row =
    $"{name,-20}{count,8}";
```

Padding counts UTF-16 code units, not terminal display columns. Emoji, combining marks and East Asian wide characters may not align visually in a console.

Use padding for simple fixed-width text, not for complex table layout or localization.


# Coverage

```text
unique embedded screenshots: 1
image uses: 1
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 1
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
