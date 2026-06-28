# Regional transcript — R01: ReadableStream fundamentals, tee and network-stream behavior

Conspect: `pipethrough,transformstream,pipeto,writablestream, readablestream`  
Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements represented: 16 / 16
image uses processed: 18 / 18
unique screenshots represented: 18
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A `ReadableStream` represents data arriving as chunks over time. The stream separates a producer from one or more consumers and provides locking, cancellation, piping, async iteration, and limited branching through `tee()`.

## Common sources and consumption

- `fetch(...).body` is commonly a byte-oriented `ReadableStream`, whose chunks are typically `Uint8Array` values.
- `getReader()` locks the stream to one reader until the lock is released; repeated `read()` calls return `{ value, done }`.
- A readable stream can also be consumed with `for await...of`, which expresses sequential async iteration over chunks.

## Underlying-source callbacks

- `start(controller)` runs when the stream is created and is suitable for initialization or eager production.
- `pull(controller)` is called when the queue needs more data and is suitable for lazy or demand-driven production.
- `cancel(reason)` lets the underlying source stop timers, release readers, close sockets, return an async iterator, or clean up any other producer resource.
- `controller.enqueue(chunk)`, `controller.close()`, and `controller.error(error)` push data, finish normally, or fail the stream.

## tee semantics

- `tee()` creates two readable branches that receive the same logical sequence of chunks.
- The original network source is still read once; the browser must retain unread data for the slower branch.
- The faster branch can drive source progress, so a large speed difference can increase buffering for the slower branch.
- This is useful for moderate cases such as displaying data while also caching it, but it is not a free replay mechanism for arbitrarily large bodies.

## Streaming request bodies

- A `ReadableStream` can conceptually be used as a request body so chunks are produced while the upload is in progress.
- In the browser fetch model shown in the source, streaming uploads require `duplex: 'half'`.
- The receiving server still sees ordinary HTTP request-body bytes and can bind, deserialize, or read them as usual.

## Representative patterns

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

## Caveats

- A stream is single-consumption unless explicitly branched or recreated.
- `tee()` only partially propagates backpressure: unread branch data can accumulate.
- A request-body stream does not guarantee that every browser, proxy, transport layer, or server buffers nothing.

## Covered source units

### Text elements

```text
T-001, T-002, T-014, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023, T-024, T-025, T-026
T-027
```

### Screenshot uses

```text
IU-062, IU-063, IU-064, IU-065, IU-066, IU-067, IU-068, IU-069, IU-070, IU-071, IU-073, IU-074, IU-075
IU-076, IU-080, IU-081, IU-082, IU-083
```

The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
