# R04 — Data shaping, HATEOAS and content negotiation

## Coverage

```text
image uses reviewed: 54
physical SVG text nodes reviewed: 12
remaining image uses: 0
remaining text nodes: 0
```

## Area understanding

This region moves from optional field selection to runtime discoverability. It covers link structure, relation naming, pagination controls, root documents, existing hypermedia formats and the media-type contract needed when one resource has plain and hypermedia representations.

## Verified transcript

### Data shaping

A caller can request a supported subset of public fields, for example:

```text
GET /api/authors?fields=id,name
```

Data shaping can reduce payload size and support different UI views, but it applies to the public resource/DTO contract, not hidden entity or database fields. The server validates the requested field list and returns a shaped object containing only allowed fields.

### HATEOAS purpose

Hypermedia controls tell a client which transitions are currently available. This reduces hardcoded workflow logic and allows the server to omit actions that are not valid for the current state or permissions.

A link contains:

- `href` — target URI;
- `rel` — semantic relationship or action;
- optionally `method` — HTTP method to invoke.

Examples include `self`, `update-course`, `delete-course` and `reserve-course`.

HATEOAS does not eliminate documentation. Clients still need request schemas, possible responses and the meaning and preconditions of custom relations.

### Relation naming

Prefer standard registered relations when they fit, such as:

```text
self, next, prev/previous, first, last, collection, item, up
```

Custom domain relations are valid but must be stable and documented. Names should describe intent rather than repeat the HTTP method. Pick one naming convention and use it consistently.

Only include a link when the transition is permitted. For example, omit `delete` when deletion is not allowed and expose `restore` instead of `update` for an archived resource when that is the real available action.

### Pagination links

Pagination often needs both:

- metadata for display (`totalCount`, `pageSize`, `currentPage`, `totalPages`);
- links for controls (`self`, `previous`, `next`).

Generated navigation links must preserve current filters, search terms, sort order, shaped fields and page size while changing only the page number.

### Root document and discoverability

A root endpoint can return links such as:

```text
self
authors
create-author
```

This gives a client a starting point instead of requiring a hardcoded first resource URI.

### Hypermedia formats

The source references established formats and designs including Siren, HAL, JSON-LD, JSON:API and OData. These provide conventions for links and controls instead of inventing a completely private envelope.

### Content negotiation

`application/json` states the serialization format but not the semantic representation. A plain author and an author with hypermedia links are two different representations even though both are JSON.

Representation-specific media types can distinguish them, for example:

```text
application/vnd.marvin.author+json
application/vnd.marvin.author.hateoas+json
```

The client selects the desired representation through `Accept`. The response then remains self-descriptive about both format and type.

## Practical conclusion

Use HATEOAS where runtime state and permissions genuinely affect available actions. Keep relation names stable, preserve query state in navigation links and negotiate plain versus hypermedia representations with explicit media types.
