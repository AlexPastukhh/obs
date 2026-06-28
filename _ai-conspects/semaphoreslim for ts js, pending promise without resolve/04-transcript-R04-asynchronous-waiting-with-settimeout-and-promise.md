# Regional transcript — R04: Asynchronous waiting with setTimeout and Promise

Conspect: `semaphoreslim for ts js, pending promise without resolve`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 2 / 2
image uses processed: 4 / 4
unique screenshots represented: 4
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`setTimeout` schedules a callback for a future task; wrapping it in a Promise creates an awaitable representation of that future completion.

## Timer behavior

- `setTimeout` registers a timer and returns immediately.
- The callback becomes eligible after the delay, not guaranteed to run exactly at that time.
- Long-running JavaScript delays the callback.
- The current thread is not blocked while waiting.

## Promise wrapper

- The Promise stays pending until the timer callback calls resolve.
- `await` suspends the async function and returns control to the caller/event loop.
- When resolved, the continuation is queued as a microtask.

## Cancellation

- Store the timer ID.
- Clear the timer during cleanup.
- An AbortSignal can reject or resolve according to the API contract.
- Ensure only one settlement path wins.

## Representative pattern

```ts
function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const id = setTimeout(resolve, ms);

    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(signal.reason);
    }, { once: true });
  });
}
```

## Caveats

- A delay Promise is not a semaphore; it does not represent resource ownership.
- Timer delays are minimum thresholds, not precise real-time scheduling.

## Source labels

- `waiting asynchronously`
- `with settimeout and promise`

## Covered text elements

```text
T-004, T-005
```

## Covered screenshot uses

```text
IU-022, IU-023, IU-024, IU-025
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
