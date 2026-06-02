# Current Source of Truth - SQL Syntax / SQL Server

Generated: 2026-06-02 16:13:44 UTC

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
Final coverage audit: done
```

## Final audit verdict

```text
total image uses: 133
covered image uses: 133
problem image uses: 0
verdict: coverage-complete
```

## Closure note

```text
The sql-syntax-sql-server conspect is complete unless later manual review finds a concrete transcript-quality issue or a specific misassigned image.
```

## Current split policy for future conspects

```text
Default: 50-80 images.
Can be bigger: 80-120 if the road is coherent.
Exception: 120+ only on explicit request or one very cohesive road.
```
