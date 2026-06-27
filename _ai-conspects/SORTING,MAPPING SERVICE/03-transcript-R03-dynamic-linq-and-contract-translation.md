# Regional transcript — R03: Dynamic LINQ and contract-to-entity translation

Conspect: `SORTING,MAPPING SERVICE`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

System.Linq.Dynamic.Core can convert a validated ordering string into provider-translatable `OrderBy` operations, but a mapping layer must first translate the API contract into entity property names.

## Why translation is needed

- Clients know `AuthorDto.Name`, `Age` and other outward-facing names.
- The EF Core entity can store `LastName`, `FirstName` and `DateOfBirth` instead.
- The API should preserve its public vocabulary even when the database schema changes.

## One-to-many mappings

- A public `name` sort can map to `LastName` followed by `FirstName`.
- The order of mapped destination properties defines the tie-breaking behavior.
- The mapping dictionary is the authoritative bridge between the DTO contract and entity query.

## Reversed semantics

- Age increases while date of birth decreases: an older person has an earlier date.
- Therefore `age desc` maps to `DateOfBirth asc`.
- A `Revert` flag on the mapping value records that the requested direction must be inverted.

## Dynamic ordering

- After translation, build a string such as `DateOfBirth ascending, LastName ascending, FirstName ascending`.
- Pass only the validated translated string to Dynamic LINQ's `OrderBy`.
- The query remains an `IQueryable`, allowing EF Core to generate SQL at materialization.

## Caveats

- Dynamic LINQ is a convenience after validation, not a security boundary.
- The generated property names must exist on the entity and be translatable by the query provider.

## Covered text elements

```text
T-042
```

## Covered screenshot uses

```text
IU-015, IU-016, IU-017, IU-018, IU-019, IU-020
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
