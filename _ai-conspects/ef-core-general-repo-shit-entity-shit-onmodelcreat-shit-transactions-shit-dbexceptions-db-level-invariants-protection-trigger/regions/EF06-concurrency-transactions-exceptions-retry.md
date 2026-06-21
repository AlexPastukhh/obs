# EF06 - Transactions / concurrency / db exceptions / retry

Conspect: `ef-core-general`  
File type: **source-preserving combined region transcript**  
Stage: **14 / verified transcript v001**  
Generated: 2026-06-02 01:52:06 UTC

---

## Done

- EF05 is closed as EF05A + EF05B + EF05C.
- This file completes EF06 in one combined pass.
- EF06A, EF06B, and EF06C are preserved as subregions inside one transcript.

## Now

- Review this archive diff.
- Commit if transcript and boundary decisions look correct.

## Next

- Final closure/audit pass for `ef-core-general`.
- Meaning: confirm no `unreviewed` / candidate-only EF Core images remain, verify `S-001` stays out-of-current-EFCore-scope, and mark conspect status complete.

## Later

- After final audit, move to the next conspect or cross-chat consolidation.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
- optimistic concurrency and row-version/concurrency-token behavior
- check-then-add races where parent concurrency only helps if the parent row is updated
- using database constraints, transaction isolation, locking, or versioned parent updates to protect races
- explicit transactions for grouping multiple SaveChanges calls atomically
- difference between atomicity and isolation level
- ReadCommitted, Snapshot, and ReadUncommitted semantics
- SaveChanges exceptions, transaction commit failures, retry-limit exhaustion, and practical catch order

Key ideas:
- Without a configured concurrency token, EF usually does not throw a concurrency exception just because a row changed after it was read.
- With a concurrency token, EF compares original and current token at SaveChanges and can throw DbUpdateConcurrencyException when row count is zero.
- For check-then-add, parent-row concurrency only helps if the parent row participates in the update/version check.
- Database constraints or explicit transaction/isolation/locking strategies often protect insert-child race scenarios.
- Multiple SaveChanges calls need an explicit transaction to succeed/fail together.
- Atomicity and isolation are separate concerns: transaction gives all-or-nothing, isolation controls visibility/concurrency semantics.
- ReadCommitted is usually the default; Snapshot is a stronger design choice; ReadUncommitted allows dirty database reads and is not about EF in-memory changes.
- Before SaveChanges, tracked changes exist only in EF memory, not in the database.
- SaveChanges failures usually surface DbUpdateException or DbUpdateConcurrencyException, often with inner provider exceptions.
- CommitAsync failures are often provider-level DbException/SqlException, not usually DbUpdateException.
- RetryLimitExceededException represents execution strategy retry exhaustion; non-transient failures may surface the underlying exception instead.

Reading quality:

```text
Overall: high.
Limitations: S-048 bottom continues; S-051/S-063/S-064 have top continuation crop; S-065 has small top UI overlay.
Confidence: high for source transcript, subregion boundaries, and combined EF06 closure.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
EF06A -> S-047, S-048
EF06B -> S-049, S-050, S-051, S-052
EF06C -> S-062, S-063, S-064, S-065, S-061
```

Boundary decision:
```text
EF06 is processed in one larger combined transcript by request.
Subregion boundaries are still preserved:
- EF06A: optimistic concurrency / check-then-add race
- EF06B: transactions / atomicity / isolation levels
- EF06C: db exceptions / retry exhausted / catch order
```

Out-of-current-scope note:
```text
S-001 remains out-of-current-EFCore-scope from Stage10.
```

---

## 1. Source inventory

