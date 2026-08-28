# Knowledge Registry

Source workspace: `_ai-conspects/hateoas/`

Authoritative processed source: `regions/R01R06-hateoas-full-coverage-v001.md`

Original SVG: `source/source-complete-v001.svg`

Evidence and coverage: `data/full-coverage-ledger-v001.json` and `data/independent-full-svg-audit-v001.json`; 78 of 78 image uses and 55 of 55 SVG text nodes are assigned, with the independent repeat audit passing.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01 server-provided available actions, reduced hardcoded URI/workflow coupling, discoverability and evolvability | `http` | `http.hypermedia-links-and-representation-negotiation` | `../_knowledge/http/hypermedia-links-and-representation-negotiation.md` | MERGED |
| R02 `href`/`rel`/course-specific `method`, registered versus documented custom relations, stable intent naming and documentation contract | `http` | `http.hypermedia-links-and-representation-negotiation` | `../_knowledge/http/hypermedia-links-and-representation-negotiation.md` | MERGED |
| R03 `LinkDto`, named routes, centralized `Url.Link` helpers and a linked single-resource controller flow | `aspnet-core` | `aspnet-core.hateoas-link-generation-and-resource-envelopes` | `../_knowledge/aspnet-core/hateoas-link-generation-and-resource-envelopes.md` | MAPPED |
| R03 named-route URL generation and route-value ownership | `aspnet-core` | `aspnet-core.link-generator-and-public-origin` | `../_knowledge/aspnet-core/link-generator-and-public-origin.md` | MERGED |
| R03 linked POST representation returned through `CreatedAtRoute` | `aspnet-core` | `aspnet-core.createdat-route-generation` | `../_knowledge/aspnet-core/createdat-route-generation.md` | MERGED |
| R04 `ExpandoObject`/dictionary shaping, selected-field validation and runtime representation boundary | `aspnet-core` | `aspnet-core.dynamic-data-shaping` | `../_knowledge/aspnet-core/dynamic-data-shaping.md` | MERGED |
| R04 link attachment and identity preservation when the shaped field set omits `Id` | `aspnet-core` | `aspnet-core.hateoas-link-generation-and-resource-envelopes` | `../_knowledge/aspnet-core/hateoas-link-generation-and-resource-envelopes.md` | MAPPED |
| R05 per-item links, collection-level links and valid `{ value, links }` resource envelope | `aspnet-core` | `aspnet-core.hateoas-link-generation-and-resource-envelopes` | `../_knowledge/aspnet-core/hateoas-link-generation-and-resource-envelopes.md` | MAPPED |
| R05 metadata-versus-navigation distinction and pagination URI generation that preserves filter/search/sort/fields/page-size state | `aspnet-core` | `aspnet-core.hateoas-link-generation-and-resource-envelopes` | `../_knowledge/aspnet-core/hateoas-link-generation-and-resource-envelopes.md` | MAPPED |
| R06 state/permission/workflow-conditioned action-link helpers | `aspnet-core` | `aspnet-core.hateoas-link-generation-and-resource-envelopes` | `../_knowledge/aspnet-core/hateoas-link-generation-and-resource-envelopes.md` | MAPPED |
| R06 relation/body/error/precondition documentation, HATEOAS limits and selective-adoption tradeoffs | `http` | `http.hypermedia-links-and-representation-negotiation` | `../_knowledge/http/hypermedia-links-and-representation-negotiation.md` | MERGED |
| Source inventory, image assignments, duplicate-placement accounting and audit metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Protocol-level purpose, relation semantics and adoption tradeoffs stay in the HTTP unit.
- ASP.NET Core route generation, shaping-safe identity use and item/collection envelope composition form one framework implementation unit.
- Existing focused route, creation and data-shaping units receive the overlapping mechanics instead of duplicating them as separate files.
- `method` is documented as part of this course representation, not as a universal HATEOAS requirement; the standard pagination relation is `prev`, while `previous` requires an explicitly documented vocabulary.

| Status | Count |
|---|---:|
| MAPPED | 5 |
| MERGED | 6 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
