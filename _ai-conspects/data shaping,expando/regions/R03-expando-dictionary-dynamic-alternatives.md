# R03 — ExpandoObject, dictionary/dynamic semantics and alternatives

## What ExpandoObject provides

`ExpandoObject` is a runtime property bag. Its member set can change at runtime, which fits a query-driven representation where one request asks for `id,name` and another asks for `name,mainCategory`.

It implements `IDictionary<string, object?>`. Casting an `ExpandoObject` to that interface does **not** copy or convert it; both references view the same object. The dictionary interface is the explicit API used to add selected property names and values.

The same object can also be accessed through `dynamic` member syntax. This is a convenience and a signal that the value is an object with runtime-defined properties; the shaping implementation itself can remain dictionary-based.

## Alternatives

Returning `Dictionary<string, object?>` is valid and generally produces the same JSON object. `ExpandoObject` is usually preferred in these examples because it communicates “dynamically shaped object,” aligns with common ASP.NET Core shaping helpers and still permits optional dynamic access. Performance and memory are broadly similar because `ExpandoObject` is itself dictionary-like.

Anonymous types are not suitable for arbitrary client-selected fields: their property names and count are fixed at compile time. They work for known projections, not for a field set defined by a runtime query string.

## Generic constraints and safety

Reflection-based `ShapeData<TSource>` can technically work with classes, structs, records and anonymous types. A `where TSource : class` constraint only excludes value types; it does not prevent shaping arbitrary entities. Safer choices are:

- apply the helper only after mapping to DTOs in the API layer;
- or constrain it with a marker interface implemented by shapeable DTOs.

The important validation is not merely “is it a class?” but “is this an approved public resource type, and does every requested field exist?”

## Coverage

- image uses: **20**
- physical SVG text nodes: **6**
- non-empty text nodes: **6**
- repeated screenshots are preserved as distinct canvas placements where the conspect reuses them in a second explanatory section.
