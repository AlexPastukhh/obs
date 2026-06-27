# Regional transcript — R01: Sorting basics and resource fields

Conspect: `SORTING,MAPPING SERVICE`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 31 / 31
image uses processed: 9 / 9
unique screenshots represented: 9
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Collection sorting is part of the public API contract. Clients sort by resource/DTO fields, while the database query must ultimately order by entity properties that EF Core can translate.

## Request shape

- A collection endpoint commonly accepts an `orderBy` query parameter, for example `?orderBy=name`, `?orderBy=age desc` or `?orderBy=age desc,name`.
- A comma separates sort clauses; a space-separated `desc` token reverses one clause.
- When no sort is supplied, return a deterministic default order such as last name followed by first name.
- Stable deterministic ordering is especially important when paging is enabled.

## Resource fields versus entity fields

- The client should sort using the public resource model rather than internal database names.
- An `AuthorDto.Age` can be computed from `Author.DateOfBirth`; the entity may have no `Age` column.
- A public `Name` field can represent a composed value backed by `LastName` and `FirstName`.
- Do not expose arbitrary entity columns merely to simplify sorting.

## Direction and multiple fields

- `age desc,name` means age is the primary descending sort and name is the secondary ascending sort.
- The first clause becomes `OrderBy`/`OrderByDescending`; later clauses become `ThenBy`/`ThenByDescending`.
- The parser should trim empty entries and compare the direction token case-insensitively.
- Unknown direction tokens should be rejected rather than silently interpreted.

## Input model

- A resource-parameter object can group filtering, searching, sorting and paging options.
- `OrderBy` can have a documented default such as `name`.
- Paging parameters should be validated and capped independently of the sorting parser.

## Caveats

- For `IQueryable<T>`, use expression trees or a provider-translatable dynamic ordering mechanism; a plain `Func<T, object>` can switch to in-memory enumeration or fail type expectations.
- Always validate requested public sort fields against an allowlist.

## Covered text elements

```text
T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015
T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029, T-030
T-143
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
