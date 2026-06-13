# Current Source of Truth - actiondescriptor-controlleractiondescriptor-endpoint-metadata-route-endpoint-name-iapiendpointmetadata-ordered-metadata

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
Image uses: 36
Text labels: 9
Duplicate image uses by fileId_short: 0
Stage1 assigned image uses: 36
Stage1 missing image uses: 0
Stage1 duplicated assignments: 0
```

## Candidate regions

```text
AEM01: ActionDescriptor and ControllerActionDescriptor in MVC/filter context
AEM02: Endpoint metadata, MVC endpoint metadata, RouteEndpoint and IApiEndpointMetadata
AEM03: Ordered metadata and ordered endpoint metadata lookup
```

## Current next step

```text
NEXT01: AEM01 = 16 image uses
```

## Later

```text
NEXT02: AEM02 + AEM03 = 20 image uses
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
