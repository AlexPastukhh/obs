# Final semantic transcript — data shaping and ExpandoObject

Authoritative source: `source/data shaping,expando.svg`  
Coverage: **67 unique screenshots / 72 placements + 63 native SVG labels**

---

# R01 — data-shaping contract and requested-field validation

## What data shaping means

Data shaping lets an API client choose which public resource fields should be returned.

Example:

```http
GET /api/authors?fields=id,name
```

Instead of always returning a complete `AuthorDto`, the endpoint can return only:

```json
{
  "id": "...",
  "name": "..."
}
```

This is response-representation shaping. It does not mean clients can access arbitrary entity/database properties.

The safe boundary is normally the public DTO/resource contract:

```text
allowed: public properties exposed by AuthorDto
not allowed: navigation properties, database-only columns,
             secrets or internal entity fields
```

## Why use it

Possible benefits:

```text
smaller response payloads
less JSON serialization work
less client parsing/rendering work
several UI views can reuse one endpoint
avoids returning fields a client does not need
```

It should remain simple. Data shaping is not a replacement for every specialized view or endpoint.

## Resource parameters

The `fields` query option can live beside paging, filtering, search and sorting parameters:

```csharp
public sealed class AuthorsResourceParameters
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

    public string? Fields { get; set; }
}
```

Example:

```text
fields=id,name,mainCategory
```

## Validate requested fields before shaping

Reflection-based shaping normally fails when a requested property does not exist. Invalid client input should become `400 Bad Request`, not an unhandled server error.

Contract:

```csharp
public interface IPropertyCheckerService
{
    bool TypeHasProperties<T>(string? fields);
}
```

Implementation:

```csharp
public sealed class PropertyCheckerService
    : IPropertyCheckerService
{
    public bool TypeHasProperties<T>(string? fields)
    {
        if (string.IsNullOrWhiteSpace(fields))
            return true;

        var fieldsAfterSplit = fields.Split(
            ',',
            StringSplitOptions.RemoveEmptyEntries |
            StringSplitOptions.TrimEntries);

        foreach (var field in fieldsAfterSplit)
        {
            var propertyInfo = typeof(T).GetProperty(
                field,
                BindingFlags.IgnoreCase |
                BindingFlags.Public |
                BindingFlags.Instance);

            if (propertyInfo is null)
                return false;
        }

        return true;
    }
}
```

Controller-side validation:

```csharp
if (!propertyChecker.TypeHasProperties<AuthorDto>(
        parameters.Fields))
{
    return BadRequest(
        problemDetailsFactory.CreateProblemDetails(
            HttpContext,
            statusCode: StatusCodes.Status400BadRequest,
            detail:
                $"Not all requested fields exist: {parameters.Fields}"));
}
```

## Whitelisting

Reflection validates that a property exists on the chosen type. The chosen type must itself be a safe public resource type.

A stricter application can maintain explicit allowed-field metadata instead of exposing every public DTO property.

---

# R02 — shaping with reflection and `ExpandoObject`

## Why the result is no longer a normal DTO

A normal DTO has a compile-time-fixed property set:

```csharp
public sealed class AuthorDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = "";
    public string MainCategory { get; init; } = "";
}
```

Data shaping needs a runtime-defined property set:

```text
request 1 -> Id + Name
request 2 -> Id + MainCategory
request 3 -> only Name
```

An anonymous type is fixed when the code is compiled, so it is not practical when the set of properties comes from a query string.

## `ExpandoObject`

`ExpandoObject` is a dynamic object whose members can be added and removed at runtime.

It implements:

```text
IDictionary<string, object?>
```

Therefore the same instance can be viewed as:

```csharp
var expando = new ExpandoObject();

var dictionary =
    (IDictionary<string, object?>)expando;

dictionary["Id"] = author.Id;
dictionary["Name"] = author.Name;
```

or as a dynamic object:

```csharp
dynamic value = new ExpandoObject();
value.Id = author.Id;
value.Name = author.Name;
```

Casting to the dictionary interface does not create a copy. It exposes the same object through the interface used to add dynamic properties.

## Collection shaping extension

```csharp
public static class EnumerableExtensions
{
    public static IEnumerable<ExpandoObject>
        ShapeData<TSource>(
            this IEnumerable<TSource> source,
            string? fields)
    {
        if (source is null)
            throw new ArgumentNullException(nameof(source));

        var properties = new List<PropertyInfo>();

        if (string.IsNullOrWhiteSpace(fields))
        {
            properties.AddRange(
                typeof(TSource).GetProperties(
                    BindingFlags.Public |
                    BindingFlags.Instance));
        }
        else
        {
            foreach (
                var field in fields.Split(
                    ',',
                    StringSplitOptions.RemoveEmptyEntries |
                    StringSplitOptions.TrimEntries))
            {
                var property = typeof(TSource).GetProperty(
                    field,
                    BindingFlags.IgnoreCase |
                    BindingFlags.Public |
                    BindingFlags.Instance);

                if (property is null)
                {
                    throw new ArgumentException(
                        $"Property '{field}' was not found "
                        + $"on {typeof(TSource).Name}.");
                }

                properties.Add(property);
            }
        }

        var result = new List<ExpandoObject>();

        foreach (var sourceObject in source)
        {
            var shapedObject = new ExpandoObject();

            var dictionary =
                (IDictionary<string, object?>)shapedObject;

            foreach (var property in properties)
            {
                dictionary[property.Name] =
                    property.GetValue(sourceObject);
            }

            result.Add(shapedObject);
        }

        return result;
    }
}
```

