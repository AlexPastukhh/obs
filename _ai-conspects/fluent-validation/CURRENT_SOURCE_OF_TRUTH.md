# Current Source of Truth - fluent-validation

Generated: 2026-06-02 14:12:18 UTC

## Current status

```text
Stage0: source materialized
Stage1: boundary review done
Transcript: not started
```

## Source material

```text
Original source: fluent validation.svg
Raw SVG: assets/raw/full.svg
Image inventory: data/image-inventory-v001.csv
Text elements: data/text-elements-raw-v001.csv
Extracted images: assets/source-images/*.png
Stage1 boundary review: data/stage1-boundary-review-v001.csv
Stage1 ledger: data/image-review-ledger-v001.csv
```

## Counts

```text
Image definitions: 40
Image uses: 41
Text labels: 25
Duplicated image definitions: 0
Duplicate embedded-image uses by fileId_short: 1
Stage1 assigned image uses: 41
Stage1 missing image uses: 0
Stage1 duplicated assignments: 0
```

## Candidate regions

```text
FV01: Regex and built-in string/basic validators
FV02: Validating collections and complex child properties
FV03: Conditional validation, dependent rules and cascade mode
FV04: Custom FluentValidation validators and reusable validation logic
FV05: Inheritance validation
FV06: Rule sets and validator reuse/data-contract cautions
FV07: Throwing exceptions and final summary
FVTXT01: Canvas-level module/reminder notes
```

## Current next step

```text
NEXT01 full transcript:
FV01 + FV02 + FV03 + FV04 + FV05 + FV06 + FV07
41 image uses
include FVTXT01 text-only notes as context
```

## Rules

```text
Inventory/contact sheets are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript must visually recheck source images.
For large archives, use tar.exe -xf and staged cached diff review.
Do not duplicate source PNGs in later stage archives unless there is a concrete audit need.
```
