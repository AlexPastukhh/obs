# Stage 4t - R03 + R04 Boundary Review and Split Plan v001

Generated: 2026-06-01 23:54:56 UTC

## Direction check

Goal:
Increase processing size safely after closing R02.

Done:
R02 is closed by closure audit. R03 and R04 are still unprocessed.

This step:
Create a combined boundary review for R03 + R04.

Why:
The user asked to try taking multiple areas at once / roughly double the step size. This is safe at boundary-review level because we can inspect the full candidate set and still keep transcript outputs separated by region.

Next:
Try a combined transcript archive for R03 + R04A, with separate region files.

---

## Scope

```text
Formal R03 candidates: 7
Formal R04 candidates: 35
Inbound R02 -> R04 overlap: S-062
Combined review items including inbound: 43
```

This is larger than the last single-region R02 closure flow, but still controlled because it is only boundary review.

---

## R03 group

Sources:

```text
S-029, S-035, S-041, S-046, S-055, S-058, S-059
```

Meaning:

```text
notifyOnChangeProps, select, structural sharing, narrowing re-renders, and related side notes.
```

Candidate status:

```text
provisional until R03 transcript
```

---

## R04A group

Sources:

```text
S-062, S-063, S-067, S-068, S-069, S-070, S-071, S-073, S-074, S-075, S-076, S-077, S-079, S-082, S-084, S-087, S-088, S-090, S-091, S-095, S-097, S-098, S-099, S-103, S-104
```

Meaning:

```text
staleTime, invalidation, stale vs fresh, refetch triggers, static staleTime,
retry / no auto retry on mount, and when static can still refetch on explicit trigger.
```

Important:

```text
S-062 is included here as inbound from R02. It was deliberately not processed in R02.
```

Candidate status:

```text
provisional until R04A transcript
```

---

## R04B group

Sources:

```text
S-072, S-078, S-081, S-086, S-089, S-092, S-096, S-100, S-102, S-105, S-107
```

Meaning:

```text
observer/rerender mechanics, structural sharing, inactive cache / gcTime,
refetchInterval, cache lifecycle and related refetch behavior.
```

Candidate status:

```text
reserved for later R04B transcript
```

---

## Already processed neighbor

```text
R05 pagination/infinite-query sources remain R05, not R04:
S-080, S-083, S-085, S-093, S-094, S-101, S-106, S-108, S-111, S-112
```

---

## Contact sheets

```text
audit-assets/R03-R04-all-candidates-contact-sheet.png
audit-assets/R03-all-candidates-contact-sheet.png
audit-assets/R04A-staleness-static-refetch-retry-contact-sheet.png
audit-assets/R04B-observer-cache-gctime-refetchinterval-contact-sheet.png
```

---

## Next action

Recommended next archive:

```text
ai-conspects-react-query-rquery-stage4u-r03-r04a-transcripts-v001.zip
```

Planned content:

```text
regions/R03-notify-select-structural-sharing.md
regions/R04A-staleness-static-refetch-retry.md
```

Important:

```text
This can be one archive, but not one mixed region file.
R03 and R04A should remain separate region transcripts.
```

If the diff feels too large, split it into:

```text
R03 transcript first
R04A transcript second
```
