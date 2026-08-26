# Knowledge Registry

Source conspect: `_ai-conspects/headers/`

Authoritative processed source: `FINAL_TRANSCRIPT.md`

Original SVG: `source/headers.svg`

This registry maps the meaningful learning areas of the integrated transcript to independently reviewable units. It intentionally does not use one region or heading as one unit.

| Source area | Knowledge ID | Knowledge file | Mapping |
|---|---|---|---|
| Section 1 — header model and message/content ownership | `http.dotnet-header-representation` | [[../_knowledge/http/dotnet-header-representation]] | MAPPED |
| Section 2 — `Expect: 100-continue` and browser restriction | `http.browser-header-controls-and-cors-visibility` | [[../_knowledge/http/browser-header-controls-and-cors-visibility]] | MAPPED |
| Section 3 — `Referer` semantics and trust boundary | `http.browser-header-controls-and-cors-visibility` | [[../_knowledge/http/browser-header-controls-and-cors-visibility]] | MAPPED |
| Section 4 — `Authorization`, `WWW-Authenticate`, and `realm` | `http.authentication-headers` | [[../_knowledge/http/authentication-headers]] | MAPPED |
| Section 5 — `Origin` and cross-origin response-header visibility | `http.browser-header-controls-and-cors-visibility` | [[../_knowledge/http/browser-header-controls-and-cors-visibility]] | MAPPED |
| Section 6 — status-dependent `Location` semantics | `http.location-header` | [[../_knowledge/http/location-header]] | MAPPED |
| Section 7 — cache freshness and conditional validation | `http.cache-validation-headers` | [[../_knowledge/http/cache-validation-headers]] | MAPPED |
| Sections 8–10 — raw/typed .NET headers, `IHeaderDictionary`, and `StringValues` | `http.dotnet-header-representation` | [[../_knowledge/http/dotnet-header-representation]] | MAPPED |
| Section 11 — request cookies and response `Set-Cookie` | `http.cookie-and-set-cookie` | [[../_knowledge/http/cookie-and-set-cookie]] | MAPPED |
| Section 12 — practical typed/raw and trust rules | `http.dotnet-header-representation`; `http.browser-header-controls-and-cors-visibility` | [[../_knowledge/http/dotnet-header-representation]]; [[../_knowledge/http/browser-header-controls-and-cors-visibility]] | MAPPED |
| R03–R05 details — cookie multiplicity, typed cookie models, and safe inspection | `http.cookie-and-set-cookie` | [[../_knowledge/http/cookie-and-set-cookie]] | MAPPED |
| Coverage counts, screenshot/text-node ledgers, audit status, and reconciliation mechanics | — | — | NON_LEARNING |

## Boundary decisions

- R01 is split between `http.location-header` and `http.browser-header-controls-and-cors-visibility`.
- R02 is split between `http.browser-header-controls-and-cors-visibility` and `http.authentication-headers`.
- Sections 1, 8–10, and part of section 12 form one .NET representation unit despite being separated in the source.
- Cookie knowledge is consolidated from section 11, exceptions in sections 9–10, and evidence spread across R03–R05.
- Caching and `Location` remain separate units because neither depends on the other for recall.

## Coverage check

| Status | Count | Notes |
|---|---:|---|
| MAPPED | 11 | All listed meaningful source areas map into six new knowledge units. |
| MERGED | 0 | No pre-existing HTTP knowledge unit was available to extend. |
| NON_LEARNING | 1 | Processing, reconciliation, and audit metadata remain in the workspace. |
| UNRESOLVED | 0 | No meaningful source area is unclassified. |
