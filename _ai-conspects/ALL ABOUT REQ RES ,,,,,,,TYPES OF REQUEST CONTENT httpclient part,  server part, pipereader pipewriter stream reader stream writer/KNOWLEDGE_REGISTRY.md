# Knowledge Registry

Source workspace: `_ai-conspects/ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer/`

Authoritative processed sources: `14-full-transcript.md`; `15-coverage-audit.md`; `CURRENT_SOURCE_OF_TRUTH.md`

Exact source: `source/ALL ABOUT REQ RES ,,,,,,,TYPES OF REQUEST CONTENT httpclient part,  server part, pipereader pipewriter stream reader stream writer.svg` is present on the checked branch. The SOT and closure audit report 475/475 non-empty SVG text elements, 405/405 embedded image definitions, 426/426 screenshot uses, 13/13 regions, and 0 remaining text/image uses.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: HttpContent/body-header ownership; JsonContent, StringContent, ByteArrayContent, StreamContent, form-url-encoded and multipart selection; representation and stream-ownership costs | `dotnet.httpclient-request-content-and-representation` | `dotnet` | `../_knowledge/dotnet/httpclient-request-content-and-representation.md` | MAPPED |
| R02: JSON construction paths; known/unknown byte length; exact Content-Length requirement; HTTP/1.1 chunked framing; compression versus transfer framing | `dotnet.httpclient-body-length-framing-and-compression` | `dotnet` | `../_knowledge/dotnet/httpclient-body-length-framing-and-compression.md` | MAPPED |
| R03: ResponseContentRead versus ResponseHeadersRead, full-string versus stream deserialization, file copy, incremental JSON arrays, disposal and connection occupation | `dotnet.httpclient-response-streaming` | `dotnet` | `../_knowledge/dotnet/httpclient-response-streaming.md` | MERGED |
| R04 response side: headers-read completion, later materializing APIs, body-stage failure/cancellation, decompression layering | `dotnet.httpclient-response-streaming`; `http.content-coding-direction-and-negotiation` | `dotnet`; `http` | existing units | MERGED |
| R04 request side: one-shot request bodies, fresh request/source per retry, replayable byte buffering, retry ownership | `dotnet.httpclient-request-replayability-and-retries` | `dotnet` | `../_knowledge/dotnet/httpclient-request-replayability-and-retries.md` | MAPPED |
| R04 server replay: `EnableBuffering`, reset position, memory/disk replay cost | `aspnet-core.request-body-binding-raw-access-and-replay-buffering` | `aspnet-core` | `../_knowledge/aspnet-core/request-body-binding-raw-access-and-replay-buffering.md` | MAPPED |
| R05: Base64-in-JSON representation/cost and multipart/raw-file alternatives | `dotnet.httpclient-request-content-and-representation` | `dotnet` | `../_knowledge/dotnet/httpclient-request-content-and-representation.md` | MAPPED |
| R06: ASP.NET Core JSON/raw/text/NDJSON/SSE/IAsyncEnumerable output choices and custom binary/Utf8JsonWriter boundary | `aspnet-core.response-body-shapes-and-streaming-output` | `aspnet-core` | `../_knowledge/aspnet-core/response-body-shapes-and-streaming-output.md` | MAPPED |
| R06 low-level BodyWriter Advance/Flush ownership basics | `aspnet-core.request-response-streams-and-pipelines`; `dotnet.pipewriter-buffer-advance-flush-and-batching` | `aspnet-core`; `dotnet` | existing ASP.NET unit + new generic PipeWriter unit | MERGED |
| R07: model-binding versus raw-body memory model, direct copy/progressive parsing/selective processing, Body versus BodyReader, request ownership | `aspnet-core.request-body-binding-raw-access-and-replay-buffering` | `aspnet-core` | `../_knowledge/aspnet-core/request-body-binding-raw-access-and-replay-buffering.md` | MAPPED |
| R07 basic PipeReader loop and existing request-stream short-read contract | `aspnet-core.request-response-streams-and-pipelines` | `aspnet-core` | `../_knowledge/aspnet-core/request-response-streams-and-pipelines.md` | MERGED |
| R08: StreamReader decoding layers, constructors/ownership, Read/Peek/ReadAsync/ReadBlockAsync/lines/ReadToEnd, BaseStream and DiscardBufferedData | `dotnet.streamreader-decoding-buffering-and-read-contracts` | `dotnet` | `../_knowledge/dotnet/streamreader-decoding-buffering-and-read-contracts.md` | MAPPED |
| R09: StreamWriter encoding/buffering, Write/WriteLine, flush, disposal, AutoFlush, BaseStream and ASP.NET abstraction choice | `dotnet.streamwriter-encoding-buffering-and-flush-contracts` | `dotnet` | `../_knowledge/dotnet/streamwriter-encoding-buffering-and-flush-contracts.md` | MAPPED |
| R10: PipeWriter GetSpan/GetMemory ownership, exact Advance, direct encoding/binary framing, FlushResult, batching, cancellation and completion | `dotnet.pipewriter-buffer-advance-flush-and-batching` | `dotnet` | `../_knowledge/dotnet/pipewriter-buffer-advance-flush-and-batching.md` | MAPPED |
| R11/R12: PipeReader ReadResult, segmented ReadOnlySequence, SequencePosition, consumed/examined, delimiter parsing, partial records, copy avoidance and Stream boundary | `dotnet.pipereader-consumed-examined-and-segmented-framing` | `dotnet` | `../_knowledge/dotnet/pipereader-consumed-examined-and-segmented-framing.md` | MAPPED |
| R13: SequenceReader cursor/ref-struct model, segmented lookahead/delimiters, endian reads, snapshot/restore length frames, decode-after-framing and PipeReader integration | `dotnet.sequencereader-segmented-protocol-parsing` | `dotnet` | `../_knowledge/dotnet/sequencereader-segmented-protocol-parsing.md` | MAPPED |
| Coverage ledger, repeated-placement bookkeeping, screenshot/contact-sheet reading notes, question bank, and exact-punctuation/source-authority metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- One workspace is migrated, but region count does not determine unit count. The 13 regions become 10 new units plus merges into existing response-streaming/pipelines/content-coding knowledge.
- R03 is not duplicated because its durable `ResponseContentRead`/`ResponseHeadersRead`, progressive stream, copy, failure, and connection-lifetime model already exists in `dotnet.httpclient-response-streaming`.
- R04 is split by responsibility: response streaming/decompression merges into existing units; request replayability becomes its own .NET unit; ASP.NET request replay buffering joins the request-body unit.
- R06 keeps server response-shape decisions in ASP.NET Core. Generic `PipeWriter` buffer/Advance/Flush mechanics live in .NET and link back to the framework-owned `BodyWriter`.
- R07 keeps ASP.NET model-binding/raw-body ownership separate from generic `PipeReader` parser mechanics.
- R08 and R09 stay separate because reader decoding/read semantics and writer encoding/flush semantics are independently reviewable APIs.
- R11/R12 are one PipeReader framing model; R13 remains a separate SequenceReader cursor/parser model.
- The exact SVG and extracted images are physically present. Transcript semantics are authoritative for migration; the source remains authority for exact overload punctuation/API-version details.

| Status | Count |
|---|---:|
| MAPPED | 11 |
| MERGED | 4 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
