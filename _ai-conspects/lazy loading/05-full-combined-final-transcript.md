# Full combined final transcript — lazy loading

Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
meaningful text elements: 11 / 11
unique embedded screenshots: 40 / 40
screenshot uses: 40 / 40
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — N+1, IQueryable versus IEnumerable and eager loading

The first road separates query translation from in-memory execution. As long as the pipeline remains `IQueryable`, EF Core can compose one SQL query. After materialization or conversion to `IEnumerable`, later work runs in memory and navigation access may trigger N+1 queries.

### Query pipeline

- `IQueryable<T>` stores an expression tree that EF Core can translate.
- Operators such as `Where`, `Select`, `OrderBy` and aggregate projections should stay before `ToListAsync` when they must execute in SQL.
- `ToList`, `ToListAsync`, `AsEnumerable` or a non-translatable custom method ends or interrupts server translation.
- Modern EF Core normally throws when unsupported expressions appear outside the final client projection instead of silently evaluating an expensive query on the client.

### N+1 pattern

- The first query loads N parents.
- Accessing an unloaded collection once per parent issues N additional queries.
- For 100 orders, one parent query plus 100 item queries means 101 database round trips.
- Projection can calculate counts or totals in the original SQL without loading each collection.

### Preferred query shapes

- Use `Include` when the application truly needs the related entity graph.
- Use projection for DTOs, counts and totals; it usually selects less data.
- Use `AsSplitQuery` when one large join would cause cartesian explosion, while accepting multiple intentional round trips.
- Indexes still matter: one well-shaped query can remain slow if filters or joins are not indexed.

### Client-evaluation traps

- Calling an arbitrary C# method inside `Where` cannot be translated unless the method is mapped or its logic is expressed with supported operations.
- Regex and culture-specific APIs may lack SQL translations; use provider-supported functions such as `EF.Functions.Like` where appropriate.
- Creating a custom object and then filtering on it should usually be rewritten as an anonymous/scalar projection until after materialization.

### Representative pattern

```csharp
var result = await context.Orders
    .Where(o => o.Status == OrderStatus.Open)
    .Select(o => new OrderSummaryDto
    {
        Id = o.Id,
        ItemCount = o.Items.Count,
        Total = o.Items.Sum(i => i.Price * i.Quantity)
    })
    .ToListAsync();
```

### Caveats

- A projection that touches a navigation is not automatically lazy loading; EF can translate it into SQL.
- N+1 occurs when navigation access happens after materialization and the navigation is loaded separately for each entity.

## R02 — Lazy-loading setup, proxies and runtime behavior

EF Core supports lazy loading through runtime proxies or `ILazyLoader`. Both approaches move database access into navigation-property reads.

### Proxy setup

- Install the proxies package and call `UseLazyLoadingProxies` in DbContext configuration.
- Proxy-based lazy loading requires an entity that can be subclassed and overridable navigation members.
- Navigation properties normally must be `virtual`, accessible and not declared on a sealed entity.
- EF creates a derived proxy whose overridden getter checks whether the navigation is loaded and queries when necessary.

### ILazyLoader setup

- `ILazyLoader` can be injected into an entity constructor without runtime proxy subclasses.
- A getter calls the loader with the entity and backing-field reference.
- This avoids proxy inheritance requirements but introduces an EF infrastructure dependency into the domain model.
- The getter normally falls back to the existing backing field or an empty collection when no loader is available.

### When the query runs

- Loading the root entity does not load an untouched lazy navigation.
- The first navigation getter access checks the loaded flag and may execute SQL.
- Subsequent reads use the already-loaded collection and do not issue another query for that entity.
- The entity must still be tracked by a live context with a configured loader.

### Failure situations

- After the DbContext is disposed, a lazy load cannot safely execute.
- `AsNoTracking` entities are generally not connected to the tracked relationship state needed for lazy loading.
- Detached or serialized entities have lost their context/loader.
- Code can therefore work inside a request scope but fail or silently return incomplete state later.

### Representative pattern

