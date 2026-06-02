# R02 - EntityEntry properties / methods / query / navigation / value APIs

Generated: 2026-06-02 13:06:29 UTC

## 0.1 Area overview / key ideas / reading quality

This area starts where R01 leaves off.

R01 owns the `ChangeTracker`-level APIs. R02 owns the object returned by `ChangeTracker.Entries()` and `context.Entry(entity)`: `EntityEntry`.

The road is:

```text
EntityEntry overview
→ State / Entity / Metadata / Context / IsKeySet
→ CurrentValues / OriginalValues / DatabaseValues
→ Property / Properties / Members
→ Reference / Collection / Navigation
→ Load / IsLoaded / Query()
→ Reload / GetDatabaseValues / SetValues
→ disconnected and concurrency-oriented examples
```

Key ideas:

```text
1. `EntityEntry` is the per-entity handle EF exposes for inspecting and controlling tracked state.
2. `State` controls whether SaveChanges treats an entity as Added, Modified, Deleted, Unchanged, or Detached.
3. `CurrentValues` are what EF will save; `OriginalValues` are what EF remembers from the original snapshot.
4. `Property(...)` gives precise scalar-property control, including CurrentValue, OriginalValue, and IsModified.
5. `Reference(...)`, `Collection(...)`, and `Navigation(...)` give explicit navigation loading and tracking handles.
6. `Query()` lets you compose a query for a related collection/reference before loading it.
7. `Reload()` overwrites the tracked entity from the database; `GetDatabaseValues()` fetches database values for comparison/merge.
8. `SetValues()` is the workhorse for copying DTO/database values into CurrentValues or OriginalValues.
9. `Metadata` is for generic model-aware code: audit, admin tools, debugging mappings, and type-independent logic.
```

Reading quality:

```text
overall: high
included image uses: 67
corrected out of R02 into R01: S-001, S-002, S-003
```

## 0.2 Coverage / boundary review

Included in R02:

```text
S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-098, S-099, S-100, S-101, S-102, S-103, S-104, S-105, S-106, S-107, S-108, S-109, S-110, S-111, S-112, S-113, S-114, S-115, S-116, S-117, S-118, S-119, S-120, S-121, S-122, S-123, S-124, S-125, S-126, S-127, S-161, S-162, S-163, S-164
```

Corrected out of R02 into R01:

```text
S-001, S-002, S-003
```

Reason: `S-001`/`S-002`/`S-003` are ChangeTracker overview/core member screenshots. They mention `EntityEntry`, but their owner is the ChangeTracker overview road. R02 starts from the detailed `EntityEntry` surface.

## 1. What `EntityEntry` gives you

`ChangeTracker.Entries()` returns `EntityEntry` objects.

Each `EntityEntry` is the per-entity view into EF Core tracking:

```text
Entity
State
CurrentValues
OriginalValues
Properties
References
Collections
Navigations
Property(...)
Reference(...)
Collection(...)
```

Mental model:

```text
ChangeTracker = context-level state manager
EntityEntry   = one tracked entity's state/control object
PropertyEntry = one scalar property's state/control object
NavigationEntry / ReferenceEntry / CollectionEntry = navigation state/control objects
```

## 2. `Entity` and `State`

`entry.Entity` is the actual CLR object being tracked.

`entry.State` is EF's state for that entity:

```text
Detached
Unchanged
Added
Modified
Deleted
```

Example:

```csharp
foreach (var entry in context.ChangeTracker.Entries())
{
    Console.WriteLine($"{entry.Entity.GetType().Name}: {entry.State}");
}
```

You can also set the state:

```csharp
var entry = context.Entry(order);
entry.State = EntityState.Modified;
```

Important meaning:

```text
Added    -> insert
Modified -> update
Deleted  -> delete
Unchanged -> tracked but no pending write
Detached  -> not tracked
```

## 3. `CurrentValues` and `OriginalValues`

`CurrentValues` are the current in-memory values EF will use when saving.

`OriginalValues` are the values EF remembers from when the entity was queried or attached as original state. They matter for:

```text
change detection
audit
optimistic concurrency
diff views
merge/retry logic
```

