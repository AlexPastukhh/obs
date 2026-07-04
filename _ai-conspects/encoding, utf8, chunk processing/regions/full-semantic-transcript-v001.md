# Encoding.UTF8, Decoder, Encoder, and chunk processing

## Purpose

This is the complete semantic transcript for the conspect. It preserves the full API model, chunk-boundary
rules, buffer-management behavior, fallback behavior, and examples without copying screenshot text
character by character.

## Source coverage

```text
Source SVG SHA-256: 64be648e24f24d7af5cda1b560cc1b64c28ad47d1c55e431bfac33f1fcc95253
Repository source Git blob: 5763263be84e2e28658314edf49351c6b07ec35e
Image uses covered: 55 / 55
Unique embedded images: 54
SVG text nodes reviewed: 48 / 48
```

Coverage map:

```text
S-001..S-010   basic Encoding.UTF8 APIs and common encodings
S-011..S-014   stateful decoding and a stream-decoding pattern
S-015..S-022   arrays, indexes, spans, Memory, allocation choices
S-023..S-040   WebSocket fragments; GetChars versus Convert; Decoder methods
S-041..S-049   buffer overflow, fallback, final flush, truncated input
S-050..S-055   exact versus maximum sizing; chunked Encoder behavior
```

## 1. The everyday Encoding API

Text encoding converts between .NET characters and bytes. The main type is `System.Text.Encoding`.
UTF-8 is the normal default for modern APIs, JSON, files, HTTP, and web data.

The common complete-value operations are:

```csharp
byte[] bytes = Encoding.UTF8.GetBytes(text);
string text = Encoding.UTF8.GetString(bytes);
```

`GetBytes` encodes characters into UTF-8 bytes. `GetString` decodes a complete byte sequence into a new
string.

UTF-8 uses multiple bytes for many non-ASCII characters. A correct round trip preserves the original text:

```csharp
string input = "hello";
byte[] bytes = Encoding.UTF8.GetBytes(input);
string output = Encoding.UTF8.GetString(bytes);
```

Other encodings exist, including ASCII, UTF-16 (`Encoding.Unicode`), big-endian UTF-16, and UTF-32. They
have different byte layouts and compatibility properties. UTF-8 should be selected deliberately rather than
assuming that arbitrary bytes represent text.

## 2. Three families of conversion APIs

The conspect groups encoding and decoding APIs into three practical styles.

### A. Allocate a new result

```csharp
byte[] bytes = Encoding.UTF8.GetBytes(text);
string text = Encoding.UTF8.GetString(bytes);
string part = Encoding.UTF8.GetString(bytes, index, count);
```

This is the simplest option when allocation is acceptable and the complete value is available.

### B. Write into an existing array with indexes

Encoding:

```csharp
int bytesWritten = Encoding.UTF8.GetBytes(
    sourceChars,
    charIndex,
    charCount,
    destinationBytes,
    destinationByteIndex);
```

Decoding:

```csharp
int charsWritten = Encoding.UTF8.GetChars(
    sourceBytes,
    byteIndex,
    byteCount,
    destinationChars,
    destinationCharIndex);
```

The caller owns and sizes the destination buffer.

### C. Write into spans

Modern overloads accept `ReadOnlySpan<T>` and `Span<T>`:

```csharp
ReadOnlySpan<char> source = text.AsSpan();
Span<byte> destination = buffer.AsSpan();

int bytesWritten = Encoding.UTF8.GetBytes(source, destination);
```

Decoding works similarly:

```csharp
ReadOnlySpan<byte> source = bytes;
Span<char> destination = chars;

int charsWritten = Encoding.UTF8.GetChars(source, destination);
```

A `Memory<T>` value exposes a span through `.Span`:

```csharp
Memory<byte> memory = new byte[256];
int written = Encoding.UTF8.GetBytes(text.AsSpan(), memory.Span);
```

`GetString` always creates a string. To decode into an existing character buffer, use `GetChars`.

## 3. Sizing destination buffers

Several APIs answer different sizing questions.

`Encoding.UTF8.GetByteCount(text)` returns the exact number of UTF-8 bytes for the supplied complete text.
It is useful before requesting space from a writer:

```csharp
int byteCount = Encoding.UTF8.GetByteCount(text);
Span<byte> destination = writer.GetSpan(byteCount);
int written = Encoding.UTF8.GetBytes(text.AsSpan(), destination);
writer.Advance(written);
```

`Encoding.UTF8.GetCharCount(bytes)` returns the number of characters produced by the supplied bytes for a
stateless complete conversion.

