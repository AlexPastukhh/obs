# Current Source of Truth - React Query rquery

Generated: 2026-06-02 02:03:38 UTC

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

## Batch-size rule

```text
Default transcript batch: 30-80 images.
Can be larger if one logical block requires it.
Use one archive with multiple region files when themes differ.
Do not mix different regions into one region file.
Local visual/semantic recheck can override nearest-label grouping before transcript.
```

## Current correction / closure status

```text
R01 v002: expanded full browser/cache road
R02 closure audit v001: completed
R03/R04 closure audit v001: completed for Stage4t candidates
R05 v002: expanded pagination / infinite-query road
R06 v002: corrected with S-176
R07 v004: corrected with S-184/S-186
R08 closure audit v001: completed
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
```

## Current processing target

```text
Stage4w2 corrected mega-boundary active.
Stage4w v001 mega-boundary is superseded for transcript planning.

Next corrected transcript batch:
R05 correction: 13
R09A: 4
R09B: 13
R09C: 11
Total: 41
```

## Pending later

```text
R03/R04 neighbor corrections: R03=2, R04A=2, R04B=1
R07 correction candidates: 2
R11 mutation batch: 23
```
