# Knowledge Registry - Fetch, Axios, getReader, and HttpClient comparison

Workspace: `_ai-conspects/FETCH,FETCH AXIOS COMP, getch reader, httpclient comparison/`

## Authoritative source

- Authoritative processed sources: `01-final-transcript.md`, `regions/final-transcript.md`, and `regions/R01R02R03R04-fetch-axios-httpclient-final-v001.md`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`
- Original SVG: `source/FETCH,FETCH AXIOS COMP, getch reader, httpclient comparison.svg`
- Coverage: 107 unique screenshots / 107 placements and 43 native SVG labels, with 0 remaining unclosed uses

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| R01-R02: Fetch is browser-native, resolves at response headers, fulfills for ordinary HTTP error statuses, requires explicit status and representation handling, and exposes the progressive response body | `javascript.fetch-response-contract-and-wrapper-policy` | `javascript` | `../_knowledge/javascript/fetch-response-contract-and-wrapper-policy.md` | MAPPED |
| R01 and R04: a Fetch wrapper supplies base URL, shared headers/auth/credentials, query conventions, error normalization and typed representation helpers while preserving access to the raw `Response` | `javascript.fetch-response-contract-and-wrapper-policy` | `javascript` | `../_knowledge/javascript/fetch-response-contract-and-wrapper-policy.md` | MAPPED |
| R01 and R04: single-flight 401 refresh, retry guard, new authorization on replay, failure policy, timeout/caller-signal composition, and compile-time TypeScript assertions versus runtime validation | `javascript.fetch-response-contract-and-wrapper-policy` | `javascript` | `../_knowledge/javascript/fetch-response-contract-and-wrapper-policy.md` | MAPPED |
| R01: Axios library-level `baseURL`, `params`, headers, credentials, timeout/cancellation, automatic JSON convenience, and default non-2xx rejection comparison | `axios.request-configuration-and-instance-defaults` | `axios` | `../_knowledge/axios/request-configuration-and-instance-defaults.md` | MERGED |
| R01: Axios request/response interceptors, error normalization, and guarded single-flight token refresh and retry | `axios.interceptor-lifecycle-status-and-token-refresh` | `axios` | `../_knowledge/axios/interceptor-lifecycle-status-and-token-refresh.md` | MERGED |
| R01: Axios query serialization conventions and Blob response handling | `axios.files-and-query-serialization` | `axios` | `../_knowledge/axios/files-and-query-serialization.md` | MERGED |
| R01: Axios browser upload/download progress convenience and adapter/runtime-dependent streaming boundary | `axios.adapters-progress-and-streaming` | `axios` | `../_knowledge/axios/adapters-progress-and-streaming.md` | MERGED |
| R01-R02: Fetch header-time completion, `getReader()`/`Uint8Array` consumption, whole-body helpers, progressive download counting, and non-zero-buffering caveat | `javascript.readable-stream-consumption-and-tee` | `javascript` | `../_knowledge/javascript/readable-stream-consumption-and-tee.md` | MERGED |
| R02: one stateful `TextDecoder`, `{ stream: true }`, final flush, arbitrary byte boundaries, and retained framing state | `javascript.text-encoding-and-stream-framing` | `javascript` | `../_knowledge/javascript/text-encoding-and-stream-framing.md` | MERGED |
| R02: NDJSON complete-line parsing with a retained tail versus the non-incremental nature of ordinary whole-document `JSON.parse` | `javascript.incremental-streaming-and-ndjson` | `javascript` | `../_knowledge/javascript/incremental-streaming-and-ndjson.md` | MERGED |
| R02: `ResponseHeadersRead`/`ReadAsStreamAsync`/`StreamReader.ReadLineAsync` comparison with Fetch response/body/decoder framing and whole-body JSON helpers | `dotnet.httpclient-response-streaming` | `dotnet` | `../_knowledge/dotnet/httpclient-response-streaming.md` | MERGED |
| R03-R04: `RequestInit` versus constructed `Request`, second-init overrides, request properties, methods, browser-controlled headers, body representations, credentials, CORS modes, and opaque `no-cors` responses | `javascript.fetch-requestinit-and-request-object` | `javascript` | `../_knowledge/javascript/fetch-requestinit-and-request-object.md` | MAPPED |
| R03-R04: browser cache modes and validators/304, redirect, cancellation, integrity, priority, unload-oriented keepalive, streaming-body duplex, referrer, and `strict-origin-when-cross-origin` | `javascript.fetch-requestinit-and-request-object` | `javascript` | `../_knowledge/javascript/fetch-requestinit-and-request-object.md` | MAPPED |
| R01 and R03: Fetch upload-progress limitation and `ReadableStream` request body with `duplex: "half"`, without a zero-buffering guarantee | `javascript.readable-stream-producers-backpressure-and-cancellation` | `javascript` | `../_knowledge/javascript/readable-stream-producers-backpressure-and-cancellation.md` | MERGED |
| R01: full Blob materialization and browser download handling boundary | `javascript.browser-download-navigation-and-blob-urls` | `javascript` | `../_knowledge/javascript/browser-download-navigation-and-blob-urls.md` | MERGED |
| Source check, manifest, coverage bookkeeping, and processing metadata (`00-source-check-and-boundary-review.md`, `MANIFEST.md`, and `CURRENT_SOURCE_OF_TRUTH.md` status/coverage sections) | - | - | - | NON_LEARNING |
| Preserved SVG, extracted screenshots, source ledgers, coverage data, and audit previews (`source/`, `data/`, and `audit-assets/`) | - | - | - | NON_LEARNING |

## Boundary decisions

### Fetch-specific units

The source contains two independent Fetch models large enough to retain as canonical units. `javascript.fetch-response-contract-and-wrapper-policy` owns response completion/status semantics and application wrapper policy. `javascript.fetch-requestinit-and-request-object` owns browser request construction and the `RequestInit` controls whose meaning depends on credentials, CORS, cache, referrer, unload, and streaming-upload boundaries.

### Existing streaming and Axios destinations

The source's decoder, NDJSON, stream-consumption, request-stream, Blob-download, HttpClient, and Axios claims extend established semantic destinations. They remain MERGED there rather than being repeated in the two Fetch units beyond the comparisons needed to explain Fetch's own contract.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     5 |
| MERGED       |    10 |
| NON_LEARNING |     2 |
| UNRESOLVED   |     0 |

Total mapping rows: 17
Distinct Knowledge IDs: 12 (2 new + 10 merged into existing)
