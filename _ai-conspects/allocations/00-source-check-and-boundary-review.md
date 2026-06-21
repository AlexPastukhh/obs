# Stage0 - source check and boundary review

Conspect: `allocations`  
Source: `allocations.svg`  
Archive type: **stage0 boundary/source review**

## Summary

```text
unique embedded images: 41
image uses on canvas: 41
text labels parsed: 3
duplicate image uses by extracted file/content: 0
viewBox: [0.0, 0.0, 1950.4046693951013, 20288.12796810965]
```

## Policy

Inventory/ledger is checklist only, not source of truth. A region is complete only after visual/semantic boundary review and verified transcript.

## Canvas text labels

- T-001: `explain allocations here` at x=1175.1, y=10.0
- T-002: `!!!` at x=688.2, y=7717.5
- T-003: `!!!` at x=10.0, y=17386.6

## Candidate regions

### R01 - allocation-basics-value-reference-stack-heap

upper intro road: allocation basics, value/reference behavior, stack/heap/object allocation setup

```text
image uses: 9
sources: S-001, S-002, S-003, S-004, S-006, S-007, S-008, S-005, S-009
```

### R02 - strings-arrays-collections-common-allocation-traps

middle road: strings, arrays/collections, capacity/enumeration/closures and common allocation traps

```text
image uses: 12
sources: S-010, S-015, S-011, S-012, S-013, S-014, S-016, S-017, S-018, S-019, S-020, S-021
```

### R03 - span-memory-arraypool-buffers-low-allocation-patterns

lower optimization road: Span/Memory, ArrayPool/buffers, low/zero-allocation patterns and tradeoffs

```text
image uses: 14
sources: S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035
```

### R04 - benchmarking-gc-diagnostics-final-notes

final diagnostics road: benchmarking, GC/allocation measurement and final cautions

```text
image uses: 6
sources: S-040, S-041, S-036, S-037, S-038, S-039
```

## Duplicate image uses

None detected.

## Next

Suggested first transcript pass: `R01+R02+R03+R04`, because the sheet is linear but tall; fallback split after visual review if lower diagnostics section needs a separate pass.
