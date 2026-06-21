# Stage0 - cancellation,async source check and boundary review v001

Generated: 2026-06-22 UTC

## Source/folder naming

```text
Uploaded SVG: cancellation,async(1).svg
Conspect folder: _ai-conspects/cancellation,async
```

The technical upload suffix `(1)` is excluded from the conspect name.

## Source form

This SVG contains vector paths and text, but no embedded raster screenshots/images.
The readable source is therefore the original SVG plus rendered canvas/region overviews and the extracted text-label inventory.

## Counts

```text
unique embedded images: 0
image uses on canvas: 0
text labels parsed: 37
vector paths: 12
vector groups: 38
```

## Candidate regions

| Region | Labels | Name | Meaning |
|---|---:|---|---|
| R01 | 23 | linked-token-source-disconnect-propagation | linked token sources, request disconnect/external API cancellation and propagation/bubbling |
| R02 | 6 | cpu-bound-manual-cancellation-checks | CPU-bound cancellation loops and ThrowIfCancellationRequested placement |
| R03 | 8 | async-cancellation-exceptions | async exception behavior, TaskCanceledException and OperationCanceledException distinctions |

## Rule

Candidate regions and label ledgers are checklists, not final semantic truth. A transcript pass must re-check the rendered source and nearby/parallel areas before completion.

## Next

Start the transcript/final-coverage pass after this ten-conspect stage0 bundle is committed.

Internal source path: `source/source.svg` (original uploaded filename is recorded above).
