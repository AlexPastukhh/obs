# Request-body binding, raw access, and replay buffering

Knowledge ID: `aspnet-core.request-body-binding-raw-access-and-replay-buffering`

Topic: `aspnet-core`

## Manual body access is not automatically more memory-efficient

ASP.NET Core JSON model binding already reads request bytes through stream/pipe infrastructure. Replacing `[FromBody]` or a minimal-API DTO parameter with `JsonSerializer.DeserializeAsync(Request.Body)` gives custom control, but if both paths materialize the same DTO graph, the memory shape is broadly the same.

Raw access changes the model when it changes the work:

- copy a large body directly to storage;
- parse NDJSON or custom frames progressively;
- validate signatures/checksums over raw bytes;
- retain partial records across reads;
- stream a large binary section elsewhere instead of embedding it in a DTO;
- decode only fields that are actually needed.

Use `Request.Body` when libraries or operations are naturally stream-based. Use `Request.BodyReader` when segmented framing, delimiters, `ReadOnlySequence<byte>`, or explicit consumed/examined positions are the real problem.

ASP.NET Core owns `Request.Body` and `BodyReader`; ordinary endpoint code should not dispose/complete framework-owned request infrastructure.

## Multiple reads require explicit buffering

Request bodies are normally forward-only from application code's perspective. Middleware that reads before MVC/minimal APIs must call `EnableBuffering()` if downstream code needs to reread, then reset the body position.

`EnableBuffering` is a deliberate cost: data can be buffered in memory up to thresholds and can spill to disk. Use it only when replay is a requirement such as diagnostics, auditing, or signature validation; bound logged size and redact secrets.

## What should be recallable

- Why does raw `Request.Body` access not by itself save memory?
- Which workloads materially benefit from raw streaming?
- When is `BodyReader` preferable to `Body`?
- Who owns the request stream and reader?
- Why is `EnableBuffering` needed for middleware rereads?
- What costs does request replay buffering introduce?

## Related knowledge

- `aspnet-core.request-response-streams-and-pipelines`
- `dotnet.pipereader-consumed-examined-and-segmented-framing`
- `dotnet.streamreader-decoding-buffering-and-read-contracts`

## Sources

- Workspace: `_ai-conspects/ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer/`
- Authoritative semantic transcript: `14-full-transcript.md`
- Closure audit: `15-coverage-audit.md`
- Exact source: `source/ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer.svg` (present on the checked branch)
- Source regions: R04 request-buffering section and R07
