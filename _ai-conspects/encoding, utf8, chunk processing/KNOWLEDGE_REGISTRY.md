# Knowledge Registry - Encoding.UTF8 and chunk processing

Workspace: `_ai-conspects/encoding, utf8, chunk processing/`

## Authoritative source

- Authoritative processed source: `regions/full-semantic-transcript-v001.md`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| Encoding purpose, deliberate UTF-8 selection, common complete-value `GetBytes`/`GetString` operations, and other encoding families | `dotnet.encoding-conversion-overloads-and-buffer-sizing` | `dotnet` | `../_knowledge/dotnet/encoding-conversion-overloads-and-buffer-sizing.md` | MAPPED |
| Allocating, indexed-array, span, and `Memory<T>.Span` conversion styles; `GetString` allocation versus caller-owned `GetChars` output | `dotnet.encoding-conversion-overloads-and-buffer-sizing` | `dotnet` | `../_knowledge/dotnet/encoding-conversion-overloads-and-buffer-sizing.md` | MAPPED |
| Exact `GetByteCount`/`GetCharCount`, `GetMaxCharCount` upper bounds, stateful count distinction, writer capacity, and `TryGetBytes` fit handling | `dotnet.encoding-conversion-overloads-and-buffer-sizing` | `dotnet` | `../_knowledge/dotnet/encoding-conversion-overloads-and-buffer-sizing.md` | MAPPED |
| Arbitrary chunk boundaries, unsafe independent `GetString`, one decoder per logical input, and `Reset` boundary | `dotnet.incremental-text-decoding` | `dotnet` | `../_knowledge/dotnet/incremental-text-decoding.md` | MERGED |
| `Decoder.GetChars` versus `Convert`, small-destination behavior, `bytesUsed`, `charsUsed`, `completed`, and progress-loop rules | `dotnet.incremental-text-decoding` | `dotnet` | `../_knowledge/dotnet/incremental-text-decoding.md` | MERGED |
| `flush` semantics, final empty conversion, truncated-input observability, replacement versus exception fallback, strict UTF-8, and data-integrity policy | `dotnet.incremental-text-decoding` | `dotnet` | `../_knowledge/dotnet/incremental-text-decoding.md` | MERGED |
| Reusable stream-decoding loop: persistent state and buffers, exact consumed/produced ranges, EOF finalization, and no silent incomplete suffix | `dotnet.incremental-text-decoding` | `dotnet` | `../_knowledge/dotnet/incremental-text-decoding.md` | MERGED |
| WebSocket fragment decoding with `result.Count`, `EndOfMessage` as flush/dispatch boundary, close handling, cancellation, and clean per-message state | `http.websocket-message-framing` | `http` | `../_knowledge/http/websocket-message-framing.md` | MERGED |
| Stateful `Encoder` for character chunks that can split UTF-16 surrogate pairs, complete-value `GetBytes` boundary, finalization, and encoder fallback | `dotnet.incremental-text-decoding` | `dotnet` | `../_knowledge/dotnet/incremental-text-decoding.md` | MERGED |
| Processing and closure artifacts (00-repo-conspects-check.md, 01-stage0-boundary-review.md, 02-stage1-r01-r03-transcript.md, 03-stage2-r02-transcript.md, 04-closure-audit.md, TRANSCRIPT_REBUILD_AUDIT.md) | - | - | - | NON_LEARNING |
| Repetition material and archive/manifest metadata (QUESTIONS.md, APPLY_ARCHIVE.md, MANIFEST.md) | - | - | - | NON_LEARNING |
| Source-preservation records, secondary regional evidence, and audit assets (regions/ other than the authoritative transcript, audit-assets/, data/) | - | - | - | NON_LEARNING |

## Boundary decisions

### Unit boundaries

The complete-value APIs and destination-sizing choices form one independently reviewable model. Stateful chunk conversion is not duplicated: the existing `dotnet.incremental-text-decoding` unit is extended with the source's full decoder lifecycle, buffer-progress, finalization, fallback, streaming, and encoder-symmetry claims.

### Existing overlap

The existing decoder unit already established that transport chunks are not character boundaries and introduced `Decoder.Convert`; this workspace supplies the missing operational boundaries and provenance, so those rows are MERGED. The WebSocket-specific application of the same rule belongs in the existing framing unit rather than a second WebSocket unit.

### Encoder placement

The encoder material is a compact inverse-boundary claim, not a standalone semantic model: split UTF-16 surrogate pairs require preserved state in the character-to-byte direction. It is retained beside incremental decoding, where the shared logical-input and finalization rules are explicit.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     3 |
| MERGED       |     6 |
| NON_LEARNING |     3 |
| UNRESOLVED   |     0 |

Total mapping rows: 12
Distinct Knowledge IDs: 3 (1 new + 2 merged into existing)
