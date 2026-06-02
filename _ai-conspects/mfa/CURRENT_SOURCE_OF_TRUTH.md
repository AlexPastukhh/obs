# Current Source of Truth - MFA

Generated: 2026-06-02 16:01:53 UTC

## Current policy

Do not treat the review ledger as source of truth.

A region is complete only when its region file contains coverage / boundary review, included sources, candidate checks, excluded/reassigned candidates, open issues, and verified source transcript or correction addendum.

For large split regions, add a closure audit after the last sub-pass.

## Big archive diff workflow

```text
Expand archive.
git add -A -- <target>
Review git diff --cached --stat / --name-status / full cached diff.
Commit only after cached diff review.
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

## Current status

```text
MFA Stage0 boundary review v001: completed
MFA Stage1 R00-R04 transcript v001: completed
Image uses inventoried: 91
Stage1 processed: 53
Pending candidates: 38
```

## Current processing target

```text
Next: MFA-stage2 transcript = R05 + R06 + R07
Expected count: 38 images
```
