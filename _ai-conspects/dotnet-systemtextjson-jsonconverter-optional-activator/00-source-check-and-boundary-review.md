# Stage0 - System.Text.Json JsonConverter source check and boundary review v001

Generated: 2026-06-22 UTC

## Direction check

Goal:
Convert `jsonconverter.svg` into source-preserving AI-readable text without losing screenshots or canvas labels.

Now:
This archive creates the source/boundary checkpoint only. No transcript is considered done yet.

This step:
Preserve the source SVG, extract embedded images, inventory image uses and grouped text labels, check duplicate placements, generate contact sheets, propose initial regions, and initialize the coverage ledger.

Why:
Transcript should start only after image/source coverage and region boundaries are explicit.

Next:
Start transcript pass after this combined three-conspect stage0 bundle is reviewed and committed.

## Counts

```text
unique embedded images: 19
image uses on canvas: 19
text labels parsed: 3
duplicate image uses by extracted content: 0
```

## Candidate regions

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 13 | 3 | converter activation, optional/convention setup, base converter flow |
| R02 | 6 | 0 | converter implementation details, explanation, edge cases |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Every transcript pass must visually and semantically re-check boundaries before marking a region complete.
```
