# Regional transcript — R05: Event loop, threads and why Promise is needed

Conspect: `semaphoreslim for ts js, pending promise without resolve`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 6 / 6
unique screenshots represented: 6
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

JavaScript's event loop executes ordinary callbacks one at a time, while browser or runtime facilities perform timers and I/O externally. Promises represent future completion and reconnect that external event to structured async code.

## Does setTimeout block?

- `setTimeout` does not sleep the JavaScript thread.
- It registers work with the host timer facility.
- The current call stack continues and eventually empties.
- The timer callback runs in a later task when the event loop can execute it.

## Promise role

- A Promise gives a value representing pending completion.
- `await` composes that future into sequential-looking code.
- The resolver connects a callback/event to the waiting async function.
- Without a Promise or callback, there is no object the caller can await.

## Tasks and microtasks

- Timer callbacks enter the task/macrotask queue.
- Promise continuations enter the microtask queue after settlement.
- Microtasks run after the current stack and before the next task.
- Understanding the queues explains apparent ordering differences.

## Semaphore connection

- A queued acquire returns a Promise immediately.
- Release settles that Promise.
- The waiting async function resumes without any blocked JavaScript thread.
- Many waiting operations can exist as lightweight pending state.

## Representative pattern

```ts
console.log("A");

setTimeout(() => console.log("timer"), 0);
Promise.resolve().then(() => console.log("microtask"));

console.log("B");

// A, B, microtask, timer
```

## Caveats

- Single-threaded JavaScript can still have race conditions between asynchronous operations.
- Promise scheduling order does not replace explicit concurrency control.

## Source labels

- `js threads, does setimeout block`
- `why do we need promise here`

## Covered text elements

```text
T-006, T-007
```

## Covered screenshot uses

```text
IU-026, IU-027, IU-028, IU-029, IU-030, IU-031
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
