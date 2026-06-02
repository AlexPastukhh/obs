# R01 - ChangeTracker core methods / detection / cascade / debug behavior

Generated: 2026-06-02 12:47:24 UTC

## 0.1 Area overview / key ideas / reading quality

This area is about `ChangeTracker` itself: what EF Core currently tracks, how it detects changes, when it marks related entities as deleted, how query tracking defaults work, and how to inspect the tracked graph.

The main road is:

```text
HasChanges / DetectChanges
→ AutoDetectChangesEnabled
→ Clear
→ QueryTrackingBehavior
→ CascadeDeleteTiming / DeleteOrphansTiming / CascadeChanges
→ LazyLoadingEnabled
→ AcceptAllChanges / acceptAllChangesOnSuccess
→ DebugView
```

Key ideas:

```text
1. `HasChanges()` asks whether EF currently sees pending tracked changes that matter for `SaveChanges()`.
2. `DetectChanges()` is in-memory. It compares tracked entities to stored original values/snapshots and updates entity/property states.
3. `AutoDetectChangesEnabled = false` does not turn off tracking. It only disables EF's automatic calls to `DetectChanges()`.
4. `Clear()` detaches tracked entities. It does not save anything.
5. `QueryTrackingBehavior` controls the default tracking mode for LINQ queries from this context.
6. Cascade/orphan timings control when EF applies client-side delete state transitions.
7. `CascadeChanges()` forces cascade/orphan transitions when you need explicit control.
8. `AcceptAllChanges()` means "treat the current tracked state as accepted/persisted"; `SaveChanges` usually calls it automatically after success.
9. `DebugView` is the diagnostic window into EF's tracked graph and states.
```

Reading quality:

```text
overall: high
included image uses: 51
pulled into R01 after boundary recheck: S-081, S-082
checked-not-R01 reserved for R02: S-001, S-036
checked-not-R01 reserved for R03: S-083, S-084
```

The screenshots are mostly readable. Some code examples are continuation fragments; this transcript preserves the semantic road and the important API calls rather than pretending each crop is a full standalone snippet.

## 0.2 Coverage / boundary review

Included in R01:

```text
S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050, S-051, S-052, S-053, S-054, S-055, S-056, S-057, S-058, S-059, S-060, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069, S-070, S-071, S-072, S-073, S-074, S-075, S-076, S-077, S-078, S-079, S-080, S-081, S-082, S-156, S-157, S-158, S-159, S-160
```

Pulled into R01 after boundary recheck:

```text
S-081, S-082
```

Reason: these screenshots are `AcceptAllChanges()` / `acceptAllChangesOnSuccess` material, so they continue the ChangeTracker core behavior road.

Checked but not included:

```text
S-001, S-036
```

Reason: `EntityEntry` properties/methods/value/navigation/query APIs belong to R02.

Also checked but not included:

```text
S-083, S-084
```

Reason: `TrackGraph` and disconnected graph traversal belong to R03.

## 1. `HasChanges()`

`HasChanges()` checks whether the `DbContext` currently knows about tracked changes that would matter to `SaveChanges()`.

Use it for a quick question:

```text
Do I need to save anything at all?
```

Example:

```csharp
using var context = new AppDbContext();

var user = await context.Users.FindAsync(1);
user.Name = "New name";

if (context.ChangeTracker.HasChanges())
{
    await context.SaveChangesAsync();
}
```

Typical use cases:

```text
avoid unnecessary SaveChanges()
log whether anything changed
skip audit work if nothing changed
```

Conditional save example:

```csharp
public async Task UpdateUserNameAsync(int id, string newName)
{
    using var context = new AppDbContext();

    var user = await context.Users.FindAsync(id);
    if (user is null) return;

    user.Name = newName;

    if (!context.ChangeTracker.HasChanges())
        return;

    await context.SaveChangesAsync();
}
```

Important note: `HasChanges()` depends on change detection being up to date. If automatic detection is disabled, call `DetectChanges()` first.

## 2. `DetectChanges()`

`DetectChanges()` forces EF Core to compare current values with original values and update entity/property states.

Use it when tracked state must be refreshed right now:

```csharp
using var context = new AppDbContext();

var user = await context.Users.FindAsync(1);
user.Name = "Changed manually";

context.ChangeTracker.DetectChanges();

bool changed = context.ChangeTracker.HasChanges(); // now definitely up to date
```

It is useful when:

```text
auto detect changes is disabled
you want to inspect tracked states
you run custom audit logic
you want to read DebugView
large batch scenarios require manual control
```

Audit-before-save example:

