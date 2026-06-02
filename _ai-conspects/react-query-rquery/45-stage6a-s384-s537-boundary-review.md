# Stage 6a - S384-S537 Boundary Review v001

Generated: 2026-06-02 12:26:47 UTC

## Direction check

Goal:
Start the next large logical block after Stage5 closure.

Done:
Stage5 `S-261..S-383` is closed.

This step:
Boundary-review the next unreviewed section:

```text
S-384..S-537
Total: 154 images
```

Why:
This is a 154-image mixed section. It includes error boundaries, useTransition, query key factories, testing/MSW, select/performance, offline/cache tails, and dense lower-grid cards. Transcript first would risk mixing regions.

Next:
Commit this boundary review, then process transcript groups in separate region files.

---

## Boundary groups

```text
R16 error boundary / throwOnError / reset: 13
R17 useTransition / pagination pending UI: 8
R18 query key factories / global config: 5
R19 testing / MSW: 9
R20 select / performance / structural sharing: 18
R21 offline/cache tail: 59
R22 step comparison / best practices: 7
R23 dense lower-grid visual split needed: 35
```

## Important

```text
This archive does not add transcripts.
This archive does not mark any source as processed.
All decisions are candidate-only and must be rechecked before region close.
```

## Recommended next transcript passes

```text
Stage6b:
R16 + R17 + R18 + R19
Count: 35

Stage6c:
R20 + R22
Count: 25

Stage6d:
R21 + R23
Count: 94
```

## Contact sheets

```text
audit-assets/Stage6a-S384-S537-all-candidates-contact-sheet.png
audit-assets/Stage6a-R16-error-boundary-throwonerror-reset-contact-sheet.png
audit-assets/Stage6a-R17-useTransition-urgent-nonurgent-pagination-contact-sheet.png
audit-assets/Stage6a-R18-query-key-factories-global-config-contact-sheet.png
audit-assets/Stage6a-R19-testing-msw-contact-sheet.png
audit-assets/Stage6a-R20-select-performance-structural-sharing-contact-sheet.png
audit-assets/Stage6a-R21-offline-cache-tail-contact-sheet.png
audit-assets/Stage6a-R22-step-comparison-best-practices-contact-sheet.png
audit-assets/Stage6a-R23-dense-lower-grid-needs-visual-split-contact-sheet.png
```
