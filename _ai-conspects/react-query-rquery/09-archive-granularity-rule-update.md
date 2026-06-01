# Archive Granularity Rule Update

This project should not use one user-facing archive per small screenshot batch.

## Correct granularity

Use these archive scopes:

```text
protocol update: one archive
stage map/index: one archive
screenshot mapping: one archive
one full region transcript draft: one archive
one full region consolidation/correction: one archive
whole-conspect final assembly: one archive
```

## Incorrect default granularity

Do not default to:

```text
one archive per 8–10 screenshots
one archive per tiny verification batch
one archive per minor overlay
```

Small internal batches are allowed while working, but the delivered archive should normally be per region.

## Current region

For `R10 — Mutations`, this archive creates the consolidated per-region file:

```text
_ai-conspects/react-query-rquery/regions/R10-mutations.md
```

Verified so far:

```text
MUT-S001–MUT-S018
```

Pending:

```text
MUT-S019–MUT-S036
```

Next update should be another per-region consolidation/correction archive that completes the pending sources.
