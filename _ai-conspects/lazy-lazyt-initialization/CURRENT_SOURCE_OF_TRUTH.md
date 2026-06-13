# Current Source of Truth - Lazy LazyT Initialization

Generated: 2026-06-13 08:19:37 UTC

## Current policy

Do not treat the review ledger as source of truth.

A region is complete only when its region file contains coverage / boundary review, included sources, candidate checks, excluded/reassigned candidates, open issues, and verified source transcript or correction addendum.

For small conspects, one transcript pass may process all Stage0 groups, then closure audit.

## Big archive apply workflow

```text
Expand archive.
git add -A -- <target>
Review staged file list/status.
Commit only after staged file review.
Never use git add . when unrelated files are modified.
```

## No-placeholder-processed rule

```text
If visible transcript has OCR timeout/error, image missing, empty text, or placeholder text,
the source stays pending and must not be marked processed.
```

## Current status

```text
Lazy LazyT Initialization Stage0 boundary review v001: completed
Image uses inventoried: 38
Processed sources: 0
Pending candidates: 38
```

## Current processing target

```text
Next: LAZY-stage1 transcript = all candidate groups
Expected count: 38 images
```
