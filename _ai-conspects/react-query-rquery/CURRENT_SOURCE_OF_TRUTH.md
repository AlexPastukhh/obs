# Current Source of Truth - React Query rquery

Generated: 2026-06-02 01:13:31 UTC

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

## Current correction / closure status

```text
R01 v002: expanded full browser/cache road
R02 closure audit v001: completed
R03 v001: notifyOnChangeProps / select / structural sharing transcript completed
R04A v001: staleness / static staleTime / refetch / retry transcript completed
R04B v001: observer / cache lifecycle / gcTime / refetchInterval transcript completed
R05 v002: expanded pagination / infinite-query road
R06 v002: corrected with S-176
R07 v004: corrected with S-184/S-186
R08 closure audit v001: completed
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
```

## Current processing target

```text
R03 processed: 7
R04A processed: 24
R04B processed: 12
Next step: R03/R04 closure audit.
```

## Neighbor caution

```text
R05 neighbors remain R05, not R04.
S-065/S-066 remain unreviewed and must surface in a later boundary review.
```
