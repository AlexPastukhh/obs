# Stage 16 — source completion correction v002

## Direction check

Goal:
Repair the existing EF Core General conspect after the earlier SVG export omitted most embedded screenshots.

Now:
The repository conspect was previously closed against an incomplete source inventory of 64 unique images / 65 image uses.

This step:
Compare the new uploaded `- EF CORE GENERAL  repo shit   entity shit   onmodelcreat shit  transactions shit  dbexceptions   db level invariants,protection, trigger(2).svg` against the old inventory by Excalidraw image `fileId`, preserve every newly recovered screenshot, add a complete source SVG, and reopen coverage only for the newly recovered image uses.

Why:
Labels alone are not sufficient. Screenshots are the primary source, and the new SVG contains substantially more screenshots than the earlier export.

Next:
Process the 194 newly recovered image uses in verified semantic transcript passes. Existing transcripts for the original 65 uses remain valid and are not deleted.

---

## Comparison

```text
previous unique image definitions: 64
previous image uses: 65
previous text groups: 132

corrected unique image definitions: 256
corrected image uses: 259
corrected text groups: 132

added unique image definitions: 192
added image uses: 194
old image ids missing from corrected SVG: 0
text-group delta: 0
```

## Important interpretation

The corrected SVG is a strict source superset by image `fileId`:

- all 64 old unique image definitions are still present;
- all 65 old placements remain represented;
- 192 unique screenshots / 194 placements were newly recovered;
- text-group count is unchanged, confirming that the main defect was missing screenshots rather than missing labels.

## Files added

```text
source/source-complete-v002.svg
assets/source-images-added-v002/
data/source-completion-summary-v002.json
data/missing-image-definitions-v002.json
data/missing-image-uses-v002.json
data/missing-image-uses-v002.csv
data/text-groups-complete-v002.json
data/text-groups-complete-v002.csv
data/duplicate-missing-image-uses-v002.json
audit-assets/source-completion-v002/
```

## Coverage status

```text
previously processed image uses: 65
newly recovered pending image uses: 194
total corrected image uses: 259
current conspect status: reopened for source-completion transcript work
```

## Safety rule

Do not mark the 194 recovered uses processed merely because they now exist in the repository. Each use still needs visual/semantic review and an explicit transcript or reassignment.
