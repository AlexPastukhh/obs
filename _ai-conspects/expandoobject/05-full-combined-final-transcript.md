# Full combined final transcript — expandoobject

Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
meaningful text elements: 2 / 2
unique embedded screenshots: 16 / 16
screenshot uses: 16 / 16
repeated placements retained: 0
regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — ExpandoObject fundamentals and ShapeData flow

`ExpandoObject` is a runtime property bag. Its members are not fixed by a CLR class definition; code can add or remove properties while shaping a response.

### Runtime shape

- A normal DTO has a compile-time set of properties.
- `ExpandoObject` can represent different selected-property sets for different requests.
- It implements both dynamic member access and `IDictionary<string, object?>`.
- The same object can therefore be used as an object-like response and as a key/value bag.

### ShapeData algorithm

- Parse the requested field list.
- Resolve each field against the source DTO, commonly through cached reflection metadata.
- Read the selected property value.
- Insert it into the `ExpandoObject` through its dictionary interface.
- Return the shaped object or collection of shaped objects.

### Serialization

- ASP.NET Core serializers emit the runtime keys as JSON properties.
- Only inserted fields appear in the output.
- The result can later receive HATEOAS links through the same dictionary interface.

### Representative pattern

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

### Caveats

- Reflection metadata should be validated and preferably cached.
- Dynamic shaping trades compile-time guarantees for runtime flexibility.

## R02 — IDictionary interface and why Dictionary is also valid

`ExpandoObject` implements `IDictionary<string, object?>`. Casting it to the interface does not copy or convert the object; it exposes another view of the same instance.

### Interface view

- Dynamic syntax is convenient for known member names at runtime.
- Dictionary syntax is required when the key itself is stored in a variable.
- Adding through the dictionary view immediately changes the same dynamic object.
- No extra allocation or mapping step is implied by the cast.

### Why not return Dictionary directly?

- A dictionary is technically valid for data shaping and normally serializes to the same JSON object.
- `ExpandoObject` communicates the intent that the result is an object with a dynamic shape rather than a domain map.
- It also preserves optional dynamic member syntax.
- Many ASP.NET Core data-shaping examples and helpers use `ExpandoObject` consistently.

### Performance and design

- Both approaches store key/value entries and have broadly similar shaping costs.
- The important difference is API semantics and available access styles.
- Prefer an interface return type when callers should not depend on one concrete implementation.

### Representative pattern

```csharp
var shaped = new ExpandoObject();
var values = (IDictionary<string, object?>)shaped;

values["id"] = 42;
values["name"] = "Alex";

dynamic dynamicView = shaped;
Console.WriteLine(dynamicView.name);
```

### Caveats

- Dynamic access failures occur at runtime.
- A domain model should not normally be replaced by an unstructured property bag.

## R03 — Dynamic access, JSON serialization and semantic intent

`ExpandoObject` combines dictionary mutation with object-like dynamic access. That combination is the main convenience over a plain dictionary.

### Dynamic access

- The runtime binder resolves `obj.Name` against the current dynamic members.
- A missing member causes a runtime binder error rather than a compile-time error.
- Dictionary access is safer when keys come from request data or configuration.

### Serialization

- `System.Text.Json` serializes the current members as a JSON object.
- Nested values are serialized according to their runtime types.
- Adding a `_links` property through the dictionary view supports shaped HATEOAS responses.
- The serialized contract is determined at runtime, so OpenAPI documentation may need explicit modeling.

### Semantic role

- Use it at an API/output boundary where dynamic field selection is an intentional feature.
- Keep strongly typed DTOs internally, then shape them near the response layer.
- Do not allow arbitrary requested fields without a whitelist.

### Representative pattern

```csharp
var values = (IDictionary<string, object?>)shaped;
values["_links"] = new[]
{
    new { rel = "self", href = "/authors/42" }
};

return Results.Ok(shaped);
```

### Caveats

- Runtime shape complicates static API documentation and client generation.
- Field-level authorization must be applied before properties are inserted.

## R04 — Anonymous types, comparison and final guidance

Anonymous types are compile-time shapes. They are excellent for fixed local projections but cannot be incrementally populated from an arbitrary field list.

### Anonymous type

- The compiler creates a fixed immutable property set.
- It is ideal for a known LINQ projection such as `new { Id, Name }`.
- The shape cannot add a property in a loop.
- Its generated type is not suitable as a public method contract.

### Comparison

- `ExpandoObject`: dynamic object semantics plus dictionary mutation.
- `Dictionary<string, object?>`: direct map semantics and dynamic keys.
- Anonymous type: fixed compile-time projection.
- Named DTO: strongest contract and best documentation when the shape is stable.

### Guidance

- Use named DTOs for stable API contracts.
- Use anonymous types for local fixed projections.
- Use a dictionary when the result is conceptually a map.
- Use `ExpandoObject` when runtime-selected properties should still represent an object-like shaped resource.

### Representative pattern

```csharp
// Fixed projection
var fixedShape = source.Select(x => new { x.Id, x.Name });

// Runtime projection
ExpandoObject runtimeShape = ShapeData(dto, requestedProperties);
```

### Caveats

- Dynamic shaping should be a deliberate API feature, not a substitute for designing DTOs.
- Whitelisting and caching reflection metadata are important for production use.

## Regional source map

### R01

- transcript: `01-transcript-R01-expandoobject-fundamentals-and-shapedata-flow.md`
- text elements: `1`
- screenshot uses: `3`
- unique screenshots: `3`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-idictionary-interface-and-why-dictionary-is-also-valid.md`
- text elements: `1`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-dynamic-access-json-serialization-and-semantic-intent.md`
- text elements: `0`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-anonymous-types-comparison-and-final-guidance.md`
- text elements: `0`
- screenshot uses: `4`
- unique screenshots: `4`
- repeated placements: `0`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact punctuation,
framework/language-version details and original examples.