```csharp
using var context = new AppDbContext();

var order = await context.Orders.FindAsync(10);
order.Status = "Shipped";

context.ChangeTracker.DetectChanges();

foreach (var entry in context.ChangeTracker.Entries())
{
    Console.WriteLine($"{entry.Entity.GetType().Name}: {entry.State}");
}
```

`DetectChanges()` is in-memory only. It compares tracked entities to stored original values/snapshots. It does not require a database roundtrip.

For normal tracked entities, EF Core uses snapshot change tracking: when an entity is first tracked, EF stores a snapshot of its property values, and later `DetectChanges()` compares current values to that snapshot.

Important limitation:

```text
DetectChanges() only helps for tracked entities.
```

If an entity came from `AsNoTracking()`, EF did not create tracking/snapshot data. In disconnected scenarios where code later calls `Attach()` or `Update()`, EF may not know original database values unless you query them or explicitly set `IsModified` / `OriginalValues`.

Mental model:

```text
queried with normal tracking -> EF has original values -> DetectChanges can compare
queried with AsNoTracking -> no snapshot -> no automatic comparison
detached DTO later attached -> may need explicit state/original-value decisions
```

## 3. `AutoDetectChangesEnabled`

`AutoDetectChangesEnabled = false` does not stop tracking. It only stops automatic calls to `DetectChanges()` that EF Core normally performs before operations such as `SaveChanges()` or when returning change-tracking information.

If disabled, detect changes manually:

```csharp
context.ChangeTracker.DetectChanges();
```

or for one entity:

```csharp
context.Entry(entity).DetectChanges();
```

Normal pattern:

```csharp
var blog = await context.Blogs.SingleAsync(x => x.Id == id); // tracking query
blog.Name = "new name";

context.ChangeTracker.AutoDetectChangesEnabled = false;

// later, before SaveChanges:
context.ChangeTracker.DetectChanges();
await context.SaveChangesAsync();
```

This works because the entity is already tracked and EF has the original snapshot from when it was queried.

Usually you should not disable it. EF Core says change detection is not a bottleneck for most apps. Disabling automatic detection is mainly for cases where profiling shows repeated detection is expensive because the context tracks many entities.

Automatic detection is not only before `SaveChanges()`. EF can also run it for:

```text
ChangeTracker.Entries()
Entries<TEntity>()
HasChanges()
CascadeChanges()
```

That is why disabling it can help in hot paths that repeatedly inspect many tracked entities.

Typical good use case:

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
{
    foreach (var entry in ChangeTracker.Entries<PostTag>())
    {
        if (entry.State == EntityState.Added)
        {
            entry.Entity.TaggedBy = "system";
            entry.Entity.TaggedOn = DateTime.UtcNow;
        }
    }

    try
    {
        ChangeTracker.AutoDetectChangesEnabled = false;
        return await base.SaveChangesAsync(ct);
    }
    finally
    {
        ChangeTracker.AutoDetectChangesEnabled = true;
    }
}
```

The reason this is safe in that shape is that `Entries<TEntity>()` already triggered detection, and no later state-changing operations require a second full scan before `base.SaveChangesAsync`.

For large batch insert/update work, a safe pattern is:

```csharp
context.ChangeTracker.AutoDetectChangesEnabled = false;
try
{
    // bulk work

    context.ChangeTracker.DetectChanges();
    await context.SaveChangesAsync();
}
finally
{
    context.ChangeTracker.AutoDetectChangesEnabled = true;
}
```

Another valid batch case:

```csharp
context.ChangeTracker.AutoDetectChangesEnabled = false;

foreach (var row in bigBatch)
{
    var entity = new MyEntity { Name = row.Name };
    context.Add(entity); // EF already knows Added
}

context.ChangeTracker.AutoDetectChangesEnabled = true;
await context.SaveChangesAsync();
```

This can help because repeated scans over a huge tracked graph can get expensive. Also, when changes go through EF APIs such as `Entry(...).Property(...).CurrentValue` or `Add`, EF may already know enough about those changes immediately.

For normal application code, leave it alone.

## 4. `Clear()`

`Clear()` detaches all currently tracked entities from the context in one shot.

Use it when reusing the same `DbContext` instance but removing tracked state:

```csharp
using var context = new AppDbContext();

var users = await context.Users.Take(1000).ToListAsync();

// tracked entities exist here

context.ChangeTracker.Clear();

// now nothing is tracked
```

Useful cases:

```text
long-running context accumulated too many tracked entities
batch processing in chunks
tests
avoid stale tracked entities in reused context scope
```

Chunk processing example:

```csharp
using var context = new AppDbContext();

int page = 0;
const int pageSize = 500;

