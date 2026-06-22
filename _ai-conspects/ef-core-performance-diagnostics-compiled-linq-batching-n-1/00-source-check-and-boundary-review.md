# Stage0 source and boundary review - ef-core-performance-diagnostics-compiled-linq-batching-n-1

Generated: 2026-06-13 09:05:00 UTC

## Source

- SVG: `source/ef-core-performance-diagnostics-compiled-linq-batching-n-1.svg`
- Semantic title: EF Core performance: diagnostics, compiled LINQ, batching, N+1
- Stage0 is an inventory/boundary checklist only. It is not source of truth for final wording.

## Counts

```text
unique embedded images: 25
image uses on canvas: 25
text labels parsed: 26
duplicate image uses by extracted file/content: 0
```

## Candidate regions

| Region | Boundary / semantic road | Image uses | Text labels |
|---|---|---:|---:|
| R01 | Query shape, conditions and left-side examples | 2 | 4 |
| R02 | Compiled query decision rules and hot paths | 8 | 9 |
| R03 | Compiled query execution and infrastructure costs | 7 | 4 |
| R04 | Diagnostics, N+1 and batching | 8 | 9 |

## Parsed text labels

- T001 [R03] !!!!
- T002 [R04] so when we
- T003 [R04] iterate over
- T004 [R04] iqueryable
- T005 [R04] we call db on each item
- T006 [R04] detecting slow queries
- T007 [R04] Compiled queries
- T008 [R04] N + 1
- T009 [R04] Batching
- T010 [R03] without compiled linq
- T011 [R03] Compiled query for async i/o
- T012 [R03] compiled query exec hit db
- T013 [R02] decision rule
- T014 [R02] when good
- T015 [R02] hot
- T016 [R02] not hot
- T017 [R01] dynamic shape(statements)
- T018 [R02] many optional filters
- T019 [R01] if and compiled queries
- T020 [R01] condition as parameter
- T021 [R01] in fixed shape
- T022 [R02] hot
- T023 [R02] inside infrastructure,
- T024 [R02] library code
- T025 [R02] when bad
- T026 [R04] maxbatchsize

## Next pass recommendation

```text
Suggested first candidate: full pass = 25 image uses + 26 text labels.
Fallback split: use the region split plan if a single pass becomes too dense.
```

## Notes

- Visual/semantic boundary review is still required in transcript pass.
- Nearby means coordinate + semantic road, not just geometric adjacency.
- Image uses are tracked separately from unique image files.
