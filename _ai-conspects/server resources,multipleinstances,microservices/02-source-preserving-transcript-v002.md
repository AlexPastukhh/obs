# Server resources, multiple instances, and microservices — source-preserving transcript v002

Generated: 2026-06-30

## Coverage

```text
source SVG unique screenshots: 30
source SVG image uses: 30
native SVG labels: 20
source-preserving screenshot blocks: 30
uncovered screenshot uses: 0
```

## Relationship to the existing semantic transcript

`01-final-transcript.md` remains useful as an integrated study summary.

This v002 file adds the missing evidence layer:

- one block per screenshot;
- exact numbers and examples;
- the highway analogy;
- server/host/node/instance terminology;
- source-specific questions.



---

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


---

# Network bandwidth and early rejection

Generated: 2026-06-30

## Transcript policy

- Every embedded screenshot has a dedicated source block.
- Concrete numbers, analogies, and terminology are preserved.
- Explanation is separated from near-literal source content.
- Every source includes recall questions.

## S-012 — Incoming and outgoing bandwidth are shared

**Known limits:** none

### Near-literal normalized transcript

Network bandwidth is the server's available data-transfer capacity: how many bytes per second it can receive and send over its network links.

Think of the server as having:

- incoming bandwidth for request data and uploads;
- outgoing bandwidth for response data and downloads.

That capacity is effectively shared across all active traffic, not reserved per request.

### Study meaning

Inbound and outbound traffic may have different limits, but each direction is shared by concurrent transfers.

### Recall questions

1. What is incoming bandwidth used for?
2. What is outgoing bandwidth used for?
3. Is bandwidth reserved independently for every request?


---

## S-013 — One-gigabit network mental model

**Known limits:** none

### Near-literal normalized transcript

### Simple mental model

If a server or network path can do roughly:

```text
1 Gbit/s total
```

that is about:

```text
125 MB/s total
```

All of the following compete for that capacity:

- request bodies coming in;
- response bodies going out;
- health checks;
- internal service-to-service calls;
- file uploads and downloads;
- WebSocket traffic;
- anything else using that NIC or path.

If many requests are active at once, they share the available network throughput.

### Study meaning

The conversion from bits to bytes gives a practical total budget. Protocol overhead means real application throughput may be lower.

### Recall questions

1. Approximately how many megabytes per second is 1 Gbit/s?
2. Name five traffic types competing for the same path.
3. Why is the figure a rough rather than exact application throughput?


---

## S-014 — Shared outbound budget example

**Known limits:** none

### Near-literal normalized transcript

### Example

Assume the server can send about:

```text
100 MB/s outbound
```

- If one user downloads a `100 MB` file, that user may receive close to the full `100 MB/s`.
- If ten users download large files at the same time, each may receive only a fraction of that rate, depending on fairness, protocol behavior, and other bottlenecks.

There is effectively a “bytes per second budget.”

### Study meaning

Concurrency divides a finite transfer budget. More simultaneous downloads do not multiply the physical network capacity.

### Recall questions

1. How long could a 100 MB file take near 100 MB/s, ignoring overhead?
2. Why do ten users not each receive 100 MB/s?
3. What factors besides fairness can reduce each user's rate?


---

## S-015 — The bottleneck may be anywhere on the path

**Known limits:** none

### Near-literal normalized transcript

### It is not only the server itself

The real limit can come from:

- the server's NIC speed;
- VM or container network caps;
- cloud-instance bandwidth limits;
- load balancer or proxy limits;
- data-center or path congestion;
- client-side bandwidth;
- another service on the path.

“The server has bandwidth” is a simplification. The whole path between server and clients has limited transfer capacity.

### Study meaning

End-to-end throughput is determined by the slowest segment, not merely the server's advertised NIC speed.

### Recall questions

1. Name six possible path bottlenecks.
2. Why can a fast server still deliver slowly to a client?
3. What is the correct end-to-end capacity statement?


---

## S-016 — Why bandwidth saturation and unnecessary uploads matter

**Known limits:** none

### Near-literal normalized transcript

### Why this matters

When bandwidth is saturated:

- uploads take longer;
- downloads take longer;
- latency can increase because packets queue;
- other useful traffic is delayed by large transfers.

Unnecessary upload data matters because request-body bytes that will ultimately be rejected still consume shared network capacity.

### Study meaning

Rejecting invalid or unauthorized work before reading a large body protects bandwidth, memory, worker time, and downstream resources.

### Recall questions

1. What four symptoms are listed for bandwidth saturation?
2. Why do rejected request bodies still matter?
3. Which checks can sometimes be performed before consuming the body?


---

## S-017 — Concrete unnecessary-upload scenario

**Known limits:** none

### Near-literal normalized transcript

### Example with unnecessary upload

Assume:

- the server can receive `50 MB/s` inbound;
- `20` clients each start uploading `200 MB`;
- half of them are unauthorized and could be rejected from headers alone.

Without early rejection, much of the inbound bandwidth is spent receiving useless bytes.

Result:

- legitimate uploads slow down;
- failures take longer to fail;
- inbound capacity is wasted on traffic with no business value.

### Study meaning

This example quantifies why authentication, authorization, size validation, and admission checks should happen as early as possible.

### Recall questions

1. How much data do the 20 clients attempt to upload in total?
2. How much of that traffic comes from unauthorized clients?
3. What three consequences are listed?
4. Which header-level checks could prevent the wasted transfer?


