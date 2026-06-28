# Regional transcript — R04: Anonymous types, comparison and final guidance

Conspect: `expandoobject`  
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

Anonymous types are compile-time shapes. They are excellent for fixed local projections but cannot be incrementally populated from an arbitrary field list.

## Anonymous type

- The compiler creates a fixed immutable property set.
- It is ideal for a known LINQ projection such as `new { Id, Name }`.
- The shape cannot add a property in a loop.
- Its generated type is not suitable as a public method contract.

## Comparison

- `ExpandoObject`: dynamic object semantics plus dictionary mutation.
- `Dictionary<string, object?>`: direct map semantics and dynamic keys.
- Anonymous type: fixed compile-time projection.
- Named DTO: strongest contract and best documentation when the shape is stable.

## Guidance

- Use named DTOs for stable API contracts.
- Use anonymous types for local fixed projections.
- Use a dictionary when the result is conceptually a map.
- Use `ExpandoObject` when runtime-selected properties should still represent an object-like shaped resource.

## Representative pattern

```csharp
// Fixed projection
var fixedShape = source.Select(x => new { x.Id, x.Name });

// Runtime projection
ExpandoObject runtimeShape = ShapeData(dto, requestedProperties);
```

## Caveats

- Dynamic shaping should be a deliberate API feature, not a substitute for designing DTOs.
- Whitelisting and caching reflection metadata are important for production use.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-008, IU-009, IU-010, IU-011
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
