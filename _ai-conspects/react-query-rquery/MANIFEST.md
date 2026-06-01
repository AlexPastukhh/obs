# MANIFEST - React Query rquery / R10 cleanup checkpoint v006

Archive type: **stage-3d cleanup checkpoint after completed region transcript**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-01 15:39:53 UTC

## Where we are on the path to the goal

Goal:

```text
Convert the visual Excalidraw React Query conspect into source-preserving AI-readable region files.
```

Current checkpoint:

```text
R10 - Mutations is the first completed region transcript.
```

Completed for R10:

```text
MUT-S001-MUT-S018: verified from standalone/original PNGs
MUT-S019-MUT-S036: verified from available sheet/crop images
Partial/cut-off sources are explicitly marked
OCR/mojibake draft text is not used as main transcript
```

This archive does not add a new transcription stage. It only cleans stale artifacts left from the older pending-verification workflow.

## Files included

```text
_ai-conspects/react-query-rquery/regions/R10-mutations.md
_ai-conspects/react-query-rquery/data/R10-mutations-sources.csv
_ai-conspects/react-query-rquery/data/R10-mutations-sources.json
_ai-conspects/react-query-rquery/data/R10-mutations-completion-v005.csv
_ai-conspects/react-query-rquery/data/R10-mutations-completion-v005.json
_ai-conspects/react-query-rquery/09-archive-granularity-rule-update.md
_ai-conspects/react-query-rquery/MANIFEST.md
_ai-conspects/react-query-rquery/APPLY_ARCHIVE.md
```

## Files intentionally removed by apply commands

```text
_ai-conspects/react-query-rquery/data/R10-mutations-pending-verification-v003.csv
_ai-conspects/react-query-rquery/data/R10-mutations-pending-verification-v003.json
```

Reason:

```text
They are stale after v005 because MUT-S019-MUT-S036 are no longer pending.
```

## Next meaningful step

Do not keep iterating on R10 unless reviewing the diff reveals errors.

Next useful project step:

```text
Start the next region transcript using the same per-region workflow.
```

Recommended options:

```text
R07 - QueryClient methods / filters
R06 - Prefetch / initialData / placeholderData
R04 - Pagination / infinite query
```
