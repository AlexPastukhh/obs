# Current Source of Truth - ChangeTracker

Generated: 2026-06-02 12:20:29 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
Next: P01/R01 transcript after local boundary recheck
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Proposed movement map

```text
P01/R01:
ChangeTracker methods/properties and detection/cascade/debug behavior.

P02/R02:
EntityEntry properties/methods/query/navigation/value APIs.

P03/R03R04:
TrackGraph/NodeState/member API plus ChangeTracker events tail, with internal sections preserved.
```

## Next pass

```text
P01 / R01:
HasChanges, DetectChanges, Clear, AutoDetectChangesEnabled, QueryTrackingBehavior, cascade/delete timings, AcceptAllChanges, DebugView.
```
