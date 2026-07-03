# Data Shaping and ExpandoObject — code-preserving integrated transcript v002

Generated: 2026-07-03

## Evidence boundary

```text
exact SVG: source/data shaping,expando.svg
physical screenshot placements: 72 / 72
unique screenshot contents: 67 / 67
intentional duplicate placements: 5
native non-empty SVG labels: 63 / 63
broken/external/dangling sources: 0
```

The previous `01-final-transcript.md` remains a good conceptual overview. This file adds the missing implementation, code reconstruction, edge cases, and repetition structure.

---

# M01 — Public contract, fields parameter, and validation

Data shaping lets the client select public representation fields:

```http
GET /api/authors?fields=id,name
```

The response contains only the requested DTO/resource properties. The contract applies to public resource fields, not database columns or hidden entity members.

Benefits:

- smaller payloads;
- less over-fetching for clients;
- multiple list/detail representations from one endpoint;
- forward compatibility when DTOs gain fields clients did not request.

## Resource parameters

```csharp
public class AuthorsResourceParameters
{
    private const int MaxPageSize = 20;
    private int _pageSize = 10;

    public string? MainCategory { get; set; }
    public string? SearchQuery { get; set; }

    public int PageNumber { get; set; } = 1;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize =
            value > MaxPageSize
                ? MaxPageSize
                : value;
    }

    public string OrderBy { get; set; } = "Name";

    // Data shaping
    public string? Fields { get; set; }
}
```

Keeping `Fields` beside filtering, searching, sorting, and paging makes the complete query contract explicit and lets pagination links preserve the selected shape.

## Property checker contract

```csharp
public interface IPropertyCheckerService
{
    bool TypeHasProperties<T>(string? fields);
}
```

## Property checker implementation

```csharp
using System.Reflection;

public sealed class PropertyCheckerService
    : IPropertyCheckerService
{
    public bool TypeHasProperties<T>(
        string? fields)
    {
        if (string.IsNullOrWhiteSpace(fields))
        {
            return true;
        }

        var fieldsAfterSplit = fields.Split(
            ',',
            StringSplitOptions.RemoveEmptyEntries |
            StringSplitOptions.TrimEntries);

        foreach (var field in fieldsAfterSplit)
        {
            var propertyName = field.Trim();

            var propertyInfo = typeof(T).GetProperty(
                propertyName,
                BindingFlags.IgnoreCase |
                BindingFlags.Public |
                BindingFlags.Instance);

            if (propertyInfo is null)
            {
                return false;
            }
        }

        return true;
    }
}
```

Validation happens before shaping so an invalid field becomes a deliberate client error instead of an uncontrolled reflection exception/500.

Example controller boundary:

```csharp
if (!_propertyCheckerService
        .TypeHasProperties<AuthorDto>(
            parameters.Fields))
{
    var problem = _problemDetailsFactory
        .CreateProblemDetails(
            HttpContext,
            statusCode: StatusCodes.Status400BadRequest,
            title: "Invalid fields parameter",
            detail:
                $"Not all requested data-shaping fields " +
                $"exist on the resource: '{parameters.Fields}'.",
            instance: HttpContext.Request.Path);

    return BadRequest(problem);
}
```

Security rule: validate and shape the DTO/resource type, not an EF entity or arbitrary object containing internal fields.

---

# M02 — Collection and single-resource shaping

## Collection extension

