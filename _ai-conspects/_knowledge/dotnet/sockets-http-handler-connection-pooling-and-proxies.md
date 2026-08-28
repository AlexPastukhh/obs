# SocketsHttpHandler connection pooling, proxies, and primary-handler ownership

Knowledge ID: `dotnet.sockets-http-handler-connection-pooling-and-proxies`

Topic: `dotnet`

`HttpClient` delegates transport behavior to its primary handler. In modern .NET, the default primary handler used by `HttpClientFactory` is normally `SocketsHttpHandler`. Configure that actual handler explicitly for transport-specific behavior instead of assuming that every factory or target-framework version exposes the same effective handler shape:

```csharp
builder.Services
    .AddHttpClient("api")
    .ConfigurePrimaryHttpMessageHandler(() =>
        new SocketsHttpHandler
        {
            ConnectTimeout = TimeSpan.FromSeconds(5),
            PooledConnectionLifetime = TimeSpan.FromMinutes(10),
            PooledConnectionIdleTimeout = TimeSpan.FromMinutes(2),
            MaxConnectionsPerServer = 20,
        });
```

Older examples may construct the compatible `HttpClientHandler` shape:

```csharp
new HttpClientHandler
{
    UseCookies = false,
    AllowAutoRedirect = false,
    UseDefaultCredentials = false,
};
```

Properties that belong to the actual transport should be configured on the primary handler the application really installs.

## Proxy selection and credentials

`UseProxy = false` bypasses proxy resolution and is useful for known direct service traffic. With `UseProxy = true`, an explicit `Proxy` selects that proxy; when `Proxy` is null, system/default proxy configuration may apply:

```csharp
new SocketsHttpHandler
{
    UseProxy = true,
    Proxy = new WebProxy("http://proxy.example:8080"),
};
```

Credentials for the destination server and credentials for the default/system proxy are separate concerns. `DefaultProxyCredentials` authenticates to that proxy. Proxy auto-detection can also add latency, so disable proxy use when deployment policy requires direct connections.

## Connection and pool time boundaries

- `ConnectTimeout` limits connection establishment. It is not an overall request timeout.
- `PooledConnectionLifetime` replaces connections after a maximum age. Periodic replacement lets a long-lived client reconnect when DNS or service endpoints change.
- `PooledConnectionIdleTimeout` removes connections that have remained unused. Tune it against traffic shape, setup cost, and server idle policy.
- `MaxConnectionsPerServer` limits concurrent connections to a server endpoint; it is not a universal request-admission limit.

With HTTP/1.1, an active request commonly occupies one connection, so the connection limit can resemble a concurrency limit. HTTP/2 can multiplex many requests on one connection. An application-level concurrency gate and a connection-pool limit therefore solve different problems and may both be required.

## Configuration follows client ownership

A stateless direct-service client can disable cookies and proxies and periodically recycle pooled connections:

```csharp
new SocketsHttpHandler
{
    UseCookies = false,
    UseProxy = false,
    ConnectTimeout = TimeSpan.FromSeconds(5),
    PooledConnectionLifetime = TimeSpan.FromMinutes(5),
};
```

Other clients may deliberately require a proxy, one logical cookie session, Windows integrated credentials, or large-upload settings. Those are different ownership and failure models, not one universal handler preset.

## Related knowledge

- `dotnet.sockets-http-handler-cookies-and-credentials`
- `dotnet.sockets-http-handler-response-upload-and-tls-options`

## What should be recallable

- Why should transport-specific settings be applied to the actual primary handler?
- How do `UseProxy`, `Proxy`, and `DefaultProxyCredentials` differ?
- Which phase does `ConnectTimeout` bound?
- Why can `PooledConnectionLifetime` help with DNS changes?
- How does idle timeout differ from maximum connection age?
- Why is `MaxConnectionsPerServer` not an application request limiter under HTTP/2?

## Sources

- Workspace: `_ai-conspects/primary httphandler optoins, socket/`
- Authoritative processed source: `regions/R01R02R03R04R05-primary-httphandler-options-socket-corrected-final-v002.md`, sections 1, 6, 7, 10, 12, and related checklist claims
- Original SVG: `source/primary httphandler optoins, socket.svg`
