# MANIFEST - React Query Stage4x-fixed Preflight

Archive type: **preflight / invalidated archive guard**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-02 02:35:57 UTC

## Direction check

Goal:
Resume after rollback of bad Stage4x.

Done:
Bad Stage4x was rolled back.

This step:
Add a preflight guard and pending work queue.

Why:
The old Stage4x must not be committed because it could mark OCR-error/placeholder sources as processed.

Next:
1. review diff;
2. commit;
3. rebuild transcripts from the pending queue.

## Files included / updated

```text
_ai-conspects/react-query-rquery/37-stage4x-fixed-preflight.md
_ai-conspects/react-query-rquery/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/react-query-rquery/data/Stage4x-fixed-work-queue-v001.csv
_ai-conspects/react-query-rquery/data/Stage4x-fixed-work-queue-v001.json
_ai-conspects/react-query-rquery/data/Stage4x-invalidated-archive-v001.csv
_ai-conspects/react-query-rquery/data/Stage4x-invalidated-archive-v001.json
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.csv
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.json
_ai-conspects/react-query-rquery/MANIFEST.md
_ai-conspects/react-query-rquery/APPLY_ARCHIVE.md
```

## Status after apply

```text
Stage4x bad archive invalidated.
Corrected Stage4w2 scope remains pending transcript.
No source is marked processed by this preflight.
```
