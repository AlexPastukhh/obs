# Image Coverage and Region Completion Workflow

Generated: 2026-06-01 21:14:24 UTC

## Core rule

No image may disappear, but no mapping file may decide final boundaries.

The review ledger exists to prevent forgetting images. It is not authoritative.

## Required workflow

For every region:

```text
1. Start from heading/topic and seed images.
2. Pull candidates from review ledger.
3. Re-scan nearby x/y coordinates.
4. Re-scan vertical roads/columns.
5. Re-scan parallel columns.
6. Check visually close images even if no arrows point to them.
7. Read candidate images enough to judge semantic fit.
8. Include/exclude/reassign with reasons.
9. Update region file coverage section.
10. Update ledger/status.
```

## Nearby image rule

Every visually/coordinate-close image must be checked by meaning.

No arrow is required for a nearby image to be considered a candidate.

## Completion rule

A region cannot be `completed` merely because:

```text
Stage2 said so
the ledger suggested candidates
a region box ended
nearest label changed
a screenshot was UNASSIGNED
```

It is completed only after explicit boundary review in the region transcript.
