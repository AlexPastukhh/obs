# HATEOAS — semantic transcript v001

Generated: 2026-06-27 UTC

## Source policy

This is a new conspect created directly from the uploaded full SVG. Embedded screenshots are the primary source. Canvas placement, nearby SVG labels, and candidate regions were treated only as navigation hints. Every image placement was visually reviewed.

## R01 — HATEOAS purpose, hypermedia, client coupling, and evolvability

HATEOAS moves navigation and available-action knowledge from hardcoded clients into server responses. The client still understands a compact relation contract such as `self`, `next`, `cancel`, or `pay`, but it does not need to reconstruct every URI or duplicate every state-transition rule. This improves discoverability and evolvability: changed URLs or workflow rules can be reflected in returned links instead of requiring every consumer to be redeployed. HATEOAS is primarily machine-facing, though the same links also help humans during debugging and exploration.

**Reviewed image uses:** S-004, S-005, S-006, S-008, S-010, S-013, S-014, S-015, S-016, S-019, S-031, S-034, S-038

**Assigned SVG text nodes:** T-001, T-002, T-003, T-004, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-023, T-029, T-031, T-032, T-033

### Image-level evidence

- **S-004:** HATEOAS is mainly machine-facing; clients use returned links to choose the next action.
- **S-005:** Problem statement: tightly coupled clients hardcode URLs and backend workflow rules.
- **S-006:** Practical comparison of workflow knowledge without and with HATEOAS.
- **S-008:** Goals: discoverability, lower coupling, state awareness, evolvability, and self-description.
- **S-010:** Course title slide introducing HATEOAS.
- **S-013:** Hypermedia as the engine of application state and API consumption.
- **S-014:** Road-map analogy: the server exposes currently valid roads instead of requiring clients to memorize them.
- **S-015:** Client code branches on relation names and follows the supplied href.
- **S-016:** URL changes can break hardcoded clients; relation-following clients use the server-provided target.
- **S-019:** Issues without HATEOAS: implicit contract knowledge, additional URLs, and poor evolvability.
- **S-031:** APIs without links are less discoverable and require external endpoint knowledge.
- **S-034:** Roy Fielding quote about controls being learned dynamically through hypermedia.
- **S-038:** Hypermedia slide: links and forms drive application state.

## R02 — Link contract: href, rel, method, naming conventions, and documentation

A link representation carries the target URI in `href`, the semantic relationship in `rel`, and, in this course-style representation, the intended HTTP method in `method`. Standard IANA relations such as `self`, `next`, `prev`, `first`, and `last` should be preferred when they fit. Domain actions need stable documented custom relations such as `delete-author`, `reserve-course`, or `partially-update-author`. Relation values are part of the client contract: renaming them can break consumers even when the target URL is unchanged. The HTTP verb is already encoded by the method field; the relation should describe intent rather than merely repeat `PATCH` or `DELETE`.

**Reviewed image uses:** S-003, S-011, S-018, S-024, S-030, S-033, S-035, S-042, S-043, S-046

**Assigned SVG text nodes:** T-020

### Image-level evidence

- **S-003:** Clients still need a stable relation-name vocabulary even when they do not hardcode every URL.
- **S-011:** Explanation of rel as a semantic relation label rather than merely a URL.
- **S-018:** Relation naming conventions: IANA standard relations, documented custom relations, or URI relations.
- **S-024:** Rules for documenting domain-specific relations and the heavier fully qualified URI-relation option.
- **S-030:** Practical rules: use standard navigation relations and keep relation values stable.
- **S-033:** Common pagination relation values: self, next, prev/previous, first, and last.
- **S-035:** Prefer intent-based action relation names and one consistent naming style.
- **S-042:** HTML anchor analogy for href, rel, and media type.
- **S-043:** Course-specific method field explained alongside href and rel.
- **S-046:** Payload explanation of method, rel, and href.

## R03 — Single-resource implementation with LinkDto and controller actions

