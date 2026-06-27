# Full combined final transcript — redis, idatabase,iserver

Generated: 2026-06-27 08:00:00 UTC

## 01 Source basis and coverage

```text
meaningful text elements: 20 / 20
unique embedded screenshots: 56 / 56
screenshot uses on canvas: 56 / 56
repeated screenshot placements retained: 0
remaining text elements: 0
remaining screenshot uses: 0
```

## 02 Connection and object model

`ConnectionMultiplexer` is the long-lived connection manager. It owns sockets,
reconnection logic, endpoint discovery and command routing. Create and reuse it
rather than constructing one per request.

`IDatabase` is a lightweight logical-database command facade. Obtaining it does
not open a dedicated connection. `IServer` targets a particular Redis endpoint
for server-local inspection and administrative operations.

```text
ConnectionMultiplexer
├── GetDatabase() → IDatabase
└── GetServer(endpoint) → IServer
```

## 03 Keys and strings

`RedisKey` is a binary-safe key type with convenient conversions. Use a stable
prefixing convention and remember that expiry applies to the entire key.

Strings support text, bytes, numbers, counters and serialized values.
`StringSet` can combine expiry and conditional write modes. `StringGet` returns
`RedisValue`; a missing key must be distinguished from an empty value.

Use atomic Redis increment/decrement and conditional operations instead of
client-side read-modify-write loops.

## 04 Hashes, lists, sets and sorted sets

Hashes provide field-level operations under one key, but fields do not have
independent TTLs.

Lists provide ordered push/pop/range operations and can model queues or stacks.

Sets provide uniqueness, membership tests and set algebra.

Sorted sets add a score to each unique member and support rank and score ranges.

Choose the structure by the atomic server-side operation the application needs.

## 05 RedisValue

`RedisValue` carries text, bytes and numeric representations. Its implicit and
explicit conversions are convenient, but callers must check missing/null values
before converting to non-nullable types.

Missing and empty are different. Binary payloads should be read as bytes rather
than accidentally decoded as text.

The library overloads equality and conversion operators for `RedisKey` and
`RedisValue`; these are library value semantics, not a replacement for explicit
domain validation.

## 06 IDatabase execution semantics

One Redis command is atomic. Several separate commands are not automatically
atomic.

Issuing multiple asynchronous commands before awaiting them enables pipelining,
which reduces network round trips but does not provide transaction isolation.

`CreateBatch` coordinates dispatch for pipelining. `CreateTransaction` adds
conditions and optimistic execution. Lua scripts or dedicated atomic commands
are often preferable when several steps must execute together.

Command flags can influence routing or select fire-and-forget behavior.
Fire-and-forget discards completion and errors, so it is appropriate only when
loss is acceptable.

## 07 IServer and key scanning

`IServer` exposes endpoint-specific operations such as server info,
configuration, database size and key enumeration.

`IServer.Keys` uses cursor-based scanning when possible. Enumeration is lazy and
can issue many calls. It is safer than a blocking full `KEYS` command, but still
expensive and not a stable snapshot.

Avoid production keyspace scans in request paths. Maintain explicit sets or
indexes of relevant keys when application workflows need enumeration.

In replicated or clustered deployments, one server facade does not necessarily
represent every key or node.

## Regional source map

### R01 — Redis setup, connection options, strings and keys

Coverage: `7` screenshot uses, `7` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `03-transcript-R01-redis-setup-connection-options-strings-and-keys.md`.

### R02 — Hashes, lists, sets and sorted sets

Coverage: `13` screenshot uses, `13` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `04-transcript-R02-hashes-lists-sets-and-sorted-sets.md`.

### R03 — RedisValue conversions, null semantics and typed access

Coverage: `9` screenshot uses, `9` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `05-transcript-R03-redisvalue-conversions-null-and-typed-access.md`.

### R04 — IDatabase command patterns and execution semantics

Coverage: `12` screenshot uses, `12` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `06-transcript-R04-idatabase-command-patterns-and-execution-semantics.md`.

### R05 — IServer operations, key scanning and operator behavior

Coverage: `15` screenshot uses, `15` unique screenshots, `0` repeated placements, `0` remaining. Detailed file: `07-transcript-R05-iserver-key-scanning-and-operator-behavior.md`.

## Exactness note

This document is the authoritative integrated semantic transcript. The complete
SVG and recovered screenshots remain authoritative for exact punctuation,
version-specific API signatures and code spelling.
