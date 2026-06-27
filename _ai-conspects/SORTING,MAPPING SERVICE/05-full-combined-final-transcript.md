# Full combined final transcript — SORTING,MAPPING SERVICE

Generated: 2026-06-27 14:00:00 UTC

## Source basis and coverage

```text
meaningful text elements: 143 / 143
unique embedded screenshots: 43 / 43
screenshot uses on canvas: 43 / 43
repeated screenshot placements retained: 0
logical regions: 4 / 4
remaining text elements: 0
remaining screenshot uses: 0
```

## R01 — Sorting basics and resource fields

Collection sorting is part of the public API contract. Clients sort by resource/DTO fields, while the database query must ultimately order by entity properties that EF Core can translate.

### Request shape

- A collection endpoint commonly accepts an `orderBy` query parameter, for example `?orderBy=name`, `?orderBy=age desc` or `?orderBy=age desc,name`.
- A comma separates sort clauses; a space-separated `desc` token reverses one clause.
- When no sort is supplied, return a deterministic default order such as last name followed by first name.
- Stable deterministic ordering is especially important when paging is enabled.

### Resource fields versus entity fields

- The client should sort using the public resource model rather than internal database names.
- An `AuthorDto.Age` can be computed from `Author.DateOfBirth`; the entity may have no `Age` column.
- A public `Name` field can represent a composed value backed by `LastName` and `FirstName`.
- Do not expose arbitrary entity columns merely to simplify sorting.

### Direction and multiple fields

- `age desc,name` means age is the primary descending sort and name is the secondary ascending sort.
- The first clause becomes `OrderBy`/`OrderByDescending`; later clauses become `ThenBy`/`ThenByDescending`.
- The parser should trim empty entries and compare the direction token case-insensitively.
- Unknown direction tokens should be rejected rather than silently interpreted.

### Input model

- A resource-parameter object can group filtering, searching, sorting and paging options.
- `OrderBy` can have a documented default such as `name`.
- Paging parameters should be validated and capped independently of the sorting parser.

### Caveats

- For `IQueryable<T>`, use expression trees or a provider-translatable dynamic ordering mechanism; a plain `Func<T, object>` can switch to in-memory enumeration or fail type expectations.
- Always validate requested public sort fields against an allowlist.

## R02 — Manual whitelist sorting

The simplest safe implementation parses the clauses, maps each allowed public field to a known expression, and builds the ordered query incrementally.

### Whitelist

- Define the allowed sort names explicitly: for example `name`, `age` and `mainCategory`.
- Reject unknown fields with a controlled validation error.
- Never pass an arbitrary user string directly into SQL, reflection or a dynamic ordering library without validation.

### Clause parsing

- Split the full value by commas with `RemoveEmptyEntries` and `TrimEntries`.
- Split each clause by spaces; the first token is the field and the optional second token is the direction.
- Normalize field names and direction with ordinal case-insensitive comparisons.
- A malformed clause should produce a client error rather than a partial, surprising order.

### Building the order

- The first valid clause creates the ordered query.
- Every following clause appends a secondary key.
- If the client sends no usable clause, apply the server's stable default order.
- Keep the ordering on `IQueryable<T>` until materialization so EF Core performs it in SQL.

### When manual sorting fits

- A small, stable list of public fields.
- Simple one-to-one mappings between DTO names and entity properties.
- A codebase that favors explicit expressions over a generic mapping infrastructure.

### Caveats

- A large switch becomes repetitive when many resource types support sorting.
- Computed or composite public fields require extra mapping logic and can reverse direction semantics.

## R03 — Dynamic LINQ and contract-to-entity translation

System.Linq.Dynamic.Core can convert a validated ordering string into provider-translatable `OrderBy` operations, but a mapping layer must first translate the API contract into entity property names.

### Why translation is needed

- Clients know `AuthorDto.Name`, `Age` and other outward-facing names.
- The EF Core entity can store `LastName`, `FirstName` and `DateOfBirth` instead.
- The API should preserve its public vocabulary even when the database schema changes.

