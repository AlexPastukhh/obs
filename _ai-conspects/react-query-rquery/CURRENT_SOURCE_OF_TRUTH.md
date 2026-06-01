# Current Source of Truth - React Query rquery

Generated: 2026-06-01 22:44:55 UTC

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

For large split regions, add a closure audit after the last sub-pass.

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
R08A v001: QueryClient / QueryFilters / core methods transcript completed
R08B v001: refetch / cancel options / cache helpers transcript completed
R08C v001: QueryClient outside React / shape discipline transcript completed
R08 closure audit v001: completed
```

## R08 closure status

```text
Formal R08 checklist count: 51
R08A processed: 17
R08B processed: 23
R08C processed: 10
R07 overlap excluded: 1
Side-check S-186: already R07 v004, not R08
```

R08 planned split is closed. Next new area must start with boundary review first.
