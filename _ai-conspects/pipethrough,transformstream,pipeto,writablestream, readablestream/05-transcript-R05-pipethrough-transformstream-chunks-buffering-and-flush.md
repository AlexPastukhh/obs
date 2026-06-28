# Regional transcript — R05: pipeThrough, TransformStream, chunks, buffering and flush

Conspect: `pipethrough,transformstream,pipeto,writablestream, readablestream`  
Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 26 / 26
unique screenshots represented: 26
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`pipeThrough()` connects a readable stream to a transform and returns the transform's readable output. It is the composition primitive for reusable stream-processing stages.

## Pipeline behavior

- `oldStream.pipeThrough(transform)` does not mutate the original stream object into another type; it creates a connected pipeline and returns a new readable output stream.
- The transform has a writable side that receives source chunks and a readable side that emits transformed chunks.
- Multiple transforms can be chained to express bytes → decoded text → lines → parsed records.

## TransformStream callbacks

- `transform(chunk, controller)` is called for incoming chunks.
- `controller.enqueue(outputChunk)` emits zero, one, or many output chunks.
- A transform can change chunk type, such as bytes to strings, strings to lines, or lines to objects.
- A custom transform is normally created as a `new TransformStream({ transform, flush })`; a class wrapper is optional when reusable configuration or state deserves one.

## Chunk cardinality

- One input chunk may produce multiple output chunks, such as splitting several complete lines.
- One input chunk may produce no output yet when only a partial frame is available.
- Several input chunks can contribute to one eventual output.

## Internal buffering and backpressure

- `pipeThrough()` preserves incremental flow and does not imply reading the entire source before transforming it.
- A transform may intentionally keep a small internal buffer, such as incomplete UTF-8 bytes, a partial line, or an unfinished message.
- Queues and backpressure still exist around each stage, so 'streaming' means bounded incremental processing, not literally zero retained data.

## flush

- `flush(controller)` runs after the writable side has ended and no more input chunks will arrive.
- Use it to emit a final partial line, finish parser state, or validate that no incomplete frame remains.
- The line-splitting pattern keeps the unfinished suffix between chunks and emits it during `flush()` if the protocol permits a final unterminated line.

## Error and cancellation flow

- Piping connects lifecycle and failure behavior across stages.
- Errors in a transform reject downstream piping and normally propagate to the connected stream chain.
- Use pipe options only when deliberately preventing close, abort, or cancel propagation.

## Representative patterns

```js
function createLineSplitter() {
  let buffer = "";

  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk;
      const lines = buffer.split("
");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        controller.enqueue(line);
      }
    },

    flush(controller) {
      if (buffer) controller.enqueue(buffer);
    }
  });
}

const lines = response.body
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(createLineSplitter());
```

## Caveats

- Do not assume source chunk boundaries match application records.
- Unbounded parser state inside a transform defeats the memory benefit of streaming.
- A transform should document its input chunk type and output chunk type.

## Covered source units

### Text elements

```text
T-004, T-005, T-007, T-010, T-011, T-012, T-013
```

### Screenshot uses

```text
IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-014, IU-015, IU-016
IU-017, IU-018, IU-019, IU-020, IU-021, IU-022, IU-023, IU-029, IU-030, IU-031, IU-032, IU-040, IU-041
```

The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
