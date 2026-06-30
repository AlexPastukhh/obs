# Proxy, server, Vite development proxy — source-preserving transcript v003

Generated: 2026-06-30

## Coverage

```text
complete SVG embedded screenshots: 54
image uses: 54
native SVG labels: 25
near-literal screenshot blocks: 54
uncovered screenshot uses: 0
duplicate screenshots: 0
```

## Relationship to v002

`regions/full-svg-reconciliation-v002.md` remains useful as a short integrated semantic summary.

It is no longer the sole authoritative transcript because it compresses 54 screenshots into six regional paragraphs. This v003 file preserves the screenshot-level details required for repetition and question generation.



---

# Vite development proxy, SpaProxyServerUrl, and CORS

Generated: 2026-06-30

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible HTTP, C#, JSON, addresses, ports, and flows are preserved.
- Explanation is separated from the near-literal layer.
- Every source has recall questions.

## S-001 — Vite dev proxy: same-origin browser request and server-to-server forwarding

**Known limits:** none

### Near-literal normalized transcript

More precisely:

- the frontend application is loaded from the frontend development-server origin;
- when React code executes `fetch("/api/...")`, the browser sends that request to the same frontend origin;
- the frontend development server receives the request and, for configured proxy paths, forwards it to the ASP.NET Core backend;
- that forwarding step is server-to-server, so browser CORS rules are no longer involved in that second hop.

### Study meaning

The browser sees a same-origin request to Vite. Vite becomes the HTTP client for the backend hop.

### Recall questions

1. Which origin receives the browser's initial `/api/...` request?
2. Which component forwards the request to ASP.NET Core?
3. Why do browser CORS rules not apply to the Vite-to-backend hop?


---

## S-002 — Vite forwarding flow and the browser's role

**Known limits:** none

### Near-literal normalized transcript

That forwarding step is server-to-server, so the browser's CORS rules are no longer involved in that hop.

```text
Browser
  -> frontend dev-server origin (/api/...)
  -> frontend dev-server proxy
  -> ASP.NET Core backend
  -> frontend dev server
  -> browser
```

Important nuance:

> The browser is involved in the first request to the frontend dev server, but it is not involved in the forwarding from the dev server to the backend.

### Study meaning

The proxy changes who performs the cross-origin backend request: the development server, not browser JavaScript.

### Recall questions

1. Write the complete request/response flow.
2. At which hop does the browser stop participating?
3. Who receives the backend response before the browser?


---

## S-003 — Vite proxy versus direct cross-origin request

**Known limits:** none

### Near-literal normalized transcript

That is why the Vite development proxy avoids CORS.

Without proxy:

```text
Browser JS -> backend origin directly
```

The browser sees a different origin, so CORS applies.

With proxy:

```text
Browser JS -> frontend origin
frontend server -> backend origin
```

The browser sees a same-origin request, so there is no browser CORS problem for the first hop.

### Study meaning

The proxy does not disable CORS on the backend; it avoids a browser cross-origin request by introducing a same-origin entry point.

### Recall questions

1. What request shape triggers browser CORS enforcement?
2. What request shape does the Vite proxy present to the browser?
3. Does the proxy remove cross-origin networking or move it server-side?


---

## S-004 — Why SpaProxyServerUrl exists

**Known limits:** none

### Near-literal normalized transcript

Question shown:

> Why do we need to add `SpaProxyServerUrl` in the ASP.NET Core project?

### Study meaning

This introduces the configuration question answered by S-005 and S-006.

### Recall questions

1. What configuration property is being questioned?
2. Which project contains this setting?


---

## S-005 — SpaProxyServerUrl identifies the frontend development server

**Known limits:** none

### Near-literal normalized transcript

`SpaProxyServerUrl` tells the ASP.NET Core backend project where the frontend development server is expected to be running in development.

### Study meaning

It is local-development orchestration metadata, not the Vite proxy route table itself.

### Recall questions

1. What server URL does SpaProxyServerUrl describe?
2. Is it a production reverse-proxy route definition?


---

## S-006 — What ASP.NET Core uses SpaProxyServerUrl for

**Known limits:** none

### Near-literal normalized transcript

`SpaProxyServerUrl` exists in the backend project because the backend coordinates the local development experience. It needs to know:

- which frontend URL to probe, such as `https://localhost:5173`;
- where to redirect the browser;
- which development server it should expect or start in development.

### Study meaning

The .NET workflow can wait for or redirect to Vite using this URL. Vite's own `server.proxy` still controls `/api` forwarding.

