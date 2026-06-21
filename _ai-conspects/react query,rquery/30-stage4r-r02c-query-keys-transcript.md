# Stage 4r - R02C Query Keys Transcript v001

Generated: 2026-06-01 23:39:24 UTC

## Direction check

Goal:
Finish the planned R02 transcript split.

Done:
R02A v002 and R02B v001 are completed.

This step:
Add R02C verified transcript for query keys, manual refetch, and declarative dependencies.

Why:
This closes the key/dependency sub-block: values used by queryFn belong in queryKey, and state changes should usually drive query changes through the key rather than manual refetch.

Next:
1. apply and review R02C;
2. commit;
3. run R02 closure audit.

## Files

```text
regions/R02C-query-keys-manual-refetch-declarative-dependencies.md
data/R02C-sources-stage4r-v001.csv
data/R02C-sources-stage4r-v001.json
data/R02C-boundary-review-stage4r-v001.csv
data/R02C-boundary-review-stage4r-v001.json
data/R02C-area-understanding-stage4r-v001.json
```
