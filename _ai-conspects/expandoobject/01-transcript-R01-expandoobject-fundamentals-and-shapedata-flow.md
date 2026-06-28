# Regional transcript — R01: ExpandoObject fundamentals and ShapeData flow

Conspect: `expandoobject`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 3 / 3
unique screenshots represented: 3
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`ExpandoObject` is a runtime property bag. Its members are not fixed by a CLR class definition; code can add or remove properties while shaping a response.

## Runtime shape

- A normal DTO has a compile-time set of properties.
- `ExpandoObject` can represent different selected-property sets for different requests.
- It implements both dynamic member access and `IDictionary<string, object?>`.
- The same object can therefore be used as an object-like response and as a key/value bag.

## ShapeData algorithm

- Parse the requested field list.
- Resolve each field against the source DTO, commonly through cached reflection metadata.
- Read the selected property value.
- Insert it into the `ExpandoObject` through its dictionary interface.
- Return the shaped object or collection of shaped objects.

## Serialization

- ASP.NET Core serializers emit the runtime keys as JSON properties.
- Only inserted fields appear in the output.
- The result can later receive HATEOAS links through the same dictionary interface.

## Representative pattern

```csharp
public static ExpandoObject ShapeData<T>(
    T source,
    IEnumerable<PropertyInfo> properties)
{
    var shaped = new ExpandoObject();
    var values = (IDictionary<string, object?>)shaped;

    foreach (var property in properties)
        values[property.Name] = property.GetValue(source);

    return shaped;
}
```

## Caveats

- Reflection metadata should be validated and preferably cached.
- Dynamic shaping trades compile-time guarantees for runtime flexibility.

## Source labels

- `EXPANDOOBJECT PERSONAL SHEET`

## Covered text elements

```text
T-001
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
