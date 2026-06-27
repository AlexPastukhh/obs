# Regional transcript — R02: Lazy-loading setup, proxies and runtime behavior

Conspect: `lazy loading`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 11 / 11
unique screenshots represented: 11
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

EF Core supports lazy loading through runtime proxies or `ILazyLoader`. Both approaches move database access into navigation-property reads.

## Proxy setup

- Install the proxies package and call `UseLazyLoadingProxies` in DbContext configuration.
- Proxy-based lazy loading requires an entity that can be subclassed and overridable navigation members.
- Navigation properties normally must be `virtual`, accessible and not declared on a sealed entity.
- EF creates a derived proxy whose overridden getter checks whether the navigation is loaded and queries when necessary.

## ILazyLoader setup

- `ILazyLoader` can be injected into an entity constructor without runtime proxy subclasses.
- A getter calls the loader with the entity and backing-field reference.
- This avoids proxy inheritance requirements but introduces an EF infrastructure dependency into the domain model.
- The getter normally falls back to the existing backing field or an empty collection when no loader is available.

## When the query runs

- Loading the root entity does not load an untouched lazy navigation.
- The first navigation getter access checks the loaded flag and may execute SQL.
- Subsequent reads use the already-loaded collection and do not issue another query for that entity.
- The entity must still be tracked by a live context with a configured loader.

## Failure situations

- After the DbContext is disposed, a lazy load cannot safely execute.
- `AsNoTracking` entities are generally not connected to the tracked relationship state needed for lazy loading.
- Detached or serialized entities have lost their context/loader.
- Code can therefore work inside a request scope but fail or silently return incomplete state later.

## Representative pattern

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

## Caveats

- Lazy loading changes a property read into a potentially remote operation.
- Keep the context lifetime explicit; do not depend on lazy loading in background, cache or serialization code.

## Source labels

- `how to setup/use`
- `why ll tends to violate`
- `ddd`

## Covered text elements

```text
T-009, T-010, T-011
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-009, IU-010, IU-011, IU-012, IU-013
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
