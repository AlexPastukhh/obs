# Current Source of Truth - EF Core general

Generated: 2026-06-02 01:55:59 UTC

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
Stage15: final closure audit done
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

## Final audit

```text
Status: complete
Unreviewed EF Core images: 0
Candidate-only EF Core images: 0
Must-recheck EF Core images: 0
S-001: out-of-current-EFCore-scope
```

## Completion decision

```text
ef-core-general can be marked complete; S-001 remains out-of-current-EFCore-scope.
```

## Future batch-size rule

```text
30-50 images per batch is allowed for future work, and more is allowed if it is one logical block.
Large transcript archives must preserve subregion boundaries.
Boundary review can be larger than transcript subregions.
Every transcript subregion still requires visual source recheck.
```
