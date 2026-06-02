# Current Source of Truth - ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction

Generated: 2026-06-02 09:27:07 UTC

## Current status

```text
Stage0: source materialized
Stage1: large boundary review done
Stage2: NEXT01 transcript done
Stage3: NEXT02 / CTXDB03 transcript done
```

## Verified transcripts

```text
CTXDB01: DatabaseFacade methods / connectivity / ensure-created-deleted / migrations
CTXDB02: Automatic transactions / CurrentTransaction / AutoSavepointsEnabled
CTXDB03: SaveChanges value generation / batching / performance / ChangeTracker.Clear / short-lived DbContext
```

## Current candidate regions

```text
CTXDB04: SaveChanges transaction lifecycle / flush / rollback scope
CTXDB05: IDbContextTransaction / GetDbTransaction / UseTransaction / ADO.NET / shared local transaction
CTXDB06: DbConnection / open connection / SetDbConnection / command timeout / provider helpers
CTXDB07: Manual DbContext creation / options / DI / multiple contexts
```

## Current next step

```text
NEXT03 transcript:
CTXDB04 + CTXDB05
52 images
```

## Rules

```text
Inventory/ledger are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript must visually recheck source images.
Keep subregion boundaries inside large archives.
Use tar.exe -xf for large archives on Windows.
```