```csharp
using System.Dynamic;
using System.Reflection;

public static class IEnumerableExtensions
{
    public static IEnumerable<ExpandoObject>
        ShapeData<TSource>(
            this IEnumerable<TSource> source,
            string? fields)
    {
        ArgumentNullException.ThrowIfNull(source);

        var propertyInfoList =
            new List<PropertyInfo>();

        if (string.IsNullOrWhiteSpace(fields))
        {
            propertyInfoList.AddRange(
                typeof(TSource).GetProperties(
                    BindingFlags.Public |
                    BindingFlags.Instance));
        }
        else
        {
            var fieldsAfterSplit = fields.Split(
                ',',
                StringSplitOptions.RemoveEmptyEntries |
                StringSplitOptions.TrimEntries);

            foreach (var field in fieldsAfterSplit)
            {
                var propertyName = field.Trim();

                var propertyInfo =
                    typeof(TSource).GetProperty(
                        propertyName,
                        BindingFlags.IgnoreCase |
                        BindingFlags.Public |
                        BindingFlags.Instance);

                if (propertyInfo is null)
                {
                    throw new ArgumentException(
                        $"Property '{propertyName}' " +
                        $"wasn't found on " +
                        $"{typeof(TSource)}.",
                        nameof(fields));
                }

                propertyInfoList.Add(propertyInfo);
            }
        }

        var result = new List<ExpandoObject>();

        foreach (var sourceObject in source)
        {
            var shapedObject = new ExpandoObject();
            var dictionary =
                (IDictionary<string, object?>)
                shapedObject;

            foreach (var propertyInfo
                     in propertyInfoList)
            {
                dictionary[propertyInfo.Name] =
                    propertyInfo.GetValue(sourceObject);
            }

            result.Add(shapedObject);
        }

        return result;
    }
}
```

## Single-object extension

```csharp
public static class ObjectExtensions
{
    public static ExpandoObject ShapeData<TSource>(
        this TSource source,
        string? fields)
    {
        ArgumentNullException.ThrowIfNull(source);

        var shapedObject = new ExpandoObject();
        var dictionary =
            (IDictionary<string, object?>)
            shapedObject;

        if (string.IsNullOrWhiteSpace(fields))
        {
            var properties = typeof(TSource)
                .GetProperties(
                    BindingFlags.Public |
                    BindingFlags.Instance);

            foreach (var property in properties)
            {
                dictionary[property.Name] =
                    property.GetValue(source);
            }

            return shapedObject;
        }

        var fieldsAfterSplit = fields.Split(
            ',',
            StringSplitOptions.RemoveEmptyEntries |
            StringSplitOptions.TrimEntries);

        foreach (var field in fieldsAfterSplit)
        {
            var propertyName = field.Trim();

            var property = typeof(TSource)
                .GetProperty(
                    propertyName,
                    BindingFlags.IgnoreCase |
                    BindingFlags.Public |
                    BindingFlags.Instance);

            if (property is null)
            {
                throw new ArgumentException(
                    $"Property '{propertyName}' " +
                    $"wasn't found on " +
                    $"{typeof(TSource)}.",
                    nameof(fields));
            }

            dictionary[property.Name] =
                property.GetValue(source);
        }

        return shapedObject;
    }
}
```

The property checker is the public boundary; the extension still defends itself because it can be called independently.

## DI registration

```csharp
builder.Services.AddTransient<
    IPropertyCheckerService,
    PropertyCheckerService>();
```

## Collection controller flow

```csharp
[HttpGet(Name = "GetAuthors")]
public async Task<IActionResult> GetAuthors(
    [FromQuery]
    AuthorsResourceParameters parameters)
{
    if (!_propertyCheckerService
            .TypeHasProperties<AuthorDto>(
                parameters.Fields))
    {
        return BadRequest(...);
    }

    var authorsFromRepository =
        await _repository.GetAuthorsAsync(
            parameters);

    var authorDtos = authorsFromRepository
        .Select(author => new AuthorDto
        {
            Id = author.Id,
            Name =
                $"{author.FirstName} " +
                $"{author.LastName}",
            MainCategory = author.MainCategory
        });

    var shaped = authorDtos.ShapeData(
        parameters.Fields);

    return Ok(shaped);
}
```

## Single resource

```csharp
[HttpGet("{authorId}", Name = "GetAuthor")]
public async Task<IActionResult> GetAuthor(
    Guid authorId,
    string? fields)
{
    if (!_propertyCheckerService
            .TypeHasProperties<AuthorDto>(fields))
    {
        return BadRequest(...);
    }

    var authorFromRepository =
        await _repository.GetAuthorAsync(authorId);

    if (authorFromRepository is null)
    {
        return NotFound();
    }

    var dto = _mapper.Map<AuthorDto>(
        authorFromRepository);

    return Ok(dto.ShapeData(fields));
}
```

A single endpoint returns one shaped object; it should not wrap one resource in a collection merely to reuse the collection helper.

## Preserve `fields` in pagination links

