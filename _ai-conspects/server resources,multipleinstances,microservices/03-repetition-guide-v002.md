# Server resources, multiple instances, and microservices — repetition guide v002

Generated: 2026-06-30

## Core mental model

1. A request consumes several finite resources in sequence.
2. The first saturated resource becomes the effective bottleneck.
3. CPU is a shared compute-time budget.
4. Bandwidth is a shared bytes-per-second budget.
5. Queues do not create capacity; they defer work and increase latency.
6. Early rejection protects bandwidth and other downstream resources.
7. Scale-up makes one instance larger.
8. Scale-out creates more instances of the same deployment unit.
9. Scale-out requires important state to live outside one instance.
10. Multiple monolith instances are not automatically microservices.
11. Microservices introduce independent deployment and scaling boundaries, plus distributed-system costs.

## Resource comparison questions

1. What symptoms distinguish CPU saturation, memory pressure, bandwidth saturation, DB-pool exhaustion, and connection exhaustion?
2. How can an application have idle CPU but still be bottlenecked?
3. Why does increasing thread count fail when a downstream pool is exhausted?
4. Which resources are protected by rejecting unauthorized uploads before reading the body?
5. How do file descriptors, TCP backlog, and ports differ as limits?

## Numeric and scenario questions

1. Convert `1 Gbit/s` to approximate `MB/s`.
2. At `100 MB/s`, what ideal time is needed to send a `100 MB` file?
3. Twenty clients each upload `200 MB`; how much total traffic is attempted?
4. If half are unauthorized, how much avoidable traffic exists?
5. Add the CPU demand of requests requiring `5`, `20`, `2`, and `50 ms`.
6. Explain why the wall-clock duration of a request can exceed its CPU milliseconds.

## Architecture questions

1. Compare scale-up and scale-out using the source's numeric examples.
2. Why does an application need to be mostly stateless to scale out cleanly?
3. Which state belongs in a database, distributed cache, object storage, or queue?
4. Why are sticky sessions only a partial solution?
5. Compare a scaled-out monolith with independently deployed services.
6. When is scaling the monolith the simpler correct choice?

## Application prompts

1. Given high latency and 20% CPU utilization, list the next resources to inspect.
2. Design limits for a large-upload endpoint.
3. Diagnose a service with a 100-connection DB pool and 500 waiting requests.
4. Design a two-instance deployment that does not depend on local session memory.
5. Decide whether one hot search component justifies a separate service.
6. Propose metrics for CPU, memory, bandwidth, connections, pools, queues, and downstream latency.

## Misconceptions to reject

- More concurrent work always increases throughput.
- Async code makes worker capacity unlimited.
- A 1 Gbit/s NIC gives every request 1 Gbit/s.
- Adding application instances automatically scales the database.
- Adding another server creates microservices.
- Local in-memory state is safe when any instance can receive the next request.
