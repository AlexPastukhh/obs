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
