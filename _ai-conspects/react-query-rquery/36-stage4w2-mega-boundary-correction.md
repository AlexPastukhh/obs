# Stage 4w2 - Mega Boundary Correction v002

Generated: 2026-06-02 02:03:38 UTC

## Direction check

Goal:
Increase batch size to 30-80 images without letting wrong boundary assignments enter transcripts.

Done:
Stage4w closed R03/R04 and created a mega-boundary.

This step:
Correct the Stage4w mega-boundary after local visual recheck.

Why:
The initial Stage4w mega-boundary over-relied on nearest labels. Visual recheck showed that several images marked as R09A are actually R03/R04/R05/R07 continuations.

Next:
Apply and commit this correction. Then process the corrected 30-80 image batch.

---

## Critical correction

```text
Stage4w R09A v001 is superseded.
Do not use R09-R11-mega-boundary-review-stage4w-v001 as transcript source.
Use R09-R11-mega-boundary-review-stage4w2-v002 instead.
```

Examples of corrected misassignments:

```text
S-065/S-066 -> R03 correction, not R09A
S-109/S-110 -> R04A correction, not R09A
S-113 -> R04B correction, not R09A
S-118/S-119/S-121/S-122/S-136/S-137/S-148/S-156/S-166/S-174/S-181/S-188/S-192 -> R05 correction, not R09A
S-189/S-195 -> R07 correction, not R09A
```

---

## Corrected groups

```text
R03 correction: 2
R04A correction: 2
R04B correction: 1
R05 correction: 13
R07 correction: 2
R09A corrected: 4
R09B corrected: 13
R09C corrected: 11
R11 corrected: 23
R10 already processed overlap: 4
```

### R09A corrected

```text
S-211, S-213, S-223, S-229
```

### R09B corrected

```text
S-202, S-203, S-205, S-208, S-214, S-217, S-225, S-228, S-230, S-231, S-232, S-234, S-235
```

### R09C corrected

```text
S-196, S-199, S-201, S-209, S-210, S-215, S-218, S-220, S-222, S-226, S-227
```

### R11 corrected

```text
S-224, S-233, S-236, S-238, S-239, S-242, S-243, S-244, S-245, S-247, S-248, S-249, S-250, S-251, S-252, S-253, S-254, S-255, S-256, S-257, S-258, S-259, S-260
```

---

## New batch-size rule

```text
Default transcript batch: 30-80 images.
Can be larger if one logical block requires it.
One archive may contain multiple region files.
Do not mix different regions into one region file.
Before transcript, local visual/semantic recheck can override nearest-label grouping.
```

---

## Recommended next transcript batch

```text
Total: 41 images
```

Files:

```text
regions/R05-v003-infinite-query-correction.md
regions/R09A-cache-remove-reset.md
regions/R09B-network-offline.md
regions/R09C-validation-resumePaused.md
```

Why:

```text
This gives a 30-80 image batch, fixes the false R09A assignments first, and keeps region boundaries separate.
```

R11 should remain after that as a separate mutation-focused batch unless local review shows it needs splitting.
