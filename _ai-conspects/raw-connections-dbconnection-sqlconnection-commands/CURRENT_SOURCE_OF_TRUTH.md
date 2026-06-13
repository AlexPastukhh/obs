# Current Source of Truth - Raw Connections DbConnection SqlConnection Commands

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
Raw Connections DbConnection SqlConnection Commands Stage0 boundary review v001: completed
Image uses inventoried: 36
Processed sources: 0
Pending candidates: 36
```

## Current processing target

```text
Next: RAWCONN-stage1 transcript = all candidate groups
Expected count: 36 images
```
