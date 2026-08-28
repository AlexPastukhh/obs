# Knowledge Registry

Source workspace: `_ai-conspects/processing data as stream in dif situations, httpclient,endpoint,browser,websockets/`

Authoritative processed source: `regions/full-svg-reconciliation-v002.md`

Original SVG: `source/source-complete-v002.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 short-read loop, zero EOF, `ReadExactly`/`ReadAtLeast`, segmented `PipeReader` and `AdvanceTo(consumed, examined)` | `aspnet-core.request-response-streams-and-pipelines` | `aspnet-core` | `../_knowledge/aspnet-core/request-response-streams-and-pipelines.md` | MAPPED |
| R02 response acquisition versus content-stream failure contracts | `dotnet.httpclient-response-streaming` | `dotnet` | `../_knowledge/dotnet/httpclient-response-streaming.md` | MERGED |
| R02 request-body I/O and abort-cancellation boundary | `aspnet-core.request-response-streams-and-pipelines` | `aspnet-core` | `../_knowledge/aspnet-core/request-response-streams-and-pipelines.md` | MAPPED |
| R03 `ResponseHeadersRead`, direct stream inspection, unchanged forwarding with `CopyToAsync`, zero EOF and buffering boundary | `dotnet.httpclient-response-streaming` | `dotnet` | `../_knowledge/dotnet/httpclient-response-streaming.md` | MERGED |
| R04 response `BodyWriter`, direct span writing, exact `Advance` count and `FlushAsync` | `aspnet-core.request-response-streams-and-pipelines` | `aspnet-core` | `../_knowledge/aspnet-core/request-response-streams-and-pipelines.md` | MAPPED |
| R05 Fetch `ReadableStream`, `Uint8Array` reader loop, stateful UTF-8 decoding and binary boundary | `javascript.text-encoding-and-stream-framing` | `javascript` | `../_knowledge/javascript/text-encoding-and-stream-framing.md` | MERGED |
| R06 WebSocket message versus TCP-stream boundary, server receive fragmentation/`EndOfMessage`, browser complete-message values and application chunk protocol | `http.websocket-message-framing` | `http` | `../_knowledge/http/websocket-message-framing.md` | MAPPED |
| Coverage counts, text/image assignments and reconciliation mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- Request/response pipeline ownership stays framework-specific; `HttpClient` remains a .NET client concern.
- Fetch decoding extends the existing encoding/framing unit because arbitrary chunk boundaries are the same central model.
- WebSocket message framing remains protocol-oriented even though the source demonstrates both browser and .NET APIs.

| Status | Count |
|---|---:|
| MAPPED | 4 |
| MERGED | 3 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
