# Current Source of Truth - React Query rquery

Generated: 2026-06-01 21:36:06 UTC

## Current policy

Do not use old Stage2 as source of truth.

Also do not treat the review ledger as source of truth.

The ledger is:

```text
review checklist
all-image work queue
provisional coverage tracker
decision log after visual/semantic review
```

## Actual source of truth for a region

A region is complete only when its region file contains:

```text
Coverage / boundary review
included sources
candidate types checked
nearby candidates checked
distant safety candidates labeled correctly
excluded candidates with reasons
reassigned candidates with reasons
remaining open issues
verified source transcript
```

## Current review ledger

```text
_ai-conspects/react-query-rquery/data/react-query-image-review-ledger-v2.csv
```

## R01 status

```text
R01 v001: superseded partial fragment
R01 v002: expanded full browser/cache road
```

R01 v002 includes 20 sources and excludes S-008 as a distant same-band safety check, not a nearby image.
