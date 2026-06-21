# Stage 1 - Boundary Review

Generated: 2026-06-13 07:34:52 UTC

## Done

- Stage0 source materialization existed.
- Stage1 reviews all **53 image uses**.
- All images are assigned to candidate regions.
- All **43 text labels** are assigned to candidate regions.
- No duplicate embedded-image uses were found.
- No transcript is created here.
- This archive intentionally does **not** duplicate Stage0 source PNGs.

## Now

- Apply and review this archive.
- Commit if boundary split is acceptable.
- Treat candidate regions as provisional until transcript visually rechecks each source image.

## Next

Recommended transcript batches:

```text
NEXT01: VIV01 + VIV02 = 27 image uses
NEXT02: VIV03 = 14 image uses
NEXT03: VIV04 = 12 image uses
```

## Coverage checks

```text
Expected image uses: 53
Assigned to candidate regions: 53
Missing: 0
Duplicates: 0
Extra: 0
Text labels: 43
Text labels assigned: 43
Text labels missing: 0
Text label duplicates: 0
Duplicate image uses by fileId_short: 0
```

## Candidate regions

### VIV01 - Views concept, readonly behavior, EF Core mapping flow, ToSqlQuery vs ToView
Source count: **13**
Sources:
```text
S-001, S-002, S-003, S-004, S-005, S-018, S-019, S-020, S-021, S-024, S-025, S-026, S-027
```
Text labels:
```text
T-001: tosqlquery vs toview
T-002: Ef core view flow
T-003: concept of views
T-004: depend on uderl tables
T-005: usually readonly
T-006: not physically stored until indexed
T-021: can views be updated?
T-022: stored or not, indexes views
```
Meaning:
```text
Core SQL view and EF Core mapping flow: what a view is, dependency on underlying tables, usually readonly, not physically stored until indexed, whether views can be updated, EF Core create/configure/query flow, and ToSqlQuery versus ToView mapping.
```
Subregions:
```text
VIV01A: S-001, S-002, S-003, S-004, S-005
VIV01B: S-018, S-019, S-020, S-021
VIV01C: S-024, S-025, S-026, S-027
```
### VIV02 - Good and bad use cases for views
Source count: **14**
Sources:
```text
S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-022, S-023
```
Text labels:
```text
T-007: good for view
T-008: multiple sources,
T-009: aggregated into one domain
T-010: hide ugly queries
T-011: hiding bad queries
T-012: to much buisness logic
T-013: overusing for simple queries
T-014: expecting normal entity behav
T-015: Security, allow to work with
T-016: some viewed data, not with
T-017: sources
T-018: legacy
T-019: stable read api, sources
T-020: can change, evolve
T-023: bad for view
```
Meaning:
```text
When views are useful and when they become harmful: multiple sources aggregated into a read model, hiding ugly queries, security/limited exposure, legacy/stable read API, and anti-patterns such as hiding bad queries, too much business logic, overusing views for simple queries, and expecting normal entity behavior.
```
Subregions:
```text
VIV02A: S-006, S-007, S-008, S-009, S-010, S-022, S-023
VIV02B: S-011, S-012, S-013, S-014
VIV02C: S-015, S-016, S-017
```
### VIV03 - Indexed views fundamentals, materialization, clustered index and write cost
Source count: **14**
Sources:
```text
S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041
```
Text labels:
```text
T-024: Indexed views
T-025: view/indexed view
T-026: with material dependent
T-027: table
T-038: Clustered index first
T-039: flow when source row
T-040: changes/writes cost
T-041: indexed view cost
T-042: why clustered index
T-043: at first
```
Meaning:
```text
Indexed views: materialized/physically stored result, dependency on base tables, unique clustered index first, what happens when base rows change, automatic maintenance, write cost, why indexed views can be heavier than normal table indexes, and nonclustered-index considerations.
```
Subregions:
```text
VIV03A: S-028, S-029
VIV03B: S-030, S-031, S-041
VIV03C: S-032, S-033, S-034
VIV03D: S-035, S-036, S-037, S-038, S-039, S-040
```
### VIV04 - SCHEMABINDING and indexed-view requirements/rules
Source count: **12**
Sources:
```text
S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050, S-051, S-052, S-053
```
Text labels:
```text
T-028: SCHEMABINDING
T-029: protect view from breaking
T-030: SCHEMABINDING
T-031: protect view from breaking
T-032: what it prevents
T-033: schemabinding rules
T-034: indexed views require
T-035: it
T-036: indexed views require
T-037: COUNT BIG for grouping
```
Meaning:
```text
SCHEMABINDING and indexed view requirements: why schemabinding protects the view from breaking, what it prevents, two-part names, schema-bound dependency rules, deterministic expressions, COUNT_BIG for grouping, unique clustered index rules, and additional indexed-view restrictions.
```
Subregions:
```text
VIV04A: S-051, S-052, S-053
VIV04B: S-042, S-043, S-044, S-045, S-046
VIV04C: S-047, S-048
VIV04D: S-049, S-050
```


## Important workflow note

```text
This is a boundary review, not a transcript.
Inventory/contact sheets are checklists, not source of truth.
The transcript pass must reopen source images and recheck meaning visually.
Nearest labels are coordinate hints only.
This Stage1 archive intentionally does not duplicate source PNGs from Stage0.
```