### Recall questions

1. What example frontend URL is shown?
2. What three coordination tasks use SpaProxyServerUrl?
3. Which Vite setting separately controls API forwarding?


---

## S-007 — What “frontend dev server forwards fetch calls” means

**Known limits:** none

### Near-literal normalized transcript

When a React project uses Vite, the frontend development server is usually the Vite dev server.

So this statement:

> the frontend dev server accepts `fetch("/api/...")` calls and forwards them to ASP.NET Core

means:

> Vite receives that request on the frontend origin and proxies it to the ASP.NET Core backend, when `server.proxy` is configured.

### Study meaning

The frontend server is the Vite process listening on the frontend origin, not React code itself.

### Recall questions

1. What process normally acts as the frontend dev server?
2. What must be configured for `/api` forwarding?
3. Does React itself forward the request?


---

# Server/client roles, listening, and HTTP flow

Generated: 2026-06-30

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible HTTP, C#, JSON, addresses, ports, and flows are preserved.
- Explanation is separated from the near-literal layer.
- Every source has recall questions.

## S-008 — What a server really is

**Known limits:** none

### Near-literal normalized transcript

A server is not automatically “a whole computer.”

It can mean:

- a physical machine;
- a virtual machine;
- a container;
- most often in programming discussion, the server process/application listening for network traffic.

Examples:

- Kestrel listening on `https://localhost:7143`;
- Vite dev server listening on `https://localhost:5173`;
- Nginx listening on port `443`;
- SQL Server listening for database connections.

So “server” often means:

> software that is waiting for incoming requests.

### Study meaning

Server describes a network role and a listening process that can run on many host types.

### Recall questions

1. Name the three host forms listed.
2. What four listening-server examples are shown?
3. What concise definition closes the source?


---

## S-009 — What it means for a server to listen

**Known limits:** none

### Near-literal normalized transcript

A server binds to:

- an IP address or hostname;
- a port.

Example:

```text
https://localhost:7143
```

means roughly:

- protocol: HTTPS;
- host: `localhost`;
- port: `7143`.

When the server runs, it opens that port and waits.

```text
client -> connect to host:port -> send request -> get response
```

### Study meaning

A listening endpoint combines address, port, and expected protocol.

### Recall questions

1. Decompose `https://localhost:7143`.
2. What does the server do after opening the port?
3. Write the conceptual client/server sequence.


---

## S-010 — How the browser makes requests

**Known limits:** none

### Near-literal normalized transcript

The browser is a client.

When a user enters a URL or JavaScript executes `fetch(...)`, the browser:

1. determines the target URL;
2. opens a network connection to the host and port;
3. sends an HTTP request;
4. waits for an HTTP response;
5. processes the response.

### Study meaning

Browser networking is a concrete client workflow: target, connect, request, wait, process.

### Recall questions

1. List the five steps in order.
2. Which step occurs before HTTP bytes are sent?
3. What happens after the response arrives?


---

## S-011 — Concrete browser request and response

**Known limits:** none

### Near-literal normalized transcript

Example request:

```http
GET /api/weather HTTP/1.1
Host: localhost:7143
```

The browser sends it to the server listening on `localhost:7143`.

