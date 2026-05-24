# Export Format Guide

Status: planning draft

This guide describes how to export Excalidraw drawings for AI-assisted note processing and question creation.

## Recommendation

Best default:

```text
Full SVG export
+ optional PNG crops for important regions
```

## SVG

Use SVG as the default when asking AI to understand a full Excalidraw drawing and create questions.

Why:

```text
- scalable;
- better for large canvases;
- may preserve text as text;
- preserves layout and positions better than flat raster images;
- can include embedded pasted images.
```

Limitations:

```text
- very large SVGs can still be hard to inspect at once;
- screenshots inside the drawing may need additional cropped PNGs;
- raw visual meaning can still be ambiguous without user context.
```

## PNG

Use PNG for crops or focused regions.

Good for:

```text
- one specific region;
- screenshots inside the canvas;
- when full SVG is too large or hard to read;
- when layout or visual appearance matters more than text extraction.
```

Limitations:

```text
- full giant canvas PNG can make text too small;
- less searchable / less structured than SVG.
```

## PDF

PDF is not the first choice for this workflow.

Use PDF only when:

```text
- it is already exported;
- a multi-page/print form is useful;
- SVG/PNG is not practical.
```

For one huge Excalidraw canvas, PDF may crop or scale strangely.

## Practical workflow

```text
1. Export full drawing as SVG.
2. If there are dense or important areas, also export/crop those areas as PNG.
3. Give AI context: raw day date, area, and what kind of questions you want.
4. AI creates topic/question candidates and points out unclear parts.
```

## What AI should produce from drawing

```text
- possible topic notes;
- possible area-day note entries;
- question note drafts;
- unclear parts/questions for the user;
- weak/repeat focus candidates.
```
