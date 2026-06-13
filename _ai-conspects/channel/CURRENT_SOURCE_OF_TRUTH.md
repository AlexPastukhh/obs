# Current Source of Truth - channel

Generated: 2026-06-13 05:42:57 UTC

## Current status

```text
Stage0: source materialized
Stage1: boundary review done
Transcript: not started
```

## Source material

```text
Original source: channel.svg
Raw SVG: assets/raw/full.svg
Image inventory: data/image-inventory-v001.csv
Text elements: data/text-elements-raw-v001.csv
Extracted images: assets/source-images/*.png
Stage1 boundary review: data/stage1-boundary-review-v001.csv
Stage1 ledger: data/image-review-ledger-v001.csv
```

## Counts

```text
Image definitions: 61
Image uses: 62
Text labels: 37
Duplicated image definitions: 0
Duplicate image uses by fileId_short: 1
Stage1 assigned image uses: 62
Stage1 missing image uses: 0
Stage1 duplicated assignments: 0
```

## Duplicate embedded-image use

```text
3ff670517a: S-020, S-062
```

## Candidate regions

```text
CH01: Channel fundamentals, creation, types, options, backpressure
CH02: Reader/Writer operations, async waiting, completion, ReadAllAsync
CH03: Concurrency assumptions and completion edge cases
CH04: Manual WaitToRead/TryRead and WaitToWrite/TryWrite patterns
CH05: WebSockets/application examples and connection manager channel pattern
```

## Current next step

```text
NEXT01 transcript:
CH01 + CH02
30 image uses
```

## Later

```text
NEXT02 transcript:
CH03 + CH04
15 image uses

NEXT03 transcript:
CH05
17 image uses
```

## Rules

```text
Inventory/contact sheets are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript must visually recheck source images.
For large archives, use tar.exe -xf and staged cached diff review.
Do not duplicate source PNGs in later stage archives unless there is a concrete audit need.
```