Example response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"temp":22}
```

The browser is a client that knows how to make HTTP requests and render or process responses.

### Study meaning

Host and port select the endpoint; the path selects the application resource.

### Recall questions

1. What path is requested?
2. What Host header is shown?
3. What status, content type, and JSON body are returned?


---

## S-012 — How servers call other servers

**Known limits:** none

### Near-literal normalized transcript

A server can also act as a client.

Example:

- the browser calls ASP.NET Core;
- ASP.NET Core calls another API;
- that API calls a database.

One program can be:

- a server for incoming requests;
- and a client for outgoing requests.

### Study meaning

Client and server are roles in a particular exchange, not permanent identities.

### Recall questions

1. Give the three-hop example.
2. How can ASP.NET Core be both server and client?
3. Why are these roles contextual?


---

## S-013 — Role changes in an end-to-end flow

**Known limits:** none

### Near-literal normalized transcript

```text
Browser -> ASP.NET Core app -> external API -> response back
```

ASP.NET Core is:

- server relative to the browser;
- client relative to the external API.

That is why “client” and “server” are roles, not permanent identities.

### Study meaning

The same process changes role depending on which connection is described.

### Recall questions

1. Relative to whom is ASP.NET Core the server?
2. Relative to whom is it the client?
3. Why should diagrams label each hop?


---

## S-014 — Examples of development servers and hosts

**Known limits:** none

### Near-literal normalized transcript

Examples shown:

- Vite dev server — serves the React application in development;
- IIS Express — local Windows web server / host;
- ASP.NET Core application;
- depending on hosting mode, Kestrel may also run behind IIS Express.

### Study meaning

Several processes can participate in local development; identify each by role and endpoint.

### Recall questions

1. What does Vite serve?
2. What role can IIS Express play?
3. How can Kestrel relate to IIS Express?


---

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


---

# HttpClient outbound forward-proxy configuration

Generated: 2026-06-30

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible HTTP, C#, JSON, addresses, ports, and flows are preserved.
- Explanation is separated from the near-literal layer.
- Every source has recall questions.

## S-020 — HttpClient primary-handler proxy is a forward proxy

**Known limits:** none

### Near-literal normalized transcript

```text
ASP.NET Core app -> forward proxy -> destination API
```

The ASP.NET Core application is acting as a client. `UseProxy` and `Proxy` belong on the primary HTTP message handler because that handler opens the outbound connection and the proxy affects that path.

### Study meaning

Proxy policy belongs to the outbound transport layer.

### Recall questions

1. What role does ASP.NET Core play?
2. Why is proxy configuration placed on the primary handler?
3. What path is affected?


---

## S-021 — Named HttpClient with explicit WebProxy

**Known limits:** none

### Near-literal normalized transcript

```csharp
using System.Net;

builder.Services.AddHttpClient("through-proxy")
    .ConfigurePrimaryHttpMessageHandler(() => new SocketsHttpHandler
    {
        UseProxy = true,
        Proxy = new WebProxy("http://proxy.company.local:8080")
    });
```

All requests from this named client go through the forward proxy.

### Study meaning

One named HttpClient receives an explicit proxy handler.

### Recall questions

1. What client name is used?
2. What handler type is configured?
3. What two properties enable proxying?
4. What proxy URI is used?


---

## S-032 — Forward proxy requires a running proxy server

**Known limits:** none

### Near-literal normalized transcript

A forward proxy is a real server that accepts outbound requests and forwards them.

In .NET, configure:

- `UseProxy = true`;
- `Proxy = new WebProxy(...)`;
- or the system/default proxy when `Proxy` is `null`.

```text
Your ASP.NET Core app -> forward proxy server -> target API
```

### Study meaning

`WebProxy` points to a proxy; it does not create one.

### Recall questions

1. Does WebProxy start a proxy server?
2. What two explicit properties are named?
3. What can be used when Proxy is null?


---

## S-033 — Explicit SocketsHttpHandler forward-proxy example

**Known limits:** none

### Near-literal normalized transcript

```csharp
using System.Net;

var handler = new SocketsHttpHandler
{
    UseProxy = true,
    Proxy = new WebProxy("http://proxy.company.local:8080")
};

var client = new HttpClient(handler);
```

If `Proxy` is not set explicitly, .NET may use a system/default proxy based on environment variables or OS proxy settings.

### Study meaning

Proxy behavior is attached to the handler used by the HttpClient.

### Recall questions

1. What proxy URI is configured?
2. What constructor argument creates the HttpClient?
3. What two sources can provide default proxy settings?


---

# YARP reverse proxy and forwarded headers

Generated: 2026-06-30

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible HTTP, C#, JSON, addresses, ports, and flows are preserved.
- Explanation is separated from the near-literal layer.
- Every source has recall questions.

## S-022 — YARP as the minimal ASP.NET Core reverse proxy

**Known limits:** none

### Near-literal normalized transcript

The simplest reverse-proxy implementation in ASP.NET Core is YARP.

Minimal setup:

- add the YARP package;
- call `AddReverseProxy()`;
- load routes and clusters from configuration;
- call `MapReverseProxy()`.

### Study meaning

YARP turns an ASP.NET Core application into the proxy process.

### Recall questions

1. What library is used?
2. Which setup calls are named?
3. Do proxied routes require manual forwarding controllers?


---

## S-023 — Minimal YARP Program.cs

**Known limits:** none

### Near-literal normalized transcript

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

var app = builder.Build();

app.MapReverseProxy();

app.Run();
```

### Study meaning

Service registration loads configuration; endpoint mapping activates proxy routes.

### Recall questions

1. What configuration section is loaded?
2. What maps the proxy endpoints?
3. What starts the app?


---

## S-024 — YARP route, cluster, and destination JSON

