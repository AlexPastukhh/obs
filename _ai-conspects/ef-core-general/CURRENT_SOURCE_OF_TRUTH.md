# Current Source of Truth - EF Core general

Generated: 2026-06-01 23:39:21 UTC

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
Stage7: EF03 transcript done
Stage8: EF04 boundary review done
```

## Done

```text
EF01A: Tracking / identity map / no tracking / identity resolution
EF01B: Loading collections / Include / Find / Load / AutoInclude
EF02: Attach / disconnected updates / entity state
EF03: Constructors / materialization
```

## Current target

```text
EF04 transcript next:
S-006
Shadow property / query filter
```

## Pending after EF04 boundary review

```text
Other EF Core areas require boundary review first
```