A basic implementation defines a `LinkDto` containing `Href`, `Rel`, and `Method`, then uses named routes and `Url.Link` to build links. A single-resource action loads the entity, creates its links, shapes or maps the DTO, adds a `links` property, and returns it. POST responses can return `CreatedAtRoute` with the newly created resource and its self/action links. The statically typed approach gives strong schemas and OpenAPI support; helper methods keep link construction consistent across GET, POST, update, and delete endpoints.

**Reviewed image uses:** S-012, S-020, S-023, S-028, S-029, S-032, S-037, S-039, S-041, S-055, S-058, S-061, S-062, S-064

**Assigned SVG text nodes:** T-022, T-030, T-034

### Image-level evidence

- **S-012:** Course demo overview: link creation depends on business rules and response-shaping style.
- **S-020:** Statically typed LinkDto approach with strong typing and OpenAPI advantages.
- **S-023:** Representative HATEOAS payload containing update, delete, and reserve links.
- **S-028:** Demo transition to implementing HATEOAS for a single resource.
- **S-029:** Single-resource example with action links.
- **S-032:** LinkDto implementation with Href, Rel, and Method.
- **S-037:** Start of CreateLinksForAuthor helper.
- **S-039:** Self-link generation with and without selected fields.
- **S-041:** Alternative LinkDto code presentation.
- **S-055:** Demo transition to HATEOAS after POST.
- **S-058:** CreateAuthor controller code before response links are added.
- **S-061:** POST response adds links and returns CreatedAtRoute.
- **S-062:** Item-level CreateLinksForAuthor helper begins with self, delete, and update actions.
- **S-064:** Continuation of item-level link creation including partial update.

## R04 — Data shaping, ExpandoObject, IDictionary, and identity preservation

Dynamic data shaping often produces `ExpandoObject`, which can be treated as `IDictionary<string, object?>` to add a `links` property after selecting requested fields. Link generation must still have a stable resource identifier. If the caller excludes `Id`, indexing the shaped dictionary by `Id` fails; build links from the original entity, retain the identifier internally, or automatically include it for link construction. The repeated warning in the SVG is intentionally counted at all three placements because the same data-shaping hazard appears in several implementation areas.

**Reviewed image uses:** S-001, S-002, S-021, S-049, S-052, S-065, S-069, S-070, S-075

**Assigned SVG text nodes:** T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-044, T-045, T-046, T-047

### Image-level evidence

- **S-001:** Repeated warning: shaped fields may omit Id, so link generation cannot safely index the shaped dictionary.
- **S-002:** Second placement of the same data-shaping Id warning.
- **S-021:** Dynamic ExpandoObject approach used with variable data-shaping fields.
- **S-049:** GetAuthor validates requested shaping fields before loading and linking the resource.
- **S-052:** Single-author controller flow: load, create links, shape, append links, and return.
- **S-065:** ShapeData returns an ExpandoObject containing selected fields.
- **S-069:** Each shaped author is cast to IDictionary and receives its item-level links.
- **S-070:** Full collection shaping flow and envelope construction.
- **S-075:** Third placement of the data-shaping Id warning.

## R05 — Pagination and collection resources with navigation links and envelopes

Collection responses need collection-level links and item-level links. Pagination navigation belongs in hypermedia links such as `self`, `next`, and `previous`; count/page metadata can remain as metadata because it describes state rather than the navigation control itself. Generated pagination URIs should preserve filters, sorting, shaping fields, page size, and other query state while changing only the page number. An envelope such as `{ value: [...], links: [...] }` avoids invalid JSON and lets every shaped author carry its own links while the collection exposes pagination links.

**Reviewed image uses:** S-007, S-009, S-017, S-025, S-026, S-036, S-045, S-048, S-050, S-051, S-054, S-057, S-060, S-063, S-066, S-067, S-068, S-071, S-072, S-073, S-074, S-076, S-077, S-078

