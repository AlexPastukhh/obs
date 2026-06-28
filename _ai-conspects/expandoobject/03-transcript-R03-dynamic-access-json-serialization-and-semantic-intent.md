# Regional transcript — R03: Dynamic access, JSON serialization and semantic intent

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

`ExpandoObject` combines dictionary mutation with object-like dynamic access. That combination is the main convenience over a plain dictionary.

## Dynamic access

- The runtime binder resolves `obj.Name` against the current dynamic members.
- A missing member causes a runtime binder error rather than a compile-time error.
- Dictionary access is safer when keys come from request data or configuration.

## Serialization

- `System.Text.Json` serializes the current members as a JSON object.
- Nested values are serialized according to their runtime types.
- Adding a `_links` property through the dictionary view supports shaped HATEOAS responses.
- The serialized contract is determined at runtime, so OpenAPI documentation may need explicit modeling.

## Semantic role

- Use it at an API/output boundary where dynamic field selection is an intentional feature.
- Keep strongly typed DTOs internally, then shape them near the response layer.
- Do not allow arbitrary requested fields without a whitelist.

## Representative pattern

```csharp
var values = (IDictionary<string, object?>)shaped;
values["_links"] = new[]
{
    new { rel = "self", href = "/authors/42" }
};

return Results.Ok(shaped);
```

## Caveats

- Runtime shape complicates static API documentation and client generation.
- Field-level authorization must be applied before properties are inserted.

## Covered text elements

```text
```

## Covered screenshot uses

```text
IU-004, IU-005, IU-006, IU-007
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
