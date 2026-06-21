# Stage0 - ASP.NET Core IMemoryCache source check and boundary review v001

Generated: 2026-06-22 UTC

## Direction check

Goal:
Convert `imemorycache.svg` into source-preserving AI-readable text without losing screenshots or canvas labels.

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
unique embedded images: 20
image uses on canvas: 20
text labels parsed: 7
duplicate image uses by extracted content: 0
```

## Candidate regions

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 8 | 4 | basic setup, methods, expiration, size limits, removal |
| R02 | 8 | 2 | bulk invalidation, versions/manual tags, cache organization |
| R03 | 4 | 1 | stampede protection, GetOrCreate behavior, advanced caveats |

## Important rule

```text
Stage0 split is checklist only, not source of truth.
Every transcript pass must visually and semantically re-check boundaries before marking a region complete.
```
