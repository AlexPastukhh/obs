# Knowledge Registry

Source workspace: `_ai-conspects/cache control header,directives, PUBLIC PRIVATE CACHE , RESPONSE CACHE TYPES , E TAG CACHE FLOWS/`

Authoritative processed source: `regions/R01R07-cache-control-response-caching-etag-full-coverage-v001.md`

Original SVG: `source/source-complete-v001.svg`

This conspect is integrated into existing HTTP and ASP.NET Core caching units. Its semantic regions cross the same freshness, validation, cache-key and server-cache boundaries, so creating a parallel cache summary would weaken retrieval rather than add an independent unit.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 request `Cache-Control` versus response policy, exchange-specific combination, stricter applicable behavior and directive-specific precedence | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R01 request `max-age`, `max-stale`, `min-fresh`, `no-cache`, `no-store`, `only-if-cached` and browser reload/revalidation behavior | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R02 explicit `max-age` freshness, fresh/stale transition, heuristic caching and the unsafe-to-assume missing-metadata boundary for APIs | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R03 `ETag`/`Last-Modified` validators, conditional request headers and unchanged `304` versus changed `200` flows | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R03 `no-cache` storage-with-validation, `must-revalidate` stale prohibition and `max-age` plus validator composition | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R04 `no-store`, `public`, `private`, `no-transform`, private/shared cache boundaries, omitted-scope ambiguity and personalized/sensitive-response leakage risk | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R05 shared-cache `s-maxage`, fingerprinted-asset `immutable`, `stale-while-revalidate` and `stale-if-error` resilience semantics | `http.cache-validation-headers` | `http` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R05 `Vary` request-header cache-key dimensions, wrong-representation prevention and `Accept` variant example | `http.vary-representation-cache-keys` | `http` | `../_knowledge/http/vary-representation-cache-keys.md` | MERGED |
| R06 Response Caching Middleware as an HTTP cache that honors client and response directives, plus `[ResponseCache]` header-policy role | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MERGED |
| R06 Output Cache as application-controlled shared server output, policy dimensions and personalized-response key/safety boundary | `aspnet-core.response-and-output-caching-policies`; `aspnet-core.output-cache-safety-value-and-locking` | `aspnet-core`; `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md`; `../_knowledge/aspnet-core/output-cache-safety-value-and-locking.md` | MERGED |
| R06 coexistence of browser, CDN/proxy, Response Caching Middleware and Output Cache as independent policy/key layers | `aspnet-core.output-cache-safety-value-and-locking`; `aspnet-core.response-and-output-caching-policies` | `aspnet-core`; `aspnet-core` | `../_knowledge/aspnet-core/output-cache-safety-value-and-locking.md`; `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MERGED |
| R07 public/private/sensitive/always-validate recipes and the safety, scope, freshness, validator and cache-key decision checklist | `http.cache-validation-headers`; `http.vary-representation-cache-keys`; `aspnet-core.response-and-output-caching-policies` | `http`; `http`; `aspnet-core` | `../_knowledge/http/cache-validation-headers.md`; `../_knowledge/http/vary-representation-cache-keys.md`; `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MERGED |
| Screenshot assignments, duplicate placement, SVG node accounting and coverage/audit closure | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Request and response directives, freshness, storage scope and validators stay in the existing HTTP cache model instead of being split by source region.
- `Vary` remains a separate cache-key unit because it selects representation variants rather than defining freshness or storage permission.
- Response Caching Middleware and Output Cache merge into the existing ASP.NET Core comparison/decision units; they are server layers, not additional HTTP directives.
- Practical recipes are mapped to the units that own their individual decisions rather than copied into a new checklist card.

| Status | Count |
|---|---:|
| MAPPED | 0 |
| MERGED | 12 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
