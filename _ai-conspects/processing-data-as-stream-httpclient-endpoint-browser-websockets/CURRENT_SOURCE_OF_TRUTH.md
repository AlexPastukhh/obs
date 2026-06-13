# Current Source of Truth - processing-data-as-stream-httpclient-endpoint-browser-websockets

Generated: 2026-06-13 08:53:27 UTC

## Current status

```text
Stage0: source materialized
Stage1: boundary review done
Transcript: not started
```

## Source material

```text
Image inventory: data/image-inventory-v001.csv
Text elements: data/text-elements-raw-v001.csv
Stage1 boundary review: data/stage1-boundary-review-v001.csv
Stage1 ledger: data/image-review-ledger-v001.csv
```

## Counts

```text
Image uses: 23
Text labels: 52
Duplicate image uses by fileId_short: 0
Stage1 assigned image uses: 23
Stage1 missing image uses: 0
Stage1 duplicated assignments: 0
```

## Candidate regions

```text
PDS01: ASP.NET endpoint request-body Stream reading and stream failure behavior
PDS02: Browser fetch/WebSocket message chunks and UTF-8 decoding
PDS03: HttpClient streaming response and chunk-by-chunk processing
PDS04: System.IO.Pipelines PipeReader/PipeWriter and SequenceReader
```

## Current next step

```text
NEXT01: PDS01 + PDS03 = 10 image uses
```

## Later

```text
NEXT02: PDS02 = 6 image uses
NEXT03: PDS04 = 7 image uses
Final closure/audit
```

## Rules

```text
Inventory/contact sheets are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript must visually recheck source images.
For large archives, use tar.exe -xf and staged cached diff review.
Do not duplicate source PNGs in later stage archives unless there is a concrete audit need.
```
