# Export Conspect For AI Processing Workflow

Status: active workflow.

Use when the user wants to process an Excalidraw/visual conspect with AI, create repeat material, or create question candidates from visual/source material.

## Goal

Prepare source material so AI can inspect it reliably and produce useful repeat material, topic candidates, question drafts, unclear-part questions and weak/repeat focus candidates.

## Required Reads

```text
-Repetition/Question Creation Principles.md
-Repetition/Workflows/Create Repeat Material From Conspect Workflow.md
-Repetition/Templates/Repeat Material Template.md
-Repetition/Templates/Question Note Template.md
```

## Recommended Source Format

Best default:

```text
Full SVG export
+ optional PNG crops for important/dense regions
```

## Format Choice

| Format | Use when | Notes |
|---|---|---|
| SVG | default for full Excalidraw drawing / large visual conspect | scalable, preserves layout, may preserve text and embedded images |
| PNG crop | focused region, dense area, screenshot inside canvas, visual detail | better for one specific region |
| PDF | only when already exported or SVG/PNG is not practical | not first choice for one huge canvas; can crop/scale strangely |

## Algorithm

```text
1. Identify source context:
   - raw day date;
   - area/topic if known;
   - source file/export format;
   - desired output: questions, repeat material, topic candidates, lookup entries, or all.

2. Prefer full SVG export for whole-canvas understanding.

3. Add PNG crops for:
   - dense/important regions;
   - embedded screenshots;
   - areas where text/layout is hard to inspect from full SVG.

4. Use PDF only if:
   - it is already exported;
   - multi-page/print form is useful;
   - SVG/PNG is not practical.

5. Ask user for missing context if source meaning is ambiguous.

6. Inspect source and produce:
   - possible topic notes;
   - possible area-day note entries;
   - question note drafts;
   - unclear parts/questions for the user;
   - weak/repeat focus candidates;
   - visual anchors.

7. Hand off to:
   - Create Repeat Material From Conspect Workflow, if producing repeat material;
   - Question Creation Principles, if producing/improving questions.
```

## Output Shape

```text
Source received:
- ...

Format used:
- SVG / PNG crop / PDF / markdown / mixed

AI-readable enough?
- yes / partially / no

Detected topics:
- ...

Visual anchors:
- ...

Question candidates:
- ...

Unclear parts:
- ...

Recommended next action:
- create repeat material / ask user / export more crops / update question note / update locator
```

## Do Not

```text
- Do not treat ambiguous visual interpretation as confirmed source truth.
- Do not discard the visual/source conspect after creating questions.
- Do not use PDF as first choice for one huge Excalidraw canvas unless needed.
- Do not paste long source fragments into schedules.
```
