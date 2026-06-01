# Current Source of Truth - React Query rquery

Generated: 2026-06-01 22:21:09 UTC

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

## Current processing status

```text
R08 boundary review: started
R08A v001: QueryClient / QueryFilters / core methods transcript completed
R08B: reserved / pending
R08C: reserved / pending
R08D or neighbor: reserved / pending
```

## R08 caution

```text
R08 has 51 coordinate candidates and is intentionally split.
R08A does not complete all R08.
Each later R08 transcript pass must still recheck local candidates visually and semantically.
```
