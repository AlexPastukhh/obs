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
Image uses: 29
Assigned image uses: 29
Missing image uses: 0
Duplicate assignments: 0
Text labels: 10
Assigned text labels: 10
Missing text labels: 0
Processed image uses: 0
```

## Regions

## LJG01 — Join and GroupJoin semantics

```text
Image uses: 14
Text labels: 2
Sources: S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-020
Text: T-007, T-008
```

Reason: Join, GroupJoin, left-join flattening, key selectors and result selectors.

Subregions:

- `LJG01A` — 3 sources: S-001, S-002, S-003
- `LJG01B` — 11 sources: S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-020

## LJG02 — GroupBy grouping and result shape

```text
Image uses: 6
Text labels: 1
Sources: S-014, S-015, S-016, S-017, S-018, S-019
Text: T-009
```

Reason: GroupBy semantics, grouped elements, aggregation and projection into summary objects.

Subregions:

- `LJG02A` — 3 sources: S-014, S-015, S-016
- `LJG02B` — 3 sources: S-017, S-018, S-019

## LJG03 — SelectMany flattening and result-selector callback

```text
Image uses: 9
Text labels: 7
Sources: S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029
Text: T-001, T-002, T-003, T-004, T-005, T-006, T-010
```

Reason: SelectMany collection selector, flattening, overload without result selector and overload with second callback.

Subregions:

- `LJG03A` — 4 sources: S-021, S-022, S-023, S-024
- `LJG03B` — 2 sources: S-025, S-026
- `LJG03C` — 3 sources: S-027, S-028, S-029


## Next

```text
NEXT01: LJG01 = 14 image uses
NEXT02: LJG02 + LJG03 = 15 image uses
Final closure/audit
```

## Boundary rule

```text
Stage1 decisions are candidate boundaries only.
Every source image must be visually and semantically rechecked during transcript processing.
```
