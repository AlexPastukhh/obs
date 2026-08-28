# Knowledge Registry

Source workspace: `_ai-conspects/axios/`

Authoritative processed sources: `07-full-combined-final-transcript.md`; `08-full-conspect-final-coverage-audit.md`

Original SVG: Stage0 records `source/axios.svg`, but that file is not physically present under `_ai-conspects/axios/source/` on the current branch; the completed transcript and audit are the authoritative processed sources used for this migration.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: final request config is composed from instance defaults, method helpers and per-request options; dedicated instances reduce duplication and avoid unrelated global-default mutation | `axios.request-configuration-and-instance-defaults` | `axios` | `../_knowledge/axios/request-configuration-and-instance-defaults.md` | MAPPED |
| R01: `url`, default GET `method`, helpers, `baseURL`, and `allowAbsoluteUrls` address/method semantics | `axios.request-configuration-and-instance-defaults` | `axios` | `../_knowledge/axios/request-configuration-and-instance-defaults.md` | MAPPED |
| R01/R02: `headers`, Basic-only `auth` and Authorization overwrite caveat, bearer-token placement, `withCredentials` plus CORS, and `xsrfCookieName`/`xsrfHeaderName` browser XSRF configuration | `axios.request-configuration-and-instance-defaults` | `axios` | `../_knowledge/axios/request-configuration-and-instance-defaults.md` | MAPPED |
| R01: `params` versus request-body `data`, ordinary-object JSON serialization, `timeout` including zero, `responseType`, `signal`, and transport-versus-domain-validation boundary | `axios.request-configuration-and-instance-defaults` | `axios` | `../_knowledge/axios/request-configuration-and-instance-defaults.md` | MAPPED |
| R02: `transformRequest` timing, inputs, return role and body-focused uses; `transformResponse` timing, parsing/normalization role and runtime-validation boundary; preservation of Axios default transform chains | `axios.payload-transforms-and-interceptor-boundaries` | `axios` | `../_knowledge/axios/payload-transforms-and-interceptor-boundaries.md` | MAPPED |
| R02: transforms are payload hooks while request/response interceptors are full-pipeline hooks; request interceptors cover GET and cross-cutting policy; Authorization should not live only in `transformRequest` | `axios.payload-transforms-and-interceptor-boundaries` | `axios` | `../_knowledge/axios/payload-transforms-and-interceptor-boundaries.md` | MAPPED |
| R02/R03: AbortController `signal` supersedes CancelToken in the represented model; `onUploadProgress`/`onDownloadProgress` depend on adapter/platform support; totals may be unknown; transport progress is not server-processing completion | `axios.adapters-progress-and-streaming` | `axios` | `../_knowledge/axios/adapters-progress-and-streaming.md` | MAPPED |
| R03: XHR progress uses transferred `loaded` bytes with possibly absent `total`; NDJSON can be parsed from growing response text by tracking consumed text and buffering an incomplete trailing line; this is not a true stream-reader API | `axios.adapters-progress-and-streaming` | `axios` | `../_knowledge/axios/adapters-progress-and-streaming.md` | MAPPED |
| R03: fetch adapter can expose a `ReadableStream`; reader + incremental `TextDecoder` consumption must preserve incomplete NDJSON text between chunks; support varies by runtime and Axios version | `axios.adapters-progress-and-streaming` | `axios` | `../_knowledge/axios/adapters-progress-and-streaming.md` | MAPPED |
| R03: upload/download UI should use percentages only with a usable total; cancellation should stop transfer and later UI updates | `axios.adapters-progress-and-streaming` | `axios` | `../_knowledge/axios/adapters-progress-and-streaming.md` | MAPPED |
| R04: create an `AxiosInstance` and API wrapper to centralize base URL/transport policy; use Axios request/response/error types where needed; wrapper methods keep components away from raw transport config | `axios.typed-client-boundaries` | `axios` | `../_knowledge/axios/typed-client-boundaries.md` | MAPPED |
| R04: Axios generics type expected data only at compile time; request/response types can differ; runtime JSON still needs runtime validation at untrusted boundaries | `axios.typed-client-boundaries` | `axios` | `../_knowledge/axios/typed-client-boundaries.md` | MAPPED |
| R04: inspect response metadata when needed, narrow with `axios.isAxiosError`, distinguish server/network-CORS/setup failures, pass AbortSignal, distinguish timeout from signal, and remember Axios has no default retry; retries require safe/idempotent or explicitly retryable semantics | `axios.typed-client-boundaries` | `axios` | `../_knowledge/axios/typed-client-boundaries.md` | MAPPED |
| R01/R04: `params` serialization must match backend conventions; arrays may use repeated, bracketed, comma-separated or indexed forms; nested formats vary; `paramsSerializer`/`qs` can provide the required representation | `axios.files-and-query-serialization` | `axios` | `../_knowledge/axios/files-and-query-serialization.md` | MAPPED |
| R04: upload files with FormData and let the browser create the multipart boundary; use browser `blob` responses with object-URL creation/revocation for downloads and `arraybuffer` for raw binary manipulation | `axios.files-and-query-serialization` | `axios` | `../_knowledge/axios/files-and-query-serialization.md` | MAPPED |
| R05: interceptor `use` returns an ID; `eject(id)` prevents later executions; repeated registration causes duplicate behavior; React effect cleanup, dependency ownership, stable app registration and test setup/teardown patterns | `axios.interceptor-lifecycle-status-and-token-refresh` | `axios` | `../_knowledge/axios/interceptor-lifecycle-status-and-token-refresh.md` | MAPPED |
| R02/R03/R06: request interceptors must return config or reject; response interceptors preserve/reject the chain; `validateStatus` defines fulfilled versus rejected status handling, so custom 4xx policy changes the response-interceptor branch and central error handling | `axios.interceptor-lifecycle-status-and-token-refresh` | `axios` | `../_knowledge/axios/interceptor-lifecycle-status-and-token-refresh.md` | MAPPED |
| R06: central error handling distinguishes responses from network failures, preserves diagnostics, and must not swallow errors; refresh retry targets intended auth status, uses a private retry flag, avoids a refresh-endpoint loop, rewrites Authorization, and resends the original config | `axios.interceptor-lifecycle-status-and-token-refresh` | `axios` | `../_knowledge/axios/interceptor-lifecycle-status-and-token-refresh.md` | MAPPED |
| R06: concurrent 401s share one refresh promise; clear it in `finally`, store the token before retries, reject waiting requests/logout on refresh failure, preserve cancellation, and do not blindly replay non-idempotent operations | `axios.interceptor-lifecycle-status-and-token-refresh` | `axios` | `../_knowledge/axios/interceptor-lifecycle-status-and-token-refresh.md` | MAPPED |
| Coverage counts, screenshot/text ledgers, regional closure and audit bookkeeping | — | — | — | NON_LEARNING |

