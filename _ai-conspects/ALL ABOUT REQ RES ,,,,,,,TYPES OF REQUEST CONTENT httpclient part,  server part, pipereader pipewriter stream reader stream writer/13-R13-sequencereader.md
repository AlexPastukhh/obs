# Regional transcript — R13: SequenceReader cursor API and segmented protocol parsing

Conspect: `ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer`  
Generated: 2026-06-29 05:30:13 UTC

## Transcript policy for repetition

This is a semantic transcript, not a character-for-character dump. Repeated
captions, duplicated screenshots and restated code lines are consolidated into
one complete explanation. Distinct API behavior, edge cases, tradeoffs and
examples are retained. Every source placement remains closed in the coverage
ledger even when its wording is not repeated in the prose.

## Coverage and boundary decision

```text
text elements represented: 59 / 59
screenshot uses processed: 61 / 61
unique screenshots represented: 60
repeated placements retained: 1
remaining text elements: 0
remaining screenshot uses: 0
```

Boundary review:

- Included the complete visual road assigned to this region, including same-column continuations and nearby examples.
- Cross-region references are explained where required, but their screenshot placements remain closed in their own regional ledgers.
- No source image was omitted merely because its nearby SVG label was short or informal.

## Area understanding and reading quality

This region is a detailed `SequenceReader<byte>` reference. It covers the cursor model, stack-only lifetime, segmented sequences, delimiters including escaped/multi-byte forms, lookahead, fixed-size headers across segments, integer methods, decoding, and transferring the final cursor back to `PipeReader.AdvanceTo`.

Reading confidence is high. The source screenshots list the property/method families and several concrete parsing patterns.

## What `SequenceReader<T>` is

```csharp
ReadOnlySequence<byte> sequence = GetSequence();
var reader = new SequenceReader<byte>(sequence);
```

`SequenceReader<T>` is a mutable cursor over a `ReadOnlySequence<T>`. It is a `ref struct`:

- stack-only;
- cannot be boxed;
- cannot be stored in a normal class field;
- cannot live across `await`;
- should be created and consumed inside the synchronous parsing portion of a read loop.

The `PipeReader` owns asynchronous waiting. `SequenceReader` performs synchronous parsing of the currently available sequence.

## Key properties

- `End`: no unread items remain.
- `Remaining`: count of unread items.
- `Consumed`: count advanced from the original start.
- `Position`: current `SequencePosition`.
- `CurrentSpan`: physical segment currently being inspected.
- `CurrentSpanIndex`: cursor index inside `CurrentSpan`.
- `UnreadSpan`: remaining suffix of the current physical span.

`UnreadSpan` is not the entire remaining logical sequence when more segments follow.

## Basic cursor movement

```csharp
if (reader.TryRead(out byte value))
{
    // Advanced by one only on success.
}

if (reader.TryPeek(out byte next))
{
    // Did not advance.
}

reader.Advance(count);
reader.Rewind(count);
```

Use `Rewind` for controlled backtracking within already-consumed items. Never rewind beyond the reader's consumed count.

`AdvancePast(value)` and `AdvancePastAny(values)` skip matching values from the current position, useful for whitespace or separators.

## Fixed-size lookahead without consumption

```csharp
Span<byte> header = stackalloc byte[8];

if (!reader.TryCopyTo(header))
{
    // Need more data; reader did not advance.
    return false;
}

// Validate header first.
if (!HeaderIsValid(header))
{
    throw new InvalidDataException();
}

reader.Advance(header.Length);
```

This handles a header split across physical segments without allocating a heap array.

## Integer reading and endianness

For a byte reader, integer helper methods can read little/big-endian values across segments:

```csharp
if (!reader.TryReadBigEndian(out int payloadLength))
{
    return false;
}
```

The method advances only on success. Choose endianness from the protocol specification.

When a particular overload/type is unavailable, copy a small header with `TryCopyTo` and use `BinaryPrimitives`.

## Delimiter parsing

Single delimiter:

```csharp
if (reader.TryReadTo(
    out ReadOnlySequence<byte> field,
    (byte)',',
    advancePastDelimiter: true))
{
    Process(field);
}
```

This works even when the field crosses segments.

### Lookahead with `IsNext`

```csharp
if (reader.IsNext(
    "PING"u8,
    advancePast: false))
{
    // Prefix matched but cursor did not move.
}
```

Use `advancePast: true` only when a successful prefix match should be consumed.

### Multi-byte delimiter

