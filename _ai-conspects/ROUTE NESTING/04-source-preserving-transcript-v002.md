# Route nesting, canonical URIs, and resource boundaries — source-preserving transcript v002

Generated: 2026-07-03

## Source verification

```text
source/ROUTE NESTING.svg
viewBox: 0 0 1444.4570108963408 4357.756119826254
Git blob SHA: 2abec4f1cda60abd342fbaa14f7dc4c379b0732f
unique screenshots: 11
image uses: 11
native SVG labels: 0
broken/external/dangling: 0
```

## Coverage

```text
source-specific blocks: 11 / 11
visible route/code examples represented: 11 / 11
source-specific question sets: 11 / 11
remaining sources: 0
```

The old semantic summary remains a useful overview. This v002 file is the authoritative source/code/repetition layer.

---

## S-001 — When a nested parent key is required

**Known limits:** none

### Near-literal normalized transcript

**When nested route params are “required”**

They are required only when the child is not globally uniquely addressable without the parent.

- **Composite key:** `CourseId` is unique only within an author.
- Therefore:

```http
GET /authors/{authorId}/courses/{courseId}
```

is necessary.

- Multiple parents may contain the same local child key, or the child key may not be exposed at all.

If `courseId` is a GUID unique across all courses, nesting is not required for uniqueness.

### Study meaning

The route must contain enough identity components to select one resource. Global uniqueness solves addressing, but does not by itself decide ownership, authorization scope, lifecycle, or canonical URI design.

### Recall questions

1. When is the parent key part of resource identity?
2. Why does a local course ID require authorId?
3. Does a globally unique GUID forbid nesting?
4. What concerns remain after uniqueness is solved?


---

## S-002 — Authorization and tenancy scoping

**Known limits:** none

### Near-literal normalized transcript

**2) Authorization / tenancy scoping**

Nesting is useful when access control is naturally parent-scoped:

- “You can manage courses for author X.”
- Policies/claims are keyed by `authorId`.

The route expresses scope and reduces accidental cross-tenant access—provided the implementation enforces:

```csharp
course.AuthorId == authorId
```

### Study meaning

The URL communicates scope but does not enforce it. The repository query or authorization handler must include the parent boundary. Prefer a parent-scoped lookup so an unrelated child is never loaded as if it belonged to the parent.

### Recall questions

1. What security fact does the route communicate?
2. What must the data query verify?
3. Why is route shape alone insufficient?
4. How can a parent-scoped query reduce leakage?


---

## S-003 — Aggregate boundary and lifecycle dependency

**Known limits:** none

### Near-literal normalized transcript

**When nested routes are a good fit—even with globally unique IDs**

**1) Aggregate boundary / lifecycle dependency (DDD-style)**

Use nesting when the child is conceptually inside the parent:

- cannot be created without the parent;
- parent enforces invariants, such as “author must be active to create course”;
- deleting parent deletes children;
- clients mainly reason about the child as “under that parent.”

Routes:

```http
POST /authors/{authorId}/courses
GET  /authors/{authorId}/courses
GET  /authors/{authorId}/courses/{courseId}
```

### Study meaning

Nesting can express lifecycle and invariant ownership even when child IDs are globally unique. The key question is whether operations belong to the parent aggregate boundary.

### Recall questions

1. Which lifecycle facts justify nesting?
2. Which route creates a child under the parent?
3. Why does global uniqueness not settle aggregate ownership?
4. Which invariant belongs in the command handler?


---

## S-004 — Avoiding ambiguous resource meaning

**Known limits:** short continuation screenshot

### Near-literal normalized transcript

**3) Avoiding ambiguous meaning**

If:

```http
/courses/{courseId}
```

would return a different view from “course as owned by author,” nested routes can represent a specific relationship:

```text
this course in the context of this author
```

### Study meaning

A nested URI can identify a scoped view or relationship resource rather than a competing identity for the same representation. Document whether it is an alias, contextual view, or distinct subresource.

### Recall questions

1. What extra meaning does the nested route add?
2. When would two route shapes return different representations?
3. How should canonical linking avoid ambiguity?


---

## S-005 — Do not require nesting for an independent aggregate root

**Known limits:** none

### Near-literal normalized transcript

**When you should not nest—even if you can**

**1) Child is an independent resource (aggregate root)**

If a course has its own lifecycle, prefer:

```http
GET   /courses/{courseId}
PATCH /courses/{courseId}
```

Keep nesting mainly for listing/creating under the parent:

```http
GET  /authors/{authorId}/courses
POST /authors/{authorId}/courses
```

### Study meaning

The top-level course URI becomes the canonical single-resource identity. Nested collection operations still express author context where it is useful.

### Recall questions

1. Which operations use the top-level route?
2. Which operations remain nested?
3. What makes Course an aggregate root?
4. Which URI should Location normally use after creation?


