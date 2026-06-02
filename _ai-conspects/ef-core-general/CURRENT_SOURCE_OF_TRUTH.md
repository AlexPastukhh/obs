# Current Source of Truth - EF Core general

Generated: 2026-06-02 01:52:06 UTC

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
Stage11: EF05A transcript done
Stage12: EF05B transcript done
Stage13: EF05C transcript done
Stage14: EF06 combined transcript done
```

## Done

```text
EF01A: Tracking / identity map / no tracking / identity resolution
EF01B: Loading collections / Include / Find / Load / AutoInclude
EF02: Attach / disconnected updates / entity state
EF03: Constructors / materialization
EF04: Shadow property / query filter
EF05A: Race protection with UNIQUE constraint/index
EF05B: Owned FullName / optional mapping / CHECK constraint
EF05C: Optional value objects / complex types
EF06A: Optimistic concurrency / check-then-add race
EF06B: Transactions / isolation levels
EF06C: DB exceptions / retry exhausted / catch order
```

## Current candidate regions

```text
No EF Core candidate region should remain after Stage14.
S-001 remains out-of-current-EFCore-scope from Stage10 and should be confirmed in final audit.
```

## Recommended next step

```text
Final closure/audit pass:
- confirm no unreviewed/candidate-only EF Core images remain;
- confirm S-001 stays out-of-current-EFCore-scope or move it to another conspect;
- mark ef-core-general complete if clean.
```
