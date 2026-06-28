# Regional transcript — R03: Fetch adapter, NDJSON streaming and progress

Conspect: `axios`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 14 / 14
unique screenshots represented: 14
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Streaming and progress depend on the active Axios adapter. XHR exposes progress events; the fetch adapter can expose a ReadableStream in environments that support streaming.

## XHR progress model

- Browser XHR raises upload and download progress events.
- Axios maps those events to `onUploadProgress` and `onDownloadProgress`.
- `loaded` is the number of bytes transferred so far.
- `total` may be undefined when Content-Length is unavailable or the transfer is chunked.

## NDJSON with progress callbacks

- One approach reads the growing XHR response text and tracks the already-consumed offset.
- Only complete newline-delimited JSON records should be parsed.
- An incomplete trailing line must remain buffered for the next progress callback.
- This is progressive parsing over a growing response buffer rather than a true stream-reader API.

## Fetch adapter streaming

- The fetch adapter can expose a platform ReadableStream when supported.
- Read chunks with a reader and incrementally decode text.
- Keep incomplete NDJSON text in a buffer between chunks.
- This is the cleaner model when the runtime and Axios version expose the response stream.

## Upload and download UI

- Upload progress is most useful for FormData or large request bodies.
- Download progress counts bytes received from the server.
- A React progress bar should update only when a usable total is known.
- Cancellation should abort the transfer and stop further UI updates.

## Interaction with validateStatus

- The adapter produces a response, then `validateStatus` decides fulfilled versus rejected handling.
- A custom status policy can route 4xx responses through the fulfilled branch.
- Response interceptors follow that decision rather than applying an independent status classification.

## Representative pattern

```ts
const response = await axios.get("/events", {
  adapter: "fetch",
  responseType: "stream",
  signal
});

const reader = response.data.getReader();
const decoder = new TextDecoder();
let buffer = "";

for (;;) {
  const { value, done } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  // split complete NDJSON lines; preserve incomplete tail
}
```

## Caveats

- Adapter capabilities differ by browser, Node version and Axios version.
- Do not assume `event.total` always exists or that 100% uploaded means the server finished processing.

## Source labels

- `UPLOAD/DOWNLOAD PROGRESS`
- `streaming, ndjson`
- `fetch adapter`
- `validatestatus and`
- `response interseptors`

## Covered text elements

```text
T-005, T-012, T-013, T-027, T-028
```

## Covered screenshot uses

```text
IU-031, IU-032, IU-033, IU-034, IU-035, IU-036, IU-037, IU-062, IU-067, IU-068, IU-090, IU-091, IU-092
IU-093
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
