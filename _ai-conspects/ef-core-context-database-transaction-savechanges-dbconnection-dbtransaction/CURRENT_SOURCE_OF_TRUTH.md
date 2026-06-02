# Current Source of Truth - ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction

Generated: 2026-06-02 09:00:31 UTC

## Current status

```text
Stage0: source materialized
Stage1: large boundary review done
```

## Source material

```text
Raw SVG: assets/raw/full.svg
Image inventory: data/image-inventory-v001.csv
Text elements: data/text-elements-raw-v001.csv
Extracted images: assets/source-images/*.png
Stage1 boundary review: data/stage1-large-boundary-review-v001.csv
Stage1 ledger: data/image-review-ledger-v001.csv
```

## Candidate regions

```text
CTXDB01: DatabaseFacade methods / connectivity / ensure-created-deleted / migrations
CTXDB02: Automatic transactions / CurrentTransaction / AutoSavepointsEnabled
CTXDB03: SaveChanges value generation / batching / performance / ChangeTracker.Clear / short-lived DbContext
CTXDB04: SaveChanges transaction lifecycle / flush / rollback scope
CTXDB05: IDbContextTransaction / GetDbTransaction / UseTransaction / ADO.NET / shared local transaction
CTXDB06: DbConnection / open connection / SetDbConnection / command timeout / provider helpers
CTXDB07: Manual DbContext creation / options / DI / multiple contexts
```

## Current next step

```text
NEXT01 transcript:
CTXDB01 + CTXDB02
46 images
```

## Rules

```text
Inventory/ledger are checklists, not source of truth.
Nearest labels are coordinate hints only.
Every transcript must visually recheck source images.
Keep subregion boundaries inside large archives.
```
