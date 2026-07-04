# EF Core retries and savepoints - repetition questions

Source: `regions/full-semantic-transcript-v001.md`

## Execution strategies

1. What problem does an EF Core execution strategy solve?
2. Which failures should normally be considered transient?
3. What does `EnableRetryOnFailure` configure?
4. What does `Database.CreateExecutionStrategy()` return?
5. What is the default retriable unit when retries are enabled and no explicit transaction is used?
6. Why are several independent EF calls not automatically one retriable application operation?
7. Why must a user-created transaction be started inside the execution-strategy delegate?
8. What can happen if an already-tracked entity is incremented inside a delegate that is retried?
9. Why is fresh context or entity state often safer for every retry attempt?
10. Can `ExecuteAsync` be useful without an explicit database transaction?

## Savepoints and SaveChanges

11. When does EF Core create a savepoint automatically?
12. What does EF roll back when a `SaveChanges` call fails inside an existing transaction?
13. Which work remains after rollback to the latest savepoint?
14. Who decides whether to retry, continue, or roll back the whole transaction?
15. Why is SQL Server MARS relevant to EF savepoints?
16. How is savepoint rollback different from execution-strategy retry?

## Tracked-state acceptance

17. What does normal `SaveChanges` do after a successful write?
18. What is different about `SaveChanges(false)`?
19. Why can accepting tracked changes too early make ambiguous-commit recovery harder?
20. When should `ChangeTracker.AcceptAllChanges()` be called?
21. When may `SaveChanges(false)` be unnecessary?
22. What question determines whether tracked state needs to be preserved?

## ExecuteInTransactionAsync

23. What problem does `ExecuteInTransactionAsync` add to normal retry support?
24. What are the three possible commit outcomes?
25. Why is `verifySucceeded` unnecessary on the clean success path?
26. How is a clear commit failure handled?
27. What makes a commit outcome ambiguous?
28. What should `verifySucceeded` check?
29. Why is a client-generated key useful for verification?
30. Why can a blind replay of a non-idempotent operation be dangerous?

## Buffering

31. Why can retries cause EF to buffer a result set internally?
32. Why can `await foreach` stop being true streaming when retries are enabled?
33. How can `ToListAsync` create a second full in-memory representation?
34. Is this retry buffer in SQL Server memory or application memory?
35. Why is `AnyAsync` normally not a large buffering concern?

## Pooling and multiple contexts

36. What kind of configuration must remain stable for a pooled context?
37. Why must request-specific mutable state such as `TenantId` always be overwritten?
38. Why is `OnConfiguring` not a per-request hook for pooled contexts?
39. What designs support two fixed context configurations safely?
40. Why is a per-tenant connection string harder than a mutable tenant ID?
41. Under what conditions can two contexts share one transaction?
42. What does `UseTransaction` accomplish?
43. Can one context with retries and another without retries participate in the same logical application?

## Isolation and failure types

44. Does isolation level directly decide whether `EnableRetryOnFailure` retries?
45. Under `ReadCommitted`, why can same-transaction re-read after a savepoint be useful?
46. What does `READ_COMMITTED_SNAPSHOT` change?
47. Is RCSI a separate EF `IsolationLevel` enum value?
48. Why does `Snapshot` usually favor restarting the transaction?
49. Why are `RepeatableRead` and `Serializable` poor fits for hoping to see fresher data after a savepoint?
50. How should `DbUpdateConcurrencyException` normally be handled?
51. Which failure type belongs to execution-strategy retry?
52. Which failure type belongs to application conflict resolution?
53. Which failure type requires verification or idempotency?
54. Why is an unknown commit outcome not a savepoint problem?

## Scenario review

55. A transaction contains two saves and the second save violates a foreign key. What can a savepoint preserve?
56. A connection drops during commit and the insert uses an auto-generated identity. What risk exists on replay?
57. A query returns 500,000 rows through `AsAsyncEnumerable` with retries enabled. What memory behavior should be expected?
58. A pooled context exposes the previous request's tenant. Which reset rule was violated?
59. A `Snapshot` transaction receives a concurrency conflict. Why may retrying after a savepoint see the same old state?
60. A developer catches `DbUpdateConcurrencyException` and relies on the transient retry strategy. What is conceptually wrong?
