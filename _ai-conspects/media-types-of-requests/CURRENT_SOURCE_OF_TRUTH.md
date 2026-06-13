# Current Source of Truth - Media Types Of Requests

Generated: 2026-06-13 08:09:17 UTC

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
Media Types Of Requests Stage0 boundary review v001: completed
Media Types Of Requests Stage1 R01/R02 transcript v001: completed
Media Types Of Requests Stage2 R03/R04 transcript v001: completed
Media Types Of Requests closure audit v001: completed
Image uses inventoried: 49
Stage1 processed: 24
Stage2 processed: 25
Pending candidates: 0
Bad placeholder/OCR-error processed rows: 0
```

## Current processing target

```text
Media Types Of Requests: closed by source coverage
Next: no further Media Types Of Requests transcript work unless precision patch or repeat-material layer is requested.
```
