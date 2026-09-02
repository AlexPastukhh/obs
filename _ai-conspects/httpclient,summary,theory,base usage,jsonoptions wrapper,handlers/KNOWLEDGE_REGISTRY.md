# Knowledge Registry - HttpClient summary, usage, factory, and handlers

Source workspace: `_ai-conspects/httpclient,summary,theory,base usage,jsonoptions wrapper,handlers/`

Authoritative processed sources: all five files under `regions/`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`; final coverage is 229/229 image uses with zero unclosed uses.

Original source identity: `httpclient,summary,theory,base usage,jsonoptions wrapper,handlers.svg` (named by `00-source-check-and-boundary-review.md`; the SVG is not tracked or resolvable from the current branch tree).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Handler substitution, canned responses, request assertions, and testing without a real network | `dotnet.httpclient-testing-with-message-handlers` | `dotnet` | `../_knowledge/dotnet/httpclient-testing-with-message-handlers.md` | MAPPED |
| Delegating handlers as chainable outgoing middleware with a stub primary-handler test seam | `dotnet.httpclient-testing-with-message-handlers` | `dotnet` | `../_knowledge/dotnet/httpclient-testing-with-message-handlers.md` | MAPPED |
| Shortcut methods versus explicit HttpRequestMessage, Accept/Content-Type/q semantics, success checking, and response ownership | `dotnet.httpclient-requests-responses-and-ownership` | `dotnet` | `../_knowledge/dotnet/httpclient-requests-responses-and-ownership.md` | MAPPED |
| Request/content/response disposal timeline and distinction from reusable HttpClient lifetime | `dotnet.httpclient-requests-responses-and-ownership` | `dotnet` | `../_knowledge/dotnet/httpclient-requests-responses-and-ownership.md` | MAPPED |
| DTO/string/byte/stream request representations, including MemoryStream-not-true-streaming boundary | `dotnet.httpclient-request-content-and-representation` | `dotnet` | `../_knowledge/dotnet/httpclient-request-content-and-representation.md` | MERGED |
| ResponseContentRead/ResponseHeadersRead, string cost, stream/file/JSON consumption, and live-response ownership | `dotnet.httpclient-response-streaming` | `dotnet` | `../_knowledge/dotnet/httpclient-response-streaming.md` | MERGED |
| Per-request client/handler creation, pooling, TIME_WAIT/socket pressure, stale DNS, factory pooling, and handler versus connection rotation | `dotnet.httpclientfactory-client-and-handler-lifetimes` | `dotnet` | `../_knowledge/dotnet/httpclientfactory-client-and-handler-lifetimes.md` | MAPPED |
| Named/typed client configuration, domain methods, and canonical manual JsonSerializerOptions wrapper | `dotnet.named-and-typed-httpclient-configuration` | `dotnet` | `../_knowledge/dotnet/named-and-typed-httpclient-configuration.md` | MAPPED |
| Primary transport handler, delegating-handler order, AddHttpClient defaults, and named/typed scoped handler configuration | `dotnet.httpclient-handler-pipelines-and-transport-configuration` | `dotnet` | `../_knowledge/dotnet/httpclient-handler-pipelines-and-transport-configuration.md` | MAPPED |
| Client-wide timeout, linked request/deadline cancellation, and catch-filter cause distinction | `dotnet.cancellation-tokens-linked-sources-and-causes` | `dotnet` | `../_knowledge/dotnet/cancellation-tokens-linked-sources-and-causes.md` | MERGED |
| Boundary reviews, ledgers, coverage correction, audit, manifests, and apply archives | - | - | - | NON_LEARNING |
| Source-image copies, contact sheets, OCR/search gists, and repetition scaffolding | - | - | - | NON_LEARNING |

## Boundary decisions

- Testing, per-operation message ownership, factory lifetimes, named/typed configuration, and handler-pipeline configuration are separate durable models rather than one monolithic HttpClient unit.
- Existing request-content, response-streaming, and cancellation destinations were extended/reused where their central models already existed.
- Exact small-code punctuation remains reviewable in source images; migration preserves verified mechanics without presenting OCR gists as exact source code.

| Status | Count |
|---|---:|
| MAPPED | 7 |
| MERGED | 3 |
| NON_LEARNING | 2 |
| UNRESOLVED | 0 |

Total mapping rows: 12

Distinct Knowledge IDs: 8 (5 new, 3 existing)
