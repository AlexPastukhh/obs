# Knowledge Registry - EF Core retries and savepoints

Workspace: `_ai-conspects/ef core retry, savepoints/`

## Authoritative source

- Processed source: `regions/full-semantic-transcript-v001.md`
- Source SVG: `source/source-complete-v002.svg`
- SHA-256: `c73ba05e069382d682f21b3ea949bf2cc13dbbadf253776a945df611590ebdad`

## Canonical registry

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
| ------------------ | ------------ | ----- | ---------------- | ------- |
| Execution strategies and the main mental model (EnableRetryOnFailure configuration, CreateExecutionStrategy modes, default retriable unit) | `ef-core.execution-strategies-retry-behavior-and-configuration` | `ef-core` | `../_knowledge/ef-core/execution-strategies-retry-behavior-and-configuration.md` | MAPPED |
| Explicit transactions must belong to the retry delegate (strategy delegate pattern, fresh context/state pattern, ExecuteAsync without explicit transaction) | `ef-core.execution-strategies-retry-behavior-and-configuration` | `ef-core` | `../_knowledge/ef-core/execution-strategies-retry-behavior-and-configuration.md` | MAPPED |
| Savepoints around SaveChanges (automatic savepoints, MARS limitation, savepoint rollback vs execution-strategy retry) | `ef-core.savepoints-savechanges-and-transaction-recovery` | `ef-core` | `../_knowledge/ef-core/savepoints-savechanges-and-transaction-recovery.md` | MAPPED |
| SaveChanges(false) and AcceptAllChanges (tracked-state preservation, ambiguous commit pattern) | `ef-core.savepoints-savechanges-and-transaction-recovery` | `ef-core` | `../_knowledge/ef-core/savepoints-savechanges-and-transaction-recovery.md` | MAPPED |
| ExecuteInTransactionAsync and the three commit outcomes (success, clear failure, ambiguous commit, verifySucceeded pattern) | `ef-core.executeintransactionasync-ambiguous-commit-verification` | `ef-core` | `../_knowledge/ef-core/executeintransactionasync-ambiguous-commit-verification.md` | MAPPED |
| Retry buffering and memory behavior (internal buffering, streaming vs buffering, double buffering with terminal operators, scalar queries) | `ef-core.retry-buffering-and-streaming-behavior` | `ef-core` | `../_knowledge/ef-core/retry-buffering-and-streaming-behavior.md` | MAPPED |
| DbContext pooling and request-specific state (stable configuration, request-specific mutable state, OnConfiguring behavior, tenant ID vs connection string) | `ef-core.dbcontext-pooling-tenant-and-connection-state` | `ef-core` | `../_knowledge/ef-core/dbcontext-pooling-tenant-and-connection-state.md` | MERGED |
| Multiple contexts and transaction sharing (UseTransaction, same-database transaction pattern, retry behavior per context) | `ef-core.transactions-isolation-savepoints-and-retries` | `ef-core` | `../_knowledge/ef-core/transactions-isolation-savepoints-and-retries.md` | MERGED |
| Execution-strategy diagnostics (max retry count, max retry delay, exceptions encountered, additional SQL error numbers) | `ef-core.execution-strategies-retry-behavior-and-configuration` | `ef-core` | `../_knowledge/ef-core/execution-strategies-retry-behavior-and-configuration.md` | MAPPED |
| Isolation level changes the meaning of retry (Read Committed, RCSI, Snapshot, Repeatable Read, Serializable retry semantics) | `ef-core.isolation-levels-and-retry-semantics` | `ef-core` | `../_knowledge/ef-core/isolation-levels-and-retry-semantics.md` | MAPPED |
| Match the failure to the correct retry mechanism (transient infrastructure failure, optimistic concurrency conflict, unknown commit outcome) | `ef-core.isolation-levels-and-retry-semantics` | `ef-core` | `../_knowledge/ef-core/isolation-levels-and-retry-semantics.md` | MAPPED |
| Processing and audit artifacts (00-source-check-and-boundary-review.md, 01-stage1-r01-final-coverage-transcript.md, 03-source-repair-full-svg-v002.md, 04-full-svg-semantic-transcript-v002.md, 05-independent-full-svg-audit-v002.md, TRANSCRIPT_REBUILD_AUDIT.md) | - | - | - | NON_LEARNING |
| Archive and manifest metadata (APPLY_ARCHIVE.md, MANIFEST.md) | - | - | - | NON_LEARNING |
| Source and audit assets (assets/, audit-assets/, data/) | - | - | - | NON_LEARNING |
| QUESTIONS.md (repetition question bank) | - | - | - | NON_LEARNING |

## Boundary decisions

### DbContext pooling MERGED
Section 7 ("DbContext pooling and request-specific state") was merged into the existing unit `ef-core.dbcontext-pooling-tenant-and-connection-state.md`. The existing unit already covered the core pooling concepts (AddDbContextPool, AddPooledDbContextFactory, TenantId patterns, OnConfiguring behavior). The current workspace added additional design patterns (separate context subclasses, separate wrapper factories, one pool per stable configuration, tenant connection string considerations). These were added to the existing unit to avoid duplication while preserving the additional guidance.

### Multiple contexts MERGED
Section 8 ("Multiple contexts and transaction sharing") was merged into the existing unit `ef-core.transactions-isolation-savepoints-and-retries.md`. The existing unit already covered transaction boundaries and the concept that nested services sharing one DbContext should not independently begin competing transactions. The current workspace added specific details about two contexts sharing one transaction via UseTransaction and the pattern of using one context with retries and another without retries. These were added as a new section to the existing unit.

### Unit boundaries
The workspace content was split into 5 new knowledge units based on semantic coherence:
- Execution strategies (configuration, delegate patterns, diagnostics) - focuses on the retry policy mechanics
- Savepoints and SaveChanges (automatic savepoints, SaveChanges(false), tracked state) - focuses on transaction recovery within a single transaction
- ExecuteInTransactionAsync (ambiguous commit, verification) - focuses on the specific commit-verification problem
- Retry buffering (streaming vs buffering) - focuses on the memory/performance impact of retries
- Isolation levels and retry semantics (how isolation affects what retries can see, failure taxonomy) - focuses on the interaction between isolation and retry behavior

## Summary

| Status       | Count |
| ------------ | ----: |
| MAPPED       |     9 |
| MERGED       |     2 |
| NON_LEARNING |     4 |
| UNRESOLVED   |     0 |

Total mapping rows: 15
Distinct Knowledge IDs: 7 (5 new units + 2 existing MERGED)
