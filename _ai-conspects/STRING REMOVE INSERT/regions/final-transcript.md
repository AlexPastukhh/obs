# Final semantic transcript — C# `String.Remove` and `String.Insert`

Authoritative source: `source/STRING REMOVE INSERT.svg`

Strings are immutable; both methods return a new string.

## Remove

Remove from an index to the end:

```csharp
string value =
    "HelloWorld";

string result =
    value.Remove(5);
// "Hello"
```

Remove a range:

```csharp
string result =
    value.Remove(
        startIndex: 5,
        count: 5
    );
```

Indexes are zero-based and counts must fit inside the string.

## Insert

```csharp
string result =
    "Hello".Insert(
        5,
        " World"
    );
```

Insert does not overwrite existing characters; it shifts them to the right.

## Range-based alternatives

```csharp
string result =
    value[..5];
```

Remove an inner segment:

```csharp
string result =
    value[..start]
    + value[(start + count)..];
```

For many edits, repeated concatenation allocates repeatedly. Use `StringBuilder` or a parser when building/changing a large string incrementally.

## Validation

```csharp
if (
    start < 0
    || count < 0
    || start + count
       > value.Length
)
{
    throw new
        ArgumentOutOfRangeException();
}
```

Prefer domain-level validation and clear contracts when indexes come from input.


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
