# Knowledge Registry - ASP.NET Core filters

Workspace: `_ai-conspects/filters/`

## Authoritative source

- Authoritative processed sources: `regions/R01-main-filters-theory-ordering-exception-di-factories.md`, `regions/R02R03-concrete-examples-lower-addendum-final.md`, `NATIVE_CANVAS_TEXT.md`, `FINAL_TRANSCRIPT.md`, `QUESTIONS.md`, and `SOURCE_FIDELITY_AUDIT.md`, as designated by `CURRENT_SOURCE_OF_TRUTH.md`
- Original SVG: `source/filters.svg`
- Git blob: `a5c62548788a9a338b53de87a1f6c04fb7e78e47`
- Coverage: 131/131 image uses, 188/188 physical non-empty SVG text nodes, and 4/4 duplicate placements

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| S-010-S-012, S-017, S-094-S-096 and S-109-S-116: MVC stage sequence, authorization/resource/action/exception/result responsibilities, contexts, short-circuit boundaries, and Minimal API endpoint-filter distinction | `aspnet-core.mvc-filter-pipeline-stages-and-ordering` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-filter-pipeline-stages-and-ordering.md` | MAPPED |
| S-005, S-012, S-017, S-019, S-026, S-034, S-037, S-043 and S-118: stage/scope/`Order` ordering, negative/default values, outer-to-inner before flow, reverse unwind, wrapper order, and class-level `IOrderedFilter` decision | `aspnet-core.mvc-filter-pipeline-stages-and-ordering` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-filter-pipeline-stages-and-ordering.md` | MAPPED |
| S-007, S-015, S-041-S-042 and S-116-S-117: sync versus async interfaces, no `.Result`/`.Wait()`, around-delegate mechanics, short-circuiting, and the concrete `IEndpointFilter` example | `aspnet-core.mvc-filter-pipeline-stages-and-ordering` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-filter-pipeline-stages-and-ordering.md` | MAPPED |
| S-051, S-058, S-066, S-096, S-098, S-101, S-103-S-104, S-106 and S-108: resource filters before binding/after result, expensive work avoided by short-circuit, context limitations, caching, whole-MVC timing, and cleanup | `aspnet-core.mvc-resource-action-and-result-filter-mechanics` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-resource-action-and-result-filter-mechanics.md` | MAPPED |
| S-007, S-015, S-109-S-110: action filters after binding, `ActionArguments`/`ModelState`/controller/result/exception access, short-circuiting, and asynchronous timing example | `aspnet-core.mvc-resource-action-and-result-filter-mechanics` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-resource-action-and-result-filter-mechanics.md` | MAPPED |
| S-003, S-014, S-018, S-024, S-031, S-039, S-044, S-058, S-066 and S-114-S-115: result transformation before `next`, post-execution timing/failure/cancellation/cleanup, `ResultExecutedContext`, response-written limitation, and wrapping example | `aspnet-core.mvc-resource-action-and-result-filter-mechanics` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-resource-action-and-result-filter-mechanics.md` | MAPPED |
| S-021-S-022, S-035-S-036, S-040, S-048, S-050 and S-081: global by-type versus by-instance activation, plain attribute constants, no scoped state capture, and request-service fallback | `aspnet-core.mvc-filter-activation-di-and-factories` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-filter-activation-di-and-factories.md` | MAPPED |
| S-026, S-029, S-034-S-037, S-043, S-061, S-065, S-075, S-086, S-088, S-091, S-093 and S-120: `TypeFilter`, `ServiceFilter`, weakly typed arguments, DI lifetime, wrapper/class order, and custom `IFilterFactory` metadata-plus-service creation | `aspnet-core.mvc-filter-activation-di-and-factories` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-filter-activation-di-and-factories.md` | MAPPED |
| S-001-S-004, S-006, S-010-S-013, S-020, S-025, S-027, S-030-S-032 and S-111-S-112: exception-filter eligible stages, authorization exception boundary, concrete replacement plus handled state, and why numeric 200 cannot restore semantic success | `aspnet-core.mvc-exception-filters-and-error-results` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-exception-filters-and-error-results.md` | MAPPED |
| S-016, S-028, S-046-S-049, S-052-S-057, S-060, S-063, S-067-S-068, S-071-S-080, S-082, S-084-S-085, S-087 and S-089: MVC `ObjectResult`/view/challenge execution, API-versus-view metadata classification, `[Produces]` heuristic, formatters, and unknown-endpoint fallback | `aspnet-core.mvc-exception-filters-and-error-results` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-exception-filters-and-error-results.md` | MAPPED |
| S-008, S-023, S-033, S-038, S-056, S-062, S-064, S-069-S-070, S-083, S-090-S-092 and S-113: expected MVC failure mapping versus global middleware safety net, per-controller policy, validation-not-exception boundary, and generic status failures outside filters | `aspnet-core.mvc-exception-filters-and-error-results` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-exception-filters-and-error-results.md` | MAPPED |
| S-017, S-021-S-023, S-029, S-035-S-036, S-052-S-060, S-064, S-070, S-075, S-077, S-080, S-082-S-083, S-090-S-092 and S-119-S-131: middleware/global/selected-filter coverage and context, layer-selection rules, ordering models, and conventional-middleware scoped-service lifetime | `aspnet-core.mvc-filters-vs-middleware-selection-and-lifetimes` | `aspnet-core` | `../_knowledge/aspnet-core/mvc-filters-vs-middleware-selection-and-lifetimes.md` | MAPPED |
| S-097, S-099-S-100, S-102, S-105 and S-107: global `AutoValidateAntiforgeryToken`, safe-method exclusions, only result-filter always-run interfaces, failure-to-ProblemDetails rewrite, and per-action ignore | `aspnet-core.antiforgery-token-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/antiforgery-token-lifecycle.md` | MERGED |
| S-046-S-049, S-054-S-057, S-060, S-063, S-067, S-071, S-077-S-078 and S-082: endpoint/action metadata timing and controller/API/view classification without blind `ControllerActionDescriptor` casts | `aspnet-core.endpoint-metadata-and-mvc-action-descriptors` | `aspnet-core` | `../_knowledge/aspnet-core/endpoint-metadata-and-mvc-action-descriptors.md` | MERGED |
| S-045, S-053, S-059, S-062, S-064 and S-069-S-070: real MVC `ActionContext`/`ModelState`, automatic `[ApiController]` validation, artificial middleware context, and Problem Details service alternative | `aspnet-core.api-behavior-validation-and-client-errors` | `aspnet-core` | `../_knowledge/aspnet-core/api-behavior-validation-and-client-errors.md` | MERGED |
| S-003, S-028, S-049, S-072-S-073, S-076, S-079, S-084, S-087 and S-089: filter-produced `ObjectResult` through `Accept`, `[Produces]`, JSON/XML formatters and why post-`next` payload replacement is late | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| S-090-S-092: why generic 404/405/401/403/415/406 bodies cannot rely on an MVC filter and belong to Status Code Pages/error middleware | `aspnet-core.status-code-pages-and-problem-details` | `aspnet-core` | `../_knowledge/aspnet-core/status-code-pages-and-problem-details.md` | MERGED |
| S-121-S-126, S-128-S-131: middleware breadth, inbound/unwind ordering, endpoint-metadata timing, conventional construction, and resolving scoped dependencies per request | `aspnet-core.middleware-ordering-short-circuit-and-json` | `aspnet-core` | `../_knowledge/aspnet-core/middleware-ordering-short-circuit-and-json.md` | MERGED |
| S-123 and S-125-S-128: request scope ownership, `RequestServices`, deliberately separate `IServiceScopeFactory` scope, disposal, and scoped-service capture prohibition | `aspnet-core.di-scope-lifetime-and-disposal` | `aspnet-core` | `../_knowledge/aspnet-core/di-scope-lifetime-and-disposal.md` | MERGED |
| S-008, S-023, S-032-S-033, S-038, S-052 and S-113: early exception middleware as app-wide catch-all and MVC-filter boundary, including non-MVC failures | `aspnet-core.exception-middleware-response-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/exception-middleware-response-lifecycle.md` | MERGED |
| Source/coverage manifests, transcript status, apply archive, source-fidelity bookkeeping, and processing-stage transcripts outside the designated final authority chain | - | - | - | NON_LEARNING |
| Repetition question bank (`QUESTIONS.md`) as repetition-layer material; its learning answers are represented by the mapped claim groups | - | - | - | NON_LEARNING |
| Preserved SVG, extracted source images, contact sheets, source ledgers, region plans, and audit assets (`source/`, `data/`, and `audit-assets/`) | - | - | - | NON_LEARNING |

## Boundary decisions

### Five new filter models

The source supports five independent recall models: pipeline/order, resource-action-result mechanics, activation/DI/factories, exception-filter result policy, and middleware-versus-filter selection. Endpoint filters remain in the pipeline unit because the source gives only the related Minimal API boundary and one around-delegate example, not a broader standalone model.

### Existing canonical destinations

Antiforgery always-run handling, endpoint/action metadata classification, automatic ModelState policy, content negotiation, generic status pages, middleware lifetime/order, DI scope ownership, and exception middleware already have canonical semantic destinations. Those units were extended with the source-specific boundaries and provenance rather than duplicated as filter-only units.

### Duplicate placements

The four duplicate canvas placements (S-001/S-111, S-002/S-010, S-006/S-112, and S-009/S-131) corroborate learning claims already routed above. They are consolidated as repeated evidence, not classified as non-learning omissions.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |    12 |
| MERGED       |     8 |
| NON_LEARNING |     3 |
| UNRESOLVED   |     0 |

Total mapping rows: 23
Distinct Knowledge IDs: 13 (5 new + 8 merged into existing)
