# SemaphoreSlim versus Channel<T>

Source conspect: `semaphoreslim vs channel.svg`  
Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area overview / reading quality

This compact sheet contains 9 image placements and 7 canvas text labels. The main concepts and code examples were visually reviewed as one coherent area. Exact code punctuation remains preserved in `source/images/` and the original SVG.

## Verified transcript

### Different dimensions

`SemaphoreSlim` limits how many operations may execute concurrently. It coordinates access but does not carry work items or messages. `Channel<T>` is an asynchronous producer-consumer queue: producers write values and consumers await/read them.

### When SemaphoreSlim fits

Use `SemaphoreSlim` when an operation should start immediately once a concurrency permit is available, order is not a queue concern, and the main requirement is preventing too many simultaneous calls. Typical examples include limiting outbound HTTP calls, database operations or CPU-heavy work.

### When Channel<T> fits

Use a channel when work can be produced now and consumed later, when messages must be queued, when bounded capacity/backpressure is useful, or when one/multiple producer and consumer loops should be decoupled. Channels coordinate data flow over time, not only access counts.

### Operational contrast

A semaphore is essentially a counter with asynchronous waiting. A channel owns stored items and wakes readers when data arrives. The supplied examples contrast semaphore-gated concurrent handling with a WebSocket-style outgoing-message queue processed by a dedicated sender loop.

## Evidence map

Image placements: `S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009`

Canvas labels: `T-001, T-002, T-003, T-004, T-005, T-006, T-007`

Detailed coordinates and hashes are stored in `data/image-uses.*`, `data/text-labels.*`, and the review ledgers.

## Final coverage

```text
image uses processed: 9
text labels processed: 7
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```