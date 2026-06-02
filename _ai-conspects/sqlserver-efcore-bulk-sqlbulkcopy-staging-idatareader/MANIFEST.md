# MANIFEST - SQL Server / EF Core / SqlBulkCopy stage0 boundary review v001

Archive type: **source check / boundary review**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-02 13:45:00 UTC

## Done

- Started new conspect folder: `_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/`.
- Parsed uploaded `sqlserver,efcore, bulk,sqlbulkcopy.svg`.
- Extracted embedded images.
- Created image-use inventory, labels, duplicate-use list, ledger, region split plan, contact sheets, and canvas map.

## Counts

```text
unique embedded images: 138
image uses on canvas: 138
text labels parsed: 94
duplicate image uses by extracted file/content: 0
```

## Candidate regions

```text
R01: 74 images -> core SqlBulkCopy API/options/source-data/type-mapping/internal transaction road
R02: 46 images -> staging/performance/cleanup/transaction-log/failed-row handling road
R03: 18 images -> IDataReader/custom reader/validation/retry/tradeoff road
```

## Files included / updated

```text
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/00-source-check-and-boundary-review.md
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/source/sqlserver-efcore-bulk-sqlbulkcopy.svg
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/source/images/*.png
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/data/embedded-images-stage0.json
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/data/image-uses-stage0.*
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/data/svg-labels-stage0.*
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/data/duplicate-image-uses-stage0.*
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/data/region-split-plan-stage0.*
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/data/source-summary-stage0.json
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/data/image-review-ledger-v001.*
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/audit-assets/contact-sheet-*.png
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/audit-assets/canvas-map-labels-and-image-boxes-stage0.png
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/MANIFEST.md
_ai-conspects/sqlserver-efcore-bulk-sqlbulkcopy-staging-idatareader/APPLY_ARCHIVE.md
```

## Next

Transcript pass after boundary review. Suggested: R01 first, then R02+R03 with final coverage audit if coherent.
