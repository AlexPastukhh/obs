# Central infrastructure management and routing

Generated: 2026-06-30

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible HTTP, C#, JSON, addresses, ports, and flows are preserved.
- Explanation is separated from the near-literal layer.
- Every source has recall questions.

## S-046 — Centralizing cross-cutting concerns

**Known limits:** none

### Near-literal normalized transcript

With several services, a reverse proxy can centralize:

- TLS certificates;
- public hostnames and port bindings;
- authentication or authorization policy at the edge;
- request routing;
- compression and caching;
- rate limiting, access control, and header transforms.

### Study meaning

The proxy can be a shared policy and traffic-management layer.

### Recall questions

1. Name six centralized concerns.
2. Which affect security?
3. Which affect traffic shape?


---

## S-047 — Configure shared edge concerns once

**Known limits:** none

### Near-literal normalized transcript

Instead of configuring inside every service:

- certificate binding;
- public host;
- path routing;
- shared security policy;

configure much of it once in the reverse-proxy layer.

### Study meaning

Centralization reduces duplicated infrastructure configuration.

### Recall questions

1. What four settings are listed?
2. Where are they centralized?
3. Why may service-specific authorization still remain in services?


---

## S-048 — Practical multi-service public routing example

**Known limits:** none

### Near-literal normalized transcript

```text
Public Internet
  -> proxy on api.example.com
      -> /users/*   -> Users service
      -> /orders/*  -> Orders service
      -> /catalog/* -> Catalog service
```

Internal addresses:

```text
http://users-service:5001
http://orders-service:5002
http://catalog-service:5003
```

Only the proxy is public.

### Study meaning

Public paths remain stable while service names and ports remain private.

### Recall questions

1. What public host is shown?
2. Map each path to a service.
3. List the three internal addresses.
4. Which component is public?


---

## S-049 — What central routing can match

**Known limits:** none

### Near-literal normalized transcript

The reverse proxy chooses a backend based on:

- host name;
- path;
- sometimes headers or other match rules.

YARP routes match incoming requests and send them to a selected cluster and destination.

### Study meaning

Routing is request classification plus destination selection.

### Recall questions

1. What three match inputs are named?
2. What YARP object is selected?
3. What is the difference between cluster and destination?


---

## S-050 — Host-based routing

**Known limits:** none

### Near-literal normalized transcript

```text
api.example.com   -> API backend
admin.example.com -> Admin backend
shop.example.com  -> Shop backend
```

The client sees public domains; the proxy maps each host to the correct backend.

### Study meaning

Host routing separates public applications by hostname.

### Recall questions

1. Map the three hostnames.
2. Who performs the mapping?
3. What does the client see?


---

## S-051 — Path-based routing

**Known limits:** none

### Near-literal normalized transcript

```text
example.com/api/*     -> ASP.NET Core API
example.com/images/*  -> image service
example.com/reports/* -> reporting service
```

The proxy acts as a traffic director and chooses where to send each request.

### Study meaning

One public domain can represent several services.

### Recall questions

1. Map the three paths.
2. What decision does the proxy make?
3. How does path routing differ from host routing?


---

## S-052 — Why central routing is useful

**Known limits:** none

### Near-literal normalized transcript

Without central routing, clients need to know multiple internal backend URLs.

With a reverse proxy:

- clients use one public entry point;
- the proxy hides internal topology;
- backends can move or split without changing the public API shape as much.

### Study meaning

A stable public contract reduces coupling to infrastructure.

### Recall questions

1. What problem exists without central routing?
2. Name the three benefits.
3. What backend changes can remain hidden?
