# Stage 1 - EF01 Boundary Review and Split Plan

Generated: 2026-06-01 22:33:30 UTC

## Done

- Stage0 materialized the uploaded EF Core SVG into image inventory, label inventory, source images, and contact sheets.
- This means the EF Core conspect now has a no-image-loss checklist.
- No verified transcript exists yet.

## Now

- Stage1 reviews the first large visual area: EF Core reads/tracking/loading behavior in the left band.
- This stage is boundary review only, not a transcript.
- The inventory/ledger is still a checklist, not source of truth.

## Next

- EF01A transcript.
- Meaning: tracking, identity map, no-tracking reads, identity resolution, projection/read models.
- It should cover these sources:

```text
S-010, S-031, S-009, S-032, S-008, S-033, S-034, S-007, S-035, S-036, S-053, S-054, S-055, S-056, S-057, S-058
```

## Later

- EF01B transcript: loading collections / Include / Find / Load / AutoInclude.
- Then move to the next EF Core area by boundary review, not by blind inventory.

---

## Boundary summary

EF01 is the left-band road around EF Core tracking and reads. It should be split:

```text
EF01A: tracking / identity map / no-tracking / identity resolution / projections
EF01B: loading collections / Include / Find / Load / AutoInclude
```

## EF01A candidates

```text
S-010, S-031, S-009, S-032, S-008, S-033, S-034, S-007, S-035, S-036, S-053, S-054, S-055, S-056, S-057, S-058
```

## EF01B reserved candidates

```text
S-037, S-038, S-039, S-040, S-041, S-059, S-060, S-042, S-043, S-044, S-045, S-046
```

## Checked neighbor candidates

```text
S-006, S-029, S-030
```

These are not included in EF01A yet. They are adjacent/same-band safety candidates and must be rechecked during later boundary passes.

## Contact sheets

```text
audit-assets/EF01A-tracking-identity-resolution-contact-sheet.png
audit-assets/EF01B-loading-collections-contact-sheet.png
audit-assets/EF01-pending-neighbor-candidates-contact-sheet.png
audit-assets/contact-sheet-left-band.png
```
