# ROUTE NESTING — R02-when-not-to-nest-and-failure-semantics

Generated: 2026-07-03

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
