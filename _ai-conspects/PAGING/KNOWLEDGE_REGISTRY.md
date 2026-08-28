# Knowledge Registry

Source workspace: `_ai-conspects/PAGING/`

Authoritative processed source: `01-final-transcript.md`

Original SVG: `source/PAGING.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| R01 collection-size costs, paging query parameters, lower bounds and maximum page-size enforcement | `aspnet-core.collection-filter-search-query-composition` | `aspnet-core` | `../_knowledge/aspnet-core/collection-filter-search-query-composition.md` | MERGED |
| R01 database-side `Skip`/`Take`, deterministic ordering and unique tie-breakers | `aspnet-core.paged-list-query-and-consistency` | `aspnet-core` | `../_knowledge/aspnet-core/paged-list-query-and-consistency.md` | MAPPED |
| R02 reusable `PagedList<T>` shape, ceiling page count and `CreateAsync` count/page query composition | `aspnet-core.paged-list-query-and-consistency` | `aspnet-core` | `../_knowledge/aspnet-core/paged-list-query-and-consistency.md` | MAPPED |
| R02 two-query consistency window, stronger-isolation tradeoff and documented out-of-range behavior | `aspnet-core.paged-list-query-and-consistency` | `aspnet-core` | `../_knowledge/aspnet-core/paged-list-query-and-consistency.md` | MAPPED |
| R03 previous/next links, link relations, navigation availability and preservation of paging/filter/search/sort/field-selection state | `http.hypermedia-links-and-representation-negotiation` | `http` | `../_knowledge/http/hypermedia-links-and-representation-negotiation.md` | MERGED |
| R03 `X-Pagination` response metadata and cross-origin exposure through CORS | `http.browser-header-controls-and-cors-visibility` | `http` | `../_knowledge/http/browser-header-controls-and-cors-visibility.md` | MERGED |
| R03 bare collection plus metadata header versus a documented response envelope/media-type contract | `http.hypermedia-links-and-representation-negotiation` | `http` | `../_knowledge/http/hypermedia-links-and-representation-negotiation.md` | MERGED |
| Coverage totals, placement counts and source-processing checklist | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Query-parameter composition remains in the existing collection-filter/search unit; reusable result shape, execution mechanics and consistency form one independently recallable paging unit.
- Navigation links and representation choices merge into the existing HTTP hypermedia unit rather than creating a second link-design unit.
- Browser visibility of a custom response header is a CORS/header-access concern, not a `PagedList<T>` concern.

| Status | Count |
|---|---:|
| MAPPED | 3 |
| MERGED | 4 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