| Region source | Global source | Image use | fileId short | Subregion | Status | Cut off | Theme |
|---|---|---|---|---|---|---|---|
| EF06A-S001 | S-047 | IU-047 | `0dc3625229` | EF06A | `verified-from-source-image` | no | without concurrency token last write wins; with token EF throws DbUpdateConcurrencyException |
| EF06A-S002 | S-048 | IU-048 | `119679e20c` | EF06A | `verified-visible-partial-from-source-image` | bottom-continues-after-visible-question | check-then-add race: parent row concurrency only helps if parent row is updated |
| EF06B-S001 | S-049 | IU-049 | `3710ca8272` | EF06B | `verified-from-source-image` | no | multiple SaveChanges calls need explicit transaction for all-or-nothing |
| EF06B-S002 | S-050 | IU-050 | `4e35b1cbc9` | EF06B | `verified-from-source-image` | no | ReadCommitted default; Snapshot stronger when needed; ReadUncommitted bad for business writes |
| EF06B-S003 | S-051 | IU-051 | `b7164244ce` | EF06B | `verified-visible-partial-from-source-image` | top-cropped-before-title | ReadUncommitted means database dirty reads, not including EF change tracker changes |
| EF06B-S004 | S-052 | IU-052 | `a9bd2293fc` | EF06B | `verified-from-source-image` | no | modified tracked entity is only in memory until SaveChanges |
| EF06C-S001 | S-062 | IU-062 | `ea9b1ba7b6` | EF06C | `verified-from-source-image` | no | SaveChanges failures: DbUpdateException, DbUpdateConcurrencyException, inner provider exception |
| EF06C-S002 | S-063 | IU-063 | `5310695bc8` | EF06C | `verified-visible-partial-from-source-image` | top-cropped-continuation | CommitAsync failure is usually provider/DbException/SqlException rather than DbUpdateException |
| EF06C-S003 | S-064 | IU-064 | `bb49429aea` | EF06C | `verified-visible-partial-from-source-image` | top-cropped-continuation | RetryLimitExceededException when execution strategy retries are exhausted |
| EF06C-S004 | S-065 | IU-065 | `601cdc59fb` | EF06C | `verified-visible-partial-from-source-image` | top-ui-overlay-cropped-header | practical catch order for save/transaction/execution strategy failures |
| EF06C-S005 | S-061 | IU-061 | `bf9f234ad6` | EF06C | `verified-from-source-image` | no | RetryLimitExceededException is general EF Core execution strategy retry exhaustion exception |

---

## 2. Verified source transcript

## 2.1 EF06A - Optimistic concurrency / check-then-add race

### EF06A-S001 / S-047 - `0dc3625229`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef06a-optimistic-concurrency-token-row-changed`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: without concurrency token last write wins; with token EF throws DbUpdateConcurrencyException

#### Visible text

```text
So for your scenario:

1. Request A reads entity.
2. Request B reads same entity.
3. A checks current state and decides to add/update something.
4. B changes the entity first.
5. A later calls SaveChanges().

What happens depends on your model and SQL constraints:

- Without a concurrency token: EF usually will not throw a concurrency exception just because the row changed after you read it. For normal updates, the “last write wins” pattern can happen. Microsoft explicitly says that if concurrency detection isn’t enabled, later updates can overwrite earlier ones.
- With a concurrency token: EF compares the original token it read with the current token in the database during SaveChanges(). If someone else changed that row first, EF sees that 0 rows were updated/deleted and throws DbUpdateConcurrencyException.
```

#### Notes

Full source image visually checked.

---

### EF06A-S002 / S-048 - `119679e20c`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef06a-check-then-add-race`
- readability: `high`
- cut off: `bottom-continues-after-visible-question`
- confidence: `high-for-visible-text`
- theme: check-then-add race: parent row concurrency only helps if parent row is updated

#### Visible text

```text
Important detail for your “check then add” case

If your logic is:

- read parent/order/cart/user,
- inspect its current children/count/status,
- decide whether to insert a new child row,

then EF concurrency on the parent row only helps if the parent row itself gets updated and has a concurrency token. If you only insert a new child row and do not update the parent row, EF may have nothing to compare on the parent, so no concurrency exception is guaranteed. In that case, the race is often caught only by:

- a database constraint such as unique index/check/foreign key, or
- an explicit transaction/isolation level/locking strategy, or
- intentionally updating a versioned parent row as part of the operation. This follows from EF Core’s documented behavior: concurrency exceptions come from update/delete row-count mismatches tied to configured concurrency tokens.

Do you need IsRowVersion() or IsConcurrencyToken()?

For EF’s optimistic concurrency detection: yes, you need to configure something.
```

#### Notes

Bottom continues after the visible answer. Visible source is clear.

---

## 2.2 EF06B - Transactions / isolation levels

### EF06B-S001 / S-049 - `3710ca8272`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef06b-explicit-transaction-multiple-savechanges`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: multiple SaveChanges calls need explicit transaction for all-or-nothing

