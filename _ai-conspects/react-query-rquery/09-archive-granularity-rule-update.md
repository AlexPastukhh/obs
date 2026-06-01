# Archive Granularity and Review Commands Rule Update

This project should not use one user-facing archive per small screenshot batch.

## Correct granularity

Use these archive scopes:

```text
protocol update: one archive
stage map/index: one archive
screenshot mapping: one archive
one full region transcript draft: one archive
one full region consolidation/correction: one archive
whole-conspect final assembly: one archive
```

## Incorrect default granularity

Do not default to:

```text
one archive per 8-10 screenshots
one archive per tiny verification batch
one archive per minor overlay
```

Small internal batches are allowed while working, but the delivered archive should normally be per region.

## OCR draft quality rule

Do not put corrupted OCR/mojibake text into the main readable region transcript.

If OCR text contains corrupted sequences, broken quotes, broken dashes, garbled bullet characters, or visibly broken code fragments, keep it out of the main transcript and mark the source as pending visual verification.

Keep exact screenshot transcript only when it is visually checked or when uncertainty is clearly marked.

## Review commands rule

Do not print long diffs line-by-line in the console by default.

Use clipboard-first commands:

```powershell
git diff --stat -- _ai-conspects/react-query-rquery
git --no-pager diff -- _ai-conspects/react-query-rquery | Set-Clipboard
```

Optional file export:

```powershell
git --no-pager diff -- _ai-conspects/react-query-rquery > C:\Users\alexa\Downloads\ai-conspects-last-diff.patch
```

The assistant should include clipboard diff commands in future `APPLY_ARCHIVE.md` files.

Do not include plain full-diff commands such as:

```powershell
git diff -- _ai-conspects/react-query-rquery
```

because they can open a pager and force the user to quit with `q`.
