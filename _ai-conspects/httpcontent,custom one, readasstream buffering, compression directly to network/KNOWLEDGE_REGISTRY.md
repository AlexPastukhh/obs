# Knowledge Registry

Source conspect: `_ai-conspects/httpcontent,custom one, readasstream buffering, compression directly to network/`

Authoritative processed source: `FINAL_TRANSCRIPT.md`

Original SVG: `source/httpcontent,custom one, readasstream buffering, compression directly to network.svg`

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| S-002–S-005, S-007, S-009, S-012 — completion options, buffered state, and handler cooperation | `dotnet.httpclient-response-streaming` | `dotnet` | [[../_knowledge/dotnet/httpclient-response-streaming]] | MAPPED |
| S-016–S-020 — default buffered response versus progressive read loop | `dotnet.httpclient-response-streaming` | `dotnet` | [[../_knowledge/dotnet/httpclient-response-streaming]] | MAPPED |
| S-003, S-011, S-014–S-015 — readable-stream creation and explicit buffering | `dotnet.httpcontent-read-stream-buffering` | `dotnet` | [[../_knowledge/dotnet/httpcontent-read-stream-buffering]] | MAPPED |
| S-021–S-026 — buffered and direct-stream custom content implementations | `dotnet.httpcontent-read-stream-buffering` | `dotnet` | [[../_knowledge/dotnet/httpcontent-read-stream-buffering]] | MAPPED |
| S-008 — three distinct meanings of buffering and streaming | `dotnet.httpclient-response-streaming`; `dotnet.httpcontent-read-stream-buffering` | `dotnet` | [[../_knowledge/dotnet/httpclient-response-streaming]]; [[../_knowledge/dotnet/httpcontent-read-stream-buffering]] | MAPPED |
| S-001, S-006, S-010, S-013 — gzip JSON content and direct outbound serialization | `dotnet.streaming-gzip-httpcontent` | `dotnet` | [[../_knowledge/dotnet/streaming-gzip-httpcontent]] | MAPPED |
| Native canvas statements — buffering hooks, direct streams, response streaming, and outgoing compression | all three units above | `dotnet` | [[../_knowledge/dotnet/httpclient-response-streaming]]; [[../_knowledge/dotnet/httpcontent-read-stream-buffering]]; [[../_knowledge/dotnet/streaming-gzip-httpcontent]] | MAPPED |
| `QUESTIONS.md` — recall prompts derived from the mapped transcript | all three units above | `dotnet` | [[../_knowledge/dotnet/httpclient-response-streaming]]; [[../_knowledge/dotnet/httpcontent-read-stream-buffering]]; [[../_knowledge/dotnet/streaming-gzip-httpcontent]] | MAPPED |
| Source-stage counts, blob identity, screenshot/native-text inventory, audit mechanics, and archive instructions | — | — | — | NON_LEARNING |

## Boundary decisions

- Response completion and progressive network consumption form one unit independent of custom content implementation.
- General `HttpContent` readable-stream hooks form a second unit because a direct stream may still be memory-backed and unrelated to network streaming.
- Streaming gzip serialization is separate because its central model is outbound transform-and-write behavior, headers, unknown compressed length, and memory/CPU trade-offs.
- `S-003` and `S-008` support two units because they explicitly connect response state with the general meanings and implementation paths of streaming.
- The existing `http.dotnet-header-representation` unit is related through content headers but is not a semantic duplicate and was not modified.

## Explicit disposition notes

- All S-001–S-026 sections and all 19 native canvas text nodes are represented by the mapped areas above.
- The question bank contains prompts, not additional accepted answers. Its prompts are traceable to the three units, but unsupported answers were not invented during extraction.
- No substantial transcript claim was excluded as disputed, erroneous, or outside the selected unit boundaries.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 8 | All transcript areas, native statements, and derived recall prompts are traceable. |
| MERGED | 0 | Existing units were related but not semantic duplicates. |
| NON_LEARNING | 1 | Source identity, processing, audit, and archive metadata stay in the workspace. |
| UNRESOLVED | 0 | No meaningful source claim remains unclassified. |
