# Knowledge Registry

Source workspace: `_ai-conspects/websockets/`

Authoritative processed source: `regions/R01R02R03-websockets-corrected-final-v003.md`

Original SVG: `source/websockets.svg`

Evidence and coverage: `data/image-review-ledger-v003.json` and `data/final-coverage-audit-v003.json`; all 207 corrected image uses and all 53 canvas labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01/R02 HTTP upgrade followed by message-oriented full duplex, post-upgrade application envelopes and the absence of per-message HTTP metadata | `http` | `http.websocket-upgrade-subprotocols-and-application-contracts` | `../_knowledge/http/websocket-upgrade-subprotocols-and-application-contracts.md` | MAPPED |
| R01 fragmented `ReceiveAsync` results, `EndOfMessage`, maximum logical size and complete-message UTF-8 decoding | `http` | `http.websocket-message-framing` | `../_knowledge/http/websocket-message-framing.md` | MERGED |
| R01 text/binary dispatch, fragmented `SendAsync` and browser complete-message boundaries | `http` | `http.websocket-message-framing` | `../_knowledge/http/websocket-message-framing.md` | MERGED |
| R01/R02 browser constructor, events, `binaryType`, complete message payloads and connection-state properties | `javascript` | `javascript.websocket-client-lifecycle-backpressure-and-reconnect` | `../_knowledge/javascript/websocket-client-lifecycle-backpressure-and-reconnect.md` | MAPPED |
| R01 React effect-owned socket lifetime, latest-handler refs, cleanup and obsolete reconnect-loop prevention | `react` | `react.use-ref-lifecycle-and-latest-values` | `../_knowledge/react/use-ref-lifecycle-and-latest-values.md` | MERGED |
| R01 ASP.NET Core request validation, `AcceptWebSocketAsync` and endpoint lifetime through the complete connection | `aspnet-core` | `aspnet-core.websocket-endpoint-lifecycle-and-security` | `../_knowledge/aspnet-core/websocket-endpoint-lifecycle-and-security.md` | MAPPED |
| R01 graceful close operations, peer close handling, status codes, bounded reason text and abort boundary | `http` | `http.websocket-message-framing` | `../_knowledge/http/websocket-message-framing.md` | MERGED |
| R01 request cancellation, independently bounded close cleanup and coordinated queue/loop/resource shutdown | `aspnet-core` | `aspnet-core.websocket-endpoint-lifecycle-and-security` | `../_knowledge/aspnet-core/websocket-endpoint-lifecycle-and-security.md` | MAPPED |
| R02 one-active-send/one-active-receive rule, one channel-owned sender and bounded full-mode choice | `dotnet` | `dotnet.channels-producer-consumer-lifecycle` | `../_knowledge/dotnet/channels-producer-consumer-lifecycle.md` | MERGED |
| R02 `ClientWebSocket` connection flow, option categories, state properties and certificate-validation boundary | `dotnet` | `dotnet.clientwebsocket-options-and-connection-state` | `../_knowledge/dotnet/clientwebsocket-options-and-connection-state.md` | MAPPED |
| R02 offered/selected subprotocols, upgrade-only headers and browser arbitrary-header limitation | `http` | `http.websocket-upgrade-subprotocols-and-application-contracts` | `../_knowledge/http/websocket-upgrade-subprotocols-and-application-contracts.md` | MAPPED |
| R02 per-message compression CPU/memory/interoperability tradeoffs and secret/reflected-input side-channel boundary | `http` | `http.websocket-upgrade-subprotocols-and-application-contracts` | `../_knowledge/http/websocket-upgrade-subprotocols-and-application-contracts.md` | MAPPED |
| R03 browser `bufferedAmount`, high/low watermarks and pause/coalesce/drop producer policy | `javascript` | `javascript.websocket-client-lifecycle-backpressure-and-reconnect` | `../_knowledge/javascript/websocket-client-lifecycle-backpressure-and-reconnect.md` | MAPPED |
| R03 local queue progress versus message-ID application acknowledgements and explicit acknowledgement meaning | `http` | `http.websocket-upgrade-subprotocols-and-application-contracts` | `../_knowledge/http/websocket-upgrade-subprotocols-and-application-contracts.md` | MAPPED |
| R03 bounded outbound queues and explicit wait/drop/coalesce/disconnect slow-client behavior | `dotnet` | `dotnet.channels-producer-consumer-lifecycle` | `../_knowledge/dotnet/channels-producer-consumer-lifecycle.md` | MERGED |
| R03 cookie-authenticated upgrade, authorization before acceptance, independent browser `Origin` validation and no ordinary CORS-preflight protection | `aspnet-core` | `aspnet-core.websocket-endpoint-lifecycle-and-security` | `../_knowledge/aspnet-core/websocket-endpoint-lifecycle-and-security.md` | MAPPED |
| R03 path-limited bearer query-token extraction and normal validation/logging safeguards | `aspnet-core` | `aspnet-core.jwt-bearer-event-lifecycle` | `../_knowledge/aspnet-core/jwt-bearer-event-lifecycle.md` | MERGED |
| R03 reconnect backoff/jitter/cancellation, close-cause decisions and non-idempotent replay boundary | `javascript` | `javascript.websocket-client-lifecycle-backpressure-and-reconnect` | `../_knowledge/javascript/websocket-client-lifecycle-backpressure-and-reconnect.md` | MAPPED |
| R03 connection, close, queue and origin diagnostics without secret-bearing logs | `aspnet-core` | `aspnet-core.websocket-endpoint-lifecycle-and-security` | `../_knowledge/aspnet-core/websocket-endpoint-lifecycle-and-security.md` | MAPPED |
| Screenshot/text inventories, recovery history and final coverage audit metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Transport fragmentation and close semantics extend the existing protocol-level framing unit.
- Upgrade/subprotocol/application-envelope contracts remain separate from browser reconnect behavior, .NET client options and ASP.NET Core endpoint security.
- Generic channel producer-consumer mechanics and React latest-ref lifecycle are merged into their existing focused units instead of duplicated.
- Browser WebSocket `Origin` validation is not represented as ordinary CORS or as authentication.

| Status | Count |
|---|---:|
| MAPPED | 12 |
| MERGED | 7 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
