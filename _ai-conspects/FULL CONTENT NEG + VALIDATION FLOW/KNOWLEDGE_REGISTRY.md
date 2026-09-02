# Knowledge Registry - Full content negotiation and validation flow

Workspace: `_ai-conspects/FULL CONTENT NEG + VALIDATION FLOW/`

## Authoritative source

- Exact source: `source/FULL CONTENT NEG + VALIDATION FLOW.svg`
- SHA-256: `ec19eb3acca602fb352a41f961145b2a2d70c464659a1e7565f29b962c334185`
- Git blob: `dfa427de8e3da8b3d37582835d7e000982ab834b`
- Authoritative processed sources: `10-source-and-quality-audit-v002.md`, `11-exact-canvas-text-transcript-v002.md`, `12-screenshot-evidence-cards-v002.md`, `13-corrected-study-transcript-v002.md`, `14-repetition-guide-v002.md`, and `15-corrected-closure-audit-v002.md`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| Request/response representation flow and the malformed-syntax 400 versus valid-unavailable 406/415 boundaries | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| Independent input/output formatter roles, strict `ReturnHttpNotAcceptable`, browser `Accept` policy, and fallback boundary | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| Controller `AddJsonOptions` configuration and System.Text.Json serializer-option boundary | `aspnet-core.system-text-json-configuration` | `aspnet-core` | `../_knowledge/aspnet-core/system-text-json-configuration.md` | MERGED |
| Newtonsoft-specific configuration, explicit XML formatter registration, and actual formatter-family assumptions | `aspnet-core.json-xml-formatters-and-default-order` | `aspnet-core` | `../_knowledge/aspnet-core/json-xml-formatters-and-default-order.md` | MERGED |
| Vendor JSON types belong on the matching formatter; `[Produces]`/`[Consumes]` metadata does not register serialization support | `aspnet-core.semantic-media-types-and-formatter-contracts` | `aspnet-core` | `../_knowledge/aspnet-core/semantic-media-types-and-formatter-contracts.md` | MERGED |
| `[Produces]` response boundary, `[Consumes]` request/action-selection boundary, and the separate formatter-capability gate | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| Problem Details for otherwise bodyless 404/405/406/415 responses, existing-body/`HasStarted` guards, safe guidance, and generic-context limits | `aspnet-core.status-code-pages-and-problem-details` | `aspnet-core` | `../_knowledge/aspnet-core/status-code-pages-and-problem-details.md` | MERGED |
| Development versus production exception handling, `IExceptionHandlerFeature`, safe 500 Problem Details, `Clear`/`HasStarted`, trace IDs, and known-domain mapping | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MERGED |
| Missing, malformed, and valid-but-unsupported `Accept` are separate states; list parsing proves syntax rather than formatter overlap | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| MVC action-filter implementation for malformed `Accept` syntax and a specific `400 ProblemDetails` short-circuit | `aspnet-core.mvc-resource-action-and-result-filter-mechanics` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-resource-action-and-result-filter-mechanics.md` | MERGED |
| Deterministic Accept ranking by q, specificity, server preference, and header order; concrete server representations, wildcard matching, structured outcomes, and HATEOAS flags | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MERGED |
| Body detection beyond `ContentLength`, chunked/HTTP2/HTTP3 framing, `Body.CanRead` limit, failure-stage separation, and replay cost of custom reads | `aspnet-core.request-body-binding-raw-access-and-replay-buffering` | `aspnet-core` | `../_knowledge/aspnet-core/request-body-binding-raw-access-and-replay-buffering.md` | MERGED |
| `IActionConstraint` as candidate selection rather than detailed validation; fail-fast immutable developer configuration, nonthrowing client parsing, no I/O/body parsing, and reuse boundary | `aspnet-core.mvc-action-constraints-selection-and-validation-boundary` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-action-constraints-selection-and-validation-boundary.md` | MAPPED |
| `RequestMatchesAttribute` factory model, ordered method/route/query/header matching, media-type comparison, purpose-specific attribute alternative, and built-in `[Consumes]` preference | `aspnet-core.mvc-action-constraints-selection-and-validation-boundary` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-action-constraints-selection-and-validation-boundary.md` | MAPPED |
| Superseded v001 transcripts, combined transcript, stage archives, apply archives, and prior closure notes | - | - | - | NON_LEARNING |
| Source-quality, manifest, validation, coverage-ledger, and boundary-review records | - | - | - | NON_LEARNING |
| Exact evidence indexes, regional exact-text partitions, repetition material, screenshot assets, and source-preservation data | - | - | - | NON_LEARNING |

## Boundary decisions

### Existing semantic destinations

Formatter configuration, 406/415 directionality, vendor media-type contracts, bodyless status serialization, exception response lifecycle, filter mechanics, request-body replay, and deterministic Accept ranking were already canonicalized. This workspace adds source-supported boundaries and provenance to those units rather than duplicating them.

### New action-constraint unit

MVC action constraints form an independent selection-time model that is not the same as endpoint route constraints or filter activation. The new unit owns candidate removal, developer-versus-client validation, factory reuse, composite request matching, and the boundary where a filter/middleware or built-in `[Consumes]` is preferable.

### Accept selector correction

The existing HTTP negotiation unit is the canonical destination for R04-R05. It now explicitly preserves this workspace's two corrections: a structured result is required to distinguish malformed `400` from unsupported `406`, and the server preference list contains only concrete response media types while wildcards remain client matching rules.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     2 |
| MERGED       |    12 |
| NON_LEARNING |     3 |
| UNRESOLVED   |     0 |

Total mapping rows: 17
Distinct Knowledge IDs: 10 (1 new + 9 merged into existing)
