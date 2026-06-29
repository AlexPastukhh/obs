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