while (true)
{
    var items = await context.Orders
        .OrderBy(o => o.Id)
        .Skip(page * pageSize)
        .Take(pageSize)
        .ToListAsync();

    if (items.Count == 0)
        break;

    foreach (var item in items)
    {
        item.Status = "Processed";
    }

    await context.SaveChangesAsync();
    context.ChangeTracker.Clear();

    page++;
}
```

Important warning:

```text
Clear() does not save anything. It just stops tracking.
```

This is dangerous if pending changes were expected to remain tracked:

```csharp
context.ChangeTracker.Clear();
await context.SaveChangesAsync(); // nothing to save now
```

## 5. `QueryTrackingBehavior`

`QueryTrackingBehavior` controls the default tracking behavior for LINQ queries from this context.

Common values:

```text
TrackAll
NoTracking
NoTrackingWithIdentityResolution
```

Use it when a context-wide default is better than adding `.AsNoTracking()` everywhere.

Example: make all queries no-tracking by default:

```csharp
using var context = new AppDbContext();

context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

var users = await context.Users.ToListAsync(); // no tracking by default
```

Per-query override:

```csharp
using var context = new AppDbContext();

context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

var readonlyUsers = await context.Users.ToListAsync(); // not tracked

var trackedUser = await context.Users
    .AsTracking()
    .FirstAsync(u => u.Id == 1);
```

Typical use cases:

```text
read-heavy contexts
query services
reporting endpoints
reduce accidental tracking
```

Read-only service example:

```csharp
public async Task<List<ProductDto>> GetProductsAsync()
{
    using var context = new AppDbContext();

    context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

    return await context.Products
        .Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name
        })
        .ToListAsync();
}
```

Important note:

```text
QueryTrackingBehavior is only the default for queries.
It does not stop explicit tracking APIs such as Add, Attach, Update.
```

## 6. `DebugView`

`DebugView` is a debugging representation of the current tracked graph and states.

Use it to inspect what EF thinks is happening:

```text
why something is Modified
why something is not Modified
what is tracked
foreign key values
current/original values
navigation relationships
```

There are typically short and long views.

Example:

```csharp
using var context = new AppDbContext();

var blog = await context.Blogs
    .Include(b => b.Posts)
    .FirstAsync();

blog.Name = "Changed";

context.ChangeTracker.DetectChanges();

Console.WriteLine(context.ChangeTracker.DebugView.ShortView);
Console.WriteLine("------");
Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

When `SaveChanges()` behaves unexpectedly, print the debug view:

```csharp
Console.WriteLine(context.ChangeTracker.DebugView.LongView);
```

You may see:

```text
entity state Modified
which properties changed
FK values
navigation relationships
```

## 7. Cascade/orphan timing

`DeleteOrphansTiming` controls when EF marks required dependents as `Deleted` after they become orphans due to relationship changes.

Default behavior: marking orphans as `Deleted` happens as soon as the relationship change is detected, but it can be delayed until `SaveChanges()`.

Example:

```csharp
parent.Children.Remove(child);
```

If `child` is required to have a parent, removing it can make it an orphan.

`DeleteOrphansTiming` lets you choose when EF reacts to that orphaning:

```text
immediately when change detection sees it
later at SaveChanges
never automatically, in which case you may need CascadeChanges() yourself
```

Why this matters:

```text
sometimes you remove a child from one parent only because you are about to attach it to another parent in the same unit of work
delaying orphan deletion avoids EF marking it Deleted too early during that temporary in-between state
```

Mental model:

```text
orphan = dependent entity no longer connected to required parent
DeleteOrphansTiming = when EF turns that orphan into Deleted state
```

`CascadeDeleteTiming` is similar, but it triggers from a different cause.

`CascadeDeleteTiming` controls when EF marks dependents as `Deleted` because the principal was deleted.

Example:

```csharp
var blog = await context.Blogs
    .Include(b => b.Posts)
    .SingleAsync(b => b.Id == 1);

context.Remove(blog);

// required dependent posts may be marked Deleted now or later,
// depending on CascadeDeleteTiming
```

Use this when the trigger is:

```text
parent/principal deleted
```

`DeleteOrphansTiming` is when the trigger is:

```text
required relationship severed
```

The common timing values are:

```text
Immediate
OnSaveChanges
Never
```

`Immediate`:

```csharp
context.ChangeTracker.CascadeDeleteTiming = CascadeTiming.Immediate;
context.ChangeTracker.DeleteOrphansTiming = CascadeTiming.Immediate;
```

Effect:

```text
delete parent -> children become Deleted now
sever required relationship -> orphan becomes Deleted now
```

This is the default behavior in modern EF Core.

`OnSaveChanges`:

```csharp
context.ChangeTracker.CascadeDeleteTiming = CascadeTiming.OnSaveChanges;
context.ChangeTracker.DeleteOrphansTiming = CascadeTiming.OnSaveChanges;
```

