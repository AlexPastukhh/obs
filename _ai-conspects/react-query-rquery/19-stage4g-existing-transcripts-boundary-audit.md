# Stage 4g - Existing Transcripts Boundary Audit v001

Generated: 2026-06-01 21:46:15 UTC

## Direction check

Goal:
Audit old React Query transcripts for missed images and wrong image ownership under the new boundary-review rules.

Now:
R01 was corrected by R01 v002. Remaining old transcripts are R05, R06, R07, and R10.

This step:
Do an audit checkpoint only. Do not rewrite all region transcripts in one archive.

Why:
Corrections should be done region-by-region after we know exactly what was missed.

Next:
1. Apply this audit archive.
2. Commit the audit.
3. Create correction archives in this order: R05 v002, R06 v002, R07 v004, R10 v006.

---

## Summary verdict

```text
R05: incomplete; missed S-114/S-115/S-116.
R06: incomplete; missed S-176.
R07: incomplete; missed S-184/S-186; QueryClient neighbor column likely belongs to R08.
R10: incomplete; missed S-240/S-241; duplicate image-use S-237/S-246 needs explicit coverage note.
```

Existing transcripts are still useful for the sources they include. The issue is boundary completeness, not that every transcribed source is wrong.

---

## R05 audit

Current transcript covered:

```text
S-080, S-083, S-085, S-093, S-094, S-101, S-106, S-108, S-111, S-112
```

Missed continuation images:

```text
S-114 -> useInfiniteQuery does not return one flat array; data shape pages/pageParams
S-115 -> 19.2 Load more button
S-116 -> flatten data.pages before rendering
```

Decision:

```text
R05 needs v002 correction.
```

Contact sheet:

```text
audit-assets/R05-audit-candidates-contact-sheet.png
```

---

## R06 audit

Current transcript covered:

```text
S-126, S-128, S-130, S-140, S-142, S-145, S-150, S-157, S-159, S-165
```

Missed continuation:

```text
S-176 -> 15.2 One query with Promise.all
```

Checked / not R06:

```text
S-132, S-146, S-162, S-171, S-180 -> R07 prefetch/staleTime/fetchQuery road, not R06
```

Decision:

```text
R06 needs v002 correction.
```

Contact sheet:

```text
audit-assets/R06-audit-candidates-contact-sheet.png
```

---

## R07 audit

Current transcript covered:

```text
S-117, S-120, S-131, S-132, S-146, S-152, S-162, S-163, S-171, S-172, S-180
```

Missed continuation:

```text
S-184 -> Fetch or ensure query data imperatively
S-186 -> Core difference: fetchQuery vs ensureQueryData
```

Checked neighbor column:

```text
S-124, S-138, S-144, S-154, S-164, S-173
```

These likely belong to the separate R08 QueryClient/methods area, not R07. Do not force them into R07 just because the old R07 title contained `useQueryClient`.

Decision:

```text
R07 needs v004 correction for S-184/S-186.
R08 should later process the QueryClient/methods column.
```

Contact sheet:

```text
audit-assets/R07-audit-candidates-contact-sheet.png
```

---

## R10 audit

Current transcript covered most mutation-area sources, but missed two mutation screenshots and one duplicate-use coverage issue.

Missed unique content:

```text
S-240 -> Where you may need it
S-241 -> Best mental model
```

Duplicate-use issue:

```text
S-237 and S-246 share the same fileId/content.
The optimistic update code example is transcribed, but both image placements must be recorded so S-237 does not disappear from coverage.
```

Decision:

```text
R10 needs v006 correction.
```

Contact sheet:

```text
audit-assets/R10-audit-candidates-contact-sheet.png
```

---

## Recommended correction order

```text
1. R05 v002 -> add S-114/S-115/S-116.
2. R06 v002 -> add S-176 and document R07 exclusions.
3. R07 v004 -> add S-184/S-186 and reserve QueryClient column for R08.
4. R10 v006 -> add S-240/S-241 and duplicate-use note S-237/S-246.
```

---

## Files added by this audit

```text
data/old-transcripts-boundary-audit-stage4g-v001.csv
data/old-transcripts-boundary-audit-stage4g-v001.json
audit-assets/R05-audit-candidates-contact-sheet.png
audit-assets/R06-audit-candidates-contact-sheet.png
audit-assets/R07-audit-candidates-contact-sheet.png
audit-assets/R10-audit-candidates-contact-sheet.png
```
