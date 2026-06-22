# Current Source of Truth - EF Core General

Generated: 2026-06-22 UTC

## Current policy

Do not treat the review ledger as source of truth.

A region is complete only when its region file contains coverage / boundary review, included sources, candidate checks, excluded or reassigned candidates, open issues, and verified source transcript or correction addendum.

Screenshots are primary source. Labels alone do not close coverage.

## Source-repair finding

The original Stage0 inventory was generated from an incomplete SVG export.

A corrected source SVG was compared by Excalidraw image `fileId`.

```text
old unique image definitions: 64
old image uses: 65
old text groups: 132

corrected unique image definitions: 256
corrected image uses: 259
corrected text groups: 132

newly recovered unique images: 192
newly recovered image uses: 194
old unique images absent from corrected source: 0
```

## Current status

```text
Historical EF01-EF06 transcripts for the original 65 image uses: preserved
Historical closure audit: superseded by Stage16 source-completion correction
Stage16 source-completion correction v002: completed
Newly recovered image uses pending verified transcript: 194
Bad placeholder/OCR-error processed rows: 0
```

## Current processing target

```text
EF Core General is reopened.
Next: review and transcribe the 194 recovered image uses in coherent batches.
Do not redo already processed old image uses unless a direct contradiction is found.
```

## Apply workflow

```text
Extract archive with tar.exe.
git add -A -- <target>
Review staged file list/status.
Commit only after staged file review.
Never use git add . when unrelated files are modified.
```
