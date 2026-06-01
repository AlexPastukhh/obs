# Current Source of Truth - EF Core general

Generated: 2026-06-01 22:43:34 UTC

## Current policy

Inventory and ledger are checklists, not source of truth.

Actual source of truth for a processed region is:

```text
visual/semantic boundary review
verified source transcript
included/excluded/pending source decisions
```

## Current status

```text
Stage0: source materialized
Stage1: EF01 boundary review done
Stage2: EF01A transcript done
```

## Done

```text
EF01A: Tracking / identity map / no tracking / identity resolution
```

## Pending

```text
EF01B: Loading collections / Include / Find / Load / AutoInclude
Other EF Core areas: require boundary review first
```
