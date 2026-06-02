# MANIFEST - React Query Stage4w2 Mega Boundary Correction

Archive type: **boundary correction**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-02 02:03:38 UTC

## Direction check

Goal:
Correct Stage4w before using it for a large transcript batch.

Done:
Stage4w created a mega-boundary, but local visual recheck found false R09A assignments.

This step:
Add corrected Stage4w2 boundary and updated ledger.

Why:
A 30-80 image batch is okay only if the boundary is visually clean first.

Next:
1. review diff;
2. commit;
3. process the corrected 30-80 image batch.

## Files included / updated

```text
_ai-conspects/react-query-rquery/36-stage4w2-mega-boundary-correction.md
_ai-conspects/react-query-rquery/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/react-query-rquery/data/R09-R11-mega-boundary-review-stage4w2-v002.csv
_ai-conspects/react-query-rquery/data/R09-R11-mega-boundary-review-stage4w2-v002.json
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.csv
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.json
_ai-conspects/react-query-rquery/audit-assets/R03-correction-notify-select-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R04-corrections-static-refetchinterval-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R05-correction-infinite-query-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R07-correction-prefetch-ensure-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R09A-corrected-cache-remove-reset-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R09B-corrected-network-offline-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R09C-corrected-validation-resume-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R11-corrected-mutations-stage4w2-contact-sheet.png
_ai-conspects/react-query-rquery/audit-assets/R09-R11-corrected-source-images/*.png
_ai-conspects/react-query-rquery/MANIFEST.md
_ai-conspects/react-query-rquery/APPLY_ARCHIVE.md
```

## Status after apply

```text
Stage4w v001 mega-boundary superseded.
Stage4w2 v002 corrected boundary active.
No new transcript added.
```
