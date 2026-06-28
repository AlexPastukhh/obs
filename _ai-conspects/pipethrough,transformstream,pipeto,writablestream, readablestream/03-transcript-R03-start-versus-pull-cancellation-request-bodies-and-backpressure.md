# Regional transcript — R03: start versus pull, cancellation, request bodies and backpressure

Conspect: `pipethrough,transformstream,pipeto,writablestream, readablestream`  
Generated: 2026-06-28 09:00:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 15 / 15
unique screenshots represented: 15
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`start()` and `pull()` are two producer strategies. `start()` is convenient for eager setup, while `pull()` better models data that should be generated only when downstream demand exists.

## Eager start

- `start(controller)` executes once during construction.
- It is appropriate for initialization, wiring an event source, starting a timer, or enqueuing a small amount of immediate data.
- An eager producer can overfill the internal queue if it generates data faster than consumers can process it.

## Demand-driven pull

- `pull(controller)` is invoked when the stream wants more data according to its queue and high-water mark.
- It is useful for paged data, async iterators, file readers, or generated request-body chunks.
- The producer can await one next item, enqueue it, and close when the source is exhausted.

## Backpressure model

- The readable side tracks an internal queue and exposes `controller.desiredSize` as a demand signal.
- Using `pull()` lets the producer avoid eagerly constructing the entire upload body in JavaScript memory.
- When the fetch/network pipeline consumes bytes more slowly, demand-driven production can reduce application-side buffering.

## Cancellation propagation

- When the consumer stops, `cancel(reason)` should stop the producer and free resources.
- For an async iterator, call or await `iterator.return()` where appropriate so its `finally` block runs.
- For intervals, readers, sockets, subscriptions, workers, or event listeners, cancellation should reverse the setup performed by the producer.

## Representative patterns

```js
const encoder = new TextEncoder();
const iterator = getItemsAsync()[Symbol.asyncIterator]();

const body = new ReadableStream({
  async pull(controller) {
    const { value, done } = await iterator.next();

    if (done) {
      controller.close();
      return;
    }

    controller.enqueue(
      encoder.encode(JSON.stringify(value) + "
")
    );
  },

  async cancel(reason) {
    console.log("cancelled", reason);
    await iterator.return?.();
  }
});
```

## Caveats

- `pull()` is not proof that the browser emits exactly one network packet per call.
- Backpressure crosses several layers and can include internal buffering in the stream, fetch implementation, transport, proxy, and server.
- Do not enqueue again after closing or erroring the controller.

## Covered source units

### Text elements

```text
T-036, T-039, T-040, T-041, T-042, T-043
```

### Screenshot uses

```text
IU-100, IU-101, IU-102, IU-103, IU-104, IU-105, IU-112, IU-113, IU-116, IU-117, IU-118, IU-119, IU-120
IU-121, IU-122
```

The preserved SVG and extracted screenshots remain authoritative for exact code, punctuation, source-version details, and visual ordering.
