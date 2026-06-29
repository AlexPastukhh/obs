# R03 — multitenancy, context pooling, and mitigation

Generated: 2026-06-30

## Policy

This file replaces coverage-only status with screenshot-specific text, code, meaning, and recall questions.

## S-010 — Tenant-aware query filters

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

For multitenancy, the tenant identifier normally comes from request/user context and is made available on the current `DbContext`. The model filter references that context property:

```csharp
modelBuilder.Entity<Order>()
    .HasQueryFilter(
        o => o.TenantId == TenantId);
```

The tenant value must be populated for every logical unit of work.

### Study meaning

The model expression is stable, while the context instance supplies the current tenant value during query execution.

### Recall questions

1. Where should the current tenant value live?
2. When must it be populated?
3. Why should tenant filtering be enforced centrally?

## S-011 — Context pooling and tenant state

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

`AddDbContextPool` reuses `DbContext` instances across requests.

Therefore:

- request-specific tenant state must not be captured once and left on the pooled instance;
- the tenant value must be assigned/reset for each request or unit of work;
- `OnConfiguring` is not a safe per-request initialization point for pooled contexts because it runs when the instance is initially created.

### Study meaning

Pooling changes object lifetime. Mutable request state must be treated as reusable-instance state and initialized every time the context is checked out.

### Recall questions

1. Why is a pooled DbContext different from a fresh scoped context?
2. Where should request-specific TenantId be assigned?
3. What data leak can stale tenant state cause?

## S-012 — Microsoft-style required-navigation example

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The example uses:

- `Blog` as the required principal;
- a global Blog filter, for example one that keeps only URLs containing `"fish"`;
- Posts that reference Blogs.

Querying Posts directly returns all matching Posts. Querying Posts with `Include(p => p.Blog)` returns fewer rows because the required navigation is translated through an `INNER JOIN`, and Blogs removed by the filter also remove their Posts from the joined result.

### Study meaning

The screenshot demonstrates that query shape, not only the root entity filter, determines which rows survive materialization.

### Recall questions

1. Which entity has the filter?
2. Which entity unexpectedly loses rows?
3. Why does adding Include change the result?

## S-013 — Count difference: Posts alone versus Posts with Blog

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The compared queries are:

```csharp
var allPosts = await db.Posts
    .ToListAsync();

var allPostsWithBlogsIncluded =
    await db.Posts
        .Include(p => p.Blog)
        .ToListAsync();
```

The source's example yields six Posts from the first query and three from the query that includes Blog.

### Study meaning

The numeric difference makes the trap visible: materializing a required filtered navigation can change the root row count.

### Recall questions

1. What counts are shown?
2. Which query returns fewer rows?
3. What should an integration test assert for this model?

## S-014 — Optional navigation and matching filters

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Two mitigation patterns are emphasized:

1. Configure the relationship as optional when a missing/filtered principal is valid. SQL can retain the Post with a `LEFT JOIN`.
2. Add a consistent filter to the dependent, for example a Post filter that reflects whether its Blog should be visible.

Practical lesson: required navigations and filters on principals must be designed together.

### Study meaning

A left join preserves the root row with a null related value, while consistent dependent filtering intentionally removes it according to explicit domain rules.

### Recall questions

1. What result does a LEFT JOIN preserve?
2. When is a dependent-side filter more honest than making the relationship optional?
3. What model decisions must be reviewed together?

## S-015 — Precise materialization rule

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The final rule is:

> A parent/root entity appears only when the final SQL result still contains at least one row from which EF can materialize it.

If filters and joins remove every SQL row for that root entity, EF cannot materialize the root even if the root table itself contains the row.

### Study meaning

Reason about the final relational result, not only the LINQ root. Filters, join types, includes, and requiredness collectively determine materialization.

### Recall questions

1. What must remain in the final SQL result for a root entity to appear?
2. Can a root row exist in its table yet be absent from the EF result?
3. Which model/query features can remove the final SQL row?
