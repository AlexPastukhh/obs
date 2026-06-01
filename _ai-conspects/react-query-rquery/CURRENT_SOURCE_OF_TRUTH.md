# Current Source of Truth - React Query rquery

Generated: 2026-06-01 22:09:03 UTC

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

## Ledger consistency note

Stage4i v002 normalizes the old included R06/R07 rows in the ledger so they no longer say `processed v001 / must recheck` after correction.

```text
R06 old included sources -> processed-in-r06-v002
R07 old included sources -> processed-in-r07-v004
R08 QueryClient/methods neighbor column -> reserved for future R08, not finalized as R07
```

## Still pending after this archive

```text
R08 QueryClient/methods column should be processed as its own boundary review.
All unreviewed ledger items remain provisional until processed by region.
```
