# Full combined final transcript — ROUTE NESTING

Generated: 2026-06-27 14:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 0 / 0
unique embedded screenshots: 11 / 11
screenshot uses on canvas: 11 / 11
repeated screenshot placements retained: 0
logical regions: 1 / 1
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Nested resources, canonical URIs and route trade-offs

Route nesting should express ownership, lifecycle and context—not merely repeat a relationship that can be represented by filtering.

### When a parent key is required

- Nesting is required when the child is not globally addressable without the parent.
- Examples include a composite key unique only within an author, such as `/authors/{authorId}/courses/{courseId}`.
- Nesting is also natural when multiple parents may contain the same local child key.

### When nesting is a good fit

- The child is inside the parent aggregate and cannot be created independently.
- The parent enforces invariants for creating, updating or deleting the child.
- Deleting the parent deletes the children.
- Authorization or tenant scope is naturally parent-based.
- The route removes ambiguity by saying 'this course in the context of this author'.

### When not to nest

- The child is an independent aggregate root with its own lifecycle.
- The child can move between parents or belong to several parents.
- The same resource would otherwise have several equally valid nested URLs.
- Every request would need redundant parent/child consistency checks without adding useful context.

### Canonical URI

- Choose one canonical URI for a resource, commonly `/courses/{courseId}` for an independent course.
- Use nested collection routes such as `/authors/{authorId}/courses` for listing or creating within an author context.
- An optional nested single-resource route can act as a scoped view/check, but it should not create competing canonical identities.

### Filter versus nested route

- For a global collection, `GET /courses?authorId=...` is a query/filter over the canonical collection.
- For a true aggregate child, `GET /authors/{authorId}/courses` expresses containment and context.
- The choice follows domain invariants, not a blanket REST rule.

### Failure semantics

- A mismatch between `authorId` and `courseId` normally returns 404 to avoid leaking cross-scope existence.
- 403 can be used when the API intentionally reveals existence and denies access.
- Document the policy consistently across nested endpoints.

### Recommended patterns

- Independent course: expose `/courses/{courseId}` plus nested author collection routes.
- True child of author: require `/authors/{authorId}/courses` for creation and lifecycle operations.
- A convenience lookup by global ID may still exist internally or publicly when the domain permits it.

### Caveats

- Deep nesting creates long, brittle URLs; keep the route focused on the context required for the operation.
- Globally unique identifiers do not automatically decide aggregate ownership.

## Coverage map

### R01

- text elements: `0`
- screenshot uses: `11`
- unique screenshots: `11`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `01-transcript-R01-nested-resources-canonical-uris-and-tradeoffs.md`

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots under `source/` remain authoritative for exact source
punctuation, code spelling and framework-version details.
