# utf8 string  literal — final coverage transcript v001

Source SVG: `utf8 string  literal.svg`  
Conspect folder: `utf8 string  literal`  
Stage: combined ten-conspect final coverage

## R01 — C# UTF-8 string literals

A normal C# string literal is a `string` containing UTF-16 code units:

```csharp
string text = "hello";
```

A literal with the `u8` suffix is compile-time UTF-8 data exposed as `ReadOnlySpan<byte>`:

```csharp
ReadOnlySpan<byte> bytes = "hello"u8;
```

This is useful when an API already works with bytes: `PipeReader`, `SequenceReader<byte>`, sockets, files, wire protocols and byte-oriented parsers. It avoids repeatedly calling `Encoding.UTF8.GetBytes(...)` for a constant token.

Example:

```csharp
private static ReadOnlySpan<byte> Ping => "PING"u8;

if (reader.IsNext(Ping, advancePast: true))
{
    // matched the UTF-8 bytes P I N G
}
```

Byte-oriented comparisons can remain byte-to-byte:

```csharp
reader.IsNext("POST "u8, advancePast: true);
reader.IsNext("GET "u8, advancePast: true);
```

### Storage limitation

`ReadOnlySpan<byte>` is a ref-struct type and cannot be stored as a normal instance field in a class:

```csharp
private ReadOnlySpan<byte> _prefix = "PING"u8; // not allowed
```

Use a static span-returning property for constant data:

```csharp
private static ReadOnlySpan<byte> Prefix => "PING"u8;
```

Or create owned storage when the bytes must live in a normal field:

```csharp
private static readonly byte[] Prefix = "PING"u8.ToArray();
```

The array form allocates once and is storable. The span property avoids an owned array and is appropriate for short static literals.

Additional points:

```text
- the value is bytes, not a string;
- Length is a byte count;
- no implicit terminating zero byte is appended;
- use string/char APIs when the task is text manipulation rather than protocol parsing;
- convert to owned memory when the bytes must outlive a span-safe scope.
```

## Coverage

```text
R01 processed image uses: 4
R01 processed text labels: 0
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
