# proxy, server, vite dev server proxy — final coverage transcript

Generated: 2026-06-27 UTC

## Source boundary

The source is a vector/text SVG with no embedded raster screenshots. The SVG text labels are the primary semantic source; vector paths are used only for grouping and flow.

## R01 — why use a reverse proxy

A reverse proxy receives traffic on behalf of one or more backend servers. Even with a single backend it can centralize host/path routing, TLS termination, compression, connection handling, static-content delivery, request-size policy, logging, rate limiting, and other cross-cutting concerns. Moving suitable work out of the application can reduce application CPU/memory pressure and simplify infrastructure changes.

Central routing also decouples public URLs from backend topology. A service can move, scale, or split without forcing clients to learn each internal endpoint. The proxy is therefore part of the deployment boundary, not merely a load balancer.

**Covered source labels:** `T-002, T-003, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013`

## R02 — forward proxy, reverse proxy and forwarded headers

A forward proxy acts for clients: an outbound `HttpClient` can be configured with a proxy URI, credentials, and proxy-use policy. A reverse proxy acts for servers: products such as YARP or an external gateway receive inbound traffic and forward it to a backend destination.

Behind a reverse proxy, the application’s immediate peer is the proxy. To recover the original client IP, scheme, and sometimes host, configure forwarded-header processing and run it early—before authentication decisions, HTTPS redirection, link generation, and code that reads those request properties. Trust only known proxies or known networks. Blindly trusting forwarded headers allows clients to spoof origin information.

After correct forwarded-header processing, most application code can read `Request.Scheme`, `Request.Host`, and the remote IP normally. Path rewriting and `PathBase` still require explicit coordination with the proxy route.

**Covered source labels:** `T-001, T-004, T-005, T-014, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-024, T-025`

## R03 — Vite development-server proxy and backend server boundary

A Vite development-server proxy is a development convenience. The browser requests a path such as `/api` from the Vite origin; Vite forwards that request to the backend server. This keeps frontend calls on the development origin and can avoid development-only CORS friction while preserving a production-like relative URL.

The Vite proxy is not the production reverse-proxy architecture by itself. Production routing, TLS, trust boundaries, forwarded headers, authentication, and scaling still need an explicit server/gateway design. Keep development proxy targets and rewrites in environment-specific configuration.

**Covered source labels:** `T-022, T-023`

## Final takeaway

Every parsed SVG text label is mapped to a final semantic section. No label is closed by inventory alone; the transcript above resolves the questions and shorthand represented by the source labels.
