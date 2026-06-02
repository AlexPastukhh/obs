# Current Source of Truth - React Query rquery

Generated: 2026-06-02 12:26:47 UTC

## Current policy

Do not use old Stage2 as source of truth. Do not treat the review ledger as source of truth.

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

## Current correction / closure status

```text
Stage5d S261-S383 closure audit v001: completed
Stage6a S384-S537 boundary review: active candidate split, not processed
```

## Current processing target

```text
Stage6a boundary candidates: 154
Next transcript attempt: Stage6b = R16 + R17 + R18 + R19
```
