# Stage 8 - EF04 Boundary Review

Generated: 2026-06-01 23:39:21 UTC

## Done

- EF03 transcript is processed.
- The remaining nearby pending source `S-006` is reviewed as the next candidate block.
- EF01A/EF02/EF03 overlaps were checked and not reassigned.

## Now

- EF04 is defined as shadow property / query filter.
- This is not a transcript yet.
- It separates the single shadow-property filter example from nearby processed tracking/Attach/constructor regions.

## Next

- EF04 transcript.
- Meaning: filtering by a shadow property with `EF.Property<bool>(o, "IsDeleted")`.
- Sources/images it should close:

```text
S-006
```

## Later

- Next EF Core area by boundary review first.
- Likely next larger areas are model constraints / owned and complex types, or transactions / concurrency / db exceptions.

---

## Boundary decision

EF04 included candidate:

```text
S-006 -> Filter by a shadow property using EF.Property<bool>(o, "IsDeleted") == false
```

Checked but not EF04:

```text
S-028/S-029/S-030 -> already processed EF02 Attach/disconnected update/entity state
S-024/S-025/S-026/S-027 -> already processed EF03 constructors/materialization
S-031/S-032/S-033 -> already processed EF01A tracking/identity/read path
```

Why:

```text
S-006 is the only nearby screenshot whose actual source content is shadow property filtering.
Nearby label text mentions Attach/constructors/tracking because of spatial proximity, but those images are already processed under EF02/EF03/EF01A.
```

---

## Contact sheets

```text
audit-assets/EF04-shadow-property-query-filter-candidate-contact-sheet.png
audit-assets/EF04-checked-neighbor-candidates-contact-sheet.png
audit-assets/EF04-boundary-review-all-candidates-contact-sheet.png
```

---

## Important workflow note

Inventory/ledger are still only checklists.

The EF04 transcript pass must still reopen and visually recheck `S-006`.
