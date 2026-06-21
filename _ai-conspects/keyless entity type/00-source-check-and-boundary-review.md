# Stage0 - keyless entity type source check and boundary review v001

Source SVG: `keyless entity type.svg`  
Conspect folder: `_ai-conspects/keyless entity type`

## Counts

```text
unique embedded images: 16
image uses on canvas: 16
text labels parsed: 11
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `so theoreticall when class has some logic,` at x=3231.2, y=3113.7
- T-002: `but readonly, but it doesnt feels good` at x=3231.2, y=3113.7
- T-003: `differences` at x=2049.8, y=3152.1
- T-004: `model vs queryresult` at x=2049.8, y=3152.1
- T-005: `dbset?` at x=2243.2, y=2443.4
- T-006: `easy way without mapping model` at x=2629.1, y=976.3
- T-007: `jsut retrieveing data with sql` at x=2629.1, y=976.3
- T-008: `hard way with mapping to` at x=972.5, y=803.0
- T-009: `slr, that pot has some logic` at x=972.5, y=803.0
- T-010: `but is immutable` at x=972.5, y=803.0
- T-011: `Tosqlquery` at x=36.0, y=949.6

## Candidate regions

### R01 - keyless-overview-and-definition

top road: keyless entity type overview, definition and basic EF Core setup

```text
image uses: 2
sources: S-001, S-002
```

### R02 - raw-sql-query-model-mapping-options

middle road: easy raw SQL retrieval versus mapped query-model approach, ToSqlQuery and model configuration

```text
image uses: 8
sources: S-006, S-003, S-009, S-007, S-010, S-004, S-008, S-005
```

### R03 - query-result-vs-model-dbset-and-immutability

lower road: model vs query result differences, DbSet exposure, immutable/read-only result types and tradeoffs

```text
image uses: 6
sources: S-013, S-014, S-011, S-012, S-015, S-016
```

## Next

Start transcript processing after this combined three-conspect stage0 archive is reviewed and committed.