**Known limits:** none

### Near-literal normalized transcript

```json
{
  "ReverseProxy": {
    "Routes": {
      "api-route": {
        "ClusterId": "backend",
        "Match": {
          "Path": "/api/{**catch-all}"
        }
      }
    },
    "Clusters": {
      "backend": {
        "Destinations": {
          "d1": {
            "Address": "https://localhost:7143/"
          }
        }
      }
    }
  }
}
```

### Study meaning

A route matches the incoming path and selects a cluster; the cluster contains a backend destination.

### Recall questions

1. What path pattern is matched?
2. What cluster is selected?
3. What destination ID and address are shown?
4. What does the catch-all capture?


---

## S-025 — Backend forwarded-headers configuration

**Known limits:** none

### Near-literal normalized transcript

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor |
        ForwardedHeaders.XForwardedProto;

    options.KnownProxies.Add(
        IPAddress.Parse("10.0.0.100"));
});
```

### Study meaning

The backend enables selected headers and trusts one exact reverse-proxy IP.

### Recall questions

1. Which two forwarded headers are enabled?
2. What IP is trusted?
3. Why is explicit trust required?


---

## S-026 — UseForwardedHeaders middleware order

**Known limits:** none

### Near-literal normalized transcript

```csharp
var app = builder.Build();

app.UseForwardedHeaders();

app.MapControllers();

