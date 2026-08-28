# Knowledge Registry

Source workspace: `_ai-conspects/primary httphandler optoins, socket/`

Authoritative processed source: `01-final-transcript.md` (identical regional copy: `regions/R01R02R03R04R05-primary-httphandler-options-socket-corrected-final-v002.md`)

Original SVG: `source/primary httphandler optoins, socket.svg`

Evidence and coverage: `data/final-coverage-audit-v002.json`; 108 of 108 screenshot uses and 47 of 47 native SVG labels are closed.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 primary-handler ownership, explicit `ConfigurePrimaryHttpMessageHandler` registration and configuration by stateless/session/integrated/upload client shape | `dotnet.sockets-http-handler-connection-pooling-and-proxies` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-connection-pooling-and-proxies.md` | MAPPED |
| R01 redirect inspection, automatic-follow limit and redirect-loop boundary | `dotnet.sockets-http-handler-response-upload-and-tls-options` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-response-upload-and-tls-options.md` | MAPPED |
| R01 response `AutomaticDecompression` methods and request-compression distinction | `dotnet.sockets-http-handler-response-upload-and-tls-options` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-response-upload-and-tls-options.md` | MAPPED |
| R01 response-versus-request content-coding direction and decoded application bytes | `http.content-coding-direction-and-negotiation` | `http` | `../_knowledge/http/content-coding-direction-and-negotiation.md` | MERGED |
| R01-R02 `UseCookies`, automatic request/response jar flow, URI attributes and manual `CookieContainer` insertion | `dotnet.sockets-http-handler-cookies-and-credentials` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-cookies-and-credentials.md` | MAPPED |
| R02 factory-pooled handler cookie sharing/recycling risks and one-handler/one-jar/one-session ownership | `dotnet.sockets-http-handler-cookies-and-credentials` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-cookies-and-credentials.md` | MAPPED |
| R02-R03 `ICredentials`, Basic and Windows integrated mechanisms, process identity, URI-prefix/scheme `CredentialCache` and bounded `PreAuthenticate` behavior | `dotnet.sockets-http-handler-cookies-and-credentials` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-cookies-and-credentials.md` | MAPPED |
| R03 Basic/Base64/HTTPS and Basic-versus-Bearer credential transport distinction | `http.authentication-headers` | `http` | `../_knowledge/http/authentication-headers.md` | MERGED |
| R03 application-owned bearer/JWT acquisition, attachment, refresh/retry and service-process-versus-end-user identity boundary | `dotnet.sockets-http-handler-cookies-and-credentials` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-cookies-and-credentials.md` | MAPPED |
| R03 `UseProxy`, explicit/system proxy selection, destination-versus-proxy credentials and auto-detection latency | `dotnet.sockets-http-handler-connection-pooling-and-proxies` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-connection-pooling-and-proxies.md` | MAPPED |
| R04 connection establishment timeout, pool lifetime/DNS refresh, idle cleanup and traffic-dependent tuning | `dotnet.sockets-http-handler-connection-pooling-and-proxies` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-connection-pooling-and-proxies.md` | MAPPED |
| R04 `MaxConnectionsPerServer`, HTTP/1.1 versus HTTP/2 behavior and connection-limit-versus-request-admission distinction | `dotnet.sockets-http-handler-connection-pooling-and-proxies` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-connection-pooling-and-proxies.md` | MAPPED |
| R05 `Expect: 100-continue` decision timeline, bounded wait and large-rejectable-body use case | `dotnet.sockets-http-handler-response-upload-and-tls-options` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-response-upload-and-tls-options.md` | MAPPED |
| R05 `SslOptions`, client/protocol/certificate-validation ownership and production callback safety | `dotnet.sockets-http-handler-response-upload-and-tls-options` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-response-upload-and-tls-options.md` | MAPPED |
| R05 `HttpClientHandler` compatibility examples versus configuring the effective primary transport handler | `dotnet.sockets-http-handler-connection-pooling-and-proxies` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-connection-pooling-and-proxies.md` | MAPPED |
| R05 browser WebSocket constructor/subprotocol boundary versus unavailable .NET handler, certificate and arbitrary-header control | `dotnet.sockets-http-handler-response-upload-and-tls-options` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-response-upload-and-tls-options.md` | MAPPED |
| Screenshot recovery history, corrected coverage totals and processing evidence | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Cookie-session ownership and challenge-aware destination credentials share one handler-state unit; bearer/JWT acquisition remains explicitly application-owned.
- Proxy selection, connection establishment, pool recycling and connection limits form the connection-lifetime unit.
- Redirect/decompression response behavior, the `100-continue` upload handshake and TLS/browser-client boundaries form the per-transfer transport-policy unit.
- High-level content-coding and authentication-header claims merge into their existing HTTP units rather than being duplicated as new protocol units.

| Status | Count |
|---|---:|
| MAPPED | 14 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

