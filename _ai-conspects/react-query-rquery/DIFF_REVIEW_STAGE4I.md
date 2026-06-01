# Diff Review - Stage4i Combined Corrections v002

Generated: 2026-06-01 22:09:03 UTC

## What to check

```text
1. R06 file has addendum for S-176.
2. R07 file has addendum for S-184/S-186.
3. R10 file has addendum for S-240/S-241 and duplicate-use S-237/S-246.
4. Ledger no longer leaves old R06/R07 included sources as processed v001 / must recheck.
5. R08 candidates remain reserved/pending, not finalized as R07.
```

## Expected ledger normalization

```text
R06 old included sources:
S-126, S-128, S-130, S-140, S-142, S-145, S-150, S-157, S-159, S-165
-> processed-in-r06-v002

R06 new:
S-176 -> processed-in-r06-v002

R07 old included sources:
S-117, S-120, S-131, S-132, S-146, S-152, S-162, S-163, S-171, S-172, S-180
-> processed-in-r07-v004

R07 new:
S-184, S-186 -> processed-in-r07-v004

R08 reserved:
S-124, S-138, S-144, S-154, S-164, S-173
-> checked-r07-neighbor-reserved-for-r08

R10:
S-240/S-241 -> processed-in-r10-v006
S-237/S-246 -> duplicate-use-recorded-in-r10-v006
```

## Diff command

```powershell
git --no-pager diff -- _ai-conspects/react-query-rquery > C:\Users\alexa\Downloads\ai-conspects-stage4i-combined-corrections.diff
Get-Content C:\Users\alexa\Downloads\ai-conspects-stage4i-combined-corrections.diff -Raw | Set-Clipboard
```
