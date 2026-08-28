# Knowledge Registry

Source workspace: `_ai-conspects/REST API BASICS/`

Authoritative processed source: `regions/R01-rest-constraints-methods-validation.md` through `regions/R06-http-caching-validators.md`

Original SVG: `source/REST API BASICS.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 six REST constraints and their client/server/interface/cache/layer/code-on-demand responsibilities | `http.rest-constraints-resource-and-method-semantics` | `http` | `../_knowledge/http/rest-constraints-resource-and-method-semantics.md` | MAPPED |
| R01 noun/hierarchy URI design, query-option/RPC exceptions and public DTO-versus-entity boundary | `http.rest-constraints-resource-and-method-semantics` | `http` | `../_knowledge/http/rest-constraints-resource-and-method-semantics.md` | MAPPED |
| R01 safe/idempotent method table, CRUD/201/204/404, server/client ID creation, update/upsert and bulk policy | `http.rest-constraints-resource-and-method-semantics` | `http` | `../_knowledge/http/rest-constraints-resource-and-method-semantics.md` | MAPPED |
| R01 automatic/custom validation, 400/422 consistency and two-stage PATCH validation | `aspnet-core.api-behavior-validation-and-client-errors`; `aspnet-core.patch-models-application-and-validation` | `aspnet-core` | `../_knowledge/aspnet-core/api-behavior-validation-and-client-errors.md`; `../_knowledge/aspnet-core/patch-models-application-and-validation.md` | MERGED |
| R01 Richardson levels 0–3 and deliberate non-purity boundary | `http.rest-constraints-resource-and-method-semantics` | `http` | `../_knowledge/http/rest-constraints-resource-and-method-semantics.md` | MAPPED |
| R02 Problem Details fields/extensions, benefits, lower-value body cases and public/private diagnostic security | `http.problem-details-public-error-contracts` | `http` | `../_knowledge/http/problem-details-public-error-contracts.md` | MAPPED |
| R03 filtering versus search, resource-parameter query object, IQueryable composition, paging defaults/max/store execution and metadata placement | `aspnet-core.collection-filter-search-query-composition` | `aspnet-core` | `../_knowledge/aspnet-core/collection-filter-search-query-composition.md` | MERGED |
| R03 public-field whitelist, multi-field/direction parsing and DTO-to-entity sort mapping | `aspnet-core.public-sorting-property-mapping` | `aspnet-core` | `../_knowledge/aspnet-core/public-sorting-property-mapping.md` | MERGED |
| R04 allowed public field selection, shaped runtime object and payload/UI-use boundary | `aspnet-core.dynamic-data-shaping` | `aspnet-core` | `../_knowledge/aspnet-core/dynamic-data-shaping.md` | MERGED |
| R04 HATEOAS state/permission transitions, relation naming, pagination controls, established formats and semantic media types | `http.hypermedia-links-and-representation-negotiation` | `http` | `../_knowledge/http/hypermedia-links-and-representation-negotiation.md` | MAPPED |
| R04 stable root bootstrap and starting links | `http.api-root-document-discovery` | `http` | `../_knowledge/http/api-root-document-discovery.md` | MERGED |
| R05 functionality/rules/representation evolution, four version selectors, breaking changes and deprecation/sunset policy | `http.api-versioning-and-deprecation` | `http` | `../_knowledge/http/api-versioning-and-deprecation.md` | MAPPED |
| R06 private/shared cache, freshness, validator/304 flow, strong/weak validators and Cache-Control directives | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R06 representation dimensions, missing/high-cardinality `Vary` consequences | `http.vary-representation-cache-keys` | `http` | `../_knowledge/http/vary-representation-cache-keys.md` | MERGED |
| R06 `[ResponseCache]` header behavior, middleware storage/profile setup, auth/personalization safety and ResponseCaching-versus-OutputCache boundary | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MAPPED |
| Coverage counts, reviewed-source assignments and reconciliation mechanics | — | — | — | NON_LEARNING |

## Boundary decisions

- General HTTP resource, error, hypermedia, versioning and cache contracts stay outside framework-specific implementation.
- Existing focused filtering, sorting, shaping, root-document, validator and Vary units are richer destinations and were extended rather than duplicated.
- ASP.NET Core response storage is consolidated with the dedicated OutputCache workspace processed in this batch.

| Status | Count |
|---|---:|
| MAPPED | 8 |
| MERGED | 7 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
