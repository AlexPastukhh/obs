# Knowledge Registry

Source workspace: `_ai-conspects/working with bytes, streams to bytes, to array readexactly,readatleast/`

Authoritative processed sources:
- `regions/BYTES-R01-stream-to-byte-array-toarray-readasbytearray.md`
- `regions/BYTES-R02-readasync-partial-reads-compact-helpers.md`
- `regions/BYTES-R03-readatleast-readexactly-fixed-size-reads.md`
- closure evidence: `04-closure-audit.md`
- authority/status: `CURRENT_SOURCE_OF_TRUTH.md`

Original SVG identity: `working with bytes, streams to bytes, to array readexactly,readatleast.svg`. The Stage0 owner establishes this filename; the exact repository path is not established by the checked owner files, so no path is invented.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 decision map: whole-content materialization versus progressive streaming versus fixed-size reading | `dotnet.stream-whole-content-buffering-and-byte-arrays` | `dotnet` | `../_knowledge/dotnet/stream-whole-content-buffering-and-byte-arrays.md` | MAPPED |
| R01 general Stream→byte[] mechanics: CopyTo/CopyToAsync into MemoryStream, ToArray copy semantics, GetBuffer extra capacity, no universal Stream.ToArray | `dotnet.stream-whole-content-buffering-and-byte-arrays` | `dotnet` | `../_knowledge/dotnet/stream-whole-content-buffering-and-byte-arrays.md` | MAPPED |
| R01 whole-body safety and HttpContent ReadAsByteArrayAsync: complete in-memory result, suitable for small/bounded payloads, poor default for large/untrusted bodies | `dotnet.stream-whole-content-buffering-and-byte-arrays` | `dotnet` | `../_knowledge/dotnet/stream-whole-content-buffering-and-byte-arrays.md` | MAPPED |
| R01 byte container distinction: byte[] ownership, Memory/Span views, MemoryStream as in-memory stream abstraction | `dotnet.stream-whole-content-buffering-and-byte-arrays` | `dotnet` | `../_knowledge/dotnet/stream-whole-content-buffering-and-byte-arrays.md` | MAPPED |
| R01 progressive cases: stream-to-stream copy, file/storage forwarding, hashing/custom parsing, and processing chunks instead of retaining the full body | `dotnet.stream-partial-reads-and-bounded-loops` | `dotnet` | `../_knowledge/dotnet/stream-partial-reads-and-bounded-loops.md` | MAPPED |
| R01 fixed-read boundary: ReadExactly is for known mandatory segments, not arbitrary unknown whole bodies; chunked ReadAsync is for processing as bytes arrive | `dotnet.stream-readexactly-readatleast-fixed-count-reads` | `dotnet` | `../_knowledge/dotnet/stream-readexactly-readatleast-fixed-count-reads.md` | MAPPED |
| R02 Read/ReadAsync contract: valid partial reads, zero as EOF in read-until-EOF flow, repeated reads, processing only actual count, filling remaining slices | `dotnet.stream-partial-reads-and-bounded-loops` | `dotnet` | `../_knowledge/dotnet/stream-partial-reads-and-bounded-loops.md` | MAPPED |
| R02 bounded-helper and storage rules: whole-read helpers need maximum sizes; MemoryStream is optional; disk/pipes/progressive handling can own large content | `dotnet.stream-partial-reads-and-bounded-loops` | `dotnet` | `../_knowledge/dotnet/stream-partial-reads-and-bounded-loops.md` | MAPPED |
| R02 pipeline-layer nuance: request/response/middleware/high-level APIs can have different buffering behavior; adding a manual loop does not undo earlier buffering | `dotnet.stream-partial-reads-and-bounded-loops` | `dotnet` | `../_knowledge/dotnet/stream-partial-reads-and-bounded-loops.md` | MAPPED |
| R02 helper distinction: MemoryStream accumulates bytes; ReadExactly/ReadAtLeast guarantee counts; ReadAsByteArrayAsync is whole-content buffering rather than fixed-count reading | `dotnet.stream-readexactly-readatleast-fixed-count-reads` | `dotnet` | `../_knowledge/dotnet/stream-readexactly-readatleast-fixed-count-reads.md` | MAPPED |
| R03 ReadExactly semantics: fill required fixed-size destination or fail on early EOF; binary header/prefix/protocol/file-format use cases; helper hides repeated reads | `dotnet.stream-readexactly-readatleast-fixed-count-reads` | `dotnet` | `../_knowledge/dotnet/stream-readexactly-readatleast-fixed-count-reads.md` | MAPPED |
| R03 ReadAtLeast semantics: minimum count, possible extra bytes, returned actual count, throwOnEndOfStream behavior and early-EOF distinction | `dotnet.stream-readexactly-readatleast-fixed-count-reads` | `dotnet` | `../_knowledge/dotnet/stream-readexactly-readatleast-fixed-count-reads.md` | MAPPED |
| R03 count/slice/protocol mechanics: count is not end index, exact slices bound writes, header→decode length/type→validate max→read/stream payload, weakest matching helper | `dotnet.stream-readexactly-readatleast-fixed-count-reads` | `dotnet` | `../_knowledge/dotnet/stream-readexactly-readatleast-fixed-count-reads.md` | MAPPED |
| Coverage inventories, source IDs/image-use bookkeeping, contact-sheet/precision notes, stage/archive workflow and closure metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- The three source regions become three durable units because they represent different responsibilities: whole-content materialization, ordinary partial-read/bounded-loop behavior, and fixed/minimum count guarantees.
- R01/R02 comparisons involving `ReadExactly`/`ReadAtLeast` route to the fixed-count unit rather than being duplicated in the buffering/loop units.
- HTTP-specific examples remain examples inside the generic Stream decision model; detailed HttpClient completion/buffering lifecycle stays owned by `dotnet.httpclient-response-streaming`.
- `byte[]` versus `Memory`/`Span` appears only to explain storage role in this Stream workflow; general ref/view lifetime mechanics remain owned by `dotnet.span-memory-and-ref-safety`.
- No `MERGED` status is claimed: the existing related units overlap contextually but do not already contain the complete Stream models extracted here.
- Exact C# punctuation is not upgraded beyond the authoritative semantic transcript. Preserved Stage0 PNGs remain the source for a future precision patch.

| Status | Count |
|---|---:|
| MAPPED | 13 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
