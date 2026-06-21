# PDS04 - System.IO.Pipelines PipeReader/PipeWriter and SequenceReader

Conspect: `processing-data-as-stream-in-dif-situations-httpclient-endpoint-browser-websockets`<br>
File type: **source-preserving region transcript**  
Stage: **4 / NEXT03 verified transcript v001**  
Generated: 2026-06-13 11:03:22 UTC

---

## 0.1 Area overview / key ideas / reading quality

This region covers System.IO.Pipelines as the advanced buffering/parsing model for streaming bytes.

Key ideas:
- PipeReader exposes buffered data as ReadOnlySequence<byte>.
- AdvanceTo(consumed, examined) is the key contract for what was processed and what was inspected.
- SequenceReader is a cursor helper over potentially non-contiguous buffers.
- PipeWriter writes by GetMemory/GetSpan, Advance and FlushAsync.
- Completion/error flows are explicit on PipeReader/PipeWriter.

Reading quality:
```text
Overall: medium-high/high.
Exact source images remain source of truth; transcript preserves visible meaning and API shapes.
Confidence: high for conceptual/semantic mapping.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-017, S-018, S-019, S-020, S-021, S-022, S-023
```

Boundary decision:
```text
PDS04 was processed in NEXT03. No boundary correction was required for this region.
No transcript regions remain; final closure/audit remains.
```

---

## 1. Source inventory

| Region source | Source | Image use | fileId | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| PDS04A-S001 | S-017 | IU-017 | `909d2fecc6` | PDS04A | `verified-from-source-image` | no | PipeReader read loop overview |
| PDS04A-S002 | S-018 | IU-018 | `db28e20b0f` | PDS04A | `verified-from-source-image` | no | Consumed and examined positions |
| PDS04A-S003 | S-019 | IU-019 | `66a2f88836` | PDS04A | `verified-from-source-image` | no | Parsing line/message with PipeReader |
| PDS04A-S004 | S-020 | IU-020 | `d1c3307e92` | PDS04A | `verified-from-source-image` | no | PipeReader read result completion |
| PDS04A-S005 | S-021 | IU-021 | `0ea3a35556` | PDS04A | `verified-from-source-image` | no | SequenceReader as cursor over ReadOnlySequence |
| PDS04B-S001 | S-022 | IU-022 | `c759b46f91` | PDS04B | `verified-from-source-image` | no | PipeWriter writing and FlushAsync |
| PDS04B-S002 | S-023 | IU-023 | `edcc8ae683` | PDS04B | `verified-from-source-image` | no | PipeWriter completion/error model |

---

## 2. Verified source transcript

## 2.1 PDS04A

### PDS04A-S001 / S-017 - `909d2fecc6`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: PipeReader read loop overview

#### Visible meaning

```text
PipeReader reads buffered data as ReadOnlySequence<byte>. The loop awaits reader.ReadAsync(), inspects result.Buffer, parses what is available, then calls AdvanceTo to tell the pipe what was consumed and examined.
```

#### Visible code / API shape

```csharp
ReadResult result = await reader.ReadAsync();
ReadOnlySequence<byte> buffer = result.Buffer;
reader.AdvanceTo(consumed, examined);
```

---

### PDS04A-S002 / S-018 - `db28e20b0f`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Consumed and examined positions

#### Visible meaning

```text
PipeReader needs two positions: consumed and examined. Consumed means bytes the app has fully processed and the pipe can discard. Examined means bytes the app looked at; it controls backpressure and when ReadAsync should wait for more data.
```

#### Visible code / API shape

```csharp
reader.AdvanceTo(buffer.Start, buffer.End);
reader.AdvanceTo(consumed, examined);
```

---

### PDS04A-S003 / S-019 - `66a2f88836`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: Parsing line/message with PipeReader

#### Visible meaning

```text
The source shows the typical pattern: search buffer for a delimiter, process complete messages/lines, leave partial data in the buffer, and advance consumed/examined carefully for the next iteration.
```

#### Visible code / API shape

```csharp
while (TryReadMessage(ref buffer, out message)) { ... }
reader.AdvanceTo(buffer.Start, buffer.End);
```

---

### PDS04A-S004 / S-020 - `d1c3307e92`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: PipeReader read result completion

#### Visible meaning

```text
ReadResult can indicate completion/cancellation. The consumer should process remaining buffered data and exit when result.IsCompleted and no more complete data remains.
```

#### Visible code / API shape

```csharp
if (result.IsCompleted) break;
```

---

### PDS04A-S005 / S-021 - `0ea3a35556`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: SequenceReader as cursor over ReadOnlySequence

#### Visible meaning

```text
SequenceReader<T> is a cursor-like helper for parsing ReadOnlySequence<T>. It can read primitives, advance, rewind and inspect data without forcing a contiguous array copy.
```

#### Visible code / API shape

```csharp
var reader = new SequenceReader<byte>(buffer);
reader.TryRead(out byte value);
reader.TryReadTo(out ReadOnlySequence<byte> line, (byte)'\n');
```

---

## 2.2 PDS04B

### PDS04B-S001 / S-022 - `c759b46f91`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: PipeWriter writing and FlushAsync

#### Visible meaning

```text
PipeWriter writes by asking for memory/span, writing bytes, advancing by bytes written, and flushing. FlushAsync publishes data to the reader and may signal backpressure/completion.
```

#### Visible code / API shape

```csharp
Memory<byte> memory = writer.GetMemory(sizeHint);
// write into memory
writer.Advance(bytesWritten);
FlushResult result = await writer.FlushAsync();
```

---

### PDS04B-S002 / S-023 - `edcc8ae683`

Metadata:
- status: `verified-from-source-image`
- readability: `medium-high`
- cut off: `no`
- confidence: `high`
- theme: PipeWriter completion/error model

#### Visible meaning

```text
PipeWriter should be completed when no more data will be written. Complete can include an exception when the writer side failed. The reader observes completion and can finish gracefully or with error.
```

#### Visible code / API shape

```csharp
await writer.CompleteAsync();
await writer.CompleteAsync(exception);
```

---

## 3. Cleaned source notes

- PipeReader exposes buffered data as ReadOnlySequence<byte>.
- AdvanceTo(consumed, examined) is the key contract for what was processed and what was inspected.
- SequenceReader is a cursor helper over potentially non-contiguous buffers.
- PipeWriter writes by GetMemory/GetSpan, Advance and FlushAsync.
- Completion/error flows are explicit on PipeReader/PipeWriter.

---

## 4. Question hooks

- How/why: PipeReader exposes buffered data as ReadOnlySequence<byte>?
- How/why: AdvanceTo(consumed, examined) is the key contract for what was processed and what was inspected?
- How/why: SequenceReader is a cursor helper over potentially non-contiguous buffers?
- How/why: PipeWriter writes by GetMemory/GetSpan, Advance and FlushAsync?
- How/why: Completion/error flows are explicit on PipeReader/PipeWriter?