# EFC-R04 - Transactions / concurrency / execution strategy

Conspect: `ef-core-general`  
File type: **source-level semantic transcript**  
Stage: **2 / transcript v001**  
Generated: 2026-06-13 05:40:30 UTC

---

## Direction check

Goal:
Close the remaining EF Core General Stage0 candidates after Stage1.

Done:
Stage1 processed R01/R02/R03 and left 11 candidates.

Now:
This file processes `6` sources for `EFC-R04`.

Why:
This is the second transcript pass, not only an audit summary.

Next:
After Stage2 review/commit, run EF Core General closure audit.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Transactions, optimistic concurrency, isolation levels, reading own changes, SaveChanges atomicity, and execution strategy / retry boundaries.
```

Key ideas:

- Without a configured concurrency token, EF usually will not throw a concurrency exception just because another request updated first.
- With a concurrency token, EF compares the original token with the current database token during SaveChanges.
- Use explicit transactions when multiple SaveChanges calls must succeed or fail together.
- Isolation level and atomicity are different concepts: a transaction gives all-or-nothing; isolation controls visibility between transactions.
- ReadCommitted is usually the SQL Server default; Snapshot can help with row-versioned consistent reads; ReadUncommitted is usually a bad business-write default.
- ReadUncommitted does not expose in-memory EF change tracker state; it concerns committed/uncommitted database writes.

Reading quality:
```text
Stage2 uses source-level semantic transcript from visible source images/contact sheets.
It is stronger than a coverage-only summary, but it is not a verbatim code-punctuation transcript.
For exact C# punctuation, use the preserved Stage0 PNG source images.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-004, S-013, S-022, S-028, S-030, S-032
```

Boundary decision:
```text
Included in EFC-R04 after Stage2 visual/semantic source review.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-004 | IU-004 | `0dc3625229` | `EFC-R04-transactions-concurrency-execution-strategy` | `verified-visible-semantic-transcript` | So for your scenario: |
| S-013 | IU-013 | `119679e20c` | `EFC-R04-transactions-concurrency-execution-strategy` | `verified-visible-semantic-transcript` | Important detail for the "check then add" case. |
| S-022 | IU-022 | `3710ca8272` | `EFC-R04-transactions-concurrency-execution-strategy` | `verified-visible-semantic-transcript` | SaveChanges atomicity and explicit transactions. |
| S-028 | IU-028 | `4e35b1cbc9` | `EFC-R04-transactions-concurrency-execution-strategy` | `verified-visible-semantic-transcript` | Which isolation level should you use? |
| S-030 | IU-030 | `b7164244ce` | `EFC-R04-transactions-concurrency-execution-strategy` | `verified-visible-semantic-transcript` | What about ReadUncommitted? |
| S-032 | IU-032 | `a9bd2293fc` | `EFC-R04-transactions-concurrency-execution-strategy` | `verified-visible-semantic-transcript` | Question: |

---

## 2. Source-level transcript

### S-004 - So for your scenario:

Metadata:
```text
source_id: S-004
image_use_id: IU-004
fileId_short: 0dc3625229
stage0_group: EFC-R04-transactions-concurrency-execution-strategy
stage2_region: EFC-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
So for your scenario:

1. Request A reads entity.
2. Request B reads same entity.
3. A checks current state and decides to add/update something.
4. B changes the entity first.
5. A later calls SaveChanges().

What happens depends on model and SQL constraints.

Without a concurrency token:
- EF usually will not throw a concurrency exception only because the row changed after A read it.
- For normal updates, the "last write wins" pattern can happen.
- Microsoft says that if concurrency detection is not enabled, later updates can overwrite earlier ones.

With a concurrency token:
- EF compares the original token it read with the current token in the database during SaveChanges().
- If another user changed that row first, EF sees that 0 rows were updated/deleted and throws DbUpdateConcurrencyException.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-013 - Important detail for the "check then add" case.

Metadata:
```text
source_id: S-013
image_use_id: IU-013
fileId_short: 119679e20c
stage0_group: EFC-R04-transactions-concurrency-execution-strategy
stage2_region: EFC-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Important detail for the "check then add" case.

If the logic is:
- read parent/order/cart/user;
- inspect its current children/count/status;
- decide whether to insert a new child row,

then EF concurrency on the parent row only helps if the parent row itself gets updated and has a concurrency token.

If only a new child row is inserted and the parent row is not updated, EF may have nothing to compare on the parent, so no concurrency exception is guaranteed.

