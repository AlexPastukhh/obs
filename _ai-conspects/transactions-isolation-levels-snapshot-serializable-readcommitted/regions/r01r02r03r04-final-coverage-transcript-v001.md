# Final coverage transcript - Transactions and isolation levels: Read Committed, Snapshot and Serializable

Generated: 2026-06-13 09:50:00 UTC

## Coverage statement

This pass closes all Stage0 sources: `18` image uses and `71` text labels. Stage0 inventory is used as a checklist only; wording below is based on visual/semantic boundary review of the preserved source images and labels.

## Big picture

A transaction gives atomicity: all changes commit together or roll back together. Isolation level controls what the transaction can observe and how concurrent transactions can interfere with decisions based on reads.

## R01 - Transaction basics, read committed and atomicity

Coverage: `4` image uses, `33` text labels.

Atomicity is independent of isolation level: all applied or all rolled back can be achieved with any isolation level. The isolation question starts when reads are part of the decision that chooses later writes.

Read committed is often enough when inconsistent concurrent changes are guarded elsewhere, for example by rowversion/concurrency tokens, ETags, or another invariant check that will reject stale updates.

Manual transactions are needed when multiple operations must succeed/fail together: several queries used for one decision, nested methods that each call `SaveChanges`, or direct SQL/ExecuteUpdate mixed with tracked changes that must be in one unit.

EF can handle some concurrency conflicts without raising isolation level: configure rowversion or `IsConcurrencyToken`, let EF detect that the row changed, and handle the concurrency exception.

Source labels closed in this region:

- `T001`: you can get all applied or all rolled back(atomicity)

- `T002`: with any isolation level

- `T003`: when reads are part of

- `T004`: transaction

- `T005`: when the query runs (linq/sql api to get smth)

- `T006`: readcommited

- `T011`: so readcommited is ok when

- `T012`: we cant have some state changes from

- `T013`: other transaction

- `T014`: like when we have some

- `T015`: e tags that will prevent

- `T016`: update with incons stae

- `T017`: like when we change e tag on some

- `T018`: children changes

- `T025`: reading your own

- `T026`: uncommited changes

- `T027`: dbcontext about transactions strategies

- `T029`: so i have some scenarios when i may need some

- `T030`: transaction or when i may think that i need them

- `T031`: 1 when i query something from db, look at it and chose to change it

- `T032`: but at the same time i may have another request that

- `T033`: changes the same thing

- `T034`: dont need manual transaction, can configure rowversion or

- `T035`: isconcurencytoken and ef will throw exceptions

- `T036`: 2 when i have multiple queries to get data

- `T037`: may need transaction with isolationlevel snapshot

- `T038`: 3 when i have some possible nesting of methods that mutate

- `T039`: queried entity and each may call savechanges

- `T040`: one savechanges succeds another fails and we get inconsistency

- `T041`: need to wrap everything in one transaction with any isolatoin level but usually with default

- `T042`: 4 when i have some database.executesql  or other like dbset.executeupdate (that is

- `T043`: linq based but everything else like executesql) - they all dont care about savechanges

- `T044`: so if i want them to be in a traqnsaction i need to create transaction

## R02 - Isolation levels: snapshot, serializable and read uncommitted

Coverage: `0` image uses, `15` text labels.

Isolation levels help when multiple reads must see a stable view or when a decision is based on data that could change between queries. Snapshot/serializable are marked as tools for avoiding inconsistency in multi-query decisions.

Snapshot gives a transaction-level consistent view, but update/delete/insert decisions based on old data can still produce snapshot update conflicts. Those conflicts must be retried or handled.

Serializable is stronger: it protects the logical range relevant to the predicate, preventing phantoms and preserving invariants that depend on “no matching row exists” or “count/sum remains below a threshold”.

Read uncommitted is called out as a separate low-isolation mode; it can observe uncommitted data and is usually not appropriate for correctness-sensitive application logic.

Source labels closed in this region:

- `T007`: isolaton levels

- `T008`: how can help to avoid inconsistency

- `T009`: with multiple queries

- `T010`: with snapshot/serializable

- `T019`: other isolaton levels, default

- `T020`: snapshot,

- `T021`: snapshot exception with code

- `T022`: when you update/delete/insert

- `T023`: based on old data

- `T024`: why serializable

- `T028`: readuncommited

- `T045`: readcommited

- `T046`: repeatableread vs serialized

- `T047`: repeatableread vs serialized

- `T048`: repeatableread

## R03 - EF Core execution strategy, savepoints and retries

Coverage: `14` image uses, `9` text labels.

EF Core execution strategies and retries interact with transactions. If a provider execution strategy retries operations, user-managed transactions need to be run through the strategy pattern so the whole unit can be retried consistently.

Savepoints matter when a transaction is already active and part of the work fails. EF can roll back to a savepoint rather than aborting the whole outer transaction in supported cases.

Ambiguous transaction outcome is an important retry hazard: if the connection fails around commit, the client may not know whether the transaction committed. The retry strategy must account for this rather than blindly repeating non-idempotent work.

Source labels closed in this region:

- `T049`: isolation level

- `T050`: in manual retries from same tranaction

- `T051`: using savepoints cases

- `T052`: when we use execute (not in transaction)

- `T053`: method

- `T054`: and there is some ambigous outcome of

- `T055`: the transaction

- `T056`: by default - we will retry

- `T057`: !!!

## R04 - Locks, RCSI and serializable range protection

Coverage: `0` image uses, `14` text labels.

Locks under read committed, RCSI and serializable differ. The notes ask when locks are acquired: at transaction start or when data is touched. Practically, locks/version reads are tied to statements and touched ranges, depending on the isolation level and database settings.

RCSI changes read committed reads to use row versions for readers, reducing read/write blocking while keeping read committed semantics per statement.

Serializable protects predicate ranges. Both transactions that participate in a shared invariant generally need compatible isolation/locking rules; one serializable transaction cannot protect an invariant if the other writes outside the same protocol.

Use serializable to keep invariants when correctness depends on absence or count/range conditions, not merely on updating a single row that can be protected by concurrency tokens.

Source labels closed in this region:

- `T058`: locks with readcommited,

- `T059`: rcsi,serializable

- `T060`: when locks are acquired

- `T061`: on start of transaction

- `T062`: or on data touch?

- `T063`: read commited

- `T064`: rcsi

- `T065`: serializable

- `T066`: serializable protects the

- `T067`: range relevant to predicate

- `T068`: when both trans need to have isolation

- `T069`: serializable

- `T070`: to keep invariants

- `T071`: !!!

## Final audit

- Remaining unclosed image uses: `0`

- Remaining unclosed text labels: `0`

- Exact code punctuation should be corrected from the preserved screenshots/source if a verbatim study sheet is needed.
