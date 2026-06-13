# Current Source of Truth - EF Core General

Generated: 2026-06-13 05:40:30 UTC

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

## Batch-size rule

```text
Default transcript batch: 80-160 images.
Can be larger if one logical block requires it.
Use one archive with multiple region files when themes differ.
Do not mix different regions into one region file.
Local visual/semantic recheck can override nearest-label grouping before transcript.
```

## No-placeholder-processed rule

```text
If visible transcript has OCR timeout/error, image missing, empty text, or placeholder text,
the source stays pending and must not be marked processed.
```

## Transcript precision policy

```text
Stage1/Stage2 transcript level: source-level semantic transcript.
For exact C# punctuation, use preserved Stage0 source PNGs.
Precision patches can upgrade individual sources to verbatim code later.
```

## Current status

```text
EF Core General Stage0 boundary review v001: completed
EF Core General Stage1 R01-R03 transcript v001: completed
EF Core General Stage2 R04-R05 transcript v001: completed
Image uses inventoried: 65
Stage1 processed: 54
Stage2 processed: 11
Pending candidates: 0
```

## Current processing target

```text
Next: EF Core General closure audit
Expected count: 65 / 65
```
