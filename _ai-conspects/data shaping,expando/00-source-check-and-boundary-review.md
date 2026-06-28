# Source check and boundary review — data shaping,expando

Generated: 2026-06-27 UTC

## Source

```text
received file: data shaping,expando.svg
canonical source name: data shaping,expando.svg
canonical conspect folder: _ai-conspects/data shaping,expando
source SHA-256: 39485ba7e12ab8f326f7f81700e5b9c3bc34a79d98dd77163228b86fd6b76b59
source bytes: 3530395
SVG viewBox: 0 0 7102.456899192066 18167.997184571766
```

The remote branch did not contain `_ai-conspects/data shaping,expando/CURRENT_SOURCE_OF_TRUTH.md`; this package creates a new conspect.

## Inventory

```text
embedded SVG image symbols: 67
embedded raster files extracted: 67
image uses on canvas: 72
unique image-content hashes: 67
physical SVG text nodes: 74
non-empty SVG text nodes: 63
empty SVG text nodes recorded: 11
```

Five embedded assets are intentionally placed twice. Each placement remains a separate image-use row:

- `A-009` / `image-f59fa0e8717e101e722e76e70b6b154f614a048c`: IU-063, IU-064
- `A-037` / `image-a71d70a4a561e28c3b696d6f9416e11af2b63c65`: IU-031, IU-040
- `A-038` / `image-bd869a396e480c9a07219eeb5cc273ce7f46b5d4`: IU-030, IU-039
- `A-039` / `image-5c91cab0a0fe56e5e926580f53111e45a56b9c95`: IU-029, IU-038
- `A-040` / `image-955526008e3100535ba879fc9b2e2dda2307a3c9`: IU-028, IU-037

No different embedded assets have identical raster bytes.

## Boundary policy

Canvas position and nearby SVG labels were used only as candidate evidence. Region membership was checked against the screenshot content. In particular, the conspect repeats several ExpandoObject explanation screenshots: the early placements support the implementation walkthrough, while later placements belong to the dedicated ExpandoObject comparison section.

## Verified regions

- `R01` — Data-shaping contract, fields parameter and field validation: 13 image uses / 51 physical text nodes
- `R02` — Collection/single shaping extensions and controller flow: 24 image uses / 10 physical text nodes
- `R03` — ExpandoObject, dictionary/dynamic semantics and alternatives: 20 image uses / 6 physical text nodes
- `R04` — Why data shaping differs from database projection: 15 image uses / 7 physical text nodes

## Closure

Every image use and every physical text node is assigned to exactly one verified region. Empty SVG text nodes are retained in the ledger rather than silently discarded.
