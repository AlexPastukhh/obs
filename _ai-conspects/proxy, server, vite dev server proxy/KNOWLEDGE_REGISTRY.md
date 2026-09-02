# Knowledge Registry

Source workspace: `_ai-conspects/proxy, server, vite dev server proxy/`

Authoritative processed sources: `regions-v003/R01-vite-development-proxy-spaproxyserverurl-and-cors.md` through `regions-v003/R07-central-infrastructure-and-routing.md`; completion certified by `CURRENT_SOURCE_OF_TRUTH.md` and `VALIDATION_SOURCE_PRESERVING_V003.json`.

Original SVG: `source/source-complete-v002.svg` (SHA-256 `4988d37a8d2fa56f111a902f3ade024e32f8585b35381875293069e7df598b12`; Git blob `4bf0e9b670abc70d79dc3d7c59e1b867d18c0a53`).

| Source claim group | Knowledge ID | Topic | Destination file | Mapping |
|---|---|---|---|---|
| Vite development proxy configuration, `/api` rewriting, `server.proxy` versus `serverUrl`, SPA orchestration, development-only boundaries, and CORS alternatives (R01 S-001 through S-007) | `javascript.vite-development-proxy-and-spa-orchestration` | `javascript` | `../_knowledge/javascript/vite-development-proxy-and-spa-orchestration.md` | MAPPED |
| Client/server roles, listening endpoints, TCP/HTTP request flow, browser and backend responsibilities, and origin/CORS reasoning (R02 S-008 through S-014) | `http.client-server-roles-listening-and-request-flow` | `http` | `../_knowledge/http/client-server-roles-listening-and-request-flow.md` | MAPPED |
| Forward-proxy versus reverse-proxy direction, placement, caller visibility, and role distinctions (R03 S-015 through S-019) | `architecture.forward-and-reverse-proxy-roles` | `architecture` | `../_knowledge/architecture/forward-and-reverse-proxy-roles.md` | MAPPED |
| HttpClient outbound forward-proxy placement, named and explicit `SocketsHttpHandler`/`WebProxy` examples, default proxy sources, and the requirement for a running proxy server (R04 S-020, S-021, S-032, S-033) | `dotnet.sockets-http-handler-connection-pooling-and-proxies` | `dotnet` | `../_knowledge/dotnet/sockets-http-handler-connection-pooling-and-proxies.md` | MERGED |
| Minimal YARP setup and route-to-cluster-to-destination configuration (R05 S-022 through S-024) | `aspnet-core.yarp-routes-clusters-and-destinations` | `aspnet-core` | `../_knowledge/aspnet-core/yarp-routes-clusters-and-destinations.md` | MAPPED |
| Forwarded-header middleware order, exact/network proxy trust, restored request properties, loopback defaults, and spoofing boundary (R05 S-025 through S-030) | `aspnet-core.forwarded-headers-and-client-ip-trust` | `aspnet-core` | `../_knowledge/aspnet-core/forwarded-headers-and-client-ip-trust.md` | MERGED |
| Separate reverse-proxy process choices, central routing, path and host dispatch, route tables, policy placement, and backend decoupling (R05 S-031; R07 S-046 through S-052) | `architecture.reverse-proxy-central-routing-and-policy` | `architecture` | `../_knowledge/architecture/reverse-proxy-central-routing-and-policy.md` | MAPPED |
| Reverse-proxy TLS termination, backend isolation, load balancing, health checks, compression/caching/static offload, observability, security policy, and tradeoffs (R06 S-034 through S-045, S-053, S-054) | `architecture.reverse-proxy-edge-tls-isolation-and-offload` | `architecture` | `../_knowledge/architecture/reverse-proxy-edge-tls-isolation-and-offload.md` | MAPPED |
| Source import and screenshot inventories, reconstruction metadata, duplicate/coverage accounting, audit records, and repetition guide | — | — | — | NON_LEARNING |

## Boundary decisions

- Development proxying, protocol roles, proxy-direction concepts, outbound HttpClient transport, YARP configuration, forwarded-header trust, centralized routing, and edge/offload policy are separate durable models.
- HttpClient proxy mechanics and forwarded-header trust extend existing units whose central models already match; the new claims are present in those bodies, not only their provenance.
- The eight learning destinations cover all 54 authoritative source blocks exactly once; processing and audit metadata are non-learning.

| Status | Count |
|---|---:|
| MAPPED | 6 |
| MERGED | 2 |
| NON_LEARNING | 1 |
| UNRESOLVED | 0 |
