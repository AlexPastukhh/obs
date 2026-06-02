# Current Source of Truth - SQL Syntax / SQL Server

Generated: 2026-06-02 15:45:53 UTC

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
P03/R05 upsert/merge + transactions/indexes/ALTER/constraints/views: next
```

## P02 boundary decisions

```text
R03 included:
23 image uses

R04 included:
32 image uses

Checked-not-P02:
S-024, S-033, S-034, S-070, S-082, S-083, S-108, S-130
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Next pass

```text
P03 / R05:
MERGE/upsert, IF EXISTS easier path, transactions, indexes, ALTER TABLE,
add/drop/alter columns, constraints, primary/foreign/unique/default/check,
views and indexed views.
```
