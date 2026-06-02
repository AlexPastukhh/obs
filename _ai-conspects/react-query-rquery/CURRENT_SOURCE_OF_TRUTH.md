# Current Source of Truth - React Query rquery

Generated: 2026-06-02 02:35:57 UTC

## Current policy

Do not use old Stage2 as source of truth.

Do not treat the review ledger as source of truth.

The ledger is a checklist, work queue, provisional tracker, and decision log after visual/semantic review.

## Actual source of truth for a region

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
R05 v002: expanded pagination / infinite-query road
R06 v002: corrected with S-176
R07 v004: corrected with S-184/S-186
R08 closure audit v001: completed
R10 v006: corrected with S-240/S-241 + duplicate-use note S-237/S-246
Stage4x bad archive: invalidated / do not use
```

## Current processing target

```text
Stage4w2 corrected mega-boundary remains active.
Stage4x-fixed preflight queue active.
Queued sources: 71
No Stage4x queued source is marked processed by this preflight.
```

## Next transcript attempt

```text
Batch A:
R05 correction + R09A + R09B
Optional small corrections only if readable.

Batch B:
R09C + R11.
```