Effect:

```text
in-memory graph stays more intact during business logic
EF computes cascade/orphan deletes at save time instead
```

Useful when temporarily re-parenting an entity before save.

`Never`:

```csharp
context.ChangeTracker.CascadeDeleteTiming = CascadeTiming.Never;
context.ChangeTracker.DeleteOrphansTiming = CascadeTiming.Never;
```

EF will not automatically apply those client-side cascade/orphan deletions. If you still want EF to process them, call:

```csharp
context.ChangeTracker.CascadeChanges();
```

`DetectChanges()` and `CascadeChanges()` are different:

```text
DetectChanges() = notice relationship/property changes in tracked entities
CascadeChanges() = apply cascade-delete/orphan-delete consequences immediately
```

When timings are set to `Never`, `DetectChanges()` by itself is not enough to perform cascade/orphan delete transitions. `CascadeChanges()` forces cascading deletion of dependents and usually calls `DetectChanges()` internally first.

## 8. `LazyLoadingEnabled`

`ChangeTracker.LazyLoadingEnabled` controls whether navigation properties for tracked entities are loaded automatically on first access.

This only works if a lazy-loading mechanism is configured, such as lazy-loading proxies or `ILazyLoader` injection.

Proxy setup example:

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    => optionsBuilder
        .UseLazyLoadingProxies()
        .UseSqlServer(connectionString);
```

Entities usually need `virtual` navigation properties for proxy-based lazy loading.

This is a ChangeTracker-level toggle, but it is not the whole lazy-loading setup. If proxies/ILazyLoader are not configured, the flag alone does not make lazy loading happen.

## 9. `AcceptAllChanges()` and `acceptAllChangesOnSuccess`

`AcceptAllChanges()` tells EF:

```text
assume tracked entities now match the database
```

The API accepts all changes and is typically called by `SaveChanges()` after a successful save.

State transitions:

```text
Added    -> Unchanged
Modified -> Unchanged
Deleted  -> detached / no longer treated as pending delete
```

Conceptually, original values/snapshots are reset to the current persisted state.

Normal case:

```csharp
await context.SaveChangesAsync();
```

By default, `SaveChanges` calls `AcceptAllChanges()` after the database write succeeds. The `acceptAllChangesOnSuccess` parameter controls this.

Manual pattern:

```csharp
await context.SaveChangesAsync(acceptAllChangesOnSuccess: false);

// do more work here, maybe commit an external transaction, maybe verify something

context.ChangeTracker.AcceptAllChanges();
```

Important retry / commit uncertainty use case:

```csharp
await using var tx = await context.Database.BeginTransactionAsync();

context.Blogs.Add(new Blog { Name = "New blog" });

await context.SaveChangesAsync(acceptAllChangesOnSuccess: false);
await tx.CommitAsync();

context.ChangeTracker.AcceptAllChanges();
```

Saving with `acceptAllChangesOnSuccess: false` means entity states are not immediately reset to `Unchanged`. That can allow retrying the same operation if the commit fails or if a transaction is rolled back.

Use this when you need tighter control over when EF considers the unit of work fully accepted.

## 10. Evidence table

| Source group | What it supports |
|---|---|
| S-037/S-038 | `HasChanges()` meaning, typical cases, conditional save, dependency on up-to-date detection. |
| S-039/S-041/S-063-S067 | `DetectChanges()` meaning, in-memory snapshot detection, manual mode, tracked-only limitation. |
| S-068-S072/S-047-S049 | Why/when to disable `AutoDetectChangesEnabled`, safe try/finally pattern, batch work, avoiding redundant detection. |
| S-042-S046/S-056-S058 | `Clear()` detaches tracked state, chunk processing, warning that it does not save. |
| S-050-S052 | `QueryTrackingBehavior`, per-query override, read-only service, and limits of the setting. |
| S-053-S055/S-059-S062 | `DebugView`, short/long views, SaveChanges diagnostics, current/original values and relationship inspection. |
| S-073-S077/S-156-S160 | `DeleteOrphansTiming`, `CascadeDeleteTiming`, timing values, `CascadeChanges()` vs `DetectChanges()`. |
| S-078 | `LazyLoadingEnabled` and requirement for configured lazy-loading mechanism. |
| S-079-S082 | `AcceptAllChanges()`, normal SaveChanges behavior, manual acceptance, retry/commit uncertainty pattern. |

## 11. Open questions / follow-up hooks

- R02 should pick up `EntityEntry` and value/member APIs without repeating the ChangeTracker-level material.
- R03 should start from `TrackGraph` and disconnected graph traversal, with S083/S084 already reserved.
- In later regions, keep separating "ChangeTracker-level operation" from "EntityEntry/member-level operation".
