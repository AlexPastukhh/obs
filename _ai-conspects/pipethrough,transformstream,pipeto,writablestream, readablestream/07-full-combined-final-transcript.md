# Full combined final transcript — pipethrough,transformstream,pipeto,writablestream, readablestream

Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements: 43 / 43
embedded image definitions: 124 / 124
unique image-content hashes: 124 / 124
screenshot uses: 124 / 124
repeated placements retained: 0
regions: 6 / 6
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — ReadableStream fundamentals, tee and network-stream behavior

A `ReadableStream` represents data arriving as chunks over time. The stream separates a producer from one or more consumers and provides locking, cancellation, piping, async iteration, and limited branching through `tee()`.

### Common sources and consumption

- `fetch(...).body` is commonly a byte-oriented `ReadableStream`, whose chunks are typically `Uint8Array` values.
- `getReader()` locks the stream to one reader until the lock is released; repeated `read()` calls return `{ value, done }`.
- A readable stream can also be consumed with `for await...of`, which expresses sequential async iteration over chunks.

### Underlying-source callbacks

- `start(controller)` runs when the stream is created and is suitable for initialization or eager production.
- `pull(controller)` is called when the queue needs more data and is suitable for lazy or demand-driven production.
- `cancel(reason)` lets the underlying source stop timers, release readers, close sockets, return an async iterator, or clean up any other producer resource.
- `controller.enqueue(chunk)`, `controller.close()`, and `controller.error(error)` push data, finish normally, or fail the stream.

### tee semantics

- `tee()` creates two readable branches that receive the same logical sequence of chunks.
- The original network source is still read once; the browser must retain unread data for the slower branch.
- The faster branch can drive source progress, so a large speed difference can increase buffering for the slower branch.
- This is useful for moderate cases such as displaying data while also caching it, but it is not a free replay mechanism for arbitrarily large bodies.

### Streaming request bodies

- A `ReadableStream` can conceptually be used as a request body so chunks are produced while the upload is in progress.
- In the browser fetch model shown in the source, streaming uploads require `duplex: 'half'`.
- The receiving server still sees ordinary HTTP request-body bytes and can bind, deserialize, or read them as usual.

### Representative patterns

```js
const response = await fetch("/data");
const stream = response.body;

for await (const chunk of stream) {
  console.log(chunk);
}
```

```js
const body = new ReadableStream({
  start(controller) {
    controller.enqueue(new TextEncoder().encode("part 1
"));
    controller.close();
  },
  cancel(reason) {
    console.log("upload cancelled", reason);
  }
});

await fetch("/upload", {
  method: "POST",
  body,
  duplex: "half"
});
```

### Caveats

- A stream is single-consumption unless explicitly branched or recreated.
- `tee()` only partially propagates backpressure: unread branch data can accumulate.
- A request-body stream does not guarantee that every browser, proxy, transport layer, or server buffers nothing.

## R02 — Incremental processing, NDJSON and async consumption

Streaming is most valuable when data can be produced and processed incrementally instead of materializing one giant object or serialized body before useful work begins.

### Peak memory rather than lifetime allocations

- Streaming does not necessarily reduce the total number of bytes ever allocated over the whole operation.
- Its key benefit is often lower peak live memory because processed chunks can become unreachable and be reclaimed while later chunks are still arriving.
- Lower peak memory reduces garbage-collection pressure, large temporary spikes, tab instability, and long periods where one giant representation must remain alive.

### True incremental production

- The largest win occurs when the source itself does not already exist as one giant in-memory object.
- Examples include paged APIs, IndexedDB reads, worker output, generated previews, metadata extraction, or any async source that yields items over time.
- Each item can be encoded and enqueued when ready, allowing upload or downstream processing to begin before all items exist.

### NDJSON framing

- NDJSON represents one JSON value per line rather than one giant JSON array.
- Each object can be serialized independently, followed by a newline, and transmitted immediately.
- The receiver can parse complete lines incrementally without waiting for a closing array bracket.

### Async iterables as producers

- An async generator or iterator is a natural source for a pull-based stream.
- The stream requests one iterator item at a time, encodes it, and enqueues it.
- This creates a clean bridge from async item production to a byte stream.

### Representative patterns

```js
const encoder = new TextEncoder();

const body = new ReadableStream({
  async start(controller) {
    for await (const item of getItemsAsync()) {
      controller.enqueue(
        encoder.encode(JSON.stringify(item) + "
")
      );
    }
    controller.close();
  }
});
```

### Caveats

