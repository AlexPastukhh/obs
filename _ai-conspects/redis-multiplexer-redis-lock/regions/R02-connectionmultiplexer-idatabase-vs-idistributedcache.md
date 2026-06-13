# R02 - ConnectionMultiplexer / IDatabase vs IDistributedCache

## Core idea

In StackExchange.Redis, `ConnectionMultiplexer` is the expensive shared connection object.

The normal pattern is:

```text
create/register one shared ConnectionMultiplexer
reuse it for the app lifetime
call GetDatabase()
use IDatabase for Redis commands
```

Do not create a new multiplexer per operation.

## ConnectionMultiplexer

The multiplexer manages connections, reconnects and command routing.

It is intended to be reused.

Bad pattern:

```text
new ConnectionMultiplexer per request
connect/disconnect on every Redis operation
```

Good pattern:

```text
register singleton
reuse across services
get IDatabase when needed
```

## IDatabase

`IDatabase` exposes Redis commands.

Examples:

```text
StringGet
StringSet
StringIncrement
KeyExpire
LockTake
LockRelease
```

Use `IDatabase` when you need Redis-specific operations such as atomic increment, locks, expirations or conditional commands.

## IDistributedCache

`IDistributedCache` is an abstraction for cache get/set/remove/refresh.

It is useful for simple distributed caching.

But it is limited compared to direct Redis access.

Good for:

```text
get cached bytes/string
set cache entry
remove cache entry
simple TTL cache
```

Not enough for:

```text
atomic increment
Redis locks
scripts
sets/hashes/streams
conditional commands
advanced expiry/compare behavior
```

## Choosing IDatabase vs IDistributedCache

Use `IDistributedCache` for portable simple caching.

Use `IDatabase` when the design depends on Redis semantics.

For failed attempts and locks, `IDatabase` is usually the right tool because the code needs:

```text
atomic increment
expire key
read TTL
lock acquire/release
```

## Registration idea

A common registration shape:

```text
singleton ConnectionMultiplexer
services use multiplexer.GetDatabase()
```

Then app services can depend on a Redis abstraction or directly on a service wrapper that uses `IDatabase`.

Wrapping Redis calls behind a service is useful because it keeps low-level keys and command details out of controllers.

## Boundary note

R02 closes P01 by covering Redis connection/access patterns.

P02 should cover atomic counters, race conditions, increment semantics, stampede protection and Redis locks.
