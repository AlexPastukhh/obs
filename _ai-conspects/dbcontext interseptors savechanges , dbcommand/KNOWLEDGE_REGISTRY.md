# Knowledge Registry - dbcontext interseptors savechanges , dbcommand

Source workspace: `_ai-conspects/dbcontext interseptors savechanges , dbcommand/`

Authoritative processed source: `06-stage6-corrected-source-preserving-transcript-v003.md`

Region files:
- `regions/R01-savechanges-lifecycle-event-data-and-successful-auditing.md`
- `regions/R02-save-suppression-alternate-results-and-outcome-reporting.md`
- `regions/R03-failure-concurrency-and-cancellation.md`
- `regions/R04-dbcommand-categories-callbacks-and-result-shapes.md`
- `regions/R05-dbcommand-metadata-registration-mutation-and-suppression.md`

Original SVG: `source/source-complete-v002.svg` (59 embedded assets, 59 image uses, 18 SVG text nodes)

---

## Coverage map

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| `ISaveChangesInterceptor` interface; `SaveChangesInterceptor` base class; why use base class | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| Common uses: auditing CreatedAt/UpdatedAt, soft delete, multi-tenant stamping, validation, post-save reaction, GUID concurrency token | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| Five lifecycle phases and their callback names (SavingChanges, SavedChanges, SaveChangesFailed, ThrowingConcurrencyException, SaveChangesCanceled) | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| Event data types by phase: `DbContextEventData`, `SaveChangesCompletedEventData`, `DbContextErrorEventData`, `ConcurrencyExceptionEventData`; `eventData.Context` property | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| `SavingChanges` / `SavingChangesAsync` signatures, parameters, normal return unchanged | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| ChangeTracker inspection in `SavingChangesAsync`; enumerate `context.ChangeTracker.Entries()` | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| `AuditSaveChangesInterceptor`: Added sets CreatedAt+UpdatedAt; Modified sets UpdatedAt; null context guard | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| `SavedChanges` / `SavedChangesAsync` signatures; `result` = affected-row count; normal return forms `new(result)` / `ValueTask.FromResult(result)` | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| Post-save success logging example: context name, timestamp, row count | `ef-core.savechanges-interceptor-lifecycle-and-audit` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-lifecycle-and-audit.md` | MAPPED |
| Suppression only in pre-save callbacks; `SavedChanges*` cannot undo completed save and is still called after a suppressed save; generalization across EF interception | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| `InterceptionResult<T>`: HasResult, SuppressWithResult; whole-save suppression example returning 0 | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| Return type cannot change through interception; caller always receives `int` | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| Scoped `SaveOutcome` marker service pattern; four side channels (sentinel int, scoped service, log/event, throw); why scoped is clearer | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| Post-save result modification example (`result + 1000`); actual DB work unchanged; usually bad practice | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| `SaveChangesFailed` / `SaveChangesFailedAsync`: `DbContextErrorEventData`; Context + Exception; `FailureLoggingInterceptor` example; returns `Task.CompletedTask` | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| `ThrowingConcurrencyException*`: `ConcurrencyExceptionEventData`; Context, Exception, Entries; relational cast; return unchanged vs `InterceptionResult.Suppress()` | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| Concurrency vs failure callback ordering; suppression changes failure path | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| Idempotent concurrency suppression scenarios; `SuppressConcurrencyInterceptor` example | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| Post-suppression follow-up policy: reload, detach, mark unchanged, domain status; narrow idempotent delete example | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| `SaveChangesCanceled` / `SaveChangesCanceledAsync`: `DbContextEventData`; logging/metrics/cleanup; returns `Task.CompletedTask`; not a result-replacement point | `ef-core.savechanges-interceptor-suppression-and-failure` | ef-core | `../_knowledge/ef-core/savechanges-interceptor-suppression-and-failure.md` | MAPPED |
| `DbCommandInterceptor` vs `SaveChangesInterceptor`: abstraction level; four capabilities of command interception | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| Three command categories (Reader/Scalar/NonQuery) and callback families; result types DbDataReader/object/int; why scalar is `object` | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| Command event data types: `CommandEventData`, `CommandExecutedEventData`, `CommandErrorEventData`; `CommandEndEventData` after execution | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| `HasResult` semantics for incoming result parameter before execution | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| Reader/Scalar/NonQuery logging examples (pre + post); `ReaderExecuting`, `ScalarExecuting`/`ScalarExecuted`, `NonQueryExecuting`/`NonQueryExecuted` | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| SQL mutation via `command.CommandText`; `TaggingInterceptor` example; valid use cases; provider caution | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| Command suppression: `SuppressWithResult` for scalar and non-query; forbidden_table deny example; use cases | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| `AddInterceptors` registration in DI; resolving interceptor from `sp` | `ef-core.dbcommand-interceptor-callbacks-and-sql-mutation` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-callbacks-and-sql-mutation.md` | MAPPED |
| Common event data properties: Command, Context, CommandId, Connection, ConnectionId, CommandSource | `ef-core.dbcommand-interceptor-event-data-and-command-properties` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-event-data-and-command-properties.md` | MAPPED |
| Meaning of CommandId/ConnectionId/Connection/CommandSource; four-question intuition summary | `ef-core.dbcommand-interceptor-event-data-and-command-properties` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-event-data-and-command-properties.md` | MAPPED |
| `CommandSource` enumeration values; `NonQueryExecuting` source-discrimination example | `ef-core.dbcommand-interceptor-event-data-and-command-properties` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-event-data-and-command-properties.md` | MAPPED |
| DbCommand property shortlist (CommandText, CommandType, CommandTimeout, Parameters, Transaction + Connection); full property table; DesignTimeVisible/UpdatedRowSource irrelevant | `ef-core.dbcommand-interceptor-event-data-and-command-properties` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-event-data-and-command-properties.md` | MAPPED |
| Practical property-to-SQL mapping example; DbCommand as base class; provider subclasses: SqlCommand, NpgsqlCommand, SqliteCommand | `ef-core.dbcommand-interceptor-event-data-and-command-properties` | ef-core | `../_knowledge/ef-core/dbcommand-interceptor-event-data-and-command-properties.md` | MAPPED |
| `00-source-check-and-boundary-review.md`, `01-final-coverage-transcript.md`, `02-final-closure-audit.md`, `03-source-repair-full-svg-v002.md`, `04-full-svg-semantic-transcript-v002.md`, `05-independent-full-svg-audit-v002.md` — processing/audit artifacts | - | - | - | NON_LEARNING |
| `07-repetition-guide-v003.md` — repetition/question bank | - | - | - | NON_LEARNING |
| `APPLY_ARCHIVE.md`, `MANIFEST.md`, `MANIFEST_SOURCE_PRESERVING_V003.md`, `VALIDATION_SOURCE_PRESERVING_V003.json` — archive/manifest metadata | - | - | - | NON_LEARNING |
| `assets/`, `audit-assets/`, `data/` directories — source images and audit assets | - | - | - | NON_LEARNING |

---

## Summary

| Status | Count |
|---|---:|
| MAPPED | 33 |
| MERGED | 0 |
| NON_LEARNING | 4 |
| UNRESOLVED | 0 |
