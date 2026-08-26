# Knowledge Registry

Source conspect: `_ai-conspects/options requ/`

Authoritative processed source: `01-final-transcript.md`

Original SVG: `source/options requ.svg`

This registry records how one mixed-topic source workspace contributes to both the HTTP protocol layer and the ASP.NET Core framework layer.

| Source area | Knowledge ID | Topic | Knowledge file | Mapping |
|---|---|---|---|---|
| R01 — OPTIONS method semantics and browser CORS preflight | `http.options-and-cors-preflight` | `http` | [[../_knowledge/http/options-and-cors-preflight]] | MAPPED |
| R02 — ASP.NET Core CORS policy, middleware order, and manual handling boundary | `aspnet-core.cors-middleware-preflight` | `aspnet-core` | [[../_knowledge/aspnet-core/cors-middleware-preflight]] | MAPPED |
| R03 — reflected origins, credential constraint, and cache variation | `http.vary-origin-cache-variants` | `http` | [[../_knowledge/http/vary-origin-cache-variants]] | MAPPED |
| Final checklist | all three units above | `http`; `aspnet-core` | [[../_knowledge/http/options-and-cors-preflight]]; [[../_knowledge/http/vary-origin-cache-variants]]; [[../_knowledge/aspnet-core/cors-middleware-preflight]] | MAPPED |
| Coverage counts, image/text inventories, audit status, and processing metadata | — | — | — | NON_LEARNING |

## Boundary decisions

- HTTP method and CORS wire semantics remain under `http` even though the source demonstrates them through an ASP.NET Core application.
- Middleware configuration and pipeline placement form a separate `aspnet-core` unit because they are framework-specific operational knowledge.
- `Vary: Origin` remains an HTTP unit: its central model is cache-key variation, not middleware configuration.
- Preflight and response-header visibility stay separate: one decides whether a non-simple cross-origin request may proceed, while the other controls which response fields script can read.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 4 | All three semantic regions and the cross-region checklist are represented. |
| MERGED | 0 | The existing HTTP units were related but not semantic duplicates. |
| NON_LEARNING | 1 | Processing and audit metadata remain in the source workspace. |
| UNRESOLVED | 0 | No meaningful source area is unclassified. |
