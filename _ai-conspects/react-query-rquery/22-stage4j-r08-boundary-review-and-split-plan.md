# Stage 4j - R08 Boundary Review and Split Plan v001

Generated: 2026-06-01 22:14:49 UTC

## Direction check

Goal:
Move to the next React Query block without forgetting images or trusting an old mapping as source of truth.

Now:
R01/R05 corrections are done, and Stage4i closes the known R06/R07/R10 correction backlog. The next major unprocessed area is R08: QueryClient / methods / filters / cache helpers.

This step:
Create a boundary review and split plan for R08 before doing transcript.

Why:
R08 is large: the coordinate inventory has 51 R08 candidates, spanning multiple columns and partly overlapping previously corrected R07 material. A single blind transcript pass would risk dropping or misassigning images.

Next:
Create R08A transcript for QueryClient / QueryFilters / core methods.

---

## Answer to the process concern

I am not using the old Stage2 as source of truth.

For R08, I used it only as coordinate/image inventory, then did a visual candidate review with contact sheets.

Current safeguards:

```text
1. Every R08 coordinate candidate is listed in data/R08-boundary-review-stage4j-v001.csv.
2. The ledger is updated only as provisional candidate tracking.
3. R08 is split into sub-passes so no 50-image area is silently compressed.
4. Already processed overlaps S-184/S-186 are explicitly excluded from R08 transcript ownership.
5. Each later transcript pass must still recheck candidates and cannot blindly trust this review file.
```

So the workflow is:

```text
inventory checklist -> visual contact sheet -> candidate groups -> transcript pass with local recheck
```

not:

```text
inventory checklist -> final source of truth
```

---

## Candidate count

```text
R08 coordinate candidates: 51
```

Group counts:

```text
R08A QueryClient / QueryFilters / core methods: 17
R08B refetch / cancel options / cache helpers: 21
R08C QueryClient outside React / setQueriesData shape discipline: 10
R08D or neighbor low-level cache/resume paused: 2
Already processed R07 overlap: 2
```

---

## R08A - next transcript pass

Candidate sources:

```text
S-123, S-124, S-125, S-138, S-139, S-144, S-151, S-154, S-158, S-161, S-164, S-168, S-173, S-177, S-183, S-185, S-206
```

Theme:

```text
QueryClient basics, QueryFilters, invalidateQueries, setQueryData, getQueryData, prefetchQuery, refetchQueries, remove/reset queries, predicate filters.
```

Why R08A first:

```text
It contains the QueryClient/methods column that was already reserved during the R07 audit.
It is coherent and smaller than full R08.
```

---

## R08B - later pass

Candidate sources:

```text
S-129, S-134, S-143, S-147, S-153, S-167, S-169, S-175, S-178, S-182, S-190, S-191, S-193, S-197, S-198, S-200, S-204, S-207, S-212, S-216, S-219
```

Theme:

```text
fetch/refetch filters, cancel options, optimistic update helpers, getQueryCache/getMutationCache.
```

---

## R08C - later pass

Candidate sources:

```text
S-127, S-133, S-135, S-141, S-149, S-155, S-160, S-170, S-179, S-187
```

Theme:

```text
QueryClient outside React, shared client instances, setQueriesData oldData shape, avoiding mixed shapes, query key discipline.
```

---

## Checked overlap / excluded from R08 transcript ownership

```text
S-184 -> already R07 v004
S-186 -> already R07 v004
```

These are in the coordinate band but are not R08 transcript sources.

---

## Contact sheets

```text
audit-assets/R08-all-candidates-contact-sheet.png
audit-assets/R08A-queryclient-methods-core-contact-sheet.png
audit-assets/R08B-refetch-cancel-options-contact-sheet.png
audit-assets/R08C-qc-outside-react-shapes-contact-sheet.png
```

---

## Next action

Do not start a new unrelated region.

Next archive should be:

```text
ai-conspects-react-query-rquery-stage4k-r08a-queryclient-methods-transcript-v001.zip
```

It should process R08A only and include its own `0.2 Coverage / boundary review`.