`Encoding.UTF8.GetMaxCharCount(byteCount)` returns a safe upper bound. It is convenient for reusable
buffers and one-pass processing but may over-allocate.

A stateful `Decoder.GetCharCount` considers the exact bytes plus any partial sequence buffered from previous
calls. This can produce a different answer from a stateless maximum calculation.

`TryGetBytes` supports a "did the destination fit?" pattern:

```csharp
if (Encoding.UTF8.TryGetBytes(text.AsSpan(), destination, out int written))
{
    writer.Advance(written);
}
else
{
    // request more space or calculate the exact count first
}
```

## 4. Why independent GetString calls are unsafe for chunks

A UTF-8 character can occupy multiple bytes. A stream, socket, HTTP body, or WebSocket message can split
those bytes between reads.

Suppose a three-byte character is divided so that two bytes arrive in one chunk and the third arrives in the
next. Calling this independently for every chunk is unsafe:

```csharp
Encoding.UTF8.GetString(chunk);
```

Each call behaves as if the chunk were an independent complete byte sequence. The first call can emit a
replacement character, throw under strict fallback, or lose the relationship with the next byte.

A stateful `Decoder` preserves partial multibyte sequences between calls:

```csharp
Decoder decoder = Encoding.UTF8.GetDecoder();
```

Use one decoder for one logical byte stream or message sequence. Do not create a new decoder for every
fragment.

## 5. Decoder.GetChars versus Decoder.Convert

Both methods decode bytes into characters while preserving decoder state.

### GetChars

`GetChars` is the simpler operation:

```csharp
int charsWritten = decoder.GetChars(
    bytes,
    byteIndex,
    byteCount,
    chars,
    charIndex,
    flush);
```

It is appropriate when the destination is known to be large enough. It mainly reports how many characters
were written. If the destination is too small, it can throw an `ArgumentException`.

### Convert

`Convert` is designed for bounded buffers and incremental progress:

```csharp
decoder.Convert(
    bytes,
    byteIndex,
    byteCount,
    chars,
    charIndex,
    charCount,
    flush,
    out int bytesUsed,
    out int charsUsed,
    out bool completed);
```

It reports:

- `bytesUsed`: how many input bytes were consumed;
- `charsUsed`: how many output characters were produced;
- `completed`: whether the supplied input range was fully processed for this call.

`completed` does not mean the network stream or logical message is finished. It means that the input slice
passed to this call has no unprocessed bytes remaining.

Typical bounded-buffer loop:

```csharp
int byteIndex = 0;

while (byteIndex < bytesRead)
{
    decoder.Convert(
        byteBuffer,
        byteIndex,
        bytesRead - byteIndex,
        charBuffer,
        0,
        charBuffer.Length,
        flush: false,
        out int bytesUsed,
        out int charsUsed,
        out bool completed);

    builder.Append(charBuffer, 0, charsUsed);
    byteIndex += bytesUsed;

    if (completed)
        break;
}
```

Advancing by `bytesUsed` is essential. Assuming all input was consumed can skip data or create an infinite
loop when the output buffer fills.

## 6. Important Decoder methods

A stateful decoder exposes four important operations:

- `GetCharCount`: calculate how many characters exact input would produce, considering saved state;
- `GetChars`: decode into a caller-provided character buffer;
- `Convert`: decode as much as fits and report both input and output progress;
- `Reset`: clear saved partial-sequence and fallback state.

`Reset` is appropriate when the current logical stream is abandoned or a completely independent stream is
started. It should not be called between fragments of one UTF-8 message, because that would discard the
boundary state that the decoder exists to preserve.

## 7. The meaning of flush

`flush` tells the decoder whether more bytes can still arrive for the current logical input.

Use `flush: false` for intermediate chunks. An incomplete UTF-8 sequence is retained internally until a later
call supplies the remaining bytes.

Use `flush: true` only at the real end of the logical stream or message. The decoder must then resolve any
remaining incomplete sequence according to its fallback policy.

For a WebSocket text message:

- intermediate fragments use `flush: false`;
- the fragment with `EndOfMessage == true` uses `flush: true`;
- a separate new message should start with clean decoder state.

For a `Stream`, use `flush: false` for every positive read and perform a final empty conversion with
`flush: true` when end-of-stream is reached if the last read was not already treated as final.

## 8. A robust stream-decoding shape

A reusable byte buffer and character buffer can decode incrementally:

