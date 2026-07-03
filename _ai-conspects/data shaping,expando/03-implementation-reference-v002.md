# Data Shaping — implementation reference v002

## Public flow

```text
bind AuthorsResourceParameters
-> validate Fields against AuthorDto
-> 400 ProblemDetails for unknown fields
-> repository filter/search/sort/page
-> map entity to DTO
-> ShapeData(fields)
-> return ExpandoObject / IEnumerable<ExpandoObject>
-> preserve fields in pagination links
```

## Required files/classes

```text
AuthorsResourceParameters
IPropertyCheckerService
PropertyCheckerService
IEnumerableExtensions.ShapeData
ObjectExtensions.ShapeData
controller validation + collection/single flow
pagination-link builder
```

## Reflection flags

```csharp
BindingFlags.IgnoreCase |
BindingFlags.Public |
BindingFlags.Instance
```

## Split policy

```csharp
StringSplitOptions.RemoveEmptyEntries |
StringSplitOptions.TrimEntries
```

## Security invariants

```text
[ ] validate DTO/resource fields, not entity columns
[ ] do not expose arbitrary classes through a generic public helper
[ ] preserve an explicit whitelist
[ ] invalid fields produce a controlled 400
[ ] pagination links preserve the same fields contract
[ ] duplicate/unknown names have a documented policy
[ ] nested-field syntax is either implemented and validated or rejected
```

## Performance invariants

```text
[ ] measure reflection/serialization before optimizing
[ ] cache PropertyInfo lookup if profiling justifies it
[ ] consider predefined list/detail DTOs first
[ ] move projection to DB only when the measured cost warrants complexity
[ ] benchmark ExpandoObject versus Dictionary in the real serializer/access path
```
