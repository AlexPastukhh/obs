# Finite server resources and saturation

Generated: 2026-06-30

## Transcript policy

- Every embedded screenshot has a dedicated source block.
- Concrete numbers, analogies, and terminology are preserved.
- Explanation is separated from near-literal source content.
- Every source includes recall questions.

## S-001 — CPU as a finite server resource

**Known limits:** none

### Near-literal normalized transcript

### CPU

Used to parse requests, run application code, perform JSON serialization, compression, encryption, database logic, and similar work.

If CPU is saturated, requests become slower and queues build up.

### Study meaning

CPU capacity is shared across all runnable request and background work. Saturation means demand for compute time is greater than the cores can supply immediately.

### Recall questions

1. Name four kinds of web-server work that consume CPU.
2. What two symptoms are explicitly associated with CPU saturation?
3. Why is CPU capacity shared rather than reserved per request?


---

## S-002 — Memory pressure

**Known limits:** none

### Near-literal normalized transcript

### Memory (RAM)

Used for request objects, buffers, caches, sessions, uploaded data, in-memory queues, and the runtime itself.

If memory pressure grows, the server performs more GC work, may start swapping, or may crash with an out-of-memory condition.

### Study meaning

Memory limits can become the bottleneck even when CPU is not fully utilized. Allocation rate, retained caches, large bodies, and queue growth all affect pressure.

### Recall questions

1. What kinds of server state consume RAM?
2. How can high memory pressure affect GC?
3. What is the worst failure named in the source?


---

## S-003 — Network bandwidth

**Known limits:** none

### Near-literal normalized transcript

### Network bandwidth

The number of bytes per second the server can send or receive.

Large uploads and downloads can saturate the available bandwidth and make all requests slower.

### Study meaning

Bandwidth is a shared transfer budget. Traffic competes for the same incoming and outgoing capacity.

### Recall questions

1. How is network bandwidth defined in this source?
2. Why can a few large transfers affect unrelated requests?


---

## S-004 — Open connections and sockets

**Known limits:** none

### Near-literal normalized transcript

### Open connections / sockets

Each active client connection consumes kernel and application resources.

Too many concurrent connections can exhaust socket-related limits or file descriptors.

### Study meaning

A server can be connection-bound even if request handlers do little CPU work. Slow or long-lived clients can hold scarce connection state.

### Recall questions

1. What resources does every active connection consume?
2. Which two limits are explicitly mentioned?
3. Why can low-CPU connections still reduce capacity?


---

## S-005 — Threads and worker capacity

**Known limits:** none

### Near-literal normalized transcript

### Threads / worker capacity

Even with asynchronous I/O, servers still have limited worker threads or execution slots.

Blocking work can occupy those workers and reduce throughput.

### Study meaning

Async I/O reduces the need to hold a thread while waiting, but the application still has finite scheduling and execution capacity. Blocking creates starvation risk.

### Recall questions

1. Does async I/O make worker capacity infinite?
2. What happens when blocking work ties up workers?
3. What design choice reduces thread occupation during I/O waits?


---

## S-006 — Disk I/O

**Known limits:** none

### Near-literal normalized transcript

### Disk I/O

Reading files, writing logs, using temporary files, receiving uploads, or accessing local databases consumes disk bandwidth and IOPS.

Slow disks can bottleneck the whole application.

### Study meaning

Storage has both throughput and operations-per-second limits. A logging or upload path can become the system bottleneck.

### Recall questions

1. Name four activities that consume disk I/O.
2. What two storage capacity dimensions are mentioned?
3. How can logging become an application bottleneck?


---

## S-007 — Database and downstream connection pools

**Known limits:** none

### Near-literal normalized transcript

### Database / downstream connection pools

The server itself may be healthy, but if it has only `100` database connections, that pool becomes the bottleneck.

The same principle applies to Redis, message brokers, and third-party APIs.

### Study meaning

End-to-end capacity is limited by the narrowest dependency. Adding request workers cannot overcome an exhausted downstream pool.

### Recall questions

1. What numeric database-pool example is used?
2. Which other downstream systems are named?
3. Why can a healthy application process still have low throughput?


---

## S-008 — Kernel and operating-system limits

**Known limits:** none

### Near-literal normalized transcript

### Kernel / OS limits

Examples:

- file descriptor limits;
- TCP backlog queues;
- port exhaustion;
- process or container limits.

### Study meaning

Capacity is constrained not only by application code but also by operating-system and platform quotas.

### Recall questions

1. Name the four kernel/OS limits in the source.
2. How can port exhaustion limit outbound or inbound work?
3. Why must container quotas be included in capacity planning?


---

## S-009 — TLS and cryptographic capacity

**Known limits:** none

### Near-literal normalized transcript

### TLS / crypto capacity

HTTPS handshakes and encryption consume CPU and sometimes dedicated acceleration resources.

### Study meaning

Connection churn and cryptographic work can make TLS a meaningful compute bottleneck, especially when connections are not reused.

### Recall questions

1. Which two HTTPS activities consume capacity?
2. What kind of specialized resource may also be used?
3. Why can connection reuse reduce crypto overhead?


---

## S-010 — Application-specific pools, queues, and the request resource chain

**Known limits:** none

### Near-literal normalized transcript

### Application-specific pools / queues

Examples:

- HTTP client connection pools;
- thread pools;
- job queues;
- rate-limit buckets;
- cache size limits.

A useful mental model:

```text
request comes in
-> needs connection
-> needs worker time
-> needs CPU
-> needs memory
-> often needs DB/network/disk too
```

If any one of these resources is saturated, it becomes the bottleneck.

### Study meaning

One request usually passes through several constrained stages. The first saturated stage controls throughput and latency for the whole path.

### Recall questions

1. Name the five application-specific pools or limits.
2. List the resource chain in order.
3. What determines the effective bottleneck?


---

## S-011 — Symptoms of saturation and protective techniques

**Known limits:** none

### Near-literal normalized transcript

Examples of saturation symptoms:

- CPU full → high latency and lower throughput;
- memory pressure → GC pauses and out-of-memory risk;
- bandwidth full → slow uploads and downloads;
- DB pool exhausted → requests wait for a database connection;
- too many open connections → accepts fail or queue badly.

This is why techniques such as limiting concurrency, avoiding unnecessary uploads, reusing connections, streaming large bodies, and caching matter: they protect one or more limited resources.

### Study meaning

Capacity controls are not arbitrary optimizations. They prevent finite resources from being consumed by unbounded or low-value work.

### Recall questions

1. Match each resource to its visible failure symptom.
2. Which five protective techniques are named?
3. Why does bounded concurrency protect multiple resources at once?
