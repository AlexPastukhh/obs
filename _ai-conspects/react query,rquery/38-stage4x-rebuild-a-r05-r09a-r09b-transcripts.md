# Stage 4x Rebuild A - R05 + R09A + R09B Transcripts v001

Generated: 2026-06-02 08:43:05 UTC

## Direction check

Goal:
Rebuild transcripts after invalidating the bad Stage4x OCR archive.

Done:
Stage4x-fixed preflight returned 71 sources to pending.

This step:
Process Batch A with readable visible transcript only:
- R05 v003 correction
- R09A cache remove/reset
- R09B network/offline/offlineFirst

Why:
This restores trust after the bad OCR archive. Batch A marks only 30 images processed, all with visible text.

Next:
1. apply and review diff;
2. commit;
3. process Batch B: R09C + R11, plus small corrections if readable.

## Batch A count

```text
R05 correction: 13
R09A: 4
R09B: 13
Total: 30
```
