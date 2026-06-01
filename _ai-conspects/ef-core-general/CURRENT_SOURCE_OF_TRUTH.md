# Current Source of Truth - EF Core general

Generated: 2026-06-01 22:51:28 UTC

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
```

## Done

```text
EF01A: Tracking / identity map / no tracking / identity resolution
EF01B: Loading collections / Include / Find / Load / AutoInclude
```

## Important correction

```text
S-059/S-060 are EF01A identity-resolution examples.
S-006 is not EF01B; pending shadow-property/model-configuration review.
S-029/S-030 are not EF01B; pending Attach/disconnected-update review.
```

## Pending

```text
Next EF Core area: requires boundary review first.
Likely candidates: shadow properties / Attach-disconnected updates / entity constructors / model constraints.
```
