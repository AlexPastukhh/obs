# Current Source of Truth - ChangeTracker

Generated: 2026-06-02 12:47:24 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 ChangeTracker core methods/properties/detection/cascade/debug behavior: transcript v001 done
P02/R02 EntityEntry properties/methods/query/navigation/value APIs: next
```

## R01 boundary corrections

```text
Pulled into R01 from initial P03 candidate:
S-081, S-082

Checked-not-R01, reserved for R02:
S-001, S-036

Checked-not-R01, reserved for R03:
S-083, S-084
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P02 / R02:
EntityEntry State, Entity, Metadata, CurrentValues/OriginalValues, IsKeySet, Context, Entry.Query, navigations/references/collections/properties, Reload/GetDatabaseValues.
```
