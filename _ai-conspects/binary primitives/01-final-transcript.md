# Final transcript — binary primitives

## 0.1 Area overview / reading quality

This conspect documents `System.Buffers.Binary.BinaryPrimitives`, a static helper for reading and writing primitive numeric values from and to byte spans using explicit endianness. It is especially useful in binary protocols, file formats, sockets, packet parsing, and zero-copy/low-allocation code.

Reading quality is high. The exact method names and code examples are preserved in the extracted source images.

## 1. Why BinaryPrimitives exists

A sequence of bytes does not identify its own byte order. The same four bytes can represent different integer values depending on whether the format is big-endian or little-endian. .NET therefore exposes explicit methods so code does not silently depend on the current machine's endianness.

Typical method families include:

- `ReadInt16BigEndian`, `ReadInt32LittleEndian`, etc.;
- unsigned equivalents such as `ReadUInt32BigEndian`;
- floating-point methods for `Half`, `Single`, and `Double`;
- matching `Write...` methods;
- `TryRead...` and `TryWrite...` variants;
- `ReverseEndianness` helpers.

## 2. Reading primitives

Read methods accept a `ReadOnlySpan<byte>` and return a primitive value. The span must contain at least the number of bytes required by the target type. For example, reading a 32-bit integer requires four bytes.

Conceptually:

```csharp
ReadOnlySpan<byte> bytes = stackalloc byte[] { 0x00, 0x00, 0x00, 0x2A };
int value = BinaryPrimitives.ReadInt32BigEndian(bytes);
```

The result is `42`. Little-endian reads interpret the first byte as the least significant byte instead.

## 3. Writing primitives

Write methods accept a destination `Span<byte>` and a value. The destination must be large enough for the primitive. The method writes the value in the requested byte order.

Conceptually:

```csharp
Span<byte> bytes = stackalloc byte[4];
BinaryPrimitives.WriteInt32BigEndian(bytes, 300);
```

The big-endian representation places the most significant byte first. Little-endian methods place the least significant byte first.

## 4. ReverseEndianness

`ReverseEndianness` swaps byte order for supported numeric values. It is useful when converting between host representation and a protocol/file format representation or when a value has already been read in the opposite order.

## 5. TryRead and TryWrite methods

The `Try...` variants follow the standard .NET Try-pattern:

- return `true` on success;
- return `false` if the source or destination span is too small;
- avoid throwing for an expected size mismatch;
- expose the parsed value through an `out` parameter for reads.

They are helpful in parsers where a buffer may contain only part of a message. Instead of throwing, code can report “not enough bytes yet” and wait for more data.

## 6. Design guidance

Use explicit endian methods at protocol boundaries. Prefer spans to avoid unnecessary byte-array copies. Use throwing methods when insufficient length indicates a programming error; use Try methods when incomplete data is an expected runtime condition.