# Stage 1 and Future Transcription Layout

Conspect: `react query,rquery`  
Stage: `1 / layout-only`  
Archive version: `v002`

This file explains how Stage 1 should be used for a large visual Excalidraw conspect and where future source-preserving transcriptions should be placed.

---

## 1. Why Stage 1 exists

For a large Excalidraw conspect, the first pass should not attempt to transcribe every screenshot.

Stage 1 exists to answer:

```text
Where are the major topics?
Where are the labels?
Where are the embedded screenshots?
How should later passes navigate the canvas?
Where should final text transcriptions be written?
```

Stage 1 is therefore a **map + index + inventory** pass.

It is not the final text version of the conspect.

---

## 2. When this rule matters

Use this split-stage workflow when the conspect is large, for example when:

- the SVG is a large vertical or wide sheet;
- the canvas contains many embedded screenshots;
- there are many small labels;
- visual/spatial memory matters;
- questions should later refer to where a concept appears in the whole sheet;
- the AI needs to preserve source evidence and avoid mixing OCR/transcription with interpretation.

For small conspects, Stage 1 and transcription may be combined, but for this React Query sheet they should remain separate.

---

## 3. What Stage 1 should contain

Stage 1 should contain:

```text
00-stage1-overview.md
01-canvas-wide-map.md
02-region-index.md
03-svg-label-inventory.md
data/svg-labels-stage1.csv
data/svg-image-uses-stage1.csv
```

These files are navigation and source-inventory files.

They help future passes find:

- region boundaries;
- nearby labels;
- source coordinates;
- image positions;
- likely screenshot groups;
- global canvas order.

---

## 4. What Stage 1 should not contain

Stage 1 should not contain full region transcriptions.

Do not put the following into Stage 1 map/index files:

- full screenshot OCR;
- long code transcription from screenshots;
- polished teaching notes;
- final question decks;
- large AI-generated explanations;
- unsourced general knowledge.

Reason:

```text
Map files should stay lightweight.
The exact source transcript belongs in region files.
```

---

## 5. Where full text transcriptions should live

All source-preserving text transcriptions should live under:

```text
_ai-conspects/react-query-rquery/regions/
```

Recommended future files:

```text
_ai-conspects/react-query-rquery/regions/R01-query-basics.md
_ai-conspects/react-query-rquery/regions/R02-staleness-refetch.md
_ai-conspects/react-query-rquery/regions/R03-notify-select-side-notes.md
_ai-conspects/react-query-rquery/regions/R04-pagination-infinite-query.md
_ai-conspects/react-query-rquery/regions/R05-query-composition.md
_ai-conspects/react-query-rquery/regions/R06-prefetch-initial-placeholder.md
_ai-conspects/react-query-rquery/regions/R07-queryclient-methods.md
_ai-conspects/react-query-rquery/regions/R08-offline-network-validation.md
_ai-conspects/react-query-rquery/regions/R10-mutations.md
_ai-conspects/react-query-rquery/regions/R11-websockets-suspense-enabled.md
_ai-conspects/react-query-rquery/regions/R12-persistence-hydration.md
_ai-conspects/react-query-rquery/regions/R13-cancellation-error-handling.md
_ai-conspects/react-query-rquery/regions/R15-testing-config-key-factories.md
_ai-conspects/react-query-rquery/regions/R16-performance-select.md
```

The region numbering should follow `02-region-index.md`.

If later review changes region boundaries, update the region index and keep old IDs documented in the manifest.

---

## 6. Recommended structure of a region transcription file

Each region file should follow this structure:

```md
# R10 — Mutations

## 0. You are here

Conspect: `react query,rquery`
Current region: `R10 — Mutations`
Canvas position: middle-lower part of the full sheet

Previous nearby regions:
- QueryClient methods
- cache control
- offline / network mode

Next nearby regions:
- Websockets / suspense
- persistence / hydration
- cancellation / error handling

## 1. Original Excalidraw labels

```text
[labels exactly as visible in the SVG]
```

## 2. Screenshot inventory

| Source ID | Image use ID | fileId | Filename | Nearby label | Read status | Confidence |
|---|---|---|---|---|---|---|

## 3. Source transcript

### S-155 — filename

Metadata:
- Source type: screenshot
- Region: R10
- Visual block: ...
- Readability: high / medium / low
- Cut off: yes / no
- Confidence: high / medium / low

#### Exact visible text

```text
[transcribe visible text exactly]
```

#### Exact visible code

```ts
[transcribe visible code exactly]
```

#### Unclear / cut off

```text
[unclear]
[cut off below]
```

## 4. Cleaned source notes

Only cleaned/normalized version of what is actually in the source transcript.

## 5. Minimal interpretation

Clearly marked interpretation based only on the source.

## 6. Evidence table

| Claim | Evidence | Source type | Confidence |
|---|---|---|---|

## 7. Question hooks

Draft hooks for later repetition questions.
```

---

## 7. Difference between map files and region files

Map/index files answer:

```text
Where is this topic in the whole canvas?
What labels/images are near it?
What should be processed next?
```

Region transcription files answer:

```text
What exactly is visible in this part of the conspect?
What is the cleaned version of that source content?
Which screenshot/label supports each claim?
What questions can be generated from it later?
```

Do not merge these purposes.

---

## 8. Recommended later stages

### Stage 2 — screenshot mapping

Goal:

```text
Map embedded image uses from full.svg to image-index.csv/md and assign screenshots to regions.
```

Output:

```text
_ai-conspects/react-query-rquery/data/screenshot-inventory.json
_ai-conspects/react-query-rquery/screenshots/inventory.md
```

No full transcription yet.

### Stage 3 — per-region source transcript

Goal:

```text
Create source-preserving region files under regions/*.md.
```

Start with one region, for example:

```text
regions/R10-mutations.md
```

### Stage 4 — cleaned source notes

Goal:

```text
Add cleaned notes to each region file while preserving original transcript.
```

### Stage 5 — evidence tables and question hooks

Goal:

```text
Add claim → evidence tables and question hooks.
```

### Stage 6 — repetition question generation

Goal:

```text
Generate actual repetition questions from completed region files.
```

Questions should refer to region context:

```text
Conspect → Region → Visual position → Source screenshot/label
```

---

## 9. Key rule

For this project:

```text
Stage 1 = global navigation and inventory.
regions/*.md = actual text transcription.
questions/*.md = generated repetition material.
```

If a future chat is unsure where to put something:

- canvas/global maps → root files like `01-canvas-wide-map.md`;
- exact screenshot/label transcript → `regions/Rxx-name.md`;
- generated questions → `questions/`;
- machine-readable coordinates/mappings → `data/`.
