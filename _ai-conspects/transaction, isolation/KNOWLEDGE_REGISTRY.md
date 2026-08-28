# Knowledge Registry

Source workspace: `_ai-conspects/transaction, isolation/`

Authoritative processed source: `01-final-transcript.md` (identical regional copy: `regions/R01R02R03R04-transaction-isolation-final-v001.md`)

Original SVG: `source/transaction, isolation.svg`

Evidence and coverage: `data/final-coverage-audit-v001.json`; 71 of 71 screenshot uses and 71 of 71 native SVG labels are closed.

| Source claim group | Topic | Knowledge ID | Destination file | Mapping |
|---|---|---|---|---|
| R01 atomicity versus isolation, the default transaction around one relational `SaveChanges` and explicit transaction across multiple saves | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R01 immediate `ExecuteSql*`/`ExecuteUpdate*`/`ExecuteDelete*` execution and atomic composition with tracked changes | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R01 deferred query execution, connection/transaction ownership, unsaved tracked state and reading one's own executed uncommitted writes | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R01 optimistic concurrency token/`rowversion` for stale edits versus a long transaction or a consistent multi-query snapshot | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R01 clear transaction ownership across nested services sharing a `DbContext` unit of work | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R02 Read Committed, Read Uncommitted and Repeatable Read visibility, dirty/non-repeatable/phantom behavior and local tracked-state boundary | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R02 Snapshot transaction-level versioned view, enabling/provider boundary, stale-write conflict `3960` and whole-transaction retry | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R02 Serializable row/range protection, invariant use case, concurrency/deadlock costs and constraint/atomic-operation alternatives | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R02 coherent multi-query view selection versus default isolation for one query or concurrency-token-protected write | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R03 retrying execution strategy with the complete explicit transaction created and executed inside the strategy delegate | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R03 ambiguous commit outcome, duplicate-work causal chain and stable-key/idempotency/constraint/outbox/verification mitigations | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R03 automatic/manual savepoints, rollback-to-savepoint mechanics, provider limitations and no-fresh-snapshot caveat | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R03 smallest complete retry boundary, replay safety, recreated context/transaction state and invalid-state stop condition | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R04 lock acquisition on data access, plan/index/provider dependence and lock-based Read Committed read/write lock duration | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R04 RCSI statement-level versioning versus Snapshot transaction-level view and reader/writer blocking boundary | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R04 Serializable predicate/range protection, supporting-index dependence, all-writer protocol and database-constraint preference | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| R04 deadlock victim rollback, short transactions, consistent resource order, indexes, no user interaction and whole-unit retry | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| Practical selection guide across default transactions, stale edits, coherent reads, absence/range invariants, mixed writes and retries | `ef-core` | `ef-core.transactions-isolation-savepoints-and-retries` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| Screenshot/text inventories, coverage reconciliation and source-processing metadata | N/A | N/A | N/A | NON_LEARNING |

## Boundary decision

The four regions form one cohesive EF Core transaction model. They extend the existing focused transaction/isolation/savepoint/retry unit rather than creating region-shaped duplicates.

| Status | Count |
|---|---:|
| MAPPED | 0 |
| MERGED | 18 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |

