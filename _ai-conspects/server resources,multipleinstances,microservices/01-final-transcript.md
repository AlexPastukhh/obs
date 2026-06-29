# Final semantic transcript — server resources, multiple instances and microservices

Authoritative source:
`source/server resources,multipleinstances,microservices(1).svg`

Coverage:

```text
unique embedded screenshots: 30
image uses: 30
native SVG labels: 20
remaining unclosed: 0
```

---

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


---

# R02 — another machine, scale up and scale out

## Scale up

Vertical scaling makes one machine larger:

```text
more CPU cores
more RAM
faster disk or network
larger platform limits
```

It is operationally simple but has a ceiling and leaves one main failure domain.

## Scale out

Horizontal scaling adds application instances:

```text
one instance -> two instances -> many instances
```

A load balancer distributes traffic among them.

Adding another machine can increase capacity when the application is able to run
correctly on multiple instances. This is still allowed to be one monolithic
application.

```text
load balancer
    -> monolith instance A
    -> monolith instance B
```

That is a scaled-out monolith, not automatically a microservice architecture.

## State must survive instance changes

Requests may reach different instances. Correctness must not depend on data that
exists only in one process or local disk.

Common problem areas:

```text
in-memory sessions
in-memory caches required for correctness
uploaded temporary state stored on one instance
local files available only on one machine
background jobs owned implicitly by one process
```

Typical shared or durable replacements include:

```text
shared database
distributed cache
object/file storage
message broker or durable queue
sticky sessions only when truly necessary
```

Sticky sessions can reduce immediate migration work but do not remove the
single-instance-state problem and complicate failover.

## Scaling does not multiply every dependency

Adding application instances also increases pressure on shared systems:

```text
database connection counts
Redis connections
message broker consumers
third-party API calls
network traffic
```

Scale-out helps only when the application tier is the bottleneck or when shared
dependencies are scaled and protected as well.


---

# R03 — what microservices are

Microservices are not defined by the number of machines.

A microservice architecture divides a system into separately deployable services
with focused responsibilities and explicit communication boundaries.

```text
load balancer or gateway
    -> API service
    -> authentication service
    -> search service
```

Different services may be deployed and scaled independently.

By contrast:

```text
load balancer
    -> full application copy A
    -> full application copy B
```

is horizontal scaling of one application.

## Distinguishing properties

Microservices usually imply several of these characteristics:

```text
independent deployment
clear service ownership
bounded responsibility
separate scaling decisions
network-based communication
independent failure modes
explicit data and API contracts
```

The architecture may still run multiple copies of each service. Instance count
and service decomposition are separate dimensions.

## Why adopt them

Potential benefits:

```text
scale only the hot service
independent release cadence
team ownership boundaries
fault isolation
technology choices per service when justified
```

## Costs

Microservices also introduce substantial distributed-system complexity:

```text
network latency and partial failure
service discovery
observability and tracing
versioned contracts
distributed data consistency
deployment orchestration
authentication between services
more operational infrastructure
```

Therefore:

```text
adding another server solves a capacity/availability problem;
splitting into microservices solves an architectural ownership and deployment
problem.
```

A scaled monolith is often the simpler correct choice until independent
deployment or domain boundaries provide enough value to justify the added
complexity.


---

# End-to-end capacity model

```text
incoming request
    ↓
network / connection capacity
    ↓
worker or async execution capacity
    ↓
CPU and memory
    ↓
database, cache, disk and downstream pools
    ↓
response network capacity
```

At each stage:

```text
finite capacity + unbounded arrival rate
    -> queue growth
    -> latency growth
    -> timeouts and failures
```

The reliable design uses measurement, bounded concurrency, backpressure,
timeouts, externalized state and scaling targeted at the real bottleneck.