### One-to-many mappings

- A public `name` sort can map to `LastName` followed by `FirstName`.
- The order of mapped destination properties defines the tie-breaking behavior.
- The mapping dictionary is the authoritative bridge between the DTO contract and entity query.

### Reversed semantics

- Age increases while date of birth decreases: an older person has an earlier date.
- Therefore `age desc` maps to `DateOfBirth asc`.
- A `Revert` flag on the mapping value records that the requested direction must be inverted.

### Dynamic ordering

- After translation, build a string such as `DateOfBirth ascending, LastName ascending, FirstName ascending`.
- Pass only the validated translated string to Dynamic LINQ's `OrderBy`.
- The query remains an `IQueryable`, allowing EF Core to generate SQL at materialization.

### Caveats

- Dynamic LINQ is a convenience after validation, not a security boundary.
- The generated property names must exist on the entity and be translatable by the query provider.

## R04 — Property mapping service and ApplySort

A reusable property-mapping service stores the translation for each resource/entity pair, validates client sort strings and supplies mappings to a generic `IQueryable` extension.

### PropertyMappingValue

- Stores one or more destination entity properties.
- Stores a `Revert` flag for fields whose semantic direction is opposite to the underlying value.
- Examples: `Name → LastName, FirstName`; `Age → DateOfBirth` with `Revert = true`.

### Typed mapping container

- `PropertyMapping<TSource, TDestination>` associates a dictionary with one DTO/entity pair.
- A non-generic marker interface allows heterogeneous typed mappings to be kept in one collection.
- Use an ordinal-ignore-case dictionary so public field names are case-insensitive without duplicating entries.

### PropertyMappingService

- `GetPropertyMapping<TSource, TDestination>()` finds exactly one mapping for the pair and returns its dictionary.
- `ValidMappingExistsFor` parses every requested clause and checks that its public property exists.
- Missing mapping configuration is a developer/configuration error; an unknown requested field is a client validation error.

### Controller flow

- Model binding populates `AuthorsResourceParameters.OrderBy`.
- The controller validates the full public sorting string through the mapping service.
- Invalid fields return a structured 400 response.
- The repository receives the resource parameters and the selected mapping dictionary.

### Repository and ApplySort flow

- The repository starts with an `IQueryable<Author>` and applies filters before ordering and paging.
- `ApplySort` parses each public clause, resolves its mapping and computes the effective direction.
- Each mapped destination property contributes a translated dynamic-ordering clause.
- The query is materialized only after sorting and paging have been composed.
- Entities are finally mapped back to DTOs for the response.

### Ordering the mapped properties

- For a public field mapped to several destination fields, preserve the declared semantic order.
- Avoid an unconditional `Reverse()` unless the string-building algorithm truly requires reverse insertion.
- For `age desc,name`, a correct translation is approximately `DateOfBirth asc, LastName asc, FirstName asc`.

### Caveats

- Register the mapping service with a lifetime compatible with its immutable mapping collection; singleton is suitable when mappings contain no scoped state.
- Return a predictable client error for unsupported fields instead of leaking internal property names.

## Coverage map

### R01

- text elements: `31`
- screenshot uses: `9`
- unique screenshots: `9`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `01-transcript-R01-sorting-basics-and-resource-fields.md`

### R02

- text elements: `12`
- screenshot uses: `5`
- unique screenshots: `5`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `02-transcript-R02-manual-whitelist-sorting.md`

### R03

- text elements: `1`
- screenshot uses: `6`
- unique screenshots: `6`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `03-transcript-R03-dynamic-linq-and-contract-translation.md`

### R04

- text elements: `99`
- screenshot uses: `23`
- unique screenshots: `23`
- repeated placements: `0`
- remaining: `0`
- detailed transcript: `04-transcript-R04-property-mapping-service-and-applysort.md`

## Exactness note

This is the authoritative integrated semantic transcript. The complete SVG and
extracted screenshots under `source/` remain authoritative for exact source
punctuation, code spelling and framework-version details.
