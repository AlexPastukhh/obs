# Stage 10 - Combined EF05 / EF06 Boundary Review

Generated: 2026-06-01 23:58:11 UTC

## Done

- EF04 transcript is processed.
- The local EF01-EF04 cluster is closed.
- This stage increases batch size: it boundary-reviews two larger regions at once.

## Now

- EF05 and EF06 are defined as candidate regions.
- This is still not transcript.
- The goal is bigger planning without losing coverage.

## Next

- First transcript pass should be **EF05A** or **EF06A**.
- Recommended: start with **EF05A** because it is small and closes the unique constraint/race-protection thread.

```text
EF05A:
S-012, S-013, S-011
Race protection with UNIQUE constraint/index.
```

## Later

- EF05B: owned FullName optional mapping + CHECK constraint.
- EF05C: optional value objects / complex types.
- EF06A: optimistic concurrency / check-then-add race.
- EF06B: transactions and isolation levels.
- EF06C: db exceptions / retry exhausted / catch order.

---

## Why this is bigger but still safe

We are not doing a 28-image transcript in one pass.

This archive does:

```text
boundary review for EF05 + EF06 together
```

Then future transcripts stay split:

```text
EF05A -> EF05B -> EF05C
EF06A -> EF06B -> EF06C
```

That doubles planning size, but keeps transcript risk controlled.

---

## EF05 - Model mapping / constraints / owned and complex types

Candidate sources:

```text
S-012, S-013, S-011, S-004, S-005, S-002, S-003, S-019, S-014, S-015, S-016, S-017, S-018, S-020, S-021, S-022, S-023
```

Subpasses:

```text
EF05A: S-012, S-013, S-011
- race protection / UNIQUE constraint / unique index

EF05B: S-004, S-005, S-002, S-003, S-019
- owned FullName optional mapping / CHECK constraint
- note: S-003 and S-019 are duplicate uses of the same image definition and must be handled as duplicate-use evidence, not lost

EF05C: S-014, S-015, S-016, S-017, S-018, S-020, S-021, S-022, S-023
- optional value objects, optional child entities, complex type mapping, optional complex type caveat
```

## EF06 - Transactions / concurrency / db exceptions / retry

Candidate sources:

```text
S-047, S-048, S-049, S-050, S-051, S-052, S-062, S-063, S-064, S-065, S-061
```

Subpasses:

```text
EF06A: S-047, S-048
- optimistic concurrency and check-then-add race

EF06B: S-049, S-050, S-051, S-052
- explicit transactions, atomicity vs isolation, ReadCommitted/Snapshot/ReadUncommitted

EF06C: S-062, S-063, S-064, S-065, S-061
- SaveChanges failure, transaction commit failure, RetryLimitExceededException, catch order
```

## Checked not current EF Core target

```text
S-001 -> ASP/Vite/CORS/proxy material, not EF Core mapping/transaction material
```

Keep it in ledger, but do not force it into EF05/EF06.

## Contact sheets

```text
audit-assets/EF05-model-mapping-constraints-all-candidates-contact-sheet.png
audit-assets/EF05A-unique-constraint-race-candidates-contact-sheet.png
audit-assets/EF05B-owned-fullname-check-constraint-candidates-contact-sheet.png
audit-assets/EF05C-optional-value-object-complex-type-candidates-contact-sheet.png
audit-assets/EF06-transactions-concurrency-exceptions-all-candidates-contact-sheet.png
audit-assets/EF06A-optimistic-concurrency-candidates-contact-sheet.png
audit-assets/EF06B-transactions-isolation-candidates-contact-sheet.png
audit-assets/EF06C-exceptions-retry-candidates-contact-sheet.png
```

## Important workflow note

Inventory/ledger are still only checklists.

Each transcript pass must reopen and visually recheck its candidate images.
