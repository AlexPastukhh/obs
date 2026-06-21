# R03 - Yield points, savepoints, session cache and MARS constraints

Generated: 2026-06-21 14:45:12 UTC

## Source scope

```text
S-017, S-018, S-019, S-020, S-021, S-022, S-023, S-024
```

## What MARS changes

With MARS disabled, one connection generally executes one active request/result set at a time.

With MARS enabled, the same physical connection can host multiple active requests/result sets and SQL Server may interleave their execution.

Important distinction:

```text
interleaving != parallel execution
```

MARS does not make one connection a replacement for independent parallel connections.

## Yield points

MARS can switch between active batches at operations that yield rows or messages.

Examples include:

```text
SELECT / FETCH NEXT
RECEIVE from SQL Server Service Broker
other row-producing statements
```

A cursor fetch is naturally incremental, so it can yield between rows.

`RECEIVE` returns messages from a queue, so it is also an incremental result-producing operation.

## Session cache

MARS uses logical sessions over the same connection.

The provider can cache a limited number of MARS sessions for reuse, while additional sessions may still be created when needed.

This is an implementation optimization, not a reason to open unlimited readers.

## Transactions and savepoints

MARS and transaction savepoints conflict in important frameworks/providers.

EF Core may disable automatic savepoint creation when MARS is enabled.

Why this matters:

```text
transaction begins
savepoint would normally protect partial work
multiple active MARS readers/requests exist
rollback-to-savepoint expectations become unsafe or unsupported
```

This can make retry and recovery behavior less predictable.

## Multiple active readers in one transaction

Several active readers may share one connection and transaction, but they are not isolated independent transactions.

They still share:

```text
the same physical connection
the same transaction context
database locks and blocking
provider constraints
```

A reader left open can prevent another command from making useful progress.

## Core rule

Use MARS to permit multiple active result sets when the workflow genuinely requires interleaving.

Do not treat it as a general concurrency or transaction-isolation feature.

