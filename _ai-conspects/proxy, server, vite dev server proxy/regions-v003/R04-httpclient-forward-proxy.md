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
