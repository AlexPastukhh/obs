# Current Source of Truth - EF Core general

Generated: 2026-06-01 23:58:11 UTC

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
Stage9: EF04 transcript done
Stage10: EF05/EF06 combined boundary review done
```

## Done

```text
EF01A: Tracking / identity map / no tracking / identity resolution
EF01B: Loading collections / Include / Find / Load / AutoInclude
EF02: Attach / disconnected updates / entity state
EF03: Constructors / materialization
EF04: Shadow property / query filter
```

## Current candidate regions

```text
EF05: Model mapping / constraints / owned and complex types
EF06: Transactions / concurrency / db exceptions / retry
```

## Recommended next transcript

```text
EF05A:
S-012, S-013, S-011
Race protection with UNIQUE constraint/index
```

## Still unreviewed after Stage10

```text
none
```
