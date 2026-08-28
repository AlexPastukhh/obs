# Knowledge Registry

Source workspace: `_ai-conspects/ROUTING,ROUTE DESIGN, RESOURCES,ROUTING ALL GOOD PRACT IN GENERAL EXPLAINED/`

Authoritative processed source: `01-final-transcript.md` (identical regional copies: `regions/final-transcript.md` and `regions/R01R02R03-routing-route-design-final-v001.md`)

Original SVG: `source/ROUTING,ROUTE DESIGN, RESOURCES,ROUTING ALL GOOD PRACT IN GENERAL EXPLAINED.svg`

Evidence and coverage: `data/final-coverage-audit.json`; 19 of 19 image uses and 4 of 4 native SVG labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01-R02 one stable canonical identity URL and its link, cache, bookmark, documentation and client-identity benefits | `http` | `http.canonical-resource-identities-and-lookup-routes` | `../_knowledge/http/canonical-resource-identities-and-lookup-routes.md` | MAPPED |
| R01-R03 email/external-key lookup helpers, canonical self links or GET redirects and the cost of several official URLs | `http` | `http.canonical-resource-identities-and-lookup-routes` | `../_knowledge/http/canonical-resource-identities-and-lookup-routes.md` | MAPPED |
| R01 plural noun collection/item routes and ordinary CRUD method vocabulary | `http` | `http.rest-constraints-resource-and-method-semantics` | `../_knowledge/http/rest-constraints-resource-and-method-semantics.md` | MERGED |
| R01 typed built-in route constraints as endpoint-matching and path-contract tools | `aspnet-core` | `aspnet-core.custom-route-constraints` | `../_knowledge/aspnet-core/custom-route-constraints.md` | MERGED |
| R01-R03 nested collection/item routes, global versus parent-scoped child identity and enforced parent/security membership | `aspnet-core` | `aspnet-core.nested-resource-route-design` | `../_knowledge/aspnet-core/nested-resource-route-design.md` | MERGED |
| R01-R02 dedicated non-CRUD command endpoints, domain-side-effect criteria and fake-property-update boundary | `http` | `http.rest-constraints-resource-and-method-semantics` | `../_knowledge/http/rest-constraints-resource-and-method-semantics.md` | MERGED |
| R01-R02 optional filtering, searching, sorting and paging through collection query parameters | `aspnet-core` | `aspnet-core.collection-filter-search-query-composition` | `../_knowledge/aspnet-core/collection-filter-search-query-composition.md` | MERGED |
| R01-R02 POST search/bulk boundary for large identifiers, structured filters, URL-sensitive input, validation and batch work | `http` | `http.rest-constraints-resource-and-method-semantics` | `../_knowledge/http/rest-constraints-resource-and-method-semantics.md` | MERGED |
| R01 named item route and `CreatedAtRoute`/`Location` creation flow | `aspnet-core` | `aspnet-core.createdat-route-generation` | `../_knowledge/aspnet-core/createdat-route-generation.md` | MERGED |
| Source inventory, image/text assignment and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Canonical identity and alternate-key discovery form the one new protocol-level unit.
- Existing REST, nested-route, constraint, collection-query and creation units receive overlapping mechanics rather than duplicating them as route-section files.
- A domain command is represented as a deliberate resource-oriented exception, not a universal replacement for normal HTTP update semantics.
- POST can keep large or sensitive structured input out of a URL, but the migration does not treat the method alone as a confidentiality guarantee.

| Status | Count |
|---|---:|
| MAPPED | 2 |
| MERGED | 7 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
