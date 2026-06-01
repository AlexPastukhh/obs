# Processing Plan - BINDING SOURCE ATTRIBUTES

Generated: 2026-06-01 18:38:45 UTC

## Direction check

Goal:
Create source-preserving AI-readable text for `BINDING SOURCE ATTRIBUTES`.

Now:
Raw bundle is available and small.

This step:
Define how to process it without unnecessary archive proliferation.

Why:
The bundle has only 3 images, so one focused transcript archive should likely be enough after source check.

Next:
1. Read `full.svg` spatially.
2. Open all 3 images.
3. Create `regions/R01-binding-source-attributes.md`.

---

## Proposed structure

```text
_ai-conspects/binding-source-attributes/
  00-source-check.md
  01-processing-plan.md
  MANIFEST.md
  APPLY_ARCHIVE.md
  data/
    source-files-stage0.json
    image-index-stage0.csv
  regions/
    README.md
    R01-binding-source-attributes.md   # next archive
```

---

## Transcript rules for this conspect

1. Screenshots are primary content.
2. SVG and Excalidraw labels are layout/navigation.
3. Do not invent relationships between screenshots.
4. Mark partial/cut-off/unclear sources explicitly.
5. Separate:
   - directly visible screenshot content;
   - Excalidraw labels;
   - layout inference;
   - general ASP.NET knowledge.

---

## Expected region

Because the canvas is small and has 3 images, this conspect may only need one region:

```text
R01 - Binding source attributes
```

If the full SVG reveals multiple separated clusters, split into more regions only if the layout justifies it.
