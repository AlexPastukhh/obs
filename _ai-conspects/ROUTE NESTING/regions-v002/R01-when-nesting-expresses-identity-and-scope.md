# ROUTE NESTING — R01-when-nesting-expresses-identity-and-scope

Generated: 2026-07-03

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
