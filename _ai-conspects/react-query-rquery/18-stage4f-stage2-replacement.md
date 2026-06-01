# Stage 4f - Stage2 Replacement v002

Generated: 2026-06-01 21:14:24 UTC

## Direction check

Goal:
Remove old Stage2 as a misleading boundary source and replace it with a no-image-loss review workflow.

Now:
Stage2 caused R01 to be treated as a 3-image region even though the real area is a two-column road.

This step:
Create a review ledger, not a new source of truth.

Why:
We need every image visible to the process, but every region must still be visually/semantically rechecked before completion.

Next:
1. apply this archive;
2. remove old Stage2 files;
3. create R01 v002 using fresh boundary review, not blind ledger trust.

## New rule

```text
Even with a coverage/review ledger, all candidates must be rechecked.
The ledger prevents forgetting images; it does not decide region boundaries.
```
