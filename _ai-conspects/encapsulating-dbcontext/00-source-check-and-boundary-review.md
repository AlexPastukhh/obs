# Stage0 - EF Core encapsulating DbContext source check and boundary review v001

Generated: 2026-06-02 16:45:00 UTC

## Direction check

Goal:
Convert the uploaded `encapsulating-dbcontext.svg` Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots.

Now:
This archive only creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse the SVG, extract embedded PNGs, collect image-use coordinates/text labels, create contact sheets, initial region split plan, duplicate-use list, and coverage ledger.

Why:
Before transcript passes, we need image inventory and candidate boundaries. This sheet is small, but the same source-preserving rules still apply: every image use must be inventoried and checked before transcript ownership is marked done.

Next:
Start transcript pass after boundary review. Since total image-use count is 13, the whole conspect can probably be closed in one transcript pass with final coverage audit if boundary review confirms coherence.

---

## Counts

```text
unique embedded images: 13
image uses on canvas: 13
text labels parsed: 4
duplicate image uses by extracted file/content: 0
```

## Candidate regions

| Region | Candidate images | Meaning |
|---|---:|---|
| R01 | 7 | DbContext configuration leaking into Program.cs / sensitive logging / moving options into DbContext |
| R02 | 6 | reduce DbContext API surface / hide EF Core configuration behind smaller options wrapper |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates before marking a region done.
```

## Suggested batching

```text
Pass 1: R01+R02 = 13 images.
Meaning: full small conspect in one transcript pass, with final coverage audit if boundary review confirms coherence.
```
