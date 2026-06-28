# R02 — Collection/single shaping extensions and controller flow

## Collection shaping

`IEnumerableExtensions.ShapeData<TSource>` shapes a sequence of DTOs:

1. reject a null source;
2. build a `PropertyInfo` list — all public instance properties when `fields` is blank, otherwise only the requested properties;
3. for each DTO, create an `ExpandoObject`;
4. view it through `IDictionary<string, object?>` and assign `dict[propertyInfo.Name] = propertyInfo.GetValue(sourceObject)`;
5. return `IEnumerable<ExpandoObject>`.

The resulting objects serialize as normal JSON objects containing exactly the selected keys.

## Single-resource shaping

`ObjectExtensions.ShapeData<TSource>` applies the same algorithm to one DTO and returns one `ExpandoObject`. A single endpoint should not wrap one resource in a collection merely to reuse the collection helper.

## Controller integration

The endpoint flow is:

1. bind `AuthorsResourceParameters`;
2. validate `Fields` through `IPropertyCheckerService`;
3. return `400` when a requested field is invalid;
4. load/filter/search/sort/page domain data in the repository;
5. map entities to DTOs;
6. shape the DTO or DTO collection;
7. return the shaped representation through `IActionResult`.

`IActionResult` is appropriate because the endpoint can return several result kinds and because a runtime-selected field set is no longer a single strongly typed DTO shape.

The property checker is registered in DI, and pagination links must carry `fields` forward so the next/previous page has the same representation shape.

## Coverage

- image uses: **24**
- physical SVG text nodes: **10**
- non-empty text nodes: **10**
