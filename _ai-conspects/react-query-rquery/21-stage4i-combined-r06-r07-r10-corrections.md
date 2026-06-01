# Stage 4i - Combined R06/R07/R10 Corrections v002

Generated: 2026-06-01 22:09:03 UTC

## Direction check

Goal:
Close remaining known correction items from Stage4g audit without leaving mixed ledger statuses.

Now:
R01 and R05 have already been corrected. Stage4i v001 added the right content, but left old R06/R07 ledger rows mixed as `processed v001 / must recheck`.

This step:
Reissue combined corrections as v002 with ledger consistency normalization.

Why:
The transcript corrections are valid, but the ledger should not continue to contradict the corrected region status.

## Corrections included

```text
R06 v002:
- add S-176
- confirm S-132/S-146/S-162/S-171/S-180 are R07, not R06
- normalize old R06 included sources to processed-in-r06-v002

R07 v004:
- add S-184/S-186
- normalize old R07 included sources to processed-in-r07-v004
- reserve S-124/S-138/S-144/S-154/S-164/S-173 for future R08 QueryClient/methods

R10 v006:
- add S-240/S-241
- record duplicate-use S-237/S-246
```

## Next

After applying and committing this archive:

```text
Proceed to new region processing, likely R08 QueryClient/methods, using boundary review first.
```
