# Current Source of Truth - Working With Bytes Streams

Generated: 2026-06-13 07:17:47 UTC

## Current policy

Do not treat the review ledger as source of truth.

A region is complete only when its region file contains coverage / boundary review, included sources, candidate checks, excluded/reassigned candidates, open issues, and verified source transcript or correction addendum.

For large split regions, add a closure audit after the last sub-pass.

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
Working With Bytes Streams Stage0 boundary review v001: completed
Image uses inventoried: 38
Processed sources: 0
Pending candidates: 38
```

## Current processing target

```text
Next: WorkingWithBytesStreams-stage1 transcript = R01 + R02
Expected count: 24 images
```
