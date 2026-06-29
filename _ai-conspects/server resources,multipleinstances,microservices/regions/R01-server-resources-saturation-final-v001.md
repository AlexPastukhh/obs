# R01 — finite server resources and saturation

A server does not have one universal “request capacity.” Every request consumes
some mixture of finite shared resources. Throughput is limited by whichever
resource reaches saturation first.

## CPU

CPU time is shared across all runnable work.

A core executes one instruction stream at a time, while the operating system
rapidly schedules many threads and requests across available cores. A request
does not normally “own a core until completion.” It receives slices of CPU time.

Typical CPU work in a web application includes:

```text
parsing HTTP headers
routing
authentication and authorization checks
JSON serialization/deserialization
validation
compression and decompression
encryption and TLS work
business logic
regular expression and image/file processing
database result mapping
```

A useful model is:

```text
available CPU time per second
        shared by
all runnable request and background work
```

CPU saturation appears when runnable work demands more CPU time than the cores
can provide. Symptoms include:

```text
longer scheduling waits
higher latency
growing queues
little throughput improvement from extra concurrency
```

## Memory

Memory is consumed by:

```text
request objects and buffers
runtime and framework state
caches
sessions
uploaded data
in-memory queues
application objects
```

When pressure becomes high, the application may spend more time in garbage
collection, paging, eviction or repeated allocation. Memory limits can therefore
reduce throughput even when CPU utilization looks acceptable.

## Network bandwidth

Network capacity is shared by all traffic:

```text
request bodies entering the server
response bodies leaving the server
uploads and downloads
health checks
internal service-to-service calls
WebSocket traffic
database or cache traffic crossing the network
```

Bandwidth is limited by the whole path, not only the server NIC:

```text
client connection
proxy or load balancer
cloud instance limits
container/VM limits
network path congestion
server NIC
```

A server capable of roughly `100 MB/s` outbound cannot give ten simultaneous
downloads `100 MB/s` each. They compete for the same transfer budget.

Large requests that will be rejected should be rejected as early as practical.
Otherwise useless request bytes consume inbound capacity and increase latency
for valid traffic.

## Connections and sockets

Every active connection consumes kernel and application resources. Limits may
come from:

```text
file descriptors
ephemeral ports
TCP backlog queues
socket buffers
proxy limits
application connection limits
```

Too many open or slow connections can exhaust capacity even when request
handlers do little CPU work.

## Worker threads and execution slots

Even asynchronous servers have finite worker capacity. Blocking calls hold
threads or execution slots while waiting and can cause thread-pool starvation.

Prefer:

```text
asynchronous I/O
bounded concurrency
timeouts and cancellation
avoiding sync-over-async
```

## Disk I/O

Disk operations consume bandwidth and IOPS:

```text
logs
temporary files
uploads
local databases
file processing
```

Slow storage can bottleneck the entire application or make queues accumulate.

## Database and downstream pools

A web server may have available CPU and memory while a dependency is saturated:

```text
database connection pool
Redis connection capacity
HTTP client connection pool
message broker
third-party API quota
```

For example, a pool of 100 database connections becomes the bottleneck when all
100 are busy, regardless of how many request threads are available.

## Kernel, OS and platform limits

Examples include:

```text
file descriptor limits
TCP backlog limits
port exhaustion
process/container quotas
VM or container CPU limits
cloud instance bandwidth limits
proxy request limits
```

## TLS and cryptography

TLS handshakes and cryptographic operations consume CPU and may use finite
accelerator or library capacity. Excessive connection churn can therefore cost
more than long-lived pooled connections.

## Application-specific pools and queues

Applications create their own limiting resources:

```text
HTTP client connection pools
thread pools
job queues
rate-limit buckets
cache size limits
semaphores
bounded channels
```

A request often needs several resources in sequence:

```text
connection
    -> worker time
    -> CPU
    -> memory
    -> database/network/disk
```

The first saturated dependency becomes the effective bottleneck.

## Operating rule

Capacity work is not merely “add more concurrency.” It is:

```text
measure the saturated resource
bound queues
apply backpressure
reject excess work early
reuse connections
stream large bodies
avoid blocking
scale the actual bottleneck
```
