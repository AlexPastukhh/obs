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
