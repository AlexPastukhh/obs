# Regional transcript — R01: Redis setup, connection options, strings and keys

Conspect: `redis, idatabase,iserver`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 7 / 7
unique screenshots represented: 7
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

This region covers StackExchange.Redis connection setup, database selection, key naming and the basic string command surface.

## Connection setup

- Create one long-lived `ConnectionMultiplexer` and reuse it; it manages sockets, reconnects and command routing.
- Parse or build `ConfigurationOptions` for endpoints, credentials, SSL, timeouts, abort behavior and administrative permissions.
- `GetDatabase(databaseNumber)` returns a lightweight logical database facade; it is not a separate physical connection.

## Keys

- `RedisKey` represents a Redis key and supports implicit conversion from strings and byte arrays.
- Use stable prefixes or a naming convention to partition application data and avoid collisions.
- Expiry belongs to the key, not to individual hash fields or list elements.

## Strings

- Strings are binary-safe values used for text, numbers, serialized objects, counters and short blobs.
- `StringSet` writes a value and can combine expiry and conditional modes such as only-if-not-exists.
- `StringGet` returns `RedisValue`; missing keys produce a null-like Redis value rather than throwing.
- Atomic increment/decrement operations are preferable to read-modify-write loops.

## Command arguments

- Most operations accept command flags and optional conditions without requiring a new connection.
- Batching, transactions and fire-and-forget flags change execution semantics and should be selected deliberately.

## Caveats

- Do not create a `ConnectionMultiplexer` per request.
- Database numbers are logical partitions, not security boundaries.

## Nearby source labels

- strings
- setup
- keys
- lists
- options/args

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-009, IU-010, IU-056
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
