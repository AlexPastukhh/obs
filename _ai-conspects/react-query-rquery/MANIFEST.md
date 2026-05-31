# Manifest — React Query / rquery — Stage 1

Archive type: **stage-1 canvas-wide map + region index**.

Version: `v002`.

Target branch: `ai-processed-conspects-text`  
Repository root: `C:\Users\alexa\obs`

## Stage status

This is **layout/source-inventory pass only**.

Done in this stage:

- inspected `full.svg` as the visual canvas source;
- extracted SVG viewBox / canvas dimensions;
- extracted Excalidraw text labels with coordinates;
- extracted embedded image use positions and fileIds, but did **not** transcribe screenshots;
- created a canvas-wide map;
- created a region index;
- created stage-1 label and image-use inventories.

Not done in this stage:

- no full screenshot transcription;
- no full code transcription from screenshots;
- no generated repetition questions;
- no source-level evidence tables per region;
- no cleaned notes per region except high-level map descriptions.

## Important note for large conspects

This conspect is large and screenshot-heavy. Therefore Stage 1 is intentionally a **navigation and inventory pass**, not a transcription pass.

For large conspects, Stage 1 should answer:

```text
What is the global canvas structure?
What are the major regions?
Where are the labels and embedded screenshots located?
Where should later transcription passes write their output?
```

Stage 1 should not attempt to transcribe all screenshot content because that would mix map-building with source transcription and make review harder.

## Where the real text transcriptions will live

Full source-preserving text transcriptions should be placed in:

```text
_ai-conspects/react-query-rquery/regions/
```

Example future files:

```text
_ai-conspects/react-query-rquery/regions/R01-query-basics.md
_ai-conspects/react-query-rquery/regions/R02-staleness-refetch.md
_ai-conspects/react-query-rquery/regions/R03-queryclient-prefetch.md
_ai-conspects/react-query-rquery/regions/R10-mutations.md
```

Map/index files such as `01-canvas-wide-map.md` and `02-region-index.md` are navigation layers only. They are not the final transcript.


## Source files used

- `/mnt/data/full.svg`
- derived local extraction: `/mnt/data/svg_text_items.csv` was available, but this archive includes a fresh stage-1 extraction with original multiline labels from SVG.

## SVG facts

- viewBox: `0 0 19625.584358777203 47665.01587514815`
- width: `19625.584358777203`
- height: `47665.01587514815`
- text label groups extracted: `127`
- embedded image symbols found: `507`
- image uses found: `537`

## Files generated

- `00-stage1-overview.md`
- `01-canvas-wide-map.md`
- `02-region-index.md`
- `03-svg-label-inventory.md`
- `data/svg-labels-stage1.csv`
- `data/svg-image-uses-stage1.csv`
- `APPLY_ARCHIVE.md`

## Next recommended stage

Stage 2 should map screenshots from `image-index.csv` / `image-index.md` to these regions, then pick one region for exact screenshot transcription.
