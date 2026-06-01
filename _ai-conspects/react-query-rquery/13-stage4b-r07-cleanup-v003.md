# Stage 4b - R07 Cleanup v003

Generated: 2026-06-01 17:44:15 UTC

## Direction check

Goal:
Keep R07 as a clean, trustworthy source-preserving region transcript.

Now:
R07 v002 adds area understanding, but the review diff showed a mojibake risk around Cyrillic text and older R07 scaffold artifacts may remain from Stage 4a.

This step:
Fix/normalize the S-163 Cyrillic text handling note and remove obsolete R07 scaffold files during apply.

Why:
The region should not carry corrupted-looking text or stale scaffold artifacts after becoming a transcript.

Next:
1. apply v003 over v002/uncommitted state;
2. review diff;
3. commit once if clean.

## Cleanup

This archive keeps the v002 transcript content and adds cleanup commands for obsolete Stage 4a files:

```text
_ai-conspects/react-query-rquery/data/R07-source-set-stage4a.json
_ai-conspects/react-query-rquery/data/R07-screenshot-inventory-stage4a.csv
_ai-conspects/react-query-rquery/10-stage4a-r07-next-region-kickoff.md
```
