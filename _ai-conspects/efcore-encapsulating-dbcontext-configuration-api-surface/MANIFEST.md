# MANIFEST - EF Core encapsulating DbContext stage0 boundary review v001

Archive type: **source check / boundary review**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-02 16:45:00 UTC

## Done

- Started new conspect folder: `_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/`.
- Parsed uploaded `encapsulating dbcontext.svg`.
- Extracted embedded images.
- Created image-use inventory, labels, duplicate-use list, ledger, region split plan, contact sheets, and canvas map.

## Counts

```text
unique embedded images: 13
image uses on canvas: 13
text labels parsed: 4
duplicate image uses by extracted file/content: 0
```

## Candidate regions

```text
R01: 7 images -> DbContext configuration / Program.cs leakage / sensitive logging / options move
R02: 6 images -> reduced DbContext API surface / options wrapper / encapsulated configuration
```

## Files included / updated

```text
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/00-source-check-and-boundary-review.md
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/source/encapsulating-dbcontext.svg
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/source/images/*.png
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/data/embedded-images-stage0.json
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/data/image-uses-stage0.*
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/data/svg-labels-stage0.*
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/data/duplicate-image-uses-stage0.*
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/data/region-split-plan-stage0.*
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/data/source-summary-stage0.json
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/data/image-review-ledger-v001.*
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/audit-assets/contact-sheet-*.png
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/audit-assets/canvas-map-labels-and-image-boxes-stage0.png
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/MANIFEST.md
_ai-conspects/efcore-encapsulating-dbcontext-configuration-api-surface/APPLY_ARCHIVE.md
```

## Next

Transcript pass after boundary review. Suggested: full R01+R02 pass with final coverage audit if coherent.
