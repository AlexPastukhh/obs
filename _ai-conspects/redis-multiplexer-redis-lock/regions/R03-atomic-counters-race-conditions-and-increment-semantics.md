# R03 - Atomic counters / race conditions / increment semantics

Generated: 2026-06-13 09:03:25 UTC

## Core idea

Redis is useful for counters because increment operations are atomic on the Redis server.

For failed attempts, rate limits or request counters, atomicity matters.

Bad pattern:

```text
read value
increment in app memory
write value back
```

This can lose updates when two requests run at the same time.

## Race condition

A race can happen like this:

```text
request A reads counter = 3
request B reads counter = 3
A writes 4
B writes 4
```

Two failures happened, but the final value is 4 instead of 5.

This is the classic lost-update problem.

## Redis increment

Redis increment commands avoid this because the increment happens as one atomic command inside Redis.

Conceptual operation:

```text
StringIncrement(key)
```

Redis receives the command and updates the value without the application doing a separate read/modify/write cycle.

## Failed-attempt counter

A typical flow:

```text
key = failed-login:user:{id}
count = INCR key
if count == 1: EXPIRE key 15 minutes
if count >= threshold: block/throttle
```

The TTL defines the time window.

The increment defines the current count.

## Expiration concern

If the key is new, the app usually sets expiration.

Important subtlety:

```text
increment and expire are two commands
```

If the app crashes between them, a key could exist without TTL.

Depending on strictness, this can be handled by:

```text
Lua script
transaction/condition
checking TTL and setting expiration
accepting the small risk for simple cases
```

## IDatabase usage

`IDatabase` exposes Redis-specific commands needed for this pattern.

Important operations:

```text
StringIncrementAsync
KeyExpireAsync
KeyTimeToLiveAsync
StringGetAsync
```

This is why `IDatabase` is more appropriate than `IDistributedCache` for counters.

## Threshold logic

The application checks the returned count.

Example meaning:

```text
count < 5 -> allow retry
count >= 5 -> block or challenge
```

This threshold logic should be in an application service, not scattered through controllers.

## Boundary note

R03 covers atomic counter semantics.

R04 covers cache stampede protection and Redis locking.
