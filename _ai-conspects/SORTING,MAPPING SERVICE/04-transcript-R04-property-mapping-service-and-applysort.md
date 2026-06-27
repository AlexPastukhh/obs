# Regional transcript — R04: Property mapping service and ApplySort

Conspect: `SORTING,MAPPING SERVICE`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 99 / 99
image uses processed: 23 / 23
unique screenshots represented: 23
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A reusable property-mapping service stores the translation for each resource/entity pair, validates client sort strings and supplies mappings to a generic `IQueryable` extension.

## PropertyMappingValue

- Stores one or more destination entity properties.
- Stores a `Revert` flag for fields whose semantic direction is opposite to the underlying value.
- Examples: `Name → LastName, FirstName`; `Age → DateOfBirth` with `Revert = true`.

## Typed mapping container

- `PropertyMapping<TSource, TDestination>` associates a dictionary with one DTO/entity pair.
- A non-generic marker interface allows heterogeneous typed mappings to be kept in one collection.
- Use an ordinal-ignore-case dictionary so public field names are case-insensitive without duplicating entries.

## PropertyMappingService

- `GetPropertyMapping<TSource, TDestination>()` finds exactly one mapping for the pair and returns its dictionary.
- `ValidMappingExistsFor` parses every requested clause and checks that its public property exists.
- Missing mapping configuration is a developer/configuration error; an unknown requested field is a client validation error.

## Controller flow

- Model binding populates `AuthorsResourceParameters.OrderBy`.
- The controller validates the full public sorting string through the mapping service.
- Invalid fields return a structured 400 response.
- The repository receives the resource parameters and the selected mapping dictionary.

## Repository and ApplySort flow

- The repository starts with an `IQueryable<Author>` and applies filters before ordering and paging.
- `ApplySort` parses each public clause, resolves its mapping and computes the effective direction.
- Each mapped destination property contributes a translated dynamic-ordering clause.
- The query is materialized only after sorting and paging have been composed.
- Entities are finally mapped back to DTOs for the response.

## Ordering the mapped properties

- For a public field mapped to several destination fields, preserve the declared semantic order.
- Avoid an unconditional `Reverse()` unless the string-building algorithm truly requires reverse insertion.
- For `age desc,name`, a correct translation is approximately `DateOfBirth asc, LastName asc, FirstName asc`.

## Caveats

- Register the mapping service with a lifetime compatible with its immutable mapping collection; singleton is suitable when mappings contain no scoped state.
- Return a predictable client error for unsupported fields instead of leaking internal property names.

## Covered text elements

```text
T-043, T-044, T-045, T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057
T-058, T-059, T-060, T-061, T-062, T-063, T-064, T-065, T-066, T-067, T-068, T-069, T-070, T-071, T-072
T-073, T-074, T-075, T-076, T-077, T-078, T-079, T-080, T-081, T-082, T-083, T-084, T-085, T-086, T-087
T-088, T-089, T-090, T-091, T-092, T-093, T-094, T-095, T-096, T-097, T-098, T-099, T-100, T-101, T-102
T-103, T-104, T-105, T-106, T-107, T-108, T-109, T-110, T-111, T-112, T-113, T-114, T-115, T-116, T-117
T-118, T-119, T-120, T-121, T-122, T-123, T-124, T-125, T-126, T-127, T-128, T-129, T-130, T-131, T-132
T-133, T-134, T-135, T-136, T-137, T-138, T-139, T-140, T-141
```

## Covered screenshot uses

```text
IU-021, IU-022, IU-023, IU-024, IU-025, IU-026, IU-027, IU-028, IU-029, IU-030, IU-031, IU-032, IU-033
IU-034, IU-035, IU-036, IU-037, IU-038, IU-039, IU-040, IU-041, IU-042, IU-043
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
