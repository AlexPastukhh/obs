# Regional transcript — R02: Incremental processing, NDJSON and async consumption

Conspect: `pipethrough,transformstream,pipeto,writablestream, readablestream`  
Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 17 / 17
unique screenshots represented: 17
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Streaming is most valuable when data can be produced and processed incrementally instead of materializing one giant object or serialized body before useful work begins.

## Peak memory rather than lifetime allocations

- Streaming does not necessarily reduce the total number of bytes ever allocated over the whole operation.
- Its key benefit is often lower peak live memory because processed chunks can become unreachable and be reclaimed while later chunks are still arriving.
- Lower peak memory reduces garbage-collection pressure, large temporary spikes, tab instability, and long periods where one giant representation must remain alive.

## True incremental production

- The largest win occurs when the source itself does not already exist as one giant in-memory object.
- Examples include paged APIs, IndexedDB reads, worker output, generated previews, metadata extraction, or any async source that yields items over time.
- Each item can be encoded and enqueued when ready, allowing upload or downstream processing to begin before all items exist.

## NDJSON framing

- NDJSON represents one JSON value per line rather than one giant JSON array.
- Each object can be serialized independently, followed by a newline, and transmitted immediately.
- The receiver can parse complete lines incrementally without waiting for a closing array bracket.

## Async iterables as producers

- An async generator or iterator is a natural source for a pull-based stream.
- The stream requests one iterator item at a time, encodes it, and enqueues it.
- This creates a clean bridge from async item production to a byte stream.

## Representative patterns

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

## Caveats

- If the complete giant object is already resident in memory, streaming only the serialization cannot erase that original memory cost.
- Chunk boundaries do not automatically match NDJSON lines, so the receiver still needs line buffering.
- Network and runtime layers may buffer ahead; streaming improves the model but does not prove zero buffering end to end.

## Covered source units

### Text elements

```text
T-028, T-029, T-030, T-031, T-032, T-033, T-034
```

### Screenshot uses

```text
IU-072, IU-084, IU-085, IU-086, IU-087, IU-088, IU-089, IU-090, IU-091, IU-092, IU-093, IU-094, IU-095
IU-096, IU-097, IU-098, IU-099
```

The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