- If the complete giant object is already resident in memory, streaming only the serialization cannot erase that original memory cost.
- Chunk boundaries do not automatically match NDJSON lines, so the receiver still needs line buffering.
- Network and runtime layers may buffer ahead; streaming improves the model but does not prove zero buffering end to end.

## R03 — start versus pull, cancellation, request bodies and backpressure

`start()` and `pull()` are two producer strategies. `start()` is convenient for eager setup, while `pull()` better models data that should be generated only when downstream demand exists.

### Eager start

- `start(controller)` executes once during construction.
- It is appropriate for initialization, wiring an event source, starting a timer, or enqueuing a small amount of immediate data.
- An eager producer can overfill the internal queue if it generates data faster than consumers can process it.

### Demand-driven pull

- `pull(controller)` is invoked when the stream wants more data according to its queue and high-water mark.
- It is useful for paged data, async iterators, file readers, or generated request-body chunks.
- The producer can await one next item, enqueue it, and close when the source is exhausted.

### Backpressure model

- The readable side tracks an internal queue and exposes `controller.desiredSize` as a demand signal.
- Using `pull()` lets the producer avoid eagerly constructing the entire upload body in JavaScript memory.
- When the fetch/network pipeline consumes bytes more slowly, demand-driven production can reduce application-side buffering.

### Cancellation propagation

- When the consumer stops, `cancel(reason)` should stop the producer and free resources.
- For an async iterator, call or await `iterator.return()` where appropriate so its `finally` block runs.
- For intervals, readers, sockets, subscriptions, workers, or event listeners, cancellation should reverse the setup performed by the producer.

### Representative patterns

```js
const encoder = new TextEncoder();
const iterator = getItemsAsync()[Symbol.asyncIterator]();

const body = new ReadableStream({
  async pull(controller) {
    const { value, done } = await iterator.next();

    if (done) {
      controller.close();
      return;
    }

    controller.enqueue(
      encoder.encode(JSON.stringify(value) + "
")
    );
  },

  async cancel(reason) {
    console.log("cancelled", reason);
    await iterator.return?.();
  }
});
```

### Caveats

- `pull()` is not proof that the browser emits exactly one network packet per call.
- Backpressure crosses several layers and can include internal buffering in the stream, fetch implementation, transport, proxy, and server.
- Do not enqueue again after closing or erroring the controller.

## R04 — TextDecoderStream and decoded text pipelines

`TextDecoderStream` is a transform that accepts byte chunks and emits decoded text chunks while preserving decoder state across chunk boundaries.

### Why it exists

- A fetch body normally yields binary `Uint8Array` chunks.
- `response.body.pipeThrough(new TextDecoderStream())` returns a readable stream whose chunks are strings.
- The decoder retains incomplete multibyte UTF-8 sequences until the remaining bytes arrive.

### Manual alternative

- A manual reader can call `decoder.decode(chunk, { stream: true })` for each chunk and perform a final decoder flush at the end.
- `TextDecoderStream` packages that stateful behavior into a reusable pipeline stage.

### Framing remains separate

- Decoded string chunks are still arbitrary transport chunks.
- One chunk is not guaranteed to equal one line, JSON object, message, or application record.
- A line splitter or message parser must retain incomplete text and emit only complete frames.

### TextEncoder distinction

- `TextEncoder` converts complete JavaScript strings into UTF-8 bytes.
- `TextDecoderStream` performs the inverse incrementally for a stream of byte chunks.

### Representative patterns

```js
const textStream = response.body.pipeThrough(
  new TextDecoderStream()
);

for await (const textChunk of textStream) {
  console.log(textChunk);
}
```

### Caveats

- Decoding bytes does not parse JSON, NDJSON, CSV, or application messages.
- Always handle an incomplete final line or message when the stream closes.
- The input encoding and error behavior must match the actual protocol.

## R05 — pipeThrough, TransformStream, chunks, buffering and flush

`pipeThrough()` connects a readable stream to a transform and returns the transform's readable output. It is the composition primitive for reusable stream-processing stages.

### Pipeline behavior

- `oldStream.pipeThrough(transform)` does not mutate the original stream object into another type; it creates a connected pipeline and returns a new readable output stream.
- The transform has a writable side that receives source chunks and a readable side that emits transformed chunks.
- Multiple transforms can be chained to express bytes → decoded text → lines → parsed records.

### TransformStream callbacks

- `transform(chunk, controller)` is called for incoming chunks.
- `controller.enqueue(outputChunk)` emits zero, one, or many output chunks.
- A transform can change chunk type, such as bytes to strings, strings to lines, or lines to objects.
- A custom transform is normally created as a `new TransformStream({ transform, flush })`; a class wrapper is optional when reusable configuration or state deserves one.

### Chunk cardinality

