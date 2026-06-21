# Stage 4o - R02 Boundary Review and Split Plan v001

Generated: 2026-06-01 22:54:07 UTC

## Direction check

Goal:
Move to the next unprocessed area after R08 without losing images.

Done:
R08A/R08B/R08C and R08 closure audit are complete.

This step:
Start R02 with a boundary review and split plan, not a transcript.

Why:
R02 has 36 formal candidates and spans several ideas: query state/statuses, enabled/conditional queries, query keys/manual refetch/declarative dependencies. It also has one formal coordinate overlap with R04 (`S-062`).

Next:
Create R02A transcript only after this boundary review is applied.

---

## Answer to the coverage concern

This archive does not use Stage2 as source of truth.

Workflow used here:

```text
formal coordinate checklist -> visual contact sheet -> candidate groups -> provisional ledger status
```

The transcript step still must recheck local candidates visually/semantically.

---

## Formal R02 checklist

```text
Formal R02 candidate count: 36
```

Candidate groups:

```text
R02A useQuery state/error/cache core: 15
R02B enabled/disabled/conditional UI: 9
R02C query keys/manual refetch/declarative dependencies: 11
R04 overlap / static staleness: 1
```

---

## R02A - next transcript pass

Sources:

```text
S-008, S-011, S-012, S-016, S-017, S-018, S-020, S-021, S-022, S-023, S-024, S-025, S-030, S-034, S-036
```

Meaning:

```text
useQuery state model, status/fetchStatus, isPending/isLoading/isFetching,
query cache basics, queryFn Promise rules, queryFn error/throwing basics.
```

Why first:

```text
This is the core/top R02 road and includes S-008, which was previously checked from R01 and excluded from R01 as the statuses block.
```

---

## R02B - later pass

Sources:

```text
S-013, S-026, S-027, S-032, S-033, S-037, S-042, S-047, S-056
```

Meaning:

```text
enabled / disabled query state, conditional queries, no-input UI state,
and the rule that sometimes a separate component is better than mounting a disabled query.
```

---

## R02C - later pass

Sources:

```text
S-039, S-040, S-043, S-045, S-048, S-050, S-051, S-052, S-054, S-057, S-061
```

Meaning:

```text
query keys, manual refetch, key arrays/objects, state-driven query keys,
and why query keys make fetching declarative.
```

---

## R04 overlap reserved

```text
S-062 -> reserve for R04 staleness/static staleTime review.
```

Reason:

```text
Although S-062 is in the formal R02 coordinate list, semantically it is about staleTime:'static' and manual invalidation.
That belongs to the staleness/refetch/static area, not the R02 transcript.
```

---

## Side checks not in formal R02

```text
S-029/S-035/S-041/S-046/S-055/S-058/S-059 -> distant left-side R03 notifyOnChangeProps/select side area, not R02 nearby.
S-063/S-067 -> lower R04 staleness/static/refetch frontier, not R02A/R02B/R02C.
```

---

## Contact sheets

```text
audit-assets/R02-all-candidates-contact-sheet.png
audit-assets/R02A-usequery-state-error-core-contact-sheet.png
audit-assets/R02B-enabled-conditional-ui-contact-sheet.png
audit-assets/R02C-query-keys-manual-refetch-contact-sheet.png
audit-assets/R02-R04-overlap-static-staleness-contact-sheet.png
```

---

## Next action

Do not start a new unrelated region.

Next archive should be:

```text
ai-conspects-react-query-rquery-stage4p-r02a-usequery-state-transcript-v001.zip
```

It should process R02A only and include its own `0.2 Coverage / boundary review`.
