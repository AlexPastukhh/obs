# Knowledge Registry

Source workspace: `_ai-conspects/CORS/`

Authoritative processed sources:

- `regions/R01R02-origin-preflight-aspnet-usecases.md`
- `regions/R03R04R05-policy-builder-headers-middleware.md`

Original SVG: `source/cors.svg`

Evidence and coverage:

- `data/R01R02-sources-stage1-v001.csv` and `.json`
- `data/R03R04R05-sources-stage2-v001.csv` and `.json`
- `data/final-coverage-audit-stage2-v001.csv` and `.json`
- 126 of 126 canvas image uses are closed by the verified regional transcripts.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01 origin as normalized scheme/host/port, default ports and exclusion of path/query/fragment | `http` | `http.browser-header-controls-and-cors-visibility` | `../_knowledge/http/browser-header-controls-and-cors-visibility.md` | MERGED |
| R01 preflight triggers, intent headers, permission response and actual-request suppression on failure | `http` | `http.options-and-cors-preflight` | `../_knowledge/http/options-and-cors-preflight.md` | MERGED |
| R01 simple-request versus preflight flow and browser response-read enforcement rather than server reachability | `security` | `security.cors-and-antiforgery-boundaries` | `../_knowledge/security/cors-and-antiforgery-boundaries.md` | MERGED |
| R01 credential opt-in, explicit allowed origin and the independent CORS/SameSite/Secure/third-party-cookie axes | `http` | `http.browser-cookie-delivery-and-security` | `../_knowledge/http/browser-cookie-delivery-and-security.md` | MERGED |
| R02 CORS as protection for browser-held user data, not a defense against arbitrary clients, phishing, malware, DNS or TLS failures | `security` | `security.cors-and-antiforgery-boundaries` | `../_knowledge/security/cors-and-antiforgery-boundaries.md` | MERGED |
| R02 `Content-Disposition` response visibility through `WithExposedHeaders` and the request-allowance versus response-exposure distinction | `http` | `http.content-disposition-filenames` | `../_knowledge/http/content-disposition-filenames.md` | MERGED |
| R02 SPA development proxy, relative API URLs and one browser-visible origin | `aspnet-core` | `aspnet-core.cors-middleware-preflight` | `../_knowledge/aspnet-core/cors-middleware-preflight.md` | MERGED |
| R02 named ASP.NET Core policy, explicit origins/methods/headers/credentials and middleware application | `aspnet-core` | `aspnet-core.cors-middleware-preflight` | `../_knowledge/aspnet-core/cors-middleware-preflight.md` | MERGED |
| R02 authentication redirects that surface as CORS-like failures and API-specific `401`/`403` responses | `aspnet-core` | `aspnet-core.cookie-auth-api-challenge-responses` | `../_knowledge/aspnet-core/cookie-auth-api-challenge-responses.md` | MERGED |
| R03 origin, request-header, method and credential policy-builder methods, including custom predicates and wildcard/credential boundaries | `aspnet-core` | `aspnet-core.cors-middleware-preflight` | `../_knowledge/aspnet-core/cors-middleware-preflight.md` | MERGED |
| R03 exposed response headers and bounded/request-shape-specific preflight max age | `aspnet-core` | `aspnet-core.cors-middleware-preflight` | `../_knowledge/aspnet-core/cors-middleware-preflight.md` | MERGED |
| R04 browser request headers versus server response headers and preflight-only versus actual-response roles | `http` | `http.browser-header-controls-and-cors-visibility` | `../_knowledge/http/browser-header-controls-and-cors-visibility.md` | MERGED |
| R04 preflight-cache dimensions and the fact that `Access-Control-Max-Age` is not global permission | `http` | `http.options-and-cors-preflight` | `../_knowledge/http/options-and-cors-preflight.md` | MERGED |
| R04 hidden/blocked responses, rejected Fetch promises and generic `TypeError` or network-style failure instead of an ordinary application response | `security` | `security.cors-and-antiforgery-boundaries` | `../_knowledge/security/cors-and-antiforgery-boundaries.md` | MERGED |
| R05 middleware preflight short-circuit and actual-request pass-through; exact single reflected origin, no comma-separated origin list and cumulative `Vary: Origin` cache correctness | `aspnet-core`; `http` | `aspnet-core.cors-middleware-preflight`; `http.vary-origin-cache-variants` | `../_knowledge/aspnet-core/cors-middleware-preflight.md`; `../_knowledge/http/vary-origin-cache-variants.md` | MERGED |
| Coverage inventories, source assignments, screenshots and audit metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- The source spans browser HTTP behavior, security boundaries and ASP.NET Core policy implementation, so it is merged into the focused existing units instead of creating one broad CORS file.
- Request-header allowance and response-header exposure remain separate concepts.
- The transcript's uncertainty about cookie storage in CORS failure modes is not promoted into a definitive knowledge claim.
- The handwritten middleware flow is retained as an explanatory model; the built-in ASP.NET Core middleware remains the implementation default.

| Status | Count |
|---|---:|
| MAPPED | 0 |
| MERGED | 15 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
