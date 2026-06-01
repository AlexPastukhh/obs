# Current Source of Truth - React Query rquery

Generated: 2026-06-01 23:45:48 UTC

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
R02 closure audit v001: completed
R05 v002: expanded pagination / infinite-query road
R06 v002: corrected with S-176
R07 v004: corrected with S-184/S-186
R08 closure audit v001: completed
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
```

## Current processing status

```text
R02A v002: useQuery state / status / error / cache core transcript completed
R02B v001: enabled / disabled / conditional UI transcript completed
R02C v001: query keys / manual refetch / declarative dependencies transcript completed
R02 closure audit v001: completed
```

## R02 closure status

```text
Formal R02 checklist count: 36
R02A processed: 16
R02B processed: 8
R02C processed: 11
R04 overlap reserved: 1
```

R02 planned split is closed. Next new area must start with boundary review first.