```csharp
private string? CreateAuthorsResourceUri(
    AuthorsResourceParameters parameters,
    int pageNumber)
{
    return Url.Link(
        "GetAuthors",
        new
        {
            fields = parameters.Fields,
            orderBy = parameters.OrderBy,
            mainCategory = parameters.MainCategory,
            searchQuery = parameters.SearchQuery,
            pageNumber,
            pageSize = parameters.PageSize
        });
}
```

Next/previous links must preserve the shape contract, otherwise navigation silently changes the response representation.

## Return type

`IActionResult` is appropriate because the action can return several status/result types and the final runtime-selected property set is not one fixed DTO compile-time shape.

---

# M03 — ExpandoObject, dictionary, dynamic, and alternatives

`ExpandoObject` is a runtime property bag. It implements `IDictionary<string, object?>`.

```csharp
var shapedObject = new ExpandoObject();
var dictionary =
    (IDictionary<string, object?>)shapedObject;

dictionary["Id"] = 1;
dictionary["Name"] = "Alex";
```

The cast does not copy or convert the object; both references view the same underlying instance.

Dynamic access is optional:

```csharp
dynamic value = new ExpandoObject();
value.Id = 1;
value.Name = "Alex";
Console.WriteLine(value.Name);
```

A normal dictionary uses indexer access:

```csharp
var value = new Dictionary<string, object?>();
value["Id"] = 1;
value["Name"] = "Alex";
Console.WriteLine(value["Name"]);
```

With normal ASP.NET Core JSON serialization, both are usually represented as JSON objects:

```json
{
  "id": 1,
  "name": "Alex"
}
```

Why use `ExpandoObject`?

- communicates “dynamically shaped object” intent;
- supports optional dynamic member syntax;
- common in data-shaping/HATEOAS examples;
- still exposes an explicit dictionary API.

A dictionary is also valid. Performance and memory should be measured for the actual workload; “similar” is a design-level observation, not a guaranteed benchmark result.

Anonymous types are compile-time fixed:

```csharp
var shaped = new
{
    Id = author.Id,
    Name = author.Name
};
```

They are good for known projections, not a runtime field list whose names and count change by query string.

## Constraints

The reflection algorithm can technically operate on classes, records, structs, and anonymous objects. A `where TSource : class` constraint only excludes value types; it does not enforce “DTO only.”

Stronger options:

```csharp
public interface IShapeable
{
}
```

```csharp
public static ExpandoObject ShapeData<TSource>(
    this TSource source,
    string? fields)
    where TSource : IShapeable
{
    // ...
}
```

or keep the helper internal to the API layer and call it only after mapping to approved DTOs.

---

# M04 — Data shaping versus database projection

Data shaping asks:

> Which public properties are included in the HTTP representation?

Database projection asks:

> Which columns/expressions are fetched and computed by the query?

They can align, but are not identical.

Default representation-layer flow:

```text
filter/search/sort/page rows
-> map entity to DTO
-> remove unrequested DTO properties
-> serialize shaped representation
```

Why projection is harder when `fields` is dynamic:

- runtime `Select` expression is required;
- public names may differ from entity names;
- DTO properties may be computed (`Name = FirstName + LastName`);
- nested fields may need joins/expressions;
- links/flags may not exist in the DB;
- validation/whitelisting must still be enforced.

Sorting mapping cannot normally be reused directly:

```text
sorting mapping -> resource field to OrderBy property paths
projection mapping -> resource field to expressions that construct DTO values
```

Projection options:

1. **Predefined views/DTOs** — list DTO, detail DTO, a small number of variants.
2. **Dynamic projection** — expression trees, dynamic LINQ, or a dedicated selection mapping service.

Prefer post-mapping shaping when:

- result size is moderate;
- DTOs have computed/flattened fields;
- maintainability and endpoint consistency matter;
- payload size is the primary client-side concern.

Prefer DB projection when:

- rows/columns/blobs are large;
- DB/network cost is material;
- strict latency targets exist;
- fields map mostly one-to-one;
- the allowed selection set can be strongly constrained.

Do not optimize a few extra columns before measuring larger costs such as row count, joins, N+1 queries, missing indexes, heavy serialization, and network latency.
