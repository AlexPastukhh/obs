# Regional transcript — R04: TextDecoderStream and decoded text pipelines

Conspect: `pipethrough,transformstream,pipeto,writablestream, readablestream`  
Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`TextDecoderStream` is a transform that accepts byte chunks and emits decoded text chunks while preserving decoder state across chunk boundaries.

## Why it exists

- A fetch body normally yields binary `Uint8Array` chunks.
- `response.body.pipeThrough(new TextDecoderStream())` returns a readable stream whose chunks are strings.
- The decoder retains incomplete multibyte UTF-8 sequences until the remaining bytes arrive.

## Manual alternative

- A manual reader can call `decoder.decode(chunk, { stream: true })` for each chunk and perform a final decoder flush at the end.
- `TextDecoderStream` packages that stateful behavior into a reusable pipeline stage.

## Framing remains separate

- Decoded string chunks are still arbitrary transport chunks.
- One chunk is not guaranteed to equal one line, JSON object, message, or application record.
- A line splitter or message parser must retain incomplete text and emit only complete frames.

## TextEncoder distinction

- `TextEncoder` converts complete JavaScript strings into UTF-8 bytes.
- `TextDecoderStream` performs the inverse incrementally for a stream of byte chunks.

## Representative patterns

```js
const textStream = response.body.pipeThrough(
  new TextDecoderStream()
);

for await (const textChunk of textStream) {
  console.log(textChunk);
}
```

## Caveats

- Decoding bytes does not parse JSON, NDJSON, CSV, or application messages.
- Always handle an incomplete final line or message when the stream closes.
- The input encoding and error behavior must match the actual protocol.

## Covered source units

### Text elements

```text
(none)
```

### Screenshot uses

```text
IU-001, IU-002, IU-003
```

The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
