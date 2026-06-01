# Current Source of Truth - EF Core general

Generated: 2026-06-01 23:28:07 UTC

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
Stage3: EF01B transcript done + EF01A correction for S-059/S-060
Stage4: EF02 boundary review done
Stage5: EF02 transcript done
Stage6: EF03 boundary review done
```

## Done

```text
EF01A: Tracking / identity map / no tracking / identity resolution
EF01B: Loading collections / Include / Find / Load / AutoInclude
EF02: Attach / disconnected updates / entity state
```

## Current target

```text
EF03 transcript next:
S-027, S-024, S-025, S-026
Constructors / materialization
```

## Pending after EF03 boundary review

```text
S-006 -> shadow property / query filter
Other EF Core areas require boundary review first
```
