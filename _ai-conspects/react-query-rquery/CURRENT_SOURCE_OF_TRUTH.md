# Current Source of Truth - React Query rquery

Generated: 2026-06-01 22:54:07 UTC

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
R08 closure audit v001: completed
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
```

## Current processing target

```text
R02 boundary review started.
Next transcript pass: R02A useQuery state / status / error / cache core.
```

## R02 split status

```text
R02 formal candidate count: 36
R02A candidates: 15
R02B candidates: 9
R02C candidates: 11
R04 overlap reserved: 1
```

R02 is not completed yet. The next step is R02A transcript with local boundary review.
