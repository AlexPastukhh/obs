# Stage 0 - Source check and boundary review

Conspect: `polly-cheat-sheet-production-ready-exceptions-pipeline-handling`  
Generated: 2026-06-02 08:43:38 UTC

## Direction check

Goal:
Convert the uploaded Polly/cheat-sheet Excalidraw conspect into source-preserving AI-readable text without losing screenshots.

Now:
Stage0 only: source SVG was parsed, images extracted, labels indexed, and a first candidate split was created.

This step:
Create inventory, contact sheets, and a candidate region plan. No transcript is considered final at stage0.

Why:
The SVG contains many screenshots and labels. Transcript should start only after boundary review of a region/contact sheet.

Next:
Start with a 60-100 image pass if the region is coherent. Suggested first pass is R03 or combined R01+R02+part of R03 after boundary recheck, depending on readability.

## Counts

```text
unique embedded images: 176
image uses on canvas: 186
text labels parsed: 183
duplicate embedded images reused on canvas: 10
```

## Candidate regions

| Region | Images | Labels | Title | Notes |
|---|---:|---:|---|---|
| R01 | 16 | 9 | ShouldHandle / delay generator / request context / nesting left road | Left-side policy option mechanics: ShouldHandle args, delay generator fallback, request context attachment, setting properties, nesting notes. |
| R02 | 26 | 6 | New standard vs custom / hedging / testing road | New Polly standard/custom choices, hedging principle of work, testing-oriented examples. |
| R03 | 62 | 33 | Pipeline.Execute / provider / RateLimiter / partitions road | Manual pipeline execution, context passing, rate limiter strategy args, RateLimitPartition, partitioned/chained limiters, conditional rate limiting. |
| R04 | 27 | 15 | Manual execution / custom pipeline provider / classic-vs-new Polly road | Custom pipeline + provider, manual execution, passing context, choosing pipelines based on request/options, classic vs new Polly transient failure mapping. |
| R05 | 18 | 11 | Classic Polly extensions / HttpPolicyExtensions / examples road | Classic Polly HttpPolicyExtensions, transient HTTP failures, registry/examples, cheat sheet notes. |
| R06 | 25 | 8 | Exception bubbling / newer Polly exception handling road | Exception bubbling between strategies, newer exception handling, how pipeline exceptions propagate. |
| R07 | 12 | 101 | Production-ready full cheat sheet / exception mapping road | Large code cheat sheet, production-ready policy wrap, exception handling mapping and code snippets. |


## Important rule

```text
This split plan is checklist only, not source of truth.
Each transcript pass must do boundary review and can pull/return neighbor images by meaning.
```

## Batching policy

```text
default pass: 60-100 images
larger pass: allowed if the area is coherent and contact sheet remains readable
split required: if multiple semantic roads or unreadable/crowded contact sheet
```

## Files to inspect

```text
audit-assets/contact-sheet-all-stage0.png
audit-assets/contact-sheet-R01-*.png
audit-assets/contact-sheet-R02-*.png
audit-assets/contact-sheet-R03-*.png
audit-assets/contact-sheet-R04-*.png
audit-assets/contact-sheet-R05-*.png
audit-assets/contact-sheet-R06-*.png
audit-assets/contact-sheet-R07-*.png
audit-assets/canvas-map-labels-and-image-boxes.png
data/image-uses-stage0.csv
data/svg-labels-stage0.csv
data/region-split-plan-stage0.csv
data/image-review-ledger-v001.csv
```
