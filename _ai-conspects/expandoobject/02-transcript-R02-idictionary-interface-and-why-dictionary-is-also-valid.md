# Regional transcript — R02: IDictionary interface and why Dictionary is also valid

Conspect: `expandoobject`  
Generated: 2026-06-28 12:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`ExpandoObject` implements `IDictionary<string, object?>`. Casting it to the interface does not copy or convert the object; it exposes another view of the same instance.

## Interface view

- Dynamic syntax is convenient for known member names at runtime.
- Dictionary syntax is required when the key itself is stored in a variable.
- Adding through the dictionary view immediately changes the same dynamic object.
- No extra allocation or mapping step is implied by the cast.

## Why not return Dictionary directly?

- A dictionary is technically valid for data shaping and normally serializes to the same JSON object.
- `ExpandoObject` communicates the intent that the result is an object with a dynamic shape rather than a domain map.
- It also preserves optional dynamic member syntax.
- Many ASP.NET Core data-shaping examples and helpers use `ExpandoObject` consistently.

## Performance and design

- Both approaches store key/value entries and have broadly similar shaping costs.
- The important difference is API semantics and available access styles.
- Prefer an interface return type when callers should not depend on one concrete implementation.

## Representative pattern

```csharp
var shaped = new ExpandoObject();
var values = (IDictionary<string, object?>)shaped;

values["id"] = 42;
values["name"] = "Alex";

dynamic dynamicView = shaped;
Console.WriteLine(dynamicView.name);
```

## Caveats

- Dynamic access failures occur at runtime.
- A domain model should not normally be replaced by an unstructured property bag.

## Source labels

- `!!!`

## Covered text elements

```text
T-002
```

## Covered screenshot uses

```text
IU-012, IU-013, IU-014, IU-015, IU-016
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The concepts and representative examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main semantic flow represented here.
