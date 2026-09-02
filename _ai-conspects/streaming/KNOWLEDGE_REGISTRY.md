# Knowledge Registry - Streaming

Source workspace: `_ai-conspects/streaming/`

Authoritative processed sources: `regions/R01-streaming-bytes-and-stream-concepts.md` through `regions/R06-streaming-benefits-memory-mental-model.md`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`; 194 image uses, zero unresolved.

Original SVG: `source/streaming.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Stream as progressive byte abstraction, internal versus network meaning, chunk/framing boundary, and MemoryStream buffering caveat | `dotnet.streaming-byte-object-and-memory-models` | `dotnet` | `../_knowledge/dotnet/streaming-byte-object-and-memory-models.md` | MAPPED |
| Streaming overhead, peak-memory/LOH/GC benefits, selection rules, and Stream/IAsyncEnumerable/StreamContent distinction | `dotnet.streaming-byte-object-and-memory-models` | `dotnet` | `../_knowledge/dotnet/streaming-byte-object-and-memory-models.md` | MAPPED |
| ResponseHeadersRead, ReadAsStreamAsync, file copy, stream JSON deserialization, and response lifetime | `dotnet.httpclient-response-streaming` | `dotnet` | `../_knowledge/dotnet/httpclient-response-streaming.md` | MERGED |
| EF Core single-query async row streaming, DbContext/reader lifetime, cancellation, stable ordering, cursor and retry/resume concerns | `aspnet-core.async-enumerable-query-streaming-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/async-enumerable-query-streaming-lifecycle.md` | MAPPED |
| JSON array versus NDJSON partial validity, manual item/newline/flush loop, committed-response boundary, and proxy buffering | `aspnet-core.response-body-shapes-and-streaming-output` | `aspnet-core` | `../_knowledge/aspnet-core/response-body-shapes-and-streaming-output.md` | MERGED |
| SSE field framing, multiline data, heartbeat comments, bounded catch-up, Last-Event-ID resume, flush, and disconnect cancellation | `http.sse-event-stream-reconnection` | `http` | `../_knowledge/http/sse-event-stream-reconnection.md` | MERGED |
| EventSource named events, lifecycle states, automatic reconnect, React cleanup, cookie credentials, and bearer-header boundary | `javascript.eventsource-client-lifecycle` | `javascript` | `../_knowledge/javascript/eventsource-client-lifecycle.md` | MERGED |
| Boundary reviews, coverage audits, ledgers, manifests, and restoration bookkeeping | - | - | - | NON_LEARNING |
| Source assets, contact sheets, duplicate fragments, and repetition prompts | - | - | - | NON_LEARNING |

## Boundary decisions

- Byte/object/memory semantics and database-backed async enumeration each have independent learning models.
- Wire-format and SSE/browser claims extend existing canonical output, protocol, and client-lifecycle units.
- The restored R05 authority physically resolves and is included; no obsolete status claim was used in place of it.

| Status | Count |
|---|---:|
| MAPPED | 3 |
| MERGED | 4 |
| NON_LEARNING | 2 |
| UNRESOLVED | 0 |

Total mapping rows: 9

Distinct Knowledge IDs: 6 (2 new, 4 existing)
