# MANIFEST - React Query Stage4x Rebuild A

Archive type: **validated transcript rebuild batch**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-02 08:43:05 UTC

## Direction check

Goal:
Rebuild Stage4x without OCR-placeholder processed sources.

Done:
Stage4x-fixed preflight created the pending queue.

This step:
Add Batch A transcripts:
- R05 v003 correction
- R09A cache remove/reset
- R09B network/offline/offlineFirst

Why:
Every included source has visible text in the region file. No OCR-timeout placeholder is marked processed.

Next:
1. review diff;
2. commit;
3. process Batch B.

## Files included / updated

```text
_ai-conspects/react-query-rquery/regions/R05-v003-infinite-query-correction.md
_ai-conspects/react-query-rquery/regions/R09A-cache-remove-reset.md
_ai-conspects/react-query-rquery/regions/R09B-network-offline.md
_ai-conspects/react-query-rquery/data/*stage4x-rebuild-a-v001.*
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.csv
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.json
_ai-conspects/react-query-rquery/audit-assets/stage4x-batch-a-source-images/*.png
_ai-conspects/react-query-rquery/38-stage4x-rebuild-a-r05-r09a-r09b-transcripts.md
_ai-conspects/react-query-rquery/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/react-query-rquery/MANIFEST.md
_ai-conspects/react-query-rquery/APPLY_ARCHIVE.md
```

## Status

```text
Batch A processed: 30
Remaining Stage4x-fixed queue pending: 41
```
