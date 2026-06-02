# Current Source of Truth - React Query rquery

Generated: 2026-06-02 08:43:05 UTC

## Current policy

Do not use old Stage2 as source of truth. Do not treat the review ledger as source of truth.

A region is complete only when its region file contains coverage / boundary review, included sources, candidate checks, excluded/reassigned candidates, open issues, and verified source transcript or correction addendum.

For large split regions, add a closure audit after the last sub-pass.

## No-placeholder-processed rule

```text
If visible transcript has OCR timeout/error, image missing, empty text, or placeholder text,
the source stays pending and must not be marked processed.
```

## Current correction / closure status

```text
R01 v002: expanded full browser/cache road
R02 closure audit v001: completed
R03/R04 closure audit v001: completed for Stage4t candidates
R05 v002: expanded pagination / infinite-query road
R05 v003 correction: completed in Stage4x Rebuild A
R06 v002: corrected with S-176
R07 v004: corrected with S-184/S-186
R08 closure audit v001: completed
R09A v001: cache remove/reset transcript completed in Stage4x Rebuild A
R09B v001: network/offline transcript completed in Stage4x Rebuild A
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
Stage4x bad archive: invalidated / do not use
```

## Current processing target

```text
Stage4x Rebuild A completed.
Processed in this batch: 30
Remaining pending:
- small corrections R03/R04/R07: 7
- R09C: 11
- R11: 23
Next: Batch B or small correction + Batch B, depending on readability.
```
