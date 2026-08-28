# Knowledge Registry

Source workspace: `_ai-conspects/EXCEPTIONHANDLERS/`

Authoritative processed sources: `04-stage4-corrected-source-preserving-transcript.md`; `CURRENT_SOURCE_OF_TRUTH.md`; `03-closure-audit.md`

Provenance note: the current SOT reports 24 source image uses, 24 near-literal source blocks, and 0 uncovered source uses. It also says preserved source images remain authoritative for cropped/ambiguous punctuation, but `_ai-conspects/EXCEPTIONHANDLERS/source/` is not physically resolvable on the current branch. This is retained as a provenance inconsistency rather than an unresolved learning claim because the corrected transcript closes all 24 source blocks.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| S-001/S-002: development versus production exception middleware branch, custom `UseExceptionHandler` callback, `HasStarted` guard, manual ProblemDetailsFactory flow, safe production detail, traceId extension, response clear/status/content-type/write sequence | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MAPPED |
| S-003/S-004: `HttpContext.Features`, `IExceptionHandlerFeature.Error`, original exception retrieval, and original-path context | `aspnet-core.exception-handler-features` | `aspnet-core` | `../_knowledge/aspnet-core/exception-handler-features.md` | MERGED |
| S-005/S-006: exact meaning of `Response.HasStarted`, unsafe status/header/body replacement after response start, streaming/BodyWriter/earlier-write examples, and log/abort/no-further-write fallback boundary | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MAPPED |
| S-007: middleware ordering limits which exceptions are inside `UseExceptionHandler`; detection after response start does not imply safe response replacement; cropped content remains excluded | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MAPPED |
| S-008: mapping expected exception categories such as not-found/domain-validation to stable non-500 API statuses while preserving 500 as the unknown-failure default | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MAPPED |
| S-009/S-010: factory-versus-service responsibilities, caller-owned `HasStarted` guard, `ProblemDetailsContext` construction, and `TryWriteAsync` invocation | `aspnet-core.problem-details-writers-context-and-metadata` | `aspnet-core` | `../_knowledge/aspnet-core/problem-details-writers-context-and-metadata.md` | MAPPED |
| S-011/S-012: `TryWriteAsync` true/false meaning, writer-decline/content-negotiation behavior, and deliberate plain-text fallback when no writer handles the response | `aspnet-core.problem-details-writers-context-and-metadata` | `aspnet-core` | `../_knowledge/aspnet-core/problem-details-writers-context-and-metadata.md` | MAPPED |
| S-013/S-014: response clearing before replacement and explicit fact that `ProblemDetailsService` itself does not guard `HasStarted`; it validates context and iterates writers | `aspnet-core.problem-details-writers-context-and-metadata` | `aspnet-core` | `../_knowledge/aspnet-core/problem-details-writers-context-and-metadata.md` | MAPPED |
| S-015: `IProblemDetailsService` delegates to registered `IProblemDetailsWriter` instances; default JSON writer negotiation/defaults/traceId/customization/problem+json behavior | `aspnet-core.problem-details-writers-context-and-metadata` | `aspnet-core` | `../_knowledge/aspnet-core/problem-details-writers-context-and-metadata.md` | MAPPED |
| S-016/S-017/S-018: `ProblemDetailsContext` fields including `Exception` and `AdditionalMetadata`, endpoint metadata availability, writer access to failure+endpoint context, and boolean fallback pattern | `aspnet-core.problem-details-writers-context-and-metadata` | `aspnet-core` | `../_knowledge/aspnet-core/problem-details-writers-context-and-metadata.md` | MAPPED |
| S-019/S-020/S-021: marker-metadata `CanWrite` selection, exception/endpoint enrichment, method/class marker targets, and JSON writer completion | `aspnet-core.problem-details-writers-context-and-metadata` | `aspnet-core` | `../_knowledge/aspnet-core/problem-details-writers-context-and-metadata.md` | MAPPED |
| S-022: endpoint-level opt-in custom-writer purpose, diagnostic extensions, and production exposure caveat | `aspnet-core.problem-details-writers-context-and-metadata` | `aspnet-core` | `../_knowledge/aspnet-core/problem-details-writers-context-and-metadata.md` | MAPPED |
| S-023: `AddProblemDetails` registration, built-in `UseExceptionHandler()` flow through `IProblemDetailsService`, `CustomizeProblemDetails` participation, manual-handler bypass, and response-start boundary | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MAPPED |
| S-024: typical safe generic 500 ProblemDetails fields for unhandled exceptions and application-controlled status/detail/extensions customization | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MAPPED |
| Corrected-transcript supersession metadata, region filename compatibility note, coverage counts, recall-question bookkeeping, screenshot artifact cleanup, and crop provenance | — | — | — | NON_LEARNING |

## Boundary decisions

- No new topic is introduced. All durable material belongs to the existing `aspnet-core` topic.
- S-003/S-004 are not duplicated into a new unit because their durable feature-bag/original-exception/original-path model is already represented by `aspnet-core.exception-handler-features`; this source group is therefore `MERGED`.
- S-001/S-002/S-005..S-008/S-023/S-024 form one exception-middleware lifecycle unit: middleware placement, response-start boundary, response replacement, status mapping, and default-versus-manual Problem Details output are one error-response control flow.
- S-009..S-022 form one writer/context/metadata unit. Factory/service/writer responsibilities, writer selection, negotiation fallback, enriched `ProblemDetailsContext`, and metadata-selected custom writers are one pluggable output model.
- `aspnet-core.status-code-pages-and-problem-details` already covers the specialized bodyless-status middleware path. The new writer unit keeps only the generic writer/context mechanics needed beyond that specialized flow and links back instead of creating a second Status Code Pages explanation.
- The old R03 filename said `local try-catch / domain validation / pitfalls`, but the corrected transcript explicitly declares that semantic scope wrong; the migration follows the corrected S-019..S-024 content instead.
- The missing current `source/` path is a provenance issue only. The SOT reports 24/24 near-literal blocks and 0 uncovered uses, so no learning claim is left `UNRESOLVED`.

| Status | Count |
|---|---:|
| MAPPED | 13 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
