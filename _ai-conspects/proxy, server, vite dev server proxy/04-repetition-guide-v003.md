# Proxy, server, Vite development proxy — repetition guide v003

Generated: 2026-06-30

## Core mental model

1. Client and server are roles for a specific network exchange.
2. A listening server binds to a host/address and port.
3. Vite's development proxy turns browser `/api` calls into a same-origin browser request followed by a server-to-server backend request.
4. `SpaProxyServerUrl` coordinates where the frontend development server runs; Vite `server.proxy` defines forwarded paths.
5. A forward proxy represents clients on outbound traffic.
6. A reverse proxy represents backend applications on inbound traffic.
7. `HttpClient` proxy configuration belongs to the outbound primary handler.
8. YARP uses routes to select clusters and cluster destinations.
9. Forwarded headers must be accepted only from trusted proxies or networks.
10. A reverse proxy can centralize TLS, routing, load balancing, caching, compression, and public exposure.
11. Reverse-proxy benefits apply to one backend as well as to multiple services.

## High-value comparisons

1. Compare direct browser-to-backend CORS with browser-to-Vite-to-backend flow.
2. Compare `SpaProxyServerUrl` with Vite `server.proxy`.
3. Compare forward and reverse proxies by selector, represented side, and traffic direction.
4. Compare direct Kestrel HTTPS with TLS termination at a reverse proxy.
5. Compare `KnownProxies` with `KnownIPNetworks`.
6. Compare host-based and path-based routing.
7. Compare a custom YARP application with existing Nginx/IIS/cloud infrastructure.
8. Compare a route, cluster, and destination in YARP.

## Code reconstruction prompts

1. Recreate the named `HttpClient` configured with `SocketsHttpHandler` and `WebProxy`.
2. Recreate the minimal YARP `Program.cs`.
3. Recreate the `ReverseProxy` JSON for `/api/{**catch-all}` and `https://localhost:7143/`.
4. Recreate forwarded-header configuration for `10.0.0.100`.
5. Place `UseForwardedHeaders` in the correct pipeline order.
6. Write host-based routes for API/admin/shop.
7. Write path-based routes for API/images/reports.

## Scenario questions

1. The browser loads Vite at `https://localhost:5173` and calls `/api/weather`. Trace every hop.
2. The backend generates an `http://` redirect behind an HTTPS reverse proxy. What is probably missing?
3. A remote proxy sends `X-Forwarded-For`, but the backend ignores it. What trust configuration is needed?
4. An organization requires all outbound API traffic through `proxy.company.local:8080`. Where is that configured?
5. You have one backend only. List reasons a reverse proxy may still be valuable.
6. Clients currently know three internal service URLs. Design a single public routing layer.
7. Explain when direct Kestrel HTTPS is simpler and sufficient.

## Misconceptions to reject

- Vite disables CORS in the browser.
- `SpaProxyServerUrl` is the same as Vite `server.proxy`.
- A `WebProxy` object creates a proxy server.
- A forward proxy and reverse proxy cannot appear in one path.
- Forwarded headers from any client should be trusted.
- Reverse proxies are useful only for microservices.
- Kestrel cannot serve HTTPS directly.
