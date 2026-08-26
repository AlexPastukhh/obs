# Knowledge Registry

Source: `04-detailed-near-literal-transcript-v002.md`; SVG: `source/rawconnections,dbconnection,sqlconnection,commands.svg`

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Sections 1–4: provider types/base family, workflow, portable API versus provider SQL/placeholders/features, factory example | `dotnet.ado-net-abstractions-portability-and-lifecycle` | `dotnet` | `../_knowledge/dotnet/ado-net-abstractions-portability-and-lifecycle.md` | MAPPED |
| Sections 5, 8: disposal responsibilities, pooling, reader/transaction lifecycle, open-late/close-early | `dotnet.ado-net-abstractions-portability-and-lifecycle` | `dotnet` | `../_knowledge/dotnet/ado-net-abstractions-portability-and-lifecycle.md` | MAPPED |
| Sections 6–13, 16–18: repository flows, reader/scalar/non-query selection, parameters, stored procedures, row mapping | `dotnet.ado-net-command-execution-and-row-mapping` | `dotnet` | `../_knowledge/dotnet/ado-net-command-execution-and-row-mapping.md` | MAPPED |
| Sections 14, 19: `DBNull`, `GetOrdinal`, typed getters, lookup and hot-loop rules | `dotnet.ado-net-command-execution-and-row-mapping` | `dotnet` | `../_knowledge/dotnet/ado-net-command-execution-and-row-mapping.md` | MAPPED |
| Section 15: same-connection transaction, command association, commit/rollback/rethrow, isolation level | `dotnet.ado-net-transactions-and-ef-core-state` | `dotnet` | `../_knowledge/dotnet/ado-net-transactions-and-ef-core-state.md` | MAPPED |
| Sections 20–21: raw command enlistment, connection ownership, session-state reset, two pooling mechanisms | `dotnet.ado-net-transactions-and-ef-core-state` | `dotnet` | `../_knowledge/dotnet/ado-net-transactions-and-ef-core-state.md` | MAPPED |
| Transcript policy, screenshot/label counts, exact-layout note | — | — | — | NON_LEARNING |

The repeated execution examples were consolidated by result shape. The representative repository read and plain two-command transaction remain in full because they demonstrate composition that isolated rules do not replace; distinct parameter, null, ordinal, transaction, and EF Core mechanics are retained. No learning claim was intentionally excluded.

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
