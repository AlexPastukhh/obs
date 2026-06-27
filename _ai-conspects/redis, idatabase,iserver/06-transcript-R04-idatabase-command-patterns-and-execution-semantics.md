# Regional transcript — R04: IDatabase command patterns and execution semantics

Conspect: `redis, idatabase,iserver`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

`IDatabase` is the main command facade for keys and data structures. It is cheap to obtain and routes work through the shared multiplexer.

## Facade behavior

- `IDatabase` is a lightweight wrapper around the multiplexer and selected logical database.
- Its async methods return tasks representing command completion and do not require a dedicated connection per call.
- The interface exposes strings, hashes, lists, sets, sorted sets, key expiry and many other commands.

## Atomicity

- A single Redis command is atomic on the server.
- A sequence of separate commands is not automatically atomic.
- Use server-side commands, Lua scripts or optimistic transactions when several steps must behave as one logical operation.

## Pipelining and concurrency

- Issuing several async operations before awaiting them allows the client to pipeline commands.
- Pipelining improves network utilization but does not imply a multi-command transaction.
- Unbounded fan-out can still create memory and latency pressure; application-level limits may be needed.

## Batch and transaction APIs

- `CreateBatch` groups command dispatch for pipelining but does not provide isolation.
- `CreateTransaction` adds conditions and queues commands for optimistic execution.
- Both require explicit execution and careful task handling.

## Command flags

- Flags can select primary/replica preferences or fire-and-forget behavior.
- Fire-and-forget intentionally discards completion and errors and should be reserved for operations where loss is acceptable.

## Caveats

- Do not confuse batching with atomicity.
- Timeouts often indicate server, network or client backlog pressure rather than a need to recreate connections.

## Nearby source labels

- !!!
- !!!!
- iserver

## Covered screenshot uses

```text
IU-034, IU-035, IU-036, IU-037, IU-038, IU-039, IU-040, IU-045, IU-046, IU-048, IU-049, IU-050
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