app.Run();
```

`UseForwardedHeaders` should run before middleware that depends on original request data.

By default, loopback proxies are trusted; other proxies should be added to `KnownProxies` or `KnownNetworks`.

### Study meaning

Order matters because redirects, URL generation, auth, and logging should observe restored values.

### Recall questions

1. Where is UseForwardedHeaders placed?
2. Which proxies are trusted by default?
3. Where are remote proxies configured?


---

## S-027 — Final distinctions among proxy concepts

**Known limits:** none

### Near-literal normalized transcript

- **Forward proxy:** for outbound calls when network policy requires proxying; not React calling the backend.
- **Reverse proxy:** in front of the ASP.NET Core application; common in production.
- `UseForwardedHeaders`: restores original client-facing request values when the proxy is trusted and middleware runs early.
- `KnownProxies`: trust exact proxy IPs.
- `KnownIPNetworks`: trust a subnet or range.

### Study meaning

Each concept belongs to a different direction or trust decision.

### Recall questions

1. When is a forward proxy relevant?
2. Where is a reverse proxy placed?
3. What two conditions make forwarded headers safe?
4. How do exact IP and network trust differ?


---

## S-028 — Will application code look normal behind a proxy?

**Known limits:** none

### Near-literal normalized transcript

With correct forwarded-header configuration, application code can often keep using:

- `Request.Scheme`;
- `Request.Host`;
- `HttpContext.Connection.RemoteIpAddress`.

Practical result:

- most code stays unchanged;
- without correct setup, redirects, absolute URLs, callback URLs, and client-IP logging can be wrong.

### Study meaning

The proxy-facing request is normalized before business middleware executes.

### Recall questions

1. Which three properties are listed?
2. What four behaviors can be wrong?
3. Why must restoration occur early?


---

## S-029 — Loopback versus non-loopback proxies

**Known limits:** none

### Near-literal normalized transcript

Loopback means the proxy is on the same machine, using:

- `127.0.0.1`;
- `::1`;
- `localhost`.

Only loopback proxies or networks are trusted by default. A proxy on another private-network address must be added to `KnownProxies` or `KnownIPNetworks`.

### Study meaning

Do not trust spoofable forwarded headers from arbitrary remote clients.

### Recall questions

1. Name the three loopback forms.
2. Why does local proxying often work by default?
3. What changes for a remote proxy?


---

## S-030 — KnownProxies versus KnownIPNetworks

**Known limits:** none

### Near-literal normalized transcript

Use `KnownProxies` for specific proxy IPs, such as:

```text
10.0.0.100
```

Use `KnownIPNetworks` for a whole trusted subnet or range, such as:

```text
10.0.1.0/24
```

The older `KnownNetworks` name is obsolete in favor of `KnownIPNetworks`.

### Study meaning

Use exact trust for fixed proxies and network trust for managed fleets.

### Recall questions

1. What exact IP is shown?
2. What subnet is shown?
3. When is each option appropriate?
4. What old API name is mentioned?


---

## S-031 — Do you need a separate reverse-proxy application?

**Known limits:** none

### Near-literal normalized transcript

Usually, yes. A reverse proxy is typically a separate server/application in front of the ASP.NET Core backend.

With YARP, create an ASP.NET Core application, add YARP, configure routes/clusters, and call `MapReverseProxy()`.

```text
Browser -> reverse proxy app -> backend app
```

Examples:

- YARP;
- Nginx;
- IIS;
- Apache;
- cloud load balancers;
- CDNs.

YARP is the .NET option for building the proxy yourself; existing infrastructure can be used instead.

### Study meaning

A reverse proxy must run as a reachable process, but it does not need to be custom code.

### Recall questions

1. Write the architecture.
2. Name six proxy products/services.
3. When is YARP useful?
4. Can Nginx or IIS be used instead?


---

# Reverse-proxy benefits, TLS, offload, and backend isolation

Generated: 2026-06-30

## Transcript policy

- Every screenshot has a dedicated source block.
- Visible HTTP, C#, JSON, addresses, ports, and flows are preserved.
- Explanation is separated from the near-literal layer.
- Every source has recall questions.

## S-034 — Load balancing as a reverse-proxy benefit

**Known limits:** none

### Near-literal normalized transcript

Load balancing distributes incoming traffic across multiple backend servers so one instance is not overloaded.

It improves performance and reliability.

It matters when multiple instances are needed for availability or load. It matters less with one small internal instance and no scaling requirement.

### Study meaning

Load balancing needs multiple viable destinations or failover capacity to provide value.

### Recall questions

1. What does load balancing distribute?
2. What two qualities can improve?
3. When does it matter less?


---

## S-035 — TLS termination at the edge

**Known limits:** none

### Near-literal normalized transcript

TLS termination means the reverse proxy handles HTTPS handshake and decryption at the edge.

Example:

- Nginx listens on `443`;
- presents the public certificate;
- decrypts traffic;
- forwards HTTP or re-encrypted HTTPS to Kestrel on an internal port.

Without correct forwarded headers, the application may think the request was HTTP and generate wrong redirects.

### Study meaning

The proxy becomes the public TLS endpoint and must preserve original scheme information.

### Recall questions

1. What public port is shown?
2. What TLS tasks does the proxy perform?
3. Why can redirects become wrong?


---

## S-036 — Protecting backends from direct internet exposure

**Known limits:** none

### Near-literal normalized transcript

Only Nginx or IIS may have a public IP.

Kestrel can listen on `localhost` or a private subnet and be unreachable directly from the internet.

This reduces exposed surface area and centralizes public-edge hardening.

### Study meaning

Backends stay private while the edge owns public exposure.

### Recall questions

1. Which components receive the public IP?
2. Where can Kestrel listen?
3. What security benefit follows?


---

## S-037 — Central host and path routing examples

**Known limits:** none

### Near-literal normalized transcript

A reverse proxy can route by host, path, or headers.

Examples:

- `api.example.com` -> ASP.NET Core API;
- `admin.example.com` -> admin application;
- `/images/*` -> static/image service;
- `/api/*` -> ASP.NET Core;
- `/reports/*` -> reporting service.

This provides one public entry point for several backends.

### Study meaning

Public routing rules hide backend topology.

### Recall questions

1. Name the host-based examples.
2. Name the path-based examples.
3. What one-entry-point benefit is stated?


---

## S-038 — Compression, caching, and edge optimization

**Known limits:** none

### Near-literal normalized transcript

A reverse proxy can offload work before a request reaches the application:

- serving static assets;
- compressing responses;
- caching public responses;
- terminating TLS at the edge.

Edge optimization means doing work at the outer edge of deployment, close to clients, rather than inside every backend instance.

### Study meaning

Offload centralizes repeated shared work.

### Recall questions

1. Name four edge tasks.
2. What does edge mean?
3. Can ASP.NET Core also compress responses itself?


---

## S-039 — When a reverse proxy is or is not needed

**Known limits:** none

### Near-literal normalized transcript

A proxy may be unnecessary when:

- there is one small internal app;
- there is no multi-app routing;
- there is no edge caching need;
- Kestrel and ASP.NET Core middleware are enough.

It becomes more useful with:

- many backends behind one domain;
- public internet traffic;
- heavy static/public traffic;
- multiple app instances;
- centralized TLS, compression, and caching.

### Study meaning

A reverse proxy is a trade-off, not a requirement for every deployment.

### Recall questions

1. List four cases where it may be unnecessary.
2. List five cases where it becomes useful.
3. Why can direct Kestrel be sufficient?


---

## S-040 — Easier infrastructure management

**Known limits:** none

### Near-literal normalized transcript

The “one front door” benefit centralizes:

- certificates;
- host bindings;
- routing rules;
- external exposure.

Examples:

- renew one public TLS setup;
- expose one domain while moving/scaling backends;
- move `/api` from one server to a cluster without changing client URLs;
- keep backends private while the proxy remains public.

### Study meaning

Public configuration becomes independent from backend placement.

### Recall questions

1. What four concerns are centralized?
2. How can `/api` move without changing clients?
3. What remains public?


---

## S-041 — Without a reverse proxy

**Known limits:** none

### Near-literal normalized transcript

```text
Browser --HTTPS--> Kestrel/ASP.NET Core
```

- Kestrel owns public port `443`;
- Kestrel has the certificate;
- Kestrel performs TLS handshake and decryption;
- the application receives HTTPS directly.

This is simpler and fine for local development, small internal apps, and simple one-server deployments with no special edge needs.

### Study meaning

Direct HTTPS is a valid design when centralized edge features are unnecessary.

### Recall questions

1. Who owns port 443?
2. Who stores the certificate?
3. Name three suitable situations.


---

## S-042 — With a reverse proxy

**Known limits:** none

### Near-literal normalized transcript

```text
Browser --HTTPS--> Reverse proxy --HTTP or HTTPS--> Kestrel/ASP.NET Core
```

- the reverse proxy owns the public certificate and `443`;
- performs the TLS handshake;
- decrypts the request;
- forwards to Kestrel;
- if the internal hop is HTTP, forwarded headers are needed so the app still knows the original scheme was HTTPS.

### Study meaning

The internal scheme can differ from the client-facing scheme.

### Recall questions

1. Write the common flow.
2. Who owns the public certificate?
3. What misunderstanding occurs without forwarded headers?


---

## S-043 — Exact benefits in the TLS scenario

**Known limits:** none

### Near-literal normalized transcript

Main benefits:

- one front door handles certificates for many backend apps;
- backends stay on private/internal ports or networks;
- TLS work is centralized at the edge;
- backend instances can be swapped, scaled, or moved without changing the public endpoint.

### Study meaning

Even one backend can benefit; the value grows with more backends.

### Recall questions

1. Name the four benefits.
2. Which apply with one backend?
3. Which decouples public URL from backend placement?


---

## S-044 — Reverse-proxy resource offload

**Known limits:** none

### Near-literal normalized transcript

A reverse proxy can use its own CPU and memory for:

- response compression;
- caching public responses;
- serving static files;
- TLS termination.

Backend application instances then do less of that work.

### Study meaning

Offload moves shared edge work away from each application instance.

### Recall questions

1. Which four tasks are offloaded?
2. What backend resources are saved?
3. Why is public-response caching suitable at the edge?


---

## S-045 — Meaning of edge optimizations

**Known limits:** none

### Near-literal normalized transcript

Edge optimizations do work close to the client before requests hit application instances.

Examples:

- compress a public JSON response at the proxy;
- cache a public product page at proxy/CDN;
- terminate TLS at the proxy;
- serve static images, CSS, or JavaScript from the proxy layer.

### Study meaning

The edge is a client-nearest proxy/CDN/load-balancer layer.

### Recall questions

1. Define edge optimization.
2. Name four examples.
3. Which can avoid a backend request entirely?


---

## S-053 — Benefits with one backend

**Known limits:** none

### Near-literal normalized transcript

Even with one backend:

1. Certificate management can stay at the proxy layer.
2. The backend can listen only on loopback or a private subnet.
3. The proxy can perform TLS handshake and decryption.
4. The proxy provides one stable public edge for future backend instances or services.

### Study meaning

Microservices are not required for central TLS, backend isolation, offload, or a stable edge.

### Recall questions

1. Name the four benefits.
2. Which is primarily security-related?
3. Which prepares for future growth?


---

## S-054 — TLS termination is not only for microservices

**Known limits:** none

### Near-literal normalized transcript

No.

- with one backend, TLS termination is useful for certificate centralization, backend isolation, and offload;
- with many backends or microservices, infrastructure-management value becomes larger because certificates and policies do not need per-service configuration.

Microservices increase the value but are not required.

### Study meaning

TLS termination solves an edge-management problem rather than a specifically microservice problem.

### Recall questions

1. Does TLS termination require microservices?
2. Which benefits apply with one backend?
3. Why does value grow with many services?


---

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
