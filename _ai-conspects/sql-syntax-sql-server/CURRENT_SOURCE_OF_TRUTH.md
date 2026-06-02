# Current Source of Truth - SQL Syntax / SQL Server

Generated: 2026-06-02 15:17:16 UTC

## Policy

Inventory/ledger is checklist only, not source of truth.

A region is complete only after visual/semantic boundary review and verified transcript.

## Current status

```text
Stage0 boundary review: done
Next: P01/R01R02 transcript after local boundary recheck
```

## Current split policy

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```

## Proposed movement map

```text
P01/R01R02:
Server/database admin and security:
CREATE DATABASE, master/model/GO/system databases/file options + login/user/roles/permissions.

P02/R03R04:
Procedural SQL + DML/output/error handling:
stored procedures, BEGIN/END, IF, DECLARE, SET/SELECT, output params, rowversion,
CREATE TABLE, INSERT/UPDATE/DELETE, INSERTED/DELETED, variables, @@ROWCOUNT, TRY/CATCH.

P03/R05:
Upsert/merge + DDL objects:
MERGE/upsert, transactions, indexes, ALTER TABLE, constraints, views/indexed views.
```

## Next pass

```text
P01 / R01R02:
database creation/master/model/GO/file options + security/login/user/roles/permissions.
```
