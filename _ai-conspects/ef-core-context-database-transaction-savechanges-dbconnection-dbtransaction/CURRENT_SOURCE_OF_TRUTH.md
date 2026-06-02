# Current Source of Truth - ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction

Generated: 2026-06-02 12:00:16 UTC

## Current status

```text
Status: complete

Stage0: source materialized
Stage1: large boundary review done
Stage2: NEXT01 transcript done
Stage3: NEXT02 / CTXDB03 transcript done
Stage4: NEXT03 / CTXDB04 + CTXDB05 transcript done
Stage5: NEXT04 / CTXDB06 + CTXDB07 transcript done
Stage6: final closure/audit done
```

## Final coverage

```text
Expected image uses: 198
Processed image uses: 198
Missing: 0
Duplicates: 0
Extra: 0
Unreviewed: 0
Candidate-only: 0
Region mismatches: 0
```

## Verified transcripts

```text
CTXDB01: DatabaseFacade methods / connectivity / ensure-created-deleted / migrations
CTXDB02: Automatic transactions / CurrentTransaction / AutoSavepointsEnabled
CTXDB03: SaveChanges value generation / batching / performance / ChangeTracker.Clear / short-lived DbContext
CTXDB04: SaveChanges transaction lifecycle / flush / rollback scope
CTXDB05: IDbContextTransaction / GetDbTransaction / UseTransaction / ADO.NET / shared local transaction
CTXDB06: DbConnection / open connection / SetDbConnection / command timeout / provider helpers
CTXDB07: Manual DbContext creation / options / DI / multiple contexts
```

## Current candidate regions

```text
none
```

## Current next step

```text
none for this conspect
```

## Rules

```text
Inventory/ledger are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript visually rechecked source images during its pass.
Use tar.exe -xf for large archives on Windows.
```
