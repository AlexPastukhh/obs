# Knowledge Registry

Source workspace: `_ai-conspects/ef-core-general-repo-shit-entity-shit-onmodelcreat-shit-transactions-shit-dbexceptions-db-level-invariants-protection-trigger/`

Authoritative processed sources: `transcripts/fr01-tracking-query-materialization-v002.md`; `transcripts/fr02-constructors-attach-graphs-v002.md`; `transcripts/fr03-model-owned-complex-relationships-v002.md`; `transcripts/fr04-transactions-retries-rawsql-v002.md`; `transcripts/fr05-invariants-constraints-triggers-v002.md`; `transcripts/fr06-concurrency-provider-errors-v002.md`; `transcripts/fr07-query-shape-row-count-v002.md`; `transcripts/x01-boundary-exclusions-v002.md`

Original SVG: `source/source-complete-v002.svg` (SHA-256 `3f1f8d3f0594043679772ad71c5b40c553fea90716fc781ccf9241542a196efd`)

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Tracking identity map, one instance per key, CPU/heap costs, tracking versus no-tracking versus temporary identity resolution, DTO projection, and partial-domain-entity risk | `ef-core.tracking-queries-identity-resolution-and-projections` | `ef-core` | `../_knowledge/ef-core/tracking-queries-identity-resolution-and-projections.md` | MAPPED |
| Warm-context `Find` identity-map lookup, redundant second `Find`, explicit navigation loading, and multi-collection query cost | `ef-core.entityentry-navigations-explicit-load-and-query` | `ef-core` | `../_knowledge/ef-core/entityentry-navigations-explicit-load-and-query.md` | MERGED |
| Expression-bodied `DbSet<TEntity>` via `Set<TEntity>()`, no backing field, and nullable-initialization alternative | `ef-core.model-configuration-conventions-and-discovery` | `ef-core` | `../_knowledge/ef-core/model-configuration-conventions-and-discovery.md` | MERGED |
| Row materialization through bindable or parameterless constructors, non-replay of application creation, safe local invariants, and unsafe external side effects | `ef-core.entity-materialization-and-safe-constructors` | `ef-core` | `../_knowledge/ef-core/entity-materialization-and-safe-constructors.md` | MAPPED |
| `Attach` as existing/`Unchanged`, key-only stubs, normal detection after attach, and selective `Property(...).IsModified` | `ef-core.entityentry-state-values-and-property-control` | `ef-core` | `../_knowledge/ef-core/entityentry-state-values-and-property-control.md` | MERGED |
| Broad graph `Update`, disconnected existing referenced nodes, new-insert misclassification risk, and selective per-node state decisions | `ef-core.trackgraph-disconnected-graphs-and-nodestate` | `ef-core` | `../_knowledge/ef-core/trackgraph-disconnected-graphs-and-nodestate.md` | MERGED |
| Shadow-property metadata, `EF.Property<T>` querying, persistence-only state, and hidden-domain-behavior boundary | `ef-core.shadow-properties-and-persistence-only-state` | `ef-core` | `../_knowledge/ef-core/shadow-properties-and-persistence-only-state.md` | MAPPED |
| Multi-column owned/complex values, all-null absence, component configuration, converter/wrapper limitation, and correlated nullability | `ef-core.optional-nested-owned-values-and-requiredness` | `ef-core` | `../_knowledge/ef-core/optional-nested-owned-values-and-requiredness.md` | MERGED |
| Primary/alternate/aggregate-local identity, external aggregate references, principal-key targets, and unique-index distinction | `ef-core.alternate-keys-and-principal-key-targets` | `ef-core` | `../_knowledge/ef-core/alternate-keys-and-principal-key-targets.md` | MERGED |
| Unique/composite/filtered index configuration and stable names for domain-error classification | `ef-core.index-configuration` | `ef-core` | `../_knowledge/ef-core/index-configuration.md` | MERGED |
| Single-`SaveChanges` atomicity, explicit transaction boundary across multiple writes, isolation distinction, same-transaction visibility, and `ReadUncommitted` tracker boundary | `ef-core.isolation-levels-and-retry-semantics` | `ef-core` | `../_knowledge/ef-core/isolation-levels-and-retry-semantics.md` | MERGED |
| Complete execution-strategy delegate, transaction inside the delegate, fresh context per attempt, repeated increment/child/Added hazards, and 1205/1222 retry choices | `ef-core.execution-strategies-retry-behavior-and-configuration` | `ef-core` | `../_knowledge/ef-core/execution-strategies-retry-behavior-and-configuration.md` | MERGED |
| Ambiguous commit verification, `SaveChanges(false)`, deferred `AcceptAllChanges`, natural keys, operation identifiers, and idempotency | `ef-core.executeintransactionasync-ambiguous-commit-verification` | `ef-core` | `../_knowledge/ef-core/executeintransactionasync-ambiguous-commit-verification.md` | MERGED |
| `FromSql` entity-shape ownership even when reading another physical table, and incompatible-shape failure boundary | `ef-core.fromsql-and-sqlquery-apis` | `ef-core` | `../_knowledge/ef-core/fromsql-and-sqlquery-apis.md` | MERGED |
| Safe raw-SQL interpolation/parameters and the boundary between parameter values and trusted SQL grammar | `ef-core.fromsql-parameterization-and-dynamic-sql` | `ef-core` | `../_knowledge/ef-core/fromsql-parameterization-and-dynamic-sql.md` | MERGED |
| Ordinary explicit-transaction ownership and lifecycle: begin, multiple flushes/domain work, commit, catch/rollback, immediate cleanup before further catch logic, and post-rollback log/compensate/result/rethrow policy | `ef-core.transactions-isolation-savepoints-and-retries` | `ef-core` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| Execution-strategy resource model: strategy is a policy/helper rather than `IDisposable`; contexts, transactions, and connections own disposable resources | `ef-core.execution-strategies-retry-behavior-and-configuration` | `ef-core` | `../_knowledge/ef-core/execution-strategies-retry-behavior-and-configuration.md` | MERGED |
| Concurrency-token missed-update detection, database/client/merge policies, original-value refresh, human conflict boundary, and savepoint versus transaction restart | `ef-core.optimistic-concurrency-resolution-and-savepoints` | `ef-core` | `../_knowledge/ef-core/optimistic-concurrency-resolution-and-savepoints.md` | MAPPED |
| EF/provider exception layers, catch classification, SQL Server 2601/2627/547/515/1205/1222/3960/-2 meanings, retry boundaries, and named-rule mapping | `ef-core.database-failure-layers-and-sql-server-classification` | `ef-core` | `../_knowledge/ef-core/database-failure-layers-and-sql-server-classification.md` | MAPPED |
| Declarative defense hierarchy, row-local `CHECK`, correlated fields, application-check race, and stable constraint naming | `sql-server.declarative-invariants-and-cross-row-enforcement` | `sql-server` | `../_knowledge/sql-server/declarative-invariants-and-cross-row-enforcement.md` | MAPPED |
| Statement-level triggers, multi-row `inserted`/`deleted`, update old/new versions, set-based overlap rejection, and custom errors from procedures/batches/triggers/`TRY/CATCH` | `sql-server.declarative-invariants-and-cross-row-enforcement` | `sql-server` | `../_knowledge/sql-server/declarative-invariants-and-cross-row-enforcement.md` | MAPPED |
| Serializable set/range invariant boundary: all competing transactions must express the predicate through compatible reads/writes; predicate-range protection prevents the phantom by making a competitor wait or fail | `sql-server.declarative-invariants-and-cross-row-enforcement` | `sql-server` | `../_knowledge/sql-server/declarative-invariants-and-cross-row-enforcement.md` | MAPPED |
| Collation-first normalized uniqueness and deterministic/indexable computed-column keys | `sql-server.computed-columns-persistence-and-indexing` | `sql-server` | `../_knowledge/sql-server/computed-columns-persistence-and-indexing.md` | MERGED |
| Indexed-view materialization through a unique clustered index, specialized aggregate-style uniqueness, and write-maintenance trade-off | `sql-server.indexed-view-materialization-and-write-cost` | `sql-server` | `../_knowledge/sql-server/indexed-view-materialization-and-write-cost.md` | MERGED |
| Include versus tracked-root explicit load, `AutoInclude`/`Find` boundary, sibling multiplication, nested branch contribution, split-query trade-off, projection, and identity-resolution boundary | `ef-core.query-shape-cartesian-expansion` | `ef-core` | `../_knowledge/ef-core/query-shape-cartesian-expansion.md` | MAPPED |
| SQL Server command-timeout `SqlException.Number == -2` versus ordinary `TimeoutException`, ambiguity/idempotency caution, and non-retry-by-default bad SQL, invalid-object, permission, constraint, and business-rule failures | `ef-core.database-failure-layers-and-sql-server-classification` | `ef-core` | `../_knowledge/ef-core/database-failure-layers-and-sql-server-classification.md` | MAPPED |
| Processing and coverage artifacts: stage files, region drafts, source-completion/reconciliation passes, source checks, and closure audits | - | - | - | NON_LEARNING |
| Archive metadata: `APPLY_ARCHIVE.md` and `MANIFEST.md` | - | - | - | NON_LEARNING |
| Evidence and machine-readable support: `source/`, `assets/`, `audit-assets/`, and `data/` | - | - | - | NON_LEARNING |
| X01 explicitly reassigns the Vite proxy/redirect/CORS screenshot to the proxy/server/Vite workspace; it is not EF Core learning content in this migration | - | - | - | NON_LEARNING |

