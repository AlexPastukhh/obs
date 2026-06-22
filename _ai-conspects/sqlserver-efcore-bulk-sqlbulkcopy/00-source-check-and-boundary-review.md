# Stage0 - SQL Server / EF Core / SqlBulkCopy source check and boundary review v001

Generated: 2026-06-02 13:45:00 UTC

## Direction check

Goal:
Convert the uploaded `sqlserver-efcore-bulk-sqlbulkcopy.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots.

Now:
This archive only creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse the SVG, extract embedded PNGs, collect image-use coordinates/text labels, create contact sheets, initial region split plan, duplicate-use list, and coverage ledger.

Why:
Before transcript passes, we need image inventory and candidate boundaries so large passes can process 60-100+ images without losing/duplicating screenshots.

Next:
Start transcript pass after boundary review. Suggested first pass: `R01` (74 images). Then `R02+R03` final/lower pass (64 images) if coherent.

---

## Counts

```text
unique embedded images: 138
image uses on canvas: 138
text labels parsed: 94
duplicate image uses by extracted file/content: 0
```

## Candidate regions

| Region | Candidate images | Meaning |
|---|---:|---|
| R01 | 74 | core SqlBulkCopy API/options/source-data/type-mapping/internal transaction road |
| R02 | 46 | staging/performance/cleanup/transaction-log/failed-row handling road |
| R03 | 18 | IDataReader/custom reader/validation/retry/tradeoff road |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates before marking a region done.
```

## Suggested batching

```text
Pass 1: R01 = 74 images.
Meaning: upper/main SqlBulkCopy API road: constructors, WriteToServer, source data options, column mappings, bulk copy options, type/null/default/identity behavior, internal transaction notes.

Pass 2: R02+R03 = 64 images.
Meaning: staging/performance/cleanup plus custom reader/validation/retry tradeoff tail, with final coverage audit if coherent.
```
