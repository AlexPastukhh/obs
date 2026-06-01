# MANIFEST - React Query Stage2 replacement v002

Archive type: **workflow cleanup / mapping replacement**  
Generated: 2026-06-01 21:14:24 UTC

## Direction check

Goal:
Stop using Stage2 as source of truth and avoid creating a new false source of truth.

Now:
R01 exposed that old Stage2 boundaries are wrong.

This step:
Replace Stage2 with a review ledger that is explicitly provisional.

Why:
The ledger prevents image loss, but every region still requires fresh visual/semantic boundary review.

Next:
Create R01 v002 using full boundary review.

## Files included

```text
_ai-conspects/SOURCE_OF_TRUTH_POLICY.md
_ai-conspects/IMAGE_COVERAGE_AND_REGION_WORKFLOW.md
_ai-conspects/PARALLEL_CHAT_PROMPT_NO_IMAGE_LOSS_ADDENDUM.md
_ai-conspects/react-query-rquery/STAGE2_DEPRECATED.md
_ai-conspects/react-query-rquery/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/react-query-rquery/18-stage4f-stage2-replacement.md
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.csv
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.json
_ai-conspects/react-query-rquery/data/R01-boundary-review-candidates-v2.csv
_ai-conspects/react-query-rquery/data/R01-boundary-review-candidates-v2.json
_ai-conspects/react-query-rquery/MANIFEST-stage2-replacement-v002.md
_ai-conspects/react-query-rquery/APPLY_STAGE2_REPLACEMENT.md
```
