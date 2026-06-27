# linq to sql — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

Screenshots are the primary source. Candidate regions and nearest labels were used only as navigation hints; every image was visually reviewed before final assignment.

## R01 — Translation pipeline, common operators, generated SQL, and materialization

An EF Core query is an expression tree that the provider translates as far as possible, parameterizes, executes, and materializes. Where becomes predicates, Select controls projection, ordering and pagination map to provider SQL, and scalar operations such as Any often become EXISTS. ToQueryString and EF logging are the reliable way to inspect the SQL for the actual provider and version.

**Reviewed image uses:** S-004, S-005, S-011, S-013, S-020, S-029, S-061, S-066, S-071

**Assigned SVG text nodes:** T-010, T-013, T-022, T-048

## R02 — JOIN, SelectMany, left joins, and filter placement

Query-syntax join is an equality join between outer and inner keys. A correlated multiple-from with a Where predicate commonly becomes INNER JOIN; adding DefaultIfEmpty produces LEFT JOIN. Filter placement matters: a Where after a left join can remove null rows and collapse the intended semantics, while correlated filtering before DefaultIfEmpty preserves them. Independent inner sequences produce CROSS JOIN.

**Reviewed image uses:** S-001, S-002, S-003, S-006, S-007, S-012, S-014, S-019, S-024, S-025, S-026, S-031, S-033, S-035, S-036, S-040, S-042, S-043, S-045, S-046, S-048, S-049, S-050, S-051, S-054, S-055, S-056, S-058, S-060, S-062, S-063, S-064, S-069, S-070

**Assigned SVG text nodes:** T-001, T-002, T-003, T-004, T-005, T-006, T-012, T-025, T-027, T-028, T-029, T-030, T-031, T-039, T-040, T-041, T-042, T-043, T-044, T-045, T-046, T-047

## R03 — CROSS APPLY, OUTER APPLY, and per-outer-row expressions

When the right-side expression depends on the outer row but is not merely a join predicate, providers commonly use CROSS APPLY. DefaultIfEmpty changes that to OUTER APPLY. APPLY is useful for top-N-per-row, correlated projections, computed expressions, or table-valued work per outer row, but it is not automatically faster than JOIN and provider support differs.

**Reviewed image uses:** S-067, S-068, S-073, S-074, S-076, S-078, S-079, S-081, S-082, S-084, S-085, S-088, S-089, S-090, S-091

**Assigned SVG text nodes:** T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-056, T-057, T-058, T-059, T-061

## R04 — GroupBy, GroupJoin, and non-translatable client logic

GroupBy translates reliably when the result is an SQL-shaped key plus aggregates. GroupJoin or projections that require a nested collection generally do not map to a flat relational result. Custom CLR methods, unmapped computed properties, arbitrary business objects, and pre-final client logic must be rewritten into translatable expressions or evaluated after materialization.

**Reviewed image uses:** S-008, S-016, S-022, S-023, S-027, S-032, S-038, S-039, S-044, S-053, S-057, S-059

**Assigned SVG text nodes:** T-037, T-038

## R05 — Navigations, Include, query filters, tracking, and complex mappings

Navigations in predicates and projections translate through joins. Include changes related-data loading rather than selecting root rows directly; split queries avoid cartesian multiplication but may require consistency considerations. Required navigations combined with global query filters can remove parent rows through an inner join. Tracking affects identity/materialization, while value converters, complex types, and JSON mapping depend on provider capabilities.

**Reviewed image uses:** S-015, S-017, S-018, S-021, S-028, S-030, S-034, S-037, S-041, S-047, S-052

**Assigned SVG text nodes:** T-007, T-009, T-011, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-023, T-026, T-032, T-033, T-034, T-035, T-036

## R06 — Provider and overload limitations

Comparer-based, positional/index, and provider-specific overloads are frequent translation limits. Normalize data with translatable operations or database collation where appropriate, rewrite index-based logic using explicit order/skip/take, and remember that APPLY may not exist on every provider. Unsupported operator tables and generated SQL should be checked for the exact EF/provider version.

**Reviewed image uses:** S-009, S-010, S-065, S-072, S-075, S-077, S-080, S-083, S-086, S-087

**Assigned SVG text nodes:** T-008, T-014, T-024, T-060, T-062, T-063, T-064


## Closure

```text
embedded assets: 86
total image uses: 91
processed image uses: 91
restored image uses: 89
duplicate placements: 5
SVG text nodes: 64
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
