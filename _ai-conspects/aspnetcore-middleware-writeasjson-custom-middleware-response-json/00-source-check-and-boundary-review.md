# Stage0 source check and boundary review - ASP.NET Core middleware / WriteAsJson / custom middleware response JSON

Conspect slug: `aspnetcore-middleware-writeasjson-custom-middleware-response-json`
Source SVG: `source/aspnetcore-middleware-writeasjson-custom-middleware-response-json.svg`
Stage: **stage0 / source availability + boundary review v001**

## Policy

Inventory/contact sheets/ledger are checklists only. The visual SVG and extracted source images remain the source of truth until a transcript pass re-checks visual/semantic boundaries.

## Counts

```text
unique embedded images: 32
image uses on canvas: 34
text labels parsed: 34
text blocks parsed: 11
duplicate image-use groups: 2
```

## Candidate region split

| Region | Image uses | Text labels | Meaning |
|---|---:|---:|---|
| R01 | 11 | 10 | middleware basics, RequestDelegate shape, order, DI/scoped gotchas, inheritance/common structure |
| R02 | 12 | 24 | non-MVC JSON responses, Response.WriteAsJsonAsync, short-circuiting, exception/response flow |
| R03 | 11 | 0 | branching/pipeline patterns, async/debugging tips, common middleware patterns and final examples |

## Duplicate image-use handling

```text
- ec574fa8b8: S-001, S-018
- c88a50fa73: S-002, S-020
```

## Next transcript candidate

```text
Process all candidate regions in one final coverage pass.
Total: 34 image uses + 34 text labels.
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
