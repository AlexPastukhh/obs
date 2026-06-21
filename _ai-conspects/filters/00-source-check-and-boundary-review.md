# Stage0 - ASP.NET Core filters source check and boundary review v001

Generated: 2026-06-02 12:45:00 UTC

## Direction check

Goal:
Convert the uploaded `filters.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots.

Now:
This archive only creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse `filters.svg`, extract embedded PNGs, collect image-use coordinates/text labels, create contact sheets, initial region split plan, duplicate-use list, and coverage ledger.

Why:
Before transcript passes, we need image inventory and candidate boundaries so large passes can process 60-100+ images without losing/duplicating screenshots.

Next:
Start transcript pass after boundary review. Suggested first pass: `R01` (93 images). Then `R02+R03` final pass (38 images) if coherent.

---

## Counts

```text
unique embedded images: 127
image uses on canvas: 131
text labels parsed: 41
duplicate image uses by extracted file: 4
```

## Candidate regions

| Region | Candidate images | Meaning |
|---|---:|---|
| R01 | 93 | overview/filter pipeline/filter ordering/exception filters/DI/IFilterFactory/status-code/content negotiation |
| R02 | 27 | concrete MVC filter type examples: authorization/resource/action/exception/result/endpoint filters |
| R03 | 11 | lower addendum / main-sheet tail / middleware-before-filters reminder |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates before marking a region done.
```

## Suggested batching

```text
Pass 1: R01 = 93 images.
Meaning: upper/main theory map: filters vs middleware, async filters, ordering, exception filters, handled exceptions, DI/global filters, TypeFilter/ServiceFilter, IFilterFactory, content negotiation/status-code pages.

Pass 2: R02+R03 = 38 images.
Meaning: concrete filter examples plus lower addendum/middleware-before-filters tail, with final coverage audit if coherent.
```
