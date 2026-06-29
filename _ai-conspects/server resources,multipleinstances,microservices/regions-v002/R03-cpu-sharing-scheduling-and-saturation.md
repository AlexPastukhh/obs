# CPU sharing, scheduling, and saturation

Generated: 2026-06-30

## Transcript policy

- Every embedded screenshot has a dedicated source block.
- Concrete numbers, analogies, and terminology are preserved.
- Explanation is separated from near-literal source content.
- Every source includes recall questions.

## S-019 — CPU as a shared compute-time budget

**Known limits:** none

### Near-literal normalized transcript

CPU is also a shared server resource.

The server has a limited amount of compute time, and all requests compete for slices of that time.

### Mental model

A machine may have:

- `4` CPU cores;
- `8` CPU cores;
- `32` CPU cores.

Each core can execute only so much work at once. If many requests arrive, all their CPU work shares the available cores.

### Study meaning

Core count changes the total parallel compute capacity, but requests still compete for finite CPU time.

### Recall questions

1. Which three core-count examples are used?
2. What exactly is shared between requests?
3. Does adding requests create more compute time?


---

## S-020 — What consumes CPU in a web application

**Known limits:** none

### Near-literal normalized transcript

### What uses CPU in a web app

A request may need CPU for:

- parsing HTTP headers;
- routing;
- authentication checks;
- JSON serialization and deserialization;
- validation;
- compression and decompression;
- encryption and TLS;
- business logic;
- regular-expression or string processing;
- image or file processing;
- database result mapping.

Even requests that are mostly I/O still have some CPU cost.

### Study meaning

I/O-bound does not mean CPU-free. Every request has parsing, framework, serialization, validation, and scheduling overhead.

### Recall questions

1. Name six CPU-consuming operations from the list.
2. Why does an I/O-heavy request still consume CPU?
3. Which operations may become especially expensive for large bodies?


---

## S-021 — Scheduling and time slicing across cores

**Known limits:** none

### Near-literal normalized transcript

Think of an `8`-core CPU as a limited pool of compute time shared across runnable work.

The important refinement: it is not usually true that a request receives one full core and owns it until completion.

It is more like:

> The OS/runtime schedules many runnable threads and tasks onto the available cores over time.

One core may execute work for:

- request A for a moment;
- then request B;
- then GC or runtime work;
- then request C;

very quickly through time slicing.

### Study meaning

A logical request is not permanently bound to one core. Scheduling interleaves runnable work and runtime tasks.

### Recall questions

1. What incorrect mental model is rejected?
2. Who schedules runnable work onto cores?
3. What four kinds of work may execute sequentially on one core?


---

## S-022 — Per-request CPU budgets

**Known limits:** none

### Near-literal normalized transcript

### Better picture

Imagine each request needs a certain amount of CPU work:

```text
request A -> 5 ms CPU
request B -> 20 ms CPU
request C -> 2 ms CPU
request D -> 50 ms CPU
```

The `8` cores perform chunks of that work over time.

CPU can therefore be viewed as a shared budget:

```text
available compute time per second
```

and requests consume pieces of that budget.

### Study meaning

CPU demand can be modeled by total CPU milliseconds required per second of incoming traffic. Once demand exceeds supply, work queues.

### Recall questions

1. What CPU time is assigned to each request A–D?
2. What is their total CPU demand?
3. How does this model explain saturation?
4. Why does wall-clock request time differ from CPU time?


---

## S-023 — Meaning of CPU saturation

**Known limits:** none

### Near-literal normalized transcript

### What saturation means

CPU saturation occurs when the total runnable CPU work demanded by all requests is greater than what the cores can keep up with.

Then:

- new work waits longer to receive CPU time;
- latency rises;
- queues build;
- throughput stops improving much.

The source summarizes:

> If many requests together need a lot of CPU time, eventually the CPU is so busy that new request work cannot run immediately.

That is CPU saturation.

### Study meaning

Saturation is about runnable demand versus available compute supply, not simply a high request count.

### Recall questions

1. What inequality defines CPU saturation?
2. What four effects follow?
3. Can a small number of very expensive requests saturate CPU?


---

## S-024 — One instruction stream per core nuance

**Known limits:** none

### Near-literal normalized transcript

### One subtle point

Statement:

> One core can work for many requests and many threads.

Nuance:

- a core executes one instruction stream at a time on that core;
- over time, scheduling shares that core among many threads and requests.

Therefore “many requests” is true over time, not literally all at once on the same core.

### Study meaning

Concurrency through scheduling is different from simultaneous execution on one core. Parallelism comes from multiple cores; concurrency also comes from time slicing.

### Recall questions

1. How many instruction streams does one core execute at a time?
2. How can the same core still serve many requests?
3. What is the difference between concurrency and parallel execution here?
