# Current Source of Truth - ChangeTracker

Generated: 2026-06-02 14:38:25 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 ChangeTracker core methods/properties/detection/cascade/debug behavior: transcript v001 done
R01 correction: S001-S003 ChangeTracker overview/core members v002 done
R02 EntityEntry properties/methods/query/navigation/value APIs: transcript v001 done
R03 TrackGraph / NodeState / member API helpers: transcript v001 done
R04 ChangeTracker events / Tracking / Tracked / state changes: transcript v001 done
Final coverage audit: next
```

## Stage3 boundary decisions

```text
R03 included:
23 image uses

R04 included:
20 image uses

Checked-not-reprocessed:
S-081, S-082
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
Final coverage audit:
verify every known image use is processed/corrected/recorded and no candidate-needs-boundary-review remains.
```
