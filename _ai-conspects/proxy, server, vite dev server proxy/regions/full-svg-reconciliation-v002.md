# proxy, server, vite dev server proxy — full corrected-SVG semantic reconciliation v002

Generated: 2026-06-27 UTC

The complete corrected SVG and recovered screenshots are the primary source. Candidate regions, vector paths, and nearest labels were used only as navigation hints. Every screenshot was visually reviewed before final region assignment. Existing label-only materials remain preserved but are superseded as the current source interpretation.

# R01 — Server/client roles, listening endpoints, and request flow

In application architecture, a server is usually a process that binds to an address and port and waits for incoming network requests; it may run on a physical machine, VM, container, or local development host. A browser is an HTTP client: it resolves the target, opens a connection, sends a request, waits, and processes the response. The same ASP.NET Core process can be a server for browser requests and a client when it calls another API, so 'client' and 'server' describe roles in a particular exchange rather than permanent identities.

**Reviewed image uses:** S-007, S-010, S-022, S-027, S-036, S-040, S-046

**Assigned SVG text nodes:** T-023


# R02 — Forward proxies and HttpClient outbound proxy configuration

A forward proxy is selected on the client/outbound side. The client sends a request through a proxy server, which makes the onward request to the destination. Organizations use forward proxies for outbound access control, filtering, logging, shared caching, anonymity, or network routing. For ASP.NET Core outbound calls, `HttpClient` uses its primary handler; an explicit `WebProxy` can be configured with `UseProxy`/`Proxy`, or the platform's default proxy can be used. The proxy is a real reachable server address—the application does not become a proxy merely by setting a flag.

**Reviewed image uses:** S-001, S-002, S-003, S-005, S-006, S-008, S-023

**Assigned SVG text nodes:** T-004, T-019, T-020


# R03 — Reverse-proxy architecture, YARP, routing, and infrastructure management

A reverse proxy is the public server that clients contact as if it were the application; it forwards each request to one of the private backend destinations. YARP implements this in ASP.NET Core through registered reverse-proxy services, route/cluster configuration, and `MapReverseProxy`. Routes can select backends by host, path, headers, or other rules, giving one public entry point for several services. This centralizes public addresses, routing, certificates, and shared policies, allows backends to move or scale without changing client URLs, and can be combined with an unrelated forward proxy on the outbound side of the same end-to-end request.

**Reviewed image uses:** S-012, S-015, S-017, S-018, S-024, S-031, S-035, S-037, S-042, S-047, S-050, S-051, S-052, S-053, S-054

**Assigned SVG text nodes:** T-005, T-006, T-007, T-010, T-011, T-012, T-013, T-014, T-021


# R04 — TLS termination, load balancing, backend isolation, and edge offload

A reverse proxy can terminate TLS at the edge, own the public certificate and port 443, and forward HTTP or HTTPS to private backends. It can also balance requests across instances, hide backend addresses, and offload compression, static files, public caching, and other edge work. These benefits are still useful with a single backend because certificate management and network exposure are centralized; with multiple services or instances, the operational value becomes larger. A reverse proxy is not mandatory for every small deployment—Kestrel and ASP.NET Core can serve HTTPS directly when centralized edge features are unnecessary.

**Reviewed image uses:** S-013, S-014, S-016, S-019, S-020, S-021, S-028, S-030, S-043, S-044, S-045, S-049

**Assigned SVG text nodes:** T-002, T-003, T-008, T-009


# R05 — Vite development-server proxy, SpaProxyServerUrl, and CORS

During local development, the browser loads the frontend from the Vite development-server origin and sends `/api/...` requests to that same origin. Vite's configured development proxy forwards matching paths to the ASP.NET Core backend server-to-server, so the browser does not make a cross-origin request and normal browser CORS enforcement is avoided for that hop. `SpaProxyServerUrl` in the ASP.NET Core project describes where the frontend dev server is expected so the .NET development experience can start/probe it and redirect the browser. This is development orchestration, not the production reverse-proxy architecture.

**Reviewed image uses:** S-004, S-009, S-011, S-025, S-026, S-029, S-033

**Assigned SVG text nodes:** T-022


# R06 — Forwarded headers, trusted proxies, and preserving original request data

Behind a reverse proxy, the backend connection can otherwise appear to use the proxy's scheme, host, and IP. `UseForwardedHeaders` must run early enough to restore trusted `X-Forwarded-For`, `X-Forwarded-Host`, and `X-Forwarded-Proto` values before redirects, URL generation, authentication, or client-IP logic. Only trusted proxy addresses or networks should be accepted through `KnownProxies`/`KnownNetworks`; loopback proxies are commonly trusted by default, while remote proxies need explicit configuration. With correct forwarding configuration, most application code can continue reading `Request.Scheme`, `Request.Host`, and `Connection.RemoteIpAddress` normally; without it, redirects, callback URLs, and audit IPs can be wrong.

**Reviewed image uses:** S-032, S-034, S-038, S-039, S-041, S-048

**Assigned SVG text nodes:** T-015, T-016, T-017, T-018, T-024, T-025


# X01 — Punctuation-only navigation label

The standalone `!!!` SVG text node is a navigation/emphasis marker and contains no independent technical claim. It is assigned explicitly so text-node coverage is complete without using punctuation to infer screenshot semantics.

**Reviewed image uses:** none

**Assigned SVG text nodes:** T-001


## Closure

```text
embedded assets: 54
total image uses: 54
processed image uses: 54
restored image uses: 54
duplicate placements: 0
SVG text nodes: 25
unassigned images: 0
multiply assigned images: 0
unassigned text nodes: 0
missing: 0
unreviewed: 0
```
