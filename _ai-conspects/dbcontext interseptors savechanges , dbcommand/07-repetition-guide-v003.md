# DbContext / SaveChanges / DbCommand interceptors — repetition guide

Generated: 2026-06-29

## Core mental model

1. `SaveChangesInterceptor` works at the tracked-entity and unit-of-work lifecycle level.
2. `DbCommandInterceptor` works at the raw ADO.NET command level.
3. Pre-operation callbacks can suppress pending work.
4. Post-operation callbacks cannot undo completed work.
5. `InterceptionResult<T>` controls continue/suppress and supplies a shape-compatible replacement result.
6. Save callbacks have separate success, failure, concurrency, and cancellation phases.
7. Reader/scalar/non-query command callbacks differ because their result shapes differ.
8. Command event data supports correlation by command, connection, context, and command source.
9. SQL modification and command suppression are possible but require narrow, deliberate policies.
10. Concurrency-exception suppression requires an explicit domain-resolution strategy.

## Comparison questions

1. Compare `SavingChanges`, `SavedChanges`, `SaveChangesFailed`, `ThrowingConcurrencyException`, and `SaveChangesCanceled`.
2. Compare whole-save suppression with concurrency-exception suppression.
3. Compare `ReaderExecuting`, `ScalarExecuting`, and `NonQueryExecuting`.
4. Compare `CommandId`, `ConnectionId`, and `CommandSource`.
5. Compare result modification after execution with suppression before execution.
6. Compare `Problem: a value is stale` with `Problem: a SQL command must not execute`; which interceptor layer is appropriate?
7. Explain why a post-save result can differ from the real affected-row count.
8. Explain how an ordinary failure callback relates to an unsuppressed concurrency callback.

## Coding prompts

1. Write a SaveChanges interceptor that stamps `CreatedAt` and `UpdatedAt`.
2. Write success/failure/cancellation logging callbacks.
3. Write a scoped marker service for whole-save suppression.
4. Write a narrow idempotent concurrency-suppression workflow.
5. Write a reader interceptor that logs SQL and parameters.
6. Write scalar before/after logging including runtime result type.
7. Write a non-query interceptor that distinguishes SaveChanges from migrations through `CommandSource`.
8. Register both a SaveChanges interceptor and a DbCommand interceptor through DI.
9. Write tests proving that suppression returns a replacement value without executing SQL.
10. Write a policy that rejects a forbidden command, and list the security and correctness risks.

## High-risk misconceptions

- `SavedChanges` cannot cancel a save that already completed.
- Suppressing a concurrency exception is not the same as resolving the conflict.
- A command interceptor sees SQL commands, not the full semantic intent of the entity operation.
- `ScalarExecuting` returns `object` because scalar database values are heterogeneous.
- Returning a modified affected-row count does not alter the database.
- `CommandSource` is safer than guessing command origin from SQL text.
