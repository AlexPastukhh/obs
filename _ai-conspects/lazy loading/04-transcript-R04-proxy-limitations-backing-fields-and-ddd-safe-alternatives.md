# Regional transcript — R04: Proxy limitations, backing fields and DDD-safe alternatives

Conspect: `lazy loading`  
Generated: 2026-06-27 15:30:00 UTC

## Coverage

```text
text elements represented: 3 / 3
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Proxy lazy loading conflicts with domain encapsulation because proxies intercept virtual property access, not arbitrary reads of private fields.

## Proxy interception boundary

- The generated subclass overrides the virtual navigation getter.
- Direct reads of `_items` inside domain methods bypass the proxy override and therefore bypass lazy loading.
- A public read-only interface still often exposes a mutable collection implementation at runtime.
- EF may need to set or replace collections while materializing and tracking relationships.

## Encapsulation tension

- DDD aggregates commonly keep a private mutable list and expose an `IReadOnlyCollection`.
- Proxy requirements push the model toward public/protected virtual setters and overridable members.
- Callers may cast the runtime collection back to a mutable interface and bypass aggregate methods.
- Serialization, logging, mapping or debugging can walk virtual navigations and accidentally trigger queries.

## Aggregate-boundary erosion

- Virtual navigations encourage graph traversal across aggregates.
- Each navigation hop can perform another database round trip.
- The domain model starts behaving differently depending on whether it is attached to a live context.
- This obscures invariants, I/O cost and transactional boundaries.

## Safer pattern

- Keep private backing fields and invariant-enforcing methods.
- Load aggregate children explicitly with `Include` for commands that require them.
- Use projections for read models.
- Prefer explicit application-layer loading over hidden infrastructure behavior.

## Representative pattern

```csharp
var order = await context.Orders
    .Include(o => o.Items)
    .SingleAsync(o => o.Id == id);

order.Cancel();
await context.SaveChangesAsync();
```

## Caveats

- Lazy loading is not always wrong, but it should be a deliberate infrastructure trade-off rather than a default.
- The more important aggregate invariants are, the more valuable explicit state loading becomes.

## Source labels

- `evr ok if configured nav prorp`
- `problems with ll and`
- `hidden backing fields`

## Covered text elements

```text
T-005, T-006, T-007
```

## Covered screenshot uses

```text
IU-016, IU-017, IU-018, IU-019, IU-020, IU-021, IU-035, IU-036, IU-037, IU-038, IU-039, IU-040
```

## Reading quality

- The complete regional contact sheet was reviewed.
- Code punctuation and version-specific details remain verifiable in the preserved SVG/screenshots.
- Semantic confidence: high for the main EF Core concepts and trade-offs represented here.
