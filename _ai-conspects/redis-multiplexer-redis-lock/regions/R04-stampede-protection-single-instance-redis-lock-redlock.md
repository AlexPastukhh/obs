# R04 - Stampede protection / Redis lock / RedLock

Generated: 2026-06-13 09:03:25 UTC

## Core idea

A cache stampede happens when many requests miss the same cache key and all try to rebuild the value at once.

Example:

```text
popular key expires
100 requests arrive
all 100 hit DB/external service
all 100 rebuild same cache item
```

A Redis lock can reduce this by allowing only one request to rebuild while others wait, reuse stale data or fail fast.

## Single-instance Redis lock

A common Redis lock uses:

```text
SET lock-key unique-token NX PX ttl
```

Meaning:

```text
NX = only set if not exists
PX ttl = auto-expire lock
unique-token = owner identity
```

If set succeeds, this process owns the lock.

## Lock release

A lock should only be released by its owner.

The safe release pattern compares the stored token before deleting.

Conceptually:

```text
if redis.get(lockKey) == myToken:
    redis.del(lockKey)
```

This should usually be done atomically, often with a Lua script.

Why?

```text
lock can expire
another process can acquire it
old process must not delete new owner's lock
```

## Lock TTL

The lock must have a TTL so dead processes do not hold it forever.

But TTL must be chosen carefully.

Too short:

```text
work still running
lock expires
another process enters
duplicate rebuild happens
```

Too long:

```text
failure delays all other requests
```

The TTL should be longer than expected work, with safety margin.

## Stampede pattern

One common pattern:

```text
try read cache
if hit: return value

try acquire lock
if acquired:
    rebuild value
    store cache
    release lock
else:
    wait briefly and retry cache
    or return stale value
    or fail fast
```

This keeps the DB/external source from being hammered.

## RedLock note

RedLock is a distributed locking algorithm using multiple Redis masters.

It is intended for stronger distributed lock guarantees than a single Redis instance.

But it is also more complex and debated.

Practical rule:

```text
single Redis lock may be enough for best-effort stampede protection
critical distributed correctness needs deeper design
```

Do not present Redis lock as a universal replacement for database transactions or durable coordination.

## Use cases

Good fit:

```text
cache rebuild protection
best-effort duplicate work prevention
short-lived operational locks
```

Risky fit:

```text
financial transaction correctness
long-running critical sections
global exactly-once guarantees
```

## Boundary note

R04 closes the Redis multiplexer/lock conspect.

After R03/R04, the only remaining step is final coverage audit.
