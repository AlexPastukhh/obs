# Stage0 source check and boundary review - C# LINQ query syntax / from-where-select / join / into

Conspect slug: `csharp-linq-query-syntax-from-where-select-join-into`
Source SVG: `source/csharp-linq-query-syntax-from-where-select-join-into.svg`
Stage: **stage0 / source availability + boundary review v001**

## Policy

Inventory/contact sheets/ledger are checklists only. The visual SVG and extracted source images remain the source of truth until a transcript pass re-checks visual/semantic boundaries.

## Counts

```text
unique embedded images: 35
image uses on canvas: 36
text labels parsed: 36
text blocks parsed: 13
duplicate image-use groups: 1
```

## Candidate region split

| Region | Image uses | Text labels | Meaning |
|---|---:|---:|---|
| R01 | 12 | 20 | query syntax vs method syntax, from as enumeration variable, where/select basics |
| R02 | 12 | 16 | join/group join, into continuation, grouping and matched result sets |
| R03 | 12 | 0 | left join patterns, DefaultIfEmpty, multiple from clauses vs into, final mental model |

## Duplicate image-use handling

```text
- 54e067fd4b: S-002, S-036
```

## Next transcript candidate

```text
Process all candidate regions in one final coverage pass.
Total: 36 image uses + 36 text labels.
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
