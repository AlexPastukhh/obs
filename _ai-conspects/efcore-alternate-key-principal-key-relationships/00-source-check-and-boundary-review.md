# Stage0 source check and boundary review - EF Core alternate key / principal key / relationships

Conspect slug: `efcore-alternate-key-principal-key-relationships`
Source SVG: `source/efcore-alternate-key-principal-key-relationships.svg`
Stage: **stage0 / source availability + boundary review v001**

## Policy

Inventory/contact sheets/ledger are checklists only. The visual SVG and extracted source images remain the source of truth until a transcript pass re-checks visual/semantic boundaries.

## Counts

```text
unique embedded images: 24
image uses on canvas: 24
text labels parsed: 8
text blocks parsed: 4
duplicate image-use groups: 0
```

## Candidate region split

| Region | Image uses | Text labels | Meaning |
|---|---:|---:|---|
| R01 | 8 | 7 | alternate key concept, alternate key vs primary key, readonly key notes |
| R02 | 8 | 1 | foreign key target on non-primary-key property, relationship target semantics |
| R03 | 8 | 0 | HasPrincipalKey configuration, relationship examples, constraints/caveats |

## Duplicate image-use handling

```text
none
```

## Next transcript candidate

```text
Process all candidate regions in one final coverage pass.
Total: 24 image uses + 8 text labels.
Fallback: split after boundary review if the transcript pass shows that regions should be separated.
```

## Files to inspect

```text
data/image-uses-stage0.*
data/svg-text-labels-stage0.*
data/region-split-plan-stage0.*
data/image-review-ledger-v001.*
audit-assets/contact-sheet-all-stage0.png
audit-assets/contact-sheet-R*.png
audit-assets/canvas-map-stage0.png
```
