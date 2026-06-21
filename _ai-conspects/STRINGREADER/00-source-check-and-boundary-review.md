# Stage0 - STRINGREADER source check and boundary review v001

Source SVG: `STRINGREADER.svg`  
Conspect folder: `_ai-conspects/STRINGREADER`

## Counts

```text
unique embedded images: 13
image uses on canvas: 13
text labels parsed: 4
duplicate image uses by content: 0
```

## Important rule

Inventory and candidate regions are checklists only, not source of truth. A transcript region becomes complete only after visual/semantic review.

## Text labels

- T-001: `about lazy allocation vs eager` at x=528.5, y=1638.8
- T-002: `and we cant use content.readasstring on server` at x=1654.8, y=347.9
- T-003: `why string reader` at x=1673.0, y=194.1
- T-004: `why its better than split` at x=10.0, y=10.0

## Candidate regions

### R01 - why-stringreader-and-readline-basics

upper road: why StringReader is used, incremental ReadLine processing, internal position and comparison with Split

```text
image uses: 4
sources: S-002, S-001, S-003, S-004
```

### R02 - lazy-allocation-live-memory-and-gc-effects

middle road: eager versus lazy allocation, peak live memory, GC scanning, promotion, concurrency and fragmentation pressure

```text
image uses: 6
sources: S-005, S-006, S-007, S-008, S-009, S-010
```

### R03 - concrete-memory-example-and-summary

lower road: concrete large-line example, peak-memory comparison and final conclusion about live allocations versus total allocations

```text
image uses: 3
sources: S-011, S-012, S-013
```

## Next

Start transcript processing after this combined three-conspect stage0 archive is reviewed and committed.