```csharp
services.AddDbContext<AppDbContext>(options =>
    options
        .UseSqlServer(connectionString)
        .UseLazyLoadingProxies());

public class Order
{
    public int Id { get; private set; }
    public virtual ICollection<OrderItem> Items { get; protected set; }
        = new List<OrderItem>();
}
```

### Caveats

- Lazy loading changes a property read into a potentially remote operation.
- Keep the context lifetime explicit; do not depend on lazy loading in background, cache or serialization code.

## R03 — ILazyLoader getter chain and aggregate-side effects

The short middle road explains the typical loader-backed getter and why it creates hidden I/O inside an aggregate.

### Getter chain

- First try `_lazyLoader?.Load(this, ref _items)`.
- If there is no loader or it did not populate the field, return the current `_items` value.
- If the backing field is still null, initialize an empty collection so callers do not receive null.
- The loader both loads and assigns the collection reference.

### Domain consequences

- A domain method such as `Cancel()` may touch `Items` and unexpectedly execute SQL.
- The aggregate's required state is not visible in the method signature or use case.
- Tests using plain entities may behave differently from production entities attached to EF.
- Performance becomes sensitive to which getters happen to be read.

### Representative pattern

```csharp
private ICollection<OrderItem>? _items;

public ICollection<OrderItem> Items =>
    _lazyLoader?.Load(this, ref _items)
    ?? _items
    ??= new List<OrderItem>();
```

### Caveats

- A non-null empty collection is convenient, but it can hide the difference between 'loaded empty' and 'not loaded'.
- Explicit loading or purpose-built queries make required state visible before domain execution.

## R04 — Proxy limitations, backing fields and DDD-safe alternatives

Proxy lazy loading conflicts with domain encapsulation because proxies intercept virtual property access, not arbitrary reads of private fields.

### Proxy interception boundary

- The generated subclass overrides the virtual navigation getter.
- Direct reads of `_items` inside domain methods bypass the proxy override and therefore bypass lazy loading.
- A public read-only interface still often exposes a mutable collection implementation at runtime.
- EF may need to set or replace collections while materializing and tracking relationships.

### Encapsulation tension

- DDD aggregates commonly keep a private mutable list and expose an `IReadOnlyCollection`.
- Proxy requirements push the model toward public/protected virtual setters and overridable members.
- Callers may cast the runtime collection back to a mutable interface and bypass aggregate methods.
- Serialization, logging, mapping or debugging can walk virtual navigations and accidentally trigger queries.

### Aggregate-boundary erosion

- Virtual navigations encourage graph traversal across aggregates.
- Each navigation hop can perform another database round trip.
- The domain model starts behaving differently depending on whether it is attached to a live context.
- This obscures invariants, I/O cost and transactional boundaries.

### Safer pattern

- Keep private backing fields and invariant-enforcing methods.
- Load aggregate children explicitly with `Include` for commands that require them.
- Use projections for read models.
- Prefer explicit application-layer loading over hidden infrastructure behavior.

### Representative pattern

```csharp
var order = await context.Orders
    .Include(o => o.Items)
    .SingleAsync(o => o.Id == id);

order.Cancel();
await context.SaveChangesAsync();
```

### Caveats

- Lazy loading is not always wrong, but it should be a deliberate infrastructure trade-off rather than a default.
- The more important aggregate invariants are, the more valuable explicit state loading becomes.

## Regional source map

### R01

- transcript: `01-transcript-R01-n+1-iqueryable-versus-ienumerable-and-eager-loading.md`
- text elements: `5`
- screenshot uses: `15`
- unique screenshots: `15`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-lazy-loading-setup-proxies-and-runtime-behavior.md`
- text elements: `3`
- screenshot uses: `11`
- unique screenshots: `11`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-ilazyloader-getter-chain-and-aggregate-side-effects.md`
- text elements: `0`
- screenshot uses: `2`
- unique screenshots: `2`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-proxy-limitations-backing-fields-and-ddd-safe-alternatives.md`
- text elements: `3`
- screenshot uses: `12`
- unique screenshots: `12`
- remaining: `0`

## Exactness note

This file is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
provider-specific SQL and EF Core version details.
