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
