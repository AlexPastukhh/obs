# Stage 0 - Source Check / Materialization

Generated: 2026-06-02 08:43:52 UTC

## Done

- Raw SVG was materialized.
- Embedded PNG screenshots were extracted.
- Text labels were extracted.
- Initial image inventory and contact sheets were generated.

## Now

- Apply this archive and review the source check.
- Do not start transcript until the inventory/contact sheets are checked.

## Next

- Stage1: large boundary review.
- This conspect has **198 image uses**, so the next pass should use a large batch:
  - average working batch: 30-80 images;
  - more is allowed if the block is one logical area;
  - preserve subregion boundaries inside large transcript archives.

## Later

- Boundary review -> transcript by large logical regions -> closure audit.

---

## Source summary

```text
SVG: ef core context.database, transaction object, savechanges, dbconnection,dbtransaction.svg
Canvas: 0 0 27517.347316752042 24639.634053547605
Embedded image uses: 198
Text labels: 139
Duplicated image definitions: 0
```

## Key generated files

```text
data/image-inventory-v001.csv
data/text-elements-raw-v001.csv
data/image-dedup-v001.csv
data/rough-layout-columns-v001.csv
assets/source-images/*.png
assets/contact-sheets/contact-sheet-*.png
assets/raw/full.svg
assets/raw/text-elements-raw.txt
```

## Important source rules

```text
image inventory is a checklist, not source of truth
nearest labels are search hints only
source ownership must be decided by visual/semantic review
large batches are allowed, but unrelated meanings must stay split into subregions
```

## Contact sheets

```text
assets/contact-sheets/contact-sheet-01-S001-S080.png
assets/contact-sheets/contact-sheet-02-S081-S160.png
assets/contact-sheets/contact-sheet-03-S161-S198.png
assets/contact-sheets/contact-sheet-all-small.png
```
