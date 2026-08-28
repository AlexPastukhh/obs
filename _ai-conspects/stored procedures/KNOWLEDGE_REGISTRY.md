# Knowledge Registry

Source workspace: `_ai-conspects/stored procedures/`

Authoritative processed source: `01-final-transcript.md` (identical regional copy: `regions/R01R02R03R04R05-stored-procedures-corrected-final-v002.md`)

Original SVG: `source/stored procedures.svg`

Evidence and coverage: `data/final-coverage-audit-v002.json`; all 154 corrected image uses and all 108 native canvas labels are closed across R01-R05.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| Stable database API, execution-permission boundary, multi-step/round-trip/shared-contract benefits, deployment/composition costs and no automatic performance advantage | `sql-server` | `sql-server.stored-procedure-contracts-and-result-channels` | `../_knowledge/sql-server/stored-procedure-contracts-and-result-channels.md` | MAPPED |
| Basic T-SQL procedure shape and distinct result-set, output-parameter and integer `RETURN` channels | `sql-server` | `sql-server.stored-procedure-contracts-and-result-channels` | `../_knowledge/sql-server/stored-procedure-contracts-and-result-channels.md` | MAPPED |
| ADO.NET `CommandType.StoredProcedure` versus raw-text `EXEC`, reader/scalar/non-query selection, parameter setup and output availability after command/reader completion | `dotnet` | `dotnet.ado-net-command-execution-and-row-mapping` | `../_knowledge/dotnet/ado-net-command-execution-and-row-mapping.md` | MERGED |
| `SCOPE_IDENTITY()` scope boundary, generated-value return choices and `SET NOCOUNT ON` versus deliberate concurrency signals | `sql-server` | `sql-server.stored-procedure-contracts-and-result-channels` | `../_knowledge/sql-server/stored-procedure-contracts-and-result-channels.md` | MAPPED |
| EF Core `FromSql`/`SqlQuery` materialization versus `ExecuteSql` command execution and parameterized API choice | `ef-core` | `ef-core.stored-procedure-query-command-and-composition` | `../_knowledge/ef-core/stored-procedure-query-command-and-composition.md` | MAPPED |
| SQL Server `EXEC` non-composability, in-procedure filtering, materialize/client filtering, TVF/composable-SQL alternatives and `AsEnumerable` transfer cost | `ef-core` | `ef-core.stored-procedure-query-command-and-composition` | `../_knowledge/ef-core/stored-procedure-query-command-and-composition.md` | MAPPED |
| `InsertUsingStoredProcedure`/`UpdateUsingStoredProcedure`/`DeleteUsingStoredProcedure` mappings and the procedure-body ownership boundary | `ef-core` | `ef-core.stored-procedure-cud-mapping-and-concurrency` | `../_knowledge/ef-core/stored-procedure-cud-mapping-and-concurrency.md` | MAPPED |
| Current-value, original-value and input/output parameter roles, including separate current/original parameters for one property | `ef-core` | `ef-core.stored-procedure-cud-mapping-and-concurrency` | `../_knowledge/ef-core/stored-procedure-cud-mapping-and-concurrency.md` | MAPPED |
| Generated key/computed/row-version result columns, output-parameter alternative and one-return-channel-per-property rule | `ef-core` | `ef-core.stored-procedure-cud-mapping-and-concurrency` | `../_knowledge/ef-core/stored-procedure-cud-mapping-and-concurrency.md` | MAPPED |
| Alternative rows-affected parameter/result-column/return-value contracts and result-set-as-success-signal boundary | `ef-core` | `ef-core.stored-procedure-cud-mapping-and-concurrency` | `../_knowledge/ef-core/stored-procedure-cud-mapping-and-concurrency.md` | MAPPED |
| Original concurrency-token predicate, zero-row conflict, refreshed token, `DbUpdateConcurrencyException` and SQL/mapping joint responsibility | `ef-core` | `ef-core.stored-procedure-cud-mapping-and-concurrency` | `../_knowledge/ef-core/stored-procedure-cud-mapping-and-concurrency.md` | MAPPED |
| Insert/update/delete value flow, useful legacy/permission/multi-table/auditing cases and ordinary-CRUD generated-SQL alternative | `ef-core` | `ef-core.stored-procedure-cud-mapping-and-concurrency` | `../_knowledge/ef-core/stored-procedure-cud-mapping-and-concurrency.md` | MAPPED |
| Screenshot/text inventories, recovery history, region assignments and coverage metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- SQL Server procedure purpose and its three return channels form a database-contract unit.
- ADO.NET command setup extends the existing command-execution unit rather than being duplicated.
- EF raw query/command composition is separated from `SaveChanges` CUD mapping because they have different APIs and failure contracts.
- The CUD unit keeps EF mapping and representative SQL together so original-token matching, success signaling and refreshed values remain one causal explanation.

| Status | Count |
|---|---:|
| MAPPED | 11 |
| MERGED | 1 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
