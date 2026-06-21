# Stage 4x-fixed - Preflight / Invalidated Stage4x Guard v001

Generated: 2026-06-02 02:35:57 UTC

## Direction check

Goal:
Continue after rollback of the bad Stage4x archive without losing the corrected Stage4w2 boundary.

Done:
The bad Stage4x archive was rolled back.

This step:
Create a preflight archive, not a transcript.

Why:
The previous Stage4x attempted a large OCR-assisted pass and marked 71 sources as processed too early. This preflight prevents that failure mode from being committed.

Next:
Apply and commit this preflight. Then rebuild transcripts from the pending queue.

---

## Invalidated archive

```text
ai-conspects-react-query-rquery-stage4x-large-corrected-scope-transcripts-v001.zip
```

Reason:

```text
Do not use it as transcript source.
It attempted a large OCR pass, hit OCR/timeout problems, and still marked sources as processed.
```

Hard rule:

```text
If a source transcript contains any of these:
- [OCR timeout/error]
- [image missing]
- empty visible text
- placeholder instead of real reading

then that source must stay pending and must not be marked processed.
```

---

## Corrected Stage4w2 scope remains active

Total queued sources:

```text
71
```

They are now pending transcript, not processed.

Groups:

```text
R03 v002 correction: 2
R04A v002 correction: 2
R04B v002 correction: 1
R05 v003 correction: 13
R07 v005 correction: 2
R09A cache/remove/reset: 4
R09B network/offline: 13
R09C validation/resumePaused: 11
R11 mutations: 23
```

---

## Work queue

```text
data/Stage4x-fixed-work-queue-v001.csv
data/Stage4x-fixed-work-queue-v001.json
```

Recommended next processing:

```text
Batch A:
R05 correction + R09A + R09B
Primary count: 30
Optional small corrections if clearly readable: 7

Batch B:
R09C + R11
Count: 34
```

---

## Batch-size rule

```text
Default transcript batch: 60-160 images.
Can be larger if one logical block requires it.
One archive may contain multiple region files.
Do not mix different logical regions into one region file.
A source becomes processed only after verified visible transcript exists.
```
