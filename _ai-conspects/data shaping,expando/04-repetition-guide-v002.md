# Data Shaping and ExpandoObject — repetition guide v002

## One-minute mental model

```text
fields is a public response-shape contract
validate requested DTO properties first
map entity -> DTO
shape DTO -> ExpandoObject/dictionary
serialize selected keys
preserve fields in navigation links
projection is a separate database optimization decision
```

## Compare

1. data shaping vs filtering.
2. data shaping vs sorting.
3. data shaping vs database projection.
4. collection ShapeData vs single-object ShapeData.
5. ExpandoObject vs Dictionary.
6. ExpandoObject vs anonymous type.
7. public DTO field vs entity column.
8. property checker vs shaping helper validation.
9. `where T : class` vs marker interface.
10. predefined DTO variants vs arbitrary runtime fields.

## Coding exercises

1. Reconstruct AuthorsResourceParameters.
2. Implement TypeHasProperties with case-insensitive reflection.
3. Implement collection ShapeData.
4. Implement single-object ShapeData.
5. Return ProblemDetails for invalid fields.
6. Preserve fields in next/previous links.
7. Add a marker interface constraint.
8. Cache PropertyInfo selection safely.
9. Support aliases through a whitelist mapping.
10. Design nested fields without exposing arbitrary reflection paths.
11. Implement a predefined list/detail DTO alternative.
12. Build a dynamic projection expression and compare complexity.

## Debug sequence

1. What public DTO is being shaped?
2. Is `fields` empty, valid, duplicated, or unknown?
3. Are names case-insensitive by contract?
4. Does validation happen before reflection extraction?
5. Are all selected fields present in pagination/HATEOAS links?
6. Is the return shape a collection or one object?
7. Are internal entity properties impossible to request?
8. Are computed DTO fields handled after mapping?
9. Is DB projection actually needed based on measurement?
10. Are serializer/access assumptions benchmarked?
