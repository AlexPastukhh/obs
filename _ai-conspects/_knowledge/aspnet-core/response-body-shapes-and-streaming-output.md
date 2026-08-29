# Response body shapes and streaming output choices

Knowledge ID: `aspnet-core.response-body-shapes-and-streaming-output`

Topic: `aspnet-core`

## Match the output API to the response shape

For ordinary DTO JSON, use framework results or `WriteAsJsonAsync`. They already serialize UTF-8 into the response pipeline and apply configured JSON behavior; a custom `BodyWriter` loop is not automatically better.

For raw bytes or a file, copy from the source stream to `Response.Body`. This keeps a bounded copy buffer rather than materializing the entire file.

For one text value, `Response.WriteAsync` is simpler than introducing `StreamWriter`. For many text fragments, `StreamWriter` can batch encoding and writes; use `leaveOpen: true` because ASP.NET Core owns the response body.

## Streaming protocols need explicit framing and flush policy

NDJSON sends independently serialized JSON values separated by newline. SSE uses `text/event-stream`, event field syntax, and a blank line between events. Both can flush at latency boundaries, but flushing every tiny fragment trades throughput for immediacy.

`IAsyncEnumerable<T>` can avoid first building a giant `List<T>` and can improve time to first item, but total bandwidth and client-side incremental behavior still depend on serializer/proxy/client contracts.

## Low-level output is for low-level framing

`HttpResponse.BodyWriter` is appropriate for exact binary framing, direct encoding into pipeline memory, length prefixes, or delimiters. `Utf8JsonWriter` is useful when explicit JSON-token control is the requirement. Neither should replace standard DTO serialization without a concrete need.

Framework-owned response pipes should normally be written/flushed, not completed by endpoint code.

## What should be recallable

- Why is standard JSON serialization already a streaming-capable server path?
- When is `CopyToAsync` the correct response abstraction?
- When does `StreamWriter` improve a response writer?
- What is the latency/throughput tradeoff of frequent flushes?
- What distinguishes NDJSON from SSE framing?
- When is `BodyWriter` justified?

## Related knowledge

- `aspnet-core.request-response-streams-and-pipelines`
- `dotnet.streamwriter-encoding-buffering-and-flush-contracts`
- `dotnet.pipewriter-buffer-advance-flush-and-batching`
- `http.sse-event-stream-reconnection`

## Sources

- Workspace: `_ai-conspects/ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer/`
- Authoritative semantic transcript: `14-full-transcript.md`
- Closure audit: `15-coverage-audit.md`
- Exact source: `source/ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer.svg` (present on the checked branch)
- Source region: R06
