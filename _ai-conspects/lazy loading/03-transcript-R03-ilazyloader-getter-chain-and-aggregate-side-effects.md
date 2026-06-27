# Regional transcript — R03: ILazyLoader getter chain and aggregate-side effects

Conspect: `lazy loading`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 2 / 2
unique screenshots represented: 2
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The short middle road explains the typical loader-backed getter and why it creates hidden I/O inside an aggregate.

## Getter chain

- First try `_lazyLoader?.Load(this, ref _items)`.
- If there is no loader or it did not populate the field, return the current `_items` value.
- If the backing field is still null, initialize an empty collection so callers do not receive null.
- The loader both loads and assigns the collection reference.

## Domain consequences

- A domain method such as `Cancel()` may touch `Items` and unexpectedly execute SQL.
- The aggregate's required state is not visible in the method signature or use case.
- Tests using plain entities may behave differently from production entities attached to EF.
- Performance becomes sensitive to which getters happen to be read.

## Representative pattern

```csharp
private ICollection<OrderItem>? _items;

public ICollection<OrderItem> Items =>
    _lazyLoader?.Load(this, ref _items)
    ?? _items
    ??= new List<OrderItem>();
```

## Caveats

- A non-null empty collection is convenient, but it can hide the difference between 'loaded empty' and 'not loaded'.
- Explicit loading or purpose-built queries make required state visible before domain execution.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-007, IU-008
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
