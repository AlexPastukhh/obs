# R04 - Performance tradeoffs, thread sharing and alternatives

Generated: 2026-06-21 14:45:12 UTC

## Source scope

```text
S-025, S-026
```

## Where MARS may be slower or less attractive

MARS does not fix every data-access bottleneck.

It may provide little benefit when the real problem is:

```text
slow query
poor indexing
large result materialization
network latency
object mapping/serialization
lock contention
```

It can also add coordination overhead and make transaction behavior harder to reason about.

## Blocking on the same connection

When one active request holds locks or has not reached a yield point, another request on the same MARS connection may still wait.

Therefore MARS is not a guarantee of useful concurrent progress.

## Sharing one connection across threads

MARS should not be used as a substitute for a proper connection-per-operation model.

Even when multiple active result sets are supported, provider objects and transaction state still have thread-safety and lifecycle constraints.

Prefer clear ownership:

```text
one operation owns one connection
or one unit of work deliberately owns one connection/transaction
```

## When alternatives are better

Consider:

```text
buffer/materialize the outer result before nested access
rewrite with JOIN or projection
split the operation into explicit phases
use a separate connection for truly independent work
avoid nested readers
```

## Savepoint requirement

If reliable transaction savepoints are important, enabling MARS can be the wrong tradeoff because savepoint behavior may be disabled or unsupported by the framework/provider.

## Practical decision

Enable MARS for a specific need, not by default.

Measure the actual bottleneck and prefer simpler connection/transaction semantics whenever possible.

