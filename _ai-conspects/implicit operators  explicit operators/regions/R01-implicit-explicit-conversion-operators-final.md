# R01 — C# implicit and explicit conversion operators final coverage transcript v001

Conspect: `implicit operators  explicit operators`  
Source: `implicit operators  explicit operators.svg`  
Stage: **stage-1 verified final coverage**

## 0. Area overview / key ideas / reading quality

User-defined conversions can make value objects ergonomic, but implicit conversions should be reserved for safe, unsurprising, effectively lossless transformations.

Reading quality: verified. The whole sheet is a single coherent region; all 7 image uses and 8 SVG text labels were reviewed against preserved source evidence.

## 1. User-defined conversion operators

A type may declare conversions to or from another type:

```csharp
public readonly struct MyValue
{
    private readonly string _value;

    public MyValue(string value) =>
        _value = value ?? throw new ArgumentNullException(nameof(value));

    public static implicit operator MyValue(string value) => new(value);
    public static implicit operator string(MyValue value) => value._value;
}
```

This allows assignments such as:

```csharp
MyValue value = "abc";
string text = value;
```

The compiler finds the conversion operator and inserts the conversion.

## 2. When `implicit` is appropriate

Use `implicit` only when conversion is:

- safe;
- unsurprising;
- lossless or very close to lossless;
- not expected to fail for ordinary input.

A string-backed value object can be a reasonable case when construction accepts every non-null string and the reverse conversion exposes exactly the represented string. If construction validates a restrictive format or may throw often, implicit conversion hides important control flow.

## 3. Use `explicit` when conversion can fail or lose meaning

A validated type such as `PositiveInt` should normally require a cast:

```csharp
public sealed class PositiveInt
{
    public int Value { get; }

    public PositiveInt(int value)
    {
        if (value <= 0)
            throw new ArgumentOutOfRangeException(nameof(value));

        Value = value;
    }

    public static explicit operator PositiveInt(int value) => new(value);
    public static implicit operator int(PositiveInt value) => value.Value;
}
```

Usage makes the potentially failing direction visible:

```csharp
var p = (PositiveInt)5;
int value = p;
```

Do not also allow `PositiveInt p = 5` if invalid source values are possible and the conversion enforces business rules.

## 4. Interaction with operators and equality

A conversion can participate in overload resolution. If `MyValue` has an equality operator, a string operand may be converted to `MyValue` before `==` executes. This can be convenient but can also make ambiguous overload sets harder to understand.

Value objects should keep equality consistent across `Equals`, `GetHashCode`, and `==`/`!=`. The conversion operator does not replace correct equality implementation.

## 5. Where the operator may be declared

A user-defined conversion must be declared in either the source type or the target type. An unrelated third type cannot define a conversion between `A` and `B`. The operator must be `public static` and convert between different types; built-in language conversions cannot simply be redefined.

## 6. Coverage

```text
R01 processed image uses: 7
R01 processed text labels: 8
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
