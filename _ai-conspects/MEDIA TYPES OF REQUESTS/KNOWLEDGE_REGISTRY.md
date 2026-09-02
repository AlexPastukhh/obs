# Knowledge Registry

Source workspace: `_ai-conspects/MEDIA TYPES OF REQUESTS/`

Authoritative processed sources: `regions/MEDIA-R01-content-type-accept-media-type-basics.md`, `regions/MEDIA-R02-json-body-frombody-input-formatters.md`, `regions/MEDIA-R03-form-urlencoded-multipart-fromform-files.md`, and `regions/MEDIA-R04-endpoints-consumes-produces-errors.md`; completion certified by `CURRENT_SOURCE_OF_TRUTH.md` and `04-closure-audit.md`.

Original source identity: `MEDIA TYPES OF REQUESTS.svg` (named by `01-stage0-boundary-review.md`; not physically resolvable in the current workspace/branch).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Form-urlencoded versus multipart selection, form binding, boundaries, IFormFile, multiple files, JSON-plus-file shape, client boundary generation, and upload size/storage/security concerns (R01 S-001–S-002, S-006, S-008, S-011–S-012; R02 S-014, S-019, S-022; R03 S-025–S-036) | `aspnet-core.form-and-multipart-request-binding` | `aspnet-core` | `../_knowledge/aspnet-core/form-and-multipart-request-binding.md` | MAPPED |
| Raw octet-stream selection, direct Request.Body streaming, custom formatter/binder boundary, manual Content-Type checks, 415 timing, and buffered byte-array limits (R01 S-003–S-004, S-007, S-009–S-010; R02 S-013, S-015, S-017–S-018, S-020–S-021, S-023–S-024) | `aspnet-core.request-body-binding-raw-access-and-replay-buffering` | `aspnet-core` | `../_knowledge/aspnet-core/request-body-binding-raw-access-and-replay-buffering.md` | MERGED |
| HttpClient FormUrlEncodedContent construction and automatic form media type (R02 S-016) | `dotnet.httpclient-request-content-and-representation` | `dotnet` | `../_knowledge/dotnet/httpclient-request-content-and-representation.md` | MERGED |
| File/stream response with application/octet-stream and download filename (R01 S-005) | `aspnet-core.response-body-shapes-and-streaming-output` | `aspnet-core` | `../_knowledge/aspnet-core/response-body-shapes-and-streaming-output.md` | MERGED |
| Consumes/Produces direction, 415/406/400 distinctions, OpenAPI, endpoint separation, debugging mismatches, minimal-API metadata, and the complete binding/negotiation model (R04 S-037–S-049) | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| Boundary plans, inventories, contact sheets, evidence ledgers, archive instructions, and closure-audit mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- Form and multipart binding receives an independent unit because its boundary/file/security mechanics form one durable request model not fully represented by existing units.
- Raw-body, HttpClient request-content, response-body, and formatter/negotiation claims extend existing central models and are therefore MERGED with exact source blocks.
- Processing metadata is excluded; all 49 verified source transcripts are represented exactly once across the five learning destinations.

| Status | Count |
|---|---:|
| MAPPED | 1 |
| MERGED | 4 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
