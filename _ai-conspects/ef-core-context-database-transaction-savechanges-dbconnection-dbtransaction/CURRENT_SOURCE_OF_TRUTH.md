# Current Source of Truth - ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction

Generated: 2026-06-02 11:25:47 UTC

## Current status

```text
Stage0: source materialized
Stage1: large boundary review done
Stage2: NEXT01 transcript done
Stage3: NEXT02 / CTXDB03 transcript done
Stage4: NEXT03 / CTXDB04 + CTXDB05 transcript done
```

## Verified transcripts

```text
CTXDB01: DatabaseFacade methods / connectivity / ensure-created-deleted / migrations
CTXDB02: Automatic transactions / CurrentTransaction / AutoSavepointsEnabled
CTXDB03: SaveChanges value generation / batching / performance / ChangeTracker.Clear / short-lived DbContext
CTXDB04: SaveChanges transaction lifecycle / flush / rollback scope
CTXDB05: IDbContextTransaction / GetDbTransaction / UseTransaction / ADO.NET / shared local transaction
```

## Current candidate regions

```text
CTXDB06: DbConnection / open connection / SetDbConnection / command timeout / provider helpers
CTXDB07: Manual DbContext creation / options / DI / multiple contexts
```

## Current next step

```text
NEXT04 transcript:
CTXDB06 + CTXDB07
43 images
```

## Rules

```text
Inventory/ledger are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript must visually recheck source images.
Keep subregion boundaries inside large archives.
Use tar.exe -xf for large archives on Windows.
```
