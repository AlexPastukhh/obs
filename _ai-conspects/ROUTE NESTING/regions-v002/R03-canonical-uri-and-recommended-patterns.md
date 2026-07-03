# ROUTE NESTING — R03-canonical-uri-and-recommended-patterns

Generated: 2026-07-03

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