#### Visible text

```text
Yes — if you want multiple SaveChanges calls to succeed or fail together, wrap them in one explicit transaction. By default, each individual SaveChanges call runs in its own transaction, so two separate SaveChanges calls are not automatically atomic together. EF Core’s docs say a single SaveChanges is transactional by default, and they show using BeginTransaction when you need several operations and SaveChanges calls in one transaction.

The first important distinction

There are two separate concerns:

1. Atomicity — all DB changes commit or all roll back
2. Isolation level — what your transaction can see from other concurrent transactions

To get “all applied or reverted together,” you need a transaction.
You do not need a special isolation level just for that. Any real transaction isolation level gives atomic commit/rollback behavior; the isolation level mostly changes concurrency semantics, not whether commit is all-or-nothing. The transaction API lets you choose an isolation level, but the atomicity comes from having a transaction in the first place.
```

#### Notes

Full source image visually checked.

---

### EF06B-S002 / S-050 - `4e35b1cbc9`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef06b-isolation-level-choice`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: ReadCommitted default; Snapshot stronger when needed; ReadUncommitted bad for business writes

#### Visible text

```text
So which isolation level should you use?

Usually:

- ReadCommitted is the normal default choice on SQL Server. Microsoft documents READ COMMITTED as the default SQL Server isolation level.
- Snapshot is useful when you specifically want row-versioned, consistent reads and to reduce blocking, but it is a stronger design choice, not the default answer for “I want both SaveChanges to roll back together.” SQL Server documents snapshot isolation separately and notes snapshot behavior depends on DB settings.
- ReadUncommitted is generally a bad choice for business write workflows because it allows dirty reads. Microsoft explicitly says READ UNCOMMITTED can read uncommitted modifications and is the least restrictive level.

So for your scenario, ReadCommitted is usually the right default unless you have a specific concurrency reason to use Snapshot.
```

#### Notes

Full source image visually checked.

---

### EF06B-S003 / S-051 - `b7164244ce`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef06b-readuncommitted-meaning`
- readability: `high`
- cut off: `top-cropped-before-title`
- confidence: `high-for-visible-text`
- theme: ReadUncommitted means database dirty reads, not including EF change tracker changes

#### Visible text

```text
What about ReadUncommitted?

ReadUncommitted does not mean “include my EF change tracker changes.”

It means SQL queries in that transaction may read other transactions’ uncommitted database writes — dirty reads. SQL Server says READ UNCOMMITTED allows reading modified data values that have not yet been committed by other transactions.

So this is about database-level reads, not your in-memory entity objects.
```

#### Notes

Top edge is cropped before the title, but visible content is complete.

---

### EF06B-S004 / S-052 - `a9bd2293fc`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef06b-readuncommitted-and-in-memory-tracked-changes`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: modified tracked entity is only in memory until SaveChanges

#### Visible text

```text
Your specific question: “If I modified an entity that I queried from DB, does ReadUncommitted know its changes?”

No — not before SaveChanges.

If you did:

then:

- EF’s change tracker knows user.Name changed in memory
- the database does not know yet
- transaction isolation levels do not affect that in-memory state
- ReadUncommitted only affects what SQL reads from the database can see

So until you call SaveChanges, those changes are not in the database at all. Isolation level has nothing to “see” there.
```

#### Visible code

```csharp
var user = await db.Users.FindAsync(id);
user.Name = "New Name";
```

#### Notes

Full source image visually checked.

---

## 2.3 EF06C - DB exceptions / retry exhausted / catch order

### EF06C-S001 / S-062 - `ea9b1ba7b6`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef06c-savechanges-exception-guide`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: SaveChanges failures: DbUpdateException, DbUpdateConcurrencyException, inner provider exception

#### Visible text

```text
Exception guide

1) SaveChanges failure

Most common EF-level exceptions when saving:

- DbUpdateException
  general save failure
- DbUpdateConcurrencyException
  optimistic concurrency conflict, usually “unexpected number of rows affected”

Under those, there is often an inner provider exception such as:

- SqlException for SQL Server
- more generally a provider-specific DbException

So practical rule:
```

#### Visible code

```csharp
SaveChanges failed
-> usually catch DbUpdateException
-> and maybe DbUpdateConcurrencyException separately
-> inspect InnerException for provider-specific details
```

#### Notes

