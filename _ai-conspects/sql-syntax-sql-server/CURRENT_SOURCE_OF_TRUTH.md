# Current Source of Truth - SQL Syntax / SQL Server

Generated: 2026-06-02 15:29:50 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
R01 database creation / master / model / GO / files: transcript v001 done
R02 login / user / roles / permissions: transcript v001 done
P02/R03R04 procedural SQL + DML/output/error handling: next
```

## P01 boundary decisions

```text
R01 included:
36 image uses

R02 included:
11 image uses

Checked-not-P01, reserved for P02/R03R04:
S-001, S-002, S-003, S-071, S-072
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P02 / R03R04:
stored procedures, BEGIN/END, IF, DECLARE, SET/SELECT, output params, rowversion,
CREATE TABLE, INSERT/UPDATE/DELETE, INSERTED/DELETED, variables, @@ROWCOUNT, TRY/CATCH.
```