## Boundary decisions

- A new `axios` topic is introduced because the durable central models are Axios-specific configuration, adapter, transform, typed-client, and interceptor semantics rather than generic JavaScript transport mechanics.
- R01 stays primarily in the request-configuration unit, while its richer query-serialization mechanics are grouped with file/wire-format concerns.
- R02 is split by model: payload-transform mechanics go to `payload-transforms-and-interceptor-boundaries`; cancellation/progress goes to the adapter unit; `validateStatus` and interceptor branch behavior go to the interceptor lifecycle unit; XSRF option names stay with request configuration.
- R03's XHR/Fetch adapter capabilities remain Axios-specific. Existing generic JavaScript units for XHR, ReadableStream, NDJSON and text framing are related knowledge, not duplicate destination units.
- R04 is split between typed API/wrapper/error/retry boundaries and concrete file/query wire formats.
- R05 and R06 are consolidated because registration ownership, response status routing, error propagation and refresh retry form one interceptor lifecycle.
- Existing generic browser-download and binary-storage units overlap supporting mechanics but do not replace the Axios-specific request/response configuration claims; they are linked as related knowledge instead of creating numbered or duplicate concepts.
- Stage0 records the original SVG identity as `source/axios.svg`, but the current branch workspace does not physically contain that SVG. No learning claim is inferred from the missing SVG; the completed combined transcript and audit remain the authoritative processed sources.

| Status | Count |
|---|---:|
| MAPPED | 19 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
