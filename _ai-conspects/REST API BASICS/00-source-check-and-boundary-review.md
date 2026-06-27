# Source check and boundary review — REST API BASICS

Generated: 2026-06-27 UTC

## Source

```text
received file: REST API BASICS.svg
canonical source name: REST API BASICS.svg
canonical conspect folder: _ai-conspects/REST API BASICS
source SHA-256: 4a7de8e473d20925240add9bc2a9a60585084202d43a4375ba76d093ef3d7735
source bytes: 31278556
SVG viewBox: 0 0 11808.973936573693 62379.93983342005
```

The remote branch did not contain `_ai-conspects/REST API BASICS/CURRENT_SOURCE_OF_TRUTH.md`; this package therefore creates a new conspect rather than correcting an existing one.

## Inventory

```text
embedded SVG image symbols: 205
embedded raster files extracted: 205
image uses on canvas: 206
unique image-content hashes: 205
physical SVG text nodes: 74
non-empty SVG text nodes: 72
empty SVG text nodes recorded: 2
```

One embedded symbol is placed twice:

```text
asset: A-160
symbol: image-e7d532a8e9f6ba8029091fa0c8d86ad86df98681
placements: IU-046 and IU-054
```

The two placements are intentionally preserved as separate image uses. No different embedded symbols have identical image bytes.

## Boundary policy

The initial y/x positions and nearby SVG labels were treated only as candidate evidence. Region membership was then checked against the screenshot content and the full-canvas layout.

The two interleaved transitions were resolved semantically:

- the Problem Details column and the filtering/searching column overlap vertically around y=10k–12k;
- the final content-negotiation slide overlaps the beginning of the versioning block around y=46k–47k.

## Verified regions

- `R01` — REST constraints, resource contracts, HTTP methods and validation: 54 image uses / 19 physical text nodes
- `R02` — Problem Details and public error contracts: 10 image uses / 11 physical text nodes
- `R03` — Filtering, searching, pagination and sorting: 26 image uses / 10 physical text nodes
- `R04` — Data shaping, HATEOAS and content negotiation: 54 image uses / 12 physical text nodes
- `R05` — API versioning and deprecation: 13 image uses / 4 physical text nodes
- `R06` — HTTP caching, validators and ASP.NET Core response caching: 49 image uses / 18 physical text nodes

## Closure

Every image use and every physical text node is assigned to exactly one verified region. Empty SVG text nodes are retained in the ledger rather than silently discarded.
