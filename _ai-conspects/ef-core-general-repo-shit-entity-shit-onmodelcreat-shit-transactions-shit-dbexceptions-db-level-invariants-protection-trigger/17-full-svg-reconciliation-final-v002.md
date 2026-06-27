# Stage 17 — full SVG reconciliation and final coverage v002

Generated: 2026-06-27 UTC

## Direction check

Goal:
Rebuild EF Core General coverage against the corrected complete SVG rather than trusting the historical closure produced from an incomplete export.

Done before this archive:
- Stage16 restored the complete source: 256 image definitions / 259 image uses / 132 text groups.
- The earlier recovered-transcript pass A archive was prepared but was not applied.

This archive:
- supersedes that unapplied pass-A archive;
- rechecks the original 65 image uses in the context of the complete SVG;
- reviews all 194 recovered image uses;
- maps every image placement and every text group to a final semantic region;
- explicitly records duplicate placements and the one out-of-boundary screenshot;
- replaces the old incomplete-source closure with a complete-source closure audit.

## Source identity

```text
source: source/source-complete-v002.svg
SHA-256: 3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd
unique image definitions: 256
image uses: 259
text groups: 132
```

## Complete coverage verdict

```text
direct verified semantic transcript uses: 255
duplicate placements covered by primary use: 3
explicit boundary exclusions/reassignments: 1
total accounted image uses: 259 / 259

covered text groups: 132 / 132
unresolved image uses: 0
unmapped image uses: 0
unresolved labels: 0
bad placeholder/OCR-error image rows: 0
```

The seven navigation-only labels consisting of punctuation such as `!!!!` do not close coverage by themselves. They are marked as navigation placeholders and are covered through nearby reviewed screenshots.

## Reconciliation of historical work

The original `S-001..S-065` set was visually rechecked against the complete SVG. Historical EFC-R01..R05 transcripts remain useful background, but they are superseded for closure by FR01..FR07.

One material boundary correction was required:

```text
S-006 -> X01
```

`S-006` is a Vite proxy / redirect / CORS screenshot, not EF Core material. It is explicitly accounted for and reassigned to the proxy/server/Vite proxy conspect rather than silently treated as EF Core evidence.

All other original uses were mapped into the new final regions. Newly recovered screenshots supply the missing context for tracking cost, transaction retry, constraints, triggers, provider error codes, savepoints, and query row multiplication.

## Final regions

- `FR01` — Tracking, query materialization, identity resolution, and warm-context reads: 32 uses, 13 labels, unresolved 0.
- `FR02` — Entity materialization, constructors, Attach, and detached graphs: 8 uses, 6 labels, unresolved 0.
- `FR03` — Model configuration, owned/complex values, keys, and aggregate relationships: 16 uses, 9 labels, unresolved 0.
- `FR04` — Transactions, execution strategies, raw SQL, isolation, and whole-operation retry: 62 uses, 25 labels, unresolved 0.
- `FR05` — Database invariants, constraints, keys, indexed views, procedures, and triggers: 85 uses, 37 labels, unresolved 0.
- `FR06` — Optimistic concurrency, provider exceptions, SQL Server codes, and savepoints: 43 uses, 37 labels, unresolved 0.
- `FR07` — Query shape, Include/Load choices, cartesian expansion, and row-count reasoning: 12 uses, 5 labels, unresolved 0.
- `X01` — Explicit source-boundary exclusions and reassignment: 1 uses, 0 labels, unresolved 0.

## Duplicate placement crosswalk

```text
S-045  -> duplicate placement of S-026 (same fileId)
NU-102 -> duplicate placement of NU-071 (same fileId)
NU-103 -> duplicate placement of NU-072 (same fileId)
```

The placements remain in the matrix because location/context is part of the SVG audit, but transcript evidence is linked to the primary reviewed image.

## Files

```text
transcripts/fr01-tracking-query-materialization-v002.md
transcripts/fr02-constructors-attach-graphs-v002.md
transcripts/fr03-model-owned-complex-relationships-v002.md
transcripts/fr04-transactions-retries-rawsql-v002.md
transcripts/fr05-invariants-constraints-triggers-v002.md
transcripts/fr06-concurrency-provider-errors-v002.md
transcripts/fr07-query-shape-row-count-v002.md
transcripts/x01-boundary-exclusions-v002.md

data/full-use-coverage-v002.json
data/full-use-coverage-v002.csv
data/full-label-coverage-v002.json
data/full-label-coverage-v002.csv
data/full-duplicate-use-crosswalk-v002.json
data/full-closure-audit-v002.json
data/full-closure-audit-v002.csv
```

## Precision policy

The transcript is source-level semantic coverage. Exact punctuation for long C#/SQL samples remains in the preserved PNG assets and complete SVG. No source is marked covered solely from a nearby label.
