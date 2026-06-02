# Current Source of Truth - returning-iqueryable-ienumerable-async-yield

Generated: 2026-06-02 15:50:10 UTC

## Current status

```text
Stage0: source materialized
Stage1: boundary review done
Transcript: not started
```

## Source material

```text
Original source: returning iqueryable,problems when returning ienumerable without tolist, async enumerable problems,yield.svg
Raw SVG: assets/raw/full.svg
Image inventory: data/image-inventory-v001.csv
Text elements: data/text-elements-raw-v001.csv
Extracted images: assets/source-images/*.png
Stage1 boundary review: data/stage1-boundary-review-v001.csv
Stage1 ledger: data/image-review-ledger-v001.csv
```

## Counts

```text
Image definitions: 44
Image uses: 44
Text labels: 17
Duplicated image definitions: 0
Duplicate image uses by fileId_short: 0
Stage1 assigned image uses: 44
Stage1 missing image uses: 0
Stage1 duplicated assignments: 0
```

## Candidate regions

```text
RIQ01: IQueryable as public API / leaky abstraction / repository boundary
RIQ02: Returning IEnumerable without ToList / materialization boundary
RIQ03: Multiple enumeration hazards for IEnumerable
RIQ04: Async enumerable repeated enumeration / caching / single-use streams
RIQ05: Yield / iterator cleanup / finally restrictions
```

## Current next step

```text
NEXT01 full transcript:
RIQ01 + RIQ02 + RIQ03 + RIQ04 + RIQ05
44 image uses
```

## Rules

```text
Inventory/contact sheets are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript must visually recheck source images.
For large archives, use tar.exe -xf and staged cached diff review.
Do not duplicate source PNGs in later stage archives unless there is a concrete audit need.
```
