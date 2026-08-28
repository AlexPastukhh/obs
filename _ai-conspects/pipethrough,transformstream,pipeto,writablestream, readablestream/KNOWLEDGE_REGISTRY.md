# Knowledge Registry

Source workspace: `_ai-conspects/pipethrough,transformstream,pipeto,writablestream, readablestream/`

Authoritative processed sources: `07-full-combined-final-transcript.md`; `08-full-conspect-final-coverage-audit.md`

Original SVG: `source/pipethrough,transformstream,pipeto,writablestream, readablestream.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01: Fetch `response.body` as chunked `ReadableStream`; `getReader()` locking; `read()` returning `{ value, done }`; async iteration with `for await...of`; single-consumption boundary | `javascript.readable-stream-consumption-and-tee` | `javascript` | `../_knowledge/javascript/readable-stream-consumption-and-tee.md` | MAPPED |
| R01: `tee()` creates two logical branches over one underlying source; faster branch can drive progress while slower-branch data buffers; useful for moderate dual-consumption but not free replay | `javascript.readable-stream-consumption-and-tee` | `javascript` | `../_knowledge/javascript/readable-stream-consumption-and-tee.md` | MAPPED |
| R01/R03: underlying-source `start`, `pull`, `cancel`; controller `enqueue`, `close`, `error`; eager versus demand-driven production; queue/high-water-mark demand and `desiredSize`; no enqueue after terminal state | `javascript.readable-stream-producers-backpressure-and-cancellation` | `javascript` | `../_knowledge/javascript/readable-stream-producers-backpressure-and-cancellation.md` | MAPPED |
| R01/R03: streaming Fetch request body with `duplex: "half"` in the represented browser model; server still receives ordinary request-body bytes; stream backpressure does not guarantee zero buffering or packet-per-pull behavior | `javascript.readable-stream-producers-backpressure-and-cancellation` | `javascript` | `../_knowledge/javascript/readable-stream-producers-backpressure-and-cancellation.md` | MAPPED |
| R03: consumer cancellation must reverse producer setup; an owned async iterator should receive `iterator.return()` so cleanup/finally can run; same cleanup principle for timers, readers, sockets, subscriptions, workers and listeners | `javascript.readable-stream-producers-backpressure-and-cancellation` | `javascript` | `../_knowledge/javascript/readable-stream-producers-backpressure-and-cancellation.md` | MAPPED |
| R02: streaming mainly lowers peak live memory rather than necessarily lifetime allocations; strongest benefit when source production itself is incremental; already-materialized giant objects retain their original memory cost | `javascript.incremental-streaming-and-ndjson` | `javascript` | `../_knowledge/javascript/incremental-streaming-and-ndjson.md` | MAPPED |
| R02: NDJSON one-value-per-line framing; independent serialization; async iterable production; receiver must buffer incomplete lines because transport chunks do not equal records; later layers may still buffer | `javascript.incremental-streaming-and-ndjson` | `javascript` | `../_knowledge/javascript/incremental-streaming-and-ndjson.md` | MAPPED |
| R04: `TextDecoderStream` converts byte chunks to text while preserving decoder state; decoded chunks remain arbitrary; manual streaming decode alternative; framing and final incomplete-message handling remain separate | `javascript.text-encoding-and-stream-framing` | `javascript` | `../_knowledge/javascript/text-encoding-and-stream-framing.md` | MERGED |
| R05: `pipeThrough()` composition; writable/readable transform sides; `transform` zero/one/many output cardinality; bounded partial-frame buffering; `flush`; error/lifecycle propagation; input/output chunk-type contract | `javascript.transformstream-pipelines-and-flush` | `javascript` | `../_knowledge/javascript/transformstream-pipelines-and-flush.md` | MAPPED |
| R06: `pipeTo()` as terminal sink returning a completion promise; `WritableStream` `write`/`close`/`abort`; `getWriter()`; declarative pipe versus manual reader tradeoffs; sink examples and cleanup rules | `javascript.writablestream-pipeto-and-sink-lifecycle` | `javascript` | `../_knowledge/javascript/writablestream-pipeto-and-sink-lifecycle.md` | MAPPED |
| R06: File System Access `createWritable()` as a concrete sink; direct response-body piping; file-oriented write/seek/truncate operations; final close/commit and browser permission/support boundary | `javascript.file-system-access-save-and-streaming` | `javascript` | `../_knowledge/javascript/file-system-access-save-and-streaming.md` | MERGED |
| Coverage counts, image/text ledgers, region inventory, and final processing/audit bookkeeping | — | — | — | NON_LEARNING |

## Boundary decisions

- R01 was split by model: consumer/branching behavior goes to `readable-stream-consumption-and-tee`, while producer callbacks, request-body production, backpressure, and cancellation are consolidated with the richer R03 treatment.
- R02 remains its own unit because its central model is the memory/framing consequence of incremental production, not stream API mechanics.
- R04 is not duplicated as a new decoder unit: its decoder/framing claims already belong to `javascript.text-encoding-and-stream-framing`; that unit is extended with this workspace's provenance and final-frame caveat.
- R05 becomes a TransformStream composition unit. The line-splitting example is retained because it demonstrates zero/one/many cardinality, bounded state, and `flush`.
- R06 is split between general `WritableStream`/`pipeTo` lifecycle and the already-existing File System Access unit. File-specific write/seek/truncate and direct piping claims are merged there.
- No claim is promoted from processing inventories or screenshots directly; all learning mappings use the authoritative combined transcript.

| Status | Count |
|---|---:|
| MAPPED | 9 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
