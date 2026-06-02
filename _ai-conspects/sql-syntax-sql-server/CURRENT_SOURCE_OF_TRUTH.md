# Current Source of Truth - SQL Syntax / SQL Server

Generated: 2026-06-02 16:03:30 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 database creation / master / model / GO / files: transcript v001 done
R02 login / user / roles / permissions: transcript v001 done
R03 stored procedures / output params / control flow / rowversion: transcript v001 done
R04 core table / DML / OUTPUT / variables / TRY-CATCH: transcript v001 done
R05 upsert / MERGE / transactions / indexes / ALTER / constraints / views: transcript v001 done
Final coverage audit: next
```

## P03 boundary decisions

```text
R05 included:
31 image uses

Checked-not-P03, already R04:
S-071, S-081, S-109, S-129
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
