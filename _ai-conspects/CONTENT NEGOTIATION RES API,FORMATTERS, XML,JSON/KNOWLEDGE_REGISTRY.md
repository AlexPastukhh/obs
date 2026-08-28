# Knowledge Registry

Source workspace: `_ai-conspects/CONTENT NEGOTIATION RES API,FORMATTERS, XML,JSON/`

Authoritative processed source: `01-final-transcript.md` (identical regional copy: `regions/R01R02R03R04-content-negotiation-formatters-final-v001.md`)

Original SVG: `source/CONTENT NEGOTIATION RES API,FORMATTERS, XML,JSON.svg`

Evidence and coverage: `data/final-coverage-audit.json`; 92 of 92 screenshot placements and 73 of 73 native SVG labels are closed, including four duplicate extra placements.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 response `Accept`/output formatter/response `Content-Type` versus request `Content-Type`/input formatter direction and strict 406 policy | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| R01 `System.Text.Json` default, optional Newtonsoft behavior, two XML serializer families and registration examples | `aspnet-core.json-xml-formatters-and-default-order` | `aspnet-core` | `../_knowledge/aspnet-core/json-xml-formatters-and-default-order.md` | MAPPED |
| R01 first-suitable formatter default, registration-order changes, explicit index-zero override and integration-test boundary | `aspnet-core.json-xml-formatters-and-default-order` | `aspnet-core` | `../_knowledge/aspnet-core/json-xml-formatters-and-default-order.md` | MAPPED |
| R02 comma-separated `Accept`, q-values, wildcards and framework-first negotiation | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MERGED |
| R02 single-value `TryParse` versus full-list `TryParseList`, malformed 400 versus unsupported 406 and input-side 415 | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| R02 routing/action execution before result negotiation and possible post-action unsupported-`Accept` detection | `aspnet-core.media-type-formatters-and-406-415` | `aspnet-core` | `../_knowledge/aspnet-core/media-type-formatters-and-406-415.md` | MERGED |
| R02 whole-list custom negotiation, valid alternatives/preferences and no one-hard-coded-type shortcut | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MERGED |
| R02 independent requested-field validation before data shaping | `aspnet-core.dynamic-data-shaping` | `aspnet-core` | `../_knowledge/aspnet-core/dynamic-data-shaping.md` | MERGED |
| R03 JSON-syntax versus plain/HATEOAS semantic representation distinction | `http.hypermedia-links-and-representation-negotiation` | `http` | `../_knowledge/http/hypermedia-links-and-representation-negotiation.md` | MERGED |
| R03 vendor-tree anatomy, semantic subtype detail and exactly one structured `+json` suffix | `aspnet-core.semantic-media-types-and-formatter-contracts` | `aspnet-core` | `../_knowledge/aspnet-core/semantic-media-types-and-formatter-contracts.md` | MAPPED |
| R03 representation-selection example, output `SupportedMediaTypes`, Newtonsoft/System.Text.Json formatter ownership and no-formatter failure | `aspnet-core.semantic-media-types-and-formatter-contracts` | `aspnet-core` | `../_knowledge/aspnet-core/semantic-media-types-and-formatter-contracts.md` | MAPPED |
| R03 `[Produces]` metadata-versus-capability boundary, default JSON and documented schemas/links/version/deprecation semantics | `aspnet-core.semantic-media-types-and-formatter-contracts` | `aspnet-core` | `../_knowledge/aspnet-core/semantic-media-types-and-formatter-contracts.md` | MAPPED |
| R04 semantic request `Content-Type` and separate creation DTO contracts for absent-versus-required fields | `aspnet-core.semantic-media-types-and-formatter-contracts` | `aspnet-core` | `../_knowledge/aspnet-core/semantic-media-types-and-formatter-contracts.md` | MAPPED |
| R04 input `SupportedMediaTypes`, `[Consumes]` metadata/action constraint and formatter-capability boundary | `aspnet-core.semantic-media-types-and-formatter-contracts` | `aspnet-core` | `../_knowledge/aspnet-core/semantic-media-types-and-formatter-contracts.md` | MAPPED |
| R04 one compile-time parameter type and separate action/custom formatter/discriminated model/envelope/manual-deserialization alternatives | `aspnet-core.semantic-media-types-and-formatter-contracts` | `aspnet-core` | `../_knowledge/aspnet-core/semantic-media-types-and-formatter-contracts.md` | MAPPED |
| Screenshot/text inventories, duplicate-placement accounting and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Existing HTTP/ASP.NET Core units already own negotiation ranking, directional 406/415 diagnostics, hypermedia representation semantics and field validation; those claims merge rather than creating duplicate protocol units.
- JSON/XML formatter installation and order form one operational unit.
- Vendor media-type anatomy, formatter capability, endpoint metadata and materially different request/response contracts stay together because all four must agree for semantic media types to work.

| Status | Count |
|---|---:|
| MAPPED | 8 |
| MERGED | 7 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