Example:

```csharp
var entry = context.Entry(order);

var currentName = entry.CurrentValues["Name"];
var originalName = entry.OriginalValues["Name"];
```

You can inspect changes:

```csharp
foreach (var property in entry.Properties)
{
    if (property.IsModified)
    {
        Console.WriteLine($"{property.Metadata.Name}: {property.OriginalValue} -> {property.CurrentValue}");
    }
}
```

## 4. `Property(...)` and scalar property control

`entry.Property(...)` gives a handle for one scalar property.

Examples:

```csharp
var entry = context.Entry(order);

var versionProp = entry.Property(x => x.AggregateVersion);

var original = versionProp.OriginalValue;
var current = versionProp.CurrentValue;
var isModified = versionProp.IsModified;
```

You can mark only one property modified:

```csharp
context.Attach(order);

context.Entry(order)
    .Property(x => x.Name)
    .IsModified = true;
```

String-based access is useful for generic code:

```csharp
var prop = context.Entry(entity).Property("Name");
prop.CurrentValue = "New name";
prop.IsModified = true;
```

Rule:

```text
EntityEntry.State = coarse whole-entity state.
PropertyEntry.IsModified = precise per-property update control.
```

## 5. `Properties`, `Members`, and navigation collections

`entry.Properties` enumerates scalar property entries.

`entry.References` enumerates reference navigation entries.

`entry.Collections` enumerates collection navigation entries.

`entry.Navigations` covers navigation entries more generally.

These are useful for:

```text
generic audit code
debugging
loading/checking navigation state
generic admin tools
```

Example:

```csharp
foreach (var property in entry.Properties)
{
    Console.WriteLine($"{property.Metadata.Name}: {property.CurrentValue}");
}
```

Navigation state:

```csharp
var collection = context.Entry(blog).Collection(b => b.Posts);

Console.WriteLine(collection.IsLoaded);
await collection.LoadAsync();
Console.WriteLine(collection.IsLoaded);
```

## 6. `Reference(...)`, `Collection(...)`, and `Navigation(...)`

Use `Reference(...)` for a single related entity:

```csharp
await context.Entry(post)
    .Reference(p => p.Blog)
    .LoadAsync();
```

Use `Collection(...)` for a collection navigation:

```csharp
await context.Entry(blog)
    .Collection(b => b.Posts)
    .LoadAsync();
```

`Navigation(...)` can be used when code wants to address a navigation in a more generic way.

Typical tasks:

```text
explicit loading
checking IsLoaded
querying related data before load
generic traversal/diagnostics
```

## 7. `Query()` for related data

`Query()` exists on navigation entry APIs and gives an `IQueryable` for related data.

Collection example:

```csharp
var query = context.Entry(blog)
    .Collection(b => b.Posts)
    .Query();

var recentPosts = await query
    .Where(p => p.CreatedAt >= cutoff)
    .ToListAsync();
```

Count without loading the whole collection:

```csharp
var count = await context.Entry(blog)
    .Collection(b => b.Posts)
    .Query()
    .CountAsync();
```

Reference navigation also has `Query()`:

```csharp
var exists = await context.Entry(post)
    .Reference(p => p.Blog)
    .Query()
    .AnyAsync();
```

That produces a query for the related single entity, effectively an `IQueryable<Blog>`.

Use `Query()` when you want filtering, counting, projection, or existence checks without blindly loading an entire navigation.

## 8. `IsKeySet`

`entry.IsKeySet` answers whether the key value is set.

This is useful in disconnected scenarios:

```csharp
var entry = context.Entry(entity);

if (entry.IsKeySet)
{
    context.Update(entity);
}
else
{
    context.Add(entity);
}
```

Mental model:

```text
key not set -> likely new entity
key set     -> likely existing entity, though still validate by domain/database rules
```

It is not a universal truth detector. It just answers whether EF sees a key value.

## 9. `Context`

`entry.Context` points back to the `DbContext` that owns this entry.

Use sparingly. It can be useful inside generic helpers or interceptors, but most code already has the context.

Example:

