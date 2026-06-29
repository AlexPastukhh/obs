# Source check and boundary review — in any exist, some

Generated: 2026-06-29 UTC


## Previous state

The existing target already preserved the same source boundary:

```text
unique images: 2
image uses: 2
native labels: 11
```

However, its regional transcripts, combined transcript and final coverage audit
were still marked as not started. This archive closes that work without changing
the source counts.


## Authoritative source

```text
source/in any exist, some(1).svg
viewBox: 0 0 2291.920558398806 1024.7486351029247
unique embedded screenshots: 2
image uses: 2
native SVG labels: 11
duplicate extra placements: 0
```

## Semantic regions

| Region | Image uses | Labels | Topic |
|---|---:|---:|---|
| R01 | 0 | 8 | EXISTS, correlated subqueries and NULL-safe anti-semi joins |
| R02 | 1 | 1 | IN membership, literal lists, subqueries and three-valued logic |
| R03 | 1 | 2 | ANY/SOME comparisons, operator semantics and NULL behavior |

## Visual review

The complete canvas preview and all contact sheets were reviewed. Every embedded
image decodes correctly, every `<use>` points to a valid image definition, and
every meaningful SVG text element is assigned to a semantic region.

```text
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
