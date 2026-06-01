# Stage 4 - EF02 Boundary Review

Generated: 2026-06-01 23:19:46 UTC

## Done

- EF01A and EF01B are already processed.
- EF01B review left `S-006/S-029/S-030` pending.
- This stage starts the next block safely with boundary review.

## Now

- EF02 is defined as Attach / disconnected updates / entity state.
- This is not a transcript yet.
- It separates Attach/update sources from nearby shadow-property and constructor/materialization sources.

## Next

- EF02 transcript.
- Meaning: Attach, detached entity update, marking modified properties, entity state, and avoiding accidental nested detached updates.
- Sources/images it should close:

```text
S-029, S-030, S-028
```

## Later

- Shadow property / query filter block: `S-006`.
- Constructors/materialization block: `S-024/S-025/S-026/S-027`.
- Then next EF Core area by boundary review first.

---

## Boundary decision

EF02 included candidates:

```text
S-029 -> Attach + explicit property modification example
S-030 -> How Attach helps / existing entity unchanged
S-028 -> Editing attached entity with detached nested entity; EntityState modified/unchanged handling
```

Checked but not EF02:

```text
S-006 -> shadow property / query filter
S-024/S-025/S-026/S-027 -> constructors / materialization
```

Why:

```text
S-029/S-030/S-028 are all about Attach/disconnected update/entity state.
S-006 is about shadow property usage and belongs to a model/query-filter area.
S-024/S-025/S-026/S-027 are about constructors and EF materialization, not Attach state handling.
```

---

## Contact sheets

```text
audit-assets/EF02-attach-disconnected-state-candidates-contact-sheet.png
audit-assets/EF02-checked-neighbor-candidates-contact-sheet.png
audit-assets/EF02-boundary-review-all-candidates-contact-sheet.png
```

---

## Important workflow note

Inventory/ledger are still only checklists.

The EF02 transcript pass must still reopen and visually recheck the three EF02 images.