- One input chunk may produce multiple output chunks, such as splitting several complete lines.
- One input chunk may produce no output yet when only a partial frame is available.
- Several input chunks can contribute to one eventual output.

### Internal buffering and backpressure

- `pipeThrough()` preserves incremental flow and does not imply reading the entire source before transforming it.
- A transform may intentionally keep a small internal buffer, such as incomplete UTF-8 bytes, a partial line, or an unfinished message.
- Queues and backpressure still exist around each stage, so 'streaming' means bounded incremental processing, not literally zero retained data.

### flush

- `flush(controller)` runs after the writable side has ended and no more input chunks will arrive.
- Use it to emit a final partial line, finish parser state, or validate that no incomplete frame remains.
- The line-splitting pattern keeps the unfinished suffix between chunks and emits it during `flush()` if the protocol permits a final unterminated line.

### Error and cancellation flow

- Piping connects lifecycle and failure behavior across stages.
- Errors in a transform reject downstream piping and normally propagate to the connected stream chain.
- Use pipe options only when deliberately preventing close, abort, or cancel propagation.

### Representative patterns

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

### Caveats

- Do not assume source chunk boundaries match application records.
- Unbounded parser state inside a transform defeats the memory benefit of streaming.
- A transform should document its input chunk type and output chunk type.

## R06 — pipeTo, WritableStream, file writing and manual-reader comparison

`pipeTo()` sends all chunks from a readable stream to a writable destination and returns a promise for completion. A `WritableStream` standardizes the sink side of a stream pipeline.

### pipeTo versus pipeThrough

- `pipeThrough(transform)` connects a middle stage and returns another readable stream.
- `pipeTo(writable)` connects a terminal sink and returns a promise that resolves when piping completes.
- A typical graph is `ReadableStream → TransformStream(s) → WritableStream`.

### WritableStream sink callbacks

- `write(chunk)` handles each incoming chunk.
- `close()` finalizes normal successful completion.
- `abort(reason)` handles failure or cancellation cleanup.
- Manual access through `getWriter()` is available when code must call `write`, `close`, or `abort` directly and coordinate writer readiness.

### FileSystemWritableFileStream

- A file handle can create a file-specific writable stream through `createWritable()` in supported, permission-granted environments.
- A fetch response can be piped directly to that writable so bytes flow from network to disk without first assembling the full file in application memory.
- File-specific methods can support writes, seeking, and truncation before final close commits the result.

### Other sink examples

- Append decoded text or parsed events to UI or application state.
- Feed audio/video/media chunks into a processor that exposes a writable boundary.
- Send transformed chunks to another upload or storage API.
- Record logs, telemetry, parsed notifications, or collaboration events.

### Manual reader versus declarative pipeline

- A manual `getReader()` loop is appropriate for custom early-stop conditions, unusual branching, detailed per-chunk control, or logic that does not fit a reusable stage.
- `pipeThrough()` and `pipeTo()` are preferable when the intent is composition: connect this source through these transforms into this sink.
- The high-level pipeline usually reduces lock handling, lifecycle mistakes, and duplicated read/write loops.
- The two styles can express similar work, but they operate at different abstraction levels.

### Cleanup and cancellation

- Cancel a readable when the consumer is no longer interested and clean up its producer.
- Abort a writable when output cannot complete safely.
- When a stream wraps an async generator, propagate cancellation with `iterator.return()` so generator `finally` cleanup runs.

### Representative patterns

```js
const writable = await fileHandle.createWritable();

await response.body.pipeTo(writable);
```

```js
const sink = new WritableStream({
  write(chunk) {
    console.log("received", chunk);
  },
  close() {
    console.log("finished");
  },
  abort(reason) {
    console.error("aborted", reason);
  }
});

await readable.pipeTo(sink);
```

### Caveats

- File System Access APIs require browser support, a suitable secure context, and user permission.
- A writable's accepted chunk type is defined by the preceding stage or sink contract; it may be bytes, strings, or application objects.
- Do not ignore the promise returned by `pipeTo()` because it reports completion and pipeline errors.

## Regional coverage map

| Region | Text | Uses | Unique | Repeated | Remaining |
|---|---:|---:|---:|---:|---:|
| R01 | 16 | 18 | 18 | 0 | 0 |
| R02 | 7 | 17 | 17 | 0 | 0 |
| R03 | 6 | 15 | 15 | 0 | 0 |
| R04 | 0 | 3 | 3 | 0 | 0 |
| R05 | 7 | 26 | 26 | 0 | 0 |
| R06 | 7 | 45 | 45 | 0 | 0 |

## Exactness note

This document is the authoritative semantic transcript. The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
