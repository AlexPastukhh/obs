# Knowledge Registry - EF Core context, database, transaction, SaveChanges, DbConnection

Workspace: `_ai-conspects/ef-core-context-database-transaction-object-savechanges-dbconnection-dbtransaction/`

## Authoritative source

- Authoritative processed sources: `regions/CTXDB01-databasefacade-connectivity-migrations.md` through `regions/CTXDB07-manual-dbcontext-options-di-multiple-contexts.md`, as enumerated by `CURRENT_SOURCE_OF_TRUTH.md`

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| DatabaseFacade API surface, CanConnect reachability, EnsureCreated/EnsureDeleted, Migrate, migration inspection, HasPendingModelChanges | `ef-core.databasefacade-connectivity-and-migrations` | `ef-core` | `../_knowledge/ef-core/databasefacade-connectivity-and-migrations.md` | MAPPED |
| AutoTransactionBehavior (WhenNeeded default, Always, Never) and when EF creates its own explicit transaction | `ef-core.autotransaction-currenttransaction-and-autosavepoints` | `ef-core` | `../_knowledge/ef-core/autotransaction-currenttransaction-and-autosavepoints.md` | MAPPED |
| CurrentTransaction ownership pattern, AutoSavepointsEnabled, explicit business-phase savepoints | `ef-core.autotransaction-currenttransaction-and-autosavepoints` | `ef-core` | `../_knowledge/ef-core/autotransaction-currenttransaction-and-autosavepoints.md` | MAPPED |
| SaveChanges flush lifecycle, transaction state in database engine, Add vs SaveChanges vs Commit vs Rollback distinction | `ef-core.savechanges-flush-lifecycle-and-rollback-scope` | `ef-core` | `../_knowledge/ef-core/savechanges-flush-lifecycle-and-rollback-scope.md` | MAPPED |
| IDbContextTransaction API (Commit, Rollback, CreateSavepoint, RollbackToSavepoint, ReleaseSavepoint, SupportsSavepoints, TransactionId), GetDbTransaction, raw ADO.NET sharing | `ef-core.idbcontext-transaction-savepoints-and-dbtransaction-interop` | `ef-core` | `../_knowledge/ef-core/idbcontext-transaction-savepoints-and-dbtransaction-interop.md` | MAPPED |
| DbConnection lifecycle (GetDbConnection, OpenConnection, SetDbConnection, connection disposal, SetConnectionString), command timeout, System.Transactions enlistment, provider helpers, GenerateCreateScript | `ef-core.dbconnection-lifetime-setdbconnection-and-timeouts` | `ef-core` | `../_knowledge/ef-core/dbconnection-lifetime-setdbconnection-and-timeouts.md` | MAPPED |
| Manual DbContext construction, DbContextOptions, DI lifetime, multiple DbContext instances sharing one connection and transaction via UseTransaction | `ef-core.manual-dbcontext-and-multi-context-patterns` | `ef-core` | `../_knowledge/ef-core/manual-dbcontext-and-multi-context-patterns.md` | MAPPED |
| SaveChanges-generated value mechanisms: identity, sequence/default constants and SQL expressions, `OUTPUT INSERTED`/`DELETED`, computed columns, triggers, updated-at values, `rowversion`, and database-versus-provider/client generation including non-PK and sequential GUIDs | `ef-core.savechanges-generated-values-batching-and-changetracker` | `ef-core` | `../_knowledge/ef-core/savechanges-generated-values-batching-and-changetracker.md` | MAPPED |
| Intermediate flushes, parent/child key fix-up, large-import chunking, ChangeTracker memory, `ChangeTracker.Clear`, short-lived/separate contexts, and manual savepoints for business phases | `ef-core.savechanges-generated-values-batching-and-changetracker` | `ef-core` | `../_knowledge/ef-core/savechanges-generated-values-batching-and-changetracker.md` | MAPPED |
| SaveChangesInterceptor lifecycle and outer-transaction boundary: SaveChanges success and command execution can both precede a later rollback | `ef-core.savechanges-interceptor-lifecycle-and-audit` | `ef-core` | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MERGED |
| No-command boundary and audit danger: SaveChanges callbacks can run when failure occurs before SQL and command interceptors do not; neither callback proves durable commit for audit/event publishing | `ef-core.savechanges-interceptor-lifecycle-and-audit` | `ef-core` | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MERGED |
| Processing and audit artifacts (00-stage0-source-check.md, 01-stage1-large-boundary-review.md, 02-stage2-next01-ctxdb01-ctxdb02-transcript.md, 03-stage3-next02-ctxdb03-transcript.md, 04-stage4-next03-ctxdb04-ctxdb05-transcript.md, 05-stage5-next04-ctxdb06-ctxdb07-transcript.md, 06-stage6-final-closure-audit.md) | - | - | - | NON_LEARNING |
| Archive and manifest metadata (APPLY_ARCHIVE.md, MANIFEST.md) | - | - | - | NON_LEARNING |
| Source and audit assets (assets/, audit-assets/, data/) | - | - | - | NON_LEARNING |

## Boundary decisions

### Unit boundaries
The workspace content was split into 7 knowledge units based on semantic coherence:
- DatabaseFacade and connectivity (CTXDB01)
- Automatic transactions, CurrentTransaction, AutoSavepointsEnabled (CTXDB02)
- Generated values, batching, ChangeTracker.Clear (CTXDB03)
- SaveChanges flush/lifecycle and rollback scope (CTXDB04)
- IDbContextTransaction, savepoints, GetDbTransaction, raw ADO.NET interop (CTXDB05)
- DbConnection lifecycle and provider helpers (CTXDB06)
- Manual DbContext construction and multi-context patterns (CTXDB07)

### Existing overlap
CTXDB03 contains interceptor lifecycle claims (SaveChanges vs command interceptor, rollback boundary, audit/event publishing danger) that overlap with the existing unit `ef-core.savechanges-interceptor-lifecycle-and-audit` from the `dbcontext interseptors savechanges , dbcommand` workspace. Those claims are dispositioned as MERGED into that existing unit. The batching, generated values, and ChangeTracker portion from CTXDB03 was migrated into a new unit from this workspace.

CTXDB03 briefly mentions command interceptors in the SaveChanges lifecycle context, but does not constitute a full treatment of DbCommandInterceptor callbacks, result shapes, or SQL mutation. No MERGED row is needed for `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation`.

### Multiple-context sharing
CTXDB05 and CTXDB07 both cover multi-context sharing. The API-level transaction object and raw ADO.NET interop were placed in the IDbContextTransaction unit; the manual construction and DI patterns were placed in the manual DbContext unit.

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     9 |
| MERGED       |     2 |
| NON_LEARNING |     3 |
| UNRESOLVED   |     0 |

Total mapping rows: 14
Distinct Knowledge IDs: 8 (7 new + 1 merged into existing)
