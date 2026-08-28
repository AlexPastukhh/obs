# Knowledge Registry

Source workspace: `_ai-conspects/sql-server-mars/`

Processed source used for claim mapping: `04-source-preserving-transcript-v002.md`

Corrected boundary authority: `00-stage0-source-verification-and-corrected-boundaries-v002.md`

Final coverage audit: `03-stage3-final-coverage-audit.md` (`26/26`, zero missing or unresolved evidence)

Original SVG: `source/sql-server-mars.svg`

`CURRENT_SOURCE_OF_TRUTH.md` records complete R01-R04 coverage but does not identify one canonical transcript filename. This registry therefore names the physically present source-by-source v002 correction transcript used for the mapping instead of overstating the status document's authority declaration.

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| S-001-S-006 multiple active commands/readers, no-MARS buffering, MARS interleaving and active-not-parallel distinction | `sql-server.mars-reader-interleaving-and-yield-points` | `sql-server` | `../_knowledge/sql-server/mars-reader-interleaving-and-yield-points.md` | MAPPED |
| S-007-S-010 interleaved reading order, EF object-graph construction and key correlation across result sets | `sql-server.mars-reader-interleaving-and-yield-points` | `sql-server` | `../_knowledge/sql-server/mars-reader-interleaving-and-yield-points.md` | MAPPED |
| S-011-S-012 connection-string enablement, SqlClient/provider boundary and absence of a separate EF Core package | `sql-server.mars-reader-interleaving-and-yield-points` | `sql-server` | `../_knowledge/sql-server/mars-reader-interleaving-and-yield-points.md` | MAPPED |
| S-013-S-019 `SELECT`, cursor `FETCH` and Service Broker `RECEIVE` as row/message-producing yield points | `sql-server.mars-reader-interleaving-and-yield-points` | `sql-server` | `../_knowledge/sql-server/mars-reader-interleaving-and-yield-points.md` | MAPPED |
| S-020-S-024 EF Core savepoint disablement, active-request rollback ambiguity, shared transaction context and no-parallel-transaction boundary | `sql-server.mars-transactions-savepoints-and-tradeoffs` | `sql-server` | `../_knowledge/sql-server/mars-transactions-savepoints-and-tradeoffs.md` | MAPPED |
| S-025-S-026 performance limits, blocking/yield constraints, thread-safety boundary and proper independent-connection ownership | `sql-server.mars-transactions-savepoints-and-tradeoffs` | `sql-server` | `../_knowledge/sql-server/mars-transactions-savepoints-and-tradeoffs.md` | MAPPED |
| Coverage ledgers, image assignments, stage history and audit artifacts | N/A | N/A | N/A | NON_LEARNING |

## Boundary decisions

- Reader lifecycle, buffering, graph correlation, provider enablement and yield points form one operational model.
- Savepoint compatibility, shared-transaction ambiguity, performance limits and ownership/concurrency tradeoffs form a second decision unit.
- Savepoint disablement is mentioned at the enablement boundary in the reader unit, but its causal and operational model lives in the transaction unit.

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 0 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
