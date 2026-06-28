# Regional transcript — R02: Acquire/release queue and direct waiter handoff

Conspect: `semaphoreslim for ts js, pending promise without resolve`  
Generated: 2026-06-28 10:30:00 UTC

## Coverage

```text
text elements represented: 5 / 5
image uses processed: 13 / 13
unique screenshots represented: 13
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

When no permit is available, `acquire` returns a pending Promise and queues its resolver. `release` should hand the permit directly to the oldest waiter instead of incrementing the public permit count first.

## Immediate acquire

- If permits are greater than zero, decrement the count.
- Resolve immediately with a release callback.
- The caller enters without joining the queue.

## Queued acquire

- If no permit exists, construct a Promise.
- Store its resolver in a FIFO waiter queue.
- The Promise remains pending until a future release calls that resolver.
- No thread is blocked while the caller awaits.

## Direct handoff

- On release, check the waiter queue first.
- If a waiter exists, dequeue it and resolve it with a new release callback.
- Do not increment permits in that branch because ownership moves directly to the waiter.
- Increment permits only when there are no waiters.

## Safety

- Make each release callback idempotent so double release cannot inflate capacity.
- Validate that initial capacity is positive.
- FIFO ordering provides basic fairness.
- Cancellation requires removing or marking a queued waiter.

## Representative pattern

```ts
class Semaphore {
  private permits: number;
  private waiters: Array<(release: () => void) => void> = [];

  constructor(permits: number) {
    if (permits <= 0) throw new Error("permits must be positive");
    this.permits = permits;
  }

  acquire(): Promise<() => void> {
    if (this.permits > 0) {
      this.permits--;
      return Promise.resolve(this.createRelease());
    }

    return new Promise(resolve => this.waiters.push(resolve));
  }

  private createRelease(): () => void {
    let released = false;

    return () => {
      if (released) return;
      released = true;

      const waiter = this.waiters.shift();
      if (waiter) waiter(this.createRelease());
      else this.permits++;
    };
  }
}
```

## Caveats

- Without cancellation support, abandoned queued waiters can remain indefinitely.
- Do not expose a raw unrestricted `release()` that can be called without a successful acquire.

## Source labels

- `so when we do acquire we reduce count of permits and if there is no perimts`
- `we give permit directly to`
- `the enqueeued waiter,`
- `we incr permits only if there is no`
- `direct waiters`

## Covered text elements

```text
T-001, T-008, T-009, T-010, T-011
```

## Covered screenshot uses

```text
IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013, IU-014, IU-015, IU-016, IU-032
```

## Reading quality

- The complete regional contact sheet was reviewed.
- The semantic road and examples were readable.
- Exact punctuation and version-specific details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the main concepts and flow represented here.