Full source image visually checked.

---

### EF06C-S002 / S-063 - `5310695bc8`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef06c-transaction-commit-failure`
- readability: `high`
- cut off: `top-cropped-continuation`
- confidence: `high-for-visible-text`
- theme: CommitAsync failure is usually provider/DbException/SqlException rather than DbUpdateException

#### Visible text

```text
2) Transaction commit failure

For explicit CommitAsync() failures, the exception is often provider-specific, such as SQL Server’s SqlException, or another database exception type, because commit is a database/connection operation rather than an EF change-tracker issue. EF’s transaction docs and resiliency docs focus on commit behavior, while save exceptions are the ones explicitly mapped to DbUpdateException / DbUpdateConcurrencyException.

So practical rule:
```

#### Visible code

```csharp
CommitAsync failed
-> often provider exception / DbException / SqlException
-> not usually DbUpdateException
```

#### Notes

Top is cropped as continuation from previous card; visible text is complete.

---

### EF06C-S003 / S-064 - `bb49429aea`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef06c-retries-exhausted-retrylimitexceeded`
- readability: `high`
- cut off: `top-cropped-continuation`
- confidence: `high-for-visible-text`
- theme: RetryLimitExceededException when execution strategy retries are exhausted

#### Visible text

```text
3) Retries exhausted

When the execution strategy retries and still cannot succeed within the configured limit, EF throws:

- RetryLimitExceededException

This applies to execution strategy operations such as ExecuteAsync(...), and by the same retry model, to ExecuteInTransactionAsync(...) when transient retries are exhausted. The docs for execution strategy methods say the returned task faults if the retry limit is reached, and RetryLimitExceededException is the documented exception type for operation failure after the configured number of retries.

So for your specific question:

when verifySucceeded from ExecuteInTransaction fails multiple times and there are no retries left?

The practical final exception is:

- RetryLimitExceededException if the operation kept failing/retrying until the configured retry limit was exceeded

If the error is non-transient, EF does not keep retrying forever; the task faults with the underlying exception path instead of a successful retry. The execution-strategy docs say that if the task fails with a non-transient error or retry limit is reached, the returned task becomes faulted.
```

#### Notes

Top is cropped as continuation; visible content is clear.

---

### EF06C-S004 / S-065 - `601cdc59fb`

Metadata:
- status: `verified-visible-partial-from-source-image`
- candidate_type: `ef06c-catch-order`
- readability: `high`
- cut off: `top-ui-overlay-cropped-header`
- confidence: `high-for-visible-code`
- theme: practical catch order for save/transaction/execution strategy failures

#### Visible text

```text
What to catch

Good practical order:
```

#### Visible code

```csharp
try
{
    // save / transaction / execution strategy work
}
catch (DbUpdateConcurrencyException ex)
{
    // concurrency conflict
}
catch (DbUpdateException ex)
{
    // general EF save failure
}
catch (RetryLimitExceededException ex)
{
    // transient retries exhausted
}
catch (DbException ex) // or SqlException if SQL Server-specific
{
    // transaction commit / provider-level DB failure
}
```

#### Notes

Top has UI overlay, but code block is readable.

---

### EF06C-S005 / S-061 - `bf9f234ad6`

Metadata:
- status: `verified-from-source-image`
- candidate_type: `ef06c-retrylimitexceeded-general-exception`
- readability: `high`
- cut off: `no`
- confidence: `high`
- theme: RetryLimitExceededException is general EF Core execution strategy retry exhaustion exception

#### Visible text

```text
Yes. RetryLimitExceededException is the general EF Core exception for “the execution strategy retried this action more times than allowed”. The docs define it as “the exception that is thrown when the action failed more times than the configured limit.”

So for your cases:

- ExecuteAsync(...) with transient failures and retries exhausted -> RetryLimitExceededException.
- ExecuteInTransactionAsync(...) with a clear non-success path that keeps retrying until the limit is hit -> RetryLimitExceededException.
- ExecuteInTransactionAsync(...) with an ambiguous commit path where verifySucceeded keeps determining “not succeeded” and retries are exhausted -> again, the general “retry limit exceeded” outcome is RetryLimitExceededException.

The one nuance is: if the failure is treated as non-transient / not retryable, EF does not keep retrying to the limit; in that case you get the underlying exception path instead, not RetryLimitExceededException.
```

