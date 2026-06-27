# Regional transcript — R02: Manual whitelist sorting

Conspect: `SORTING,MAPPING SERVICE`  
Generated: 2026-06-27 14:00:00 UTC

## Coverage

```text
text elements represented: 12 / 12
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

The simplest safe implementation parses the clauses, maps each allowed public field to a known expression, and builds the ordered query incrementally.

## Whitelist

- Define the allowed sort names explicitly: for example `name`, `age` and `mainCategory`.
- Reject unknown fields with a controlled validation error.
- Never pass an arbitrary user string directly into SQL, reflection or a dynamic ordering library without validation.

## Clause parsing

- Split the full value by commas with `RemoveEmptyEntries` and `TrimEntries`.
- Split each clause by spaces; the first token is the field and the optional second token is the direction.
- Normalize field names and direction with ordinal case-insensitive comparisons.
- A malformed clause should produce a client error rather than a partial, surprising order.

## Building the order

- The first valid clause creates the ordered query.
- Every following clause appends a secondary key.
- If the client sends no usable clause, apply the server's stable default order.
- Keep the ordering on `IQueryable<T>` until materialization so EF Core performs it in SQL.

## When manual sorting fits

- A small, stable list of public fields.
- Simple one-to-one mappings between DTO names and entity properties.
- A codebase that favors explicit expressions over a generic mapping infrastructure.

## Caveats

- A large switch becomes repetitive when many resource types support sorting.
- Computed or composite public fields require extra mapping logic and can reverse direction semantics.

## Covered text elements

```text
T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-142
```

## Covered screenshot uses

```text
IU-010, IU-011, IU-012, IU-013, IU-014
```

## Audit note

Every listed source unit is closed in the final ledgers.
The complete SVG and extracted screenshots remain authoritative for exact code punctuation.
