# Regional transcript — R03: .NET unique-marker analogues and enum distinction

Conspect: `symbol`  
Generated: 2026-06-28 14:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

.NET has no direct Symbol primitive. The closest analogue depends on the goal: reference-identity sentinel, globally unique data value, or a closed set of named constants.

## Reference sentinel

- `new object()` creates a unique reference identity.
- A private static readonly object is ideal for an internal marker.
- Reference equality distinguishes it from every unrelated object.

## GUID

- `Guid.NewGuid()` creates a serializable probabilistically unique value.
- Use it when identity must cross process, storage or network boundaries.
- It is data rather than an unforgeable property-key primitive.

## Enum

- An enum represents a finite named numeric set.
- Equal members compare equal by value.
- It is not appropriate when every marker instance must be unique.

## Representative pattern

```csharp
private static readonly object MissingValue = new();

object value = MissingValue;

if (ReferenceEquals(value, MissingValue))
{
    // Handle sentinel
}
```

## Caveats

- A public sentinel can be reused by any caller holding the reference.
- Choose a GUID only when stable transferable identity is required.

## Source labels

- `.net analogues`

## Covered text elements

```text
T-001
```

## Covered screenshot uses

```text
IU-003, IU-004, IU-005, IU-006
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts represented here.