## Boundary decisions

- FR01 tracking/identity resolution is a new coherent model; its explicit-loading mechanics extend the existing `EntityEntry` navigation unit, while the small `DbSet` declaration pattern extends model configuration/discovery instead of becoming a syntax-detail unit.
- FR02 materialization and shadow properties remain independent models. Its attach/update mechanics extend the existing `EntityEntry` and `TrackGraph` units; the one-instance-per-key boundary belongs to the tracking/identity-map unit.
- FR03 optional multi-column values, key semantics, and indexes extend existing canonical units. Cross-row database enforcement remains in `sql-server`, not EF model-configuration taxonomy.
- FR04 transaction/retry/commit-verification/`FromSql` claims extend existing units. The distinct concurrency-resolution loop and provider-error taxonomy remain independently recallable units.
- FR05's computed-column and indexed-view claims extend existing SQL Server units. Declarative and procedural invariant enforcement form one new SQL Server unit because the source presents them as a defense hierarchy.
- FR07 owns the SQL row-shape model. Tracking identity resolution is referenced but not duplicated as a remedy because it cannot reduce returned rows.
- X01 is an audited source-boundary reassignment, not an unresolved EF Core claim. Its destination workspace remains pending and is not modified here.

| Status | Count |
|---|---:|
| MAPPED | 10 |
| MERGED | 16 |
| NON_LEARNING | 4 |
| UNRESOLVED | 0 |

Distinct Knowledge IDs among MAPPED and MERGED: 22.
