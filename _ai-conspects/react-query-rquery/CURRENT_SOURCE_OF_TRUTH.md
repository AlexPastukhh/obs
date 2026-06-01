# Current Source of Truth - React Query rquery

Generated: 2026-06-01 22:14:49 UTC

## Current policy

Do not use old Stage2 as source of truth.

Do not treat the review ledger as source of truth.

The ledger is a checklist, work queue, provisional tracker, and decision log after visual/semantic review.

## Actual source of truth for a region

A region is complete only when its region file contains:

```text
Coverage / boundary review
included sources
candidate types checked
nearby candidates checked
excluded/reassigned candidates with reasons
remaining open issues
verified source transcript or correction addendum
```

## Current correction status

```text
R01 v002: expanded full browser/cache road
R05 v002: expanded pagination / infinite-query road
R06 v002: corrected with S-176
R07 v004: corrected with S-184/S-186
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
```

## Current processing target

```text
R08 boundary review started.
Next transcript pass: R08A QueryClient / QueryFilters / core methods.
```

## R08 caution

```text
R08 has 51 coordinate candidates and must be split.
R08 boundary review is a candidate checklist, not a final source of truth.
Each R08 transcript pass must still recheck local candidates visually and semantically.
```
