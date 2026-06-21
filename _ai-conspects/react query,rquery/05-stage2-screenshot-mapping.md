# Stage 2 — Screenshot Mapping

Conspect: `react query,rquery`  
Stage: **2 / screenshot mapping only**  
Generated: 2026-05-31 23:07:20 UTC

This stage maps embedded image uses from the SVG to the region structure created in Stage 1.

It does **not** read or transcribe screenshot content.

---

## Inputs used

- `_ai-conspects/react query,rquery/data/svg-labels-stage1.csv`
- `_ai-conspects/react query,rquery/data/svg-image-uses-stage1.csv`
- `_ai-conspects/react query,rquery/02-region-index.md`

The original `full.svg` had already been processed into Stage 1 CSV inventories.

---

## Outputs added

- `05-stage2-screenshot-mapping.md`
- `screenshots/inventory.md`
- `screenshots/by-region/*.md`
- `data/screenshot-inventory-stage2.csv`
- `data/screenshot-inventory-stage2.json`
- `data/screenshot-region-summary-stage2.csv`
- `regions/README.md`

---

## Counts

- Total embedded SVG image uses mapped: **537**
- Total Stage 1 regions with image uses: **18**
- Unassigned image uses: **174**

---

## Important limitation

This pass maps images by SVG layout and Stage 1 region assignment. It does not yet merge every image with the copied `images/...` filename from `image-index.csv`.

The stable key for later matching is:

```text
fileId
```

Future passes can use `fileId` to match:

```text
SVG image use → image-index.csv row → images/<number>__<fileId-short>__<original-name>.png
```

If image-index mapping is available in a later pass, add columns:

```text
image_index_number
copied_image_path
original_wikilink
target_name
```

---

## Next recommended stage

Stage 3 should create the first real region transcription file, for example:

```text
_ai-conspects/react query,rquery/regions/R10-mutations.md
```

Stage 3 should open/read the original screenshots for that region and write:

- exact visible text;
- exact visible code;
- cut-off/unclear markers;
- cleaned source notes;
- minimal interpretation;
- evidence table;
- question hooks.
