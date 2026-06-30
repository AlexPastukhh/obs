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
