# Knowledge Registry

Source workspace: `_ai-conspects/qs-preference-with-multiple-accept-header-values-helper/`

Authoritative processed sources: verified R01 through R04 region transcripts; `03-stage3-final-coverage-audit.md` confirms 30/30 image uses. `CURRENT_SOURCE_OF_TRUTH.md` is stale about P02/final audit, while the completed region and audit files are physically present.

Original SVG: `source/qs-preference-with-multiple-accept-header-values-helper.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 helper contract, supported output representations, quality values, specificity, server preference and structured result | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MAPPED |
| R02 missing/default behavior, media-range parsing fields, invalid fragments, `q=0` filtering and exact/wildcard/structured-suffix matches | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MAPPED |
| R02 specific `q=0` exclusion versus broader wildcard and testable candidate-list construction | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MAPPED |
| R03 deterministic q/specificity/server/header ordering, primary family, full selected type and HATEOAS flag | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MAPPED |
| R04 controller/helper/formatter separation, `406` versus fallback policy, edge cases and assertion targets | `http.accept-negotiation-ranking-and-selection` | `http` | `../_knowledge/http/accept-negotiation-ranking-and-selection.md` | MAPPED |

Boundary decision: parsing, matching, ranking, result construction, and controller consumption are one negotiation algorithm whose mechanics need to be recalled together.

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 0 |
| NON_LEARNING | 0 |
| UNRESOLVED | 0 |
