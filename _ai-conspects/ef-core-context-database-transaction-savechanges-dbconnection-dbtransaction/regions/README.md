# Regions - EF Core context/database/transactions

Verified transcripts:

```text
CTXDB01 - DatabaseFacade methods / connectivity / ensure-created-deleted / migrations
CTXDB02 - Automatic transactions / CurrentTransaction / AutoSavepointsEnabled
```

Boundary-reviewed candidate regions still pending transcript:

```text
CTXDB03 - SaveChanges value generation / batching / performance / ChangeTracker.Clear / short-lived DbContext
CTXDB04 - SaveChanges transaction lifecycle / flush / rollback scope
CTXDB05 - IDbContextTransaction / GetDbTransaction / UseTransaction / ADO.NET / shared local transaction
CTXDB06 - DbConnection / open connection / SetDbConnection / command timeout / provider helpers
CTXDB07 - Manual DbContext creation / options / DI / multiple contexts
```

Recommended transcript order:

```text
NEXT02: CTXDB03
NEXT03: CTXDB04 + CTXDB05
NEXT04: CTXDB06 + CTXDB07
```

Each transcript must include:

```text
## 0.1 Area overview / key ideas / reading quality
## 0.2 Coverage / boundary review
```
