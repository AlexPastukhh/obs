# Regional transcript — R03: Pending Promise mechanics

Conspect: `semaphoreslim for ts js, pending promise without resolve`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 1 / 1
image uses processed: 5 / 5
unique screenshots represented: 5
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A Promise stays pending until its captured `resolve` or `reject` function is called. Storing the resolver lets another event complete the asynchronous wait.

## Executor timing

- The Promise constructor executor runs synchronously.
- It receives resolver functions.
- If neither resolver is called, the Promise remains pending.
- Awaiting code yields control to the event loop rather than blocking.

## External completion

- Save the resolver in a queue or variable.
- A later release/event calls it.
- Resolution schedules awaiting continuations as microtasks.
- A Promise settles only once; later resolve/reject calls are ignored.

## Dangling promises

- A resolver that is never called creates a permanently pending operation.
- References held by queues or closures can also retain memory.
- Provide cancellation, timeout or shutdown behavior for long-lived infrastructure.

## Representative pattern

```ts
let wake!: () => void;

const pending = new Promise<void>(resolve => {
  wake = resolve;
});

// Later:
wake();
await pending;
```

## Caveats

- A pending Promise does not keep the event loop alive by itself in every runtime.
- Capturing a resolver creates responsibility to eventually settle or cancel the operation.

## Source labels

- `pending promise`

## Covered text elements

```text
T-002
```

## Covered screenshot uses

```text
IU-017, IU-018, IU-019, IU-020, IU-021
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