---

## S-018 — Highway analogy for bandwidth

**Known limits:** none

### Near-literal normalized transcript

### Simple analogy

Think of bandwidth like a highway's total carrying capacity:

- a wider highway means more cars per second;
- all cars share it;
- if too many trucks enter, everyone slows down.

Large uploads and downloads are like big trucks taking up space on that highway.

### Study meaning

The analogy emphasizes shared capacity and the disproportionate impact of large transfers.

### Recall questions

1. What does highway width represent?
2. What do large uploads and downloads represent?
3. Why does everyone slow down when too many large transfers occur?


---

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


---

# Scale up, scale out, and externalized state

Generated: 2026-06-30

## Transcript policy

- Every embedded screenshot has a dedicated source block.
- Concrete numbers, analogies, and terminology are preserved.
- Explanation is separated from near-literal source content.
- Every source includes recall questions.

## S-025 — Adding another machine does not automatically create microservices

**Known limits:** none

### Near-literal normalized transcript

Adding another machine does not automatically mean microservices.

Capacity can be increased by adding another application machine while retaining one monolithic application. This is horizontal scaling or scale-out: multiple copies of the same application behind a load balancer.

### Terminology

A machine that runs the application may be called:

- server;
- host;
- node;
- instance;
- VM, when it is a virtual machine;
- container instance or pod, when it runs in containers or Kubernetes.

These terms are not always exact synonyms. The important idea here is:

> A compute unit that runs a copy of the application.

### Study meaning

Deployment topology and architectural decomposition are separate dimensions. Several identical monolith instances are still a monolith.

### Recall questions

1. What is horizontal scaling?
2. Does adding a second server imply microservices?
3. List the six deployment terms in the source.
4. What common idea do those terms represent in this discussion?


---

## S-026 — Scale up versus scale out

**Known limits:** none

### Near-literal normalized transcript

### Scale up

Make one machine bigger:

- more CPU cores;
- more RAM;
- possibly faster disk or network.

Example:

```text
1 server: 8 cores -> 32 cores
```

### Scale out

Add more machines:

```text
1 server -> 2 servers -> 5 servers
```

Usually a load balancer is placed in front.

### Study meaning

Vertical scaling increases one instance's capacity. Horizontal scaling increases the number of instances.

### Recall questions

1. What resources are increased during scale-up?
2. What numeric scale-up example is used?
3. What numeric scale-out sequence is used?
4. What component usually distributes requests?


---

## S-027 — When adding another machine helps

**Known limits:** none

### Near-literal normalized transcript

### Does adding another machine help?

Yes, if the application can run on multiple machines correctly.

That usually means the application is at least mostly stateless at the application-instance level. Horizontal scaling works best when application state is stored independently from the instances.

### Good case

```text
Load balancer
    -> App instance A
    -> App instance B
```

Both instances serve the same application.

### Study meaning

Scale-out requires requests to be safely handled by any instance. Instance-local correctness state prevents transparent distribution.

### Recall questions

1. What application property makes scale-out easier?
2. Where should important state live?
3. What does the load balancer distribute between A and B?


---

## S-028 — State problems created by multiple instances

**Known limits:** none

### Near-literal normalized transcript

### Problems you must handle

When scaling out, some state can no longer live only in one machine's memory:

- in-memory sessions;
- in-memory caches required for correctness;
- uploaded temporary state tied to one instance;
- local files visible to only one instance.

Typical fixes:

- shared database;
- Redis or another distributed cache;
- shared object or file storage;
- sticky sessions only when necessary.

### Study meaning

State needed for correctness must survive instance changes and failover. Sticky sessions can reduce migration work but do not eliminate node-local state risk.

### Recall questions

1. Name the four node-local state problems.
2. Name the four typical fixes.
3. Why should correctness not depend on an in-memory cache on one node?
4. What limitation remains with sticky sessions?


---

# Microservices versus a scaled-out monolith

Generated: 2026-06-30

## Transcript policy

- Every embedded screenshot has a dedicated source block.
- Concrete numbers, analogies, and terminology are preserved.
- Explanation is separated from near-literal source content.
- Every source includes recall questions.

## S-029 — When microservices enter the picture

**Known limits:** none

### Near-literal normalized transcript

### When do microservices enter the picture?

Microservices are about splitting the system into separately deployed services that can evolve and scale independently.

Adding another server to run the same application is still scaling a monolith. A monolithic application can scale out by cloning it onto multiple servers or VMs; the downside is that the whole application is scaled even when only one part is the bottleneck.

### Study meaning

Microservices address deployment, ownership, and independent scaling boundaries. Scale-out alone addresses instance capacity and availability.

### Recall questions

1. What defines microservices in this source?
2. Why is cloning the full application still a monolith?
3. What inefficiency can occur when only one monolith subsystem is hot?


---

## S-030 — Scaled monolith versus microservices

**Known limits:** none

### Near-literal normalized transcript

### Simple contrast

#### Monolith scaled out

```text
Load balancer
    -> Full app copy #1
    -> Full app copy #2
```

#### Microservices

```text
Load balancer
    -> API service
    -> Auth service
    -> Search service
```

Different services may be scaled independently.

### Study meaning

The first diagram duplicates one deployment unit. The second separates deployment units by responsibility.

### Recall questions

1. What is duplicated in a scaled-out monolith?
2. Which three services appear in the microservice example?
3. What can be scaled independently in the second model?
