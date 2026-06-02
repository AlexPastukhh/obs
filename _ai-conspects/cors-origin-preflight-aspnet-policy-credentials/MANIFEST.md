# MANIFEST - CORS stage0 boundary review v001

Archive type: **source check / boundary review**  
Target branch: `ai-processed-conspects-text`  
Generated: 2026-06-02 12:00:10 UTC

## Done

- Started new conspect folder: `_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/`.
- Parsed uploaded `CORS.svg`.
- Extracted embedded images.
- Created image-use inventory, labels, duplicate-use list, ledger, region split plan, contact sheets, and canvas map.

## Counts

```text
unique embedded images: 126
image uses on canvas: 126
text labels parsed: 71
duplicate image uses by extracted file: 0
```

## Candidate regions

```text
R01: 42 images -> origin / URL components / preflight basics / safelisted headers / browser flow
R02: 14 images -> ASP.NET CORS use-cases / proxy / manual config / credentials top-right road
R03: 26 images -> ASP.NET CORS policy builder methods / WithOrigins / AllowAny / methods / exposed headers
R04: 25 images -> Access-Control headers reference / origin / request method / credentials / expose / max-age / failure behavior
R05: 19 images -> middleware behavior / preflight semantics / credentials references / multiple origins / what can go wrong
```

## Files included / updated

```text
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/00-source-check-and-boundary-review.md
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/CURRENT_SOURCE_OF_TRUTH.md
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/source/CORS.svg
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/source/images/*.png
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/data/embedded-images-stage0.json
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/data/image-uses-stage0.*
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/data/svg-labels-stage0.*
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/data/duplicate-image-uses-stage0.*
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/data/region-split-plan-stage0.*
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/data/source-summary-stage0.json
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/data/image-review-ledger-v001.*
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/audit-assets/contact-sheet-*.png
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/audit-assets/canvas-map-labels-and-image-boxes-stage0.png
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/MANIFEST.md
_ai-conspects/cors-origin-preflight-aspnet-policy-credentials/APPLY_ARCHIVE.md
```

## Next

Transcript pass after boundary review. Suggested: R01+R02 first, then R03+R04+R05 if coherent.
