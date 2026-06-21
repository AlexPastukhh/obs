# Stage0 - source check and boundary review

Conspect: `RAZOR PARTIAL UPDATES FOR VIEWCOMPONENT HTMX,AJAX`  
Source: `RAZOR PARTIAL UPDATES FOR VIEWCOMPONENT HTMX,AJAX.svg`  
Generated: 2026-06-22 UTC

## Direction check

Goal: convert the uploaded SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

Now: this archive creates only the source/boundary checkpoint. No transcript is considered complete yet.

Next: visually review candidate regions, then process the whole small conspect in one final-coverage pass if the boundaries remain coherent.

## Counts

```text
unique embedded images: 12
image uses on canvas: 12
text labels parsed: 10
duplicate image uses by extracted content: 0
```

## Candidate regions

| Region | Images | Labels | Meaning |
|---|---:|---:|---|
| R01 | 2 | 0 | why rendered ViewComponent HTML is static after delivery and the AJAX/HTMX/SignalR update options |
| R02 | 2 | 1 | controller endpoint returning ViewComponent HTML, fetch/AJAX request, and replacing the DOM fragment |
| R03 | 8 | 9 | HTMX attributes, polling/button triggers, Razor integration, minimal MVC/ViewComponent example and SPA-like partial updates |

## Important rule

Inventory and the initial region split are checklists, not the source of truth. A region becomes complete only after visual/semantic review and a verified transcript.
