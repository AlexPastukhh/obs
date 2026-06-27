# Regional transcript — R01: Nested resources, canonical URIs and route trade-offs

Conspect: `ROUTE NESTING`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 11 / 11
unique screenshots represented: 11
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Route nesting should express ownership, lifecycle and context—not merely repeat a relationship that can be represented by filtering.

## When a parent key is required

- Nesting is required when the child is not globally addressable without the parent.
- Examples include a composite key unique only within an author, such as `/authors/{authorId}/courses/{courseId}`.
- Nesting is also natural when multiple parents may contain the same local child key.

## When nesting is a good fit

- The child is inside the parent aggregate and cannot be created independently.
- The parent enforces invariants for creating, updating or deleting the child.
- Deleting the parent deletes the children.
- Authorization or tenant scope is naturally parent-based.
- The route removes ambiguity by saying 'this course in the context of this author'.

## When not to nest

- The child is an independent aggregate root with its own lifecycle.
- The child can move between parents or belong to several parents.
- The same resource would otherwise have several equally valid nested URLs.
- Every request would need redundant parent/child consistency checks without adding useful context.

## Canonical URI

- Choose one canonical URI for a resource, commonly `/courses/{courseId}` for an independent course.
- Use nested collection routes such as `/authors/{authorId}/courses` for listing or creating within an author context.
- An optional nested single-resource route can act as a scoped view/check, but it should not create competing canonical identities.

## Filter versus nested route

- For a global collection, `GET /courses?authorId=...` is a query/filter over the canonical collection.
- For a true aggregate child, `GET /authors/{authorId}/courses` expresses containment and context.
- The choice follows domain invariants, not a blanket REST rule.

## Failure semantics

- A mismatch between `authorId` and `courseId` normally returns 404 to avoid leaking cross-scope existence.
- 403 can be used when the API intentionally reveals existence and denies access.
- Document the policy consistently across nested endpoints.

## Recommended patterns

- Independent course: expose `/courses/{courseId}` plus nested author collection routes.
- True child of author: require `/authors/{authorId}/courses` for creation and lifecycle operations.
- A convenience lookup by global ID may still exist internally or publicly when the domain permits it.

## Caveats

- Deep nesting creates long, brittle URLs; keep the route focused on the context required for the operation.
- Globally unique identifiers do not automatically decide aggregate ownership.

## Covered text elements

```text
(none; source region is screenshot-only)
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
