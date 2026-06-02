# Stage0 - CORS source check and boundary review v001

Generated: 2026-06-02 12:00:10 UTC

## Direction check

Goal:
Convert the uploaded CORS Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots.

Now:
This archive only creates the source/boundary checkpoint. No transcript is considered done yet.

This step:
Parse `CORS.svg`, extract embedded PNGs, collect image-use coordinates/text labels, create contact sheets, initial region split plan, and coverage ledger.

Why:
Before transcript passes, we need image inventory and candidate boundaries so large passes can process 60-100 images without losing/duplicating screenshots.

Next:
Start transcript pass after boundary review. Suggested first pass: `R01+R02` (56 images), then `R03+R04+R05` (70 images) if coherent.

---

## Counts

```text
unique embedded images: 126
image uses on canvas: 126
text labels parsed: 71
duplicate image uses by extracted file: 0
```

## Candidate regions

| Region | Candidate images | Meaning |
|---|---:|---|
| R01 | 42 | origin / URL components / preflight basics / safelisted headers / browser flow |
| R02 | 14 | ASP.NET CORS use-cases / proxy / manual config / credentials top-right road |
| R03 | 26 | ASP.NET CORS policy builder methods / WithOrigins / AllowAny / methods / exposed headers |
| R04 | 25 | Access-Control headers reference / origin / request method / credentials / expose / max-age / failure behavior |
| R05 | 19 | middleware behavior / preflight semantics / credentials references / multiple origins / what can go wrong |


## Important rule

```text
Stage0 split is checklist only, not source of truth.
Each transcript pass must re-check visual/semantic boundaries and nearby candidates before marking a region done.
```

## Suggested batching

```text
Pass 1: R01+R02 = upper-half origin/preflight/use-cases/ASP/proxy/manual config road.
Pass 2: R03+R04+R05 = lower-half ASP.NET policy builder + Access-Control headers + middleware behavior road.
```
