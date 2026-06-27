# Supplemental source recovery — missing screenshots

Conspect: `onmodelcreating`  
Generated: 2026-06-27 00:00:00 UTC

## Located folder

```text
_ai-conspects/onmodelcreating
```

## Why this patch exists

The previously processed source was recorded as:

```text
old unique embedded images: 0
old image uses: 0
old text elements: 153
```

The replacement SVG contains:

```text
recovered unique embedded images: 220
recovered image uses: 220
duplicate image uses: 0
text elements: 153
```

The text-element count is unchanged, but that does not make the prior
transcript complete. The prior transcript only summarized the surviving
text layer. This patch restores the missing screenshot layer and marks the
old transcript as incomplete until a full combined transcript is rebuilt.

## Supplemental regions

- **R01 — Collations, HiLo and value-generation orientation:** 14 uses / 14 unique images.
- **R02 — Many-to-many variants, join entities, UTF-8 collations and HiLo setup:** 21 uses / 21 unique images.
- **R03 — Join-table configuration, defaults, computed values, triggers and backing fields:** 40 uses / 40 unique images.
- **R04 — Value generation, save behavior, indexes, precision, schema, sequences and access modes:** 61 uses / 61 unique images.
- **R05 — Property access modes, delete rules and configuration organization:** 7 uses / 7 unique images.
- **R06 — ConfigureConventions, defaults, inheritance and polymorphic-query foundations:** 18 uses / 18 unique images.
- **R07 — TPH/TPT strategies, query costs and value converters:** 26 uses / 26 unique images.
- **R08 — TPC, inheritance performance and converter trade-offs:** 14 uses / 14 unique images.
- **R09 — Inheritance mapping control, discovery and applying configurations:** 19 uses / 19 unique images.

## Recovery result

- Complete replacement SVG preserved under `source/`.
- Every embedded screenshot extracted under `source/images/`.
- Every screenshot placement recorded in `data/supplemental-image-uses-v001.*`.
- Nearby SVG captions attached to the placement ledger for orientation.
- Regional and all-use contact sheets generated for visual audit.
- The previous text-only transcript is retained only as a legacy draft and is marked incomplete.
- A new combined transcript must be rebuilt from the text layer and all screenshots.
- Supplemental screenshot transcription is pending.

## Next step

Process supplemental regions `R01`–`R09`, close all 220 image uses and
produce a supplemental final coverage audit.