## Single-resource extension

```csharp
public static class ObjectExtensions
{
    public static ExpandoObject ShapeData<TSource>(
        this TSource source,
        string? fields)
    {
        if (source is null)
            throw new ArgumentNullException(nameof(source));

        var shapedObject = new ExpandoObject();

        var dictionary =
            (IDictionary<string, object?>)shapedObject;

        var properties =
            string.IsNullOrWhiteSpace(fields)
                ? typeof(TSource).GetProperties(
                    BindingFlags.Public |
                    BindingFlags.Instance)
                : fields.Split(
                        ',',
                        StringSplitOptions.RemoveEmptyEntries |
                        StringSplitOptions.TrimEntries)
                    .Select(field =>
                        typeof(TSource).GetProperty(
                            field,
                            BindingFlags.IgnoreCase |
                            BindingFlags.Public |
                            BindingFlags.Instance)
                        ?? throw new ArgumentException(
                            $"Property '{field}' was not found."));

        foreach (var property in properties)
        {
            dictionary[property.Name] =
                property.GetValue(source);
        }

        return shapedObject;
    }
}
```

## Generic constraints

The method works through reflection, so `TSource` does not technically have to be declared as `class`.

However, an API can constrain or conventionally limit shaping to safe DTO/resource models:

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
```

A marker interface is optional. The key safety rule is to invoke shaping on approved API DTOs, not arbitrary domain/EF entities.

## Serialization

ASP.NET Core's JSON formatter serializes an `ExpandoObject` as an ordinary JSON object:

```json
{
  "id": "...",
  "name": "..."
}
```

Returning `Dictionary<string, object?>` would usually serialize to the same JSON shape.

`ExpandoObject` is popular because:

```text
it explicitly represents a shaped object
it supports dictionary-style mutation
it can also be accessed through dynamic member syntax
many ASP.NET data-shaping examples use it
```

It is mostly a design/convenience choice, not a large performance advantage over a dictionary.

---

# R03 — controller, DI and navigation-link integration

## Dependency registration

```csharp
builder.Services.AddTransient<
    IPropertyCheckerService,
    PropertyCheckerService>();
```

The service centralizes requested-field validation and is easy to test.

## Collection endpoint flow

```csharp
[HttpGet(Name = "GetAuthors")]
public async Task<IActionResult> GetAuthors(
    [FromQuery] AuthorsResourceParameters parameters)
{
    if (!propertyChecker.TypeHasProperties<AuthorDto>(
            parameters.Fields))
    {
        return BadRequest(
            problemDetailsFactory.CreateProblemDetails(
                HttpContext,
                statusCode: 400,
                detail:
                    $"Invalid fields: {parameters.Fields}"));
    }

    var authorsFromRepository =
        await repository.GetAuthorsAsync(parameters);

    var authorDtos = mapper.Map<IEnumerable<AuthorDto>>(
        authorsFromRepository);

    var shaped = authorDtos.ShapeData(parameters.Fields);

    return Ok(shaped);
}
```

Conceptual flow:

```text
query parameters bind to AuthorsResourceParameters
requested fields are validated against AuthorDto
repository applies filtering/search/sorting/paging
entities are mapped to public DTOs
DTOs are shaped in memory
ExpandoObject results are serialized to JSON
```

## Single-resource endpoint

```csharp
[HttpGet("{authorId}", Name = "GetAuthor")]
public async Task<IActionResult> GetAuthor(
    Guid authorId,
    string? fields)
{
    if (!propertyChecker.TypeHasProperties<AuthorDto>(fields))
        return BadRequest();

    var author = await repository.GetAuthorAsync(authorId);

    if (author is null)
        return NotFound();

    var dto = mapper.Map<AuthorDto>(author);

    return Ok(dto.ShapeData(fields));
}
```

## Why `IActionResult`

After validation and lookup, the endpoint can return several HTTP results:

```text
Ok(...)             200
BadRequest(...)     400
NotFound()          404
```

The shaped value has a runtime-defined property set, so the action is not returning a stable strongly typed DTO instance.

## Preserve `fields` in pagination links

When the response includes previous/current/next links, every generated link must preserve the current data-shaping request.

```csharp
private string? CreateAuthorsResourceUri(
    AuthorsResourceParameters parameters,
    ResourceUriType type)
{
    var pageNumber = type switch
    {
        ResourceUriType.PreviousPage =>
            parameters.PageNumber - 1,

        ResourceUriType.NextPage =>
            parameters.PageNumber + 1,

        _ => parameters.PageNumber
    };

    return Url.Link(
        "GetAuthors",
        new
        {
            fields = parameters.Fields,
            orderBy = parameters.OrderBy,
            pageNumber,
            pageSize = parameters.PageSize,
            mainCategory = parameters.MainCategory,
            searchQuery = parameters.SearchQuery
        });
}
```

Otherwise page 1 can be shaped while a generated page-2 link silently returns the full DTO.

The same rule applies to HATEOAS links and self links: preserve active filters, sorting, paging and requested fields when those options are part of the representation contract.

---

# R04 — response shaping versus database projection

## Two different layers

Response shaping and database projection are related but distinct.

```text
database projection
    which database columns/expressions are fetched

