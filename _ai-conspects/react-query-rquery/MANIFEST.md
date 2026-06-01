# MANIFEST - React Query rquery / R10 consolidated per-region update v003

Archive type: **stage-3c per-region consolidated transcript correction**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-01 15:08:58 UTC

## Purpose

This archive corrects the v002 approach by removing mojibake/OCR-corrupted draft text from the main readable transcript.

It updates:

```text
_ai-conspects/react-query-rquery/regions/R10-mutations.md
```

## Files included

```text
_ai-conspects/react-query-rquery/regions/R10-mutations.md
_ai-conspects/react-query-rquery/data/R10-mutations-sources.csv
_ai-conspects/react-query-rquery/data/R10-mutations-sources.json
_ai-conspects/react-query-rquery/data/R10-mutations-pending-verification-v003.csv
_ai-conspects/react-query-rquery/data/R10-mutations-pending-verification-v003.json
_ai-conspects/react-query-rquery/09-archive-granularity-rule-update.md
_ai-conspects/react-query-rquery/MANIFEST.md
_ai-conspects/react-query-rquery/APPLY_ARCHIVE.md
```

## R10 status

```text
Verified:                    MUT-S001-MUT-S018
Pending visual verification: MUT-S019-MUT-S036
Raw OCR in main transcript:  removed
```

## Important

If v002 was applied but not committed, apply this archive over it and review the diff. This v003 should replace the corrupted OCR draft section with a clean pending-verification section.
