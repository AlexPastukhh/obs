# Regional transcript — R04: Static readonly shared marker

Conspect: `symbol`  
Generated: 2026-06-28 14:30:00 UTC

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

A static readonly object provides one shared marker per loaded type, similar to a well-known local protocol token inside a .NET application.

## Shared identity

- The object is allocated once during type initialization.
- Every caller with access to the field receives the same reference.
- Compare it with `ReferenceEquals`.

## Visibility

- Keep the marker private when it is only an internal implementation detail.
- Expose a typed token or dedicated union/result type when callers need a public protocol.
- A raw object marker should not leak into domain APIs without documentation.

## Threading

- Type initialization safely publishes the readonly reference.
- The marker itself should remain immutable and carry no mutable shared state.

## Representative pattern

```csharp
public static class Tokens
{
    public static readonly object EndOfStream = new();
}
```

## Caveats

- `readonly` prevents field reassignment, not mutation of a mutable referenced object.
- A dedicated type can communicate intent more clearly than object.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-007, IU-008
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
