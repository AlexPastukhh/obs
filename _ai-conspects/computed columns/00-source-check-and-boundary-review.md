# Stage0 - source check and boundary review

Conspect: `computed columns`  
Source: `computed columns.svg`  
Generated: 2026-06-22 UTC

## Direction check

Goal: convert the uploaded SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

Now: this archive creates only the source/boundary checkpoint. No transcript is considered complete yet.

Next: visually review candidate regions, then process the whole small conspect in one final-coverage pass if the boundaries remain coherent.

## Counts

```text
unique embedded images: 18
image uses on canvas: 18
text labels parsed: 10
duplicate image uses by extracted content: 0
```

## Candidate regions

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 7 | 5 | computed-column basics, non-persisted evaluation, PERSISTED storage, SELECT/UPDATE behavior |
| R02 | 8 | 5 | indexing a computed column, insert/update index maintenance, deterministic expressions and dependency tracking |
| R03 | 3 | 0 | unpredictable functions such as GETDATE, row instability, and why indexable computed expressions must be deterministic |

## Important rule

Inventory and the initial region split are checklists, not the source of truth. A region becomes complete only after visual/semantic review and a verified transcript.
