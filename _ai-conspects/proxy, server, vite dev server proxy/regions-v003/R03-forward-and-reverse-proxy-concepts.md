# Forward and reverse proxy concepts

Generated: 2026-06-30

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible HTTP, C#, JSON, addresses, ports, and flows are preserved.
- Explanation is separated from the near-literal layer.
- Every source has recall questions.

## S-015 — Why organizations use a forward proxy

**Known limits:** none

### Near-literal normalized transcript

Common reasons:

- control outbound internet access for employees or students;
- log or filter requests;
- enforce company policy;
- cache shared outbound content;
- hide client IP addresses or add anonymity;
- route traffic through a specific network path.

Example proxy:

```text
proxy.company.local:8080
```

Flow:

```text
Browser -> company forward proxy -> example.com
```

### Study meaning

A forward proxy belongs to the client/outbound side and applies policy before external destinations.

### Recall questions

1. Name six forward-proxy uses.
2. What proxy address is shown?
3. Write the example flow.


---

## S-016 — Definition and flow of a forward proxy

**Known limits:** none

### Near-literal normalized transcript

A forward proxy is a server that a client chooses to send requests through.

```text
Browser/App -> Forward proxy -> Internet server
```

The destination server sees the proxy as the immediate caller unless extra headers or protocols expose other information. Requests may appear to originate from the proxy's IP address.

### Study meaning

The client is configured to use the intermediary; the destination connects to the proxy.

### Recall questions

1. Who chooses the forward proxy?
2. What does the destination see as the immediate caller?
3. What can additional headers change?


---

## S-017 — Definition and uses of a reverse proxy

**Known limits:** none

### Near-literal normalized transcript

A reverse proxy is a server that clients contact as if it were the real application. It forwards requests to backend servers.

```text
Browser -> Reverse proxy -> ASP.NET Core app / Kestrel
```

The client normally does not know or care which backend handled the request.

Common reasons:

- load balancing;
- TLS termination;
- protecting backends from direct internet exposure;
- central routing and host/path mapping;
- compression, caching, and edge optimizations;
- easier infrastructure management.

### Study meaning

The reverse proxy is the public inbound entry point for private backends.

### Recall questions

1. Who contacts the reverse proxy?
2. Name six deployment reasons.
3. Does the client need to know the chosen backend?


---

## S-018 — Forward and reverse proxies in one path

**Known limits:** none

### Near-literal normalized transcript

A real system can contain both:

```text
Employee browser
  -> company forward proxy
  -> internet
  -> CDN / reverse proxy / load balancer
  -> ASP.NET Core backend
```

- the forward proxy exists because the client's network controls outbound access;
- the reverse proxy exists because the server side protects and distributes inbound traffic.

### Study meaning

Forward and reverse proxies solve opposite-side concerns and can coexist.

### Recall questions

1. Which side controls the forward proxy?
2. Which side controls the reverse proxy?
3. Write the complete path.


---

## S-019 — ASP.NET Core behind reverse proxy versus outbound forward proxy

**Known limits:** none

### Near-literal normalized transcript

Behind a reverse proxy, the backend may lose the original client-facing scheme, host, and IP unless they are forwarded.

Typical headers:

- `Forwarded`;
- `X-Forwarded-For`;
- `X-Forwarded-Host`;
- `X-Forwarded-Proto`.

For a forward proxy, the ASP.NET Core app usually uses it for outbound requests:

```text
ASP.NET Core app -> forward proxy -> external API
```

### Study meaning

Inbound original-request restoration and outbound proxy transport are different concerns.

### Recall questions

1. What original values can be lost?
2. Name the four headers.
3. What flow represents forward-proxy use?
