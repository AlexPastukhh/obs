# Query filters EF Core — corrected source-preserving transcript v002

Generated: 2026-06-30

## Coverage

```text
exact uploaded SVG preserved: yes
unique embedded screenshots: 15
image uses: 15
native SVG labels: 15
near-literal source blocks: 15
uncovered source uses: 0
```

The prior final-coverage file proved that IDs were closed but contained no substantive transcript. This v002 document is the active study transcript.

# R01 — query-filter basics, bypasses, and multiple filters

Generated: 2026-06-30

## Policy

This file replaces coverage-only status with screenshot-specific text, code, meaning, and recall questions.

## S-001 — Basic HasQueryFilter syntax

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

A global query filter is configured in `OnModelCreating`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Post>()
        .HasQueryFilter(p => !p.IsDeleted);
}
```

A normal query:

```csharp
var posts = await context.Posts.ToListAsync();
```

is effectively treated as:

```csharp
var posts = await context.Posts
    .Where(p => !p.IsDeleted)
    .ToListAsync();
```

unless query filters are explicitly disabled.

### Study meaning

A global query filter is an implicit predicate attached to an entity type. EF composes it into ordinary LINQ queries.

### Recall questions

1. Where is HasQueryFilter configured?
2. What predicate implements the shown soft-delete rule?
3. Does the caller need to repeat the predicate in every query?
4. How can the filter later be bypassed?

## S-002 — Filters apply automatically to ordinary queries and Includes

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The source shows ordinary queries such as:

```csharp
var a = await context.Posts.ToListAsync();

var b = await context.Posts
    .Where(p => p.Title.Contains("EF"))
    .ToListAsync();

var c = await context.Posts
    .Include(p => p.Comments)
    .ToListAsync();
```

The global filter is still applied automatically. It is defined for an entity type and therefore affects queries that load that entity, including navigation loading where the filtered entity participates.

### Study meaning

Global filters compose with explicit predicates and relationship loading. They are not limited to a single repository method.

### Recall questions

1. Does an explicit Where remove the global filter?
2. Can Include be affected by filters?
3. At what level is a global query filter defined?

## S-003 — IgnoreQueryFilters

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

To bypass global query filters:

```csharp
var allPosts = await context.Posts
    .IgnoreQueryFilters()
    .ToListAsync();
```

To query only soft-deleted rows:

```csharp
var deletedPosts = await context.Posts
    .IgnoreQueryFilters()
    .Where(p => p.IsDeleted)
    .ToListAsync();
```

### Study meaning

`IgnoreQueryFilters` disables the model-level filters for that query. The caller must then add any desired predicate explicitly.

### Recall questions

1. What does IgnoreQueryFilters disable?
2. How would you query only deleted posts?
3. Why should filter bypasses be narrow and deliberate?

## S-004 — Named multiple filters in EF Core 10+

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The source shows named filters:

```csharp
modelBuilder.Entity<Blog>()
    .HasQueryFilter(
        "SoftDeleteFilter",
        b => !b.IsDeleted)
    .HasQueryFilter(
        "TenantFilter",
        b => b.TenantId == _tenantId);
```

Named filters allow logically separate filters to coexist and can support selective disabling where the EF Core version provides that capability.

### Study meaning

Named filters preserve separate concerns such as soft deletion and tenancy instead of merging them into one opaque predicate.

### Recall questions

1. Which two concerns are separated in the example?
2. Why are names useful?
3. Which EF Core generation does the screenshot associate with named multiple filters?

## S-005 — Multiple filters before EF Core 10

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

Before named multiple filters, calling `HasQueryFilter` repeatedly for the same entity replaces the previous filter. Combine conditions into one predicate instead:

```csharp
modelBuilder.Entity<Blog>()
    .HasQueryFilter(
        b => !b.IsDeleted &&
             b.TenantId == _tenantId);
```

### Study meaning

On older EF Core versions, one combined expression is needed so that adding a tenant rule does not silently remove the soft-delete rule.

### Recall questions

1. What happens when HasQueryFilter is called twice on older EF Core versions?
2. How should soft delete and tenancy be combined?
3. What production bug can an overwritten filter cause?


---

# R02 — required navigation, INNER JOIN, and data-loss trap

Generated: 2026-06-30

## Policy

This file replaces coverage-only status with screenshot-specific text, code, meaning, and recall questions.

## S-006 — Required-navigation INNER JOIN data-loss trap

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The model has a filtered principal entity and a required relationship:

```csharp
modelBuilder.Entity<Blog>()
    .HasQueryFilter(b => !b.IsDeleted);

modelBuilder.Entity<Post>()
    .HasOne(p => p.Blog)
    .WithMany(b => b.Posts)
    .IsRequired();
```

A query including the required principal can be translated with an `INNER JOIN`. If the Blog row is removed by its filter, the joined Post row also disappears from the final result.

### Study meaning

A filter on the principal side can indirectly remove dependent rows when SQL requires a matching principal row.

### Recall questions

1. Why can a Post disappear even when Post has no filter?
2. Which SQL join shape causes the behavior?
3. What relationship configuration encourages that join?

## S-007 — Include exposes the required-navigation trap

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The shown query is:

```csharp
var posts = await context.Posts
    .Include(p => p.Blog)
    .ToListAsync();
```

Some Posts can vanish because the generated SQL needs a matching Blog row and the Blog's global filter removes that row.

### Study meaning

The result of querying Posts alone can differ from querying Posts with a filtered required navigation included.

### Recall questions

1. What navigation is included?
2. Why can Include reduce the number of root Posts?
3. Would the same risk exist with a left join?

## S-008 — Mitigations for the required-navigation trap

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

The source lists practical fixes:

- make the navigation optional so SQL can use a `LEFT JOIN`;
- configure matching/consistent filters on both sides where that reflects the domain;
- carefully review `Include` together with required relationships and filtered principal entities.

### Study meaning

The correct mitigation depends on the domain. Do not mark a genuinely required relationship optional only to hide a query-model inconsistency.

### Recall questions

1. How can an optional navigation change SQL translation?
2. What does a consistent dependent-side filter achieve?
3. Why must the mitigation reflect domain semantics?

## S-009 — A soft-delete filter does not implement soft deletion

**Placement status:** `unique-source`  
**Known limits:** none

### Near-literal normalized transcript

A query filter only hides rows. Deletion behavior still needs to convert `Deleted` entries into updates:

```csharp
public override int SaveChanges()
{
    foreach (var entry in
             ChangeTracker.Entries<Post>())
    {
        if (entry.State == EntityState.Deleted)
        {
            entry.State = EntityState.Modified;
            entry.Entity.IsDeleted = true;
        }
    }

    return base.SaveChanges();
}
```

An interceptor can implement the same policy centrally.

### Study meaning

Read filtering and write transformation are separate responsibilities. Without SaveChanges logic, calling Remove can still physically delete a row.

### Recall questions

1. What does the global filter do?
2. What does the SaveChanges override do?
3. Why is changing state to Modified necessary?
4. Where else can this policy be implemented?


---

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
