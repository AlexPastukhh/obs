# Current Source of Truth - Lazy LazyT Initialization

Generated: 2026-06-13 08:38:25 UTC

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

## Transcript precision policy

```text
Stage1 transcript level: source-level semantic transcript.
For exact code punctuation, use preserved Stage0 source PNGs.
Precision patches can upgrade individual sources to verbatim code later.
```

## Current status

```text
Lazy LazyT Initialization Stage0 boundary review v001: completed
Lazy LazyT Initialization Stage1 transcript v001: completed
Image uses inventoried: 38
Stage1 processed: 38
Pending candidates: 0
```

## Current processing target

```text
Next: closure audit
Expected count: 38 / 38
```
