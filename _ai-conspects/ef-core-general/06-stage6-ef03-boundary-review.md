# Stage 6 - EF03 Boundary Review

Generated: 2026-06-01 23:28:07 UTC

## Done

- EF02 transcript is processed.
- The pending constructors/materialization cluster is now reviewed as the next candidate block.
- EF02 processed overlap and shadow-property neighbor were checked.

## Now

- EF03 is defined as constructors / materialization.
- This is not a transcript yet.
- It separates constructors/materialization from EF02 Attach state handling and from shadow properties.

## Next

- EF03 transcript.
- Meaning: EF Core materialization and constructors: whether constructors run, constructor binding, safe constructor logic, and what to avoid in constructors.
- Sources/images it should close:

```text
S-027, S-024, S-025, S-026
```

## Later

- Shadow property / query filter block: `S-006`.
- Then next EF Core area by boundary review first.

---

## Boundary decision

EF03 included candidates:

```text
S-027 -> EF materialization: constructors may run, EF creates instances/fills properties/starts tracking
S-024 -> EF does not always prefer parameterless constructor; constructor binding rule
S-025 -> safe constructor logic is fine
S-026 -> what to avoid in constructors
```

Checked but not EF03:

```text
S-006 -> shadow property / query filter
S-028/S-029/S-030 -> already processed EF02 Attach/disconnected update/entity state
```

Why:

```text
S-027/S-024/S-025/S-026 are all about constructors and EF materialization.
S-006 is model/query-filter/shadow property, not constructor materialization.
S-028/S-029/S-030 are Attach/entity-state and are already processed in EF02.
```

---

## Contact sheets

```text
audit-assets/EF03-constructors-materialization-candidates-contact-sheet.png
audit-assets/EF03-checked-neighbor-candidates-contact-sheet.png
audit-assets/EF03-boundary-review-all-candidates-contact-sheet.png
```

---

## Important workflow note

Inventory/ledger are still only checklists.

The EF03 transcript pass must still reopen and visually recheck the four EF03 images.
