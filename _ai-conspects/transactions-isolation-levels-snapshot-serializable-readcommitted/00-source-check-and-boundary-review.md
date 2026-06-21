# Stage0 source and boundary review - transactions-isolation-levels-snapshot-serializable-readcommitted

Generated: 2026-06-13 09:35:00 UTC

## Source

- SVG: `source/transactions-isolation-levels-snapshot-serializable-readcommitted.svg`
- Semantic title: Transactions and isolation levels: read committed, snapshot and serializable
- Stage0 is an inventory/boundary checklist only. It is not source of truth for final wording.

## Counts

```text
unique embedded images: 18
image uses on canvas: 18
text labels parsed: 71
duplicate image uses by extracted file/content: 0
```

## Candidate regions

| Region | Boundary / semantic road | Image uses | Text labels |
|---|---|---:|---:|
| R01 | Transaction basics, read committed and atomicity | 4 | 33 |
| R02 | Isolation levels: snapshot, serializable and read uncommitted | 0 | 15 |
| R03 | EF Core execution strategy, savepoints and retries | 14 | 9 |
| R04 | Locks, RCSI and serializable range protection | 0 | 14 |

## Parsed text labels

- T001 [R01] you can get all applied or all rolled back(atomicity)
- T002 [R01] with any isolation level
- T003 [R01] when reads are part of
- T004 [R01] transaction
- T005 [R01] when the query runs (linq/sql api to get smth)
- T006 [R01] readcommited
- T007 [R02] isolaton levels
- T008 [R02] how can help to avoid inconsistency
- T009 [R02] with multiple queries
- T010 [R02] with snapshot/serializable
- T011 [R01] so readcommited is ok when
- T012 [R01] we cant have some state changes from
- T013 [R01] other transaction
- T014 [R01] like when we have some
- T015 [R01] e tags that will prevent
- T016 [R01] update with incons stae
- T017 [R01] like when we change e tag on some
- T018 [R01] children changes
- T019 [R02] other isolaton levels, default
- T020 [R02] snapshot,
- T021 [R02] snapshot exception with code
- T022 [R02] when you update/delete/insert
- T023 [R02] based on old data
- T024 [R02] why serializable
- T025 [R01] reading your own
- T026 [R01] uncommited changes
- T027 [R01] dbcontext about transactions strategies
- T028 [R02] readuncommited
- T029 [R01] so i have some scenarios when i may need some
- T030 [R01] transaction or when i may think that i need them
- T031 [R01] 1 when i query something from db, look at it and chose to change it
- T032 [R01] but at the same time i may have another request that
- T033 [R01] changes the same thing
- T034 [R01] dont need manual transaction, can configure rowversion or
- T035 [R01] isconcurencytoken and ef will throw exceptions
- T036 [R01] 2 when i have multiple queries to get data
- T037 [R01] may need transaction with isolationlevel snapshot
- T038 [R01] 3 when i have some possible nesting of methods that mutate
- T039 [R01] queried entity and each may call savechanges
- T040 [R01] one savechanges succeds another fails and we get inconsistency
- T041 [R01] need to wrap everything in one transaction with any isolatoin level but usually with default
- T042 [R01] 4 when i have some database.executesql  or other like dbset.executeupdate (that is
- T043 [R01] linq based but everything else like executesql) - they all dont care about savechanges
- T044 [R01] so if i want them to be in a traqnsaction i need to create transaction
- T045 [R02] readcommited
- T046 [R02] repeatableread vs serialized
- T047 [R02] repeatableread vs serialized
- T048 [R02] repeatableread
- T049 [R03] isolation level
- T050 [R03] in manual retries from same tranaction
- T051 [R03] using savepoints cases
- T052 [R03] when we use execute (not in transaction)
- T053 [R03] method
- T054 [R03] and there is some ambigous outcome of
- T055 [R03] the transaction
- T056 [R03] by default - we will retry
- T057 [R03] !!!
- T058 [R04] locks with readcommited,
- T059 [R04] rcsi,serializable
- T060 [R04] when locks are acquired
- T061 [R04] on start of transaction
- T062 [R04] or on data touch?
- T063 [R04] read commited
- T064 [R04] rcsi
- T065 [R04] serializable
- T066 [R04] serializable protects the
- T067 [R04] range relevant to predicate
- T068 [R04] when both trans need to have isolation
- T069 [R04] serializable
- T070 [R04] to keep invariants
- T071 [R04] !!!

## Next pass recommendation

```text
Suggested first candidate: full pass = 18 image uses + 71 text labels.
Fallback split: use the region split plan if a single pass becomes too dense.
```

## Notes

- Visual/semantic boundary review is still required in transcript pass.
- Nearby means coordinate + semantic road, not just geometric adjacency.
- Image uses are tracked separately from unique image files.
