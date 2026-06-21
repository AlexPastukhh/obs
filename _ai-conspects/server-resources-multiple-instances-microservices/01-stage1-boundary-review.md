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
Image uses: 30
Assigned image uses: 30
Missing image uses: 0
Duplicate assignments: 0
Text labels: 20
Assigned text labels: 20
Missing text labels: 0
Processed image uses: 0
```

## Regions

## SRM01 — Finite server resources and bottleneck categories

```text
Image uses: 12
Text labels: 12
Sources: S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012
Text: T-001, T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012
```

Reason: CPU, memory, bandwidth, sockets, threads, disk, database pools, OS limits, TLS and application-specific pools.

Subregions:

- `SRM01A` — 5 sources: S-001, S-002, S-003, S-004, S-005
- `SRM01B` — 7 sources: S-006, S-007, S-008, S-009, S-010, S-011, S-012

## SRM02 — Request budgets, concurrency and saturation

```text
Image uses: 12
Text labels: 5
Sources: S-013, S-014, S-015, S-016, S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024
Text: T-015, T-016, T-017, T-018, T-019
```

Reason: Finite work budgets across requests, CPU time sharing, throughput, saturation and why one server handles many concurrent requests.

Subregions:

- `SRM02A` — 7 sources: S-013, S-014, S-015, S-016, S-017, S-018, S-019
- `SRM02B` — 5 sources: S-020, S-021, S-022, S-023, S-024

## SRM03 — Scale up, scale out and microservices distinction

```text
Image uses: 6
Text labels: 3
Sources: S-025, S-026, S-027, S-028, S-029, S-030
Text: T-013, T-014, T-020
```

Reason: Adding machines, load balancing and distributed-system concerns versus decomposing a monolith into microservices.

Subregions:

- `SRM03A` — 4 sources: S-025, S-026, S-027, S-028
- `SRM03B` — 2 sources: S-029, S-030


## Next

```text
NEXT01: SRM01 = 12 image uses
NEXT02: SRM02 = 12 image uses
NEXT03: SRM03 = 6 image uses
Final closure/audit
```

## Boundary rule

```text
Stage1 decisions are candidate boundaries only.
Every source image must be visually and semantically rechecked during transcript processing.
```
