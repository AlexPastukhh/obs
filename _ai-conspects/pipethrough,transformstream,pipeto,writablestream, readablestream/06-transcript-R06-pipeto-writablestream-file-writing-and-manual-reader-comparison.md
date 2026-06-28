# Regional transcript — R06: pipeTo, WritableStream, file writing and manual-reader comparison

Conspect: `pipethrough,transformstream,pipeto,writablestream, readablestream`  
Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 45 / 45
unique screenshots represented: 45
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`pipeTo()` sends all chunks from a readable stream to a writable destination and returns a promise for completion. A `WritableStream` standardizes the sink side of a stream pipeline.

## pipeTo versus pipeThrough

- `pipeThrough(transform)` connects a middle stage and returns another readable stream.
- `pipeTo(writable)` connects a terminal sink and returns a promise that resolves when piping completes.
- A typical graph is `ReadableStream → TransformStream(s) → WritableStream`.

## WritableStream sink callbacks

- `write(chunk)` handles each incoming chunk.
- `close()` finalizes normal successful completion.
- `abort(reason)` handles failure or cancellation cleanup.
- Manual access through `getWriter()` is available when code must call `write`, `close`, or `abort` directly and coordinate writer readiness.

## FileSystemWritableFileStream

- A file handle can create a file-specific writable stream through `createWritable()` in supported, permission-granted environments.
- A fetch response can be piped directly to that writable so bytes flow from network to disk without first assembling the full file in application memory.
- File-specific methods can support writes, seeking, and truncation before final close commits the result.

## Other sink examples

- Append decoded text or parsed events to UI or application state.
- Feed audio/video/media chunks into a processor that exposes a writable boundary.
- Send transformed chunks to another upload or storage API.
- Record logs, telemetry, parsed notifications, or collaboration events.

## Manual reader versus declarative pipeline

- A manual `getReader()` loop is appropriate for custom early-stop conditions, unusual branching, detailed per-chunk control, or logic that does not fit a reusable stage.
- `pipeThrough()` and `pipeTo()` are preferable when the intent is composition: connect this source through these transforms into this sink.
- The high-level pipeline usually reduces lock handling, lifecycle mistakes, and duplicated read/write loops.
- The two styles can express similar work, but they operate at different abstraction levels.

## Cleanup and cancellation

- Cancel a readable when the consumer is no longer interested and clean up its producer.
- Abort a writable when output cannot complete safely.
- When a stream wraps an async generator, propagate cancellation with `iterator.return()` so generator `finally` cleanup runs.

## Representative patterns

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

## Caveats

- File System Access APIs require browser support, a suitable secure context, and user permission.
- A writable's accepted chunk type is defined by the preceding stage or sink contract; it may be bytes, strings, or application objects.
- Do not ignore the promise returned by `pipeTo()` because it reports completion and pipeline errors.

## Covered source units

### Text elements

```text
T-003, T-006, T-008, T-009, T-035, T-037, T-038
```

### Screenshot uses

```text
IU-024, IU-025, IU-026, IU-027, IU-028, IU-033, IU-034, IU-035, IU-036, IU-037, IU-038, IU-039, IU-042
IU-043, IU-044, IU-045, IU-046, IU-047, IU-048, IU-049, IU-050, IU-051, IU-052, IU-053, IU-054, IU-055
IU-056, IU-057, IU-058, IU-059, IU-060, IU-061, IU-077, IU-078, IU-079, IU-106, IU-107, IU-108, IU-109
IU-110, IU-111, IU-114, IU-115, IU-123, IU-124
```

The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