In that case, the race is often caught only by:
- a database constraint such as unique index/check/foreign key; or
- explicit transaction/isolation level/locking strategy; or
- intentionally updating a versioned parent row as part of the operation.

Question:
Do you need IsRowVersion() or IsConcurrencyToken()?
For EF optimistic concurrency detection: yes, you need to configure something.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-022 - SaveChanges atomicity and explicit transactions.

Metadata:
```text
source_id: S-022
image_use_id: IU-022
fileId_short: 3710ca8272
stage0_group: EFC-R04-transactions-concurrency-execution-strategy
stage2_region: EFC-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
SaveChanges atomicity and explicit transactions.

If you want multiple SaveChanges calls to succeed or fail together, wrap them in one explicit transaction.

By default, each individual SaveChanges call runs in its own transaction, so two separate SaveChanges calls are not automatically atomic together.

EF Core docs say a single SaveChanges is transactional by default and BigInTransaction/BeginTransaction is used when several operations and SaveChanges calls need one transaction.

First distinction:
- Atomicity: all DB changes commit or all roll back.
- Isolation level: what one transaction can see from other concurrent transactions.

To get "all applied or reverted together", you need a transaction. Isolation alone does not give that.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-028 - Which isolation level should you use?

Metadata:
```text
source_id: S-028
image_use_id: IU-028
fileId_short: 4e35b1cbc9
stage0_group: EFC-R04-transactions-concurrency-execution-strategy
stage2_region: EFC-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Which isolation level should you use?

Usually:
- ReadCommitted is the normal SQL Server default and the default SQL Server isolation level.
- Snapshot can be useful when you need row-versioned consistent reads and want to reduce blocking, but it is a stronger design choice and the default answer for "I want both SaveChanges to roll back together" is not snapshot.
- ReadUncommitted is generally bad for business write workflows because it allows dirty reads. Microsoft calls READ UNCOMMITTED and row uncommitted modifications the least restrictive level.

For the stated scenario, ReadCommitted is usually the right default unless there is a specific concurrency reason to use Snapshot.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-030 - What about ReadUncommitted?

Metadata:
```text
source_id: S-030
image_use_id: IU-030
fileId_short: b7164244ce
stage0_group: EFC-R04-transactions-concurrency-execution-strategy
stage2_region: EFC-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
What about ReadUncommitted?

ReadUncommitted does not mean "include my EF change tracker changes."

It means SQL queries in that transaction may read other transactions' uncommitted database writes: dirty reads.

SQL Server says READ UNCOMMITTED allows reading modified data values that have not yet been committed by other transactions.

So this is about database-level reads, not in-memory EF objects.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

### S-032 - Question:

Metadata:
```text
source_id: S-032
image_use_id: IU-032
fileId_short: a9bd2293fc
stage0_group: EFC-R04-transactions-concurrency-execution-strategy
stage2_region: EFC-R04
status: verified-visible-semantic-transcript
transcript_method: Stage2 visible source-level semantic transcript
```

#### Verified visible semantic transcript
```text
Question:
If I modified an entity that I queried from DB, does ReadUncommitted know its changes?

No, not before SaveChanges.

Example:
var user = await db.Users.FindAsync(id);
user.Name = "New Name";

At that point:
- EF change tracker knows user.Name changed in memory.
- The database does not know yet.
- Transaction isolation levels do not affect that in-memory state.
- ReadUncommitted only affects what SQL reads from the database can see.

Until SaveChanges, those changes are not in the database at all. Isolation level has nothing to "see" there.
```

#### Notes

Stage2 source-level semantic transcript from visible source image/contact sheet; exact code punctuation should be checked against preserved PNG if needed.

---

## 3. Cleaned source notes

- Without a configured concurrency token, EF usually will not throw a concurrency exception just because another request updated first.
- With a concurrency token, EF compares the original token with the current database token during SaveChanges.
- Use explicit transactions when multiple SaveChanges calls must succeed or fail together.
- Isolation level and atomicity are different concepts: a transaction gives all-or-nothing; isolation controls visibility between transactions.
- ReadCommitted is usually the SQL Server default; Snapshot can help with row-versioned consistent reads; ReadUncommitted is usually a bad business-write default.
- ReadUncommitted does not expose in-memory EF change tracker state; it concerns committed/uncommitted database writes.

---

## 4. Open review issues

- If exact code punctuation matters, re-open the preserved Stage0 source PNG for that specific source.
- This Stage2 pass closes the remaining sources semantically and keeps source-image anchors for precision patches.
- After commit, run closure audit.
