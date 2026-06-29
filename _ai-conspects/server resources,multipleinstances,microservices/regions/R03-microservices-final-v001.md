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
