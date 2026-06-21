# Stage2 Deprecated

Generated: 2026-06-01 21:14:24 UTC

## Direction check

Goal:
Prevent the old Stage2 mapping from confusing future React Query processing.

Now:
Stage2 was useful as coordinate extraction, but it was wrong as a source of truth for region boundaries.

This step:
Deprecate Stage2 and replace it with a review-ledger workflow.

Why:
R01 proved that Stage2 missed the real two-column vertical browser/cache road.

Next:
Use the review ledger only as a checklist, then perform fresh visual/semantic boundary review for each region.

---

## What Stage2 was

Stage2 was an AI-created heuristic mapping:

```text
image coordinates + nearest labels -> guessed region_id
```

It was not part of the original Obsidian/Excalidraw source.

It must not be used as:

```text
source of truth for region boundaries
source of truth for completion status
proof that UNASSIGNED images are unrelated
```

---

## What replaces it

Use this as a work queue, not as final truth:

```text
data/react-query-image-review-ledger-v2.csv
data/react-query-image-review-ledger-v2.json
```

The new ledger keeps all image IDs and coordinates visible, but all decisions remain provisional.

---

## Required review

Before any region is completed, recheck:

```text
candidate list
nearby x/y images
vertical roads and columns
parallel columns
visually close images even without arrows
semantic fit after reading
```
