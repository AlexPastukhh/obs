# Stage 0 - SQL Syntax / SQL Server Boundary Review and Split Plan v001

Generated: 2026-06-02 15:17:16 UTC

## Done

- Parsed uploaded Excalidraw SVG.
- Extracted embedded PNG sources.
- Built image-use inventory and label inventory.
- Created first boundary/split plan.
- Created contact sheets and canvas map.

## Why this is not transcript yet

This SVG is medium-large and has several separate SQL roads:

```text
unique embedded images: 133
image uses on canvas: 133
text labels parsed: 194
```

A blind transcript would risk losing/misassigning screenshots. Stage0 is only inventory/checklist and split plan.

## Size policy for this conspect

```text
Default pass size: 50-80 image uses.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only when explicitly requested or when splitting breaks one cohesive road.
Inventory/ledger is not source of truth.
Transcript ownership is decided by visual/semantic boundary review.
```

## Proposed passes

| Pass | Count | Meaning |
|---|---:|---|
| P01-R01R02-server-database-admin-and-security | 47 | CREATE DATABASE, ON PRIMARY, LOG ON, file options, master/model/system DBs, GO, model defaults, multi-window/batch behavior. / SQL Server security hierarchy: login vs user, authentication vs authorization, fixed server/db roles, custom roles, GRANT/permissions. |
| P02-R03R04-procedural-dml-output-and-error-handling | 55 | Common SQL types, CREATE TABLE, GUID, FK/cascade, INSERT/UPDATE/DELETE, INSERTED/DELETED, variables, IF/IF EXISTS, @@ROWCOUNT, TRY/CATCH. / Stored procedures, BEGIN/END, IF, DECLARE, SET/SELECT assignment, output params, rowversion return patterns. |
| P03-R05-upsert-merge-alter-indexes-constraints-views | 31 | UPSERT/MERGE, IF EXISTS easier path, transactions, indexes, ALTER TABLE, add/drop/alter columns, constraints, primary/foreign/unique/default/check, views/indexed views. |

## Subregion counts

```text
R03-stored-proc-output-params-control-flow-rowversion: 23
R02-login-user-roles-permissions: 11
R01-database-creation-master-model-go-files: 36
R04-core-table-dml-output-variables-if-trycatch: 32
R05-upsert-merge-transactions-indexes-alter-constraints-views: 31
```

## Pass counts

```text
P01-R01R02-server-database-admin-and-security: 47
P02-R03R04-procedural-dml-output-and-error-handling: 55
P03-R05-upsert-merge-alter-indexes-constraints-views: 31
```

## Contact sheets

```text
audit-assets/contact-sheet-all-candidates-stage0.png
audit-assets/contact-sheet-P01-R01R02-server-database-admin-and-security.png
audit-assets/contact-sheet-P02-R03R04-procedural-dml-output-and-error-handling.png
audit-assets/contact-sheet-P03-R05-upsert-merge-alter-indexes-constraints-views.png
audit-assets/canvas-map-labels-and-image-boxes.png
```

## Important stage0 caveat

The split is a first visual/source-order reading.

Before each transcript pass, do a local boundary review and check neighbors. If a screenshot belongs to a previous/next section, record the correction instead of forcing it into the current pass.

## Next

Start with P01 after local boundary recheck:

```text
P01/R01R02:
server/database admin and security:
CREATE DATABASE, master/model/GO/system databases/file options + login/user/roles/permissions.
```
