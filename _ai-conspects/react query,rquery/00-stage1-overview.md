# Stage 1 Overview — React Query / rquery

This file is the first processing pass for the Excalidraw conspect.

## Goal of Stage 1

Create a **canvas-wide text map** and **region index** from the SVG layout so future stages know where each topic lives in the full visual conspect.

This stage intentionally does not read/transcribe embedded screenshots.

## Source-preserving meaning

This is not a polished React Query summary. It is a spatial/navigation layer based on visible SVG text labels.

## High-level canvas facts

| Item | Value |
|---|---:|
| SVG viewBox | `0 0 19625.584358777203 47665.01587514815` |
| Canvas width | `19625.58` |
| Canvas height | `47665.02` |
| Extracted text label groups | `127` |
| Embedded image uses | `537` |
| Unique embedded image symbols | `507` |

## Main outputs

1. `01-canvas-wide-map.md` — visual/global map of the full sheet.
2. `02-region-index.md` — region IDs, names, approximate canvas locations, and nearby labels.
3. `03-svg-label-inventory.md` — source label inventory sorted by vertical position.
4. `data/svg-labels-stage1.csv` — machine-readable label inventory.
5. `data/svg-image-uses-stage1.csv` — machine-readable image-use inventory; no image content transcription yet.

## Stage 1 limitations

- Region boundaries are approximate.
- Labels are extracted from SVG text elements and may preserve typos/shorthand.
- Screenshots are counted and located, but not OCR/transcribed.
- Some labels may be assigned to `UNASSIGNED` if they fall outside manually defined Stage-1 regions.
- Later stages should refine region boundaries after screenshot mapping.


---

## Stage 1 rule for large conspects

For a large Excalidraw conspect, Stage 1 should remain small and structural.

Stage 1 should produce:

1. a canvas-wide map;
2. a region index;
3. SVG label inventory;
4. image-use inventory;
5. a plan for where future transcriptions should live.

Stage 1 should **not** produce:

- full screenshot transcripts;
- cleaned per-region notes;
- generated study questions;
- final explanations;
- AI-added topic summaries.

Reason:

```text
Large visual conspects must be processed in passes.
If Stage 1 tries to do everything, source evidence, layout mapping, and interpretation become mixed.
```

## Where future transcription files belong

The actual source-preserving text transcriptions should be written to:

```text
_ai-conspects/react query,rquery/regions/*.md
```

Each region file should contain:

```text
You are here
Original labels
Screenshot inventory
Exact screenshot transcript
Exact visible code
Unclear/cut-off markers
Cleaned source notes
Minimal interpretation
Evidence table
Question hooks
```

Example:

```text
_ai-conspects/react query,rquery/regions/R10-mutations.md
```

This Stage 1 archive only prepares the navigation layer needed to create those region files later.