response shaping
    which resource properties are included in the HTTP representation
```

They can be used together, but one does not automatically replace the other.

## Shape after mapping

A common general REST pipeline is:

```text
database entity query
map entity to DTO
shape DTO according to fields
serialize shaped representation
```

Advantages:

```text
simple and reusable
works consistently for collection and single-resource endpoints
fits AutoMapper and existing DTO contracts
keeps entity/internal fields behind the DTO boundary
integrates easily with paging/filtering/sorting/HATEOAS
```

For many APIs, reducing response payload size is more important than avoiding a small number of extra selected columns.

## Why not always dynamically project from EF Core

A runtime `fields` string would need to become a dynamic `Select(...)` expression.

This becomes difficult when:

```text
DTO property names differ from entity property names
one DTO field requires several columns
a DTO field is computed
nested resources are requested
AutoMapper transformations are involved
field-level authorization is required
the result must remain stable across providers
```

Examples:

```text
AuthorDto.Name =
    entity.FirstName + " " + entity.LastName

AuthorDto.Age =
    calculation from DateOfBirth
```

Selecting only the entity property named `Name` is impossible because the public resource field is a computed representation field.

## Security and contract control

Shaping approved DTOs makes the boundary explicit:

```text
only DTO properties can be requested
entity navigation properties cannot leak
database-only/internal columns remain hidden
public names can differ from storage names
```

Dynamic database projection directly from arbitrary request field names must implement the same whitelist and mapping discipline.

## When database projection is valuable

Consider projection when:

```text
rows contain many large columns or blobs
the dataset is large
clients often request only one or two fields
database/network transfer is a measured bottleneck
DTOs mostly map one-to-one to entity columns
the field whitelist can be enforced safely
```

A pragmatic alternative is a small set of explicit views:

```text
GET /api/authors       -> AuthorListDto
GET /api/authors/{id}  -> AuthorDetailDto
```

This provides efficient static projections without building a fully dynamic selector.

## Advanced dynamic projection

A library such as `System.Linq.Dynamic.Core` can build runtime projections:

```csharp
query.Select(
    "new(Id, FirstName, LastName)");
```

But a production design still needs:

```text
field-name whitelist
mapping from resource fields to expressions
computed-field support
nested-shape rules
authorization rules
validation
tests for provider translation
```

This is effectively a field-selection mapping service.

## Sorting mapping cannot be reused unchanged

Sorting maps resource fields to ordered destination properties and builds `OrderBy`/`ThenBy`.

Projection maps resource fields to selected expressions and may combine or rename several source properties.

The whitelist idea is reusable, but the mapping representation is different.

Best practice:

```text
sorting mapping service
field-selection/data-shaping mapping service
```

Keep them separate unless a shared metadata model explicitly supports both operations.

## Practical decision

```text
small/medium general REST API
    map to DTO, then shape response in memory

few known response views
    explicit list/detail DTO projections

large data, wide rows, measured DB/network cost
    project from database using a controlled mapping layer

complex client-defined graphs
    consider GraphQL/OData or another query contract
```

---

# Practical checklist

```text
[ ] expose only DTO/resource fields
[ ] validate fields before reflection
[ ] return 400 for unsupported field names
[ ] treat empty fields as all allowed fields
[ ] use case-insensitive matching consistently
[ ] shape both collection and single-resource endpoints
[ ] preserve fields in self/previous/next/HATEOAS links
[ ] do not shape EF/domain entities directly
[ ] document that the returned schema varies by request
[ ] measure before adding dynamic database projection
[ ] use a separate selection mapping when projection is required
```

---

# Coverage

```text
unique embedded screenshots: 67
image uses: 72
native SVG labels: 63
duplicate extra placements: 5

processed image uses: 72
processed text labels: 63
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