```csharp
var context = entry.Context;
```

## 10. `Reload()` / `ReloadAsync()`

`Reload()` refreshes a tracked entity from the database.

Example:

```csharp
await context.Entry(order).ReloadAsync();
```

Effect:

```text
current tracked values are overwritten with database values
entity usually becomes Unchanged
```

Use it when:

```text
discard local changes
refresh stale tracked state
sync with database after external changes
```

Be careful: it can wipe local unsaved changes.

## 11. `GetDatabaseValues()` / `GetDatabaseValuesAsync()`

`GetDatabaseValues()` fetches database values for the entity without automatically replacing the current tracked values.

Example:

```csharp
var databaseValues = await context.Entry(order).GetDatabaseValuesAsync();

if (databaseValues is null)
{
    // row was deleted
}
```

Use it for:

```text
concurrency conflict handling
diff current/original/database values
merge/retry logic
admin/debugging
```

Conflict handling shape:

```csharp
catch (DbUpdateConcurrencyException ex)
{
    foreach (var entry in ex.Entries)
    {
        var databaseValues = await entry.GetDatabaseValuesAsync();

        if (databaseValues is null)
        {
            throw; // row was deleted
        }

        entry.OriginalValues.SetValues(databaseValues);

        // optionally keep or adjust entry.CurrentValues here
    }
}
```

Meaning:

```text
OriginalValues.SetValues(databaseValues) refreshes the concurrency baseline.
CurrentValues can keep the intended user changes or be merged manually.
```

## 12. `SetValues()`

`SetValues()` copies values from another object/value container into EF property values.

DTO to entity:

```csharp
var entry = context.Entry(entity);
entry.CurrentValues.SetValues(dto);
```

Database values to original values:

```csharp
entry.OriginalValues.SetValues(databaseValues);
```

Common uses:

```text
copy DTO fields into tracked entity
merge database values after concurrency conflict
reset original values after conflict resolution
generic update helpers
```

Rule:

```text
CurrentValues.SetValues(...) changes what EF intends to save.
OriginalValues.SetValues(...) changes what EF uses as the baseline/concurrency snapshot.
```

## 13. `Metadata`

`entry.Metadata` describes the EF model type.

Use it for generic model-aware code:

```csharp
var meta = entry.Metadata;

var prop = meta.FindProperty("Name");
var nav = meta.FindNavigation("Posts");
var pk = meta.FindPrimaryKey();

foreach (var p in meta.GetProperties())
{
    Console.WriteLine(p.Name);
}

foreach (var n in meta.GetNavigations())
{
    Console.WriteLine(n.Name);
}
```

Use cases:

```text
generic audit code
debugging mappings
admin tools
code that should work for any entity type
```

`Metadata` tells you what EF knows about the model, not just what properties happen to exist on the CLR object.

## 14. Evidence table

| Source group | What it supports |
|---|---|
| S-004-S006/S098-S102 | EntityEntry overview, Entity, State, CurrentValues, OriginalValues, Properties, Context. |
| S-007-S011/S103-S107 | Property-level APIs, property values, IsModified, original/current/current values, per-property modification. |
| S-012-S036 | Reference/Collection/Navigation APIs, Query(), explicit loading, IsLoaded, reference Query(). |
| S-108-S119 | CurrentValues/OriginalValues/DatabaseValues/Reload/GetDatabaseValues/SetValues examples and conflict handling. |
| S-120-S127 | Metadata: model info, primary key, properties, navigations, generic code. |
| S-161-S164 | Concurrency merge/retry shape: GetDatabaseValuesAsync, OriginalValues.SetValues(databaseValues), preserving intended changes. |
| S-001-S003 | Corrected into R01 as ChangeTracker overview/core member screenshots. |

## 15. Open questions / follow-up hooks

- R03 should take `TrackGraph` / disconnected graph traversal, with `S-083/S-084` already reserved from R01.
- R03/R04 should avoid duplicating EntityEntry basics; it can reuse them as prerequisites when explaining TrackGraph callbacks and events.
- In application code, `GetDatabaseValues` and `SetValues` need explicit product-level merge rules.
