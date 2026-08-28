# EF Core lazy loading and query shaping

Knowledge ID: `ef-core.lazy-loading-and-query-shaping`

Topic: `ef-core`

Keep filters, ordering, aggregates, and projections on `IQueryable<T>` until materialization so EF can translate them. `ToList*`, `AsEnumerable`, or unsupported custom logic moves later work to memory. N+1 occurs when one parent query is followed by a navigation query per entity; a navigation inside a translatable projection is not itself lazy loading. Use projection for DTOs/counts/totals, `Include` for a required graph, and `AsSplitQuery` when avoiding cartesian explosion justifies intentional extra round trips.

An arbitrary custom method inside `Where` is normally not translatable. Modern EF Core generally throws for unsupported expressions outside the final client projection rather than silently evaluating an expensive filter in memory. Regex and culture-specific APIs may also lack translations; express the rule through provider-supported operations such as `EF.Functions.Like` where appropriate. Query shape is only part of performance—filters and joins still need suitable indexes.

Proxy lazy loading requires `UseLazyLoadingProxies`, subclassable entities, and overridable accessible navigations. The first getter access can query; later reads use loaded state. `ILazyLoader` avoids proxy inheritance but injects EF infrastructure into the entity:

```csharp
public ICollection<OrderItem> Items =>
    _lazyLoader?.Load(this, ref _items)
    ?? _items
    ??= new List<OrderItem>();
```

Both turn property access into hidden I/O and require an attached entity with a live context; disposed, detached, serialized, or generally no-tracking entities cannot safely rely on it. An empty fallback can obscure “not loaded” versus “loaded empty.”

Proxy overrides intercept virtual getters, not direct private-field reads inside domain methods. This conflicts with encapsulated aggregates, makes tests differ from attached production entities, and lets serialization/logging/debugging accidentally query. Exposing `IReadOnlyCollection<T>` alone does not guarantee immutability if callers can cast the runtime collection to a mutable interface. Navigation traversal can also blur aggregate and transaction boundaries through hidden round trips. For command invariants, explicitly load children, then execute the domain method; for reads, project purpose-built models. Lazy loading is a deliberate infrastructure tradeoff, not a default.

## Sources
- Workspace: `_ai-conspects/lazy loading/`
- Processed source: `05-full-combined-final-transcript.md`, complete transcript
