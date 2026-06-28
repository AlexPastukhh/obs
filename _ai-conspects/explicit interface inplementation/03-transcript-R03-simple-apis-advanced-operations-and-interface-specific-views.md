# Regional transcript — R03: Simple APIs, advanced operations and interface-specific views

Conspect: `explicit interface inplementation`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Explicit implementation can preserve a simple primary API while still satisfying richer framework or advanced-user contracts.

## Capability views

- The concrete class exposes the common operations.
- An advanced interface exposes lower-level controls.
- A read-only interface can be handed to consumers that should not mutate.
- An infrastructure interface can remain available to serializers, frameworks or DI.

## Collections

- A custom collection may expose domain operations publicly.
- Generic collection members such as `Add`, `Remove` or `IsReadOnly` can be explicit when direct collection semantics are not the primary API.
- Enumerability can still be public or explicit according to expected usage.

## API evolution

- Explicit members avoid adding names to IntelliSense for every concrete user.
- They can resolve clashes introduced by a new interface version.
- Prefer adapter types when the roles have substantially different state or lifecycles.

## Representative pattern

```csharp
public sealed class OrderLines : ICollection<OrderLine>
{
    public void AddProduct(Product product, int quantity) { /* invariants */ }

    void ICollection<OrderLine>.Add(OrderLine item) =>
        throw new NotSupportedException("Use AddProduct.");

    // Other interface members...
}
```

## Caveats

- Throwing from required interface members may violate caller expectations; a separate adapter may be cleaner.
- A minimal public surface is useful only when the hidden interface remains coherent.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-011, IU-012, IU-013, IU-014, IU-015, IU-016
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
