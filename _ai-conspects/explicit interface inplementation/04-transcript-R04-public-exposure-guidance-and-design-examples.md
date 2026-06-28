# Regional transcript — R04: Public exposure guidance and design examples

Conspect: `explicit interface inplementation`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 0 / 0
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Choose implicit, explicit or dual exposure based on how callers are expected to use the type—not only on whether the syntax is possible.

## Use implicit implementation when

- The member is a natural operation of the concrete type.
- Concrete callers should discover it in IntelliSense.
- One implementation satisfies all relevant interface roles.

## Use explicit implementation when

- The operation belongs only to a secondary contract.
- Names collide or role behavior differs.
- The primary class API should remain narrow.
- A framework contract should not dominate the domain-facing design.

## Expose both when

- Concrete callers need the operation and an interface contract also requires it.
- A public method can contain the implementation while the explicit member forwards to it.
- Forwarding prevents logic duplication.

## Design checks

- Can the caller understand why a cast is required?
- Would a wrapper or adapter communicate the role more clearly?
- Does dependency injection already provide the narrow interface view?

## Representative pattern

```csharp
public sealed class Resource : IDisposable
{
    public void Close() { /* shared cleanup */ }

    void IDisposable.Dispose() => Close();
}
```

## Caveats

- Explicit implementation affects discoverability, not visibility or security.
- Prefer composition when one class is accumulating unrelated roles.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-017, IU-018, IU-019, IU-020
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
