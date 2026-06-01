# MANIFEST - React Query Stage4i Combined Corrections v002

Archive type: **combined correction archive**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-01 22:09:03 UTC

## Direction check

Goal:
Fix the remaining known misses from Stage4g audit in one archive, without leaving mixed ledger statuses.

Now:
R01 and R05 have already been corrected separately. Stage4i v001 had the right content corrections but left old ledger statuses inconsistent.

This step:
Add R06 v002, R07 v004, and R10 v006 corrections, and normalize ledger statuses for existing included sources.

Why:
After correction, the ledger should not still say old included R06/R07 sources are `processed v001 / must recheck`.

Next:
Review diff and commit; then continue to new regions, likely R08 QueryClient/methods.

## Files included / updated

```text
_ai-conspects/react-query-rquery/regions/R06-query-composition-usequeries-dependent-combine.md
_ai-conspects/react-query-rquery/regions/R07-prefetch-initialdata-placeholderdata-usequeryclient.md
_ai-conspects/react-query-rquery/regions/R10-mutations.md
_ai-conspects/react-query-rquery/data/R06-sources-stage4i-v002.csv
_ai-conspects/react-query-rquery/data/R06-sources-stage4i-v002.json
_ai-conspects/react-query-rquery/data/R07-sources-stage4i-v004.csv
_ai-conspects/react-query-rquery/data/R07-sources-stage4i-v004.json
_ai-conspects/react-query-rquery/data/R10-mutations-sources-stage4i-v006.csv
_ai-conspects/react-query-rquery/data/R10-mutations-sources-stage4i-v006.json
_ai-conspects/react-query-rquery/data/combined-corrections-boundary-review-stage4i-v001.csv
_ai-conspects/react-query-rquery/data/combined-corrections-boundary-review-stage4i-v001.json
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.csv
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.json
_ai-conspects/react-query-rquery/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/react-query-rquery/21-stage4i-combined-r06-r07-r10-corrections.md
_ai-conspects/react-query-rquery/DIFF_REVIEW_STAGE4I.md
_ai-conspects/react-query-rquery/scripts/copy-stage4i-diff.ps1
_ai-conspects/react-query-rquery/audit-assets/*
_ai-conspects/react-query-rquery/MANIFEST.md
_ai-conspects/react-query-rquery/APPLY_ARCHIVE.md
```

## v002-specific fix

```text
R06 old included sources -> processed-in-r06-v002
R07 old included sources -> processed-in-r07-v004
R08 QueryClient/methods candidates -> reserved for future R08
```
