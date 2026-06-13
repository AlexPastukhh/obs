# R01 - Redis vs DB / failed attempts / cache choice

## Core idea

This region frames Redis as a fast in-memory store for short-lived counters and cache-like state.

The example context is failed attempts.

Typical requirement:

```text
count failed attempts
expire the count after a time window
check the count on each login/API request
block or throttle after threshold
```

Redis fits this because it supports fast atomic increments and key expiration.

## Why not only DB

A database can store failed attempts, but it is often heavier for high-frequency counters.

Problems with DB-only counters:

```text
many writes for every failed attempt
race conditions if read-modify-write is not protected
manual cleanup of expired rows
extra load on primary DB
slower hot-path checks
```

A DB is still useful for audit history, but Redis is better for hot-path temporary counters.

## Redis role

Redis works well for:

```text
short-lived counters
cache entries
rate-limit windows
lock markers
deduplication markers
temporary state with TTL
```

The key idea is that Redis data can expire automatically.

Example key idea:

```text
failed-login:user:123
ttl = 15 minutes
value = failed count
```

## Persistence distinction

Redis should not be treated as the only source of truth for important business records unless the system is explicitly designed that way.

Good split:

```text
DB = durable business/audit data
Redis = fast temporary operational data
```

For failed attempts:

```text
Redis = current window counter
DB/logging = optional security/audit history
```

## Boundary note

R01 explains why Redis is chosen.

R02 explains how ConnectionMultiplexer and IDatabase are used to access Redis correctly.
