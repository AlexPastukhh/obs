# Stage0 - source check and boundary review

Conspect: `statuscodepages`  
Source: `statuscodepages.svg`  
Generated: 2026-06-22 UTC

## Direction check

Goal: convert the uploaded SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

Now: this archive creates only the source/boundary checkpoint. No transcript is considered complete yet.

Next: visually review candidate regions, then process the whole small conspect in one final-coverage pass if the boundaries remain coherent.

## Counts

```text
unique embedded images: 12
image uses on canvas: 12
text labels parsed: 77
duplicate image uses by extracted content: 0
```

## Candidate regions

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 3 | 72 | UseWhen-scoped API StatusCodePages pipeline, selected status codes, ProblemDetailsFactory/IProblemDetailsService and fallback writing |
| R02 | 4 | 4 | StatusCodePagesWithReExecute, filtering, error endpoint/controller and attaching useful request/status details |
| R03 | 5 | 1 | AddProblemDetails + UseStatusCodePages default behavior, customization callbacks, empty-body/content-negotiation conditions and generic output |

## Important rule

Inventory and the initial region split are checklists, not the source of truth. A region becomes complete only after visual/semantic review and a verified transcript.
