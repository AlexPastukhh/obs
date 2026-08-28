# Knowledge Registry

Source workspace: `_ai-conspects/outputcache, response cache comparison/`

Authoritative processed source: `regions/R01-outputcache-responsecache-policies-etags-final.md` through `regions/R05-policy-lifecycle-callback-timing-flags.md`

Original SVG: `source/outputcache, response cache comparison.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 ResponseCaching HTTP semantics versus server-controlled OutputCache identity/policy/invalidation | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MAPPED |
| R01 three policy phases, independent enable/lookup/storage flags and read/write combinations | `aspnet-core.output-cache-admission-and-policy-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/output-cache-admission-and-policy-lifecycle.md` | MAPPED |
| R01 fluent builder versus custom policy and loss of default restrictions | `aspnet-core.response-and-output-caching-policies`; `aspnet-core.output-cache-admission-and-policy-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md`; `../_knowledge/aspnet-core/output-cache-admission-and-policy-lifecycle.md` | MAPPED |
| R01/R03 response-dependent storage, personalization, ETag/304 and low-level store boundary | `aspnet-core.response-and-output-caching-policies`; `aspnet-core.output-cache-admission-and-policy-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md`; `../_knowledge/aspnet-core/output-cache-admission-and-policy-lifecycle.md` | MAPPED |
| R02 global expiration/body/store/path/service options and shown defaults | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MAPPED |
| R02 AddPolicy overloads, default exclusion, built-in eligibility and Cache/NoCache behavior | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MAPPED |
| R02 fluent operations, wildcard query scope, predicate-versus-key distinction, prefix/variation and personalization warning | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MAPPED |
| R03 setup, OutputCacheContext controls, store abstraction, tag semantics/dynamic pattern and invalidation timing | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MAPPED |
| R03 cached-validator versus current-database revalidation and full-200-versus-304 storage rule | `aspnet-core.response-and-output-caching-policies` | `aspnet-core` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MAPPED |
| R04 request/hit/response facts, restored safety checks, error/cookie/personalization/size/redirect admission and status/hot-data TTL | `aspnet-core.output-cache-admission-and-policy-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/output-cache-admission-and-policy-lifecycle.md` | MAPPED |
| R05 callback order/non-execution, correct flag timing, lookup/storage combinations, force-fresh replacement and early tags | `aspnet-core.output-cache-admission-and-policy-lifecycle` | `aspnet-core` | `../_knowledge/aspnet-core/output-cache-admission-and-policy-lifecycle.md` | MAPPED |
| Coverage counts, restored-image lists and audit history | — | — | — | NON_LEARNING |

| Status | Count |
|---|---:|
| MAPPED | 11 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
