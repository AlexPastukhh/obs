# Current Source of Truth - ChangeTracker

Generated: 2026-06-02 13:06:29 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 ChangeTracker core methods/properties/detection/cascade/debug behavior: transcript v001 done
R01 correction: S001-S003 ChangeTracker overview/core members v002 done
R02 EntityEntry properties/methods/query/navigation/value APIs: transcript v001 done
P03/R03R04 TrackGraph / NodeState / member API + ChangeTracker events tail: next
```

## R02 boundary decisions

```text
Included in R02:
67 image uses

Corrected into R01 v002:
S-001, S-002, S-003
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P03 / R03R04:
TrackGraph, NodeState, graph traversal, member/property API helpers, ChangeTracker events.
```