---

## S-006 — Reparenting and multiple parents make nested identity unstable

**Known limits:** none

### Near-literal normalized transcript

**2) Child can change parent / belong to multiple parents**

If a course can be reassigned to another author or co-owned:

- the nested URL becomes unstable or misleading;
- several valid URLs may identify the same resource.

### Study meaning

A canonical URI should not change merely because a relationship changes unless the relationship is part of the resource identity. Many-to-many membership is often modeled with relationship endpoints or filtered collections.

### Recall questions

1. Why does reparenting destabilize a nested URI?
2. What problem arises with co-ownership?
3. What route can remain stable?
4. How can the relationship be modeled separately?


---

## S-007 — Redundancy and mismatch failure semantics

**Known limits:** none

### Near-literal normalized transcript

**3) Redundancy and failure semantics**

With nesting, decide what happens when `authorId` and `courseId` do not match:

- usually return **404** so existence is not leaked across scopes;
- sometimes return **403** when the API intentionally reveals existence.

This adds complexity compared with:

```http
/courses/{courseId}
```

### Study meaning

Choose 404/403 as a documented security/product policy. A parent-scoped query naturally yields 404 for both missing and wrong-parent resources without first revealing a globally located child.

### Recall questions

1. Why can 404 protect cross-scope existence?
2. When can 403 be appropriate?
3. Why must the policy be consistent?
4. What query shape supports the 404 policy?


---

## S-008 — Canonical URL and query-versus-route distinction

**Known limits:** none

### Near-literal normalized transcript

**Two practical additions**

**A) Pick a canonical URL**

If both are supported:

```http
/courses/{courseId}
/authors/{authorId}/courses/{courseId}
```

choose the canonical form for links, `Location`, `CreatedAtAction`, and documentation.

**B) Query vs route**

Use query filtering across the whole collection:

```http
/courses?authorId=123&level=beginner
```

Use nesting for “courses belonging to this author”:

```http
/authors/123/courses
```

### Study meaning

A query narrows a canonical collection. A nested path foregrounds parent context. Both can be supported when they have distinct roles and a documented canonical single-resource URI.

### Recall questions

1. Why choose one canonical URI?
2. Which headers/helpers use it?
3. What does the query example express?
4. What does the nested collection express?


---

## S-009 — Nested and top-level endpoints can coexist

**Known limits:** none

### Near-literal normalized transcript

Nested routes are not forbidden when parent-less access is also required; do not make nesting the only access path in that case.

A nested route:

```http
GET /authors/{authorId}/courses/{courseId}
```

expresses “course in the context of that author.”

If the business also needs:

- get a course by ID regardless of author;
- create a course without author in the URL;

also expose:

```http
GET  /courses/{courseId}
POST /courses
```

Rule:

- use nested routes when parent context matters;
- provide top-level routes when the resource must be addressable without that context.

### Study meaning

Multiple route shapes are acceptable when their semantics are clear. Treat noncanonical nested single-resource routes as scoped views/checks or aliases, and generate links consistently.

### Recall questions

1. When should top-level endpoints be added?
2. What does the nested route communicate?
3. Can both route families coexist?
4. How should link generation remain consistent?


---

## S-010 — Pattern A: Course is an aggregate root

**Known limits:** none

### Near-literal normalized transcript

**Recommended patterns—pick based on invariants**

**Pattern A: Course is an aggregate root (common)**

Expose:

```http
GET /courses/{courseId}
```

as canonical for one resource.

Also expose:

```http
GET /authors/{authorId}/courses
```

for listing/filtering.

Optionally expose:

```http
GET /authors/{authorId}/courses/{courseId}
```

only when a scoped view/check is useful.

### Study meaning

This pattern separates stable child identity from parent-scoped collection navigation. The optional nested single route must still verify membership.

### Recall questions

1. Which URI is canonical?
2. What is the role of the nested collection?
3. When is the nested single route justified?
4. What membership check is required?


---

## S-011 — Pattern B: Course is truly a child of Author

**Known limits:** none

### Near-literal normalized transcript

**Pattern B: Course is truly a child of Author (cannot exist without it)**

Require the parent on creation:

```http
POST /authors/{authorId}/courses
```

A convenience by-ID endpoint may still exist when the business needs it:

```http
GET /courses/{courseId}
```

The source summarizes:

```text
nested for lifecycle, top-level for lookup
```

### Study meaning

A convenience lookup does not necessarily change aggregate ownership. Commands that enforce lifecycle/invariants can remain nested while a globally indexed read endpoint is offered separately.

### Recall questions

1. Which operation requires the parent?
2. Why can a top-level lookup still exist?
3. Does lookup convenience redefine aggregate ownership?
4. Which route should creation return as canonical?
