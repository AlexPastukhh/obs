# Knowledge registry — ETAG, e tag

Source workspace: `_ai-conspects/ETAG, e tag/`

Authoritative processed source: `01-final-transcript.md` (R01–R04)

Original SVG: `source/ETAG, e tag.svg`

Evidence and coverage: `data/final-coverage-audit.json`; 52 of 52 unique screenshot placements and 37 native SVG labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01: ETag representation validators; quoted strong and weak forms; conditional GET and bodyless 304 | HTTP | `http.cache-validation-headers` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R01: manual ASP.NET Core comparison versus Output Cache validation of its cached representation | ASP.NET Core | `aspnet-core.response-and-output-caching-policies` | `../_knowledge/aspnet-core/response-and-output-caching-policies.md` | MERGED |
| R01: private/no-cache storage and revalidation semantics versus no-store | HTTP | `http.cache-validation-headers` | `../_knowledge/http/cache-validation-headers.md` | MERGED |
| R02: SQL Server rowversion mapping, quoted Base64 ETags, GET validation, If-Match writes, EF original-value predicate, races and status outcomes | EF Core | `ef-core.rowversion-http-etag-concurrency` | `../_knowledge/ef-core/rowversion-http-etag-concurrency.md` | MAPPED |
| R02: If-None-Match wildcard create-only semantics and the HTTP update-precondition boundary | HTTP | `http.put-patch-and-update-preconditions` | `../_knowledge/http/put-patch-and-update-preconditions.md` | MERGED |
| R03: root-rowversion limitation, application-managed aggregate version, root/child change union and interceptor convention | EF Core | `ef-core.aggregate-version-etag-propagation` | `../_knowledge/ef-core/aggregate-version-etag-propagation.md` | MAPPED |
| R04: automatic cache validation versus manual SPA If-Match state, React storage choice and CORS header exposure | JavaScript | `javascript.etag-write-precondition-lifecycle` | `../_knowledge/javascript/etag-write-precondition-lifecycle.md` | MAPPED |
| Screenshot/text inventories, source-boundary review and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Status counts

```text
MAPPED      3
MERGED      4
NON_LEARNING 1
UNRESOLVED  0
```