**Assigned SVG text nodes:** T-005, T-016, T-017, T-018, T-019, T-021, T-026, T-042, T-043, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055

### Image-level evidence

- **S-007:** Pagination metadata example separated from navigation controls.
- **S-009:** Example pagination links with previous-page and next-page relations.
- **S-017:** Pagination guidance: expose previous/next as links instead of only metadata.
- **S-025:** Pagination can retain descriptive metadata while navigation is driven by relations.
- **S-026:** Pagination clarification: preserve filters, sorting, shaping, and page size in generated navigation URIs.
- **S-036:** Course demo transition to pagination links.
- **S-045:** ResourceUriType enum for PreviousPage, NextPage, and Current.
- **S-048:** AuthorsResourceParameters with filtering, sorting, fields, page number, and page size.
- **S-050:** Collection response envelope with value and links properties.
- **S-051:** CreateAuthorsResourceUri branch for the previous page.
- **S-054:** CreateAuthorsResourceUri branches for next and current page.
- **S-057:** CreateLinksForAuthors builds self, next, and previous collection links.
- **S-060:** Previous-page branch in CreateLinksForAuthors.
- **S-063:** Demo transition to implementing a collection resource.
- **S-066:** GetAuthors creates pagination metadata, collection links, and shaped authors.
- **S-067:** ResourceUriType enum used by pagination URI generation.
- **S-068:** Current-page URI branch preserves all query parameters.
- **S-071:** Envelope rationale: return value plus collection-level links as valid JSON.
- **S-072:** Start of CreateLinksForAuthors collection helper.
- **S-073:** Self collection link creation.
- **S-074:** Complete CreateAuthorsResourceUri switch preserving query state.
- **S-076:** GetAuthors endpoint signature with AuthorsResourceParameters.
- **S-077:** Controller adds pagination header, creates collection links, shapes items, and appends item links.
- **S-078:** Final linkedCollectionResource envelope returned by the controller.

## R06 — Conditional action links, workflow rules, documentation, and tradeoffs

The strongest value appears when available actions depend on state, permissions, archival status, concurrency requirements, or workflow rules. Omit a delete, update, restore, cancel, or pay relation when the action is not currently allowed. This reduces duplicated client business rules, but it does not eliminate documentation: custom relations, request bodies, permissions, error responses, and preconditions such as `If-Match` still need a documented contract. HATEOAS adds response complexity, so simpler public CRUD APIs may choose partial adoption while stateful workflows benefit more.

**Reviewed image uses:** S-022, S-027, S-040, S-044, S-047, S-053, S-056, S-059

**Assigned SVG text nodes:** T-024, T-025, T-027, T-028

### Image-level evidence

- **S-022:** Workflow changes otherwise force frontend changes; the server can omit disallowed actions.
- **S-027:** Without server-provided actions, clients duplicate backend business rules.
- **S-040:** Rule: include an action link only when the action is allowed.
- **S-044:** Code adding create-course, courses, and delete-course action links.
- **S-047:** Documentation requirements for custom relations, permissions, bodies, errors, and ETags.
- **S-053:** HATEOAS is most valuable when actions depend on permissions or current resource state.
- **S-056:** HATEOAS improves runtime discoverability but still requires relation and error documentation.
- **S-059:** Tradeoff: added response complexity means not every public CRUD API adopts full HATEOAS.


## Practical synthesis

HATEOAS does not make a client understand arbitrary semantics automatically. It gives the client a stable relation vocabulary and lets the server provide the currently valid targets and actions. A practical ASP.NET Core implementation usually combines named routes, a link representation, per-resource link helpers, state/permission checks, data-shaping safeguards, collection envelopes, and pagination links that preserve the complete query state.

## Closure

```text
embedded assets: 76
total image uses: 78
processed image uses: 78
restored image uses: 78
duplicate placements: 2
SVG text nodes: 55
vector paths: 29
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