```csharp
static async Task ReadUtf8TextAsync(
    Stream stream,
    Func<ReadOnlyMemory<char>, ValueTask> onText,
    CancellationToken cancellationToken = default)
{
    byte[] byteBuffer = new byte[1024];
    char[] charBuffer =
        new char[Encoding.UTF8.GetMaxCharCount(byteBuffer.Length)];

    Decoder decoder = Encoding.UTF8.GetDecoder();

    while (true)
    {
        int bytesRead = await stream.ReadAsync(
            byteBuffer.AsMemory(),
            cancellationToken);

        if (bytesRead == 0)
            break;

        int byteIndex = 0;

        while (byteIndex < bytesRead)
        {
            decoder.Convert(
                byteBuffer,
                byteIndex,
                bytesRead - byteIndex,
                charBuffer,
                0,
                charBuffer.Length,
                flush: false,
                out int bytesUsed,
                out int charsUsed,
                out _);

            byteIndex += bytesUsed;

            if (charsUsed > 0)
                await onText(charBuffer.AsMemory(0, charsUsed));
        }
    }

    decoder.Convert(
        Array.Empty<byte>(),
        0,
        0,
        charBuffer,
        0,
        charBuffer.Length,
        flush: true,
        out _,
        out int finalCharsUsed,
        out _);

    if (finalCharsUsed > 0)
        await onText(charBuffer.AsMemory(0, finalCharsUsed));
}
```

The exact application callback can differ, but the semantic requirements are stable:

- reuse the decoder;
- preserve state across reads;
- honor `bytesUsed` and `charsUsed`;
- explicitly finalize the logical input.

## 9. WebSocket fragments

A loop that appends `Encoding.UTF8.GetString(buffer, 0, result.Count)` for every WebSocket fragment can
corrupt a character split across fragments.

The safe design uses a single `Decoder` for all fragments of one text message. Each call processes
`result.Count` bytes. `flush` is equal to `result.EndOfMessage`. Decoded characters are appended to the
message builder. The completed message is dispatched only after `EndOfMessage`.

Close frames should end the receive loop. Cancellation must be passed to `ReceiveAsync` and respected by
outer and inner loops.

## 10. Fallback behavior for invalid or incomplete input

Decoders and encoders use a fallback policy when input cannot be represented or decoded.

### Replacement fallback

Invalid or incomplete input is replaced, commonly with Unicode replacement character `U+FFFD` during
decoding. The application continues but receives evidence that text was damaged.

### Exception fallback

Invalid input throws, for example `DecoderFallbackException`. This is appropriate when corrupted text must
be rejected rather than repaired.

A strict UTF-8 decoder can be created with:

```csharp
var encoding = new UTF8Encoding(
    encoderShouldEmitUTF8Identifier: false,
    throwOnInvalidBytes: true);

Decoder decoder = encoding.GetDecoder();
```

Explicit `EncoderFallback` and `DecoderFallback` objects can also be configured through
`Encoding.GetEncoding`.

## 11. Why the final flush matters

If a decoder is holding two bytes of a three-byte UTF-8 character and the method simply discards the decoder,
the program does not hang. The incomplete bytes are silently abandoned.

A final `flush: true` makes the incomplete ending observable:

- replacement fallback emits the replacement character;
- exception fallback throws.

Therefore the issue is semantic correctness, not runtime liveness. Omitting the final flush means "ignore any
incomplete character at the end".

Example of state across chunks:

```csharp
byte[] first = { 0xE2, 0x82 };
byte[] second = { 0xAC };

Decoder decoder = Encoding.UTF8.GetDecoder();

int firstCount = decoder.GetCharCount(
    first, 0, first.Length, flush: false);  // 0

int secondCount = decoder.GetCharCount(
    second, 0, second.Length, flush: true); // 1
```

The first call buffers the incomplete euro-sign sequence. The second completes it.

## 12. Stateful Encoder

The same principle applies in the opposite direction. An `Encoder` preserves character state across calls.
This is relevant when text arrives in character chunks and a UTF-16 surrogate pair can be split between
chunks.

Use ordinary `Encoding.UTF8.GetBytes` for complete independent text values. Use
`Encoding.UTF8.GetEncoder()` when several character chunks form one logical stream and state must survive
between calls.

## Review summary

- Use `GetBytes` and `GetString` for complete values.
- Use array or span overloads when controlling allocation.
- Use a persistent `Decoder` for chunked UTF-8 bytes.
- `GetChars` assumes the destination fits; `Convert` safely reports partial progress.
- `completed` describes the supplied input slice, not the entire stream.
- `flush: false` means more input is expected; `flush: true` finalizes the logical input.
- Never discard `bytesUsed`, `charsUsed`, or buffered decoder state in a streaming loop.
- Select replacement or exception fallback according to the application's data-integrity requirements.