#### Notes

Full source image visually checked.

---

## 3. Cleaned source notes

- EF optimistic concurrency requires a configured concurrency token or rowversion; otherwise normal updates can be last-write-wins.
- A check-then-add race may not be caught by parent concurrency unless the parent row itself is updated/version-checked.
- Database constraints, transaction isolation/locking, or intentionally updating a versioned parent row are common ways to protect check-then-add invariants.
- Multiple SaveChanges calls are not automatically atomic together; use an explicit transaction to make them succeed/fail together.
- Atomicity is about all changes committing or rolling back; isolation level is about what concurrent data the transaction can see.
- ReadCommitted is usually the normal default; Snapshot is a stronger row-versioned design choice; ReadUncommitted allows dirty reads.
- ReadUncommitted does not include EF change-tracker changes; tracked modifications are only in memory until SaveChanges.
- SaveChanges failures usually map to DbUpdateException or DbUpdateConcurrencyException, often with inner provider exceptions.
- Explicit transaction commit failures are often provider-level DbException/SqlException and not usually DbUpdateException.
- RetryLimitExceededException means the execution strategy exhausted its configured retry limit; non-transient failures may surface the underlying exception instead.
- Practical catch order: DbUpdateConcurrencyException, DbUpdateException, RetryLimitExceededException, then provider-level DbException/SqlException.

---

## 4. Minimal interpretation

EF06 closes the concurrency/transaction/error-handling thread. Optimistic concurrency is not automatic: EF must have a configured token to detect row changes at SaveChanges. For race-prone check-then-add workflows, database constraints or explicit isolation/locking may be more important than parent-row concurrency unless the parent row participates in the version check. Transactions solve atomicity across multiple SaveChanges calls, while isolation levels control what concurrent database writes are visible. Finally, exception handling should separate EF save errors, concurrency errors, retry-limit exhaustion, and provider-level commit/database failures.

---

## 5. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Without a concurrency token, row changes after read do not automatically cause EF concurrency exceptions | EF06A-S001 | high |
| With a concurrency token, EF can throw DbUpdateConcurrencyException when no rows are updated/deleted | EF06A-S001 | high |
| Check-then-add races are often protected by DB constraints, transaction/isolation/locking, or versioned parent updates | EF06A-S002 | high |
| Multiple SaveChanges calls need explicit transaction for all-or-nothing behavior | EF06B-S001 | high |
| Atomicity and isolation level are separate concerns | EF06B-S001 | high |
| ReadCommitted is usually default; Snapshot is stronger; ReadUncommitted allows dirty reads | EF06B-S002, EF06B-S003 | high |
| ReadUncommitted does not see EF in-memory changes before SaveChanges | EF06B-S004 | high |
| SaveChanges failures usually involve DbUpdateException or DbUpdateConcurrencyException with possible inner provider exceptions | EF06C-S001 | high |
| CommitAsync failures are often provider-level DB exceptions, not usually DbUpdateException | EF06C-S002 | high |
| RetryLimitExceededException is the retry-exhaustion exception for execution strategies | EF06C-S003, EF06C-S005 | high |
| Practical catch order separates concurrency, general save failure, retry exhaustion, and provider-level DB failure | EF06C-S004 | high |

---

## 6. Question hooks

- When does EF throw DbUpdateConcurrencyException?
- Why does optimistic concurrency require a configured token?
- Why might parent-row concurrency not catch a child-row insert race?
- When should a database constraint protect a check-then-add workflow?
- Why do multiple SaveChanges calls need an explicit transaction for atomicity?
- What is the difference between atomicity and isolation level?
- Why is ReadCommitted usually the default choice?
- What does ReadUncommitted actually mean?
- Why are EF change-tracker changes invisible to database reads before SaveChanges?
- Which exceptions should be caught around SaveChanges?
- Why can CommitAsync fail with provider-level exceptions?
- When does RetryLimitExceededException appear?
- What catch order is practical for save / transaction / execution strategy work?

---

## 7. Open review issues

- Run a final closure/audit pass to confirm no candidate-only EF Core images remain.
- `S-001` remains out-of-current-EFCore-scope; final audit should explicitly keep or move it.
- If future sources contain provider-specific SQL error-code handling, cross-reference EF06C rather than duplicating generic exception guide.
