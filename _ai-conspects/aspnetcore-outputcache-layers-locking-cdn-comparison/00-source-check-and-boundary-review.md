# Stage0 - source check and boundary review

Conspect: `aspnetcore-outputcache-layers-locking-cdn-comparison`  
Source: `outputcache layers, to use or not,locking, outputcache vs cdn.svg`  
Stage: **stage0 boundary/source review v001**  
Generated: 2026-06-13 07:55:00 UTC

---

## Direction check

Goal: convert the OutputCache Excalidraw/SVG conspect into source-preserving AI-readable text without losing screenshots or canvas labels.

This archive is not the transcript itself. It materializes the source, extracts embedded image uses, records text labels, proposes semantic regions, and prepares the ledger for transcript pass.

---

## Source inventory

```text
unique embedded images: 39
image uses on canvas: 39
text labels parsed: 63
duplicate image uses by extracted file/content: 0
viewBox: [0.0, 0.0, 12481.908213799372, 10686.832273975975]
```

---

## Candidate regions

| Region | Images | Labels | Name | Boundary rationale |
|---|---:|---:|---|---|
| R01 | 8 | 8 | safety / whether output caching is beneficial | Top road: is OutputCache safe/beneficial for the endpoint; personal/session data, cookies, side effects, and first summary. |
| R02 | 14 | 20 | cache usefulness decision criteria / hotness / freshness / CDN question | Middle decision road: cache key reuse, unused entries, expensive endpoints, response size, freshness/dynamic data, and whether caching already happens elsewhere. |
| R03 | 17 | 15 | locking / cache stampede / expiration and catastrophic locking cases | Lower-middle road: OutputCache locking, when locking is useful, when it is harmful, expiration time, endpoint cost, response cost, connection quality, and catastrophic locking cases. |
| R04 | 0 | 20 | OutputCache vs CDN / browser cache / revalidation notes | Right text-heavy road: when OutputCache is redundant with CDN, when it is useful even with CDN, CDN misses, private/internal users, app-level cache rules, and 304/revalidation notes. |

---

## Suggested next transcript pass

```text
R01+R02+R03+R04 full pass = 39 image uses + 63 text labels
```

Reason: the sheet is medium-sized and mostly one decision tree: safety/benefit gates -> usefulness criteria -> locking -> OutputCache/CDN layer comparison. R04 is text-heavy and should be explicitly handled even though it has no extracted screenshot image use.

Fallback split if the transcript pass gets too large:

```text
R01+R02 first, then R03+R04 final coverage.
```

---

## Files produced

```text
source/aspnetcore-outputcache-layers-locking-cdn-comparison.svg
source/images/*.png
data/embedded-images-stage0.json
data/image-uses-stage0.*
data/svg-labels-stage0.*
data/duplicate-image-uses-stage0.*
data/region-split-plan-stage0.*
data/image-review-ledger-v001.*
audit-assets/contact-sheet-*.png
audit-assets/canvas-map-labels-and-image-boxes-stage0.png
```

---

## Boundary warning

Inventory/contact sheets are checklists only. The transcript pass must re-check visual/semantic boundaries against source images, nearby screenshots and canvas labels.
