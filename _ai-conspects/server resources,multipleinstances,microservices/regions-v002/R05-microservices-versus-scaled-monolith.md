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
