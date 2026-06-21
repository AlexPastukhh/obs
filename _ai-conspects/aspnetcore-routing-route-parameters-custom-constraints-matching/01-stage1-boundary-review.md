# Stage 1 — Boundary Review

Generated: 2026-06-21 14:48:44 UTC

## Done

- Reviewed all Stage0 source-image uses using the source images and contact sheet.
- Assigned every image use to one candidate region and subregion.
- Assigned every canvas text label to a candidate region.
- Created the image-review ledger.
- No transcript processing is claimed in this stage.
- No source PNGs are duplicated in this archive.

## Coverage

```text
Image uses: 18
Assigned image uses: 18
Missing image uses: 0
Duplicate assignments: 0
Text labels: 23
Assigned text labels: 23
Missing text labels: 0
Processed image uses: 0
```

## Regions

## RTR01 — Route parameter forms and built-in constraints

```text
Image uses: 4
Text labels: 0
Sources: S-001, S-002, S-003, S-004
Text: none
```

Reason: Required, optional and catch-all route parameters plus the role of built-in route constraints.

Subregions:

- `RTR01A` — 3 sources: S-001, S-002, S-003
- `RTR01B` — 1 sources: S-004

## RTR02 — Custom IRouteConstraint implementation and registration

```text
Image uses: 1
Text labels: 17
Sources: S-005
Text: T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018
```

Reason: Custom constraint Match implementation, RouteOptions.ConstraintMap registration and inline use in a route template.

Subregions:

- `RTR02A` — 1 sources: S-005

## RTR03 — Router matching, precedence, order and overlapping endpoints

```text
Image uses: 13
Text labels: 6
Sources: S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-018
Text: T-001, T-019, T-020, T-021, T-022, T-023
```

Reason: Candidate creation, constraint filtering, route precedence, endpoint order, fallback routes, attributes/filters and deliberate overrides.

Subregions:

- `RTR03A` — 9 sources: S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014
- `RTR03B` — 4 sources: S-015, S-016, S-017, S-018


## Next

```text
NEXT01: RTR01 + RTR02 = 5 image uses
NEXT02: RTR03 = 13 image uses
Final closure/audit
```

## Boundary rule

```text
Stage1 decisions are candidate boundaries only.
Every source image must be visually and semantically rechecked during transcript processing.
```
