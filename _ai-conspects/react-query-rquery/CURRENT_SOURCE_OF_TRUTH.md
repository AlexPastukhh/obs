# Current Source of Truth - React Query rquery

Generated: 2026-06-02 09:02:20 UTC

## Current policy

Do not use old Stage2 as source of truth. Do not treat the review ledger as source of truth.

A region is complete only when its region file contains coverage / boundary review, included sources, candidate checks, excluded/reassigned candidates, open issues, and verified source transcript or correction addendum.

For large split regions, add a closure audit after the last sub-pass.

## Batch-size rule

```text
Default transcript batch: 60-160 images.
Can be larger if one logical block requires it.
Use one archive with multiple region files when themes differ.
Do not mix different regions into one region file.
Local visual/semantic recheck can override nearest-label grouping before transcript.
```

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
R03 v002 correction: completed in Stage4y Rebuild B
R04A v002 correction: completed in Stage4y Rebuild B
R04B v002 correction: completed in Stage4y Rebuild B
R05 v002: expanded pagination / infinite-query road
R05 v003 correction: completed in Stage4x Rebuild A
R06 v002: corrected with S-176
R07 v004: corrected with S-184/S-186
R07 v005 correction: completed in Stage4y Rebuild B
R08 closure audit v001: completed
R09A v001: cache remove/reset transcript completed in Stage4x Rebuild A
R09B v001: network/offline transcript completed in Stage4x Rebuild A
R09C v001: validation/resumePaused transcript completed in Stage4y Rebuild B
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
R11 v001: mutations/callbacks/optimistic transcript completed in Stage4y Rebuild B
Stage4x corrected queue closure audit v001: completed
Stage4x bad archive: invalidated / do not use
```

## Current processing target

```text
Stage4x corrected queue: closed
Rebuild A processed: 30
Rebuild B processed: 41
Total audited: 71
Next: next large logical block, boundary review first.
```
