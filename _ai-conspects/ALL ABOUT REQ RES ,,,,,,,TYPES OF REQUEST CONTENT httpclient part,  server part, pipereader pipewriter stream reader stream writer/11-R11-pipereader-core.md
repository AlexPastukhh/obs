# Regional transcript — R11: PipeReader fundamentals, ReadResult, ReadOnlySequence and AdvanceTo

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
text elements represented: 24 / 24
screenshot uses processed: 38 / 38
unique screenshots represented: 38
repeated placements retained: 0
remaining text elements: 0
remaining screenshot uses: 0
```

Boundary review:

- Included the complete visual road assigned to this region, including same-column continuations and nearby examples.
- Cross-region references are explained where required, but their screenshot placements remain closed in their own regional ledgers.
- No source image was omitted merely because its nearby SVG label was short or informal.

## Area understanding and reading quality

This region introduces `PipeReader`, `ReadResult`, `ReadOnlySequence<byte>`, `SequencePosition`, `ReadAsync`, `TryRead`, slicing, endianness, and the two `AdvanceTo` forms. It is the contract foundation for R12/R13.

Reading confidence is high.

## `PipeReader`

ASP.NET Core exposes the request pipe through:

```csharp
PipeReader reader =
    context.Request.BodyReader;
```

A `PipeReader` does not return a fresh byte array per read. `ReadAsync` returns a view over bytes currently available in the pipeline.

```csharp
ReadResult result =
    await reader.ReadAsync(cancellationToken);

ReadOnlySequence<byte> buffer =
    result.Buffer;
```

## `ReadResult`

Important properties:

- `Buffer`: available bytes as `ReadOnlySequence<byte>`.
- `IsCompleted`: the producer has completed; bytes can still remain in `Buffer`.
- `IsCanceled`: the pending read was cancelled through pipe coordination.

`IsCompleted == true` does not mean `Buffer` is empty. Process remaining bytes before exiting.

## `ReadOnlySequence<byte>`

A sequence is a logical contiguous range that can be physically stored in multiple memory segments.

Useful properties/methods:

- `Start`, `End`;
- `Length`, `IsEmpty`;
- `IsSingleSegment`;
- `First`, `FirstSpan`;
- `PositionOf(value)`;
- `Slice(...)`;
- `GetPosition(offset, origin)`;
- `CopyTo`;
- `ToArray`.

`FirstSpan` is only the first physical segment. Parsing only `FirstSpan` is incorrect when a record can cross segments.

## `SequencePosition`

`SequencePosition` is an opaque cursor tied to its sequence. Do not perform integer arithmetic on it or compare internals. Use sequence APIs to move:

```csharp
SequencePosition next =
    buffer.GetPosition(offset, buffer.Start);
```

Positions are passed to `Slice` and `AdvanceTo`.

## `ReadAsync` versus `TryRead`

Normal async loop:

```csharp
ReadResult result =
    await reader.ReadAsync(cancellationToken);
```

`TryRead(out ReadResult result)` returns immediately only when data is already available. It is useful for opportunistic draining or advanced coordination, not as a general replacement for awaiting data.

## Position and slicing

Find a newline:

```csharp
SequencePosition? position =
    buffer.PositionOf((byte)'\n');

if (position is not null)
{
    ReadOnlySequence<byte> line =
        buffer.Slice(0, position.Value);
}
```

Remove the delimiter from the next unread buffer:

```csharp
SequencePosition afterDelimiter =
    buffer.GetPosition(1, position.Value);
```

Avoid `ToArray()` in hot paths because it allocates a contiguous copy of all segments. It can be acceptable at a bounded boundary where the next API requires an array.

## Endianness belongs to the protocol

Network protocols often define big-endian integers:

```csharp
if (buffer.Length >= 4)
{
    Span<byte> header = stackalloc byte[4];
    buffer.Slice(0, 4).CopyTo(header);

    int length =
        BinaryPrimitives.ReadInt32BigEndian(header);
}
```

Do not infer endianness from the machine. Read according to the protocol definition.

## `AdvanceTo(consumed)`

```csharp
reader.AdvanceTo(consumed);
```

The one-position form means all bytes before `consumed` are permanently consumed, and the same position is used as the examined boundary.

Use it when the code consumed/copied everything it examined or has no partial-frame distinction.

## `AdvanceTo(consumed, examined)`

```csharp
reader.AdvanceTo(consumed, examined);
```

- `consumed`: bytes before this position can be released.
- `examined`: bytes through this position were inspected while looking for a complete record.

Example: buffer contains one complete line plus half of the next. Consume through the complete line, but mark the current end as examined. The remaining partial line stays for the next read.

Incorrect positions cause serious behavior:

- advancing `consumed` too far drops unprocessed bytes;
- never moving `consumed` retains memory;
- reporting `examined` incorrectly can cause unnecessary wakeups or a stalled read loop.

## Completion and cancellation

`CancelPendingRead()` interrupts a pending read for coordination/shutdown. It does not throw away buffered bytes automatically.

When the application owns the reader:

```csharp
await reader.CompleteAsync();
```

ASP.NET Core owns `Request.BodyReader`; ordinary endpoint code generally must not complete it independently.

`CopyToAsync(Stream)` is useful when the operation is simply pipe-to-stream transfer. If there is no parsing or leftover management, the stream API may be clearer.

## Covered source units

### SVG text elements

```text
T-0283, T-0284, T-0285, T-0287, T-0288, T-0289, T-0290, T-0291, T-0292, T-0293, T-0294, T-0295, T-0296, T-0300
T-0301, T-0302, T-0303, T-0304, T-0313, T-0314, T-0315, T-0386, T-0387, T-0475
```

### Screenshot placements

```text
IU-0125, IU-0126, IU-0127, IU-0128, IU-0129, IU-0130, IU-0131, IU-0132, IU-0133, IU-0134, IU-0135, IU-0136
IU-0161, IU-0162, IU-0163, IU-0164, IU-0165, IU-0166, IU-0167, IU-0168, IU-0169, IU-0173, IU-0183, IU-0184
IU-0185, IU-0186, IU-0187, IU-0188, IU-0191, IU-0192, IU-0315, IU-0316, IU-0317, IU-0318, IU-0319, IU-0320
IU-0321, IU-0322
```

## Exactness and limitations

The semantic transcript normalizes spelling and organizes the ideas. The preserved source SVG and extracted screenshots remain authoritative for exact code, overload signatures, version-specific behavior and visual ordering.
