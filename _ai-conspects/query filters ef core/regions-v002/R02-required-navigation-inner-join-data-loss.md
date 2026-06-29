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