For `\r\n\r\n`, use the sequence-aware overloads/patterns that search a delimiter sequence. Manual `FirstSpan` search is incorrect when the delimiter begins at the end of one segment and ends in the next.

## Escaped delimiters

A delimited text protocol may treat `\,` as a literal comma. `TryReadTo` overloads that accept delimiter and escape values can express this rule without manually retaining whether the previous physical span ended in an escape byte.

After extracting the field, unescape according to protocol rules; delimiter discovery and semantic decoding remain separate steps.

## Length-prefixed frame

```csharp
static bool TryReadFrame(
    ref SequenceReader<byte> reader,
    out ReadOnlySequence<byte> payload)
{
    SequenceReader<byte> snapshot = reader;

    if (!reader.TryReadBigEndian(out int length))
    {
        reader = snapshot;
        payload = default;
        return false;
    }

    if (length < 0 || reader.Remaining < length)
    {
        reader = snapshot;
        payload = default;
        return false;
    }

    SequencePosition start = reader.Position;
    reader.Advance(length);

    payload = reader.Sequence.Slice(start, length);
    return true;
}
```

Snapshot/restore prevents a partial header from being consumed when the payload is not yet complete. Validate length before allocation or advance to prevent memory/denial-of-service problems.

## Decoding after framing

Do not decode the entire pipe buffer merely to locate a byte delimiter. First find/extract the complete byte frame, then decode that frame.

For a single segment:

```csharp
string text =
    Encoding.UTF8.GetString(payload.FirstSpan);
```

For multiple segments, use a sequence-aware decoder or bounded copy. UTF-8 code points can cross segment boundaries, so decoding each segment independently is unsafe unless decoder state is preserved.

## Integrating with `PipeReader`

```csharp
ReadResult result =
    await pipe.ReadAsync(cancellationToken);

ReadOnlySequence<byte> buffer =
    result.Buffer;

var cursor = new SequenceReader<byte>(buffer);

while (TryReadFrame(ref cursor, out var frame))
{
    Process(frame);
}

pipe.AdvanceTo(
    consumed: cursor.Position,
    examined: buffer.End);
```

`cursor.Position` communicates what was successfully consumed. The parser should not store the `SequenceReader` across the next `await`; store protocol state separately if necessary.

## When to use it

Strong use cases:

- segmented length-prefixed protocols;
- escaped or multi-byte delimiters;
- prefix detection across segments;
- fixed headers without contiguous-array allocation;
- mixed binary/text frames;
- parsers that already receive `ReadOnlySequence<byte>`.

For a small file or ordinary newline text, `Stream`, `BinaryReader`, or `StreamReader` can remain more maintainable.

## Covered source units

### SVG text elements

```text
T-0415, T-0416, T-0417, T-0418, T-0419, T-0420, T-0421, T-0422, T-0423, T-0424, T-0425, T-0426, T-0427, T-0428
T-0429, T-0430, T-0431, T-0432, T-0433, T-0434, T-0435, T-0436, T-0437, T-0438, T-0439, T-0440, T-0441, T-0442
T-0443, T-0444, T-0445, T-0446, T-0447, T-0448, T-0449, T-0450, T-0451, T-0452, T-0453, T-0454, T-0455, T-0456
T-0457, T-0458, T-0459, T-0460, T-0461, T-0462, T-0463, T-0464, T-0465, T-0466, T-0467, T-0468, T-0469, T-0470
T-0471, T-0472, T-0473
```

### Screenshot placements

```text
IU-0361, IU-0363, IU-0364, IU-0365, IU-0366, IU-0367, IU-0368, IU-0369, IU-0370, IU-0371, IU-0372, IU-0373
IU-0374, IU-0375, IU-0376, IU-0377, IU-0378, IU-0379, IU-0380, IU-0381, IU-0382, IU-0383, IU-0384, IU-0385
IU-0386, IU-0387, IU-0388, IU-0389, IU-0390, IU-0391, IU-0392, IU-0393, IU-0394, IU-0395, IU-0396, IU-0397
IU-0398, IU-0399, IU-0400, IU-0401, IU-0402, IU-0403, IU-0404, IU-0405, IU-0406, IU-0407, IU-0408, IU-0409
IU-0410, IU-0411, IU-0412, IU-0413, IU-0414, IU-0415, IU-0416, IU-0417, IU-0418, IU-0419, IU-0420, IU-0421
IU-0426
```

## Exactness and limitations

The semantic transcript normalizes spelling and organizes the ideas. The preserved source SVG and extracted screenshots remain authoritative for exact code, overload signatures, version-specific behavior and visual ordering.
