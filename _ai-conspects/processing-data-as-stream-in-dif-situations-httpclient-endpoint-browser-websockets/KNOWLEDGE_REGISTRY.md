# Knowledge Registry

Source workspace: `_ai-conspects/processing-data-as-stream-in-dif-situations-httpclient-endpoint-browser-websockets/`

Authoritative processed sources: `regions/PDS01-aspnet-request-body-stream-reading.md` through `regions/PDS04-pipelines-pipereader-pipewriter-sequencereader.md`

Source preservation: regional evidence and materialized source images recorded by the workspace coverage audit

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| PDS01 request-body read loop, zero/end contract, exact returned range, RequestAborted and IO/cancellation failure ownership | `aspnet-core.request-response-streams-and-pipelines` | `aspnet-core` | `../_knowledge/aspnet-core/request-response-streams-and-pipelines.md` | MERGED |
| PDS03 ResponseHeadersRead, ReadAsStreamAsync/CopyToAsync, partial reads, end marker and byte-stream framing boundary | `dotnet.httpclient-response-streaming` | `dotnet` | `../_knowledge/dotnet/httpclient-response-streaming.md` | MERGED |
| PDS02A browser Fetch reader loop, Uint8Array/done contract and arbitrary byte-chunk boundaries | `javascript.text-encoding-and-stream-framing` | `javascript` | `../_knowledge/javascript/text-encoding-and-stream-framing.md` | MERGED |
| PDS02B-PDS02C server EndOfMessage accumulation, browser complete-message delivery and close/close-output/abort lifecycle | `http.websocket-message-framing` | `http` | `../_knowledge/http/websocket-message-framing.md` | MERGED |
| PDS02D split UTF-8 failure, stateful Decoder and Decoder.Convert bytes/chars/completion contract | `dotnet.incremental-text-decoding` | `dotnet` | `../_knowledge/dotnet/incremental-text-decoding.md` | MAPPED |
| PDS04 PipeReader sequence, consumed/examined, delimiter parsing, completion, SequenceReader, PipeWriter flush and error completion | `aspnet-core.request-response-streams-and-pipelines` | `aspnet-core` | `../_knowledge/aspnet-core/request-response-streams-and-pipelines.md` | MERGED |
| Coverage and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 1 |
| MERGED | 5 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
